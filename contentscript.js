console.log("contentScript.js loaded");


//
// Page determination
//
var pageUrl = document.URL;

if ( /dropbox\.com\/(s|home)/.test(pageUrl) ) {
	var onDropbox = true;
}
if ( /dropbox\.com\/s/.test(pageUrl) ) {
	var onDropboxShare = true;
}

//
// Modify page title.
//
var fileName = pageUrl.replace(/^.+\//gi, "");

var currTitle = document.title;

document.title = fileName + " " + "(" + currTitle + ")";




//
// FAVICON
//
var favicon = "undefined";
if ( /-PT-/.test(fileName) ) { var favicon = "pt"; }
if ( /-AT-/.test(fileName) ) { var favicon = "at"; }
if ( /-OT-/.test(fileName) ) { var favicon = "ot"; }
if ( /-SLP-/.test(fileName) ) { var favicon = "slp"; }
if ( /-Other-/.test(fileName) ) { var favicon = "other"; }
if ( /-LMT-/.test(fileName) ) { var favicon = "lmt"; }
if ( /-MT-/.test(fileName) ) { var favicon = "lmt"; }
if ( /-Enterprise-/.test(fileName) ) { var favicon = "enterprise"; }

if ( onDropbox ) {
	favicon = favicon + "-dropbox"
}

if ( onDropboxShare ) {

	var containingFolder = document.querySelector("h1").innerText;

	var hiddenDpPath = document.querySelector("nav span a.breadcrumb-segment").getAttribute("href");
	hiddenDpPath = hiddenDpPath.replace(/https?:\/\/(www\.)?dropbox\.com\/home/gi, "") + "/" + containingFolder + "/";
	console.log(hiddenDpPath);

	chrome.runtime.sendMessage({greeting: hiddenDpPath}, function(response) {
	  console.log(response.farewell);
	});
}

var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
link.type = 'image/x-icon';
link.rel = 'shortcut icon';
link.href = chrome.extension.getURL("favicons/" + favicon + ".png");
document.getElementsByTagName('head')[0].appendChild(link);