console.log("dropox_injected_contentScript.js loaded");


//
// Page determination
//
var pageUrl = document.URL;

if ( /dropbox(.+)?\.com\/(s|home|content_link)/gi.test(pageUrl) ) {
	var onDropbox = true;
  console.log("Page loaded is dropbox.com");
}





////
//// QUICK PAGE SWAP (Dropbox > Local)
//// dropbox.com/s/ doesn't reveal the full local path in the URL. However, it does include it within the page HTML. In order for eventPage.js to use this data, this script needs to send it using sendMessage because eventPage.js can't access the DOM itself.
////
if ( /dropbox\.com\/s/.test(pageUrl) ) {

	var containingFolder = document.querySelector("h1").innerText;

	var hiddenDpPath = document.querySelector("nav span:nth-last-child(2) a.breadcrumb-segment").getAttribute("href");
	hiddenDpPath = hiddenDpPath.replace(/https?:\/\/(www\.)?dropbox\.com\/home/gi, "") + "/" + containingFolder + "/";
	console.log(hiddenDpPath);

	chrome.runtime.sendMessage({greeting: hiddenDpPath}, function(response) {
	  console.log(response.farewell);
	});
}
