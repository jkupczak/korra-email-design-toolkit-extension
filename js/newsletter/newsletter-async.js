// console.error( "newsletter-async.js - " + document.documentElement.clientWidth );

console.warn("[sonic-toolkit-extension] loaded /js/newsletter-async.js");

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
