///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////                         ///////////////////////////
///////////////////////////      NEWSLETTER.JS      ///////////////////////////
///////////////////////////                         ///////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//
//  TO-DO
//
//  Use https://github.com/CodeSeven/toastr
//
//  Can I generate divs that show margin and padding?
//
//  Mobile View ---
//  Add multiple width options for the mFrame. 320, 360, 480, iPhone (375, 414) and popular Android specific (all versions, from dropdown menu)
//  Remove "Portrait" and "Landscape", replace with just the width names (and/or device names)
//  320px | 360px | 480px | More
//
//  Link Markers ---
//  Create a 'warning' class in addition to the 'error' class for link-markers. If an email is very old, mark link errors as warnings.
//  Unlike errors, warnings should be hidden until you hover over the link.
//  Create a button that will toggle/show all link-markers regardless of error/warning status.
//
//  TD Markers ---
//  Give them "levels" to show how deep they are.
//  Create a toggle that cycles through the different levels so that you can see more clearly.
//  Hide all inactive markers, or simply make them very low opacity.
//
//  Investigate Using the WordPress API ---
//  The current method of checking for protected status is hacky. Considering changing it in the future.
//
//  Image Guidelines ---
//  Create toggle that will add PhotoShop-esque guidelines to all or individual images in the email.
//  This will help show any alignment issues that may exist.
//
//  Swap Font Stack ---
//  Simulate what the email will look like in email clients that do not support @font-face or have Helvetica.
//  Remove all instances of "Roboto" from font-family: declarations, and then Helvetica.
//
//  Modules Menu ---
//  Give each module its own mini-menu to hide, duplicate, re-order and edit.
//
//  Tag Checker ---
//  Search for unsupported tags like <strong> and recommend replacements like <b>.
//
//  Link Checker --
//    - Add support for link status Like how mail-tester.com does it.
//        -They show a status report for each link like [302 - Redirection : Found] and [200 - Success : OK].
//    - Throw an error if a URL shortener is being used.
//
//  Calculate page weight ---
//  Determined the size of the HTML (in kb) and the percentage of text (eg. 29% text).
//
//  Remove Comments for Production ---
//  This should be added to MailChimp. When HTML is pasted it, run a script that removes <!-- --> comments.
//
//  Image Checker ---
//  Check that all images have alt="" attributes.
//  Check that all images are hosted on a CDN.
//
//
//
//
//
//
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
  // dbx = new Dropbox({ accessToken: '#' });

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

