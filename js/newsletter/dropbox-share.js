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
      console.log("Shareable link found in the DOM. Copying to clipboard.")

    } else {

      if ( onDropbox ) {

        console.log("This page is currently being viewed on Dropbox.com. Running processDbLink().")
        processDbLink(document.URL, "copy", source);

      } else {

        console.log("This page is a local file and the shareable link has not been retrieved yet. Running callDropbox().")
        callDropbox("copy", this);

      }

    }
  }
}


function callDropbox(action, source) {

  console.group("callDropbox()");
    console.log("action:", action, "source:", source);
    console.log("dropboxFolderName:", dropboxFolderName);
  console.groupEnd();

  var dropboxEscapedParentFolder = escapeRegExp(dropboxFolderName)
  var dropboxTestPattern = new RegExp("^.+?" + dropboxEscapedParentFolder, "gi");

  if ( dropboxTestPattern.test(document.URL) ) {

    console.log("Yes! This file exists in the local DropBox folder. [" + document.URL + "]");

    var dropboxFilePath = document.URL.replace(dropboxTestPattern, "")
    var dropboxFilePath = dropboxFilePath.replace(/\?.+$/gi, "")
    var dropboxFilePath = decodeURIComponent(dropboxFilePath); // the API does not accept encoded paths (eg %20 instead of a space)

    //
    // Dropbox API SDK - http://dropbox.github.io/dropbox-sdk-js/#toc0__anchor
    // Documentation - https://www.dropbox.com/developers/documentation/http/documentation#sharing-create_shared_link_with_settings
    // Get Token - https://dropbox.github.io/dropbox-api-v2-explorer/#sharing_create_shared_link_with_settings
    //

    var shareableLink = "";

    // console.log("dropboxFilePath - " + dropboxFilePath);

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
    console.log("Sorry! This file is not located in the local DropBox folder. We searched the current URL (" + document.URL + ") for this pattern (" + dropboxTestPattern + ").");
    alert("Sorry! This file is not located in the local DropBox folder. We searched the current URL (" + document.URL + ") for this pattern (" + dropboxTestPattern + ").");

    console.groupEnd();

  }
}


function processDbLink(shareableLink, action, source) {

  // console.error(shareableLink + ", " + action);
  console.log("Link retrieved from Dropbox API. Running processDbLink().")

  if ( shareableLink.length > 0 ) {

    if( !/dl\.dropboxusercontent/gi.test(shareableLink) ) {
      shareableLink = shareableLink.replace(/www\./i, "dl.");
      shareableLink = shareableLink.replace(/dropbox\.com/i, "dropboxusercontent.com");
      shareableLink = shareableLink.replace(/\?dl=0/i, "");
    } else {
      shareableLink = getPathFromUrl(shareableLink);
    }

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
