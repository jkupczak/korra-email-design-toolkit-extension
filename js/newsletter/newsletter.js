var view = getParameterByName("view");
if ( view !== "1" ) {


//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//
//   Search ##PAUSED to see code that is only TEMPORARILY turned off.
//
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


//
// MAILCHIMP!!!!
// Check subject line against the preheader. Look for repeated sentences/phrases.
// CHECK FOR MAILCHIMP CODES FOR FORWARD AND UNSUB!!!
// ALERT IF ITS MC OR GR CODES
//
//

// @TODO: https://codepen.io/jimmykup/pen/ajbRpm?editors=1100

///--------

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// MAILCHIMP MAILCHIMP MAILCHIMP MAILCHIMP
// MAILCHIMP MAILCHIMP MAILCHIMP MAILCHIMP
// MAILCHIMP MAILCHIMP MAILCHIMP MAILCHIMP
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//
// Extract the blog check functions so that they can be used on mailchimp.com.
// Disallow saving, exiting, and navigating away until I acknowledge that the article is not unprotected yet.
// Make this acknowledgement independant of MailChimp's DOM so that if the site changes, my script doesn't break.
// Use Tingle to show a popup with a confirmation button.
// Save to chrome.storage (so that it persists across tabs) the article status.
// When I try to schedule or send the email, check chrome.storage and stop me until the article has been unprotected.
// And for that matter, make sure we're using chrome.storage instead of sessionstorage in newsletter.js.
// Deal with cleaning up storage by keeping the data in there until an associated mailchimp campaign ID is loaded, and then scheduled or sent.


///--------

// A/B Testing View
// Show versions A and B side-by-side with a click of a button.
// Sync scrolling and dedicate 50% of the window to each version. (hide leftNav and mobile)
// Drag to resize both iframes for mobile view.

///--------

// Command/Ctrl Click a link to reveal link info?
//   - Full URL
//   - List of attached UTMs
//   - Times this link occurs in the document (And which time it is, is it the 1st occurence of this link?)
//       - Ignore utms
//   - Order of this link (is it the 1st link? the 5th?)
//   Denote if it's a tracking URL or not, if its a blog link, if its a MedBridge or 3rd party link

///--------

// Switch to a =1001 setup for determining visible layout. Handle it all at once as early as possible to have a smooth page load
// See how codepen does it: https://codepen.io/pen/?editors=0010


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
//     _______  ______    _______  _______  ___      ___   _______  __   __  _______
//    |       ||    _ |  |       ||       ||   |    |   | |       ||  | |  ||       |
//    |    _  ||   | ||  |    ___||    ___||   |    |   | |    ___||  |_|  ||_     _|
//    |   |_| ||   |_||_ |   |___ |   |___ |   |    |   | |   | __ |       |  |   |
//    |    ___||    __  ||    ___||    ___||   |___ |   | |   ||  ||       |  |   |
//    |   |    |   |  | ||   |___ |   |    |       ||   | |   |_| ||   _   |  |   |
//    |___|    |___|  |_||_______||___|    |_______||___| |_______||__| |__|  |___|
//
//    ASCII: Modular - http://patorjk.com/software/taag/#p=display&h=0&v=0&f=Modular&t=VALIDATE
//
// Pre-Flight Checklist
//  - Links
//  - Keyword Check
//  - Preheader
//  - Zoom Level
//  - Mobile View
//  - Pending Edits - "You have pending edits!"
//
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//
//  TO-DO LIST ✓ ■
//  ==============
//
//  ## Link Markers ---
//    ■ - Create a 'warning' class in addition to the 'error' class for link-markers. If an email is very old, mark link errors as warnings.
//    ■ - Unlike errors, warnings should be hidden until you hover over the link.
//    ■ - Create a button that will toggle/show all link-markers regardless of error/warning status.
//    ✓ - [COMPLETE] Pinning - Clicking on markers will pin the info div to the bottom of the screen. Clicking the same or any other marker will unpin it.
//    ✓ - [COMPLETE] Check URL for correct querystring pattern (? vs &)
//
//  ## [ORB] TD Markers ---
//    ■ - Give them "levels" to show how deep they are.
//    ■ - Create a toggle that cycles through the different levels so that you can see more clearly.
//        - Show a toolbar at the bottom of the page to achieve this.
//    ■ - Hide all inactive markers, or simply make them very low opacity.
//
//  ## Modules Menu ---
//    ■ - Give each module its own mini-menu to hide, duplicate, re-order and edit.
//
//  ## Alerts ---
//    ■ - Consider using Toastr instead of Alertifyjs.com - https://github.com/CodeSeven/toastr
//
//  ## Get local user path automatically ---
//    ■ - After the user loads their first local file, grab the URL and save it to chrome.storage.sync.
//    ■ - Only do this if it's NOT already set. So check for it first, if it's null, find it automatically and save it.
//    ■ - Figure out the difference between mac/windows/linux and make sure it works for all 3
//    ■ - Maybe don't save the "file:///" part?
//
//////////////
//////////////
//  ERROR IDEAS
//////////////
//////////////
//
//  ## Errors log
//    ■ - Hidden panel that expands to show a listing of all errors (sorted by category).
//    ■ - Similar in look and functionality to the planned Tools Panel
//    ■ - Activate the panel by clicking an orb.
//    ■ - The orb should be flashing red with a number if there's at least 1 error
//        - Yellow and still if only warnings are available
//        - Green with a checkmark if everything is awesome.
//
//
//////////////
//////////////
//  ORB IDEAS
//////////////
//////////////
//
//  ## [ORB] Compare NS vs SUB, A vs B ---
//    ■ - Side-by-side view of two or more emails.
//      - Probably need to load this in chrome extension URL (or maybe even that won't work?)
//
//  ## [ORB] Toggle View - Padding and Margin ---
//    ■ - Can I generate divs that show margin and padding?
//
//  ## [ORB] Show Colors Used ---
//    ■ - Use allcolors.js in the Snippets section of dev tools.
//
//  ## [ORB] Toggle All Off ---
//    ■ - One master orb to turn off all running orbs.
//
//  ## [ORB] Guidelines ---
//    ■ - Create toggle that will add PhotoShop-esque guidelines to all or individual images in the email. This will help show any alignment issues that may exist.
//    ■ - Turn on "Guidelines" mode and click anywhere on the page to add custom guidelines.
//
//  ## [ORB] Image Dimensions ---
//    ■ - Overlay a div on all images that shows their current size as well as their original size.
//
//  ## [ORB] Swap Font Stack ---
//    ■ - Simulate what the email will look like in email clients that do not support @font-face or have Helvetica.
//    ■ - Remove all instances of "Roboto" from font-family: declarations, and then Helvetica.
//
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////



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
  let styleBlocks = document.querySelectorAll("style");
  for (let styleBlock of styleBlocks) {
    destroy(styleBlock);
  }
  let linkedStylesheets = document.querySelectorAll("[rel='stylesheet']");
  for (let linkedStylesheet of linkedStylesheets) {
    destroy(linkedStylesheet);
  }

  // Destroy all <body> tags.
  let bodyEle = document.querySelectorAll("body");
  for (let body of bodyEle) {
    destroy(body);
  }

  // Create a new <body> tag.
  var newBody = document.createElement("body");
  insertAfter(newBody, document.head);



//////////////////////
//////////////////////
//////////////////////
//////////////////////


// ERROR CHECKING FOR ENTIRE PAGE
document.querySelector("html").classList.add("error-status");
document.querySelector("html").classList.toggle("errors");
//


///////////
///////////
///////////
//// Pre-Load Variables
//// The construction of our HTML is dependant on these variables being set first.
///////////
///////////
///////////

var suppressAlerts = false;
if ( getParameterByName("presentation") === "1" ) {
  suppressAlerts = true;
  console.log("alerts suppressed");
}

  ////////////////////////////////
  //
  // Apply class to the HTML element so that we can activate styles for this new page.
  //

  document.getElementsByTagName('html')[0].classList.add("powered-up");


//////////


  // Create Main Container
  var mainContainer = document.createElement("div");
  mainContainer.className = "main-container";
  document.body.appendChild(mainContainer);


//////////

  // Create QA Wrapper
  // var qaWrapper = document.createElement("div");
  // qaWrapper.className = "qa-wrapper";
  // mainContainer.appendChild(qaWrapper);

  //////////
  ////
  ////  Create Newsletter QA Info Bar Wrapper
  ////
  /////////

  // Create the "panes" div that will hold all left-hand side UIs.
  var panes = document.createElement("div");
  panes.className = "panes";
  mainContainer.appendChild(panes);

          // Create Split View
          // console.log("activate split mode");
          document.body.classList.toggle("split-view-on");


  var mainPane = document.createElement("div");
  mainPane.classList.add("pane", "main-pane");
  panes.appendChild(mainPane);

  //////////
  ////
  ////  HTML vs Text
  ////
  /////////


  var stagePreviewBtns = document.createElement("div");
  stagePreviewBtns.classList.add("stage-preview-btns");
  stagePreviewBtns.addEventListener("click", changeStage, false);

  var viewHtmlBtn = document.createElement("div");
  viewHtmlBtn.classList.add("stage-preview-btn", "stage-preview-btn--preview", "active");
  viewHtmlBtn.dataset.stage = "html";
  viewHtmlBtn.innerHTML = "Preview";
  stagePreviewBtns.appendChild(viewHtmlBtn);

  var viewCodeBtn = document.createElement("div");
  viewCodeBtn.classList.add("stage-preview-btn", "stage-preview-btn--code");
  viewCodeBtn.dataset.stage = "code";
  viewCodeBtn.innerHTML = "Code";
  stagePreviewBtns.appendChild(viewCodeBtn);

  var viewTextBtn = document.createElement("div");
  viewTextBtn.classList.add("stage-preview-btn", "stage-preview-btn--text");
  viewTextBtn.dataset.stage = "text";
  viewTextBtn.innerHTML = "Text";
  stagePreviewBtns.appendChild(viewTextBtn);

  mainPane.appendChild(stagePreviewBtns);


  function changeStage() {
    console.log(event)
    console.log(event.target)
    console.log(event.target.data)
    console.log(event.target.dataset)
    console.log(event.target.dataset.stage)
    console.log(this)

    var btn = event.target;
    var stage = event.target.dataset.stage;

    btn.classList.toggle("active");

    if ( stage === "text" ) {
      plainTextStage.style.display = "flex";
      codeStage.style.display = "none";
      htmlStage.style.display = "none";

      viewTextBtn.classList.add("active");
      viewHtmlBtn.classList.remove("active");
      viewCodeBtn.classList.remove("active");
    }
    else if ( stage === "code" ) {
      codeStage.style.display = "flex";
      plainTextStage.style.display = "none";
      htmlStage.style.display = "none";

      viewCodeBtn.classList.add("active");
      viewTextBtn.classList.remove("active");
      viewHtmlBtn.classList.remove("active");

      // activateCodeStage();
    }
    else {
      htmlStage.style.display = "flex";
      plainTextStage.style.display = "none";
      codeStage.style.display = "none";

      viewHtmlBtn.classList.add("active");
      viewTextBtn.classList.remove("active");
      viewCodeBtn.classList.remove("active");
    }


  }
  //////////
  ////
  ////  This holds all of our various views.
  ////   - Desktop View
  ////   - Mobile View
  ////   - Plain Text View
  ////   - All menu views like Links, Images, etc.
  ////
  /////////

  // Create the Stage
  var stagesWrapper = document.createElement("div");
  stagesWrapper.className = "stages";
  mainContainer.appendChild(stagesWrapper);



  //////////
  ////
  ////  HTML View
  ////
  /////////

  // Create the Stage
  var htmlStage = document.createElement("div");
  htmlStage.classList.add("stage", "html-stage");
  stagesWrapper.appendChild(htmlStage);


  //////////////////////
  //
  //  DESKTOP VIEW
  //
  //     -
  //
  //
  //
  //
  //////////////////////

    var iframeWrapper = document.createElement("div");
    iframeWrapper.className = "iframe-wrapper";
    htmlStage.appendChild(iframeWrapper);

    var desktopIframeWrapper = document.createElement("div");
    desktopIframeWrapper.className = "desktop-view-wrapper resize-container";
    iframeWrapper.appendChild(desktopIframeWrapper);

    var desktopIframeResizeWrapper = document.createElement("div");
    desktopIframeResizeWrapper.className = "desktop-view-resize-wrapper resize-drag";
    desktopIframeWrapper.appendChild(desktopIframeResizeWrapper);

    var desktopIframeParent = document.createElement("div");
    desktopIframeParent.className = "desktop-iframe-parent iframe-parent";

    var desktopIframe = document.createElement("iframe");
    desktopIframe.className = "iframe-desktop-view";
    desktopIframe.id = "desktop-view"
    desktopIframeParent.appendChild(desktopIframe)
    desktopIframeResizeWrapper.appendChild(desktopIframeParent)

    var desktopResizeHtml = '<div data-resize="top-right" class="resize-handler resize-corner resize-point-top resize-point-right resize-point-top-right"></div><div data-resize="bottom-right" class="resize-handler resize-corner resize-point-right resize-point-bottom resize-point-bottom-right"></div><div data-resize="bottom-left" class="resize-handler resize-corner resize-point-bottom resize-point-left resize-point-bottom-left"></div><div data-resize="top-left" class="resize-handler resize-corner resize-point-left resize-point-top resize-point-top-left"></div><div data-resize="top" class="resize-handler resize-side resize-point-top  resize-point-top-right resize-point-top-left"></div><div data-resize="right" class="resize-handler resize-side resize-point-right resize-point-top-right  resize-point-bottom-right"></div><div data-resize="bottom" class="resize-handler resize-side resize-point-bottom resize-point-bottom-right resize-point-bottom-left"></div><div data-resize="left" class="tap-to-resize resize-handler resize-side resize-point-left resize-point-bottom-left resize-point-top-left"></div>';
    desktopIframeResizeWrapper.insertAdjacentHTML('beforeend', desktopResizeHtml);

    // Function to load iframe with HTML.
    loadIframe(desktopIframe, cleanedDesktopHtml, true, "desktop");
    // iframe loaded

    // Apply the desktop iframes document object to a variable
    var dFrameContents = desktopIframe.contentDocument;
    var dFrameBody = dFrameContents.body;
    var dFrameHTMLEle = dFrameContents.documentElement;

    // Get all links, global variable
    linkList = dFrameContents.querySelectorAll("a");
    linkListArr = Array.from(linkList);
    linkInfoArray = [];

    linkListUniqueURLs = createUniqueArrayOfURLs(linkListArr);
    linkListUniqueURLs.push("https://www.google.com");

    // Get all images
    let imgList = dFrameContents.images; // better?
    createImgInfoArray(imgList);

    // ##PAUSED
    addLoadEvent(desktopIframe, function() {
      getImgSizes(imgInfoArray);

      var imgUrls = [];
      for (let img of imgInfoArray) {
        imgUrls.push(img.url);
      }
      // console.log("imgUrls", imgUrls);

      handleNetErr = function(e) { return e };
      Promise.all(imgUrls.map(function(e) {
        return fetch(e).catch(handleNetErr)
      })).then(function(e) {
        console.log('then',e) // Outputs: 'then', [Response, TypeError]
      }).catch(function(e) {
        console.log('err',e)
      });

      ////////
      // Create a UI for showing/hiding conditionals if they exist.
      ///////
      // if ( conditionalsExist ) {
        createConditionalsUI();
      // }

    });



  //////////
  ////
  ////  Code View
  ////
  /////////

  // Create the Stage
  var codeStage = document.createElement("div");
  codeStage.classList.add("stage", "code-stage");
  codeStage.style.display = "none";
  stagesWrapper.appendChild(codeStage);

  // function activateCodeStage() {

    var myCodeMirror = CodeMirror(codeStage, {
      value: originalHtml,
      mode:  "htmlmixed",
      theme: "monokai",
      scrollbarStyle: "overlay",
      tabSize: 2,
      lineNumbers: true,
      autoRefresh: true, // https://github.com/codemirror/CodeMirror/issues/798
      lineWrapping: true,
      styleSelectedText: true,
      viewportMargin: Infinity,

            foldGutter: {
                rangeFinder: new CodeMirror.fold.combine(CodeMirror.fold.xml, CodeMirror.fold.brace, CodeMirror.fold.comment)
            },
            gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],

      styleActiveLine: true,
      actions: {
          toggleHtml: function() {
              this.sendAction("toggleHtml")
          },
          toggleCss: function() {
              this.sendAction("toggleCss")
          },
          viewCompiled: function() {
              this.sendAction("viewCompiled")
          }
      }
    });

  // }