var emailAnySale
var emailSale
var emailPresale
if ( /\-Sale\-/gi.test(pageUrl) ) {
  emailSale = true;
  emailAnySale = true;
} else if ( /\-Presale\-/gi.test(pageUrl) ) {
  emailPresale = true;
  emailAnySale = true;

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

    // Quick <style> Injection
    // Inject a style block into this iframe via javascript to quickly apply styles on page load. Loading a link to a css file takes a bit to activate. So any styles that are important to have right away should go here. We inject it here instead of adding it inside a .css link because it loads faster. If we used a .css file there would be a flash on page load where the  styles aren't applied yet.
    // http://stackoverflow.com/a/33079951/556079
    //
    // - Prevent flash of contenteditable cursor when spell check is activated.
    //
    var dStyleElement = dFrame.createElement("style");
    dStyleElement.appendChild(dFrame.createTextNode("html { overflow-y: scroll; } .spellcheck body { color:transparent; }") );
    dFrame.getElementsByTagName("head")[0].appendChild(dStyleElement);

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
  mobileIframeWrapper.className = "mobile-view-wrapper";
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

    var mWidth1 = document.createElement("div");
    mWidth1.id = "mobile-320";
    mWidth1.dataset.mobileWidth = "320";
    var mWidth1Text = document.createTextNode("320");
    mWidth1.appendChild(mWidth1Text);
    mWidth1.addEventListener("click", togglePerspective, false);
    mobileIframeSetting.appendChild(mWidth1);

    var mWidth2 = document.createElement("div");
    mWidth2.id = "mobile-360";
    mWidth2.id = "mobile-360";
    mWidth2.dataset.mobileWidth = "360";
    mWidth2.className = "show-landscape";
    var mWidth2Text = document.createTextNode("360");
    mWidth2.appendChild(mWidth2Text);
    mWidth2.addEventListener("click", togglePerspective, false);
    mobileIframeSetting.appendChild(mWidth2);

    var mWidth3 = document.createElement("div");
    mWidth3.id = "mobile-480";
    mWidth3.id = "mobile-480";
    mWidth3.dataset.mobileWidth = "480";
    var mWidth3Text = document.createTextNode("480");
    mWidth3.appendChild(mWidth3Text);
    mWidth3.addEventListener("click", togglePerspective, false);
    mobileIframeSetting.appendChild(mWidth3);

    var mWidth4 = document.createElement("div");
    mWidth4.id = "mobile-custom";
    mWidth4.className = "show-landscape";
    var mWidth4Text = document.createTextNode("Custom");
    mWidth4.appendChild(mWidth4Text);
    mWidth4.addEventListener("click", toggleCustomMobileWidths, false);
    mobileIframeSetting.appendChild(mWidth4);

    var mWidthExtraOptionsWrapper = document.createElement("div");
    mWidthExtraOptionsWrapper.id = "extra-mobile-widths";
    mWidthExtraOptionsWrapper.className = "extra-mobile-widths-wrapper";
    mobileDeviceWrapper.appendChild(mWidthExtraOptionsWrapper);

    function toggleCustomMobileWidths() {
      mWidthExtraOptionsWrapper.style.display = "flex";
      mWidthCustomInput.autofocus = "true";
      console.log(mWidthExtraOptionsWrapper);
    }

    var mWidthCustomInputWrapper = document.createElement("div");
    mWidthCustomInputWrapper.id = "custom-mobile-width";

    var mWidthCustomInput = document.createElement("input");
    mWidthCustomInput.type = "number";
    mWidthCustomInput.placeholder = "Custom Width";
    mWidthCustomInput.max = "480";
    mWidthCustomInput.maxLength = "3";
    mWidthCustomInput.pattern = "[0-9]";

    mWidthCustomInputWrapper.appendChild(mWidthCustomInput);
    mWidthExtraOptionsWrapper.appendChild(mWidthCustomInputWrapper);

      var mWidthExtra1 = document.createElement("div");
      mWidthExtra1.className = "extra-width";
      mWidthExtra1.innerHTML = "<div><div>477</div><div>iPhone 6</div></div>"
      mWidthExtraOptionsWrapper.appendChild(mWidthExtra1);

      var mWidthExtra2 = document.createElement("div");
      mWidthExtra2.className = "extra-width";
      mWidthExtra2.innerHTML = "<div>477</div><div>iPhone 6</div>"
      mWidthExtraOptionsWrapper.appendChild(mWidthExtra2);

      var mWidthExtra3 = document.createElement("div");
      mWidthExtra3.className = "extra-width";
      mWidthExtra3.innerHTML = "<div><div>477</div><div>iPhone 6</div></div>"
      mWidthExtraOptionsWrapper.appendChild(mWidthExtra3);

      var mWidthExtra4 = document.createElement("div");
      mWidthExtra4.className = "extra-width";
      mWidthExtra4.innerHTML = "<div><div>477</div><div>iPhone 6</div></div>"
      mWidthExtraOptionsWrapper.appendChild(mWidthExtra4);

      var mWidthExtra5 = document.createElement("div");
      mWidthExtra5.className = "extra-width";
      mWidthExtra5.innerHTML = "<div><div>375</div><div>iPhone 6</div></div>"
      mWidthExtraOptionsWrapper.appendChild(mWidthExtra5);

      var mWidthExtra6 = document.createElement("div");
      mWidthExtra6.className = "extra-width";
      mWidthExtra6.innerHTML = "<div><div>414</div><div>iPhone 6 Plus</div></div>"
      mWidthExtraOptionsWrapper.appendChild(mWidthExtra6);




      function togglePerspective(test) {
        console.error(this);
        console.error(this.id);
        console.error(this.dataset.mobileWidth);
        mobileDeviceWrapper.style.width = this.dataset.mobileWidth + "px";
      }

      function hideMobileWrapper() {
        mobileIframeWrapper.classList.toggle('off');
      }

    mobileDeviceWrapper.appendChild(mobileIframeSetting);

    // Apply the mobile iframes document object to a variable
    var mFrame = mobileIframe.contentDocument;

    // Quick <style> Injection
    // Inject a style block into this iframe via javascript to quickly apply styles on page load. Loading a link to a css file takes a bit to activate. So any styles that are important to have right away should go here. We inject it here instead of adding it inside a .css link because it loads faster. If we used a .css file there would be a flash on page load where the  styles aren't applied yet.
    // http://stackoverflow.com/a/33079951/556079
    //
    // - Remove scrollbar from mobile view while still allowing scrolling
    // - Prevent flash of contenteditable cursor when spell check is activated.
    //
    var mStyleElement = mFrame.createElement("style");
    mStyleElement.appendChild(mFrame.createTextNode("html::-webkit-scrollbar-track { background:#fbfbfb; } html::-webkit-scrollbar { width:0px; background: transparent; } html::-webkit-scrollbar-thumb { border-radius:10px; background:#a6a6a6; border:4px solid #fbfbfb; } * { cursor:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAARVBMVEUAAABdXV0AAABdXV0bGxtOTk5dXV1dXV1dXV1dXV0uLi4lJSUODg4HBwddXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV04FrOjAAAAF3RSTlOMqACik6NmF5oImZaQjomEWgU5mSE6W6bKrUEAAADNSURBVDjLhZPdEoQgCIXZMEnT/Kn2/R91sR2trXU4d8o3HESAoclkHSbEKehsztsGkMZXE2q6ASnWcEViugK0lMvRKue9U3Ysp4VOYFtLWEGTKsi6VYAmPs7wo5mvJvoCqeRXcJMqLukAYo0/iVgAwpb/4YLEgOb64K+4Uj2AwdPgaYIG8pGgmyIDO9geYNkDwuHQ9QjATXI9wHGzgGv0PcBzlSIgWohFis8UGyW2Wvos8buFgXlLI2fEoZXHXl4cefXk5W0ye13//bL+H4yFCQFUrJO8AAAAAElFTkSuQmCC) 16 16, none; } .spellcheck body { color:transparent; }") );
    mFrame.getElementsByTagName("head")[0].appendChild(mStyleElement);

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


    // Add allFrames.css
    var allFramesStyles = document.createElement("link");
    allFramesStyles.href = chrome.extension.getURL('css/allFrames.css');
    allFramesStyles.rel = "stylesheet";
    allFramesStyles.type = "text/css";
    dFrame.head.appendChild(allFramesStyles);
    mFrame.head.appendChild(allFramesStyles.cloneNode(true));


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

var paneToggleOrb = document.createElement("div");
paneToggleOrb.className = "pane-orb orb glyph";
paneToggleOrb.addEventListener("click", paneToggle, false);
orbsBottom.appendChild(paneToggleOrb);

var infobarPaneStatus = 1;
var mobilePaneStatus = 1;

function paneToggle(infobar, mobile) {

  console.log("infobarPaneStatus: " + infobarPaneStatus);
  console.log("mobilePaneStatus: " + mobilePaneStatus);

  // If we got some data from the querystring on page load, process it.
  if ( infobar >= 0 || mobile >= 0 ) {

    if ( infobar === null ) {
      infobarPaneStatus = 1;
    } else {
      infobarPaneStatus = parseInt(infobar);
    }

    if ( mobile === null ) {
      mobilePaneStatus = 1;
    } else {
      mobilePaneStatus = parseInt(mobile);
    }

  // No querystring data found, update the values based on what we know.
  } else {

    if ( infobarPaneStatus === 1 && mobilePaneStatus === 1 ) {
      infobarPaneStatus = 0;
    }
    else if ( infobarPaneStatus === 0 && mobilePaneStatus === 1 ) {
      mobilePaneStatus = 0;
    }
    else if ( infobarPaneStatus === 0 && mobilePaneStatus === 0 ) {
      infobarPaneStatus = 1;
      mobilePaneStatus = 1;
    }

  }

  // Update the css based on our values calculated above.
  if ( infobarPaneStatus === 0 ) {
    infoBar.classList.add("off");
    history.replaceState(null,null, updateQueryString("infobar", "0") ); // http://stackoverflow.com/a/32171354/556079
  } else {
    infoBar.classList.remove("off");
    history.replaceState(null,null, updateQueryString("infobar") );
  }
  if ( mobilePaneStatus === 0 ) {
    mobileIframeWrapper.classList.add("off");
    history.replaceState(null,null, updateQueryString("mobile", "0") );
  } else {
    mobileIframeWrapper.classList.remove("off");
    history.replaceState(null,null, updateQueryString("mobile") );
  }

}


//////////
////
////  Create Trello Orb
////
/////////

// var trelloOrb = document.createElement("a");
// trelloOrb.className = "trello-orb orb off";
// trelloOrb.target = "_trello";
// orbsTop.appendChild(trelloOrb);
//   chrome.storage.promise.sync.get(key).then(function(result) {
//     if(typeof result[key] !== "undefined") {
//       if(result[key].hasOwnProperty(["t"])){
//         trelloOrb.href = "https://www.trello.com/c/" + result[key]["t"];
//         trelloOrb.classList.remove("off");
//       }
//     }
//   });



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

  console.log("Beginning DropBox share function.");

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
////  Create Orb Dividers
////
/////////

var orbDivider1 = document.createElement("div");
orbDivider1.className = "orb-divider orb-divider-1";
orbsBottom.appendChild(orbDivider1);

var orbDivider2 = document.createElement("div");
orbDivider2.className = "orb-divider orb-divider-2";
orbsBottom.appendChild(orbDivider2);

var orbDivider3 = document.createElement("div");
orbDivider3.className = "orb-divider orb-divider-3";
orbsBottom.appendChild(orbDivider3);


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

  console.log("Beginning URL swap.");

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
////  Create Borders/Dimensions Orb
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
    history.replaceState(null,null, updateQueryString("borders", "1") );
  } else {
    history.replaceState(null,null, updateQueryString("borders") );
  }

  document.getElementById("borders-orb").classList.toggle("on");

  dFrame.documentElement.classList.toggle("debug-borders-highlight");
  mFrame.documentElement.classList.toggle("debug-borders-highlight");

  // if ( elExists(dFrame.getElementById("debug")) ) {
  //   destroy(dFrame.getElementById("debug"));
  //   destroy(mFrame.getElementById("debug"));
  // } else {
  //   var debugStylingD = dFrame.createElement("style");
  //   debugStylingD.id = "debug";
  //   debugStylingD.appendChild(dFrame.createTextNode("") );
  //
  //   var debugStylingM = mFrame.createElement("style");
  //   debugStylingM.id = "debug";
  //   debugStylingM.appendChild(dFrame.createTextNode("td { box-shadow: inset 0 0 0 1px rgba(255,0,0,.25); } div:not(.alignment-guide) { box-shadow: inset 0 0 0 2px rgba(0,0,255,.25), 0 0 0 2px rgba(0,0,255,.25); }") );
  //
  //   dFrame.getElementsByTagName("head")[0].appendChild(debugStylingD);
  //   mFrame.getElementsByTagName("head")[0].appendChild(debugStylingM);
  // }

  //
  // Find <td> dimensions
  //

  // Destory the td markers if they exist, create the wrapper for them if they do not.
  if ( elExists(dFrame.getElementById("td-markers")) ) {

    destroy(dFrame.getElementById("td-markers"));
    destroy(mFrame.getElementById("td-markers"));

  } else {

    let dFrameTdList = dFrame.querySelectorAll("td");
    var tdCount = 0

    console.groupCollapsed("<td> Group (dFrame) - Total <td>'s Processed: " + dFrameTdList.length);

    var tdMarkerWrapper = document.createElement("section");
    tdMarkerWrapper.id = "td-markers";
    tdMarkerWrapper.className = "debug td-markers-wrapper";
    dFrame.body.appendChild(tdMarkerWrapper);
    mFrame.body.appendChild(tdMarkerWrapper.cloneNode(true));


    for (let tdEle of dFrameTdList) {
      if ( (tdEle.clientWidth !== 0 && tdEle.clientHeight !== 0) && (tdEle.clientWidth < 650) ) {

        tdCount++

        var tdPos = getPosition(tdEle, dFrame);

        var tdMarker = document.createElement("section");
        tdMarker.className = "td-marker";
        tdMarker.style.top = (tdPos.y) + "px";
        tdMarker.style.left = (tdPos.x) + "px";
        tdMarker.dataset.number = tdCount;

        var tdTextNode = document.createTextNode(tdEle.clientWidth + " x " + tdEle.clientHeight);

        // tdMarker.style.width = (tdEle.clientWidth) + "px";
        // tdMarker.style.height = (tdEle.clientHeight) + "px";
        // var tdTextPos = document.createElement("section");
        // tdTextPos.className = "td-dims";
        // tdTextPos.appendChild(tdTextNode);
        // tdMarker.appendChild(tdTextPos);

        tdMarker.appendChild(tdTextNode);
        dFrame.getElementById("td-markers").appendChild(tdMarker);

      }
    }

    console.groupEnd();


    let mFrameTdList = mFrame.querySelectorAll("td");
    var tdCount = 0

    console.groupCollapsed("<td> Group (mFrame) - Total <td>'s Processed: " + mFrameTdList.length);

    for (let tdEle of mFrameTdList) {
      if ( (tdEle.clientWidth !== 0 && tdEle.clientHeight !== 0) && (tdEle.clientWidth < 650) ) {

        // console.log(tdEle);
        // console.log(tdEle.clientHeight);
        // console.log(tdEle.clientWidth);

        tdCount++

        var tdPos = getPosition(tdEle, mFrame);

        var tdMarker = document.createElement("section");
        tdMarker.className = "td-marker";
        tdMarker.style.top = (tdPos.y) + "px";
        tdMarker.style.left = (tdPos.x) + "px";
        tdMarker.dataset.number = tdCount;

        var tdTextNode = document.createTextNode(tdEle.clientWidth + " x " + tdEle.clientHeight);

        // tdMarker.style.width = (tdEle.clientWidth) + "px";
        // tdMarker.style.height = (tdEle.clientHeight) + "px";
        // var tdTextPos = document.createElement("section");
        // tdTextPos.className = "td-dims";
        // tdTextPos.appendChild(tdTextNode);
        // tdMarker.appendChild(tdTextPos);

        tdMarker.appendChild(tdTextNode);
        mFrame.getElementById("td-markers").appendChild(tdMarker);

      }
    }

    console.groupEnd();

  }

}


