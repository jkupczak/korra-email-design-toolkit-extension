console.log("emailLabeling_injected_contentScript.js loaded");

//
// Remove default favicon
//
var oldIcon = document.querySelector("[rel*='shortcut']");
if ( oldIcon ) { oldIcon.remove(); }

//
// Page determination
//
var pageUrl = document.URL;

if ( /dropbox(.+)?\.com\/(s|home|content_link)/gi.test(pageUrl) ) {
	var onDropbox = true;
  console.log("Page loaded is dropbox.com");
} else if ( /mailchimp(.+)?\.com/gi.test(pageUrl) ) {
	var onMailchimp = true;
  console.log("Page loaded is mailchimp.com");
}

//
// Get Filename
//
var fileName = pageUrl.replace(/^.+\//gi, "");

//
// Discipline Identifier
//
if ( !onMailchimp ) {
	var disciplineSearch = pageUrl.replace(/^.+\//gi, "");
} else {
	var availableNode = document.querySelector(".wizard-header") || document.querySelector("h1");
	var disciplineSearch = availableNode.innerText;
	console.log("disciplineSearch = " + disciplineSearch)
}
var disciplineId = getDisciplineId(disciplineSearch);


////
//// MODIFY PAGE TITLE
////
//// Make the filename the page title for easier identification at a glance. Include the normal page title in () afterwards.
////

var currTitle = document.title;

// Get AB Test data
var abTestId = ""
if ( getABstatus(disciplineSearch) === "a" ) {
	var abTestId = "(A) "
} else if ( getABstatus(disciplineSearch) === "b" ) {
	var abTestId = "(B) "
};


if ( !onMailchimp ) {
	console.log("! " + disciplineId);
	console.log("! " + fileName);
	var re = new RegExp("(^.+" + disciplineId + "-|-(ns|s|sub)-?(a|b)?\.html?)","gi");
	var newTitle = fileName.replace(re, "");
	console.log("! " + newTitle);
	var newTitle = newTitle.replace(/-/gi, " ");
	console.log("! " + newTitle);
	document.title = abTestId + newTitle + " <" + fileName + "> (" + currTitle + ")";

}
else {

	var re = new RegExp("([0-9][0-9]-|-" + disciplineId + "(-|$)|-sub$|-ns$|-Physical-?$|-Atheletic-?$)","gi");
	var newTitle = disciplineSearch.replace(re, "");
	var newTitle = newTitle.replace(/-/gi, " ");
	document.title = abTestId + newTitle + " " + "(" + currTitle + ")";
}





////
//// FAVICON
////
//// Change the default page favicon to something that more easily identifies the category of the email.
////

var favicon = disciplineId;

//Sub check
if ( getSubStatus(disciplineSearch) ) { favicon = favicon + "-sub"; }
//A/B Test check
// if ( getABstatus(disciplineSearch) ) { favicon = favicon + "-" + getABstatus(disciplineSearch); }
//Dropbox check
if ( onDropbox ) {	favicon = favicon + "-dropbox"; }
//Mailchimp check
if ( !onMailchimp ) {

	var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
	link.type = 'image/x-icon';
	link.rel = 'shortcut icon';
	link.href = chrome.extension.getURL("favicons/" + favicon + ".png");
	document.getElementsByTagName('head')[0].appendChild(link);

	console.log("Favicon = " + favicon);

}
