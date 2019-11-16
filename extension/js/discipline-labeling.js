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
  // console.log("Page loaded is dropbox.com");
} else if ( /mailchimp(.+)?\.com/gi.test(pageUrl) && !/campaigns\/preview\-content\-html/gi.test(pageUrl) ) {
	var onMailchimp = true;
  // console.log("Page loaded is mailchimp.com");
} else if ( /localhost/gi.test(pageUrl) ) {
	var onMiddleman = true;
  // console.log("Page loaded is localhost using Middleman");
} else if ( /campaign-archive2/gi.test(pageUrl) ) {
	// console.log("Page is loaded as a web view on campaign-archive2.com")
} else {
	// console.log("Page is loaded locally");
}

//
// Discipline Identifier
//
if ( /(^(chrome\-extension|file)|localhost\:)/i.test(pageUrl) ) {
	var disciplineSearch = email.filename;
} else if ( !onMailchimp ) {

} else {
	var availableNode = document.querySelector(".wizard-header") || document.querySelector("h1") || document.querySelector(".c-checklistEditor div.header > h2:first-child");
	var disciplineSearch = availableNode.innerText || "";
	// console.log("disciplineSearch = " + disciplineSearch)
}

if ( disciplineSearch ) {
	var disciplineId = getEmailAudience(disciplineSearch) || "";
}

// console.log(disciplineId);

////
//// MODIFY PAGE TITLE
////
//// Make the filename the page title for easier identification at a glance. Include the normal page title in () afterwards.
////

var currTitle = document.title;
var newTitle = "";
var finalTitle = "";

// Middleman Emoji
if ( onMiddleman ) {
	// finalTitle = finalTitle + "⚡️ ";
}

// Get AB Test data
var abTestId = "";
if ( getABstatus(disciplineSearch) === "a" ) {
	var abTestId = "(A) "
} else if ( getABstatus(disciplineSearch) === "b" ) {
	var abTestId = "(B) "
}



var setPageTitle = function(filename) {

	document.title = filename + " (" + document.title + ")";

};


////
//// FAVICON
////
//// Change the default page favicon to something that more easily identifies the category of the email.
////
var favicon = email.audience;
var animatedFavicon

//Sub check
if ( getSubStatus(disciplineSearch) ) { favicon = favicon + "-sub"; }

//Dropbox check
if ( onDropbox ) {	favicon = favicon + "-dropbox"; }

//Middleman check
if ( onMiddleman ) { animatedFavicon = true; }

// Final favicon filename check
if ( favicon === "" || /^\-/.test(favicon) ) {
	favicon = "unknown"
}


var faviconWrapper = document.getElementsByTagName('head')[0]
var faviconLink = document.querySelector("link[rel*='icon']") || document.createElement('link');
faviconLink.type = 'image/x-icon';
faviconLink.rel = 'shortcut icon';
faviconLink.href = chrome.extension.getURL("favicons/" + favicon + ".png");

// For some reason, this tag affects the loading/use of fonts (specifically Roboto), SOMETIMES. Adding it to the DOM and then moving it a second time fixes this. I do not know why.
faviconWrapper.insertBefore(faviconLink, faviconWrapper.firstChild); // Add it to the <head> tag.
faviconWrapper.appendChild(faviconLink); // Move it around inside the <head> to fix font issues with the page.

if ( animatedFavicon ) {
	setInterval(function() {

		if ( /\-inverse/.test(faviconLink.href) ) {
			faviconLink.href = chrome.extension.getURL("favicons/" + favicon + ".png");
		} else {
			faviconLink.href = chrome.extension.getURL("favicons/" + favicon + "-inverse" + ".png");
		}
	}, 500);
}
