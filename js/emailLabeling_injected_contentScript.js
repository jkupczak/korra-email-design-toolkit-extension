console.log("emailLabeling_injected_contentScript.js loaded");

//
// Page determination
//
var pageUrl = document.URL;

if ( /dropbox(.+)?\.com\/(s|home|content_link)/gi.test(pageUrl) ) {
	var onDropbox = true;
  console.log("Page loaded is dropbox.com");
}

if ( /mailchimp(.+)?\.com/gi.test(pageUrl) ) {
	var onMailchimp = true;
  console.log("Page loaded is mailchimp.com");
}


//
// Discipline Identifier
//
if ( !onMailchimp ) {
	var disciplineSearch = pageUrl.replace(/^.+\//gi, "");
} else {
	var availableNode = document.querySelector(".wizard-header") || document.querySelector("h1");
	var disciplineSearch = availableNode.innerText;
}
var disciplineId = getDisciplineId(disciplineSearch);




////
//// MODIFY PAGE TITLE
////
//// Make the filename the page title for easier identification at a glance. Include the normal page title in () afterwards.
////

if ( !onMailchimp ) {
	var currTitle = document.title;
	document.title = disciplineId + " " + "(" + currTitle + ")";
}




////
//// FAVICON
////
//// Change the default page favicon to something that more easily identifies the category of the email.
////

var favicon = disciplineId;

//Sub check
if ( getSubStatus(disciplineSearch) ) { favicon = favicon + "-sub"; }
//Dropbox check
if ( onDropbox ) {	favicon = favicon + "-dropbox"; }
//Mailchimp check
// if ( onMailchimp ) { favicon = favicon + "-mailchimp"; }

var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
link.type = 'image/x-icon';
link.rel = 'shortcut icon';
link.href = chrome.extension.getURL("favicons/" + favicon + ".png");
document.getElementsByTagName('head')[0].appendChild(link);

console.log("Favicon = " + favicon);