//////////
////
////  Create Guides Orb
////
/////////

var guidesOrb = document.createElement("div");
guidesOrb.id = "guides-orb";
guidesOrb.className = "guides-orb orb glyph";
guidesOrb.addEventListener("click", toggleGuides, false);
orbsBottom.appendChild(guidesOrb);
var guidesToggle = false;

function toggleGuides() {

  guidesToggle = !guidesToggle;

  if ( guidesToggle ) {
    history.replaceState(null,null, updateQueryString("guides", "1") );
  } else {
    history.replaceState(null,null, updateQueryString("guides") );
  }

  document.getElementById("guides-orb").classList.toggle("on");

  if ( elExists(dFrame.getElementById("alignment-guides")) ) {
    destroy(dFrame.getElementById("alignment-guides"));
  } else {

    var guidesStylingWrapper = dFrame.createElement("section");
    guidesStylingWrapper.id = "alignment-guides";
    guidesStylingWrapper.className = "debug alignment-guides-wrapper";

      var guidesStyling1 = dFrame.createElement("section");
      guidesStyling1.classList.add("alignment-guide");
      guidesStyling1.style.left = "0";
      guidesStyling1.style.right = "0";
      guidesStylingWrapper.appendChild(guidesStyling1);

      var guidesStyling2 = dFrame.createElement("section");
      guidesStyling2.classList.add("alignment-guide");
      guidesStyling2.style.left = "589px";
      guidesStyling2.style.right = "0";
      guidesStylingWrapper.appendChild(guidesStyling2);

      var guidesStyling3 = dFrame.createElement("section");
      guidesStyling3.classList.add("alignment-guide");
      guidesStyling3.style.left = "619px";
      guidesStyling3.style.right = "0";
      guidesStylingWrapper.appendChild(guidesStyling3);

      var guidesStyling4 = dFrame.createElement("section");
      guidesStyling4.classList.add("alignment-guide");
      guidesStyling4.style.left = "0";
      guidesStyling4.style.right = "589px";
      guidesStylingWrapper.appendChild(guidesStyling4);

      var guidesStyling5 = dFrame.createElement("section");
      guidesStyling5.classList.add("alignment-guide");
      guidesStyling5.style.left = "0";
      guidesStyling5.style.right = "619px";
      guidesStylingWrapper.appendChild(guidesStyling5);


    dFrame.getElementsByTagName("body")[0].appendChild(guidesStylingWrapper);
  }
}

