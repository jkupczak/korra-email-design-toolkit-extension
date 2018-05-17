// console.warn(" 💎💎💎 [korra-email-design-tooklit] loaded /js/email-labeling.js");
///////////////////////////////////////////////////////////////////////

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
// Get Filename
//
// var fileName = getFilename(pageUrl);
// console.log(fileName);


//
// Discipline Identifier
//
if ( /(^file|localhost\:)/i.test(pageUrl) ) {
	var fileName = getFilename(pageUrl);
	var disciplineSearch = fileName;
} else if ( !onMailchimp ) {

} else {
	var availableNode = document.querySelector(".wizard-header") || document.querySelector("h1") || document.querySelector(".c-checklistEditor div.header > h2:first-child");
	var disciplineSearch = availableNode.innerText;
	// console.log("disciplineSearch = " + disciplineSearch)
}
var disciplineId = getDisciplineId(disciplineSearch) || "";
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
var abTestId = ""
if ( getABstatus(disciplineSearch) === "a" ) {
	var abTestId = "(A) "
} else if ( getABstatus(disciplineSearch) === "b" ) {
	var abTestId = "(B) "
};

if ( !onMailchimp ) {

	// getEmailTitle(fileName);

	// Check for legacy labels, like Enterprise instead ENT.
	if ( disciplineId === "ent" && /\-Enterprise\-/gi.test(fileName) ) {
		disciplineId = "Enterprise";
	}


	var re = new RegExp("^.+?-" + disciplineId + "","gi");
	// console.log(fileName);
	// console.log(re);

	newTitle = fileName.replace(re, ""); // Remove date, discipline, A/B test, sub/ns, and extension
	// console.log(newTitle);

	newTitle = newTitle.replace(/\.html?|-(ns|sub)|-(a|b)\./gi, ""); // Remove date, discipline, A/B test, sub/ns, and extension
	// console.log(newTitle);

	newTitle = newTitle.replace(/\?.+/gi, ""); // Remove querystring
	// console.log(newTitle);

	newTitle = newTitle.replace(/\-/gi, " ");	 // Remove extra hyphens
	// console.log(newTitle);

	var newFileName = fileName.replace(/\?.+/gi, "");

	finalTitle = finalTitle + abTestId + newTitle + " <" + newFileName + "> (" + currTitle + ")";
	document.title = finalTitle;

} else {

	var re = new RegExp("([0-9][0-9]-|-" + disciplineId + "(-|$)|-sub$|-ns$|-Physical-?$|-Atheletic-?$)","gi");
	newTitle = disciplineSearch.replace(re, "");
	newTitle = newTitle.replace(/-/gi, " ");

	finalTitle = finalTitle + abTestId + newTitle + " " + "(" + currTitle + ")";
	document.title = finalTitle;

}





////
//// FAVICON
////
//// Change the default page favicon to something that more easily identifies the category of the email.
////


var favicon = disciplineId;
var animatedFavicon

//Sub check
if ( getSubStatus(disciplineSearch) ) { favicon = favicon + "-sub"; }

//A/B Test check
// if ( getABstatus(disciplineSearch) ) { favicon = favicon + "-" + getABstatus(disciplineSearch); }

// Fox Check
// if ( /\-Fox\-/gi.test(document.URL) ) {	if ( favicon === "" ) { favicon += "fox"; } else { favicon += "-fox"; } };

//Dropbox check
if ( onDropbox ) {	favicon = favicon + "-dropbox"; }

//Middleman check
if ( onMiddleman ) { animatedFavicon = true; }

// Final favicon filename check
if ( favicon === "" || /^\-/.test(favicon) ) {
	favicon = "unknown"
}

//Mailchimp check
if ( !onMailchimp ) {

	var faviconWrapper = document.getElementsByTagName('head')[0]
	var faviconLink = document.querySelector("link[rel*='icon']") || document.createElement('link');
	faviconLink.type = 'image/x-icon';
	faviconLink.rel = 'shortcut icon';
	faviconLink.href = chrome.extension.getURL("favicons/" + favicon + ".png");

	// For some reason, this tag affects the loading/use of fonts (specifically Roboto), SOMETIMES. Adding it to the DOM and then moving it a second time fixes this. I do not know why.
	faviconWrapper.insertBefore(faviconLink, faviconWrapper.firstChild); // Add it to the <head> tag.
	faviconWrapper.appendChild(faviconLink); // Move it around inside the <head> to fix font issues with the page.

	// console.log("Favicon = " + favicon);

	if ( animatedFavicon ) {
		setInterval(function() {

			if ( /\-inverse/.test(faviconLink.href) ) {
				faviconLink.href = chrome.extension.getURL("favicons/" + favicon + ".png");
			} else {
				faviconLink.href = chrome.extension.getURL("favicons/" + favicon + "-inverse" + ".png");
			}
		}, 500);
	}

}
