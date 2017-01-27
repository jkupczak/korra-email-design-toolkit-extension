// console.warn(">>> newsletter.js loaded");


/////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////
//
//  TO-DO
//  Use https://github.com/CodeSeven/toastr
//
/////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////



var testing = true;
var view = getParameterByName("view");

if ( testing && view !== "1" && /\.htm/gi.test(document.URL) ) {



// ERROR CHECKING FOR ENTIRE PAGE
document.querySelector("html").classList.add("error-status");
document.querySelector("html").classList.toggle("errors");
//


//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////

//////
//////
////// Global variables
//////
//////


// Dropbox
  dropboxParentFolder = "Dropbox%20(MedBridge%20.)";
  dbx = new Dropbox({ accessToken: '9elIkCDq3zAAAAAAAAACPkVRrNch9EUklN5tkyJfFwegX-T01NnOOIXA9nSuRoy9' });

var localUserPath = "file:///Users/jameskupczak";

//
var pageUrl = document.URL;

var fileUrl = pageUrl.replace(/.+\//gi, "");

///////////
///// Determine location of the file you're currently viewing.
///////////

if ( /dropboxusercontent/gi.test(pageUrl) ) {
  var onDropbox = true;
} else if ( /file:\/\/\//gi.test(pageUrl) ) {
  var onLocal = true;
} else if ( /\/\/localhost\:/gi.test(pageUrl) ) {
  var onLocalServer = true;
  if ( /localhost\:4567/gi.test(pageUrl) ) {
    var onMiddleman = true;
  }
}

if ( /a/gi.test(pageUrl) ) {
  var inLocalDbFolder = true;
}

///////////
///// Determine type of email - Non-Subscriber versus Subscriber, fox, hs, etc.
///////////

var emailSubType;
if ( /\-ns[\.\-]/gi.test(pageUrl) ) {
  emailSubType = "ns"
} else if ( /\-sub[\.\-]/gi.test(pageUrl) ) {
  emailSubType = "sub"
}
if ( /\-Fox\-/gi.test(pageUrl) ) {
  emailSubType = "fox"
}
if ( /\-HS\-/gi.test(pageUrl) ) {
  emailSubType = "hs"
}
if ( /\-DR\-/gi.test(pageUrl) ) {
  emailSubType = "dr"
}

///////////
///// Determine audience - MedBridge versus Outside Organization
///// Healthsouth, Drayer PT, Fox Rehab
///////////

var outsideOrg = false;
if ( /\-(HS|DR|Fox)\-/gi.test(pageUrl) ) {
  outsideOrg = true;
}


///////////
///// Determine if this is a sale or presale or neither
///////////
var emailSale
if ( /\-(Presale|Sale)\-/gi.test(pageUrl) ) {
  emailSale = true
}

///////////
///// Get Discipline
///////////
var emailDisc = getDisciplineId(pageUrl);



//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////




//
// if ( onLocal ) {
//
//       // Get name for the key
//       var emailId     = pageUrl.replace(/(.+\/|-ns\.html?|-sub\.html?)/gi, "");
//       // console.log("emailId = " + emailId);
//
//       var emailId2 = "16-12-05-SLP-Lisa-Mitchell-CAS-ns-a.html"
//      chrome.storage.sync.get(emailId2, function (result) {
//         // console.log(result[emailId2]);
//         // alert(result.channels);
//         // $("#channels").val(channels);
//       });
//
//       // get
//       chrome.storage.promise.sync.get('foo').then(function(items) {
//         // console.log("resolved");
//         // console.log(items); // => {'foo': 'bar'}
//       }, function(error) {
//         // rejected
//         // console.log(error);
//       });
//
//
//       // Get the local path
//       var localPath = pageUrl.replace(fileUrl, "");
//       // console.log("localPath = " + localPath);
//
//       // Is this sub or non-sub
//       if ( /-ns(\.|-)/gi.test(pageUrl) ) {
//         localIdNs = fileUrl
//         // console.log("localIdNs = " + localIdNs);
//       } else if ( /-ns(\.|-)/gi.test(pageUrl) ) {
//         localIdSub = fileUrl
//         // console.log("localIdSub = " + localIdSub);
//       }
//
//       // var dropboxId = dropboxUrl.replace(/(.+s\/|\/.+$)/gi, "")
//       // var trelloId  =  trelloUrl.replace(/(.+c\/|\/.+$)/gi, "")
//
//       // var ids = { "s": "", "n": "", "d": dropboxId, "t": trelloId, "m": "", "l": "" };
//       // var obj= {};
//       // var key = emailId
//       // obj[key] = ids;
//       // chrome.storage.sync.set(obj);
//       //
//       // chrome.storage.sync.get(key,function(result){
//       //   console.log("key");
//       //   console.log(result[key]["d"]);
//       //   console.log(result[key]["t"]);
//       // });
//
//
// }

  //     var emailId   = dropboxUrl.replace(/(.+\/)/gi, "")
  //     var dropboxId = dropboxUrl.replace(/(.+s\/|\/.+$)/gi, "")
  //     var trelloId  =  trelloUrl.replace(/(.+c\/|\/.+$)/gi, "")
  //
  //     var ids = { "d":dropboxId, "t":trelloId };
  //     var obj= {};
  //     var key = emailId
  //     obj[key] = ids;
  //     chrome.storage.sync.set(obj);
  //
  //     chrome.storage.sync.get(key,function(result){
  //       console.log("key");
  //       console.log(result[key]["d"]);
  //       console.log(result[key]["t"]);
  //     });
  //
  // chrome.storage.promise.sync.get(key).then(function(result) {
  //   var trelloId = result[key]["t"];
  //   if (trelloId !== "") {
  //     trelloOrb.href = "https://www.trello.com/c/" + result[key]["t"];
  //     trelloOrb.classList.remove("off");
  //   }
  // });


////////////////////
////////////////////
////////////////////
///
///    Apply the original code to an iFrame to save it
///
////////////////////
////////////////////
////////////////////

// console.log(document);
// console.log(document.body);

  ////
  //////
  // Grab all of the TEXT in the document before we start manipulating the HTML
  var preheader = cleanPlainTxt(document.body.textContent); // http://stackoverflow.com/a/19032002/556079

  ////
  //////
  // Grab all of the HTML in the document before we start manipulating the HTML
  // var htmlTags = document.body.outerHTML; // http://stackoverflow.com/a/19032002/556079
  // console.log(htmlTags)

  //////
  //// Get the page's HTML and Doctype
  //////

  var cleanedOriginalHtml = "";

  // We need a doctype first. Reassemble the doctype if there is one in the code.
  if (document.doctype && document.doctype.name) {
    cleanedOriginalHtml = "<!doctype " + document.doctype.name;
    if (document.doctype.publicId) {
      cleanedOriginalHtml += " PUBLIC \"" + document.doctype.publicId;
    }
    if (document.doctype.systemId) {
      cleanedOriginalHtml += "\" \"" + document.doctype.systemId + '">';
    }
  }

  // Next add in the document's markup. Everything inside the <html> tag and including the <html> tag.
  cleanedOriginalHtml +=  document.documentElement.outerHTML;

  // Remove all <script> tags. HTML emails cannot have them. We don't design them in there, but if you're viewing this page with Middleman then there will be some injected <script> tags that can cause us issues. These <script> tags allow Middleman to reload the page when changes to the file are made. We don't need them in our dFrame or mFrame potentially mucking things up.
  // Also removes <object> tags. Which is also injected by Middleman (and MM sometimes tries to remove it itself and fails)
  cleanedOriginalHtml = cleanedOriginalHtml.replace(/<(object|script)\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/(object|script)>/gi, "");


////////////////////
////////////////////
////////////////////
///
///    Clean the page of the original HTML and styling before restructuring it.
///
////////////////////
////////////////////
////////////////////

  // Destroy all <style> tags.
  let styleSheetEle = document.querySelectorAll("style");
  for (let style of styleSheetEle) {
    destroy(style);
  }

  // Destroy all <body> tags.
  let bodyEle = document.querySelectorAll("body");
  for (let body of bodyEle) {
    destroy(body);
  }
  // Create a new <body> tag.
  var newBody = document.createElement("body");
  insertAfter(newBody, document.head)



  // var COMMENT_PSEUDO_COMMENT_OR_LT_BANG = new RegExp(
  //     '<!--[\\s\\S]*?(?:-->)?'
  //     + '<!---+>?'  // A comment with no body
  //     + '|<!(?![dD][oO][cC][tT][yY][pP][eE]|\\[CDATA\\[)[^>]*>?'
  //     + '|<[?][^>]*>?',  // A pseudo-comment
  //     'g');



  // Remove <body> contents
  // var ogBody = document.body;
  // while (ogBody.firstChild) {
  //     ogBody.removeChild(ogBody.firstChild);
  // }

  // Remove inline styling from <body>
  // ogBody.removeAttribute("style");


  // Apply class to the HTML element so that we can activate styles for this new page.
  document.getElementsByTagName('html')[0].classList.add("powered-up");

/////////////
/////////////

  // Apply our cleaned and reassembled original code to an iFrame as a backup to save it.
  var domCopy = document.createElement("iframe");
  domCopy.className = "og-dom";
  document.body.appendChild(domCopy)

  domCopy.contentWindow.document.open();
  domCopy.contentWindow.document.write(cleanedOriginalHtml);
  domCopy.contentWindow.document.close();

  var domCopy = domCopy.contentWindow.document;

////////////////////
////////////////////
////////////////////
///
///    Check chrome.storage for saved link IDs
///
////////////////////
////////////////////
////////////////////

//
// var promise = new Promise(function(resolve, reject) {
//   // do a thing, possibly async, then…
 var key = pageUrl.replace(/(.+\/)/gi, "");
//   chrome.storage.sync.get(key,function(result){
//     console.log("key");
//
//     var dropboxId = result[key]["d"];
//     console.log(result[key]["d"]);
//
//     var trelloId = result[key]["t"];
//     console.log(result[key]["t"]);
//   });
//
//   return trelloId
//
//   if ( trelloId ) {
//     resolve("Stuff worked!");
//     console.log("Stuff worked!");
//   }
//   else {
//     reject(Error("It broke"));
//     console.log("It broke");
//   }
// });
//
// promise.then(function(result) {
//   console.log("success"); // "Stuff worked!"
//   console.log(result); // "Stuff worked!"
// }, function(err) {
//   console.log("error"); // Error: "It broke"
//   console.log(err); // Error: "It broke"
// });



// get
// var key = pageUrl.replace(/(.+\/)/gi, "");
// chrome.storage.promise.sync.get(key).then(function(result) {
//   // resolved
//   console.log("resolved")
//   console.log(result); // => {'foo': 'bar'}
//   console.log(result[key]["t"]); // => {'foo': 'bar'}
//   var trelloId = result[key]["t"];
// }, function(error) {
//   // rejected
//   console.log("rejected");
//   console.log(error);
// });




//////////

  // Create QA Wrapper
  var qaWrapper = document.createElement("div");
  qaWrapper.className = "qa-wrapper";
  document.body.appendChild(qaWrapper);

  // Create Split View
  // console.log("activate split mode");
  document.body.classList.toggle("split-view-on");

  var iframeWrapper = document.createElement("div");
  iframeWrapper.className = "iframe-wrapper";
  qaWrapper.appendChild(iframeWrapper);

  var desktopIframeWrapper = document.createElement("div");
  desktopIframeWrapper.className = "desktop-view-wrapper";
  iframeWrapper.appendChild(desktopIframeWrapper);

    var desktopIframe = document.createElement("iframe");
    desktopIframe.className = "iframe-desktop-view";
    desktopIframe.id = "desktop-view"
    desktopIframeWrapper.appendChild(desktopIframe)

    desktopIframe.contentWindow.document.open();
    desktopIframe.contentWindow.document.write(cleanedOriginalHtml);
    desktopIframe.contentWindow.document.close();

    // Apply the desktop iframes document object to a variable
    var dFrame = desktopIframe.contentDocument;

    // Add dFrame.css
    var dFrameStyles = document.createElement("link");
    dFrameStyles.href = chrome.extension.getURL('css/dFrame.css');
    dFrameStyles.rel = "stylesheet";
    dFrameStyles.type = "text/css";
    dFrame.head.appendChild(dFrameStyles);

    // Add allFrames.js
        // var dFrameAllFramesScript = document.createElement("script");
        // dFrameAllFramesScript.src = chrome.extension.getURL('js/allFrames.js');
        // insertAfter(dFrameAllFramesScript, dFrame.body);

    // Add dFrame.js
    var dFrameFrameScript = document.createElement("script");
    dFrameFrameScript.src = chrome.extension.getURL('js/dFrame.js');
    insertAfter(dFrameFrameScript, dFrame.body);

  var mobileIframeWrapper = document.createElement("div");
  mobileIframeWrapper.className = "mobile-view-wrapper portrait";
  iframeWrapper.appendChild(mobileIframeWrapper);

    var mobileDeviceWrapper = document.createElement("div");
    mobileDeviceWrapper.className = "mobile-device-view";
    mobileIframeWrapper.appendChild(mobileDeviceWrapper)

    var mobileIframe = document.createElement("iframe");
    mobileIframe.className = "iframe-mobile-view";
    mobileIframe.id = "mobile-view"
    mobileDeviceWrapper.appendChild(mobileIframe)

    mobileIframe.contentWindow.document.open();
    mobileIframe.contentWindow.document.write(cleanedOriginalHtml);
    mobileIframe.contentWindow.document.close();

    var mobileIframeSetting = document.createElement("div");
    mobileIframeSetting.className = "mobile-iframe-settings";

    var showPortrait = document.createElement("div");
    showPortrait.className = "show-portrait";
    var showPortraitText = document.createTextNode("Portrait");
    showPortrait.appendChild(showPortraitText);
    showPortrait.addEventListener("click", togglePerspective, false);
    mobileIframeSetting.appendChild(showPortrait);

    var showLandscape = document.createElement("div");
    showLandscape.className = "show-landscape";
    var showLandscapeText = document.createTextNode("Landscape");
    showLandscape.appendChild(showLandscapeText);
    showLandscape.addEventListener("click", togglePerspective, false);
    mobileIframeSetting.appendChild(showLandscape);

      function togglePerspective() {
        mobileIframeWrapper.classList.toggle('portrait');
      }

    var hideMobile = document.createElement("div");
    hideMobile.className = "hide";
    var hideMobileText = document.createTextNode("Hide");
    hideMobile.appendChild(hideMobileText);
    hideMobile.addEventListener("click", hideMobileWrapper, false);
    mobileIframeSetting.appendChild(hideMobile);

      function hideMobileWrapper() {
        mobileIframeWrapper.classList.toggle('off');
      }

    mobileDeviceWrapper.appendChild(mobileIframeSetting);

    // Apply the mobile iframes document object to a variable
    var mFrame = mobileIframe.contentDocument;

    // Remove scrollbar from mobile view while still allowing scrolling
    // http://stackoverflow.com/a/33079951/556079
    var styleElement = mFrame.createElement("style");
    styleElement.appendChild(mFrame.createTextNode("html::-webkit-scrollbar-track { background:#fbfbfb; } html::-webkit-scrollbar { width:0px; background: transparent; } html::-webkit-scrollbar-thumb { border-radius:10px; background:#a6a6a6; border:4px solid #fbfbfb; } * { cursor:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAARVBMVEUAAABdXV0AAABdXV0bGxtOTk5dXV1dXV1dXV1dXV0uLi4lJSUODg4HBwddXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV04FrOjAAAAF3RSTlOMqACik6NmF5oImZaQjomEWgU5mSE6W6bKrUEAAADNSURBVDjLhZPdEoQgCIXZMEnT/Kn2/R91sR2trXU4d8o3HESAoclkHSbEKehsztsGkMZXE2q6ASnWcEViugK0lMvRKue9U3Ysp4VOYFtLWEGTKsi6VYAmPs7wo5mvJvoCqeRXcJMqLukAYo0/iVgAwpb/4YLEgOb64K+4Uj2AwdPgaYIG8pGgmyIDO9geYNkDwuHQ9QjATXI9wHGzgGv0PcBzlSIgWohFis8UGyW2Wvos8buFgXlLI2fEoZXHXl4cefXk5W0ye13//bL+H4yFCQFUrJO8AAAAAElFTkSuQmCC) 16 16, none; } ") );
    mFrame.getElementsByTagName("head")[0].appendChild(styleElement);

    // Add mFrame.css
        // var mFrameStyles = document.createElement("link");
        // mFrameStyles.href = chrome.extension.getURL('css/mFrame.css');
        // mFrameStyles.rel = "stylesheet";
        // mFrameStyles.type = "text/css";
        // mFrame.head.appendChild(mFrameStyles);

    // Add allFrames.js
        // var mFrameAllFramesScript = document.createElement("script");
        // mFrameAllFramesScript.src = chrome.extension.getURL('js/allFrames.js');
        // insertAfter(mFrameAllFramesScript, mFrame.body);

    // Add mFrame.js
    var mFrameScript = document.createElement("script");
    mFrameScript.src = chrome.extension.getURL('js/mFrame.js');
    insertAfter(mFrameScript, mFrame.body);


    // Allow touch events to mimic mobile behavior
    // Pending




//////////
////
////  Create Newsletter QA Control Bar Wrapper
////
/////////

var controlBar = document.createElement("div");
controlBar.className = "control-bar";
qaWrapper.appendChild(controlBar);

  var orbsTop = document.createElement("div");
  orbsTop.className = "orbs-top";
  controlBar.appendChild(orbsTop);

  var orbsBottom = document.createElement("div");
  orbsBottom.className = "orbs-bottom";
  controlBar.appendChild(orbsBottom);


//////////
////
////  Create Mobile View Orb
////
/////////

var mobileViewOrb = document.createElement("div");
mobileViewOrb.className = "mobile-orb orb glyph";
mobileViewOrb.addEventListener("click", viewMobile, false);
orbsBottom.appendChild(mobileViewOrb);

var viewMobileBoolean = false

function viewMobile() {

  viewMobileBoolean = !viewMobileBoolean;

  mobileIframeWrapper.classList.toggle('off');

  if ( viewMobileBoolean ) {
    history.replaceState(null,null, updateQueryString("mobile", "0") ); // http://stackoverflow.com/a/32171354/556079
  } else {
    history.replaceState(null,null, updateQueryString("mobile") );
  }

}


//////////
////
////  Create Trello Orb
////
/////////

var trelloOrb = document.createElement("a");
trelloOrb.className = "trello-orb orb off";
trelloOrb.target = "_trello";
orbsTop.appendChild(trelloOrb);
  chrome.storage.promise.sync.get(key).then(function(result) {
    if(typeof result[key] !== "undefined") {
      if(result[key].hasOwnProperty(["t"])){
        trelloOrb.href = "https://www.trello.com/c/" + result[key]["t"];
        trelloOrb.classList.remove("off");
      }
    }
  });



//////////
////
////   Create Share Email Orb
////
/////////

var shareOrb = document.createElement("div");
shareOrb.className = "share-orb orb glyph";
if ( onLocalServer ) { shareOrb.classList.add("off") };
shareOrb.addEventListener("click", getDbShareLink, false);
orbsTop.appendChild(shareOrb);


function getDbShareLink() {

  if ( !this.classList.contains("loading") ) {

    shareOrb.classList.add("loading");

    if ( elExists(document.querySelector("#dropbox-link-text")) ) {

      shareOrb.classList.remove("loading");
      copyToClipboard(document.querySelector("#dropbox-link-text"));

    } else {

      if ( onDropbox ) {

        processDbLink(document.URL, "copy");

      } else {

        callDropbox("copy");

      }

    }
  }
}


function callDropbox(action) {

  var dropboxEscapedParentFolder = escapeRegExp(dropboxParentFolder)
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

    console.log("dropboxFilePath - " + dropboxFilePath);

    dbx.sharingListSharedLinks({path: dropboxFilePath})
      .then(function(response) {

        console.log(response);

        if (response.links.length > 0) {

          console.log("true: response.links.length > 0 = " + response.links.length);
          processDbLink(response.links[0].url, action);

        } else {
          console.log("false: response.links.length > 0 = " + response.links.length);
          dbx.sharingCreateSharedLinkWithSettings({path: dropboxFilePath})
            .then(function(response) {

              console.log(response);
              processDbLink(response.url, action);

            })
            .catch(function(error) {
              console.log(error);
              shareOrb.classList.remove("loading");
            });
        }

      })
      .catch(function(error) {
        console.log(error);
        alertify.error("Could not find file on Dropbox", 0);
        shareOrb.classList.remove("loading");
        shareOrb.classList.add("error");
        // To-Do: Add css to make the orb look like there's been an error.
      });

  } else {
    shareOrb.classList.remove("loading");
    console.log("No! This file is not located in the local DropBox folder. [" + document.URL + "]");
    alert("No! This file is not located in the local DropBox folder. [" + document.URL + "]");
  }
}


function processDbLink(shareableLink, action) {

  console.error(shareableLink + ", " + action);

  if ( shareableLink.length > 0 ) {

    if( !/dl\.dropboxusercontent/gi.test(shareableLink) ) {
      shareableLink = shareableLink.replace(/www\./i, "dl.");
      shareableLink = shareableLink.replace(/dropbox\.com/i, "dropboxusercontent.com");
      shareableLink = shareableLink.replace(/\?dl=0/i, "");
    } else {
      shareableLink = getPathFromUrl(shareableLink);
    }

    if ( action === "copy" ) {

      var shareableLinkHolder = document.createElement("input");
      shareableLinkHolder.id = "dropbox-link-text"
      shareableLinkHolder.className = "hidden"
      shareableLinkHolder.value = shareableLink;
      document.body.appendChild(shareableLinkHolder);
      copyToClipboard(document.querySelector("#dropbox-link-text"));
      shareOrb.classList.remove("loading");

    } else {

      // var dbLinkForClicking = document.createElement("a");
      // dbLinkForClicking.id = "dropbox-link-for-clicking";
      // dbLinkForClicking.href = shareableLink
      // document.body.appendChild(dbLinkForClicking);
      // dbLinkForClicking.click();

      // history.pushState(null,null, shareableLink );

      window.location.href = shareableLink;

    }


  } else {
    alert("error!");
  }

}



//////////
////
////  Create Swap Orb
////
/////////

var swapOrb = document.createElement("div");
swapOrb.className = "swap-orb orb glyph";
if ( onLocalServer ) { swapOrb.classList.add("off") };
swapOrb.addEventListener("click", swapUrl, false);
orbsTop.appendChild(swapOrb);

function swapUrl() {

  swapOrb.classList.add("loading");

  if ( window.history.length > 1 ) {
    // Don't call the Dropbox API if there's a history available, instead just go back or forward.
    // If going back fails, then forward works instead. If for some reason this breaks in the future, this answer on SO is a nice alternative: http://stackoverflow.com/a/24056766/556079
    window.history.back();
    window.history.forward();
    console.log("navigated using window.history");
    console.log(document.referrer)
  } else {

        if ( onDropbox ) {

          var normalDbLink = pageUrl.replace(/dl\./gi, "www.");
              normalDbLink = normalDbLink.replace(/\.dropboxusercontent/gi, ".dropbox");

          console.log(normalDbLink);

          var localFilePath = "file:///Users/jameskupczak/Dropbox%20(MedBridge%20.)"

          // https://dropbox.github.io/dropbox-api-v2-explorer/#sharing_get_shared_link_metadata
          dbx.sharingGetSharedLinkMetadata({url: normalDbLink})
            .then(function(response) {

              console.error(response);

              var fileNameWithQuery = document.URL.replace(/^.+\//gi, "");
              var cleanFileName = document.URL.replace(/(^.+\/|\?.+)/gi, "");

              var cleanFileNameRegEx = escapeRegExp(cleanFileName);
              var cleanFileNameRegEx = new RegExp(cleanFileNameRegEx, "gi");

              var pathFromDb = response.path_lower.replace(cleanFileNameRegEx, "")

              var fullLocalFilePath = localFilePath + pathFromDb + fileNameWithQuery;

              console.error(cleanFileName);
              console.error(fileNameWithQuery);
              console.error(pathFromDb);
              console.error(fullLocalFilePath);

            	chrome.runtime.sendMessage({greeting: fullLocalFilePath}, function(response) {
            	  // console.log(response.farewell);
            	});

            })
            .catch(function(error) {
              console.log(error);
              alertify.error("Could not find file on Dropbox", 0);
              shareOrb.classList.remove("loading");
              shareOrb.classList.add("error");
              // To-Do: Add css to make the orb look like there's been an error.
            });

        } else {

          if ( elExists(document.querySelector("#dropbox-link-text")) ) {
            window.location.href = document.querySelector("#dropbox-link-text").value;
          } else {
            callDropbox("go");
          }

        }
  }
}




var dropboxOrb = document.createElement("a");
dropboxOrb.className = "dropbox-orb orb";
if ( onLocalServer ) { dropboxOrb.classList.add("off") };
dropboxOrb.href = "https://www.dropbox.com/home/" + pageUrl.replace(/^.+Dropbox%20\(MedBridge%20\.\)\//gi, "");
orbsTop.appendChild(dropboxOrb);
  chrome.storage.promise.sync.get(key).then(function(result) {
    if(typeof result[key] !== "undefined") {
      if(result[key].hasOwnProperty(["d"])){
        dropboxOrb.href = "https://dl.dropboxusercontent.com/s/" + result[key]["d"];
      }
    }
  });

// // Create MailChimp Orb
// var mailchimpOrb = document.createElement("a");
// mailchimpOrb.className = "mailchimp-orb orb";
// mailchimpOrb.href = "https://us2.admin.mailchimp.com/campaigns/";
// mailchimpOrb.target = "_mailchimp";
// orbsTop.appendChild(mailchimpOrb);



//////////
////
////  Create CSS Debug Orb
////
/////////

var debugOrb = document.createElement("div");
debugOrb.id = "borders-orb";
debugOrb.className = "borders-orb orb glyph";
debugOrb.addEventListener("click", toggleBorders, false);
orbsBottom.appendChild(debugOrb);
var bordersToggle = false;

function toggleBorders() {

  bordersToggle = !bordersToggle;

  if ( bordersToggle ) {
    history.replaceState(null,null, updateQueryString("borders", "0") );
  } else {
    history.replaceState(null,null, updateQueryString("borders") );
  }

  document.getElementById("borders-orb").classList.toggle("on");

  if ( elExists(dFrame.getElementById("debug")) ) {
    destroy(dFrame.getElementById("debug"));
    destroy(mFrame.getElementById("debug"));
  } else {
    var debugStyling = mFrame.createElement("style");
    debugStyling.id = "debug";
    debugStyling.appendChild(dFrame.createTextNode("td { box-shadow: inset 0 0 0 2px rgba(255,0,0,.25), 0 0 0 2px rgba(255,0,0,.25); } div { box-shadow: inset 0 0 0 2px rgba(0,0,255,.25), 0 0 0 2px rgba(0,0,255,.25); }") );

    var debugStylingM = mFrame.createElement("style");
    debugStylingM.id = "debug";
    debugStylingM.appendChild(dFrame.createTextNode("td { box-shadow: inset 0 0 0 2px rgba(255,0,0,.25), 0 0 0 2px rgba(255,0,0,.25); } div { box-shadow: inset 0 0 0 2px rgba(0,0,255,.25), 0 0 0 2px rgba(0,0,255,.25); }") );

    dFrame.getElementsByTagName("head")[0].appendChild(debugStyling);
    mFrame.getElementsByTagName("head")[0].appendChild(debugStylingM);
  }
}

//////////
////
////  Create Nav Up/Down Orb
////
/////////


// var navOrb = document.createElement("div");
// navOrb.className = "nav-orb orb dual-orb glyph";
// orbsBottom.appendChild(navOrb);
//
//   var navOrbUp = document.createElement("div");
//   navOrbUp.className = "nav-orb-up orb glyph";
//   navOrbUp.addEventListener("click", navUp, false);
//   navOrb.appendChild(navOrbUp);
//
//   var navOrbDown = document.createElement("div");
//   navOrbDown.className = "nav-orb-down orb glyph";
//   navOrbDown.addEventListener("click", navDown, false);
//   navOrb.appendChild(navOrbDown);
//
//   function navUp() {
//     // var linkPosition = getPosition(link);
//   }
//
//   function navDown() {
//
//   }


//////////
////
////   Create Power Orb (turn off JavaScript)
////
/////////

var powerOrb = document.createElement("a");
powerOrb.className = "power-orb orb glyph";
powerOrb.href = document.URL + "?view=1";
orbsTop.appendChild(powerOrb);



//////////
////
////   Create Style Toggle Orb
////
/////////

var styleOrb = document.createElement("div");
styleOrb.className = "style-orb orb glyph";
styleOrb.id = "style-orb";
styleOrb.addEventListener("click", toggleStyles, false);
orbsBottom.appendChild(styleOrb);
var styleToggle = false

function toggleStyles() {

  styleToggle = !styleToggle;

  if ( styleToggle ) {
    history.replaceState(null,null, updateQueryString("style", "0") );
  } else {
    history.replaceState(null,null, updateQueryString("style") );
  }

  if ( styleToggle ) {

    let dStyleSheetEle = dFrame.querySelectorAll("style:not(#debug)");
    for (let style of dStyleSheetEle) {
      style.disabled = true;
    }

    let mStyleSheetEle = mFrame.querySelectorAll("style:not(#debug)");
    for (let style of mStyleSheetEle) {
      style.disabled = true;
    }

  } else {

    let dStyleSheetEle = dFrame.querySelectorAll("style:not(#debug)");
    for (let style of dStyleSheetEle) {
      style.disabled = false;
    }

    let mStyleSheetEle = mFrame.querySelectorAll("style:not(#debug)");
    for (let style of mStyleSheetEle) {
      style.disabled = false;
    }

  }

  document.getElementById("style-orb").classList.toggle("on");

}


//////////
////
////  Create Edit Email Orb
////
/////////

var editOrb = document.createElement("div");
editOrb.className = "edit-orb orb glyph";
editOrb.id = "edit-orb";
editOrb.addEventListener("click", editEmail, false);
orbsBottom.appendChild(editOrb);
var editToggle = false

function editEmail() {
  editToggle = !editToggle;
  var editDesktop = dFrame.getElementsByTagName('html')[0].contentEditable = editToggle;
  document.getElementById("desktop-view").classList.toggle("editing");
  document.getElementById("edit-orb").classList.toggle("on");
  dFrame.getElementsByTagName('body')[0].focus();
}


//////////
////
////  Create A/B Swap Orb
////
/////////

if ( getABstatus(fileUrl) !== false ) {
  var abOrb = document.createElement("a");

  if ( getABstatus(fileUrl) === "a" ) {
    abOrb.className = "ab-orb orb a";
    abOrb.href = document.URL.replace(/\-a\./gi, "-b.");
  } else {
    abOrb.className = "ab-orb orb b";
    abOrb.href = document.URL.replace(/\-b\./gi, "-a.");
  }
  abOrb.id = "ab-orb";
  orbsBottom.appendChild(abOrb);

}


//////////
////
////  Create Toggle Images On/Off
////
/////////

var imagesToggleOrb = document.createElement("div");
imagesToggleOrb.className = "images-orb orb glyph";
imagesToggleOrb.id = "images-orb";
imagesToggleOrb.addEventListener("click", toggleImages, false);
orbsBottom.appendChild(imagesToggleOrb);
var imagesToggle = false

function toggleImages() {

  imagesToggle = !imagesToggle;

  if ( imagesToggle ) {
    history.replaceState(null,null, updateQueryString("img", "0") );
  } else {
    history.replaceState(null,null, updateQueryString("img") );
  }

    let dFrameimgList = dFrame.querySelectorAll("img");
    for (let img of dFrameimgList) {
      if ( imagesToggle ) {
        img.dataset.src = img.src;
        img.src = "";
      } else {
        img.src = img.dataset.src;
        img.dataset.src = "";
      }
    }

    let dFrameBkgList = dFrame.querySelectorAll("[background]");
    for (let bkg of dFrameBkgList) {
      console.log(bkg);
      console.log(bkg.getAttribute("background"));
      if ( imagesToggle ) {
        bkg.dataset.bkgImg = bkg.getAttribute("background");
        bkg.setAttribute("background", "");
        bkg.style.backgroundImage = "";
      } else {
        console.log("ELSE");
        bkg.setAttribute("background", bkg.dataset.bkgImg);
        bkg.style.backgroundImage = "url('" + bkg.dataset.bkgImg + "')";
        bkg.dataset.bkgImg = "";
      }
    }

    let mFrameimgList = mFrame.querySelectorAll("img");
    for (let img of mFrameimgList) {
      if ( imagesToggle ) {
        img.dataset.src = img.src;
        img.src = "";
      } else {
        img.src = img.dataset.src;
        img.dataset.src = "";
      }
    }

    let mFrameBkgList = mFrame.querySelectorAll("[background]");
    for (let bkg of mFrameBkgList) {
      console.log(bkg);
      console.log(bkg.getAttribute("background"));
      if ( imagesToggle ) {
        bkg.dataset.bkgImg = bkg.getAttribute("background");
        bkg.setAttribute("background", "");
        bkg.style.backgroundImage = "";
      } else {
        console.log("ELSE");
        bkg.setAttribute("background", bkg.dataset.bkgImg);
        bkg.style.backgroundImage = "url('" + bkg.dataset.bkgImg + "')";
        bkg.dataset.bkgImg = "";
      }
    }

  // document.getElementById("desktop-view").classList.toggle("editing");
  document.getElementById("images-orb").classList.toggle("on");
}




//////////
////
////  Create Plain-Text Generator Orb
////
/////////

var plainTextOrb = document.createElement("div");
plainTextOrb.className = "plain-text-orb orb glyph";
plainTextOrb.addEventListener("click", plainText, false);
orbsBottom.appendChild(plainTextOrb);


function plainText() {

  if ( typeof(plainTextTingle) == 'undefined' || plainTextTingle == null ) {

    // data-module="preheader"
    // data-module="featured-article"
    // data-module="testimonial"
    // data-module="wildcard"
    // data-module="featured-courses"
    // data-module="bbanner"
    // data-module="sale-banner"
    // data-module="from-the-blog"

    var moduleType = ""
    var plainText = ""

    ////
    //////
    // Iterate through DOM nodes - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of
    let moduleList = domCopy.querySelectorAll("[data-module]");

    console.log(domCopy);

    for (let module of moduleList) {

      var insertText = "";


      console.log(module);
      var moduleType = module.getAttribute("data-module");
      console.log(moduleType);


      if (moduleType === "preheader") {
        var insertText =  module.textContent;
      }

      if (moduleType === "testimonial") {

        var insertText = "\""

        insertText += cleanPlainTxt(module.querySelector("[data-sub-mod='summary']").innerText.replace(/(\t+|\n+)/gi, "")) + "\"\n\n";
        insertText += module.querySelector("[data-sub-mod='author']").innerText.trim();
        insertText += grabText(module.querySelector("[data-sub-mod='profession']"));

      }

      if (moduleType === "featured-article") {

        console.log( module.querySelector("[data-sub-mod='title']") );

        insertText += module.querySelector("[data-sub-mod='title']").innerText.trim() + "\n"

        if ( elExists(module.querySelector("[data-sub-mod='author']")) ) {
          insertText +=   module.querySelector("[data-sub-mod='author']").innerText.trim() + "\n\n";
        }

        insertText +=  cleanPlainTxt(module.querySelector("[data-sub-mod='summary']").innerText) + "\n\n";
        insertText +=  module.querySelector("[data-sub-mod='cta']").innerText.trim() + "\n";
        insertText +=  module.querySelector("[data-sub-mod='cta'] a").getAttribute("href").trim();
      }

      if (moduleType === "did-you-know") {
        var headline = module.innerText.trim();

        var insertText = headline;
      }

      if (moduleType === "from-the-blog") {
        var insertText = ""

        /// 1

        insertText += module.querySelector("[data-sub-mod='category-title']").innerText.trim() + "\n\n"
        insertText += module.querySelectorAll("[data-sub-mod='title']")[0].innerText.trim() + "\n";

        if ( elExists(module.querySelectorAll("[data-sub-mod='author']")[0]) ) {
          insertText += module.querySelectorAll("[data-sub-mod='author']")[0].innerText.trim() + "\n\n";
        }

        insertText += module.querySelectorAll("[data-sub-mod='title'] a")[0].getAttribute("href").trim() + "\n\n * * * \n\n";

        /// 2

        insertText += module.querySelectorAll("[data-sub-mod='title']")[1].innerText.trim() + "\n";

        if ( elExists(module.querySelectorAll("[data-sub-mod='author']")[1]) ) {
          insertText += module.querySelectorAll("[data-sub-mod='author']")[1].innerText.trim() + "\n\n";
        }

        insertText += module.querySelectorAll("[data-sub-mod='title'] a")[1].getAttribute("href").trim() + "\n\n * * * \n\n";

        /// 3

        insertText += module.querySelectorAll("[data-sub-mod='title']")[2].innerText.trim() + "\n";

        if ( elExists(module.querySelectorAll("[data-sub-mod='author']")[2]) ) {
          insertText += module.querySelectorAll("[data-sub-mod='author']")[2].innerText.trim() + "\n\n";
        }

        insertText += module.querySelectorAll("[data-sub-mod='title'] a")[2].getAttribute("href").trim();
      }

      if (moduleType === "two-column-articles") {
        var insertText = ""
        insertText += module.querySelectorAll("[data-sub-mod='title']")[0].innerText.trim() + "\n";
        insertText += cleanPlainTxt(module.querySelectorAll("[data-sub-mod='summary']")[0].innerText) + "\n\n";
        insertText += module.querySelectorAll("[data-sub-mod='cta']")[0].innerText.trim() + "\n";
        insertText += module.querySelectorAll("[data-sub-mod='cta'] a")[0].getAttribute("href").trim() + "\n\n* * *\n\n";

        insertText += module.querySelectorAll("[data-sub-mod='title']")[1].innerText.trim() + "\n";
        insertText += cleanPlainTxt(module.querySelectorAll("[data-sub-mod='summary']")[1].innerText) + "\n\n";
        insertText += module.querySelectorAll("[data-sub-mod='cta']")[1].innerText.trim() + "\n";
        insertText += module.querySelectorAll("[data-sub-mod='cta'] a")[1].getAttribute("href").trim();
      }

      if (moduleType === "featured-courses") {

        var insertText = ""

        if ( elExists(module.querySelectorAll("[data-sub-mod='all-courses-title']")[0]) ) {
          insertText +=   module.querySelectorAll("[data-sub-mod='all-courses-title']")[0].innerText.trim() + "\n"
          insertText += module.querySelectorAll("[data-sub-mod='all-courses-cta']")[0].innerText.trim() + " (";
          insertText += module.querySelectorAll("[data-sub-mod='all-courses-cta'] a")[0].getAttribute("href").trim() + ")" + "\n\n* * *\n\n";
        }

        insertText += module.querySelectorAll("[data-sub-mod='course-title']")[0].innerText.trim() + "\n"
        insertText += module.querySelectorAll("[data-sub-mod='author']")[0].innerText.trim() + "\n\n";
        insertText += module.querySelectorAll("[data-sub-mod='cta']")[0].innerText.trim() + " ";
        insertText += module.querySelectorAll("[data-sub-mod='cta'] a")[0].getAttribute("href").trim();
        insertText += "\n\n* * *\n\n";

        insertText += module.querySelectorAll("[data-sub-mod='course-title']")[1].innerText.trim() + "\n"
        insertText += module.querySelectorAll("[data-sub-mod='author']")[1].innerText.trim() + "\n\n";
        insertText += module.querySelectorAll("[data-sub-mod='cta']")[1].innerText.trim() + " ";
        insertText += module.querySelectorAll("[data-sub-mod='cta'] a")[1].getAttribute("href").trim();
        insertText += "\n\n* * *\n\n";

        insertText += module.querySelectorAll("[data-sub-mod='course-title']")[2].innerText.trim() + "\n"
        insertText += module.querySelectorAll("[data-sub-mod='author']")[2].innerText.trim() + "\n\n";
        insertText += module.querySelectorAll("[data-sub-mod='cta']")[2].innerText.trim() + " ";
        insertText += module.querySelectorAll("[data-sub-mod='cta'] a")[2].getAttribute("href").trim();

      }

      if (moduleType === "wildcard") {

        var insertText = ""

        insertText += toTitleCase(module.querySelector("[data-sub-mod='category-title']").innerText.trim()) + "\n\n"
        insertText += module.querySelector("[data-sub-mod='title']").innerText.trim() + "\n";
        if ( elExists(module.querySelector("[data-sub-mod='sub-title']")) ) {
          insertText += module.querySelector("[data-sub-mod='sub-title']").innerText.trim() + "\n";
        }
        insertText += cleanPlainTxt(module.querySelector("[data-sub-mod='summary']").innerText) + "\n\n";
        insertText += module.querySelector("[data-sub-mod='cta']").innerText.trim() + "\n";
        insertText += module.querySelector("[data-sub-mod='cta'] a").getAttribute("href").trim();

      }

      if (moduleType === "bbanner") {

        var insertText = ""

        if ( elExists(module.querySelector("[data-sub-mod='title']")) ) {
          insertText += module.querySelector("[data-sub-mod='title']").innerText.trim() + "\n";
        }
        if ( elExists(module.querySelector("[data-sub-mod='summary']")) ) {
          insertText += module.querySelector("[data-sub-mod='summary']").innerText.trim() + "\n";
        }
        if ( elExists(module.querySelector("[data-sub-mod='cta']")) ) {
          insertText += "\n" + module.querySelector("[data-sub-mod='cta']").innerText.trim() + "\n";
          insertText += module.querySelector("[data-sub-mod='cta'] a").getAttribute("href").trim();
        }

      }

      if (moduleType === "sale-banner") {

        var insertText = ""

        insertText += module.querySelector("[data-sub-mod='title']").innerText.trim() + "\n";
        insertText += module.querySelector("[data-sub-mod='summary']").innerText.trim() + "\n\n";
        insertText += cleanPlainTxt(module.querySelector("[data-sub-mod='cta']").innerText) + "\n";
        insertText += module.querySelector("[data-sub-mod='cta'] a").getAttribute("href").trim();

      }


      var plainText = plainText + insertText + "\n\n" + "===============================================" + "\n\n";

    }

      console.log(plainText);

      // Create Plain-Text Modal
      var plainTextModal = document.createElement("textarea");
      plainTextModal.className = "plain-text-modal";
      var plainTextModalText = document.createTextNode(plainText);
      plainTextModal.appendChild(plainTextModalText);

      // document.body.appendChild(plainTextModal);

      // instanciate new modal
      plainTextTingle = new tingle.modal({
          footer: false,
          stickyFooter: false,
          cssClass: ['fill'],

          onOpen: function() {
              console.log('modal open');
          },
          onClose: function() {
              console.log('modal closed');
              // plainTextTingle.destroy();
          }
      });

      plainTextTingle.setContent(plainTextModal);

  }

  plainTextTingle.open();
  document.getElementsByClassName('plain-text-modal')[0].focus(); // Active Chrome spellcheck
  document.getElementsByClassName('plain-text-modal')[0].scrollTop = 0; // Scroll back to the top of the textarea

}

function processModuleText(moduleType) {

  // if () {
  //
  // }

}





//////////
////
////  Create Newsletter QA Info Bar Wrapper
////
/////////

var infoBar = document.createElement("div");
infoBar.className = "info-bar";
qaWrapper.appendChild(infoBar);



//////////
////
////  Create Preheader Module
////  https://www.campaignmonitor.com/blog/email-marketing/2015/08/improve-email-open-rates-with-preheader-text/
////
/////////

var preheaderWapper = document.createElement("div");
preheaderWapper.className = "preheader-wrapper mod-wrapper";
infoBar.appendChild(preheaderWapper);

// preheader = preheader.replace(/(\&nbsp\;|\n|\t|\r|\u00a0)/gi, " "); // http://stackoverflow.com/a/1496863/556079
// preheader = preheader.replace(/   +/gi, " ");
// preheader = preheader.replace(/(^ +?| +?$)/gi, "");
preheader = preheader.substring(0, 149);
preheader = preheader.trim();

preheader = "<div class='mod mod-preheader'><div class='title'>Preheader</div><div class='mod-body'>" + [preheader.slice(0, 89), "<span class='preheader-back'>", preheader.slice(89)].join('') + "</span></div></div>"; // http://stackoverflow.com/a/4364902/556079

preheaderWapper.innerHTML = preheader;



//////////
////
////  Create Link Checker Module
////
/////////

var linkCheckerWrapper = document.createElement("div");
linkCheckerWrapper.id = "link-checker";
linkCheckerWrapper.className = "link-checker-wrapper mod-wrapper";
infoBar.appendChild(linkCheckerWrapper);

var linkCheckerHtml = "<div class='mod mod-link-checker'><div class='title'>Links</div><div class='mod-body'></div></div>";
linkCheckerWrapper.innerHTML = linkCheckerHtml;

var modLinkToggle = document.createElement("div");
modLinkToggle.className = "toggle";
modLinkToggle.addEventListener("click", toggleLinkMarkers, false);
document.querySelector(".mod-link-checker .title").appendChild(modLinkToggle);

function toggleLinkMarkers() {
  dFrame.getElementsByTagName("html")[0].classList.toggle("link-markers-off");
}



//////////
////
////  Create Image Checker Module
////
/////////

var imgCheckerWrapper = document.createElement("div");
imgCheckerWrapper.id = "img-checker";
imgCheckerWrapper.className = "img-checker-wrapper mod-wrapper";
infoBar.appendChild(imgCheckerWrapper);

var imgCheckerHtml = "<div class='mod mod-img-checker'><div class='title'>Images</div><div class='mod-body'></div></div>";
imgCheckerWrapper.innerHTML = imgCheckerHtml;


////////////
////////////
////////////
//
//    URL Querystring settings
//
////////////
////////////
////////////

if ( getParameterByName("img") === "0" ) {
  toggleImages();
  console.log("images off");
}

if ( getParameterByName("mobile") === "0" ) {
  viewMobile();
  console.log("mobile view collapsed");
}

if ( getParameterByName("borders") === "0" ) {
  toggleBorders();
  console.log("mobile view collapsed");
}


///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//////////////////////////// == xxxxxxxxxxxxxxxx == ///////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

////////////
////////////
////////////
//
//    alertify.js
//    https://github.com/MohammadYounes/AlertifyJS
//
//    Replace with https://github.com/CodeSeven/toastr
//
//
////////////
////////////
////////////

alertify.set('notifier','position', 'bottom-left');



////////////
////////////
////////////
//
//    Iterate Through All Links
//    https://www.kirupa.com/html5/get_element_position_using_javascript.htm
//    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of
//
////////////
////////////
////////////

// console.log(dFrame);
// console.log(dFrame.body);

// var linkMarkerWrapper = document.createElement("div");
// linkMarkerWrapper.className = "link-marker-wrapper";
// dFrame.body.appendChild(linkMarkerWrapper);

let linkList = dFrame.querySelectorAll("a");
var i = 0

console.groupCollapsed("Links Group - Total Links Processed: " + linkList.length);

for (let link of linkList) {

  i++

  // Set link and clean it if it's local.
  var linkHref = link.href;
  if ( /^file:.+\//gi.test(linkHref) ) {
    linkHref = linkHref.replace(/^file:.+\//gi, "");
  }

  if ( !/^(\*%7C.+?%7C\*|\[.+?\])/gi.test(linkHref) ) { // If this isn't a MailChimp or SendGrid link (eg. *|ARCHIVE|* or [weblink]), continue processing.

      var linkRowsWrapper = document.querySelector(".mod-link-checker .mod-body");

      var linkRow = document.createElement("div");
      linkRow.className = "link-row";
      linkRowsWrapper.appendChild(linkRow);

      var linkRowNum = document.createElement("div");
      linkRowNum.className = "link-row-num";
      var textLinkNum = document.createTextNode(i);
      linkRowNum.appendChild(textLinkNum);
      linkRow.appendChild(linkRowNum);

      var linkRowHref = document.createElement("div");
      linkRowHref.className = "link-row-href";
      var textLinkHref = document.createTextNode(linkHref);
      linkRowHref.appendChild(textLinkHref);
      linkRow.appendChild(linkRowHref);

      console.groupCollapsed("[" + i + "] " + linkHref);
      console.log(link);
      console.log( getPosition(link) );
      console.groupEnd();

    var linkPosition = getPosition(link);

    link.classList.add("marked");

    var linkMarker = document.createElement("div");
    linkMarker.className = "link-marker";
    linkMarker.style.top = (linkPosition.y - 10) + "px";
    linkMarker.style.left = (linkPosition.x - 10) + "px";
    linkMarker.dataset.href = linkHref;
    linkMarker.dataset.number = i;
    dFrame.body.appendChild(linkMarker);

    var linkErrorLog = document.createElement("div");
    linkErrorLog.className = "link-errors";
    insertAfter(linkErrorLog, linkMarker);
    // linkMarker.appendChild(linkErrorLog);


    //////////////////////////////
    //////////////////////////////
    //    Validate Links
    //////////////////////////////
    //////////////////////////////

    // Link error counter
    var totalLinkErrors = 0;

    // Function to handle creating error markers, error tags (that explain the error), and incrementing the error counter.
    function createLinkErrorRow(linkMarker, msg) {

      linkMarker.classList.add("error");

      var errorRow = document.createElement("div");
      console.error(msg);
      var errorRowText = document.createTextNode(msg);
      errorRow.appendChild(errorRowText);
      linkErrorLog.appendChild(errorRow);

      totalLinkErrors++

      linkMarker.innerHTML = totalLinkErrors;

    }


    ////////////////
    ////////////////
    //
    //  TO DO
    //
    //  - Check for medium=email in blog links during sale weeks. Look for -Presale- or -Sale- in filename.
    //  - Same as above, but look at required text for sale periods.
    //  - Verify pearl versus blog by creating an array of all the instructors. Show a warning if no match is found so that I can update the array.
    //  - Count modules and check if the utm_content has the right mod# for each link.
    //
    //
    ////////////////
    ////////////////

    // Global link testing variables

    var medbridgeLink
    var medbridgeOrMassageLink

    if ( /\/\/(www\.)?medbridge(ed|education)\.com/gi.test(linkHref) ) {
      medbridgeLink = true;
      medbridgeOrMassageLink = true;
    } else {
      medbridgeLink = false;
      medbridgeOrMassageLink = false;
    }

    var massageLink
    if ( /\/\/(www\.)?medbridgemassage\.com/gi.test(linkHref) ) {
      massageLink = true;
      medbridgeOrMassageLink = true;
    } else {
      massageLink = false;
      medbridgeOrMassageLink = false;
    }

    var blogLink
    if ( /\/blog\/20\d\d/gi.test(linkHref) ) {
      blogLink = true;
    } else {
      blogLink = false;
    }


    ////
    // Is color present in the style attribute?
    // Ignore if there's no text, or it's an image (unless that image has alt text).
    ////

        // Get the img child first.
        if ( elExists(link.getElementsByTagName('img')[0]) ) {
          var linkedImg = link.getElementsByTagName('img')[0];
        }

    if ( link.style.color === '' && (link.textContent !== '' || linkedImg.alt !== '' ) ) {
      createLinkErrorRow(linkMarker, "missing color in style attribute");
    }

    ////
    // Validate URL
    // Ignore valid URLs, valid mailto:, and valid MailChimp links ( *|text|* converted to *%7Ctext%7C* )
    // http://stackoverflow.com/a/15734347/556079
    ////
    if ( !/^(http|https):\/\/[^ "]+$/.test(linkHref) && !/^mailto:(.+?@.+?\..+|\*\|)/.test(linkHref) && !/\*%7C.+?%7C\*/.test(linkHref) ) {
      createLinkErrorRow(linkMarker, "invalid URL scheme");
    }

    ////
    // Every link needs a target attribute.
    if ( !link.hasAttribute("target") ) {
      createLinkErrorRow(linkMarker, "missing target attribute");
    }

    ////
    // MUST HAVE UTM - Check for utm_content on links going to medbridgeeducation.com or medbridgemassage.com. Error if utm_content is not present.
    if ( medbridgeLink && !/utm_content/gi.test(linkHref) && !outsideOrg ) {
      createLinkErrorRow(linkMarker, "missing utm");
    }

    ////
    // DON'T USE UTM - outsideOrg should not have utms
    if ( /utm_content/gi.test(linkHref) && outsideOrg ) {
      createLinkErrorRow(linkMarker, "remove utm");
    }

    ////
    // Check for whitelabeling versus www
    if ( outsideOrg && !blogLink && medbridgeLink && /\/www\./gi.test(linkHref) ) {
      createLinkErrorRow(linkMarker, "missing whitelabeling");
    }

    ////
    // Check for old fashioned marketing URLS in sub or outsideOrg
    if ( (outsideOrg || emailSubType === "sub" ) && /\.com\/(jan|feb|mar|apr|jun|jul|aug|sep|oct|nov|dec)-.+?(-(pt|at|ot|slp|fox|dr|hs)?)?.+\//gi.test(linkHref) ) {
      createLinkErrorRow(linkMarker, "marketing url used");
    }

    ////
    // Check for medium=email in Presale emails
    ////
    if ( emailSale && !outsideOrg && medbridgeLink && ( blogLink || /\-article/gi.test(linkHref) ) ) {

      if ( emailSubType === "sub" && /medium=email/gi.test(linkHref) ) {
        createLinkErrorRow(linkMarker, "remove medium=email");
      }

      if ( emailSubType === "ns" && !/medium=email/gi.test(linkHref) ) {
        createLinkErrorRow(linkMarker, "add medium=email");
      }

    }

    ////
    // Check for sub=yes
    ////
    // Check sub emails
    if ( emailSubType === "sub" || outsideOrg ) {

      // sub=yes is required in blog links.
      if ( blogLink && !/sub=yes/gi.test(linkHref) ) {
        createLinkErrorRow(linkMarker, "add sub=yes");
      }
      // sub=yes should not be in any other links.
      if ( !blogLink && /sub=yes/gi.test(linkHref) ) {
        createLinkErrorRow(linkMarker, "remove sub=yes");
      }
    }

    ////
    // Check all links in non-subscriber emails for sub=yes, never use it in ns.
    if ( emailSubType === "ns" && /sub=yes/gi.test(linkHref) ) {
      createLinkErrorRow(linkMarker, "remove sub=yes");
    }

    ////
    // Check for existence of https in blog links in sub version
    if ( blogLink && emailSubType === "sub" && /https:\/\//gi.test(linkHref) ) {
      createLinkErrorRow(linkMarker, "blog links cannot be https");
    }

    ////
    // https required
    if ( /http:/gi.test(linkHref) && !/\/blog\//gi.test(linkHref) && medbridgeOrMassageLink ) {
      createLinkErrorRow(linkMarker, "https missing");
    }


    ////
    // outsideOrg should not link to home-exercise-program.
    if ( outsideOrg && /\home-exercise-program/gi.test(linkHref) ) {
      createLinkErrorRow(linkMarker, "don't link to /home-exercise-program");
    }

    ////
    // Affiliate URL Linkbacks should not be used in subscriber version.
    if ( emailSubType === "sub" && /after_affiliate_url/gi.test(linkHref) ) {
      createLinkErrorRow(linkMarker, "affiliate link");
    }

    ////
    // Discipline Check

    if ( emailDisc !== null ) {

      if ( emailDisc !== "slp" && (/#\/?speech-language-pathology/gi.test(linkHref) || /-slp(\-|\/|\?)/gi.test(linkHref)) ) {
        createLinkErrorRow(linkMarker, "wrong discipline");
      }
      if ( emailDisc !== "pt" && (/#\/?physical-therapy/gi.test(linkHref) || /-pt(\-|\/|\?)/gi.test(linkHref)) ) {
        createLinkErrorRow(linkMarker, "wrong discipline");
      }
      if ( emailDisc !== "at" && (/#\/?athletic-training/gi.test(linkHref) || /-at(\-|\/|\?)/gi.test(linkHref)) ) {
        createLinkErrorRow(linkMarker, "wrong discipline");
      }
      if ( emailDisc !== "ot" && (/#\/?occupational-therapy/gi.test(linkHref) || /-ot(\-|\/|\?)/gi.test(linkHref)) ) {
        createLinkErrorRow(linkMarker, "wrong discipline");
      }


    }

    ////
    // NO //support. in outsideOrg
    if ( /\/support\./gi.test(linkHref) && outsideOrg ) {
      createLinkErrorRow(linkMarker, "://support. not allowed in outsideOrg");
    }






    // unused... what was I doing?

    var linkText = link.innerText;

  }
}
console.groupEnd();

////
//////
// Iterate through ALL IMAGES - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of
let imgList = dFrame.querySelectorAll("img");
var i = 0
console.log("Total Images: " + imgList.length)
for (let img of imgList) {

  i++

  // console.log(img);
  // console.log("[" + i + "] " + img.src);

  img.classList.add("test");

}



////////////
////////////
////////////
//
//    Highlight words that may be used in error.
//
////////////
////////////
////////////

/*

Text to Search For

ASHA (only in SLP)
AOTA (only in OT)

*/

var totalTextErrors = 0; // no success callback supported yet.

//
// DISCIPLINE CHECKS
//
if ( emailDisc === "pt" || emailDisc === "other" ) {
  // Physical Therapy - PT

  findAndReplaceDOMText(dFrame.getElementsByTagName('body')[0], {
    find: /(ASHA|AOTA|BOC\-Approved)/g,
    wrap: 'span',
    wrapClass: "text-error"
  });

} else if ( emailDisc === "at" ) {
  // Athletic Training - AT

  findAndReplaceDOMText(dFrame.getElementsByTagName('body')[0], {
    find: /(ASHA|AOTA)/g,
    wrap: 'span',
    wrapClass: "text-error"
  });

} else if ( emailDisc === "ot" ) {
  // Occupational Therapy - OT

  findAndReplaceDOMText(dFrame.getElementsByTagName('body')[0], {
    find: /(ASHA|BOC\-Approved)/g,
    wrap: 'span',
    wrapClass: "text-error"
  });

} else if ( emailDisc === "slp" ) {
  // Speech Language Pathology - SLP

  findAndReplaceDOMText(dFrame.getElementsByTagName('body')[0], {
    find: /(AOTA|BOC\-Approved)/g,
    wrap: 'span',
    wrapClass: "text-error"
  });

} else if ( emailDisc === "lmt" ) {
  // Massage

  findAndReplaceDOMText(dFrame.getElementsByTagName('body')[0], {
    find: /(ASHA|AOTA|BOC\-Approved)/g,
    wrap: 'span',
    wrapClass: "text-error"
  });

} else if ( emailDisc === "ent" ) {
  // Enterprise

  ///

}


// All
findAndReplaceDOMText(dFrame.getElementsByTagName('body')[0], {
  find: /(at no extra cost|[^\u00a0]\u2192)/gi, // Update to add "word &nbsp;&rarr;" as an error
  wrap: 'span',
  wrapClass: "text-error"
});

// Sub
if ( emailSubType === "sub" ) {
  findAndReplaceDOMText(dFrame.getElementsByTagName('body')[0], {
    find: /(Start for Free|in (an|the) (annual|MedBridge)|Learn More|\bSubscribe)/gi,
    wrap: 'span',
    wrapClass: "text-error"
  });
}

// NS
if ( emailSubType === "ns" ) {
  findAndReplaceDOMText(dFrame.getElementsByTagName('body')[0], {
    find: /(Start Now|in (an|your) annual|Register Now)/gi,
    wrap: 'span',
    wrapClass: "text-error"
  });
}

// outsideOrg
if ( outsideOrg ) {
  findAndReplaceDOMText(dFrame.getElementsByTagName('body')[0], {
    find: /additional cost/gi,
    wrap: 'span',
    wrapClass: "text-error"
  });
}





////////////
////////////
////////////
//
//    Spell Check
//
////////////
////////////
////////////

  //Activate Chrome's built-in spellcheck by focusing the cursor and then un-focusing. This works by making the HTML contenteditable and then applying focus. For some reason Chrome keeps the squiggly lines when you unfocus and turn off contenteditable which is great for us because it keeps everything else nice and clean.
  dFrame.getElementsByTagName('html')[0].contentEditable = 'true';
  dFrame.getElementsByTagName('body')[0].focus();
  mFrame.getElementsByTagName('html')[0].contentEditable = 'true';
  mFrame.getElementsByTagName('body')[0].focus();

  // For some reason, if contenteditable is turned off too quickly, the red squiggles are sometimes misaligned with the text they are indicating as incorrectly spelled. For this reason we're using a setTimeout here.
  setTimeout(function() {
    dFrame.getElementsByTagName('html')[0].contentEditable = 'false';
    mFrame.getElementsByTagName('html')[0].contentEditable = 'false';
  }, 100);






document.querySelector("html").classList.toggle("errors");
console.log("// End of script")




} // END TEST
//
//
//
