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

  // To prevent flashes of unstyled text, we are adding some links to css files BEFORE we render the iframes.
  // To do this we have to just append a string to the code we got above from the xhr.
  // [TO-DO]: Consider removing this and just adding it after the iframe renders if there's no downside.

    // Add dFrame.css to the desktop view
    var dFrameCssString = '<link href="' + chrome.extension.getURL('css/newsletter/newsletter-dFrame.css') + '" id="debug-unique-style-block" class="debug" rel="stylesheet" type="text/css">'
    cleanedDesktopHtml += dFrameCssString;

    // Add dFrame.css to the mobile view
    var mFrameCssString = '<link href="' + chrome.extension.getURL('css/newsletter/newsletter-mFrame.css') + '" id="debug-unique-style-block" class="debug" rel="stylesheet" type="text/css">'
    cleanedMobileHtml += mFrameCssString;

    // Add allFrames.css to both views
    var allFramesCssString = '<link href="' + chrome.extension.getURL('css/newsletter/newsletter-allFrames.css') + '" id="debug-unique-style-block" class="debug" rel="stylesheet" type="text/css">'
    cleanedDesktopHtml += allFramesCssString;
    cleanedMobileHtml += allFramesCssString;

  }
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
    console.groupCollapsed("Dropbox access token retrieved.");
    console.log(items.dpToken);
    console.groupEnd();
  } else {
    console.error("Could not retrieve Dropbox access token from chrome.storage.sync. items.dpToken is " + items.dpToken);
    console.info("Visit https://dropbox.github.io/dropbox-api-v2-explorer/#auth_token/from_oauth1 to get an access token.");
  }
});