///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//////////////////////////// == xxxxxxxxxxxxxxxx == ///////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////



    ////
    //////
    // Grab all of the TEXT in the document before we start manipulating the HTML
    var preheader = cleanPlainTxt(dFrameBody.textContent); // http://stackoverflow.com/a/19032002/556079



    // desktopIframe.onload = () => {
    //   console.log("wow");
    //   getImgAll(dFrameContents).then(list => console.log(list))
    // };


  //////////////////////
  //
  //  DUMMY VIEW
  //
  //     Used to gather data about the desktop and mobile views on page load.
  //     Necessary because our normal, visible iframes for desktop and mobile could load at different widths.
  //     For example, our normal desktop view might load at a mobile width because the browser window is too small.
  //     Or the normal mobiel view might not load at all because it was set to hidden on the previous page load.
  //
  //////////////////////

    // Dummy Window for Desktop view
    var dummyIframe = document.createElement("iframe");
    dummyIframe.className = "dummy-iframe";
    dummyIframe.style = "width:800px; position:absolute; left:-99999px; top:-9999px; z-index: -99999; opacity:0; pointer-events:none;";
    document.body.appendChild(dummyIframe)
    // Function to load iframe with HTML.
    loadIframe(dummyIframe, cleanedOriginalHtml, false);
    // Set the dummy frame contents
    var dummyFrameContents = dummyIframe.contentDocument;
    // Get link list of dummy frame
    dummyLinkList = dummyFrameContents.querySelectorAll("a");

  //////////////////////
  //
  //  MOBILE VIEW
  //
  //     -
  //
  //
  //
  //
  //////////////////////

    var mobileIframeWrapper = document.createElement("div");
    mobileIframeWrapper.className = "mobile-view-wrapper";
    iframeWrapper.appendChild(mobileIframeWrapper);

    var mobileDeviceWrapper = document.createElement("div");
    mobileDeviceWrapper.className = "mobile-device-view";
    mobileIframeWrapper.appendChild(mobileDeviceWrapper)

    var mobileIframeParent = document.createElement("div");
    mobileIframeParent.className = "mobile-iframe-parent iframe-parent";

    var mobileIframe = document.createElement("iframe");
    mobileIframe.className = "iframe-mobile-view";
    mobileIframe.id = "mobile-view"
    mobileIframeParent.appendChild(mobileIframe)
    mobileDeviceWrapper.appendChild(mobileIframeParent)

    // Function to load iframe with HTML.
    loadIframe(mobileIframe, cleanedMobileHtml, true, "mobile");
    // iframe loaded


    // Apply the mobile iframes document object to a variable
    var mFrameContents = mobileIframe.contentDocument;

    // Quick <style> Injection
    //
    // Inject a style block into this iframe via javascript to quickly apply styles on page load. Loading a link to a css file takes a bit to activate. So any styles that are important to have right away should go here. We inject it here instead of adding it inside a .css link because it loads faster. If we used a .css file there would be a flash on page load where the styles aren't applied yet.
    // Additionally, adding this string to the original un-parsed HTML before the iFrame is rendered does NOT work. Even at that stage it takes the CSS a bit to activate.
    // Making this method the FASTEST and most unobstrusive method to get CSS to load without FOUT.
    // http://stackoverflow.com/a/33079951/556079
    //
    // - Remove scrollbar from mobile view while still allowing scrolling
    //
    var mStyleElement = mFrameContents.createElement("style");
        mStyleElement.className = "debug";
    mStyleElement.appendChild(mFrameContents.createTextNode("html::-webkit-scrollbar-track { background:#fbfbfb; } html::-webkit-scrollbar { width:0px; background: transparent; } html::-webkit-scrollbar-thumb { border-radius:10px; background:#a6a6a6; border:4px solid #fbfbfb; }") );
    mFrameContents.getElementsByTagName("head")[0].appendChild(mStyleElement);


    ////////
    ////////
    ////////

    var mobileIframeSetting = document.createElement("div");
    mobileIframeSetting.className = "mobile-iframe-settings";

    mobileIframeSetting.innerHTML = '<div id="mobile-320" class="mobile-dim active" data-mobile-width="320">320</div><div id="mobile-360" class="mobile-dim" data-mobile-width="360">360</div><div id="mobile-375" class="mobile-dim" data-mobile-width="375">375</div><div id="mobile-414" class="mobile-dim" data-mobile-width="414">414</div><div id="mobile-480" class="mobile-dim" data-mobile-width="480">480</div>'

    mobileIframeSetting.addEventListener("click", changeMobileSize, false);

      function hideMobileWrapper() {
        mobileIframeWrapper.classList.toggle('off');
      }

    mobileDeviceWrapper.appendChild(mobileIframeSetting);



//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
////                                              ////
////           Create Global Variables            ////
////                                              ////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////


///////////
///// Determine location of the file you're currently viewing.
///////////
// var pageUrl = document.URL;
// Piece the URL together to prevent using a URL that has querystring parameters.
var pageUrl = document.location.origin + document.location.pathname;

if ( /dropboxusercontent/gi.test(pageUrl) ) {
  var onDropbox = true;
} else if ( /^file\:\/\/\//gi.test(pageUrl) ) {
  var isLocalFile = true;
} else if ( /\/\/localhost\:/gi.test(pageUrl) ) {
  var isLocalHost = true;
  if ( /localhost\:4567/gi.test(pageUrl) ) {
    var onMiddleman = true;
  }
} else if ( /mailchimp\.com\/campaigns\/preview\-content\-html\?id\=/i.test(pageUrl) ) {
  var isMailChimpCampaign = true;
}

if ( isLocalFile || isLocalHost ) {

  var isLocalCampaign = true;

}

// Check if the current file is in the local Dropbox folder by checking what was entered in the options page against the document URL.

// Removed until I can get it to work with async. :(

// var re = escapeRegExp(dropboxFolderName);
//     re = new RegExp(re,"i");
//
// if ( re.test(pageUrl) ) {
//   var inLocalDbFolder = true;
// } else {
//   var inLocalDbFolder = false;
// }

if ( /Dropbox%20\(MedBridge%20\.\)/gi.test(pageUrl) ) {
  var inLocalDbFolder = true;
  // console.error("yes!");
} else {
  // console.error("nuh-uh");
}