//////////
////
////  Create Nav Up/Down Orb
////
/////////


var navOrb = document.createElement("div");
navOrb.className = "nav-orb orb dual-orb glyph";
orbsBottom.appendChild(navOrb);

  var navOrbUp = document.createElement("div");
  navOrbUp.className = "nav-orb-up orb glyph";
  navOrbUp.addEventListener("click", navUp, false);
  navOrb.appendChild(navOrbUp);

  var navOrbDown = document.createElement("div");
  navOrbDown.className = "nav-orb-down orb glyph";
  navOrbDown.addEventListener("click", navDown, false);
  navOrb.appendChild(navOrbDown);

  function navUp() {

    var dFrameScroll = document.getElementById('desktop-view');
    dFrameScroll.contentWindow.scrollTo(0,0);

    var mFrameScroll = document.getElementById('mobile-view');
    mFrameScroll.contentWindow.scrollTo(0,0);

  }

  function navDown() {

    var dFrameScroll = document.getElementById('desktop-view');
    dFrameScroll.contentWindow.scrollTo(0,dFrame.body.scrollHeight);

    var mFrameScroll = document.getElementById('mobile-view');
    mFrameScroll.contentWindow.scrollTo(0,mFrame.body.scrollHeight);

  }


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
////   Custom Orb
////
/////////

var customOrb = document.createElement("div");
customOrb.className = "custom-orb orb glyph";
customOrb.id = "custom-orb";
customOrb.addEventListener("click", toggleCustom, false);
orbsBottom.appendChild(customOrb);
// var customToggle = false

