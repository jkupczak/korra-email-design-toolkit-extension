console.warn(">>> newsletter-async.js loaded");

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

chrome.storage.sync.get("dpToken", function(items) {
  if (!chrome.runtime.error) {
    // console.log(items);
    dbx = new Dropbox({ accessToken: items.dpToken });
    console.info("Dropbox access token retrieved.")
  } else {
    console.error("Could not retrieve Dropbox access token from chrome.storage.sync.")
  }
});
