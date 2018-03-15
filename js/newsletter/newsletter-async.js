console.warn("[sonic-toolkit-extension] loaded /js/newsletter-async.js");
/////////////////////////////////////////////////////////////////////////

  // This requests the original files HTML using the extensions access to the filesystem.
  // By default this request is asynchronous.
  // If we want to make it synchronous, just change true to false in the xhr.open statement.
  // It remains to be seen if async will cause me any issues with page rendering. But nothing so far!

  // Resources:
  // https://stackoverflow.com/q/11452758/556079
  // https://stackoverflow.com/a/14092195/556079
  // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/send


  var xhr = new XMLHttpRequest();
  xhr.open("GET", document.URL, true);
  xhr.onload = function(e) {
    cleanedOriginalHtml = xhr.response;
    cleanedDesktopHtml = cleanedOriginalHtml;
    cleanedMobileHtml = cleanedOriginalHtml;

    ////!!!!!!!!!!!!!!!!!!!
    ////!!!!!!!!!!!!!!!!!!! Figure out how to make the iframe loading wait for us to get the HTML back
    ////!!!!!!!!!!!!!!!!!!!
    ////!!!!!!!!!!!!!!!!!!!

  // To prevent flashes of unstyled text, we are adding some links to css files BEFORE we render the iframes.
  // To do this we have to just append a string to the code we got above from the xhr.
  // [TO-DO]: Consider removing this and just adding it after the iframe renders if there's no downside.

    // // Remove all <script> tags. HTML emails cannot have them. We don't design them in there, but if you're viewing this page with Middleman then there will be some injected <script> tags that can cause us issues. These <script> tags allow Middleman to reload the page when changes to the file are made. We don't need them in our dFrame or mFrameContents potentially mucking things up.
    // // Also removes <object> tags. Which is also injected by Middleman (and MM sometimes tries to remove it itself and fails)
    // // cleanedOriginalHtml = cleanedOriginalHtml.replace(/<(object|script)\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/(object|script)>/gi, "");
    //
    cleanedOriginalHtml = cleanedOriginalHtml.replace(/<(object|script)\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/(object|script)>/gi, "");
    cleanedDesktopHtml  = cleanedDesktopHtml.replace(/<(object|script)\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/(object|script)>/gi, "");
    cleanedMobileHtml   = cleanedMobileHtml.replace(/<(object|script)\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/(object|script)>/gi, "");

    // Add allFrames.css to both views
    var allFramesCssString = '<link href="' + chrome.extension.getURL('css/newsletter/newsletter-allFrames.css') + '" id="debug-unique-style-block" class="debug" rel="stylesheet" type="text/css">'
    cleanedDesktopHtml += allFramesCssString;
    cleanedMobileHtml += allFramesCssString;

    // Add allFrames.js to both views
    var allFramesScript = '<script src="' + chrome.extension.getURL('js/newsletter/allFrames.js') + '"></script>';
    cleanedDesktopHtml += allFramesScript;
    cleanedMobileHtml += allFramesScript;

    //////////////
    //
    //   DESKTOP
    //
    //////////////

    // Add dFrame.js
    var dFrameFrameScript = '<script src="' + chrome.extension.getURL('js/newsletter/dFrame.js') + '"></script>';
    cleanedDesktopHtml += dFrameFrameScript;

    // Add dFrame.css to the desktop view
    var dFrameCssString = '<link href="' + chrome.extension.getURL('css/newsletter/newsletter-dFrame.css') + '" id="debug-unique-style-block" class="debug" rel="stylesheet" type="text/css">'
    cleanedDesktopHtml += dFrameCssString;

    //////////////
    //
    //   MOBILE
    //
    //////////////

    // Add mFrame.js
    var mFrameScript = '<script src="' + chrome.extension.getURL('js/newsletter/mFrame.js') + '"></script>';
    cleanedDesktopHtml += mFrameScript;

    // Add mFrame.css to the mobile view
    var mFrameCssString = '<link href="' + chrome.extension.getURL('css/newsletter/newsletter-mFrame.css') + '" id="debug-unique-style-block" class="debug" rel="stylesheet" type="text/css">'
    cleanedMobileHtml += mFrameCssString;


  };
  xhr.onerror = function () {
    console.error("** An error occurred during the transaction");
  };
  xhr.send();





//
//
//
//  Experimental design
//  If I need a value from chrome.storage, why not look for it as soon as the page starts loading instead of waiting for it to finish loading?
//  This script runs in the manifest at document_start
//  It loads approximately 300ms faster.
//
//


// Get dropbox access token from chrome.storage.

var dbx;

chrome.storage.sync.get("dpToken", function(items) {
  if (!chrome.runtime.error && items.dpToken) {
    // console.log(items);
    dbx = new Dropbox({ accessToken: items.dpToken });
    // console.groupCollapsed("Dropbox access token retrieved.");
    // console.log(items.dpToken);
    // console.groupEnd();
  } else {
    console.error("Could not retrieve Dropbox access token from chrome.storage.sync. items.dpToken is " + items.dpToken, " - Visit https://dropbox.github.io/dropbox-api-v2-explorer/#auth_token/from_oauth1 to get an access token.");
  }
});

var mailgunApiKey;
// mailgun api key
chrome.storage.sync.get("mailgunKey", function(items) {
  if (!chrome.runtime.error && items.mailgunKey) {
    mailgunApiKey = items.mailgunKey;
  } else {
    console.error("Could not retrieve Mailgun API Key from chrome.storage.sync.");
  }
});