///////////
///// Get Discipline
///////////
if ( isLocalCampaign ) {

      ///////////
      ///// Get the filename.
      ///////////
      var fileName = getFilename(pageUrl);

      ///////////
      ///// Get the Discipline
      ///////////
      var emailDisc = getDisciplineId(fileName);

      ///////////
      ///// Get the A/B Status.
      ///////////
      var abTesting = getABstatus(fileName);

      ///////////
      ///// Get Email Title
      ///////////
      var emailTitle = getEmailTitle(fileName, emailDisc);

      ///////////
      ///// Get Date of Email
      ///////////
      var emailDate = getEmailDate(fileName) || new Date();

      ///////////
      ///// Get Date of Email
      ///////////
      var dateFormatted = formatDate(emailDate);

      // If no email date is found in the filename, set the emailDate variable to be today's date.
      if ( isNaN(emailDate) == true ) { // ref - http://stackoverflow.com/a/1353710/556079
        emailDate = new Date();;
      }

      var emailMonth = emailDate.getMonth();
      var emailMonthAbbr = getMonthAbbr(emailDate);

      ///////////
      ///// Get the Platform
      ///////////

      var emailPlatform;
      var emailPlatformName;
      if ( /^GR\-/i.test(fileName) ) {
        emailPlatform = "gr";
        emailPlatformName = "GetResponse";
      } else if ( /^SG\-/i.test(fileName) ) {
        emailPlatform = "sg";
        emailPlatformName = "SendGrid";
      } else {
        emailPlatform = "mc";
        emailPlatformName = "MailChimp";
      }


      ///////////
      ///// Get local parent folder path
      ///////////

      if ( inLocalDbFolder ) {

        var filenameEscaped = escapeRegExp(fileName)
        var filenameReplacePattern = new RegExp(filenameEscaped + "($|.+?)", "gi");

      // TODO fix this

        var localParentFolder = pageUrl.replace(/^.+Dropbox%20\(MedBridge%20\.\)\//gi, '')

            localParentFolder = localParentFolder.replace(filenameReplacePattern, "");

      }

} else {

    var emailDisc = "unknown"

    var emailDate = null;
    var emailMonth = null;
    var emailMonthAbbr = null;
    var dateFormatted = null;

    var emailTitle = null;
    var abTesting = null;

}


///////////
///// Apply class based on discipline
///////////
document.body.classList.add("disc-" + emailDisc);


///////////
///// Determine type of email - Non-Subscriber versus Subscriber, fox, hs, etc.
///////////

var emailSubType;
var emailOrgName;
var emailSubTypeName;

if ( /\-ns( +|(%20)+)?[\.\-\(]/gi.test(pageUrl) ) {
  emailSubType = "ns"
  emailSubTypeName = "Non-Subscribers"
} else if ( /\-sub( +|(%20)+)?[\.\-\(]/gi.test(pageUrl) ) {
  emailSubType = "sub"
  emailSubTypeName = "Subscribers"
}
if ( /\-Fox\-/gi.test(pageUrl) ) {
  emailSubType = "sub"
  emailOrgName = "fox"
  emailSubTypeName = "Subscribers"
}
if ( /\-(EH|HS)\-/gi.test(pageUrl) ) {
  emailSubType = "sub"
  emailOrgName = "hs"
  emailSubTypeName = "Subscribers"
}
if ( /\-DR\-/gi.test(pageUrl) ) {
  emailSubType = "sub"
  emailOrgName = "dr"
  emailSubTypeName = "Subscribers"
}

///////////
///// Determine audience - MedBridge versus Outside Organization
///// Healthsouth, Drayer PT, Fox Rehab
///////////

var outsideOrg = false;
if ( /\-(EH|HS|DR|Fox)\-/gi.test(pageUrl) ) {
  outsideOrg = true;
}



///////////
///// Determine if this is a sale or presale or neither
///////////

var emailAnySale = false;
var emailSale = false;
var emailPresale = false;

if ( /\-Sale\-/gi.test(pageUrl) ) {
  emailSale = true;
  emailAnySale = true;
} else if ( /\-Presale\-/gi.test(pageUrl) ) {
  emailPresale = true;
  emailAnySale = true;
}


///////////
///// Is this a recent email?
///////////
var isRecentEmail = isRecentEmail(emailDate);


///////////
///// Global error variables
///////////
var totalErrors = 0;
var totalLinkErrors = 0;
var totalLinkWarnings = 0;
var totalTextErrors = 0;

///////////
///// Show all of our important variables in the log
///////////

console.groupCollapsed("Global variables based on filename");

  console.group("Platform");
    console.log("emailPlatform = " + emailPlatform);
  console.groupEnd();

  console.group("Location");
    console.log("pageUrl = " + pageUrl);
    console.log("inLocalDbFolder = " + inLocalDbFolder);
    console.log("fileName = " + fileName);
  console.groupEnd();

  console.log("abTesting = " + abTesting);

  console.log("emailSubType = " + emailSubType);
  console.log("emailSubTypeName = " + emailSubTypeName);
  console.log("outsideOrg = " + outsideOrg);

  console.log("emailDisc = " + emailDisc);
  console.log("emailTitle = " + emailTitle);

  console.group("Date");
    console.log("emailDate = " + emailDate);
    console.log("emailDate (month) = " + emailMonth + " | " + emailMonthAbbr);
    console.log("isRecentEmail = " + isRecentEmail);
  console.groupEnd();

  console.group("Sales");
    console.log("emailAnySale = " + emailAnySale);
    console.log("emailSale = " + emailSale);
    console.log("emailPresale = " + emailPresale);
  console.groupEnd();

console.groupEnd();


/////////////////////////////
/////
/////   Show dFrame width on window resize
/////
/////////////////////////////

//// - Update using element watcher when it's available in Chrome: https://jsfiddle.net/atotic/mr47wt1a/

var dFrameSizeStatus = document.createElement("div");
dFrameSizeStatus.className = "iframe-size-status";

var dFrameWidthStatus = document.createElement("div");
dFrameWidthStatus.id = "desktop-width-status";
dFrameWidthStatus.className = "iframe-width-status iframe-status-container";
dFrameSizeStatus.appendChild(dFrameWidthStatus);

var dFrameZoomStatus = document.createElement("div");
dFrameZoomStatus.id = "desktop-zoom-status";
dFrameZoomStatus.className = "iframe-zoom-status iframe-status-container";
dFrameZoomStatus.innerHTML = "100%";
dFrameSizeStatus.appendChild(dFrameZoomStatus);

desktopIframeResizeWrapper.appendChild(dFrameSizeStatus);

var fadeWidthStatus;


// Watch window for resizing. If it's resized, reset the desktopIframe
window.addEventListener('resize', resetDesktopResize, true);

function showdFrameWidthStatus(currentWidth, override, source) {

  // console.log("source", source, "currentWidth", currentWidth, "dFrameStartingWidth", dFrameStartingWidth, "resizeEndWidth", resizeEndWidth, "widthNow", desktopIframe.offsetWidth, "override", override)
  // console.log(dFrameStartingWidth, desktopIframe.clientWidth, desktopIframe.offsetWidth)
  // Only update frame width badge if the width has actually changed

  if ( currentWidth !== desktopIframe.offsetWidth ) {
    // console.log("desktopIframe.offsetWidth !== resizeEndWidth");
  }
  if ( desktopIframe.offsetWidth !== resizeEndWidth ) {
    // console.log("desktopIframe.offsetWidth !== resizeEndWidth", desktopIframe.offsetWidth, resizeEndWidth);
  }
  if ( override === true ) {
    // console.log("override === true")
  }

  // Conditions
  //// Do not show if desktopIframe width is >= than 0px (minus the scrollbar width of approx 15px)
  //// Show if override was set to true
  //// ...
  ////
  if ( ( (currentWidth !== desktopIframe.offsetWidth || desktopIframe.offsetWidth !== resizeEndWidth ) || override === true ) && (desktopIframe.clientWidth-15) >= 0 ) {

    // console.log("showing frame width");

    dFrameWidthStatus.classList.add("show");
    dFrameWidthStatus.innerHTML = (desktopIframe.clientWidth-15) + "px";

    clearTimeout(fadeWidthStatus); //https://www.w3schools.com/jsref/met_win_cleartimeout.asp

    fadeWidthStatus = setTimeout(function() {
      dFrameWidthStatus.classList.remove("show");
    }, 3000);

  }

}

// https://stackoverflow.com/a/39312522/556079



////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
//
//      _______  _______  _______  _______  ______          ___      _______  _______  ______
//     |   _   ||       ||       ||       ||    _ |        |   |    |       ||   _   ||      |
//     |  |_|  ||    ___||_     _||    ___||   | ||        |   |    |   _   ||  |_|  ||  _    |
//     |       ||   |___   |   |  |   |___ |   |_||_       |   |    |  | |  ||       || | |   |
//     |       ||    ___|  |   |  |    ___||    __  |      |   |___ |  |_|  ||       || |_|   |
//     |   _   ||   |      |   |  |   |___ |   |  | |      |       ||       ||   _   ||       |
//     |__| |__||___|      |___|  |_______||___|  |_|      |_______||_______||__| |__||______|
//
//
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
////                                              ////
////  After Initial Page Loading                  ////
////  Run Querystring Functions                   ////
////                                              ////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////

// Wait till after all of our elements are created before attempting to run this function.

if ( typeof getParameterByName("mobilewidth") === 'string' || getParameterByName("mobilewidth") instanceof String ) {
  changeMobileSize(getParameterByName("mobilewidth"));
  console.log("mobile width change");
}

if ( getParameterByName("layout") ) {
  var layout = getParameterByName("layout").match(/.{1}/g);


  if ( layout[0] === "0" ) {
    panes.classList.add("off");
  }

  if ( layout[1] === "0" ) {
    document.body.classList.add("presentation-mode");
  }

  if ( layout[2] === "0" ) {
    mobileIframeWrapper.classList.add("off");
  }
  console.error(layout);
}


////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
//
//      ___      _______  __   __  _______  __   __  _______
//     |   |    |   _   ||  | |  ||       ||  | |  ||       |
//     |   |    |  |_|  ||  |_|  ||   _   ||  | |  ||_     _|
//     |   |    |       ||       ||  | |  ||  |_|  |  |   |
//     |   |___ |       ||_     _||  |_|  ||       |  |   |
//     |       ||   _   |  |   |  |       ||       |  |   |
//     |_______||__| |__|  |___|  |_______||_______|  |___|
//
//
//      Now that dFrame and mFrameContents have been created we'll build the rest of the layout.
//
//
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
////                                                   ////
////  Create Newsletter Header                         ////
////                                                   ////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////


if ( isLocalCampaign ) {

    // Create HTML for email date
    var showEmailDate = "";
    if ( isNaN(emailDate) == false ) { // ref - http://stackoverflow.com/a/1353710/556079
      showEmailDate = '<div class="title-small"><span>' + dateFormatted + '</span></div>'
    }
    // var pageTitle = document.createElement("div");
    // pageTitle.className = "page-title";


    // Create HTML for A/B icon if we need to.
    var abTitleIcon = "";
    if ( abTesting === "a" || abTesting === "b" ) {
      if ( abTesting === "a" ) {
        var abUrl = pageUrl.replace(/\-a\./gi, "-b.");
        var abTestingUpper = "A";
        var abTestingOpposite = "B";
      } else {
        var abUrl = pageUrl.replace(/\-b\./gi, "-a.");
        var abTestingUpper = "B";
        var abTestingOpposite = "A";
      }
      // abTitleIcon = "<a href='" + abUrl + "' class='ab-status " + abTesting + "'><span></span></a>"
      abTitleIcon = '<a href="' + abUrl + '" class="container ab-status ' + abTesting + '"><div class="card"><div class="face front"><span>' + abTestingUpper + '</span></div><div class="face back"><span>' + abTestingOpposite + '</span></div></div></a>'
    }

    // Create HTML for Header Icon based on Discipline
    var headerIcon = "";
    if ( emailDisc ) {

      var iconSuffix = "";
      if ( emailSubType === "sub" ) {
        var iconSuffix = "-sub";
      }

      // SVG Optimizer
      // http://petercollingridge.appspot.com/svg-optimiser

      var iconCode;

      // PT
      if ( emailDisc === "pt" ) {
          if ( emailSubType === "sub" ) {
            iconCode = svgPTsub;
          } else {
            iconCode = svgPTns;
          }
      // AT
      } else if ( emailDisc === "at" ) {
          if ( emailSubType === "sub" ) {
            iconCode = svgATsub;
          } else {
            iconCode = svgATns;
          }
      // OT
      } else if ( emailDisc === "ot" ) {
          if ( emailSubType === "sub" ) {
            iconCode = svgOTsub;
          } else {
            iconCode = svgOTns;
          }
      // SLP
      } else if ( emailDisc === "slp" ) {
          if ( emailSubType === "sub" ) {
            iconCode = svgSLPsub;
          } else {
            iconCode = svgSLPns;
          }
      // OTHER
      } else if ( emailDisc === "other" ) {
          if ( emailSubType === "sub" ) {
            iconCode = svgOTHERsub;
          } else {
            iconCode = svgOTHERns;
          }
      // MASSAGE
      } else if ( emailDisc === "lmt" ) {
          if ( emailSubType === "sub" ) {
            iconCode = svgLMTsub
          } else {
            iconCode = svgLMTns
          }
      } else {
        iconCode = '<img class="disc-img" src="' + chrome.extension.getURL('favicons/' + emailDisc + iconSuffix + '.png') + '">'
      }
      // Wrap it up in a div
      headerIcon = "<div class='disc-img svg-" + emailDisc + "'>" + iconCode + "</div>";
    } else {
      // No discipline found in emailDisc
      headerIcon = "";
    }


    /////////
    /////////
    /////////
    var documentDesc = document.createElement("div");
    documentDesc.className = "document-desc";

    if ( headerIcon ) {
      var documentIcon = document.createElement("div");
      documentIcon.innerHTML = headerIcon;
      documentIcon.className = "document-icon";
      documentDesc.appendChild(documentIcon);
    }


    // Organization Logos
    if ( outsideOrg ) {
      var orgLogo;

      if ( emailOrgName === "fox" ) {
        orgLogo = "<img src='" + chrome.extension.getURL('img/organizations/fox.png') + "' class='organization-logo'>"
        console.error(orgLogo);
      }
      if ( emailOrgName === "dr" ) {
        orgLogo = "<img src='" + chrome.extension.getURL('img/organizations/drayer.png') + "' class='organization-logo'>"
        console.error(orgLogo);
      }
      if ( emailOrgName === "hs" ) {
        orgLogo = "<img src='" + chrome.extension.getURL('img/organizations/hs.png') + "' class='organization-logo'>"
        console.error(orgLogo);
      }

      // pageTitle.innerHTML += orgLogo;
    }




    // Create HTML for Header Audience Text
    var headerAudienceText = "";
    if ( emailDisc || emailSubTypeName ) {

      headerAudienceText = '<div class="email-disc">';

      if ( emailDisc ) {
        headerAudienceText += '<div class="title-large"><span>' + getDisciplineName(emailDisc) + '</span></div>';
      }
      if ( emailSubTypeName ) {
        headerAudienceText += '<div class="title-small"><span>' + emailSubTypeName + '</span></div>';
      }

      headerAudienceText += '</div>';
    }

    /////
    // Append document description to the the info-bar
    if ( headerAudienceText ) {
      var documentTitle = document.createElement("div");
      documentTitle.innerHTML = headerAudienceText;
      documentTitle.className = "document-title";
      documentDesc.appendChild(documentTitle);
    }


    if ( headerAudienceText || headerIcon ) {
      mainPane.prepend(documentDesc);
    }



}


//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
////                                              ////
////  Create Dropbox Shareable URL INPUT          ////
////                                              ////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////

var dropboxUrlInput = document.createElement("input");
dropboxUrlInput.id = "dropbox-shareable-link-text";
dropboxUrlInput.className = "temporary-copy-holder";
document.body.appendChild(dropboxUrlInput);

//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
////                                              ////
////  Create Newsletter QA Control Bar Wrapper    ////
////                                              ////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////

var htmlToolBar = document.createElement("div");
htmlToolBar.className = "html-toolbar";
htmlStage.appendChild(htmlToolBar);

  //////////
  ////
  ////  Preflight Status
  ////
  /////////

  var preflightStatus = document.createElement("div");
  preflightStatus.id = "preflight";
  preflightStatus.className = "preflight-wrapper initial-load";
  preflightStatus.innerHTML = '<div id="preflight-total" class="preflight-status preflight-total">0</div><div class="preflight-rocket preflight-status icomoon icomoon-rocket"></div>'
  preflightStatus.addEventListener("click", showPreflight, false);
  htmlToolBar.appendChild(preflightStatus);

  var preflightTotal = preflightStatus.querySelector(".preflight-total");

  function showPreflight() {

    console.log("showPreflight() function started");

    // instanciate new modal
    preflightWindow = new tingle.modal({
      footer: false,
      stickyFooter: false,
      cssClass: ['fill'],

      onOpen: function() {
        console.log('modal open');
      },
      onClose: function() {
        console.log('modal closed');
      }
    });

    var preflightHTML = "<div id='preflight-window'><div class='preflight-header'>Preflight Check</div><div class='main-checks'><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br></div></div>"
    preflightWindow.setContent(preflightHTML);

    preflightWindow.open();

    console.log("showPreflight() function ended");

  }

  // Orbs Top
  var orbsTop = document.createElement("div");
  orbsTop.className = "orbs-top";
  htmlToolBar.appendChild(orbsTop);

  // Toolbar Section > Content
  var toolbarSectionContent = document.createElement("div");
  toolbarSectionContent.classList.add("toolbar-section", "toolbar-section-content");
  toolbarSectionContent.innerHTML = "<label>Content</label>";
  orbsTop.appendChild(toolbarSectionContent);

  // Toolbar Section > Overlays
  var toolbarSectionOverlays = document.createElement("div");
  toolbarSectionOverlays.classList.add("toolbar-section", "toolbar-section-overlays");
  toolbarSectionOverlays.innerHTML = "<label>Overlays</label>";
  orbsTop.appendChild(toolbarSectionOverlays);

  // Orbs Bottom
  var orbsBottom = document.createElement("div");
  orbsBottom.className = "orbs-bottom";
  htmlToolBar.appendChild(orbsBottom);


//////////
////
////  Create Pane Toggle Orb
////
/////////

var paneToggleOrb = document.createElement("div");
paneToggleOrb.className = "pane-orb orb glyph";
paneToggleOrb.addEventListener("click", paneToggle, false);
orbsBottom.appendChild(paneToggleOrb);

var currentleftNavPaneStatus = 1;
var currentmobilePaneStatus = 1;

function paneToggle() {

  // console.log("currentleftNavPaneStatus", currentleftNavPaneStatus, "currentmobilePaneStatus", currentmobilePaneStatus);

    if (panes.classList.contains('off')) {
      // console.log("leftNav contains 'off'");
      currentleftNavPaneStatus = 0;
      // console.log("currentleftNavPaneStatus", currentleftNavPaneStatus);
    } else {
      // console.log("leftNav does NOT contain 'off'");
      currentleftNavPaneStatus = 1;
      // console.log("currentleftNavPaneStatus", currentleftNavPaneStatus);
    }
    if (mobileIframeWrapper.classList.contains('off')) {
      currentmobilePaneStatus = 0;
    } else {
      currentmobilePaneStatus = 1;
    }

  // If we got some data, process it.
  if ( currentleftNavPaneStatus >= 0 || currentmobilePaneStatus >= 0 ) {

    if ( currentleftNavPaneStatus === null ) {
      currentleftNavPaneStatus = 1;
    } else {
      currentleftNavPaneStatus = parseInt(currentleftNavPaneStatus);
    }

    if ( currentmobilePaneStatus === null ) {
      currentmobilePaneStatus = 1;
    } else {
      currentmobilePaneStatus = parseInt(currentmobilePaneStatus);
    }

  // No data found, update the values based on what we know.
  } else {

    if ( currentleftNavPaneStatus === 1 && currentmobilePaneStatus === 1 ) {
      currentleftNavPaneStatus = 0;
    }
    else if ( currentleftNavPaneStatus === 0 && currentmobilePaneStatus === 1 ) {
      currentmobilePaneStatus = 0;
    }
    else if ( currentleftNavPaneStatus === 0 && currentmobilePaneStatus === 0 ) {
      currentleftNavPaneStatus = 1;
      currentmobilePaneStatus = 1;
    }

  }

  // console.log("2: leftNav: " + leftNav);
  // console.log("2: currentleftNavPaneStatus: " + currentleftNavPaneStatus);
  // console.log("2: mobile: " + mobile);
  // console.log("2: currentmobilePaneStatus: " + currentmobilePaneStatus);

  // Update the css based on our values calculated above.
    if ( currentleftNavPaneStatus === 1 ) {
      document.querySelectorAll("html")[0].classList.add("leftNav-off");
      panes.classList.add("off");
      history.replaceState(null,null, updateQueryString("leftNav", "0") ); // http://stackoverflow.com/a/32171354/556079
    } else {
      document.querySelectorAll("html")[0].classList.remove("leftNav-off");
      panes.classList.remove("off");
      history.replaceState(null,null, updateQueryString("leftNav") );
    }

    if ( currentmobilePaneStatus === 1 ) {
      document.querySelectorAll("html")[0].classList.add("mobile-off");
      mobileIframeWrapper.classList.add("off");
      history.replaceState(null,null, updateQueryString("mobile", "0") );
    } else {
      document.querySelectorAll("html")[0].classList.remove("mobile-off");
      mobileIframeWrapper.classList.remove("off");
      history.replaceState(null,null, updateQueryString("mobile") );
    }

    if ( currentmobilePaneStatus === 1 && currentleftNavPaneStatus === 1 ) {
      resetDesktopResize();
    }

    showdFrameWidthStatus();

    // console.log("currentleftNavPaneStatus", currentleftNavPaneStatus, "currentmobilePaneStatus", currentmobilePaneStatus);

}


//////////
////
////   Create Share Email Orb
////
/////////

var shareOrb = document.createElement("div");
shareOrb.className = "share-orb orb glyph";
shareOrb.innerHTML = svgIconShare;
if ( isLocalHost ) { shareOrb.classList.add("off") };
shareOrb.addEventListener("click", getDbShareLink, false);
orbsTop.appendChild(shareOrb);



//////////
////
////  Create Swap Orb
////
/////////

// TODO use sessionstorage to store the dropbox url
//
var swapOrb = document.createElement("div");
swapOrb.className = "swap-orb orb glyph icomoon icomoon-dropbox";
// if ( isLocalHost ) { swapOrb.classList.add("off") };
swapOrb.addEventListener("click", swapUrl, false);
orbsTop.appendChild(swapOrb);

function swapUrl() {

  console.log("Beginning URL swap.");

  if ( elExists(document.querySelector("#dropbox-link-text")) ) {
    window.location.href = document.querySelector("#dropbox-link-text").value + "?noredirect=1";
  } else {
    callDropbox("go", this);
  }

}


//////////
////
////  Emailcomb - Remove Unused CSS
////  https://bitbucket.org/codsen/email-remove-unused-css/src/master/
////
/////////

  var combUnusedCssOrb = document.createElement("div");
  combUnusedCssOrb.id = "unusedcss-orb";
  combUnusedCssOrb.className = "unusedcss-orb orb glyph icomoon icomoon-pacman";
  combUnusedCssOrb.addEventListener("click", processHtmlforUnusedCss, false);
  orbsBottom.appendChild(combUnusedCssOrb);

  function processHtmlforUnusedCss() {

    var html = cleanedOriginalHtml;
    var result = emailRemoveUnusedCss(html, {
      whitelist: ["#outlook"]
    });

    console.groupCollapsed();

    console.log("html", html);
    console.log("result", result.result);

    console.groupEnd();

    console.log("result", result);
    console.log("allInBody", result.allInBody);
    console.log("allInHead", result.allInHead);
    console.log("deletedFromBody", result.deletedFromBody);
    console.log("deletedFromHead", result.deletedFromHead);

    console.log(result.result);

    console.log(stringCollapseWhiteSpace(result.result, {removeEmptyLines: true, trimLines: true}));

    // copyToClipboard(result.result, "success", true);

  }




//////////
////
////  Create Borders/Dimensions Orb
////
/////////

var showDimsOrb = document.createElement("div");
showDimsOrb.id = "show-dims-orb";
showDimsOrb.className = "show-dims-orb orb glyph";
showDimsOrb.addEventListener("click", showDims, false);
toolbarSectionOverlays.appendChild(showDimsOrb);
var showDimsToggle = false;

function showDims() {

  showDimsToggle = !showDimsToggle;

  if ( showDimsToggle ) {
    history.replaceState(null,null, updateQueryString("showdims", "1") );

    [].forEach.call(dFrameContents.querySelectorAll("*:not(section)"),function(a){ a.dataset.dimsColor = Math.floor(Math.random() * Math.floor(30)) });
    [].forEach.call(mFrameContents.querySelectorAll("*:not(section)"),function(a){ a.dataset.dimsColor = Math.floor(Math.random() * Math.floor(30)) });

  } else {
    history.replaceState(null,null, updateQueryString("showdims") );
    [].forEach.call(dFrameContents.querySelectorAll("*"),function(a){a.style.outline=""});
    [].forEach.call(mFrameContents.querySelectorAll("*"),function(a){a.style.outline=""});
  }

  document.getElementById("show-dims-orb").classList.toggle("on");

  dFrameContents.documentElement.classList.toggle("debug-show-dims-highlight");
  mFrameContents.documentElement.classList.toggle("debug-show-dims-highlight");



  // if ( elExists(dFrameContents.getElementById("debug")) ) {
  //   destroy(dFrameContents.getElementById("debug"));
  //   destroy(mFrameContents.getElementById("debug"));
  // } else {
  //   var debugStylingD = dFrameContents.createElement("style");
  //   debugStylingD.id = "debug";
  //   debugStylingD.appendChild(dFrameContents.createTextNode("") );
  //
  //   var debugStylingM = mFrameContents.createElement("style");
  //   debugStylingM.id = "debug";
  //   debugStylingM.appendChild(dFrameContents.createTextNode("td { box-shadow: inset 0 0 0 1px rgba(255,0,0,.25); } div:not(.alignment-guide) { box-shadow: inset 0 0 0 2px rgba(0,0,255,.25), 0 0 0 2px rgba(0,0,255,.25); }") );
  //
  //   dFrameContents.getElementsByTagName("head")[0].appendChild(debugStylingD);
  //   mFrameContents.getElementsByTagName("head")[0].appendChild(debugStylingM);
  // }

  //
  // Find <td> dimensions
  //

  // Destory the td markers if they exist, create the wrapper for them if they do not.
  if ( elExists(dFrameContents.getElementById("td-markers")) ) {

    destroy(dFrameContents.getElementById("td-markers"));
    destroy(mFrameContents.getElementById("td-markers"));

  } else {

    let dFrameTdList = dFrameContents.querySelectorAll("td");
    var tdCount = 0

    console.groupCollapsed("<td> Group (dFrameContents) - Total <td>'s Processed: " + dFrameTdList.length);

    var tdMarkerWrapper = document.createElement("section");
    tdMarkerWrapper.id = "td-markers";
    tdMarkerWrapper.className = "debug td-markers-wrapper";
    dFrameContents.body.appendChild(tdMarkerWrapper);
    mFrameContents.body.appendChild(tdMarkerWrapper.cloneNode(true));


    for (let tdEle of dFrameTdList) {
      if ( (tdEle.clientWidth !== 0 && tdEle.clientHeight !== 0) && (tdEle.clientWidth < 650) ) {

        tdCount++

        var tdPos = getPosition(tdEle, dFrameContents);

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
        dFrameContents.getElementById("td-markers").appendChild(tdMarker);

      }
    }

    console.groupEnd();


    let mFrameTdList = mFrameContents.querySelectorAll("td");
    var tdCount = 0

    console.groupCollapsed("<td> Group (mFrame) - Total <td>'s Processed: " + mFrameTdList.length);

    for (let tdEle of mFrameTdList) {
      if ( (tdEle.clientWidth !== 0 && tdEle.clientHeight !== 0) && (tdEle.clientWidth < 650) ) {

        // console.log(tdEle);
        // console.log(tdEle.clientHeight);
        // console.log(tdEle.clientWidth);

        tdCount++

        var tdPos = getPosition(tdEle, mFrameContents);

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
        mFrameContents.getElementById("td-markers").appendChild(tdMarker);

      }
    }

    console.groupEnd();

  }

  toggleImgDims();
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
toolbarSectionOverlays.appendChild(guidesOrb);
var guidesToggle = false;

function toggleGuides() {

  guidesToggle = !guidesToggle;

  if ( guidesToggle ) {
    history.replaceState(null,null, updateQueryString("guides", "1") );
  } else {
    history.replaceState(null,null, updateQueryString("guides") );
  }

  document.getElementById("guides-orb").classList.toggle("on");

  if ( elExists(dFrameContents.getElementById("alignment-guides")) ) {
    destroy(dFrameContents.getElementById("alignment-guides"));
  } else {

    var guidesStylingWrapper = dFrameContents.createElement("section");
    guidesStylingWrapper.id = "alignment-guides";
    guidesStylingWrapper.className = "debug alignment-guides-wrapper";

      var guidesStyling1 = dFrameContents.createElement("section");
      guidesStyling1.classList.add("alignment-guide");
      guidesStyling1.style.left = "0";
      guidesStyling1.style.right = "0";
      guidesStylingWrapper.appendChild(guidesStyling1);

      var guidesStyling2 = dFrameContents.createElement("section");
      guidesStyling2.classList.add("alignment-guide");
      guidesStyling2.style.left = "589px";
      guidesStyling2.style.right = "0";
      guidesStylingWrapper.appendChild(guidesStyling2);

      var guidesStyling3 = dFrameContents.createElement("section");
      guidesStyling3.classList.add("alignment-guide");
      guidesStyling3.style.left = "619px";
      guidesStyling3.style.right = "0";
      guidesStylingWrapper.appendChild(guidesStyling3);

      var guidesStyling4 = dFrameContents.createElement("section");
      guidesStyling4.classList.add("alignment-guide");
      guidesStyling4.style.left = "0";
      guidesStyling4.style.right = "589px";
      guidesStylingWrapper.appendChild(guidesStyling4);

      var guidesStyling5 = dFrameContents.createElement("section");
      guidesStyling5.classList.add("alignment-guide");
      guidesStyling5.style.left = "0";
      guidesStyling5.style.right = "619px";
      guidesStylingWrapper.appendChild(guidesStyling5);


    dFrameContents.getElementsByTagName("body")[0].appendChild(guidesStylingWrapper);
  }
}

//////////
////
////  Create Baseline Overlay
////
/////////

var baselineOrb = document.createElement("div");
baselineOrb.id = "baseline-orb";
baselineOrb.className = "baseline-orb orb svg";
baselineOrb.innerHTML = svgIconBaseline;
baselineOrb.addEventListener("click", createBaselineOverlay, false);
toolbarSectionOverlays.appendChild(baselineOrb);
var baselineToggle = false;

// Chrome's performance takes a hit when I get fancy within a container that has border-radius.
// For example, absolutely positioning a full width/height container over an iframe causes scrolling to jump around.
// For this reason, and also because the baseline was covering our scrollbar, we're injecting the baseline grid inside of the iframe.
// Rather than on top in the main document window.
function createBaselineOverlay() {

  // Hand On/Off Settings
    baselineToggle = !baselineToggle;

    if ( baselineToggle ) {
      history.replaceState(null,null, updateQueryString("baseline", "1") );
    } else {
      history.replaceState(null,null, updateQueryString("baseline") );
    }

    document.getElementById("baseline-orb").classList.toggle("on");

  if ( !baselineToggle ) {
    destroyAll(dFrameContents.querySelectorAll(".toolkit-element-baseline-overlay"));
    destroyAll(mFrameContents.querySelectorAll(".toolkit-element-baseline-overlay"));
    dFrameContents.documentElement.classList.remove("activate-toolkit-element-baseline-overlay");
    mFrameContents.documentElement.classList.remove("activate-toolkit-element-baseline-overlay");
  } else {
    dFrameContents.documentElement.classList.add("activate-toolkit-element-baseline-overlay");
    mFrameContents.documentElement.classList.add("activate-toolkit-element-baseline-overlay");
    var baselineContainer = document.createElement("section");
    baselineContainer.className = "toolkit-element toolkit-element-baseline-overlay";
    baselineContainer.dataset.view = "fixed";
    dFrameContents.documentElement.appendChild(baselineContainer);
    mFrameContents.documentElement.appendChild(baselineContainer.cloneNode(true));
  }
}

function toggleGuides() {

  guidesToggle = !guidesToggle;

  if ( guidesToggle ) {
    history.replaceState(null,null, updateQueryString("guides", "1") );
  } else {
    history.replaceState(null,null, updateQueryString("guides") );
  }

  document.getElementById("guides-orb").classList.toggle("on");

  if ( elExists(dFrameContents.getElementById("alignment-guides")) ) {
    destroy(dFrameContents.getElementById("alignment-guides"));
  } else {

    var guidesStylingWrapper = dFrameContents.createElement("section");
    guidesStylingWrapper.id = "alignment-guides";
    guidesStylingWrapper.className = "debug alignment-guides-wrapper";

      var guidesStyling1 = dFrameContents.createElement("section");
      guidesStyling1.classList.add("alignment-guide");
      guidesStyling1.style.left = "0";
      guidesStyling1.style.right = "0";
      guidesStylingWrapper.appendChild(guidesStyling1);

      var guidesStyling2 = dFrameContents.createElement("section");
      guidesStyling2.classList.add("alignment-guide");
      guidesStyling2.style.left = "589px";
      guidesStyling2.style.right = "0";
      guidesStylingWrapper.appendChild(guidesStyling2);

      var guidesStyling3 = dFrameContents.createElement("section");
      guidesStyling3.classList.add("alignment-guide");
      guidesStyling3.style.left = "619px";
      guidesStyling3.style.right = "0";
      guidesStylingWrapper.appendChild(guidesStyling3);

      var guidesStyling4 = dFrameContents.createElement("section");
      guidesStyling4.classList.add("alignment-guide");
      guidesStyling4.style.left = "0";
      guidesStyling4.style.right = "589px";
      guidesStylingWrapper.appendChild(guidesStyling4);

      var guidesStyling5 = dFrameContents.createElement("section");
      guidesStyling5.classList.add("alignment-guide");
      guidesStyling5.style.left = "0";
      guidesStyling5.style.right = "619px";
      guidesStylingWrapper.appendChild(guidesStyling5);


    dFrameContents.getElementsByTagName("body")[0].appendChild(guidesStylingWrapper);
  }
}



//////////
////
////   Create Power Orb (turn off JavaScript)
////
/////////

var powerOrb = document.createElement("a");
powerOrb.className = "power-orb orb glyph";
powerOrb.href = document.URL + "?view=1";
orbsBottom.appendChild(powerOrb);

//////////
////
////   Re-Check Links via AJAX
////
/////////

var ajaxOrb = document.createElement("div");
ajaxOrb.className = "ajax-orb orb glyph icomoon icomoon-spinner4";
ajaxOrb.id = "ajax-orb";
ajaxOrb.addEventListener("click", manualXHRLinkCheck, false);
orbsBottom.appendChild(ajaxOrb);


//////////
////
////   Custom Orb
////
/////////

var customOrb = document.createElement("div");
customOrb.className = "custom-orb orb glyph";
customOrb.id = "custom-orb";
customOrb.addEventListener("click", sendEmail, false);
// orbsBottom.appendChild(customOrb); // OFF for now
var presentationToggle = false



//////////
////
////   Create Style Toggle Orb
////
/////////

var styleOrb = document.createElement("div");
styleOrb.className = "style-orb orb glyph";
styleOrb.id = "style-orb";
styleOrb.addEventListener("click", toggleStyles, false);
toolbarSectionContent.appendChild(styleOrb);
var styleToggle = false

function toggleStyles() {

  styleToggle = !styleToggle;

  if ( styleToggle ) {
    history.replaceState(null,null, updateQueryString("style", "0") );
  } else {
    history.replaceState(null,null, updateQueryString("style") );
  }

  if ( styleToggle ) {

    let dStyleSheetEle = dFrameContents.querySelectorAll("style:not(.debug)");
    for (let style of dStyleSheetEle) {
      style.disabled = true;
    }

    let mStyleSheetEle = mFrameContents.querySelectorAll("style:not(.debug)");
    for (let style of mStyleSheetEle) {
      style.disabled = true;
    }

  } else {

    let dStyleSheetEle = dFrameContents.querySelectorAll("style:not(.debug)");
    for (let style of dStyleSheetEle) {
      style.disabled = false;
    }

    let mStyleSheetEle = mFrameContents.querySelectorAll("style:not(.debug)");
    for (let style of mStyleSheetEle) {
      style.disabled = false;
    }

  }

  document.getElementById("style-orb").classList.toggle("on");

}


//////////
////
////   Toggle Link Errors
////
/////////

var linkErrorsOrb = document.createElement("div");
linkErrorsOrb.className = "link-errors-orb orb glyph";
linkErrorsOrb.id = "link-errors-orb";
// linkErrorsOrb.addEventListener("click", toggleLinkErrors, false);
// toolbarSectionOverlays.appendChild(linkErrorsOrb);


//////////
////
////   Toggle Text Errors
////
/////////

var textErrorsOrb = document.createElement("div");
textErrorsOrb.className = "text-errors-orb orb glyph";
textErrorsOrb.id = "text-errors-orb";
// textErrorsOrb.addEventListener("click", toggleTextErrors, false);
// toolbarSectionOverlays.appendChild(textErrorsOrb);


//////////
////
////  Create Edit Email Orb
////
/////////

var editOrb = document.createElement("div");
editOrb.className = "edit-orb orb glyph";
editOrb.id = "edit-orb";
editOrb.addEventListener("click", editEmail, false);
toolbarSectionContent.appendChild(editOrb);
var editToggle = false

function editEmail() {
  editToggle = !editToggle;
  var editDesktop = dFrameContents.getElementsByTagName('html')[0].contentEditable = editToggle;
  var editMobile  = mFrameContents.getElementsByTagName('html')[0].contentEditable = editToggle;
  desktopIframeWrapper.classList.toggle("editing");
  mobileIframeParent.classList.toggle("editing");
  document.getElementById("edit-orb").classList.toggle("on");
  dFrameBody.focus();
}


//////////
////
////  Toggle Hidden Content
////
/////////

var hiddenContentToggleOrb = document.createElement("div");
hiddenContentToggleOrb.className = "hidden-content-orb orb glyph icomoon icomoon-shield";
hiddenContentToggleOrb.id = "hidden-content-orb";
hiddenContentToggleOrb.addEventListener("click", toggleHiddenContent, false);
toolbarSectionContent.appendChild(hiddenContentToggleOrb);
var hiddenContentToggle = false

function toggleHiddenContent() {

  hiddenContentToggle = !hiddenContentToggle;

  // Toggle the icon
  this.classList.toggle("on");

  // Reveal all hidden elements.
  if ( hiddenContentToggle ) {
    console.log("if, hiddenContentToggle =", hiddenContentToggle);

    // Desktop
    dFrameContents.querySelectorAll('body *').forEach(function(node) {
      revealHiddenNodes(node);
    });
    // Mobile
    mFrameContents.querySelectorAll('body *').forEach(function(node) {
      revealHiddenNodes(node);
    });

  // Hide the elements we previously revealed.
  } else {
    console.log("else, hiddenContentToggle =", hiddenContentToggle);

    // Desktop
    dFrameContents.querySelectorAll('[data-revealed]').forEach(function(node) {
      hideHiddenNodes(node);
    });
    // Mobile
    mFrameContents.querySelectorAll('[data-revealed]').forEach(function(node) {
      hideHiddenNodes(node);
    });

  }

}


function revealHiddenNodes(node) {
  if ( node.offsetParent === null && window.getComputedStyle(node).display === "none" && node.dataset.korra === undefined ) {

    console.log( "computed style =", window.getComputedStyle(node).display, " | ", "inline style =", node.style.display, " | ", node );

    // Mark it with a data attribute so that we know we touched. That way we can reverse it later.
    node.dataset.revealed = true;

    // If it was hidden using an inline style we need to mark it so that we can add it back in...
    if ( node.style.display === "none" ) {
      node.dataset.hiddenInline = "true";
    } else {
      node.dataset.hiddenInline = "false";
    }
    // If there's an inline display property here that is NOT "none". Save it so that we can restore it.
    // Get the priority too.
    node.dataset.originalDisplay = node.style.display;
    node.dataset.originalDisplayPriority = node.style.getPropertyPriority('display');

    // Lets remove the inline display property.
    node.style.removeProperty('display');

    // After removing it, check if it's visible now.
    // If not, then it's being hidden in the <style> tag and we need to add an inline style appropriate for the tagname
    // There currently isn't a way to tell what the display property was SUPPOSED to be if "none" wasn't set.
    // 'unset' and 'initial' do not work for our use case.
    if ( window.getComputedStyle(node).display === "none" ) {
      if ( node.tagName === "DIV" ) {
        node.style.setProperty ("display", "block", "important");
      }
      else if ( node.tagName === "TABLE" ) {
        node.style.setProperty ("display", "table", "important");
      }
      else if ( node.tagName === "TBODY" ) {
        node.style.setProperty ("display", "table-row-group", "important");
      }
      else if ( node.tagName === "TR" ) {
        node.style.setProperty ("display", "table-row", "important");
      }
      else if ( node.tagName === "TD" || node.tagName === "TH" ) {
        node.style.setProperty ("display", "table-cell", "important");
      }
      else {
        node.style.setProperty ("display", "inline", "important");
      }
    }


  }
}

function hideHiddenNodes(node) {
  // Re-add the nodes original "display" property using the 'data' attribute we set.
  if ( node.dataset.originalDisplay ) {
    node.style.setProperty ("display", node.dataset.originalDisplay, node.dataset.originalDisplayPriority);
  }
  // If it didn't have an original display property inlined, just remove the one we added to reveal it earlier.
  else {
    node.style.removeProperty("display");
  }

  // Remove the label that indicated that we touched this node.
  node.removeAttribute('data-revealed');
  node.removeAttribute('data-hidden-inline');
  node.removeAttribute('data-original-display');
  node.removeAttribute('data-original-display-priority');
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
toolbarSectionContent.appendChild(imagesToggleOrb);
var imagesToggle = false

function toggleImages() {

  imagesToggle = !imagesToggle;

  if ( imagesToggle ) {
    history.replaceState(null,null, updateQueryString("img", "0") );
  } else {
    history.replaceState(null,null, updateQueryString("img") );
  }

    let dFrameimgList = dFrameContents.querySelectorAll("img");
    for (let img of dFrameimgList) {
      if ( imagesToggle ) {
        img.dataset.src = img.src;
        img.src = "";
      } else {
        img.src = img.dataset.src;
        img.dataset.src = "";
      }
    }

    let dFrameBkgList = dFrameContents.querySelectorAll("[background]");
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

    let mFrameimgList = mFrameContents.querySelectorAll("img");
    for (let img of mFrameimgList) {
      if ( imagesToggle ) {
        img.dataset.src = img.src;
        img.src = "";
      } else {
        img.src = img.dataset.src;
        img.dataset.src = "";
      }
    }

    let mFrameBkgList = mFrameContents.querySelectorAll("[background]");
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
//// Image Dimensions
////
/////////

var imgDimsToggle = false;

function toggleImgDims() {

  imgDimsToggle = !imgDimsToggle;

  dFrameContents.documentElement.classList.toggle("debug-imgdims-highlight");
  mFrameContents.documentElement.classList.toggle("debug-imgdims-highlight");

  //
  // Find <img> dimensions
  //

  // Destory the td markers if they exist, create the wrapper for them if they do not.
  if ( elExists(dFrameContents.getElementById("img-dims-markers")) ) {

    destroy(dFrameContents.getElementById("img-dims-markers"));
    destroy(mFrameContents.getElementById("img-dims-markers"));

  } else {

    // Create wrapper to old all of the dims markers
    var imgDimsWrapper = document.createElement("section");
    imgDimsWrapper.id = "img-dims-markers";
    imgDimsWrapper.className = "debug img-dims-markers-wrapper";
    dFrameContents.body.appendChild(imgDimsWrapper);
    mFrameContents.body.appendChild(imgDimsWrapper.cloneNode(true));


    let dFrameImgDimsList = dFrameContents.querySelectorAll("img");
    var imgDimsCount = 0

    console.groupCollapsed("<img> Group (dFrameContents) - Total <img>'s Processed: " + dFrameImgDimsList.length);
    for (let imgDimsEle of dFrameImgDimsList) {

      imgDimsCount++;

      var imgNaturalWidth = imgDimsEle.naturalWidth;
      var imgNaturalHeight = imgDimsEle.naturalHeight;

      var imgClientWidth = imgDimsEle.clientWidth;
      var imgClientHeight = imgDimsEle.clientHeight;

      var imgPos = getPosition(imgDimsEle, dFrameContents);

      var imgDimsMarker = document.createElement("section");
      imgDimsMarker.className = "img-dims-marker";
      imgDimsMarker.style.top = (imgPos.y) + "px";
      imgDimsMarker.style.left = (imgPos.x) + "px";

      imgDimsMarker.style.width = imgClientWidth + "px";
      imgDimsMarker.style.height = imgClientHeight + "px";

      var imgDimsFontSizeLarge = imgClientWidth * 0.176;
      if ( imgDimsFontSizeLarge > 60 ) {
        imgDimsFontSizeLarge = 60;
      } else if ( imgDimsFontSizeLarge < 12 ) {
        imgDimsFontSizeLarge = 12;
      }

      var imgDimsFontSizeSmall = imgDimsFontSizeLarge * 0.6;
      if ( imgDimsFontSizeSmall < 10 ) {
        imgDimsFontSizeSmall = 10;
      }

      imgDimsMarker.style.fontSize = imgDimsFontSizeLarge + "px";

      var naturalWidthText = "";

      if ( imgNaturalWidth === 0 || imgNaturalHeight === 0 ) {

        if ( imgDimsFontSizeSmall > 18 ) {
          imgDimsFontSizeSmall = 18;
        }
        naturalWidthText = "<section style='font-size:" + imgDimsFontSizeSmall + "px'>?x?</section>";

      } else if ( imgNaturalWidth === imgClientWidth && imgNaturalHeight === imgClientHeight ) {

        if ( imgDimsFontSizeSmall > 18 ) {
          imgDimsFontSizeSmall = 18;
        }
        naturalWidthText = "<section style='font-size:" + imgDimsFontSizeSmall + "px'>full size</section>"

      } else  if ( ( imgNaturalWidth !== 0 || imgNaturalHeight !== 0 ) && (imgNaturalWidth !== imgClientWidth && imgNaturalHeight !== imgClientHeight) ) {

        naturalWidthText = "<section style='font-size:" + imgDimsFontSizeSmall + "px'>" + imgNaturalWidth + "x" + imgNaturalHeight + "</section>"

      }



      imgDimsMarker.innerHTML = "<section><section>" + imgClientWidth + "x" + imgClientHeight + "</section>" + naturalWidthText + "</section>"
      dFrameContents.getElementById("img-dims-markers").appendChild(imgDimsMarker);

      console.log(imgDimsEle);
      console.log("[" + imgDimsCount + "] imgNaturalWidth: " + imgNaturalWidth + ", imgNaturalHeight: " + imgNaturalHeight + ", imgClientWidth: " + imgClientWidth + ", imgNaturalHeight:" + imgNaturalHeight);


      // tdCount++
      //
      // var tdPos = getPosition(tdEle, dFrameContents);
      //
      // var tdMarker = document.createElement("section");
      // tdMarker.className = "td-marker";
      // tdMarker.style.top = (tdPos.y) + "px";
      // tdMarker.style.left = (tdPos.x) + "px";
      // tdMarker.dataset.number = tdCount;
      //
      // var tdTextNode = document.createTextNode(tdEle.clientWidth + " x " + tdEle.clientHeight);
      //
      // tdMarker.appendChild(tdTextNode);
      // dFrameContents.getElementById("td-markers").appendChild(tdMarker);

    }
    console.groupEnd();



    // let mFrameImgDimsList = mFrameContents.querySelectorAll("img");
    // var imgDimsCount = 0
    //
    // console.groupCollapsed("<img> Group (mFrame) - Total <img>'s Processed: " + mFrameImgDimsList.length);
    // for (let imgDimsEle of mFrameImgDimsList) {
    //
    //   imgDimsCount++;
    //
    //   var imgNaturalWidth = imgDimsEle.naturalWidth;
    //   var imgNaturalHeight = imgDimsEle.naturalHeight;
    //
    //   var imgClientWidth = imgDimsEle.clientWidth;
    //   var imgNaturalHeight = imgDimsEle.clientHeight;
    //
    //   console.log(imgDimsEle);
    //   console.log("[" + imgDimsCount + "] imgNaturalWidth: " + imgNaturalWidth + ", imgNaturalHeight: " + imgNaturalHeight + ", imgClientWidth: " + imgClientWidth + ", imgNaturalHeight:" + imgNaturalHeight);
    //
    // }
    // console.groupEnd();

  }

}



//////////
////
////  Create Plain-Text Generator Orb
////
/////////

// var plainTextOrb = document.createElement("div");
// plainTextOrb.className = "plain-text-orb orb glyph";
// plainTextOrb.addEventListener("click", plainText, false);
// orbsBottom.appendChild(plainTextOrb);

var plainTextStage = document.createElement("div");
    plainTextStage.classList.add("stage", "plain-text-stage");
    stagesWrapper.appendChild(plainTextStage);

var plainTextWrapper = document.createElement("div");
    plainTextWrapper.classList.add("plain-text-wrapper");
    plainTextWrapper.contentEditable = true;
    plainTextStage.appendChild(plainTextWrapper);


  // Steps
  ///////////
  // iterate through all dom nodes
  // Ignore text that is invisible, set to display: none, or has 0 opacity. (preheader should fall under this)
  // setup defaults for linebreaks on common block level elements
  // iterate to look for <a> and get the URLS
  //

  // - https://github.com/werk85/node-html-to-text
  // - https://github.com/EDMdesigner/textversionjs

function generateTextFromDOM(domObject) {
  // pending...
}


function textNodesUnder(el){
  var n, a=[], walk=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,null,false);
  while(n=walk.nextNode()) a.push(n);
  return a;
}

var pt;
var nodeCount = 0;

dummyFrameContents.querySelectorAll('*').forEach(function(node) {

  // console.log(node.tagName);

  if ( node.tagName !== "STYLE" ) {
    pt += node.innerText;
  } else {
    nodeCount++;
  }

});

var allTextNodes = textNodesUnder(dummyFrameContents);

allTextNodes.forEach(function(node) {

  // console.log(node);

  // if ( node.tagName !== "STYLE" ) {
  //   pt += node.innerText;
  // } else {
  //   nodeCount++;
  // }

});

plainTextWrapper.innerHTML = pt;

// String for export/test sends
plainTextVersion = pt;




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

/////////////////////////////
/////
/////   QA Bars
/////
/////////////////////////////

function appendQaBar(newBar) {

  newBar.className = "qa-bar"
  newBar.innerHTML = "<div class='qa-title'><div class='qa-icon'></div><div class='qa-text'>Processing...</div></div>"
  qaResults.appendChild(newBar);

}

// After a test has concluded, run this function to update the icon that shows the status.
function applyQaResults(qaBar, status, msg) {
  qaBar.classList.add("finished", status);
  if ( status === "success" ) {
    qaBar.querySelector(".qa-icon").innerHTML = svgIconCheck;
  } else if ( status === "error" ) {
    qaBar.querySelector(".qa-icon").innerHTML = svgIconX;
  }
  if ( msg ) {
    qaBar.querySelector(".qa-text").innerHTML = msg;
  }
}

/////////////
// QA RESULTS Container
/////////////

var qaResults = document.createElement("div");
qaResults.id = "qa-results";
mainPane.appendChild(qaResults);


//////////
////
////  Create Preheader Module
////  https://www.campaignmonitor.com/blog/email-marketing/2015/08/improve-email-open-rates-with-preheader-text/
////
/////////

var preheaderQaBar = document.createElement("div");
preheaderQaBar.id = "qa-preheader";
preheaderQaBar.className = "qa-preheader expanded preheader-wrapper mod-wrapper";
appendQaBar(preheaderQaBar);


var preheader150 = preheader.substring(0, 150).trim();
preheader150 = [preheader150.slice(0, 90), "<span class='preheader-back'>", preheader150.slice(90)].join('') + "</span>"; // http://stackoverflow.com/a/4364902/556079

var preheaderTextPreview = document.createElement("div");
preheaderTextPreview.innerHTML = preheader150;
preheaderTextPreview.className = "preheader-preview-text"
preheaderQaBar.appendChild(preheaderTextPreview);



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

  console.log("Total important words in preheader: " + preheaderTotalWords + " - Word list: " + preheader90);

  console.groupCollapsed("All text minus preheader");
  console.log(textMinusPreheader);
  console.groupEnd();

  for (var i = 0; i < preheaderTotalWords; i++) {

    console.error(i);

    if ( preheader90[i].length > 300 ) {
      // Strings that were too long were breaking, returning as invalid regexes below. So lets just skip them until we can find a solution.
    } else {

      // var matcher = escapeRegExp(preheader90[i]);
      var wordToMatch = preheader90[i].replace(/(^[^a-zA-Z\d\s]|[^a-zA-Z\d\s]$)/gi, "");
      var matcher = new RegExp("\\b" + escapeRegExp(wordToMatch) + "\\b", "gi"); // double escape special characters
      // var  matcher = new RegExp("\\b" + escapeRegExp(wordToMatch) + "(\\b|\\r\\n?|\\n|$|<br\s*.*?\/?>)", "gi"); // double escape special characters

      if ( matcher.test(textMinusPreheader) ) {
        totalPreheaderWordsMatched++;
        console.log("Matched (" + totalPreheaderWordsMatched + "): " + wordToMatch + " (regex: " + matcher + ")");
      } else {
        console.error("Unmatched (X): " + wordToMatch + " (regex: " + matcher + ")");
      }

    }



  }

  var matchRating = Math.round(totalPreheaderWordsMatched/preheaderTotalWords*100);

} else {
  console.log("exact match! (successful regex: " + preheader90Pattern + ")");
  var matchRating = 100;
}

var preheaderMatchText = "Preheader is a " + matchRating + "%</span> Match";

// Test finished, determine status
if ( matchRating > 69 ) {
  applyQaResults(preheaderQaBar, "success", preheaderMatchText);
} else {
  applyQaResults(preheaderQaBar, "error", preheaderMatchText);
}

setTimeout(function() {

  if ( matchRating < 70 ) {
    toast("suppress", "error", "Preheader text may not be updated! <div>Only " + matchRating + "% of the important words in the preheader match the rest of the email.</div>", 0);
    // alertify.error("Preheader text may not be updated! <div>Only " + matchRating + "% of the important words in the preheader match the rest of the email.", 0);
    // preheaderMatchDiv.classList.add("error");
    // preflightErrors++;
    preflightError();
  }
  // preheaderMatchDiv.classList.add("ready");

}, 500);

console.groupEnd();



//////////
////
////  QA Bar: Links
////
/////////

var linksQaBar = document.createElement("div");
linksQaBar.id = "qa-links";
linksQaBar.className = "qa-links";
appendQaBar(linksQaBar);

// Value for this bar is calculated further down when we validate the links.



//////////
////
////  QA Bar: Coding Bugs
////
/////////

var codingBugsQaBar = document.createElement("div");
codingBugsQaBar.id = "qa-coding-bugs";
codingBugsQaBar.className = "qa-coding-bugs";
codingBugsQaBar.dataset.errors = "0";
appendQaBar(codingBugsQaBar);



//////////
////
////  QA Bar: Accessibility Warnings
////
/////////

var accessibilityWarningsQaBar = document.createElement("div");
accessibilityWarningsQaBar.id = "qa-accessibility-warnings";
accessibilityWarningsQaBar.className = "qa-accessibility-warnings";
accessibilityWarningsQaBar.dataset.errors = "0";
appendQaBar(accessibilityWarningsQaBar);




//////////
////
////  QA Bar: Articles
////
/////////

// var articlesQaBar = document.createElement("div");
// articlesQaBar.id = "qa-articles";
// articlesQaBar.className = "qa-articles";
// appendQaBar(articlesQaBar);

// NOT IN USE RIGHT NOW


//////////
////
////  QA Bar: Audience
////
/////////

// We need to know if an email is going to be sent NS, SUB, or Both/Neither.
// Some link checking relies on this.
// Append a value of -sub, -ns, or ??? (tbd) to the filename to find out the audience.

var audienceQaBar = document.createElement("div");
audienceQaBar.id = "qa-audience";
audienceQaBar.className = "qa-audience";
appendQaBar(audienceQaBar);

if ( emailSubType ) {
  applyQaResults(audienceQaBar, "success", "Audience Value Found");
} else {
  applyQaResults(audienceQaBar, "error", "Audience Value Missing");
}



//////////
////
////  QA Bar: Mobile Layout
////
/////////

var mobileLayoutQaBar = document.createElement("div");
mobileLayoutQaBar.id = "qa-mobile-layout";
mobileLayoutQaBar.className = "qa-mobile-layout";
appendQaBar(mobileLayoutQaBar);

if ( mFrameContents.body.scrollWidth > mobileIframe.offsetWidth ) {
  applyQaResults(mobileLayoutQaBar, "error", "Mobile Width Too Wide");
} else {
  applyQaResults(mobileLayoutQaBar, "success", "Mobile Width is Good");
}


//////////
////
////  QA Bar: Zoom Levels
////
/////////

// OFF

var zoomLevelsQaBar = document.createElement("div");
zoomLevelsQaBar.id = "qa-zoom-levels";
zoomLevelsQaBar.className = "qa-zoom-levels";
// appendQaBar(zoomLevelsQaBar);


//////////
////////////////
///////////////////////
////
////  QA Bar: Code Weight
////
///////////////////////
////////////////
//////////


// The Gmail limit for emails is 102kB (well... 101kB). The email will be truncated if you hit that number.

// Inspired by: https://www.sendwithus.com/resources/gmail_size_test
//              https://github.com/hteumeuleu/email-bugs/issues/41
// Uses: - https://stackoverflow.com/a/7343013/556079
//       - http://bytesizematters.com/
//       - https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder

var codeWeightQaBar = document.createElement("div");
codeWeightQaBar.id = "qa-codeweight";
codeWeightQaBar.className = "qa-codeweight";
appendQaBar(codeWeightQaBar);

// We need to calculate the email size.
// Let's take our original HTML (kinda) and make some modifications to try and make its contents more accurate.

  var htmlForSizeCalc = cleanedOriginalHtml;
  // var conditionalsExist = htmlForSizeCalc.match(/\*\|IF.+?\|\*/gi);
  console.log("ESP Conditionals: ", conditionalsExist);

  // Is this a MailChimp email? Detect by looking for merge tags.
    if ( /\*\|.+?\|\*/.test(htmlForSizeCalc) ) {

      // Let's replace the address merge field if its in there.
      htmlForSizeCalc = htmlForSizeCalc.replace(/\*\|LIST\:ADDRESSLINE\|\*/gi, "MedBridge · 1633​ ​Westlake​ ​Ave​ ​N​ · Suite 200 · Seattle, WA ​98109 · USA");

      // MailChimp's tracking links are a fairly consistent length. Let's replace all of ours with them.
      // The unsubscribe link is the same length as well. No worries.
      htmlForSizeCalc = htmlForSizeCalc.replace(/(href=".+?"|href='.+?')/gi, 'href="https://medbridgeeducation.us2.list-manage.com/track/click?u=9929f5c1548f4f842c9470a5f&id=620d233a43&e=46a1f0c393"');

      // Let's also add MailChimp's tracking pixel to the end.
      htmlForSizeCalc += '<img src="https://medbridgeeducation.us2.list-manage.com/track/open.php?u=3D9929f5c1548f4f842c9470a5f&id=3D2c96703b25&e=3D67c2f77a95" height="1" width="1">';

      // Let's also remove MailChimp conditionals.
      // If some exist, I should add an alert that explains that.
      htmlForSizeCalc = htmlForSizeCalc.replace(/\*\|(END|IF|ELSE).*?\|\*/gi, "");
    }

    // Below is deprecated in favor of code written by Lea Verou. See the 'ByteSize' function.
      ////// Calculate the size with our extra clean string.
      ////// var codeWeight       = new TextEncoder('utf-8').encode(htmlForSizeCalc).length;
      ////// var prettycodeWeight = prettyFileSize(codeWeight, 1);

    var codeWeight = ByteSize.count(htmlForSizeCalc),
        codeWeightFormatInt         = ByteSize.formatInt(codeWeight),
        codeWeightFormatString      = ByteSize.formatString(codeWeight),
        codeWeightFormatIntGmail    = ByteSize.formatIntGmail(codeWeight),
        codeWeightFormatStringGmail = ByteSize.formatStringGmail(codeWeight);

    console.log("codeWeight:", codeWeight, "codeWeightFormatInt:", codeWeightFormatInt, "codeWeightFormatString:", codeWeightFormatString, "codeWeightFormatIntGmail:", codeWeightFormatIntGmail, "codeWeightFormatStringGmail:", codeWeightFormatStringGmail, "conditionalsExist", conditionalsExist);

// Stricter code limit when the email has conditionals.
if ( conditionalsExist ) {
  if ( codeWeightFormatIntGmail >= 90 ) {
    applyQaResults(codeWeightQaBar, "error", "Code too big (~" + codeWeightFormatStringGmail + ")*");
  } else {
    applyQaResults(codeWeightQaBar, "success", "Code is ~" + codeWeightFormatStringGmail + "*");
  }
// No conditionals, respect the 102kb limit.
// Consider making a warning for 90kb+.
} else {
  if ( codeWeightFormatIntGmail >= 102 ) {
    applyQaResults(codeWeightQaBar, "error", "Code too big (~" + codeWeightFormatStringGmail + ")");
  } else {
    applyQaResults(codeWeightQaBar, "success", "Code is ~" + codeWeightFormatStringGmail);
  }
}


//////////
////////////////
///////////////////////
////
////  QA Bar: Image Weight
////
///////////////////////
////////////////
//////////

var imageWeightQaBar = document.createElement("div");
imageWeightQaBar.id = "qa-imageweight";
imageWeightQaBar.className = "qa-imageweight";
// appendQaBar(imageWeightQaBar);

//////////
////////////////
///////////////////////
////
////  QA Bar: Campaign Weight
////
///////////////////////
////////////////
//////////

var campaignWeightQaBar = document.createElement("div");
campaignWeightQaBar.id = "qa-campaignWeight";
campaignWeightQaBar.className = "qa-campaignWeight";
// appendQaBar(campaignWeightQaBar);


//////////
////////////////
///////////////////////
////
////  QA Bar: Citations
////
///////////////////////
////////////////
//////////


// OFF
var citationsQaBar = document.createElement("div");
citationsQaBar.id = "qa-citations";
citationsQaBar.className = "qa-citations";
// appendQaBar(citationsQaBar);


//////////
////////////////
///////////////////////
////
////  QA Bar: Loaded Images
////
///////////////////////
////////////////
//////////

var imagesQaBar = document.createElement("div");
imagesQaBar.id = "qa-images";
imagesQaBar.className = "qa-images";
appendQaBar(imagesQaBar);

if ( !navigator.onLine ) {
  applyQaResults(imagesQaBar, "warning", "Can't Check Images (Offline)");
}


//////////
////////////////
///////////////////////
////
////  QA Bar: Stretched Images
////
///////////////////////
////////////////
//////////

var imgRatioQaBar = document.createElement("div");
imgRatioQaBar.id = "qa-images-ratio";
imgRatioQaBar.className = "qa-images-ratio";
appendQaBar(imgRatioQaBar);

if ( !navigator.onLine ) {
  applyQaResults(imgRatioQaBar, "warning", "Can't Check Images (Offline)");
}


//////////
////////////////
///////////////////////
////
////  QA Bar: Text Warnings
////
///////////////////////
////////////////
//////////

// OFF

var textWarningsQaBar = document.createElement("div");
textWarningsQaBar.id = "qa-text-warnings";
textWarningsQaBar.className = "qa-text-warnings";
// appendQaBar(textWarningsQaBar);


///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//////////////////////////// == xxxxxxxxxxxxxxxx == ///////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

//
// Modify our page view/style/css based on the querystring before we start modifying dFrame and mFrameContents.
//

if ( getParameterByName("leftNav") || getParameterByName("mobile") ) {
  paneToggle(getParameterByName("leftNav"), getParameterByName("mobile"));
  // console.log("panes modified on page load via querystring");
}

if ( getParameterByName("presentation") === "1" ) {
  togglePresentation();
  console.log("presentation mode on");
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

alertify.set('notifier','position', 'bottom-right');



////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////
////     __   __  _______  ___      ___   ______   _______  _______  _______
////     |  | |  ||   _   ||   |    |   | |      | |   _   ||       ||       |
////     |  |_|  ||  |_|  ||   |    |   | |  _    ||  |_|  ||_     _||    ___|
////     |       ||       ||   |    |   | | | |   ||       |  |   |  |   |___
////     |       ||       ||   |___ |   | | |_|   ||       |  |   |  |    ___|
////      |     | |   _   ||       ||   | |       ||   _   |  |   |  |   |___
////       |___|  |__| |__||_______||___| |______| |__| |__|  |___|  |_______|
////
////    Our page layout has been built.
////    Start looking at the code in dFrame to validate links and more.
////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//////////////////////// ==  xxxxxxxxxxxxxxx  == //////////////////////////////
//////////////////////// ==                   == //////////////////////////////
//////////////////////// ==  ZOOM LEVEL CHECK == //////////////////////////////
//////////////////////// ==                   == //////////////////////////////
//////////////////////// ==  xxxxxxxxxxxxxxx  == //////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////


var zoomLevelChecked = false;
function checkZoomLevel() {
// https://stackoverflow.com/a/6365777/556079
// https://stackoverflow.com/a/6365777/556079

    var currentZoomLevel = dFrameContents.documentElement.style.zoom || 1;

    if ( currentZoomLevel && currentZoomLevel <= 0.85 ) {
      zoomLevelChecked = true;
      // console.log("Zoom level checked!");
    }
    // console.log("Current Zoom Level:", currentZoomLevel);


}

var zoomCheckStatus = false;

// updatePreflightErrorTotal("error", 1);
// Zoom level is an error on page load. Only one time! If zoom check is found in sessionsStorage, all of this should be ignored. Or should it? Major changes to HTML should be re-checked at different zoom levels after a page refresh. Figure out what to do here.

checkZoomLevel();


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
    moduleSettingsWrapper.dataset.korra = "";
    moduleSettingsWrapper.id = "module-settings";
    moduleSettingsWrapper.className = "debug module-settings-wrapper";
    dFrameContents.documentElement.appendChild(moduleSettingsWrapper);


let moduleList = dFrameContents.querySelectorAll("[data-mod]");
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
///////////////////////////////////////////////////////////////////////////////
////
////
////    ACCESSIBILITY CHECKS
////
////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

////////////
////////////
////////////
//
//
    totalAccessibilityWarnings = 0;
//
//
////////////
////////////
////////////





// role="presentation"
// Prevent screen readers from dictating table formats.
// Documentation:

(function(){

  console.group("[Accessibility: role='presentation']");

  let tables = dFrameContents.querySelectorAll("table");
  for (let table of tables) {
    if ( table.getAttribute("role") !== "presentation" ) {
      logAccessibilityWarning(table, 'Missing role="presentation" attribute.');
    } else {

    }
  }

  console.groupEnd();

})();


// alt=""
// All images need an alt attribute, even if its empty
// Documentation:

(function(){

  console.group("[Accessibility: alt='']");

  let images = dFrameContents.querySelectorAll("img");
  for (let image of images) {
    if ( image.getAttribute("alt") === null ) {
      logAccessibilityWarning(image, 'Missing alt="" attribute.');
    }
  }

  console.groupEnd();

})();


/////////
/////////
// Finished...
/////////
/////////
if ( totalAccessibilityWarnings > 0 ) {
  applyQaResults(accessibilityWarningsQaBar, "error");
}
else if ( totalAccessibilityWarnings === 0 ) {
  applyQaResults(accessibilityWarningsQaBar, "success", "No Accessibility Warnings");
}

///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
/////
/////
/////    Log Accessibility Warnings
/////
/////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////

function logAccessibilityWarning(object, id) {
  console.error(id, object);
  totalAccessibilityWarnings++
  updateQaBar(accessibilityWarningsQaBar, totalAccessibilityWarnings, " Accessibility Warnings");
}

function updateQaBar(bar, errors, string) {
  bar.querySelectorAll(".qa-text")[0].innerHTML = errors + string;
  bar.dataset.errors = errors;
}


///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
////
////
////    HTML/CSS BUG CHECK
////
////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

////////////
////////////
////////////
//
//
    totalCodingBugs = 0;
    totalCodingWarnings = 0;
//
//
////////////
////////////
////////////

// Outlook Bug
// No padding on <a>, <p>, or <div>
// Documentation:

(function(){

  console.group("[Bug Check] Outlook: Lack of Padding Support");
  // console.warn("Outlook 2007/2010/2013 do not allow sibling <td>s to have differing vertical padding (top and/or bottom). It will automatically set all sibling <td>s to have the same vertical padding as the first <td>. Documentation: Pending");

  let els = dFrameContents.querySelectorAll("a, p, div");
  for (let el of els) {

    if ( window.getComputedStyle(el, null).getPropertyValue("padding") !== "0px" ) {

      logCodeBug(el, "outlook-bug", "no-padding-support");

    }

  }
  console.groupEnd();


})();


// Outlook Bug
// <a> cannot link <table> elements
// Documentation:

(function(){

  console.group("[Bug Check] Outlook: <a> tags cannot link <table> elements");
  // console.warn("Outlook 2007/2010/2013 do not allow sibling <td>s to have differing vertical padding (top and/or bottom). It will automatically set all sibling <td>s to have the same vertical padding as the first <td>. Documentation: Pending");

  let els = dFrameContents.querySelectorAll("a table");
  for (let el of els) {

    logCodeBug(el, "outlook-bug", "<table>s cannot be linked with <a> tags in Outlook");

  }

  console.groupEnd();

})();



// Outlook Bug
// <td> vertical padding
// Documentation:

(function(){

  // Consider running this test on a version of the email that has @media
  // queries stripped out so that there's no question whether it will be relevant in Outlook.
  // If this test runs while a mobile based media query is active, it could skew results

  console.group("[Bug Check] Outlook: <td> Vertical Padding");
  console.warn("Outlook 2007/2010/2013 do not allow sibling <td>s to have differing vertical padding (top and/or bottom). It will automatically set all sibling <td>s to have the same vertical padding as the first <td>. Documentation: Pending");

  var firstTdTop, firstTdBottom;

  //
  let tableRows = dFrameContents.querySelectorAll("tr");
  for (let tableRow of tableRows) {
    // Check how many table cells are in this row. We only want to address rows with 2 or more.
    if ( tableRow.cells.length >= 2 ) {

      // console.log(tableRow);

      // Loop through all <td>'s in this table row.
      for (var i = 0; i < tableRow.cells.length; i++) {

        // console.group();
        //
        // console.log(tableRow.cells[i]);
        // console.log("table cell " + i + " of " + tableRow.cells.length);
        // console.log("innerText length: " + tableRow.cells[i].innerText.trim().length, "innerText content: '" + tableRow.cells[i].innerText.trim() + "'");
        // console.log("innerHTML length: " + tableRow.cells[i].innerHTML.trim().length, "innerHTML content: '" + tableRow.cells[i].innerHTML.trim() + "'");
        // console.log("textContent length: " + tableRow.cells[i].textContent.trim().length, "textContent content: '" + tableRow.cells[i].textContent.trim() + "'");
        //
        // console.groupEnd();

        // We need to ignore cells that are empty.
        // An empty table cell doesn't care if it gets different vertical padding.
        // So although this is still bugged, no one will ever know.

        // console.log("Begin check: " + i);
        if ( !isElementEmpty(tableRow.cells[i]) ) {
        // console.groupEnd();

        console.log( i );
        console.log( window.getComputedStyle(tableRow.cells[i], null).getPropertyValue("padding"), tableRow.cells[i] )
        console.log( window.getComputedStyle(tableRow.cells[i], null).getPropertyValue("padding-top"), tableRow.cells[i] )
        console.log( window.getComputedStyle(tableRow.cells[i], null).getPropertyValue("padding-bottom"), tableRow.cells[i] )

          // Log the top and bottom padding of our first <td>
          if ( i === 0 ) {
            firstTdTop = window.getComputedStyle(tableRow.cells[i], null).getPropertyValue("padding-top");
            firstTdBottom = window.getComputedStyle(tableRow.cells[i], null).getPropertyValue("padding-bottom");
          }
          // if this isn't the first <td>, check its top and bottom padding against the first <td>
          // Throw an error if they don't match.
          else if ( window.getComputedStyle(tableRow.cells[i], null).getPropertyValue("padding-top") !== firstTdTop || window.getComputedStyle(tableRow.cells[i], null).getPropertyValue("padding-bottom") !== firstTdBottom ) {
            // Error
            logCodeBug(tableRow.cells[i], "outlook", "vertical-cell-padding");
          }

        }

      }

    }
  }

  console.groupEnd();

})();



// Outlook Bug
// !important inline css parsing
// Documentation:

(function(){

  console.group("[Bug Check] Outlook: !important parsing");
  console.warn("Outlook 2007/2010/2013 do not support the use of the `!important` declaration in inline styles. It will always invalidate the style that is attached to. Documentation: https://github.com/hteumeuleu/email-bugs/issues/31")

  var firstTdTop, firstTdBottom;

  //
  let els = dFrameContents.querySelectorAll("*[style]");
  for (let el of els) {

    for (var i = 0; i < el.style.length; i++) {

      if ( el.style.getPropertyPriority(el.style[i]) === "important" ) {
        // console.log( el.style[i] );
        logCodeBug(el, "outlook", "important-parsing on " + el.style[i]);
      }

    }

  }

  console.groupEnd();

})();


/////////
/////////
// Finished...
/////////
/////////
if ( totalCodingBugs > 0 ) {
  applyQaResults(codingBugsQaBar, "error");
}
else if ( totalCodingBugs === 0 ) {
  applyQaResults(codingBugsQaBar, "success", "No Coding Bugs Found");
}


///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
/////
/////
/////    Log Coding Bugs
/////
/////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////

function logCodeBug(object, client, errorText) {
  console.error("Coding Bug:", client, errorText, object);
  totalCodingBugs++
  updateQaBar(codingBugsQaBar, totalCodingBugs, " Bugs Found");
}

function updateQaBar(bar, errors, string) {
  bar.querySelectorAll(".qa-text")[0].innerHTML = errors + string;
  bar.dataset.errors = errors;
}




///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
////
////
////    LINK VALIDATION
////
////
///////////////////////////////////////////////////////////////////////////////
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


// Create the wrapper for the link-markers.
var linkMarkerWrapper = document.createElement("section");
linkMarkerWrapper.dataset.korra = "";
linkMarkerWrapper.id = "link-markers";
linkMarkerWrapper.className = "debug link-markers-wrapper";
linkMarkerWrapper.style = "display:none";
dFrameContents.documentElement.appendChild(linkMarkerWrapper);

// Begin by running the loop function for all links.
// This will validate all links in dFrame and in dummy frame.

// dframe links, dummy frame links, age check
linkValidationLoop(linkList, dummyLinkList, "false");





///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
////
////    GRAMMAR AND VERBIAGE CHECKS
////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

////////////
////////////
////////////
//
//    Highlight words that may be used in error.
//
//    * no success callback supported yet.
//
////////////
////////////
////////////

/*

Text to Search For

ASHA (only in SLP)
AOTA (only in OT)


*/

// Only check words if this is a recent email.
// if ( isRecentEmail ) {

  countCitations();

// } else {
  // console.error("Text was not checked for errors.")
// }

function countCitations() {
  // console.log( "Citations", dFrameContents.getElementsByTagName('sup').length );
  var asters = (dFrameContents.body.innerText.match(/[^\|]\*[^\|]/g)||[]).length;
  // console.log( "Asterisks", asters);
}

// Run a check on all text in the email
highlightTextErrors();



// This function allows findAndReplaceDOMText to exclude matches. This functionality is not built-in to the script so we need this function.
// Visit this closed issue on GitHub for more info: https://github.com/padolsey/findAndReplaceDOMText/issues/64

    function globalRegexWithFilter(regex, filterFn) {
      if (!regex.global) {
        throw new Error('Regex must be global');
      }
      function exec(text) {
        var result = regex.exec(text);
        if (result && !filterFn(result[0])) {
          return exec(text);
        }
        return result;
      }
      return {
        global: true,
        exec: exec
      };
    }

function highlightTextErrors() {
//
// SPAM TRIGGER WORD
//
// Click|Click below|Click here|Click to remove|
findAndReplaceDOMText(dFrameBody, {
  find: /((‘|')?Hidden(’|')? assets|100% free|100% Satisfied|4U|\$\$\$|\bAd\b|Accept credit cards|Acceptance|Act Now!?|Act now!? Don(’|')?t hesitate\!?|Additional income|Addresses on CD|All natural|All new|Amazing stuff|Apply now|Apply Online|As seen on|Auto email removal|Avoid bankruptcy|Bargain|Be amazed|Be your own boss|Beneficiary|Beverage|Big bucks|Bill 1618|Billing address|Brand new pager|Bulk email|Buy direct|Buying judgements|Buying judgments|Cable converter|Call free|Call now|Calling creditors|Can(’|')?t live without|Cancel at any time|Cannot be combined with any other offer|Cards accepted|Cash bonus|Casino|Celebrity|Cell phone cancer scam|Cents on the dollar|Check or money order|Claims|Claims not to be selling anything|Claims to be in accordance with some spam law|Claims to be legal|Clearance|Collect child support|Compare rates|Compete for your business|Confidentially on all orders|Consolidate debt and credit|Consolidate your debt|Copy accurately|Copy DVDs|Credit bureaus|Credit card offers|Cures baldness|Dig up dirt on friends|Direct email|Direct marketing|Do it today|Don(’|')?t delete|Don(’|')?t hesitate|Double your|Double your income|Drastically reduced|Earn \$|Earn extra cash|Earn per week|Easy terms|Eliminate bad credit|Eliminate debt|Email harvest|Email marketing|Expect to earn|Explode your business|Extra income|F r e e|Fantastic deal|Fast cash|Fast Viagra delivery|Financial freedom|Financially independent|For instant access|For just \$|For just \$[0-9]+?|Free access|Free cell phone|Free consultation|Free consultation|Free DVD|Free gift|Free grant money|Free hosting|Free info|Free installation|Free Instant|Free investment|Free leads|Free membership|Free money|Free offer|Free preview|Free priority mail|Free quote|Free sample|Free trial|Free website|Full refund|Get it now|Get out of debt|Get paid|Gift certificate|Give it away|Giving away|Great offer|Have you been turned down\??|Hidden assets|Hidden charges|Home based|Home employment|Homebased business|Human growth hormone|If only it were that easy|Important information regarding|In accordance with laws|Income from home|Increase sales|Increase traffic|Increase your sales|Incredible deal|Info you requested|Information you requested|Insurance|Internet market|Internet marketing|Investment decision|It(’|')?s effective|It(’|')?s effective|Join millions|Join millions of Americans|Laser printer|Life Insurance|Loans|Long distance phone offer|Lose weight|Lose weight spam|Lower interest rate|Lower interest rates|Lower monthly payment|Lower your mortgage rate|Lowest insurance rates|Luxury car|Mail in order form|Make \$|Make money|Marketing solutions|Mass email|Meet singles|Member stuff|Message contains|Message contains disclaimer|Miracle|MLM|Money back|Money making|Month trial offer|More Internet Traffic|Mortgage|Mortgage rates|Multi\-?level marketing|New customers only|New domain extensions|Nigerian|No age restrictions|No catch|No claim forms|No cost|No credit check|No disappointment|No experience|No fees|No gimmick|No hidden|No inventory|No investment|No medical exams|No questions asked|No selling|No strings attached|Not intended|Notspam|Now only|Off shore|Offer expires|Once in lifetime|One hundred percent free|One hundred percent guaranteed|One time|One time mailing|Online biz opportunity|Online degree|Online marketing|Online pharmacy|Opt in|Order now|Order shipped by|Order status|Order today|Orders shipped by|Outstanding values|Pennies a day|Potential earnings|Pre-approved|Print form signature|Print out and fax|Priority mail|Produced and sent out|Promise you|Pure Profits|Real thing|Refinance home|Refinanced home|Removal instructions|Removes wrinkles|Reserves the right|Reverses aging|Risk free|S 1618|Safeguard notice|Satisfaction guaranteed|Save \$|Save big money|Save up to|Score with babes|Search engine listings|Search engines|Section 301|See for yourself|Sent in compliance|Serious cash|Serious only|Shopping spree|Sign up free today|Social security number|Stainless steel|Stock alert|Stock disclaimer statement|Stock pick|Stop snoring|Strong buy|Stuff on sale|Subject to cash|Subject to credit|Supplies are limited|Take action now|Talks about hidden charges|Talks about prizes|Tells you it(’|')?s an ad|The best rates|The following form|They keep your money \– no refund|They(’|')?re just giving it away|This isn(’|')?t (junk|spam|last|a scam)?|Time limited|Trial|Undisclosed recipient|University diplomas|Unsecured (credit|debt)|Unsolicited|US dollars|Vacation|Vacation offers|Valium|Viagra|Viagra and other drugs|Vicodin|Visit our website|Wants credit card|Warranty|We hate spam|We honor all|Web traffic|Weekend getaway|Weight loss|What are you waiting for\??|While supplies last|While you sleep|Who really wins\??|Why pay more\??|Wife|Will not believe your eyes|Work at home|Work from home|Xanax|You are a winner!?|You have been selected|You(’|')?re a Winner!?|Your income)/gi,
  wrap: 'span', wrapClass: "text-error"
});

///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////


// Platform Checks
if ( emailPlatform === "gr" ) {
  // Do not use *|MAILCHIMP|* merge tags with a GetResponse email.
  findAndReplaceDOMText(dFrameBody, {
    find: /(\*\|.+?\|\*|\[[^\[\]]+?\][^\]])/gi,
    wrap: 'span', wrapClass: "text-error"
  });
}

if ( emailPlatform === "mc" ) {
  // Do not use [[getresponse]] merge tags with a MailChimp email.
  findAndReplaceDOMText(dFrameBody, {
    find: /\[\[?.+?\]\]?/gi,
    wrap: 'span', wrapClass: "text-error"
  });
}

if ( emailPlatform === "sg" ) {
  // Do not use *|MAILCHIMP|* merge tags with a GetResponse email.
  findAndReplaceDOMText(dFrameBody, {
    find: /(\*\|.+?\|\*|\[\[.+?\]\])/gi,
    wrap: 'span', wrapClass: "text-error"
  });
}

/////////////////////////////////
////                         ////
////    DISCIPLINE CHECKS    ////
////                         ////
/////////////////////////////////


// Promo Codes
  if ( emailDisc !== "pt" ) {
    findAndReplaceDOMText(dFrameBody, {
      find: /(Promo Code.+?\b[A-Za-z0-9]+?PT\b)/gi,
      wrap: 'span', wrapClass: "text-error"
    });
  }
  if ( emailDisc !== "at" ) {
    findAndReplaceDOMText(dFrameBody, {
      find: /(Promo Code.+?\b[A-Za-z0-9]+?AT\b)/gi,
      wrap: 'span', wrapClass: "text-error"
    });
  }
  if ( emailDisc !== "ot" ) {
    findAndReplaceDOMText(dFrameBody, {
      find: /(Promo Code.+?\b[A-Za-z0-9]+?OT\b)/gi,
      wrap: 'span',
      wrapClass: "text-error"
    });
  }
  if ( emailDisc !== "slp" ) {
    findAndReplaceDOMText(dFrameBody, {
      find: /(Promo Code.+?\b[A-Za-z0-9]+?SLP\b)/gi,
      wrap: 'span', wrapClass: "text-error"
    });
  }
  if ( emailDisc === "other" ) {
    findAndReplaceDOMText(dFrameBody, {
      find: /(Promo Code.+?\b[A-Za-z0-9]+?(PT|AT|OT|SLP)\b)/gi,
      wrap: 'span', wrapClass: "text-error"
    });
  }


//////////
////
//// Pricing
////
//////////
if ( emailDisc === "pt" || emailDisc === "other" || emailDisc === "ot" || emailDisc === "at" ) {

  findAndReplaceDOMText(dFrameBody, {
    find: /((only )?\$95|(only )?\$145)/gi,
    wrap: 'span', wrapClass: "text-error"
  });

}

if ( emailDisc === "slp" ) {

  findAndReplaceDOMText(dFrameBody, {
    find: /((only )?\$200|(only )?\$250)/gi,
    wrap: 'span', wrapClass: "text-error"
  });

}

if ( emailDisc === "lmt" || emailDisc === "ent" ) {

  findAndReplaceDOMText(dFrameBody, {
    find: /\$95|\$145|\$200|\$250/gi,
    wrap: 'span', wrapClass: "text-error"
  });

}



//////////
////
//// Physical Therapy - PT
////
//////////
if ( emailDisc === "pt" || emailDisc === "other" ) {

  // case sensitive
  findAndReplaceDOMText(dFrameBody, {
    find: /\b(ASHA|AOTA)\b/g,
    wrap: 'span', wrapClass: "text-error"
  });

  // case (IN)sensitive
  findAndReplaceDOMText(dFrameBody, {
    find: /(BOC\-Approved|Athletic Train(er|ing)|Occupational Therap(y|ist))/gi,
    wrap: 'span', wrapClass: "text-error"
  });

//////////
////
//// Athletic Training - AT
////
//////////
} else if ( emailDisc === "at" ) {

  // case sensitive
  findAndReplaceDOMText(dFrameBody, {
    find: /\b(ASHA|AOTA)\b/g,
    wrap: 'span', wrapClass: "text-error"
  });

  // case (IN)sensitive
  findAndReplaceDOMText(dFrameBody, {
    find: /((only )?\$95|(only )?\$145|Physical Therap(y|ist)|Occupational Therap(y|ist))/gi,
    wrap: 'span', wrapClass: "text-error"
  });

//////////
////
//// Occupational Therapy - OT
////
//////////
} else if ( emailDisc === "ot" ) {

  // case sensitive
  findAndReplaceDOMText(dFrameBody, {
    find: /\b(ASHA)\b/g,
    wrap: 'span', wrapClass: "text-error"
  });

  // case (IN)sensitive
  findAndReplaceDOMText(dFrameBody, {
    find: /(BOC\-Approved|Physical Therap(y|ist)|Athletic Train(er|ing))/gi,
    wrap: 'span', wrapClass: "text-error"
  });

//////////
////
//// Speech Language Pathology - SLP
////
//////////
} else if ( emailDisc === "slp" ) {

  findAndReplaceDOMText(dFrameBody, {
    find: /\b(AOTA|APTA)\b/g,
    wrap: 'span', wrapClass: "text-error"
  });
  // case-insensitive
  findAndReplaceDOMText(dFrameBody, {
    find: /(BOC\-Approved|Physical Therap(y|ist)|Athletic Train(er|ing)|Occupational Therap(y|ist)|patient outcomes?|clinician)/gi,
    wrap: 'span', wrapClass: "text-error"
  });

//////////
////
//// Massage
////
//////////
} else if ( emailDisc === "lmt" ) {

  findAndReplaceDOMText(dFrameBody, {
    find: /\b(ASHA|AOTA)\b/g,
    wrap: 'span', wrapClass: "text-error"
  });
  // case-insensitive
  findAndReplaceDOMText(dFrameBody, {
    find: /(BOC\-Approved|Physical Therap(y|ist)|CCC\-SLP|patient engagement tool)/gi,
    wrap: 'span', wrapClass: "text-error"
  });

//////////
////
//// Enterprise
////
//////////
} else if ( emailDisc === "ent" ) {
  // Enterprise

  ///

}


//
// ALL
//

  // NOTES ABOUT TEXT WARNINGS ---
  ////////////////////////////////

  // 17-11-06 - Subscribers don't win a free subscription, they win a subscription extension and vice versa for non-subscribers.
  // 17-06-14 - Decided to stop saying "Unlimited CEUs" and instead say "Unlimited Access to CEUs" or "Unlimited CEU Access". We don't literally have unlimited CEUs, but we can provide unlimited ACCESS. Thanks ASHA! -_-
    // - 10/30/17 Update: Per ASHA, "Unlimited Access to CEUs" is still not right. We have to say "Unlimited Access to CE Courses". This only applies to SLP.
  // 17-09-05 - Justin does not like "From the Blog" or even referring to our blog site as a blog at all.
  // 18-04-24 - Never 'Continued' Education. Only 'Continuing' Education.
  // 18-08-28 - ASHA
     // MedBridge is an ASHA Approved Provider and MedBridge offers courses registered for ASHA CEUs. It is incorrect to say that MedBridge offers ASHA-approved or ASHA-accredited courses because we do not approve or accredit content we only approve or accredit providers. Unlimited CEU courses is misleading – there is a limit to what you can offer

  ////////////////////////////////
  ////////////////////////////////

  // All Disciplines and Audiences
  // Case (IN)sensitive

    findAndReplaceDOMText(dFrameBody, {
      find: /(continuing education|from the )?blog|Unlimited CEUs(\.|!)|(asha( |\-)(approved|accredited)|at no extra cost|get your ceu|ceu's|\/?[A-Za-z]+>)/gi,
      wrap: 'span', wrapClass: "text-error"
    });
    // Continuing Education, not Continued Education
    // Speech-Language needa a hyphen
    findAndReplaceDOMText(dFrameBody, {
      find: /(continued education|speech language)/gi,
      wrap: 'span', wrapClass: "text-error"
    });
    // Link Arrows → Arrows need to be immediately preceded by a non-breaking space to ensure it doesn't get dropped to the next line
    findAndReplaceDOMText(dFrameBody, {
      find: /(?:(?!\u00a0).{1}|^.{0,0})(\u2192)(?!\u00a0)/gi,
      wrap: 'span', wrapClass: "text-error"
    });
    // CE Courses, not CEU Courses
    findAndReplaceDOMText(dFrameBody, {
      find: /\bCEU Course/gi,
      wrap: 'span', wrapClass: "text-error"
    });

  // All Disciplines and Audiences
  // Case Sensitive
  ////

    findAndReplaceDOMText(dFrameBody, {
      find: /\b[Mm]edbridge( |\.|\!|\?|,)/g,
      wrap: 'span', wrapClass: "text-error"
    });
    findAndReplaceDOMText(dFrameBody, {
      find: /\bCross-Track\b/g,
      wrap: 'span', wrapClass: "text-error"
    });


//
// NUMBERS - MISSING COMMAS
// Ignore numbers that start with 0, the end of phone numbers (-####), common years (1990-1999, 2001-2040), MedBridge address (1633, 98109)
//
  findAndReplaceDOMText(dFrameBody, {
  	find: globalRegexWithFilter(/[^-–:#]\b[1-9]\d\d\d\b/g, function(theMatch) {
    	return !/(98109|1633|199[0-9]|20[0-4][0-9])/g.test(theMatch);
    }),
    wrap: 'span', wrapClass: "text-error"
  });


//
// PRODUCT CAPITALIZATION
//
findAndReplaceDOMText(dFrameBody, {
  find: /MedBridge ((?:patient [Ee]|Patient e)ngagement|Prep\-program|prep\-[Pp]rogram)/g,
  wrap: 'span', wrapClass: "text-error"
});

//
// Prep Program
//
findAndReplaceDOMText(dFrameBody, {
  find: /\b(MedBridge|[A-Z]CS) prep [Pp]rogram\b/g,
  wrap: 'span', wrapClass: "text-error"
});

findAndReplaceDOMText(dFrameBody, {
  find: /\bprep\-programs?\b/gi,
  wrap: 'span', wrapClass: "text-error"
});

//
// Subscriber
//
if ( emailSubType === "sub" ) { // Removed && emailDisc !== "ent"
  findAndReplaceDOMText(dFrameBody, {
    find: /(win a free subscription|Start for Free|\bSubscribe\b|(?:in the (?:annual )?|in the annual MedBridge )subscription|\bin a(?:n annual|(?:n annual MedBridge)?) subscription|with a(?:n annual|(?:n annual MedBridge)?) subscription)/gi,
    wrap: 'span', wrapClass: "text-error"
  });
}

//
// Non-Subscribers
//
if ( emailSubType === "ns" ) {
  findAndReplaceDOMText(dFrameBody, {
    find: /(Start Now|Refer(\-| )a(\-| )Friend|in(?:cluded with)? your (?:(?:MedBridge )?s|annual (?:MedBridge )?s)ubscription)/gi,
    wrap: 'span', wrapClass: "text-error"
  });
}

//
// outsideOrg
//
if ( outsideOrg ) {

  findAndReplaceDOMText(dFrameBody, {
    find: /additional cost|Refer(\-| )a(\-| )Friend/gi,
    wrap: 'span', wrapClass: "text-error"
  });

  findAndReplaceDOMText(dFrameBody, {
    find: /Enterprise/g,
    wrap: 'span', wrapClass: "text-error"
  });

}

//
// emailAnySale
//
if ( (emailSubType === "ns" || emailSubType === "sub") && !emailAnySale ) {
  findAndReplaceDOMText(dFrameBody, {
    find: /(only )?\$(200|95|145|250)( |!|\.)/gi,
    wrap: 'span', wrapClass: "text-error"
  });
}

//
// Sale Verbiage
//

if ( emailAnySale && emailDisc !== "lmt" ) {
  findAndReplaceDOMText(dFrameBody, {
    find: /50%/gi,
    wrap: 'span', wrapClass: "text-error"
  });
}
// Massage Pricing
if ( emailAnySale && emailDisc === "lmt" ) {
  findAndReplaceDOMText(dFrameBody, {
    find: /40%/gi,
    wrap: 'span', wrapClass: "text-error"
  });
}


//
// Grammar
//
findAndReplaceDOMText(dFrameBody, {
  find: /evidence based EBP/gi,
  wrap: 'span', wrapClass: "text-error"
});

findAndReplaceDOMText(dFrameBody, {
  find: /evidence\-based EBP/gi,
  wrap: 'span', wrapClass: "text-error"
});



if ( outsideOrg ) {

  findAndReplaceDOMText(dFrameBody, {
    find: /(request a demo|part of an? (group|organization)|sign(\-| )up|\bsubscribe\b)/gi,
    wrap: 'span', wrapClass: "text-error"
  });

}


if ( emailDisc === "slp" ) {

  findAndReplaceDOMText(dFrameBody, {
    find: /Unlimited (Access to )?(CE'?s|CEU'?s)/gi,
    // Must say CE Courses
    wrap: 'span', wrapClass: "text-error"
  });

}


// Check for words that would typically be linked by stupid Gmail. Like "tomorrow" linking to the calendar.
findAndReplaceDOMText(dFrameBody, {
  find: /tomorrow|noon/gi,
  wrap: 'span', wrapClass: "text-error gmail-fix", forceContext: true
});



}
// end function

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//////////////////////////////// == ALERTS == /////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

// Refer-a-Friend Reminder
if ( /Refer(\-| )a(\-| )Friend/gi.test(dFrameContents.body.textContent) ) {
  alertify.error("Refer a Friend<div>Remember update the MailChimp database and use conditional statements to only show Refer a Friend content to eligible contacts.</div>", 0);
}

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////// == PERSISTENT PARAMETERS == /////////////////////////
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

function toggleHelpers() {
  dFrameContents.documentElement.classList.toggle("all-helpers-off");
}

// Turns off link error badges
if ( getParameterByName("helpers") === "0" ) {
  toggleHelpers();
  console.log("helpers off");
}


    function toggleLinkMarkers() {

      if ( this.nodeType !== 1 ) {
        dFrameContents.getElementById("link-markers").classList.add("on-page-load");
      } else if ( dFrameContents.querySelector(".on-page-load") ) {
        dFrameContents.getElementById("link-markers").classList.remove("on-page-load");
      } else {
        dFrameContents.getElementById("link-markers").classList.toggle("hidden");
      }

      linkMarkersToggle = !linkMarkersToggle;

      if ( linkMarkersToggle ) {
        history.replaceState(null,null, updateQueryString("links", "0") );
      } else {
        history.replaceState(null,null, updateQueryString("links") );
      }

    }


window.onload = function () {


  // Wait until all images are downloaded before running functions that alter or enhance the email preview.
  // These functions rely on the layout being set in its place.
  // https://stackoverflow.com/a/588048/556079

  if ( getParameterByName("img") === "0" ) {
    toggleImages();
    console.log("images off");
  }

  if ( getParameterByName("style") === "0" ) {
    toggleStyles();
    console.log("style blocks off");
  }

  if ( getParameterByName("showdims") === "1" ) {
    showDims();
    console.log("container outlines shown");
  }

  if ( getParameterByName("baseline") === "1" ) {
    createBaselineOverlay();
    console.log("baseline grids shown");
  }

  if ( getParameterByName("links") === "0" ) {
    toggleLinkMarkers();
    console.log("links hidden");
  }

  if ( getParameterByName("imgdims") === "1" ) {
    toggleImgDims();
    console.log("img dimensions revealed");
  }

}

// These functions don't need to wait for the layout to settle down.

if ( getParameterByName("guides") === "1" ) {
  toggleGuides();
  console.log("guides shown");
}




///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//////////////////////////// == xxxxxxxxxxxxxxxx == ///////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

// ---
// Keymaster.js does not support listening to iframes at this time.
// So we are only using keymaster.js for the main document window.
// For the desktop and mobile iframes we are listening for 'keydown' and processing
// the event keys separately the old fashioned way.

// ---
// Despite forgetting this on several occasions, we do not need to inject iframes
// with code to listen for or act on keypresses. We can just attach eventlisteners
// here at the top level.

////////////////////
////////////////////
////////////////////
///
///   Keypress Listening
///
////////////////////
////////////////////
////////////////////

// In order to act on simultaneous keydown and scroll, we need to save the key
// to a variable on keydown, and then erase it on keyup.
// Required for our SyncScrolling feature further down.

var currentKey = '';

// Desktop Frame
dFrameContents.addEventListener('keydown', function(e) {
  currentKey = e;
  processShortcut(e);
  // console.log(e);
});
dFrameContents.addEventListener('keyup', function(e) { currentKey = ''; });

// Mobile Frame
mFrameContents.addEventListener('keydown', function(e) {
  currentKey = e;
  processShortcut(e);
  // console.log(e);
});
mFrameContents.addEventListener('keyup', function(e) { currentKey = ''; });


////////////////////
////////////////////
////////////////////
///
///   Process Shortcuts
///
////////////////////
////////////////////
////////////////////

// Old Fashion because keymaster.js can't read keystrokes from iframes
//////////////

function processShortcut(e) {

  // Print Desktop
  if ( (e.ctrlKey || e.metaKey) && e.keyCode == 80 ) {
    e.preventDefault();
    printDesktop();
  }

  // Zoom Desktop
  if ( (e.ctrlKey || e.metaKey) && (e.keyCode == 48 || e.keyCode == 187 || e.keyCode == 189) ) {
    e.preventDefault();

    // Zoom-out
    if ( (e.ctrlKey || e.metaKey) && e.keyCode == 189 ) {
      zoom("-");
    }
    // Zoom-in
    if ( (e.ctrlKey || e.metaKey) && e.keyCode == 187 ) {
      zoom("+");
    }
    // Reset Zoom
    if ( (e.ctrlKey || e.metaKey) && e.keyCode == 48 ) {
      zoom("0");
    }
  }

}

// Keymaster.js
///////////////

// Print the desktop view only.
key('ctrl+p, ⌘+p', function() {
  printDesktop();
  return false;
});

// Zoom the desktop view only.
key('ctrl+-, ⌘+-', function() {
  zoom("-");
  return false;
});
key('ctrl+=, ⌘+=', function() {
  zoom("+");
  return false;
});
key('ctrl+0, ⌘+0', function() {
  zoom("0");
  return false;
});




////////////////////
////////////////////
////////////////////
///
///   Shortcut Functions
///
////////////////////
////////////////////
////////////////////


function printDesktop() {
  desktopIframe.contentWindow.print();
}


// Zoom the desktop view only.
var dFrameZoomStatus = document.getElementById("desktop-zoom-status");
var currentZoomLevel = "1";
var zoomLevels     = ["0.25", "0.33", "0.5", "0.67", "0.75", "0.8", "0.9", "1", "1.1", "1.25", "1.5", "1.75", "2"];
var zoomLevelsText = ["25%", "33%", "50%", "67%", "75%", "80%", "90%", "100%", "110%", "125%", "150%", "175%", "200%"];

function zoom(direction) {

  // console.log("zoom() function inititated");
  // console.log("zoom(direction): " + direction);
  // console.log("currentZoomLevel: " + currentZoomLevel);

  currentZoomLevel = dFrameHTMLEle.style.zoom || "1";

  // Zoom-out
  if ( direction === "-" && currentZoomLevel !== "0.25" ) {
    dFrameHTMLEle.style.zoom   = zoomLevels[zoomLevels.indexOf(currentZoomLevel)-1]; // Go DOWN 1 level in the array.
    dFrameZoomStatus.innerHTML = zoomLevelsText[zoomLevels.indexOf(currentZoomLevel)-1]; // Go DOWN 1 level in the array.
    dFrameZoomStatus.classList.add("show");

    console.log( "Zoom: " + zoomLevelsText[zoomLevels.indexOf(currentZoomLevel)-1] );
  }
  // Zoom-in
  if ( direction === "+" && currentZoomLevel !== "2" ) {
    dFrameHTMLEle.style.zoom   = zoomLevels[zoomLevels.indexOf(currentZoomLevel)+1] // Go UP 1 level in the array.
    dFrameZoomStatus.innerHTML = zoomLevelsText[zoomLevels.indexOf(currentZoomLevel)+1] // Go UP 1 level in the array.
    dFrameZoomStatus.classList.add("show");

    console.log( "Zoom: " + zoomLevelsText[zoomLevels.indexOf(currentZoomLevel)+1] );
  }
  // Reset Zoom
  if ( direction === "0" ) {
    dFrameHTMLEle.style.zoom   = zoomLevels[7] // Go UP 1 level in the array.
    dFrameZoomStatus.innerHTML = zoomLevelsText[7] // Go UP 1 level in the array.
  }
  // Reset Zoom
  if ( dFrameHTMLEle.style.zoom === "1") {
    dFrameZoomStatus.classList.remove("show");
  }
}



///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
/////////////////////////// == SCROLL SYNCING == //////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

///////////
//
// Sync Scrolling can be temporarily turned off by holding ctrl or cmd while scrolling.
// Does not work if devtools has focus.
//
///////////

dFrameContents.addEventListener('scroll', function(e) {

  // @TODO
  // Can I see if a scroll happened because of a mouse wheel/trackpad/key press?
  // As opposed to the window/iframe changing in size?

  // console.log("desktop", e);

  if ( key.command || key.control || currentKey.ctrlKey || currentKey.metaKey ) {
    // console.log("command or control was held during scroll")
  } else {
    syncScroll(dFrameContents, document.querySelector("#desktop-view"));
  }
});

mFrameContents.addEventListener('scroll', function(e) {

  // console.log("mobile", e);

  if ( key.command || key.control || currentKey.ctrlKey || currentKey.metaKey ) {
    // do nothing
  } else {
    syncScroll(mFrameContents, document.querySelector("#mobile-view"));
  }
});



function syncScroll(targetFrame, iFrameObj) {

  // console.log("syncScroll function activated.")

  // If this function is called on a frame with "syncing" in the classList, return false.
  if ( iFrameObj.classList.contains("syncing") ) {

    // console.log("'syncing' FOUND in classList of ", iFrameObj);

    iFrameObj.classList.remove("syncing");
    return false;

  // Else, continue running the function to sync scrolling across frames.
  } else {

    // console.log("'syncing' NOT FOUND in classList of ", iFrameObj);

    // Grab relevent variables
    //////////////////////////
    var targetFrameHeight = targetFrame.body.scrollHeight - iFrameObj.clientHeight;

    // DEPRECATED in Chrome 61 ref: https://stackoverflow.com/questions/45061901/chrome-61-body-doesnt-scroll
    // - var targetScrollPos = targetFrame.body.scrollTop;

    var targetScrollPos = targetFrame.scrollingElement.scrollTop;
    var targetScrollPerc = targetScrollPos / targetFrameHeight;

    // console.log("targetFrameHeight: ", targetFrameHeight, "targetScrollPos: ", targetScrollPos, "targetScrollPerc: ", targetScrollPerc);

    // Modify the scrolling position of the frame that we weren't scrolling.
    if ( iFrameObj.id === "desktop-view" ) {
      // var matchingFramePos = (mFrameContents.body.scrollHeight - mFrameContents.body.clientHeight) * targetScrollPerc;
      var matchingFramePos = (mFrameContents.body.scrollHeight - document.querySelector("#mobile-view").clientHeight) * targetScrollPerc;
      var matchingFrameScroll = document.getElementById('mobile-view');
      // console.log("Active: Scrolling Desktop View - targetScrollPerc: " + targetScrollPerc + ", matchingFramePos: " + matchingFramePos);
    } else {
      // var matchingFramePos = (dFrameContents.body.scrollHeight - dFrameContents.body.clientHeight) * targetScrollPerc;
      var matchingFramePos = (dFrameContents.body.scrollHeight - document.querySelector("#desktop-view").clientHeight) * targetScrollPerc;
      var matchingFrameScroll = document.getElementById('desktop-view');
      // console.log("Active: Scrolling Mobile View - targetScrollPerc: " + targetScrollPerc + ", matchingFramePos: " + matchingFramePos);
    }

    matchingFrameScroll.classList.add("syncing");
    matchingFrameScroll.contentWindow.scrollTo(0,matchingFramePos);
  }

}


///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//////////////////////////// == PRE-FLIGHT == /////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////


// Hide rocket and reveal errors in the notifier after a few seconds on initial page load.
// Only reveal it if the tab is active when the settimeout fires.
// Re-try whenever the tab becomes active until it works, then remove the event listener.


// Listen for changes to the pages visibility
  // Page Visibility in 2015 - https://stackoverflow.com/a/6184276/556079
  // You can't remove eventlisteners if the function is anonymous - https://stackoverflow.com/a/10444156/556079 / https://stackoverflow.com/a/5825519/556079
  // Naming a function so that you can pass extra variables and also remove the event later - https://stackoverflow.com/a/16651942/556079
  // Bubbling/false vs Capturing/true - https://stackoverflow.com/a/14807507/556079

window.addEventListener('visibilitychange', activatePreflightNotifier, true);

function activatePreflightNotifier() {

  // console.log("activatePreflightNotifier initiated");

  setTimeout(function() {

    // Check if the current tab is visible using the Page Visibility API
    if ( !document.hidden ) { // https://stackoverflow.com/a/12186061/556079

      preflightStatus.classList.remove("initial-load");
      preflightStatus.classList.add("load-finished");

      if ( preflightTotal.textContent === "0" ) {
        preflightNotifierSuccess();
      }

      // Document is visible, remove the eventlistener
      window.removeEventListener('visibilitychange', activatePreflightNotifier, true);
      // window.removeEventListener('visibilitychange', true);

       // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener
      // Events https://developers.google.com/web/tools/chrome-devtools/console/events


    } else {
      // document is hidden, do nothing
    }

  }, 1000);

}
activatePreflightNotifier();




///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
////////////////////////// == DRAG TO RESIZE == ///////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

// Drag to Resize
// WINNER: http://interactjs.io/
// DEMO: https://codepen.io/jimmykup/pen/PQQPpy
// Others:
// https://codepen.io/arctelix/pen/RWVoMv?editors=1010
// https://codepen.io/zz85/post/resizing-moving-snapping-windows-with-js-css
// http://codepen.io/zz85/pen/gbOoVP?editors=0100


/*

TO-DO ==========

  - Interact.js does NOT like it when the window itself is resized. Or more specificially, when the containers container changes size.
  ----
    If the parent container changes size, the resized container should react to that.
    For example, if the parent container gets smaller and touches an edge of my iframe, the iframe should continue to stay within its parent instead of spilling out.
    Also, if the parent container becomes smaller than the resize container, the resize container should change its size to match (width:100%/height:100%)
    Might need to submit an issue for this on the interact.js repo

  - Should I reset the resize container (100%/100%) if the leftNav or mobile view are hidden?

  - Double click a handler to restore the full width and height of the resize container.

  - When a handler is clicked, add a class to indicate which one is being interacted with. Should make styling easier.

  - Also, if the resize window ever goes back to being the full width and height of its container,
  (e.g., I use the handlers myself to make the window full width and height) remove all of the inlined resizing CSS to "reset" the resize process.

  - Hold Command to reveal a dragging container that is laid over the entite iframe. Then while holding command, allow click and dragging.

COMPLETE ==========

  - [DONE]: Double-clicking a resize handler resets the resized container. (Add a button or keyboard shortcut to reset the resized container.)
  - [DONE]: Added a function that I can call to reset the container size. It also removes any relevant classes. (Remove any classes that I've added that indicate that a resize is happening once the container is full size again.)
  - [DONE]: Turning off pointer-events on iframes while dragging a resize handler fix this issue. (Something about letting go of a drag handler while hovering over the mobile iframe causes the resize process to not stop. Consider disabling pointer events on the mobile view while a resize is in process.)

*/

function resetDesktopResize() {
  if (resizeActive) {
    console.log("resetDesktopResize initiated");
    dFrameStartingWidth = desktopIframe.offsetWidth;
    document.documentElement.classList.remove("desktop-view-resized");
    desktopIframeResizeWrapper.removeAttribute("style");
    desktopIframeResizeWrapper.removeAttribute("data-x");
    desktopIframeResizeWrapper.removeAttribute("data-y");
    showdFrameWidthStatus(desktopIframe.offsetWidth, true, "resetDesktopResize");
    desktopIframeWrapper.classList.add("full-sized");
    resizeActive = false;
  }
};



interact('.resize-handler')
  .on('doubletap', function (event) {
    // event.currentTarget.classList.toggle('switch-bg');
    resetDesktopResize();
    event.preventDefault();
  });

interact('.resize-container')
  .on('doubletap', function (event) {
    // event.currentTarget.classList.toggle('switch-bg');
    resetDesktopResize();
    event.preventDefault();
  });


interact('.resize-drag')
  // .draggable({
  //   // enable inertial throwing
  //   inertia: true,
  //   // keep the element within the area of it's parent
  //   restrict: {
  //     restriction: "parent",
  //     endOnly: false,
  //     elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
  //   },
  //   // enable autoScroll
  //   autoScroll: true,
  //
  //   // call this function on every dragmove event
  //   onmove: dragMoveListener,
  //   // call this function on every dragend event
  //   onend: function (event) {
  //     var textEl = event.target.querySelector('p');
  //
  //     textEl && (textEl.textContent =
  //       'moved a distance of '
  //       + (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
  //                    Math.pow(event.pageY - event.y0, 2) | 0))
  //           .toFixed(2) + 'px');
  //   }
  // })
  .resizable({
    // resize from all edges and corners
    edges: { left: '.resize-point-left', right: '.resize-point-right', bottom: '.resize-point-bottom', top: '.resize-point-top' },

    // keep the edges inside the parent
    restrictEdges: {
      outer: 'parent',
      endOnly: false,
    },

    // minimum size
    restrictSize: {
      min: { width: 100, height: 100 },
    },

    inertia: true,
  })
  .on('resizemove', function (event) {
    showdFrameWidthStatus(desktopIframe.offsetWidth, false, "resizemove");
    var target = event.target,
        x = (parseFloat(target.getAttribute('data-x')) || 0),
        y = (parseFloat(target.getAttribute('data-y')) || 0);

    // update the element's style
    target.style.width  = event.rect.width + 'px';
    target.style.height = event.rect.height + 'px';

    // translate when resizing from top or left edges
    x += event.deltaRect.left;
    y += event.deltaRect.top;

    target.style.webkitTransform = target.style.transform =
        'translate(' + x + 'px,' + y + 'px)';

    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);

    if ( ( event.target.offsetWidth !== desktopIframeWrapper.offsetWidth ) || ( event.target.offsetHeight !== desktopIframeWrapper.offsetHeight ) ) {
      // showdFrameWidthStatus();
      document.documentElement.classList.add("desktop-view-resized");
      document.documentElement.classList.add("resizing", "resizing-" + event.interaction.downEvent.target.dataset.resize);
      desktopIframeWrapper.classList.remove("full-sized");
      resizeActive = true;
    }

  })
  .on('resizestart', function (event) {
    showdFrameWidthStatus(desktopIframe.offsetWidth, false, "resizestart");
  })
  .on('resizeend', function (event) {
    document.documentElement.classList.remove("resizing", "resizing-" + event.interaction.downEvent.target.dataset.resize);
    resizeEndWidth = desktopIframe.offsetWidth;
    if ( ( event.target.offsetWidth === desktopIframeWrapper.offsetWidth ) && ( event.target.offsetHeight === desktopIframeWrapper.offsetHeight ) ) {
      resetDesktopResize();
    }
  });

var j = 0;


// When I click and hold on a drag handler...
// interact('.resize-drag').on('hold', showdFrameWidthStatus(desktopIframe.offsetWidth, false, "hold") );

function dragMoveListener (event) {
  var target = event.target,
      // keep the dragged position in the data-x/data-y attributes
      x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
      y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

  // translate the element
  target.style.webkitTransform =
  target.style.transform =
    'translate(' + x + 'px, ' + y + 'px)';

  // update the posiion attributes
  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);
}

// this is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener;



///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//////////////////////////// ==    OPEN IN APP   == ///////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

// Check the options for a selected app. If one is selected, create a button.
// If not, do nothing.

// Relies on an asynchronous call to the background to get options.
// @TODO: This should be updated in the future to NOT run if the async call is not finished.

// if ( exOptions.openInApp ) {

  // Create the button and insert it.
  var openInApp = document.createElement("a");
  openInApp.classList.add("main-pane-extra-btn", "open-in-app-btn");
  // openInApp.dataset.stage = "open-in-app";
  openInApp.innerHTML = "Open in App";
  stagePreviewBtns.insertAdjacentElement('afterend',openInApp);



  // file://<file_path>[&line=<line>[&column=<column>]][&devMode][&safeMode][&newWindow]";
  // See: https://atom.io/packages/open

  // subl://open?url=file://{{file}}&line={{line}}&column={{column}}
  // See: https://github.com/inopinatus/sublime_url

// }




///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//////////////////////////// == xxxxxxxxxxxxxxxx == ///////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

// Used to determine if the desktopIframe width has changed from its original width.

// The desktopIframe at full width. Gets re-assigned whenever the frame is resized/restored to its largest possible width (within its parent container)
var dFrameStartingWidth = desktopIframe.offsetWidth;

// Initially the same as the starting width above. This is reset whenever a drag-resize event ends.
// Allows us to compare that new width with future resizes.
var resizeEndWidth = dFrameStartingWidth;

// Watch desktopIframe for size changes.
// Helps to control the display of the desktopiframe's width in a little overlayed badge
ro.observe(desktopIframe);

// Watch the contents of the desktopIframe for size changes.
// Modifies placement of link markers.
lm.observe(dFrameContents.body);



///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//////////////////////////// == xxxxxxxxxxxxxxxx == ///////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////


// Manifest Version
var manifestVersion = document.createElement("a");
manifestVersion.href = "https://github.com/jkupczak/korra-email-design-toolkit";
manifestVersion.target = "_blank";
manifestVersion.classList.add("manifest-version");
manifestVersion.innerHTML = chrome.runtime.getManifest().version;
document.body.appendChild(manifestVersion);



///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//////////////////////////// == xxxxxxxxxxxxxxxx == ///////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////


// window.addEventListener('scroll', function (event) {
// 	console.log(this);
// 	console.log(event);
// 	console.log(event.target);
// }, true);


// document.addEventListener("wheel", function (e) {
//
// 	console.log(e);
// 	console.log(e.target);
// 	console.log(e.deltaY);
// 	console.log(e.wheelDeltaY);
//
//     // // get the old value of the translation (there has to be an easier way than this)
//     // var oldVal = parseInt(document.getElementById("body").style.transform.replace("translateY(","").replace("px)",""));
//     //
//     // // to make it work on IE or Chrome
//     // var variation = parseInt(e.deltaY);
//     //
//     // // update the body translation to simulate a scroll
//     // document.getElementById("body").style.transform = "translateY(" + (oldVal - variation) + "px)";
//     //
//     // return false;
//
// }, true);


///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//////////////////////////// == xxxxxxxxxxxxxxxx == ///////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

///////
document.querySelector("html").classList.toggle("errors");



// }
} else {
  document.documentElement.classList.add("plain-view");
}