function toggleCustom() {

  console.error(Notification.permission);

  if ( Notification.permission !== "granted" ) {
    Notification.requestPermission();
    console.error(Notification.permission);
  } else {
    console.error(Notification.permission);
    var notification = new Notification('Pending Drafts', {
      body: "Hey there! You have pending drafts in MailChimp, get on it!",
      requireInteraction: true
    });
  }

  console.error(Notification.permission);

  console.log(dFrame.body);
  console.log(dFrame.getElementsByTagName("body")[0]);

  console.log(dFrame.body.scrollTop);
  console.log(dFrame.getElementsByTagName("body")[0].scrollTop);

  var articleNumber = "1";
  sessionStorage.setItem('article' + articleNumber + "status", "protected");
  sessionStorage.setItem('article' + articleNumber + "type", "pearl");

  console.log(+ new Date());

  var currentdate = new Date();
  var datetime = "Last Sync: " + currentdate.getDate() + "/"
                  + (currentdate.getMonth()+1)  + "/"
                  + currentdate.getFullYear() + " @ "
                  + currentdate.getHours() + ":"
                  + currentdate.getMinutes() + ":"
                  + currentdate.getSeconds();

  console.log(currentdate);
  console.log(datetime);
  console.log(currentdate.getHours());
  console.log(new Date().getHours());
}



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

        insertText += cleanPlainTxt(module.querySelector("[data-sub-mod='summary']").innerText.replace(/(\t+|\n+)/gi, " ")) + "\"\n\n";
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

        if ( elExists(module.querySelector("[data-sub-mod='cta']")) ) {
          insertText +=  module.querySelector("[data-sub-mod='cta']").innerText.trim() + "\n";
          insertText +=  module.querySelector("[data-sub-mod='cta'] a").getAttribute("href").trim();
        }

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
        ////
        insertText += module.querySelectorAll("[data-sub-mod='course-title']")[0].innerText.trim() + "\n"
        if ( elExists(module.querySelectorAll("[data-sub-mod='author']")[0]) ) {
          insertText += module.querySelectorAll("[data-sub-mod='author']")[0].innerText.trim() + "\n\n";
        }
        insertText += module.querySelectorAll("[data-sub-mod='cta']")[0].innerText.trim() + " ";
        insertText += module.querySelectorAll("[data-sub-mod='cta'] a")[0].getAttribute("href").trim();
        insertText += "\n\n* * *\n\n";
        ////
        insertText += module.querySelectorAll("[data-sub-mod='course-title']")[1].innerText.trim() + "\n"
        if ( elExists(module.querySelectorAll("[data-sub-mod='author']")[1]) ) {
          insertText += module.querySelectorAll("[data-sub-mod='author']")[1].innerText.trim() + "\n\n";
        }
        insertText += module.querySelectorAll("[data-sub-mod='cta']")[1].innerText.trim() + " ";
        insertText += module.querySelectorAll("[data-sub-mod='cta'] a")[1].getAttribute("href").trim();
        insertText += "\n\n* * *\n\n";
        ////
        insertText += module.querySelectorAll("[data-sub-mod='course-title']")[2].innerText.trim() + "\n"
        if ( elExists(module.querySelectorAll("[data-sub-mod='author']")[2]) ) {
          insertText += module.querySelectorAll("[data-sub-mod='author']")[2].innerText.trim() + "\n\n";
        }
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

      if (moduleType === "bbanner" || moduleType === "tbanner" || moduleType === "banner") {

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


///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//////////////////////////// == xxxxxxxxxxxxxxxx == ///////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////


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


var preheader150 = preheader.substring(0, 150).trim();
preheader150 = "<div class='mod mod-preheader'><div class='title'>Preheader</div><div class='mod-body'>" + [preheader150.slice(0, 90), "<span class='preheader-back'>", preheader150.slice(90)].join('') + "</span></div></div>"; // http://stackoverflow.com/a/4364902/556079

preheaderWapper.innerHTML = preheader150;



////
//// Evaluate the preheader to see if it's been updated
////
//// Match the words in the first 90 characters against the rest of the email. Return the total matches as a percentage and throw an error if it's below a certain threshold.
////
////
console.groupCollapsed("Preheader Matching Log");

var preheader90 = cut(preheader, 90);

var textMinusPreheader = preheader.replace(preheader90,"");

var preheader90Pattern = escapeRegExp(preheader90.replace(/\..+/gi, "."));
    preheader90Pattern = new RegExp(preheader90Pattern, "gi");

if ( !preheader90Pattern.test(textMinusPreheader) ) {
  console.log("No exact match found, looking for individual matches. (failed regex: " + preheader90Pattern + ")");

  preheader90 = preheader90.replace(/\b(in|and|a|the|of|or|is|to)\b/gi, "");
  preheader90 = preheader90.replace(/(\!|\,|\.|\:)\s/gi, " ");
  preheader90 = preheader90.trim();
  preheader90 = preheader90.replace(/ +/gi, " ");

  preheader90 = preheader90.split(" ");

  var preheaderTotalWords = preheader90.length;

  var totalPreheaderWordsMatched = 0;

  console.log("Total words: " + preheaderTotalWords + " - Word list: " + preheader90);

  for (var i = 0; i < preheaderTotalWords; i++) {

    var matcher = escapeRegExp(preheader90[i]);
        matcher = new RegExp("\\b" + preheader90[i] + "\\b"); // double escape special characters

    if ( matcher.test(textMinusPreheader) ) {
      totalPreheaderWordsMatched++;
      console.log("Matched (" + totalPreheaderWordsMatched + "): " + preheader90[i] + " (regex: " + matcher + ")");
    }

  }

  var matchRating = Math.round(totalPreheaderWordsMatched/preheaderTotalWords*100);

} else {
  console.log("exact match! (successful regex: " + preheader90Pattern + ")");
  var matchRating = 100;
}


var preheaderMatchDiv = document.createElement("div");
    preheaderMatchDiv.className = "preheader-match-rating";
var preheaderMatchTextNode = document.createTextNode(matchRating + "%");
preheaderMatchDiv.appendChild(preheaderMatchTextNode);
preheaderWapper.appendChild(preheaderMatchDiv);

setTimeout(function() {

  if ( matchRating < 95 ) {
    alertify.error("Preheader text may not be updated! <div>Only " + matchRating + "% of the important words in the preheader match the rest of the email.", 0);
    preheaderMatchDiv.classList.add("error");
  }
  preheaderMatchDiv.classList.add("ready");

}, 500);

console.groupEnd();


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

  if ( this.nodeType !== 1 ) {
    dFrame.getElementById("link-markers").classList.add("on-page-load");
  } else if ( dFrame.querySelector(".on-page-load") ) {
    dFrame.getElementById("link-markers").classList.remove("on-page-load");
  } else {
    dFrame.getElementById("link-markers").classList.toggle("hidden");
  }
  history.replaceState(null,null, updateQueryString("links", "0") );
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



///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//////////////////////////// == xxxxxxxxxxxxxxxx == ///////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

//
// Modify our page view/style/css based on the querystring before we start modifying dFrame and mFrame.
//

if ( getParameterByName("infobar") || getParameterByName("mobile") ) {
  paneToggle(getParameterByName("infobar"), getParameterByName("mobile"));
  console.log("panes modified on page load via querystring");
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



//

if ( !elExists(dFrame.querySelector("[data-module-wrapper]")) ) {
  alertify.error("[data-module-wrapper] is missing. <div>Add this data- attribute to the <code>&lt;td&gt;</code> that wraps your main content.</div>", 0);
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
//    Iterate Through All Modules
//    https://www.kirupa.com/html5/get_element_position_using_javascript.htm
//    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of
//
////////////
////////////
////////////

var moduleSettingsWrapper = document.createElement("section");
    moduleSettingsWrapper.id = "module-settings";
    moduleSettingsWrapper.className = "debug module-settings-wrapper";
    dFrame.body.appendChild(moduleSettingsWrapper);


let moduleList = dFrame.querySelectorAll("[data-module-wrapper] > table");
var i = 0

console.groupCollapsed("Modules Group - Total Modules Found: " + moduleList.length);

for (let module of moduleList) {

  i++
  module.dataset.moduleCount = i;
  console.log(i);

  var moduleSettingsMenu = document.createElement("section");
      moduleSettingsMenu.className = "module-menu module-menu-" + i;

  var moduleSettingsMenuEdit = document.createElement("section");
      moduleSettingsMenuEdit.className = "edit";

  var moduleSettingsMenuHide = document.createElement("section");
      moduleSettingsMenuHide.className = "hide";

      moduleSettingsMenu.appendChild(moduleSettingsMenuEdit);
      moduleSettingsMenu.appendChild(moduleSettingsMenuHide);
      moduleSettingsWrapper.appendChild(moduleSettingsMenu);


}

console.groupEnd();

// Check if it exists first. If there were no modules to iterate through than this will be an undefined variable and throw an error.
if (typeof moduleSettingsMenu != 'undefined') {
  moduleSettingsWrapper.appendChild(moduleSettingsMenu);
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
//    Iterate Through All Links
//    https://www.kirupa.com/html5/get_element_position_using_javascript.htm
//    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of
//
////////////
////////////
////////////

let linkList = dFrame.querySelectorAll("a");
var i = 0

console.groupCollapsed("Links Group - Total Links Processed: " + linkList.length);

// Create the wrapper for the link-markers.

var linkMarkerWrapper = document.createElement("section");
linkMarkerWrapper.id = "link-markers";
linkMarkerWrapper.className = "debug link-markers-wrapper";
dFrame.body.appendChild(linkMarkerWrapper);

for (let link of linkList) {

  i++

  // Set link to a variable and clean it if it's local.
  var linkHref = link.href;
  if ( /^file:.+\//gi.test(linkHref) ) {
    linkHref = linkHref.replace(/^file:.+\//gi, "");
  }

  // Create link module in left column.
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

    var textLinkHref = document.createTextNode(linkHref.replace(/https?\:\/\/www\./gi, ""));
    linkRowHref.appendChild(textLinkHref);
    linkRow.appendChild(linkRowHref);

    console.groupCollapsed("[" + i + "] " + linkHref);
    console.log(link);
    console.log( getPosition(link, dFrame) );
    console.groupEnd();

    var linkPosition = getPosition(link, dFrame);

    link.classList.add("marked");

    var linkMarker = document.createElement("section");
    linkMarker.className = "link-marker";
    linkMarker.style.top = (linkPosition.y - 10) + "px";
    linkMarker.style.left = (linkPosition.x - 10) + "px";
    linkMarker.dataset.href = linkHref;
    linkMarker.dataset.number = i;
    dFrame.getElementById("link-markers").appendChild(linkMarker);

    var linkErrorLog = document.createElement("section");
    linkErrorLog.className = "link-errors";
    insertAfter(linkErrorLog, linkMarker);
    // linkMarker.appendChild(linkErrorLog);

    var linkErrorLogURL = document.createElement("section");
    linkErrorLogURL.className = "link-errors-url";
    var linkErrorLogURLTextNode = document.createTextNode(linkHref);
    linkErrorLogURL.appendChild(linkErrorLogURLTextNode);
    linkErrorLog.appendChild(linkErrorLogURL);

    var linkErrorLogNoticeWrapper = document.createElement("section");
    linkErrorLogNoticeWrapper.className = "link-errors-wrapper";
    linkErrorLog.appendChild(linkErrorLogNoticeWrapper);


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

      var errorRow = document.createElement("section");
      console.error(msg);
      var errorRowText = document.createTextNode(msg);
      errorRow.appendChild(errorRowText);
      linkErrorLogNoticeWrapper.appendChild(errorRow);

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

    var medbridgeDomainLink
    var medbridgeWwwLink
    var medbridgeOrMassageLink

    if ( /\/\/.+?\.?medbridge(ed|education|massage)\.com/gi.test(linkHref) ) {
      medbridgeDomainLink = true;
    } else {
      medbridgeDomainLink = false;
    }

    if ( /\/\/(www\.)?medbridge(ed|education)\.com/gi.test(linkHref) ) {
      medbridgeWwwLink = true;
      medbridgeOrMassageLink = true;
    } else {
      medbridgeWwwLink = false;
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

    var gaLink
    if ( medbridgeDomainLink && !outsideOrg && !emailSale ) {
      gaLink = true;
    } else {
      gaLink = false;
    }


    ///////////////////////
    ///////////////////////
    ///////////////////////
    ///////////////////////

    ////
    // Validate URL
    // Ignore valid URLs, valid mailto:, and valid MailChimp links ( *|text|* converted to *%7Ctext%7C* )
    // http://stackoverflow.com/a/15734347/556079
    // http://stackoverflow.com/a/3809435/556079
    // Unused - http://stackoverflow.com/questions/161738/what-is-the-best-regular-expression-to-check-if-a-string-is-a-valid-url
    ////
    // WTF IS THIS ===  !/^(http|https):\/\/[^ "]+$/.test(linkHref)

    if ( !/^mailto:(.+?@.+?\..+|\*\|)/.test(linkHref) && !/\*%7C.+?%7C\*/.test(linkHref) && !/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(linkHref) ) {
      createLinkErrorRow(linkMarker, "invalid URL scheme");
    }

    ///////////////////////
    ///////////////////////
    ///////////////////////
    ///////////////////////


    ////-----------------------------////
    ////
    // Check if it's a link to the blog.
    // Get its "Protected" status and ifs type (pearl or blog).

    // To-Do Notes:
    // ============
    //
    // Dropbox
    //  - Broken on Dropbox: Although we can load blog articles with https into the iframe, they eventually redirect (in ns emails) to an http address. When viewing the email on Dropbox the iframes get blocked because Dropbox can only be loaded with https. The http content gets blocked because it's an insecure resource. Sigh.
    //  - And since sessionsStorage we setup on file:/// doesn't transfer over to files viewed on Dropbox, it's always going to try to check the blog.
    //
    // ---
    //
    // sessionsStorage isn't good enough. I need to minimize my calls to the blog. chrome.storage.local might be necessary.
    // Can I periodically purge chrome.storage.local so that it doesn't get too big?
    //
    // After the affiliate linkback is fixed, I can switch over to uses the actual blog URL. This will allow me the -sub version to not recheck each article because it will be able to look at the same object as -ns does in sessionsStorage.
    //
    // If the tracking link (or any article link) doesn't load the article properly (or at all), a message is never sent to the eventpage and in turn nothing is sent back to the newsletter.
    //
    // Display an indicator that tells me the iframes are still processing. Give the green light once they've all been destroyed.
    //
    // Should I modify so that it only re-checks if I click something?
    // Should I consider looking the date in this files URL to help decide IF I should check?
    // Run the check again AFTER the postMessage comes back.
    // Do not fire alerts until I've determined that no more postMessages are comeing in from the blog.
    // Alerts should reference which article is protected.
    // What if when I land on the blog page and it's protected, and I haven't logged in yet to view the article?
    //  - Return a message where the authorType is ambiguous. Deal with it when you read it back.
    //
    // Definitely create a button to FORCE a recheck of all linked articles. Just in case!
    //
    // Reminders:
    // ==========
    //
    // A blog's author type should never change. As long as it's been set in sessionstorage, I don't need to check the blog more than once for this data.
    // Once unprotected, articles should never go protected. So I don't think I need to bother checking.
    //

    if ( medbridgeDomainLink && /(blog\/2|\-article)/gi.test(linkHref) ) {

      var isBlogLoaded = false;


      if ( /after_affiliate_url/gi.test(linkHref) ) {
        var blogLinkToCheck = linkHref.replace(/\&.+/gi, "");
            blogLinkToCheck = blogLinkToCheck.replace(/https?\:\/\/.+?after_affiliate_url\=\/?/gi, "");
      } else {
        var blogLinkToCheck = linkHref.replace(/\/?\?.+/gi, "");
            blogLinkToCheck = blogLinkToCheck.replace(/https?\:\/\/.+?\//gi, "");
      }

      console.log(blogLinkToCheck);

      // Check if this URL is already in sessionStorage
      blogStatus = sessionStorage.getItem(blogLinkToCheck);

      // Run a check on this link using the object we found in sessionStorage.
      if ( blogStatus ) {

        // blogStatus exists in sessionStorage. Check the link using data from sessionStorage.
        var blogStatusFromStorage = sessionStorage.getItem(blogLinkToCheck).split(",");
        console.log(blogStatusFromStorage);

        checkArticleLink(blogStatusFromStorage);

        if ( blogStatusFromStorage[2] === "protected" ) {
          // Article is still protected, open an iframe and check again.
          checkTheBlog(linkHref);
        }

      } else {
        console.error("blog status object not found in sessionStorage");
        checkTheBlog(linkHref);
      }

    }


    ///////////
    //
    //  Function to check the blog for data on an article.
    //
    ///////////
    function checkTheBlog(linkHref) {

      // Check if an iframe already exists with this URL by iterating through all relevant iframes in the DOM.
      let blogCheckList = document.querySelectorAll("iframe.blog-check");
      for (let blogIframe of blogCheckList) {

        console.log("blogIframe.getAttribute('src') = " + blogIframe.getAttribute("src"));
        console.log("isBlogLoaded = " + isBlogLoaded);

        if ( blogIframe.getAttribute("src").replace(/[?&]blog\-check\=.+/gi, "") === linkHref ) {
          isBlogLoaded = true;
          console.log("if isBlogLoaded = " + isBlogLoaded);
        } else {
          console.log("else isBlogLoaded = " + isBlogLoaded);
        }

      }

      if ( isBlogLoaded === false ) {
        console.log("if isBlogLoaded = " + isBlogLoaded);

        // Create an iframe for this link
        console.log("Creating iframe for link " + i);
        var blogCheck = document.createElement("iframe");
            blogCheck.src = linkHref + "&blog-check=" + i;
            blogCheck.className = "blog-check blog-check-" + i;
            blogCheck.id = "iframe-" + i;
        document.body.appendChild(blogCheck);

      } else {
        console.log("else isBlogLoaded = " + isBlogLoaded);
      }
    }

    ////-----------------------------////
    ////
    // Every link needs a target attribute.
    if ( !link.hasAttribute("target") ) {
      createLinkErrorRow(linkMarker, "missing target attribute");
    }

    ////-----------------------------////
    ////
    // MUST HAVE UTM - Check for utm_content on links going to medbridgeeducation.com or medbridgemassage.com. Error if utm_content is not present.
    if ( gaLink && !/utm_content/gi.test(linkHref) ) {
      createLinkErrorRow(linkMarker, "missing utm");
    }

    ////-----------------------------////
    ////
    // DON'T USE UTM - outsideOrg, off domain urls, and Sale emails should not have utms
    if ( /utm_content/gi.test(linkHref) && !gaLink ) {
      createLinkErrorRow(linkMarker, "remove utm");
    }

    ////
    // Check for whitelabeling versus www
    if ( outsideOrg && !blogLink && medbridgeDomainLink ) {

      if ( medbridgeWwwLink ) {
        createLinkErrorRow(linkMarker, "missing whitelabeling");
      }
      else if ( (emailSubType === "hs" && !/\/healthsouth\./i.test(linkHref)) || (emailSubType === "dr" && !/\/drayerpt\./i.test(linkHref)) || (emailSubType === "fox" && !/\/foxrehab\./i.test(linkHref)) ) {
        createLinkErrorRow(linkMarker, "incorrect whitelabeling");
      }

    }




    ////
    // Is the module # in the utm correct?
    ////

    // console.error("0");
    //
    // console.log("emailSubType: " + emailSubType);
    // console.log("outsideOrg: " + outsideOrg);
    // console.log("medbridgeDomainLink: " + medbridgeDomainLink);

    if ( gaLink ) {

      var moduleNumber = link.closest("[data-module-count]");

      if ( elExists(moduleNumber) ) {

        var moduleNumber = moduleNumber.getAttribute("data-module-count");
        var moduleNumberMatch = new RegExp("utm_content=mod" + moduleNumber, "gi");

        if ( /utm_content=mod\d/gi.test(linkHref) ) {

          if ( !moduleNumberMatch.test(linkHref) ) {
            // console.log( "no match: " + !moduleNumberMatch.test(linkHref) );
            createLinkErrorRow(linkMarker, "wrong mod #, use " + "mod" + moduleNumber);
          } else {
            // console.log( "match: " + !moduleNumberMatch.test(linkHref) );
          }

        } else {

          createLinkErrorRow(linkMarker, "missing mod #, use " + "mod" + moduleNumber);

        }
      }
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
    // Links to MedBridge in -ns emails need to use a marketing URL
    if ( (emailSubType === "ns" && !outsideOrg && emailDisc !== "ent") && medbridgeDomainLink && ( !/\.com\/trk\-/gi.test(linkHref) || /\.com\/(signin|courses\/|blog\/)/gi.test(linkHref) )  ) {
      createLinkErrorRow(linkMarker, "use a marketing URL");
    }


    ////
    // Check for old fashioned marketing URLS in sub or outsideOrg
    if ( (outsideOrg || emailSubType === "sub" ) && (medbridgeDomainLink && /\.com\/trk\-/gi.test(linkHref) || /after_affiliate_url/gi.test(linkHref)) ) {
      createLinkErrorRow(linkMarker, "do not use marketing url");
    }

    ////
    // Check for medium=email in Sale and Presale emails
    ////
    if ( !outsideOrg && medbridgeDomainLink && ( blogLink || /\-article/gi.test(linkHref) ) ) {

      if ( emailAnySale ) { // Any sale email

        if ( emailSubType === "sub" && /medium=email/gi.test(linkHref) ) {
          createLinkErrorRow(linkMarker, "remove medium=email");
        }

        if ( emailSubType === "ns" && !/medium=email/gi.test(linkHref) ) {
          createLinkErrorRow(linkMarker, "add medium=email");
        }

      } else { // Not a sale email

        if ( /medium=email/gi.test(linkHref) ) {
          createLinkErrorRow(linkMarker, "remove medium=email");
        }

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
      if ( ( !blogLink && !/\-article/gi.test(linkHref) ) && /sub=yes/gi.test(linkHref) ) {
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
    // Use /patient_care/programs/create
    if ( outsideOrg && /\home-exercise-program/gi.test(linkHref) ) {
      createLinkErrorRow(linkMarker, "outsideOrg uses /patient_care/programs/create instead");
    }

    ////
    // Discipline Check

    if ( emailDisc !== "multi" && emailDisc !== null && medbridgeDomainLink && !blogLink && !/\/courses\/details\//gi.test(linkHref) ) {

      if ( emailDisc !== "slp" && (/#\/?speech-language-pathology/gi.test(linkHref) || /-slp(\-|\/|\?)/gi.test(linkHref)) ) {
        createLinkErrorRow(linkMarker, "wrong discipline");
      }
      if ( ( emailDisc !== "pt" && emailDisc !== "dr" ) && (/#\/?physical-therapy/gi.test(linkHref) || /-pt(\-|\/|\?)/gi.test(linkHref)) ) {
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

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//////////////////////////// == xxxxxxxxxxxxxxxx == ///////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

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
    find: /(ASHA|\bAOTA|BOC\-Approved)/g,
    wrap: 'span',
    wrapClass: "text-error"
  });

} else if ( emailDisc === "at" ) {
  // Athletic Training - AT

  findAndReplaceDOMText(dFrame.getElementsByTagName('body')[0], {
    find: /(ASHA|\bAOTA|Physical Therapy)/g,
    wrap: 'span',
    wrapClass: "text-error"
  });

} else if ( emailDisc === "ot" ) {
  // Occupational Therapy - OT

  findAndReplaceDOMText(dFrame.getElementsByTagName('body')[0], {
    find: /(ASHA|BOC\-Approved|Physical Therapy)/g,
    wrap: 'span',
    wrapClass: "text-error"
  });

} else if ( emailDisc === "slp" ) {
  // Speech Language Pathology - SLP

  findAndReplaceDOMText(dFrame.getElementsByTagName('body')[0], {
    find: /(\bAOTA|BOC\-Approved|Physical Therapy)/g,
    wrap: 'span',
    wrapClass: "text-error"
  });

} else if ( emailDisc === "lmt" ) {
  // Massage

  findAndReplaceDOMText(dFrame.getElementsByTagName('body')[0], {
    find: /(ASHA|\bAOTA|BOC\-Approved|Physical Therapy)/g,
    wrap: 'span',
    wrapClass: "text-error"
  });

} else if ( emailDisc === "ent" ) {
  // Enterprise

  ///

}


// All
findAndReplaceDOMText(dFrame.getElementsByTagName('body')[0], {
  find: /(certification|at no extra cost|[^\u00a0]\u2192)/gi, // Update to add "word &nbsp;&rarr;" as an error
  wrap: 'span',
  wrapClass: "text-error"
});

// All (case sensitive)
findAndReplaceDOMText(dFrame.getElementsByTagName('body')[0], {
  find: /\b[Mm]edbridge( |\.|\!)/g,
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
    find: /(Start Now|in (an|your) annual|Register Now|Refer(\-| )a(\-| )Friend)/gi,
    wrap: 'span',
    wrapClass: "text-error"
  });
}

// outsideOrg
if ( outsideOrg ) {
  findAndReplaceDOMText(dFrame.getElementsByTagName('body')[0], {
    find: /additional cost|Refer(\-| )a(\-| )Friend/gi,
    wrap: 'span',
    wrapClass: "text-error"
  });
}

// emailAnySale
if ( !emailAnySale ) {
  findAndReplaceDOMText(dFrame.getElementsByTagName('body')[0], {
    find: /\$200/gi,
    wrap: 'span',
    wrapClass: "text-error"
  });
}


////////////
////////////
////////////
//
//    Alerts!!
//
////////////
////////////
////////////

if ( /Refer(\-| )a(\-| )Friend/gi.test(dFrame.body.textContent) ) {
  alertify.error("Refer a Friend<div>Remember update the MailChimp database and use conditional statements to only show Refer a Friend content to eligible contacts.</div>", 0);
}


// if ( !elExists(dFrame.querySelector("[data-module-wrapper]")) ) {
//   alertify.error("[data-module-wrapper] is missing. <div>Add this data- attribute to the <code>&lt;td&gt;</code> that wraps your main content.</div>", 0);
// }
// if ( emailSubType === "ns" && ) {
//   findAndReplaceDOMText(dFrame.getElementsByTagName('body')[0], {
//     find: /(Start Now|in (an|your) annual|Register Now|Refer(\-| )a(\-| )Friend)/gi,
//     wrap: 'span',
//     wrapClass: "text-error"
//   });
// }

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
//    URL Querystring settings
//
//    1/30 - Moved further to the bottom of the code because when it was placed earlier, loading a file with styles off (style=0) cause the desktop view to bug out.
//    It didn't seem to understand that the iFrame width wasn't mobile sized thus activating unwated styles.
//
////////////
////////////
////////////

if ( getParameterByName("img") === "0" ) {
  toggleImages();
  console.log("images off");
}

if ( getParameterByName("style") === "0" ) {
  toggleStyles();
  console.log("styles off");
}

if ( getParameterByName("borders") === "1" ) {
  toggleBorders();
  console.log("box-shadow borders shown");
}

if ( getParameterByName("guides") === "1" ) {
  toggleGuides();
  console.log("guides shown");
}

if ( getParameterByName("links") === "0" ) {
  toggleLinkMarkers();
  console.log("links hidden");
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
//    Spell Check
//
////////////
////////////
////////////

  //Activate Chrome's built-in spellcheck by focusing the cursor and then un-focusing. This works by making the HTML contenteditable and then applying focus. For some reason Chrome keeps the squiggly lines when you unfocus and turn off contenteditable which is great for us because it keeps everything else nice and clean.
  dFrame.getElementsByTagName('html')[0].contentEditable = 'true';
  dFrame.getElementsByTagName('html')[0].classList.add("spellcheck");
  dFrame.getElementsByTagName('body')[0].focus();

  // For some reason, if contenteditable is turned off too quickly, the red squiggles are sometimes misaligned with the text they are indicating as incorrectly spelled. For this reason we're using a setTimeout here.
  setTimeout(function() {
    dFrame.getElementsByTagName('html')[0].contentEditable = 'false';
    dFrame.getElementsByTagName('html')[0].classList.remove("spellcheck");

    mFrame.getElementsByTagName('html')[0].contentEditable = 'true';
    mFrame.getElementsByTagName('html')[0].classList.add("spellcheck");
    mFrame.getElementsByTagName('body')[0].focus();
  }, 200);

  setTimeout(function() {
    mFrame.getElementsByTagName('html')[0].contentEditable = 'false';
    mFrame.getElementsByTagName('html')[0].classList.remove("spellcheck");

    document.querySelector('.mod-preheader .mod-body').contentEditable = 'true';
    document.querySelector('.mod-preheader .mod-body').focus();
  }, 400);

  setTimeout(function() {
    document.querySelector('.mod-preheader .mod-body').contentEditable = 'false';
  }, 600);


///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//////////////////////////// == xxxxxxxxxxxxxxxx == ///////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

    //////////

    chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
        console.log(request.greeting);

        var blogStatusReply = request.greeting.split("|");
        console.log(blogStatusReply);

        var blogUrlChecked = document.querySelector("#iframe-" + blogStatusReply[4]).getAttribute("src").replace(/[?&]blog\-check.+/gi, "");

        if ( /after_affiliate_url/gi.test(blogUrlChecked) ) {
          blogUrlChecked = blogUrlChecked.replace(/\&.+/gi, "");
        } else {
          blogUrlChecked = blogUrlChecked.replace(/\?.+/gi, "");
        }
        blogUrlChecked = blogUrlChecked.replace(/^https?\:\/\/.+?\//i, "");
        blogUrlChecked = blogUrlChecked.replace(/\/$/i, "");

        console.log(blogUrlChecked);
        console.log(blogStatusReply[1] + "|" + blogUrlChecked);

        sessionStorage.setItem(blogUrlChecked, blogStatusReply);

        destroy(document.querySelector("#iframe-" + blogStatusReply[4]));
        console.log("#iframe-" + blogStatusReply[4] + " destroyed.")

      }
    );


    // Need to use this during link checking and again once the postMessages come back. Figure that out.
    function checkArticleLink(obj) {
      var blogStatusFromStorage = obj;
      // Check Protects/Unprotected
      if ( blogStatusFromStorage[2] === "protected" ) {
        createLinkErrorRow(linkMarker, "article is protected");
        alertify.error("An Article is Protected<div>Remember to unprotect all articles before sending out the newsletter.</div>", 0);
      }
      // Check Pearl vs Blog
      if ( gaLink ) {
        if ( blogStatusFromStorage[3] === "blogger" && !/\-blog/i.test(linkHref) ) {
          createLinkErrorRow(linkMarker, "add 'blog' to utm");
        } else if ( blogStatusFromStorage[3] === "pearl" && !/\-pearl/i.test(linkHref) ) {
          createLinkErrorRow(linkMarker, "add 'pearl' to utm");
        }
      }
    }



///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//////////////////////////// == xxxxxxxxxxxxxxxx == ///////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

///////

document.querySelector("html").classList.toggle("errors");
console.log("// End of script")




} // END TEST
//
//
//
