////
////
//// Notes:
//// You'll see a lot of use of decodeURIComponent() in here.
//// Windows and Mac treat ()'s differently when they're part of a URL.
//// Because we check the filename located in the URL against Dropbox, we need to decode a bunch of values.
////
////

function getDbShareLink() {

  t0 = performance.now();

  console.groupCollapsed("Dropbox Share Function Initiated");

  var source = this;

  // console.error("getDbShareLink");
  // console.error(this);
  // console.error(event.target);

  if ( !this.classList.contains("loading") ) {

    source.classList.add("loading");

    if ( dropboxUrlInput.value !== "" ) {

      source.classList.remove("loading");
      copyToClipboard(dropboxUrlInput, "success", true);
      console.log("Shareable link found in the DOM. Copying to clipboard.");

    } else {

      if ( onDropbox ) {

        console.log("This page is currently being viewed on Dropbox.com. Running processDbLink().");
        processDbLink(document.URL, "copy", source);

      } else {

        console.log("This page is a local file and the shareable link has not been retrieved yet. Running callDropbox().");
        callDropbox("copy", this);

      }

    }
  }
}

////
////
////
////
////
var dpPath;
function callDropbox(action, source) {

    dbx = new Dropbox({ accessToken: options.sync.dropboxAccessToken });
    if ( options.sync.dropboxAccessToken ) {
      // console.log("dropboxAccessToken: ", items.dropboxAccessToken);
    } else {
      console.error("Could not retrieve Dropbox access token from chrome.storage.sync. options.sync.dropboxAccessToken is " + options.sync.dropboxAccessToken, " - Visit https://dropbox.github.io/dropbox-api-v2-explorer/#auth_token/from_oauth1 to get an access token.");
    }

  console.log("options.local.fullPathToDropboxFolderEncoded", options.local.fullPathToDropboxFolderEncoded);

  // Clean up the saved path
  //  - Set it to the variable dpPath
  //  - Convert backwards slashes if we're on windows
  //  - Remove leading and trailing spaces and forward slashes
  //  - URI Encode it
  dpPath = options.local.fullPathToDropboxFolderEncoded;


  var dropboxEscapedParentFolder = escapeRegExp(dpPath);
  var dropboxTestPattern = new RegExp(dropboxEscapedParentFolder, "gi");
  var fileLocationEncoded = encodeURI(fileLocation);

  console.group("callDropbox()");
    console.log("action:", action, "source:", source);
    console.log("dpPath:", dpPath);
    console.log("dropboxEscapedParentFolder:", dropboxEscapedParentFolder);
    console.log("dropboxTestPattern:", dropboxTestPattern);
    console.log("fileLocationEncoded:", fileLocationEncoded);
  console.groupEnd();

  if ( dropboxTestPattern.test( fileLocationEncoded ) ) {

    console.log("Yes! This file exists in the local DropBox folder. [" + fileLocationEncoded + "]");

    var dropboxFilePath = fileLocationEncoded.replace(dropboxTestPattern, "").replace(/^file:\/\/\//i,"");
        dropboxFilePath = dropboxFilePath.replace(/\?.+$/gi, "");
        dropboxFilePath = decodeURIComponent(dropboxFilePath); // the API does not accept encoded paths (eg %20 instead of a space)

    //
    // Dropbox API SDK - http://dropbox.github.io/dropbox-sdk-js/#toc0__anchor
    // Documentation - https://www.dropbox.com/developers/documentation/http/documentation#sharing-create_shared_link_with_settings
    // Get Token - https://dropbox.github.io/dropbox-api-v2-explorer/#sharing_create_shared_link_with_settings
    //

    var shareableLink = "";

    // The path you send to Dropbox should:
    //  - Start with a forward / slash
    //  - Begin after the parent dropbox folder
    //  - Example:
    //      - local file path = file:///Users/jameskupczak/DropboxFolder/path/to/file.html
    //      - path to send to dropbox: /path/to/file.html
    console.log("Sending this path to Dropbox:", dropboxFilePath);

    ////
    // Check Dropbox for a shareable link that might already exist.
    ////
    dbx.sharingListSharedLinks({path: dropboxFilePath})
      .then(function(response) {

        // console.log(response);
        // console.log(response.links[0]);
        // console.log(response.links[0][".tag"]);
        // console.log(response.links[0].url);

        if (response.links.length > 0 && response.links[0][".tag"] !== "folder") {

          // console.log("true: response.links.length > 0 = " + response.links.length);
          console.log("Found a pre-existing link for sharing.");
          processDbLink(response.links[0].url, action, source);

        } else {
          ////
          // Could not find a pre-existing link for sharing. Create a new one instead.
          ////
          console.log("Could not find a pre-existing link for sharing. Create a new one instead.");
          console.log("false: response.links.length > 0 = " + response.links.length);

          dbx.sharingCreateSharedLinkWithSettings({path: dropboxFilePath})
            .then(function(response) {

              // console.log(response);
              processDbLink(response.url, action, source);

            })
            .catch(function(error) {
              console.log(error);
              source.classList.remove("loading");
            });
        }

      })
      .catch(function(error) {
        console.log(error);
        alertify.error("Could not find file on Dropbox.", 0);
        source.classList.remove("loading");
        source.classList.add("error");
        // To-Do: Add css to make the orb look like there's been an error.

        console.groupEnd();

      });

  } else {
    source.classList.remove("loading");
    console.log("Sorry! This file is not located in the local DropBox folder. We searched the current URL (" + fileLocationEncoded + ") for this pattern (" + dropboxTestPattern + ").");
    alert("Sorry! This file is not located in the local DropBox folder. We searched the current URL (" + fileLocationEncoded + ") for this pattern (" + dropboxTestPattern + ").");

    console.groupEnd();

  }
}


////
////
////
////
////
function processDbLink(shareableLink, action, source) {

  // console.error(shareableLink + ", " + action);
  console.log("Link retrieved from Dropbox API. Running processDbLink().");

  if ( shareableLink.length > 0 ) {

    // DEPRECATED
    // Members of Marketing are tired of having to download the file everytime.
    // At a glance it looks like it's not needed anymore while logged in because the HTML file is viewable instead of just showing the HTML code.
    //
    // if( !/dl\.dropboxusercontent/gi.test(shareableLink) ) {
    //   shareableLink = shareableLink.replace(/www\./i, "dl.");
    //   shareableLink = shareableLink.replace(/dropbox\.com/i, "dropboxusercontent.com");
    //   shareableLink = shareableLink.replace(/\?dl=0/i, "");
    // } else {
      shareableLink = getPathFromUrl(shareableLink);
    // }


    if ( action === "copy" ) {

      // var shareableLinkHolder = document.createElement("input");
      // shareableLinkHolder.id = "dropbox-link-text"
      // shareableLinkHolder.className = "hidden"
      // shareableLinkHolder.value = shareableLink;
      // document.body.appendChild(shareableLinkHolder);

      dropboxUrlInput.value = shareableLink;

      var t1 = performance.now();

      copyToClipboard(dropboxUrlInput, "success", true);

      // var x = (t1 - t0) / 1000;
      // var seconds = x % 60;

      var seconds = Math.round(((t1 - t0)/1000)%60);

      console.log("Call to DropBox took " + (t1 - t0) + " milliseconds (" + seconds + " seconds).");

      source.classList.remove("loading");

      console.log("Copying processed link to clipboard. [" + shareableLink + "]");

    } else {

      // var dbLinkForClicking = document.createElement("a");
      // dbLinkForClicking.id = "dropbox-link-for-clicking";
      // dbLinkForClicking.href = shareableLink
      // document.body.appendChild(dbLinkForClicking);
      // dbLinkForClicking.click();

      // history.pushState(null,null, shareableLink );

      console.log("Navigating to processed link. [" + shareableLink + "]");
      window.location.href = shareableLink + "?noredirect=1";

    }


  } else {
    alert("error!");
  }

  console.groupEnd();

}
