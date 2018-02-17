console.warn("[sonic-toolkit-extension] loaded /js/newsletter/newsletter.js");
//////////////////////////////////////////////////////////////////////////////

//
// MAILCHIMP!!!!
// Check subject line against the preheader. Look for repeated sentences/phrases.
// CHECK FOR MAILCHIMP CODES FOR FORWARD AND UNSUB!!!
// ALERT IF ITS MC OR GR CODES
//
//

/////
/////
// KNOWN-ERROR!!
// tables that are 100% width should not be aligned left, always align center.
// theres a bug in outlook that causes the next <table> element to be hidden if the previous one was 100% width and left aligned. This happens even if the two tables are not direct siblings. For example, if they are separated by a </td><td> this bug will still happen.
// CLIENTS: Outlook 2003, 2002, 2000.
/////
/////

////////////////////////////////
////////////////////////////////
////////////////////////////////

// ALERT
//  - THIS EMAIL IS X DAYS OLD!
//  - LINKS WERE NOT CHECKED AT ALL
//  - TEXT WAS NOT CHECKED AT ALL

////////////////////////////////
////////////////////////////////
////////////////////////////////
////////////////////////////////
////////////////////////////////
////////////////////////////////

// This: https://www.medbridgeeducation.com/h/pivot-physical-therapy-case-study/#request-a-demo
// Versus THis: https://www.medbridgeeducation.com/h/pivot-physical-therapy-case-study#request-a-demo
// Doesn't work without the / before the #. Make a link validator based on this nonsense.
// EXCEPT NOW IT DOES??? 07/11/17

///--------

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// MAILCHIMP MAILCHIMP MAILCHIMP MAILCHIMP
// MAILCHIMP MAILCHIMP MAILCHIMP MAILCHIMP
// MAILCHIMP MAILCHIMP MAILCHIMP MAILCHIMP
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//
// Extract the blog check functions so that they can be used on mailchimp.com.
// Disallow saving, exiting, and navigating away until I acknowledge that the article is not unprotected yet.
// Make this acknowledgement independant of MailChimp's DOM so that if the site changes, my script doesn't break.
// Use Tingle to show a popup with a confirmation button.
// Save to chrome.storage (so that it persists across tabs) the article status.
// When I try to schedule or send the email, check chrome.storage and stop me until the article has been unprotected.
// And for that matter, make sure we're using chrome.storage instead of sessionstorage in newsletter.js.
// Deal with cleaning up storage by keeping the data in there until an associated mailchimp campaign ID is loaded, and then scheduled or sent.
//
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// MAILCHIMP MAILCHIMP MAILCHIMP MAILCHIMP
// MAILCHIMP MAILCHIMP MAILCHIMP MAILCHIMP
// MAILCHIMP MAILCHIMP MAILCHIMP MAILCHIMP
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

///--------

// MULTI emails, do not say $200, $300, $250, $95, or $145 or any $ price at all because SLP is different now. Throw an error.

///--------

// Detect if a link is hidden/offscreen and create a module or alert to say that/how many.

///--------

// Edit view
// When editing text, duplicate the desktop frame so that you can see a before and after.
// hide the left and right columns to make room.

///--------

// A/B Testing View
// Show versions A and B side-by-side with a click of a button.
// Sync scrolling and dedicate 50% of the window to each version.
// Drag to resize both iframes for mobile view.

///--------

// Command/Ctrl Click a link to reveal link info?
//   - Full URL
//   - List of attached UTMs
//   - Times this link occurs in the document (And which time it is, is it the 1st occurence of this link?)
//       - Ignore utms
//   - Order of this link (is it the 1st link? the 5th?)
//   Denote if it's a tracking URL or not, if its a blog link, if its a MedBridge or 3rd party link

///--------

// When desktop frame gets to mobile size (<480), hide vertical scrollbar.
// Listen for scrolling with mousewheel, arrow keys, and ctrl/cmd+arrow keys when an iframe isn't in focus and apply the scrolling to the iframes!

///--------

// Apply checkmarks next to each link that passes validation. Toggle-able so that it doesn't appear by default?

///--------

// Count citations like <sup>1</sup> in the HTML, verify that they appear in the right order. Throw an error if 2 comes before 1, etc.

///--------

// Measure all images against their natural non-resized dimensions.

//// - Throw an error if they are more than slightly off (images being squished out of proportion)
//// - Show a warning if we're using an image at exactly the natural dims, because its best practice to delivery hi-res images

///--------

// Switch to a =1001 setup for determining visible layout. Handle it all at once as early as possible to have a smooth page load
// See how codepen does it: https://codepen.io/pen/?editors=0010

////////////////////////////////
////////////////////////////////
////////////////////////////////
////////////////////////////////
////////////////////////////////



// console.error( "newsletter.js - " + document.documentElement.clientWidth );


///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////                         ///////////////////////////
///////////////////////////      NEWSLETTER.JS      ///////////////////////////
///////////////////////////                         ///////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//
//     _______  ______    _______  _______  ___      ___   _______  __   __  _______
//    |       ||    _ |  |       ||       ||   |    |   | |       ||  | |  ||       |
//    |    _  ||   | ||  |    ___||    ___||   |    |   | |    ___||  |_|  ||_     _|
//    |   |_| ||   |_||_ |   |___ |   |___ |   |    |   | |   | __ |       |  |   |
//    |    ___||    __  ||    ___||    ___||   |___ |   | |   ||  ||       |  |   |
//    |   |    |   |  | ||   |___ |   |    |       ||   | |   |_| ||   _   |  |   |
//    |___|    |___|  |_||_______||___|    |_______||___| |_______||__| |__|  |___|
//
//    ASCII: Modular - http://patorjk.com/software/taag/#p=display&h=0&v=0&f=Modular&t=VALIDATE
//
// Pre-Flight Checklist
//  - Links
//  - Keyword Check
//  - Preheader
//  - Zoom Level
//  - Mobile View
//  - Spell Check
//  - Pending Edits - "You have pending edits!"
//
// Notes
//  - Some links are using additional utm_'s that are not utm_content. If this is intential make sure you turn off GA in MC.
//  - Detected the use of "NPS". Remember to add a footnote disclaimer.
//
//
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//
//
//  TO-DO LIST ✓ ■
//  ==============
//
//  ## Spell Check ---
//    ■ - Google has forsaken me! Try replacing Chrome spell check with http://www.javascriptspellcheck.com/JavaScript_SpellCheck_Hello_World
//
//  ## Mobile View ---
//    ■ - Add multiple width options for the mFrameContents. 320, 360, 480, iPhone (375, 414) and popular Android specific (all versions, from dropdown menu)
//    ✓ - Remove "Portrait" and "Landscape", replace with just the width names (and/or device names)
//      - http://viewportsizes.com/?filter=iphone
//    ■ - 320px | 360px | 480px | More
//
//  ## Scratch Pad ---
//    ■ - Notepad that pops up and can be used to keep notes. Saves to chrome.storage.local when you idle.
//    ■ - Pops back up automatically on refresh if you have something saved.
//
//  ## Link Markers ---
//    ■ - Create a 'warning' class in addition to the 'error' class for link-markers. If an email is very old, mark link errors as warnings.
//    ■ - Unlike errors, warnings should be hidden until you hover over the link.
//    ■ - Create a button that will toggle/show all link-markers regardless of error/warning status.
//    ■ - [Pinning] Clicking on markers will pin the info div to the bottom of the screen. Clicking the same or any other marker will unpin it.
//
//    ✓ - [COMPLETE] Check URL for correct querystring pattern (? vs &)
//
//  ## FOUT ---
//    ■ - Consider changing out font icons for SVGs.
//
//  ## [ORB] TD Markers ---
//    ■ - Give them "levels" to show how deep they are.
//    ■ - Create a toggle that cycles through the different levels so that you can see more clearly.
//        - Show a toolbar at the bottom of the page to achieve this.
//    ■ - Hide all inactive markers, or simply make them very low opacity.
//
//  ## Upgrades to WordPress Blog Checker ---
//    ✓ - [COMPLETE] Only auto-check on page load if the emailDate is in the present, future, or within the last day.
//    ✓ - [COMPLETE] Do not auto-check on page load if there's data in storage already. Force myself to manually click to initiate a recheck to cut down on excessive page loads.
//    ■ - Throw an error if the blog url doesn't actually take us to the blog, or if a page never loads at all.
//
//    ## Investigate Using the WordPress API ---
//       ■ - The current method of checking for protected status is hacky. Considering changing it in the future.
//       ■ - https://css-tricks.com/using-the-wp-api-to-fetch-posts/
//       ■ - https://www.cloudways.com/blog/setup-basic-authentication-in-wordpress-rest-api/
//       ■ - https://code.tutsplus.com/tutorials/wp-rest-api-setting-up-and-using-oauth-10a-authentication--cms-24797
//       ■ - http://wp-api.org/node-wpapi/
//
//  ## Modules Menu ---
//    ■ - Give each module its own mini-menu to hide, duplicate, re-order and edit.
//
//  ## HTML Tag Checker ---
//    ■ - Search for unsupported tags like <strong> and recommend replacements like <b>.
//
//  ## Code Checker --
//    ■ - table cells where the width is defined in the width="" attribute must have it defined as an inline style too. (excludes % widths)
//      - https://litmus.com/community/discussions/151-mystery-solved-dpi-scaling-in-outlook-2007-2013
//
//  ## Link Checker --
//    ■ - Add support for link status like how mail-tester.com does it.
//        -They show a status report for each link like [302 - Redirection : Found] and [200 - Success : OK].
//    ■ - Throw an error if a URL shortener is being used.
//
//  ## Calculate page weight ---
//    ■ - Determined the size of the HTML (in kb) and the percentage of text (eg. 29% text).
//
//  ## Remove Comments for Production ---
//    ■ - This should be added to MailChimp. When HTML is pasted it, run a script that removes <!-- --> comments.
//
//  ## Image Checker ---
//    ■ - Check that all images have alt="" attributes.
//    ■ - Check that all images are hosted on a CDN.
//
//  ## Alerts ---
//    ■ - Consider using Toastr instead of Alertifyjs.com - https://github.com/CodeSeven/toastr
//
//  ## Fix positioned elements moving on resize (like link-markers) ---
//    ■ - https://www.kirupa.com/html5/get_element_position_using_javascript.htm
//
//  ## Learn async ---
//    ■ - http://stackoverflow.com/questions/23667086/why-is-my-variable-unaltered-after-i-modify-it-inside-of-a-function-asynchron
//
//  ## Create an options menu (for entire extension) ---
//    ■ - Ref: https://developer.chrome.com/extensions/optionsV2
//    ✓ - Add input for Dropbox access token
//
//  ## Create an options menu (for newsletter) ---
//    ■ - Slides out from the right, provides a larger menu of "orbs" to modify the page
//    ■ - Additional orb ideas
//        - Middleman Sitemap
//        - Blog Checker Controls (autorun on this page, autorun on all pages, run again right now)
//
//  ## Tips
//    ■ - A runnng log of "tips/did you know"s based on various factors.
//    ■ - For example, if the word "certification" is detected in the copy, provide a tip that reminds you that MedBridge does not offer certification.
//    ■ - Refer A Friend rules
//    ■ - "Steer clear of "get your ceus" since this represents somewhat of a commoditized value representation of our courses."
//    ■ - .... (pending)
//
//
//  ## Get local user path automatically ---
//    ■ - After the user loads their first local file, grab the URL and save it to chrome.storage.sync.
//    ■ - Only do this if it's NOT already set. So check for it first, if it's null, find it automatically and save it.
//    ■ - Figure out the difference between mac/windows/linux and make sure it works for all 3
//    ■ - Maybe don't save the "file:///" part?
//
//  ## Add minimum animation time to "loading" orbs
//    - If an orb is instant, the loading animation never plays. Fix that so that it feels like something happened.
//
//
//////////////
//////////////
//  ERROR IDEAS
//////////////
//////////////
//
//  ## Errors log
//    ■ - Hidden panel that expands to show a listing of all errors (sorted by category).
//    ■ - Similar in look and functionality to the planned Tools Panel
//    ■ - Activate the panel by clicking an orb.
//    ■ - The orb should be flashing red with a number if there's at least 1 error
//        - Yellow and still if only warnings are available
//        - Green with a checkmark if everything is awesome.
//
//  ## General Errors to Implement
//    ■ - Missing doctype
//    ■ - Unsupported use of <strong>, replace with <b>
//    ■ - Count asteriks to check for missing footnotes.
//    ■ - If NPS verbiage is detected, remind me to add the fine print. - https://drive.google.com/open?id=0B_swaeZ9mgUMVERsZmlkNHJRak9XWVdSU3NDM2ZMdFh2V0Fv
//    ■ - If a scrollbar exists in the mobile version at 320px wide.
//
//
//
//////////////
//////////////
//  ORB IDEAS
//////////////
//////////////
//
//  ## [ORB] Compare NS vs SUB, A vs B ---
//    ■ - Side-by-side view of two or more emails.
//      - Probably need to load this in chrome extension URL (or maybe even that won't work?)
//
//  ## [ORB] Toggle View - Padding and Margin ---
//    ■ - Can I generate divs that show margin and padding?
//
//  ## [ORB] Show Colors Used ---
//    ■ - Use allcolors.js in the Snippets section of dev tools.
//
//  ## [ORB] Toggle All Off ---
//    ■ - One master orb to turn off all running orbs.
//
//  ## [ORB] Guidelines ---
//    ■ - Create toggle that will add PhotoShop-esque guidelines to all or individual images in the email. This will help show any alignment issues that may exist.
//    ■ - Turn on "Guidelines" mode and click anywhere on the page to add custom guidelines.
//
//  ## [ORB] Image Dimensions ---
//    ■ - Overlay a div on all images that shows their current size as well as their original size.
//
//  ## [ORB] Swap Font Stack ---
//    ■ - Simulate what the email will look like in email clients that do not support @font-face or have Helvetica.
//    ■ - Remove all instances of "Roboto" from font-family: declarations, and then Helvetica.
//
//////////////
//////////////
//  QUESTIONS
//////////////
//////////////
//
//  - Do I need to be adding <span>'s with inline styling if the parent <td> already includes it all'
//
//
//
//////////////
//////////////
//  BUGS !!!
//////////////
//////////////
//
//  ## dFrame's scrollbar changes size on page load very briefly. Why?
//
//
//
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////


var view = getParameterByName("view");

if ( view !== "1" && /\.html?/gi.test(document.URL) && !/\/var\/folders\//gi.test(document.URL) ) {


///////////
///////////
///////////
//// Pre-Load Variables
//// The construction of our HTML is dependant on these variables being set first.
///////////
///////////
///////////

// MailChimp Conditions Parser
// Conditional parsing is off by default
if ( getParameterByName("conditions") === "1" ) {
  var conditionsParser = true;
} else {
  var conditionsParser = false;
}

var suppressAlerts = false;
if ( getParameterByName("presentation") === "1" ) {
  suppressAlerts = true;
  console.log("alerts suppressed");
}

///////////
///////////
///////////
//// async
///////////
///////////
///////////

// .onload is crap, if an image is having trouble being loaded in the DOM, this thing never fires. Not even after the image fully fails to load.
// What was I waitng for the body to finish loading ANYWAY?

// THIS HAS BEEN MOVED TO ITS OWN SCRIPT THAT LOADS AT document_start

// document.body.onload = function() {

  // // Get dropbox access token from chrome.storage.
  // chrome.storage.sync.get("dpToken", function(items) {
  //   if (!chrome.runtime.error) {
  //     // console.log(items);
  //     dbx = new Dropbox({ accessToken: items.dpToken });
  //     console.warn("Dropbox access token retrieved.")
  //   } else {
  //     console.warn("Could not retrieve Dropbox access token from chrome.storage.sync.")
  //   }
  // });

// }






//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////




//
// if ( onLocal ) {
//
//       // Get name for the key
//       var emailId     = pageUrl.replace(/(.+\/|-ns\.html?|-sub\.html?)/gi, "");
//       // console.log("emailId = " + emailId);
//
//       var emailId2 = "16-12-05-SLP-Lisa-Mitchell-CAS-ns-a.html"
//      chrome.storage.sync.get(emailId2, function (result) {
//         // console.log(result[emailId2]);
//         // alert(result.channels);
//         // $("#channels").val(channels);
//       });
//
//       // get
//       chrome.storage.promise.sync.get('foo').then(function(items) {
//         // console.log("resolved");
//         // console.log(items); // => {'foo': 'bar'}
//       }, function(error) {
//         // rejected
//         // console.log(error);
//       });
//
//
//       // Get the local path
//       var localPath = pageUrl.replace(fileName, "");
//       // console.log("localPath = " + localPath);
//
//       // Is this sub or non-sub
//       if ( /-ns(\.|-)/gi.test(pageUrl) ) {
//         localIdNs = fileName
//         // console.log("localIdNs = " + localIdNs);
//       } else if ( /-ns(\.|-)/gi.test(pageUrl) ) {
//         localIdSub = fileName
//         // console.log("localIdSub = " + localIdSub);
//       }
//
//       // var dropboxId = dropboxUrl.replace(/(.+s\/|\/.+$)/gi, "")
//       // var trelloId  =  trelloUrl.replace(/(.+c\/|\/.+$)/gi, "")
//
//       // var ids = { "s": "", "n": "", "d": dropboxId, "t": trelloId, "m": "", "l": "" };
//       // var obj= {};
//       // var key = emailId
//       // obj[key] = ids;
//       // chrome.storage.sync.set(obj);
//       //
//       // chrome.storage.sync.get(key,function(result){
//       //   console.log("key");
//       //   console.log(result[key]["d"]);
//       //   console.log(result[key]["t"]);
//       // });
//
//
// }

  //     var emailId   = dropboxUrl.replace(/(.+\/)/gi, "")
  //     var dropboxId = dropboxUrl.replace(/(.+s\/|\/.+$)/gi, "")
  //     var trelloId  =  trelloUrl.replace(/(.+c\/|\/.+$)/gi, "")
  //
  //     var ids = { "d":dropboxId, "t":trelloId };
  //     var obj= {};
  //     var key = emailId
  //     obj[key] = ids;
  //     chrome.storage.sync.set(obj);
  //
  //     chrome.storage.sync.get(key,function(result){
  //       console.log("key");
  //       console.log(result[key]["d"]);
  //       console.log(result[key]["t"]);
  //     });
  //
  // chrome.storage.promise.sync.get(key).then(function(result) {
  //   var trelloId = result[key]["t"];
  //   if (trelloId !== "") {
  //     trelloOrb.href = "https://www.trello.com/c/" + result[key]["t"];
  //     trelloOrb.classList.remove("off");
  //   }
  // });


////////////////////
////////////////////
////////////////////
///
///    Apply the original code to an iFrame to save it
///
////////////////////
////////////////////
////////////////////

  // ========== METHOD 1 =============
  // ======== ASYNC / XHR ============
  // =================================
  // We'll use xhr to access the filesystem and grab the original files HTML code.
  // This is great because it will be a string that was never rendered by the browser.
  // Previously we were grabiing the code after render, meaning things like <tbody> were being added.
  // This also opens the door for using emailcomb.com's API on the original code using a function.

  // See newsletter-async.js for the xhr call.


  ////
  //////
  // Grab all of the TEXT in the document before we start manipulating the HTML
  var preheader = cleanPlainTxt(document.body.textContent); // http://stackoverflow.com/a/19032002/556079
  // var preheader = cleanPlainTxt(document.body.innerText); // http://stackoverflow.com/a/19032002/556079

  ////
  //////
  // Grab all of the HTML in the document before we start manipulating the HTML


  // ========== METHOD 2 =============
  // ======= SERIALIZE XML ===========
  // =================================
  // This method serializes the DOM as XML and spits out a string.
  // This may be better than the current method I am using. But I don't have time to test it.
  // https://stackoverflow.com/a/17451014/556079
      // var generatedSource = new XMLSerializer().serializeToString(document);
      // console.log(generatedSource);


  // ========== METHOD 3 =============
  // ========== ORIGINAL =============
  // =================================
  // Originally I didn't know I could use xhr to get the pages original un-rendered HTML.
  // As a substitute I took the rendered code, and sort of frankenstein'd it together to create our desktop and mobile views.
  // This code has been commented out because we are now using xhr instead.

          //////
          //// Get the page's HTML and Doctype
          //////

              //
              // //// We need a doctype first. Reassemble the doctype if there is one in the code.
              // var savedDocType = "";
              //
              // if (document.doctype && document.doctype.name) {
              //   savedDocType = "<!doctype " + document.doctype.name;
              //   if (document.doctype.publicId) {
              //     savedDocType += " PUBLIC \"" + document.doctype.publicId;
              //   }
              //   if (document.doctype.systemId) {
              //     savedDocType += "\" \"" + document.doctype.systemId + '">';
              //   }
              //   if (!document.doctype.publicId && !document.doctype.systemId) {
              //     savedDocType += ">";
              //   }
              // }
              //
              // //// Create a copy of the original HTML
              // var cleanedOriginalHtml = savedDocType;
              // cleanedOriginalHtml += document.documentElement.outerHTML;
              //
              // //// Create the desktop and mobile versions
              // var cleanedDesktopHtml = savedDocType;
              // var cleanedMobileHtml = savedDocType;
              //
              //   // Add dFrame.css to the desktop view
              //   var toolkitStyle = document.createElement("link");
              //   toolkitStyle.href = chrome.extension.getURL('css/newsletter/newsletter-dFrame.css');
              //   toolkitStyle.id = "debug-unique-style-block";
              //   toolkitStyle.className = "debug";
              //   toolkitStyle.rel = "stylesheet";
              //   toolkitStyle.type = "text/css";
              //   document.head.appendChild(toolkitStyle);
              //
              //   // Add allFrames.css to both views
              //   var globalToolkitStyle = document.createElement("link");
              //   globalToolkitStyle.href = chrome.extension.getURL('css/newsletter/newsletter-allFrames.css');
              //   globalToolkitStyle.id = "debug-global-style-block";
              //   globalToolkitStyle.className = "debug";
              //   globalToolkitStyle.rel = "stylesheet";
              //   globalToolkitStyle.type = "text/css";
              //   document.head.appendChild(globalToolkitStyle);
              //
              //   // Next add in the document's markup. Everything inside the <html> tag and including the <html> tag.
              //   cleanedDesktopHtml += document.documentElement.outerHTML;
              //
              //   document.getElementById("debug-unique-style-block").setAttribute("href", chrome.extension.getURL('css/newsletter/newsletter-mFrame.css'))
              //   cleanedMobileHtml += document.documentElement.outerHTML;
              //
              // // Remove all <script> tags. HTML emails cannot have them. We don't design them in there, but if you're viewing this page with Middleman then there will be some injected <script> tags that can cause us issues. These <script> tags allow Middleman to reload the page when changes to the file are made. We don't need them in our dFrame or mFrameContents potentially mucking things up.
              // // Also removes <object> tags. Which is also injected by Middleman (and MM sometimes tries to remove it itself and fails)
              // // cleanedOriginalHtml = cleanedOriginalHtml.replace(/<(object|script)\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/(object|script)>/gi, "");
              //
              // cleanedOriginalHtml = cleanedOriginalHtml.replace(/<(object|script)\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/(object|script)>/gi, "");
              // cleanedDesktopHtml  = cleanedDesktopHtml.replace(/<(object|script)\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/(object|script)>/gi, "");
              // cleanedMobileHtml   = cleanedMobileHtml.replace(/<(object|script)\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/(object|script)>/gi, "");




////////////////////
////////////////////
////////////////////
///
///    Clean the page of the original HTML and styling before restructuring it.
///
////////////////////
////////////////////
////////////////////

  // Destroy all <style> tags.
  let styleBlocks = document.querySelectorAll("style");
  for (let styleBlock of styleBlocks) {
    destroy(styleBlock);
  }

  let linkedStylesheets = document.querySelectorAll("[rel='stylesheet']");
  for (let linkedStylesheet of linkedStylesheets) {
    destroy(linkedStylesheet);
  }

  // Destroy all <body> tags.
  let bodyEle = document.querySelectorAll("body");
  for (let body of bodyEle) {
    destroy(body);
  }
  // Create a new <body> tag.
  var newBody = document.createElement("body");
  insertAfter(newBody, document.head);


  // Create a new injected script.
  injectScript( chrome.extension.getURL('/js/newsletter/zoom.js'), 'body');



  // var COMMENT_PSEUDO_COMMENT_OR_LT_BANG = new RegExp(
  //     '<!--[\\s\\S]*?(?:-->)?'
  //     + '<!---+>?'  // A comment with no body
  //     + '|<!(?![dD][oO][cC][tT][yY][pP][eE]|\\[CDATA\\[)[^>]*>?'
  //     + '|<[?][^>]*>?',  // A pseudo-comment
  //     'g');



  // Remove <body> contents
  // var ogBody = document.body;
  // while (ogBody.firstChild) {
  //     ogBody.removeChild(ogBody.firstChild);
  // }

  // Remove inline styling from <body>
  // ogBody.removeAttribute("style");


  // Apply class to the HTML element so that we can activate styles for this new page.
  document.getElementsByTagName('html')[0].classList.add("powered-up");

/////////////
/////////////

  // Apply our cleaned and reassembled original code to an iFrame as a backup to save it.
  // Commented out for now to save on loading time and console clutter

      // var domCopy = document.createElement("iframe");
      // domCopy.className = "og-dom";
      // document.body.appendChild(domCopy)
      //
      // domCopy.contentWindow.document.open();
      // domCopy.contentWindow.document.write(cleanedOriginalHtml);
      // domCopy.contentWindow.document.close();
      //
      // var domCopy = domCopy.contentWindow.document;


//////////


  // Create Main Container
  var mainContainer = document.createElement("div");
  mainContainer.className = "main-container";
  document.body.appendChild(mainContainer);


//////////

  // Create QA Wrapper
  var qaWrapper = document.createElement("div");
  qaWrapper.className = "qa-wrapper";
  mainContainer.appendChild(qaWrapper);


  //////////
  ////
  ////  Create Newsletter QA Info Bar Wrapper
  ////
  /////////

  var infoBar = document.createElement("div");
  infoBar.className = "info-bar";
  qaWrapper.appendChild(infoBar);


  // if ( document.documentElement.clientWidth <= 1440 ) {
  //   console.error("if");
  //   console.error(document.documentElement.clientWidth);
  // } else {
  //   console.error("if");
  //   console.error(document.documentElement.clientWidth);
  // }

  // Create Split View
  // console.log("activate split mode");
  document.body.classList.toggle("split-view-on");

  var iframeWrapper = document.createElement("div");
  iframeWrapper.className = "iframe-wrapper";
  qaWrapper.appendChild(iframeWrapper);

  var desktopIframeWrapper = document.createElement("div");
  desktopIframeWrapper.className = "desktop-view-wrapper";
  iframeWrapper.appendChild(desktopIframeWrapper);

  var desktopResizeHandle = document.createElement("div");
  desktopResizeHandle.className = "dframe-resize-handle";
  desktopIframeWrapper.appendChild(desktopResizeHandle);

    var desktopIframe = document.createElement("iframe");
    desktopIframe.className = "iframe-desktop-view";
    desktopIframe.id = "desktop-view"
    desktopIframeWrapper.appendChild(desktopIframe)

    desktopIframe.contentWindow.document.open();
    desktopIframe.contentWindow.document.write(cleanedDesktopHtml);
    desktopIframe.contentWindow.document.close();

    // Apply the desktop iframes document object to a variable
    var dFrameContents = desktopIframe.contentDocument;
    var dFrameBody = dFrameContents.body;


    // Quick <style> Injection
    // Inject a style block into this iframe via javascript to quickly apply styles on page load. Loading a link to a css file takes a bit to activate. So any styles that are important to have right away should go here. We inject it here instead of adding it inside a .css link because it loads faster. If we used a .css file there would be a flash on page load where the  styles aren't applied yet.
    // http://stackoverflow.com/a/33079951/556079
    //
    // - Prevent flash of contenteditable cursor when spell check is activated.
    //
    var dStyleElement = dFrameContents.createElement("style");
    // Experimenting with position .debug on page load to prevent the scrollbar from jumping around while the HTML waits for dFrame.css to load.
    dStyleElement.appendChild(dFrameContents.createTextNode("html { overflow-y: scroll; }") );
    dFrameContents.getElementsByTagName("head")[0].appendChild(dStyleElement);

    //////////////

    // Add allFrames.js
    var dFrameAllFramesScript = document.createElement("script");
    dFrameAllFramesScript.src = chrome.extension.getURL('js/newsletter/allFrames.js');
    insertAfter(dFrameAllFramesScript, dFrameContents.body);

    // Add dFrame.js
    var dFrameFrameScript = document.createElement("script");
    dFrameFrameScript.src = chrome.extension.getURL('js/newsletter/dFrame.js');
    insertAfter(dFrameFrameScript, dFrameContents.body);

    // Add <base>
    // Forces all links within the iFrame to open in their own separate tabs.
    // <base target="_blank" />
    var dFrameBase = document.createElement("base");
    dFrameBase.target = "_blank";
    dFrameContents.head.append(dFrameBase);

  /////////
  /////////
  ///////// MOBILE
  /////////
  /////////

  var mobileIframeWrapper = document.createElement("div");
  mobileIframeWrapper.className = "mobile-view-wrapper";
  iframeWrapper.appendChild(mobileIframeWrapper);

    var mobileDeviceWrapper = document.createElement("div");
    mobileDeviceWrapper.className = "mobile-device-view";
    mobileIframeWrapper.appendChild(mobileDeviceWrapper)

    var mobileIframe = document.createElement("iframe");
    mobileIframe.className = "iframe-mobile-view";
    mobileIframe.id = "mobile-view"
    mobileDeviceWrapper.appendChild(mobileIframe)

    mobileIframe.contentWindow.document.open();
    mobileIframe.contentWindow.document.write(cleanedMobileHtml);
    mobileIframe.contentWindow.document.close();

    // Apply the mobile iframes document object to a variable
    var mFrameContents = mobileIframe.contentDocument;

    ////////
    ////////
    ////////

    var mobileIframeSetting = document.createElement("div");
    mobileIframeSetting.className = "mobile-iframe-settings";

    mobileIframeSetting.innerHTML = '<div id="mobile-320" class="mobile-dim active" data-mobile-width="320">320</div><div id="mobile-360" class="mobile-dim" data-mobile-width="360">360</div><div id="mobile-375" class="mobile-dim" data-mobile-width="375">375</div><div id="mobile-414" class="mobile-dim" data-mobile-width="414">414</div><div id="mobile-480" class="mobile-dim" data-mobile-width="480">480</div>'

    mobileIframeSetting.addEventListener("click", changeMobileSize, false);

      function hideMobileWrapper() {
        mobileIframeWrapper.classList.toggle('off');
      }

    mobileDeviceWrapper.appendChild(mobileIframeSetting);


    // Quick <style> Injection
    //
    // Inject a style block into this iframe via javascript to quickly apply styles on page load. Loading a link to a css file takes a bit to activate. So any styles that are important to have right away should go here. We inject it here instead of adding it inside a .css link because it loads faster. If we used a .css file there would be a flash on page load where the styles aren't applied yet.
    // http://stackoverflow.com/a/33079951/556079
    //
    // - Remove scrollbar from mobile view while still allowing scrolling
    // - Prevent flash of contenteditable cursor when spell check is activated.
    //
    var mStyleElement = mFrameContents.createElement("style");
        mStyleElement.className = "debug";
    mStyleElement.appendChild(mFrameContents.createTextNode("html::-webkit-scrollbar-track { background:#fbfbfb; } html::-webkit-scrollbar { width:0px; background: transparent; } html::-webkit-scrollbar-thumb { border-radius:10px; background:#a6a6a6; border:4px solid #fbfbfb; }") );
    mFrameContents.getElementsByTagName("head")[0].appendChild(mStyleElement);

    // Add allFrames.js
    var mFrameAllFramesScript = document.createElement("script");
    mFrameAllFramesScript.src = chrome.extension.getURL('js/newsletter/allFrames.js');
    insertAfter(mFrameAllFramesScript, mFrameContents.body);

    // Add mFrame.js
    var mFrameScript = document.createElement("script");
    mFrameScript.src = chrome.extension.getURL('js/newsletter/mFrame.js');
    insertAfter(mFrameScript, mFrameContents.body);

    // Add <base>
    // Forces all links within the iFrame to open in their own separate tabs.
    // <base target="_blank" />
    var mFrameBase = document.createElement("base");
    mFrameBase.target = "_blank";
    mFrameContents.head.append(mFrameBase);

    // Add allFrames.css
    // var allFramesStyles = document.createElement("link");
    // allFramesStyles.href = chrome.extension.getURL('css/allFrames.css');
    // allFramesStyles.rel = "stylesheet";
    // allFramesStyles.type = "text/css";
    // dFrameContents.head.appendChild(allFramesStyles);
    // mFrameContents.head.appendChild(allFramesStyles.cloneNode(true));


    // Allow touch events to mimic mobile behavior
    // Pending




//////////////////////
//////////////////////
//////////////////////
//////////////////////


// ERROR CHECKING FOR ENTIRE PAGE
document.querySelector("html").classList.add("error-status");
document.querySelector("html").classList.toggle("errors");
//



//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
////                                              ////
////           Create Global Variables            ////
////                                              ////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////

// Dropbox
dropboxParentFolder = "Dropbox%20(MedBridge%20.)";

var localUserPath = "file:///Users/jameskupczak";

var pageUrl = document.URL;

///////////
///// Get the filename.
///////////
var fileName = getFilename(pageUrl);


///////////
///// Get the Platform
///////////

var emailPlatform;
var emailPlatformName;
if ( /^GR\-/i.test(fileName) ) {
  emailPlatform = "gr";
  emailPlatformName = "GetResponse";
} else if ( /^SG\-/i.test(fileName) ) {
  emailPlatform = "sg";
  emailPlatformName = "SendGrid";
} else {
  emailPlatform = "mc";
  emailPlatformName = "MailChimp";
}

///////////
///// Get Discipline
///////////
var emailDisc = getDisciplineId(fileName);
document.body.classList.add("disc-" + emailDisc);

///////////
///// Get the A/B Status.
///////////

var abTesting = getABstatus(fileName);


///////////
///// Determine location of the file you're currently viewing.
///////////

if ( /dropboxusercontent/gi.test(pageUrl) ) {
  var onDropbox = true;
} else if ( /file:\/\/\//gi.test(pageUrl) ) {
  var onLocal = true;
} else if ( /\/\/localhost\:/gi.test(pageUrl) ) {
  var onLocalServer = true;
  if ( /localhost\:4567/gi.test(pageUrl) ) {
    var onMiddleman = true;
  }
}

if ( /Dropbox%20\(MedBridge%20\.\)/gi.test(pageUrl) ) {
  var inLocalDbFolder = true;
  // console.error("yes!");
} else {
  // console.error("nuh-uh");
}

///////////
///// Get local parent folder path
///////////

if ( inLocalDbFolder ) {

  var filenameEscaped = escapeRegExp(fileName)
  var filenameReplacePattern = new RegExp(filenameEscaped + "($|.+?)", "gi");

  // console.error(filenameEscaped);
  // console.error(filenameReplacePattern);

  var localParentFolder = pageUrl.replace(/^.+Dropbox%20\(MedBridge%20\.\)\//gi, '')

      // console.error(localParentFolder);

      localParentFolder = localParentFolder.replace(filenameReplacePattern, "");

      // console.error(localParentFolder);

} else {
  // console.error("nope!");
}

///////////
///// Determine type of email - Non-Subscriber versus Subscriber, fox, hs, etc.
///////////

var emailSubType;
var emailSubTypeName;

if ( /\-ns[\.\-]/gi.test(pageUrl) ) {
  emailSubType = "ns"
  emailSubTypeName = "Non-Subscribers"
} else if ( /\-sub[\.\-]/gi.test(pageUrl) ) {
  emailSubType = "sub"
  emailSubTypeName = "Subscribers"
}
if ( /\-Fox\-/gi.test(pageUrl) ) {
  emailSubType = "fox"
  emailSubTypeName = "Subscribers"
}
if ( /\-(EH|HS)\-/gi.test(pageUrl) ) {
  emailSubType = "eh"
  emailSubTypeName = "Subscribers"
}
if ( /\-DR\-/gi.test(pageUrl) ) {
  emailSubType = "dr"
  emailSubTypeName = "Subscribers"
}

///////////
///// Determine audience - MedBridge versus Outside Organization
///// Healthsouth, Drayer PT, Fox Rehab
///////////

var outsideOrg = false;
if ( /\-(EH|HS|DR|Fox)\-/gi.test(pageUrl) ) {
  outsideOrg = true;
}



///////////
///// Determine if this is a sale or presale or neither
///////////

var emailAnySale = false;
var emailSale = false;
var emailPresale = false;

if ( /\-Sale\-/gi.test(pageUrl) ) {
  emailSale = true;
  emailAnySale = true;
} else if ( /\-Presale\-/gi.test(pageUrl) ) {
  emailPresale = true;
  emailAnySale = true;
}


///////////
///// Get Email Title
///////////
var emailTitle = getEmailTitle(fileName, emailDisc);


///////////
///// Get Date of Email
///////////
var emailDate = getEmailDate(fileName) || new Date();

// If no email date is found in the filename, set the emailDate variable to be today's date.
if ( isNaN(emailDate) == true ) { // ref - http://stackoverflow.com/a/1353710/556079
  emailDate = new Date();;
}

var emailMonthAbbr = getMonthAbbr(emailDate);


///////////
///// Is this a recent email?
///////////
var isRecentEmail = isRecentEmail(emailDate);


///////////
///// Global error variables
///////////
var totalErrors = 0;
var totalLinkErrors = 0;
var totalLinkWarnings = 0;
var totalTextErrors = 0;

///////////
///// Show all of our important variables in the log
///////////

console.groupCollapsed("Global variables based on filename");

  console.group("Platform");
    console.log("emailPlatform = " + emailPlatform);
  console.groupEnd();

  console.group("Location");
    console.log("pageUrl = " + pageUrl);
    console.log("inLocalDbFolder = " + inLocalDbFolder);
    console.log("fileName = " + fileName);
  console.groupEnd();

  console.log("abTesting = " + abTesting);

  console.log("emailSubType = " + emailSubType);
  console.log("emailSubTypeName = " + emailSubTypeName);
  console.log("outsideOrg = " + outsideOrg);

  console.log("emailDisc = " + emailDisc);
  console.log("emailTitle = " + emailTitle);

  console.group("Date");
    console.log("emailDate = " + emailDate);
    console.log("emailDate (month) = " + emailDate.getMonth() + " | " + getMonthAbbr(emailDate));
    console.log("isRecentEmail = " + isRecentEmail);
  console.groupEnd();

  console.group("Sales");
    console.log("emailAnySale = " + emailAnySale);
    console.log("emailSale = " + emailSale);
    console.log("emailPresale = " + emailPresale);
  console.groupEnd();

console.groupEnd();



    dFrameContents.body.classList.add("disc-" + emailDisc);
    mFrameContents.body.classList.add("disc-" + emailDisc);




/////////////////////////////
/////
/////   Show dFrame width on window resize
/////
/////////////////////////////

//// - Update using element watcher when it's available in Chrome: https://jsfiddle.net/atotic/mr47wt1a/

var dFrameSizeStatus = document.createElement("div");
dFrameSizeStatus.className = "iframe-size-status";

var dFrameWidthStatus = document.createElement("div");
dFrameWidthStatus.id = "desktop-width-status";
dFrameWidthStatus.className = "iframe-width-status iframe-status-container";
dFrameSizeStatus.appendChild(dFrameWidthStatus);

var dFrameZoomStatus = document.createElement("div");
dFrameZoomStatus.id = "desktop-zoom-status";
dFrameZoomStatus.className = "iframe-zoom-status iframe-status-container";
dFrameZoomStatus.innerHTML = "100%";
dFrameSizeStatus.appendChild(dFrameZoomStatus);

desktopIframeWrapper.appendChild(dFrameSizeStatus);

var fadeWidthStatus;

window.addEventListener('resize', showdFrameWidthStatus, true);

function showdFrameWidthStatus() {
  dFrameWidthStatus.classList.add("show");
  dFrameWidthStatus.innerHTML = (desktopIframe.clientWidth-15) + "px";

  clearTimeout(fadeWidthStatus); //https://www.w3schools.com/jsref/met_win_cleartimeout.asp

  fadeWidthStatus = setTimeout(function() {
    dFrameWidthStatus.classList.remove("show");
  }, 4000);
}

// https://stackoverflow.com/a/39312522/556079



////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
//
//      _______  _______  _______  _______  ______          ___      _______  _______  ______
//     |   _   ||       ||       ||       ||    _ |        |   |    |       ||   _   ||      |
//     |  |_|  ||    ___||_     _||    ___||   | ||        |   |    |   _   ||  |_|  ||  _    |
//     |       ||   |___   |   |  |   |___ |   |_||_       |   |    |  | |  ||       || | |   |
//     |       ||    ___|  |   |  |    ___||    __  |      |   |___ |  |_|  ||       || |_|   |
//     |   _   ||   |      |   |  |   |___ |   |  | |      |       ||       ||   _   ||       |
//     |__| |__||___|      |___|  |_______||___|  |_|      |_______||_______||__| |__||______|
//
//
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
////                                              ////
////  After Initial Page Loading                  ////
////  Run Querystring Functions                   ////
////                                              ////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////

// Wait till after all of our elements are created before attempting to run this function.

if ( typeof getParameterByName("mobilewidth") === 'string' || getParameterByName("mobilewidth") instanceof String ) {
  changeMobileSize(getParameterByName("mobilewidth"));
  console.log("mobile width change");
}

if ( getParameterByName("layout") ) {
  var layout = getParameterByName("layout").match(/.{1}/g);


  if ( layout[0] === "0" ) {
    infoBar.classList.add("off");
  }

  if ( layout[1] === "0" ) {
    document.body.classList.add("presentation-mode");
  }

  if ( layout[2] === "0" ) {
    mobileIframeWrapper.classList.add("off");
  }
  console.error(layout);
}



// if ( getParameterByName("layout") === "0" ) {
//   toggleImages();
//   console.log("images off");
// }



////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
//
//      ___      _______  __   __  _______  __   __  _______
//     |   |    |   _   ||  | |  ||       ||  | |  ||       |
//     |   |    |  |_|  ||  |_|  ||   _   ||  | |  ||_     _|
//     |   |    |       ||       ||  | |  ||  |_|  |  |   |
//     |   |___ |       ||_     _||  |_|  ||       |  |   |
//     |       ||   _   |  |   |  |       ||       |  |   |
//     |_______||__| |__|  |___|  |_______||_______|  |___|
//
//
//      Now that dFrame and mFrameContents have been created we'll build the rest of the layout.
//
//
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
////                                                   ////
////  Create Newsletter Header                         ////
////                                                   ////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////


// var headerBar = document.createElement("div");
// headerBar.className = "header-bar";
// mainContainer.appendChild(headerBar);

/////

    // Create HTML for email date
    var showEmailDate ="";
    if ( isNaN(emailDate) == false ) { // ref - http://stackoverflow.com/a/1353710/556079
      showEmailDate = '<div class="title-small"><span>' + formatDate(emailDate) + '</span></div>'
    }
    var pageTitle = document.createElement("div");
    pageTitle.className = "page-title";


    // Create HTML for A/B icon if we need to.
    var abTitleIcon = "";
    if ( abTesting === "a" || abTesting === "b" ) {
      if ( abTesting === "a" ) {
        var abUrl = document.URL.replace(/\-a\./gi, "-b.");
        var abTestingUpper = "A";
        var abTestingOpposite = "B";
      } else {
        var abUrl = document.URL.replace(/\-b\./gi, "-a.");
        var abTestingUpper = "B";
        var abTestingOpposite = "A";
      }
      // abTitleIcon = "<a href='" + abUrl + "' class='ab-status " + abTesting + "'><span></span></a>"
      abTitleIcon = '<a href="' + abUrl + '" class="container ab-status ' + abTesting + '"><div class="card"><div class="face front"><span>' + abTestingUpper + '</span></div><div class="face back"><span>' + abTestingOpposite + '</span></div></div></a>'
    }

    // Create HTML for Header Icon based on Discipline
    var headerIcon = "";
    if ( emailDisc ) {

      var iconSuffix = "";
      if ( emailSubType === "sub" ) {
        var iconSuffix = "-sub";
      }

      // SVG Optimizer
      // http://petercollingridge.appspot.com/svg-optimiser

      var iconCode;

      // PT
      if ( emailDisc === "pt" ) {
          if ( emailSubType === "sub" ) {
            iconCode = '<svg viewBox="0 0 300 300"><path d="M150 0C67.2 0 0 67.2 0 150s67.2 150 150 150 150-67.2 150-150S232.8 0 150 0z" fill="#FFBE12"/><path d="M221.5 88.8c-5.6-9-13.5-15.9-23.6-20.8 -10.2-4.9-21.9-7.3-35.1-7.3h-69v172.8h41.7v-58.6h26.6c21 0 37.6-5 49.7-15.1 12.1-10.1 18.1-23.6 18.1-40.4C229.9 108 227.1 97.8 221.5 88.8zM181.3 136.7c-4.2 4-10.4 6.1-18.5 6.1h-27.3V92.9h27.8c7.5 0.1 13.5 2.5 17.8 7.4 4.4 4.8 6.5 11.3 6.5 19.3C187.7 127 185.5 132.6 181.3 136.7z" fill="#FFF"/></svg>';
          } else {
            iconCode = '<svg viewBox="0 0 300 300"><path d="M150 0C67.2 0 0 67.2 0 150s67.2 150 150 150 150-67.2 150-150S232.8 0 150 0z" fill="#FFBE12"/><path d="M221.5 88.8c-5.6-9-13.5-15.9-23.6-20.8 -10.2-4.9-21.9-7.3-35.1-7.3h-69v172.8h41.7v-58.6h26.6c21 0 37.6-5 49.7-15.1 12.1-10.1 18.1-23.6 18.1-40.4C229.9 108 227.1 97.8 221.5 88.8zM181.3 136.7c-4.2 4-10.4 6.1-18.5 6.1h-27.3V92.9h27.8c7.5 0.1 13.5 2.5 17.8 7.4 4.4 4.8 6.5 11.3 6.5 19.3C187.7 127 185.5 132.6 181.3 136.7z" fill="#FFF"/></svg>';
          }
      // AT
      } else if ( emailDisc === "at" ) {
          if ( emailSubType === "sub" ) {
            iconCode = '<svg viewBox="0 0 300 300"><path d="M150 0C67.2 0 0 67.2 0 150s67.2 150 150 150 150-67.2 150-150S232.8 0 150 0z" fill="#FF620D"/><path d="M66.8 229.5h44.5l10-32.3h57.1l10.1 32.3h44.7L169.3 56.7h-39.2L66.8 229.5zM149.8 105.1l18.6 59.9h-37.2L149.8 105.1z" fill="#FFF"/></svg>';
          } else {
            iconCode = '<svg viewBox="0 0 300 300"><path d="M150 0C67.2 0 0 67.2 0 150s67.2 150 150 150 150-67.2 150-150S232.8 0 150 0z" fill="#FF620D"/><path d="M66.8 229.5h44.5l10-32.3h57.1l10.1 32.3h44.7L169.3 56.7h-39.2L66.8 229.5zM149.8 105.1l18.6 59.9h-37.2L149.8 105.1z" fill="#FFF"/></svg>';
          }
      // OT
      } else if ( emailDisc === "ot" ) {
          if ( emailSubType === "sub" ) {
            iconCode = '<svg viewBox="0 0 300 300"><path d="M150 0C67.2 0 0 67.2 0 150s67.2 150 150 150 150-67.2 150-150S232.8 0 150 0z" fill="#BF002D"/><path d="M189 67.8c-11.5-7-24.5-10.4-39.2-10.4 -14.8 0-28 3.5-39.6 10.6 -11.6 7-20.5 17-26.7 30 -6.2 12.9-9.3 27.9-9.3 44.8v9.7c0.3 16.3 3.7 30.7 10 43.3 6.4 12.6 15.3 22.3 26.6 29 11.4 6.8 24.5 10.1 39.2 10.1s27.8-3.5 39.3-10.5c11.5-7 20.4-17 26.6-30 6.2-13 9.4-27.9 9.4-44.7v-8c-0.1-16.6-3.3-31.4-9.7-44.2C209.4 84.7 200.5 74.8 189 67.8zM183.1 150.4c-0.1 16.8-3 29.6-8.7 38.6 -5.7 8.9-13.8 13.4-24.3 13.4 -11.1 0-19.4-4.5-25-13.6 -5.6-9.1-8.4-22.1-8.4-39l0.1-12.7c1.2-31.3 12.2-47 33.1-47 10.7 0 18.9 4.5 24.6 13.4 5.7 8.9 8.6 21.9 8.6 39.1V150.4z" fill="#FFF"/></svg>';
          } else {
            iconCode = '<svg viewBox="0 0 300 300"><path d="M150 0C67.2 0 0 67.2 0 150s67.2 150 150 150 150-67.2 150-150S232.8 0 150 0z" fill="#BF002D"/><path d="M189 67.8c-11.5-7-24.5-10.4-39.2-10.4 -14.8 0-28 3.5-39.6 10.6 -11.6 7-20.5 17-26.7 30 -6.2 12.9-9.3 27.9-9.3 44.8v9.7c0.3 16.3 3.7 30.7 10 43.3 6.4 12.6 15.3 22.3 26.6 29 11.4 6.8 24.5 10.1 39.2 10.1s27.8-3.5 39.3-10.5c11.5-7 20.4-17 26.6-30 6.2-13 9.4-27.9 9.4-44.7v-8c-0.1-16.6-3.3-31.4-9.7-44.2C209.4 84.7 200.5 74.8 189 67.8zM183.1 150.4c-0.1 16.8-3 29.6-8.7 38.6 -5.7 8.9-13.8 13.4-24.3 13.4 -11.1 0-19.4-4.5-25-13.6 -5.6-9.1-8.4-22.1-8.4-39l0.1-12.7c1.2-31.3 12.2-47 33.1-47 10.7 0 18.9 4.5 24.6 13.4 5.7 8.9 8.6 21.9 8.6 39.1V150.4z" fill="#FFF"/></svg>';
          }
      // SLP
      } else if ( emailDisc === "slp" ) {
          if ( emailSubType === "sub" ) {
            iconCode = '<svg viewBox="0 0 300 300"><path d="M150 0C67.2 0 0 67.2 0 150s67.2 150 150 150 150-67.2 150-150S232.8 0 150 0z" fill="#00C2E0"/><path d="M134.6 93.7c4.3-3.3 10.2-4.9 17.6-4.9 7.4 0 13.2 1.9 17.5 5.8 4.3 3.9 6.5 9.3 6.5 16.4h41.5c0-10.5-2.7-19.9-8.2-28.1 -5.5-8.2-13.1-14.5-23-18.9 -9.9-4.4-21-6.6-33.4-6.6 -12.7 0-24.2 2-34.4 6.1 -10.2 4.1-18.1 9.8-23.7 17.1 -5.6 7.3-8.4 15.8-8.4 25.3 0 19.2 11.2 34.3 33.6 45.3 6.9 3.4 15.7 6.9 26.6 10.6 10.8 3.6 18.4 7.2 22.7 10.6 4.3 3.4 6.5 8.2 6.5 14.2 0 5.4-2 9.6-6 12.5 -4 3-9.4 4.5-16.3 4.5 -10.8 0-18.5-2.2-23.3-6.6 -4.8-4.4-7.2-11.2-7.2-20.5H81.5c0 11.4 2.9 21.5 8.6 30.2 5.7 8.7 14.3 15.6 25.6 20.7 11.4 5 24 7.5 38 7.5 19.9 0 35.5-4.3 46.9-12.9 11.4-8.6 17.1-20.5 17.1-35.6 0-18.9-9.3-33.7-28-44.5 -7.7-4.4-17.5-8.6-29.4-12.4 -11.9-3.8-20.3-7.6-25-11.2 -4.7-3.6-7.1-7.6-7.1-12C128.1 101.2 130.3 97 134.6 93.7z" fill="#FFF"/></svg>';
          } else {
            iconCode = '<svg viewBox="0 0 300 300"><path d="M150 0C67.2 0 0 67.2 0 150s67.2 150 150 150 150-67.2 150-150S232.8 0 150 0z" fill="#00C2E0"/><path d="M134.6 93.7c4.3-3.3 10.2-4.9 17.6-4.9 7.4 0 13.2 1.9 17.5 5.8 4.3 3.9 6.5 9.3 6.5 16.4h41.5c0-10.5-2.7-19.9-8.2-28.1 -5.5-8.2-13.1-14.5-23-18.9 -9.9-4.4-21-6.6-33.4-6.6 -12.7 0-24.2 2-34.4 6.1 -10.2 4.1-18.1 9.8-23.7 17.1 -5.6 7.3-8.4 15.8-8.4 25.3 0 19.2 11.2 34.3 33.6 45.3 6.9 3.4 15.7 6.9 26.6 10.6 10.8 3.6 18.4 7.2 22.7 10.6 4.3 3.4 6.5 8.2 6.5 14.2 0 5.4-2 9.6-6 12.5 -4 3-9.4 4.5-16.3 4.5 -10.8 0-18.5-2.2-23.3-6.6 -4.8-4.4-7.2-11.2-7.2-20.5H81.5c0 11.4 2.9 21.5 8.6 30.2 5.7 8.7 14.3 15.6 25.6 20.7 11.4 5 24 7.5 38 7.5 19.9 0 35.5-4.3 46.9-12.9 11.4-8.6 17.1-20.5 17.1-35.6 0-18.9-9.3-33.7-28-44.5 -7.7-4.4-17.5-8.6-29.4-12.4 -11.9-3.8-20.3-7.6-25-11.2 -4.7-3.6-7.1-7.6-7.1-12C128.1 101.2 130.3 97 134.6 93.7z" fill="#FFF"/></svg>';
          }
      // OTHER
      } else if ( emailDisc === "other" ) {
          if ( emailSubType === "sub" ) {
            iconCode = '<svg viewBox="0 0 300 300"><path d="M150 0C67.2 0 0 67.2 0 150s67.2 150 150 150 150-67.2 150-150S232.8 0 150 0z" fill="#BD00BF"/><polygon points="228.9 108.9 168.8 133.7 173.8 64.2 132.3 64.2 137.1 132.4 75.3 107 62.6 143.6 125.9 161.1 81.7 213.8 115.2 235.7 150.9 180.6 186.4 237.7 220 214.8 177.5 163.4 241.5 145.9" fill="#fff"/></svg>';
          } else {
            iconCode = '<svg  viewBox="0 0 300 300"><path d="M150 0C67.2 0 0 67.2 0 150s67.2 150 150 150 150-67.2 150-150S232.8 0 150 0z" fill="#BD00BF"/><polygon points="228.9 108.9 168.8 133.7 173.8 64.2 132.3 64.2 137.1 132.4 75.3 107 62.6 143.6 125.9 161.1 81.7 213.8 115.2 235.7 150.9 180.6 186.4 237.7 220 214.8 177.5 163.4 241.5 145.9" fill="#fff"/></svg>';
          }
      // MASSAGE
      } else if ( emailDisc === "lmt" ) {
          if ( emailSubType === "sub" ) {
            iconCode = '<svg viewBox="0 0 300 300"><path d="M150 0C67.2 0 0 67.2 0 150s67.2 150 150 150 150-67.2 150-150S232.8 0 150 0z" fill="#ff620d"/><path d="M80.4 222.2h37.2l8.3-27h47.7l8.4 27h37.4L166.2 77.8h-32.8L80.4 222.2zM149.8 118.2l15.6 50.1h-31.1L149.8 118.2z" fill="#fff"/></svg>';
          } else {
            iconCode = '<svg viewBox="0 0 300 300"><path d="M150 0C67.2 0 0 67.2 0 150s67.2 150 150 150 150-67.2 150-150S232.8 0 150 0z" fill="#ff620d"/><path d="M80.4 222.2h37.2l8.3-27h47.7l8.4 27h37.4L166.2 77.8h-32.8L80.4 222.2zM149.8 118.2l15.6 50.1h-31.1L149.8 118.2z" fill="#fff"/></svg>';
          }
      } else {
        iconCode = '<img class="disc-img" src="' + chrome.extension.getURL('favicons/' + emailDisc + iconSuffix + '.png') + '">'
      }
      // Wrap it up in a div
      headerIcon = "<div class='disc-img svg-" + emailDisc + "'>" + iconCode + "</div>";
    } else {
      // No discipline found in emailDisc
      headerIcon = "";
    }


    /////////
    /////////
    /////////
    var documentDesc = document.createElement("div");
    documentDesc.className = "document-desc";

    var documentIcon = document.createElement("div");
    documentIcon.innerHTML = headerIcon;
    documentIcon.className = "document-icon";
    documentDesc.appendChild(documentIcon);


    //


    pageTitle.innerHTML += headerIcon;


    // Organization Logos
    if ( outsideOrg ) {
      console.error("!");
      var orgLogo;
      // var orgLogo = document.createElement("img");
      //     orgLogo.className = "organization-logo";

      if ( emailSubType === "fox" ) {
        orgLogo = "<img src='" + chrome.extension.getURL('img/organizations/fox.png') + "' class='organization-logo'>"
        console.error(orgLogo);
      }
      if ( emailSubType === "dr" ) {
        orgLogo = "<img src='" + chrome.extension.getURL('img/organizations/drayer.png') + "' class='organization-logo'>"
        console.error(orgLogo);
      }
      if ( emailSubType === "hs" || emailSubType === "eh" ) {
        orgLogo = "<img src='" + chrome.extension.getURL('img/organizations/hs.png') + "' class='organization-logo'>"
        console.error(orgLogo);
      }

      pageTitle.innerHTML += orgLogo;
    }




    // Create HTML for Header Audience Text
    var headerAudienceText = "";
    if ( emailDisc || emailSubTypeName ) {

      headerAudienceText = '<div class="email-disc">';

      if ( emailDisc ) {
        headerAudienceText += '<div class="title-large"><span>' + getDisciplineName(emailDisc) + '</span></div>';
      }
      if ( emailSubTypeName ) {
        headerAudienceText += '<div class="title-small"><span>' + emailSubTypeName + '</span></div>';
      }

      headerAudienceText += '</div>';
    }
    pageTitle.innerHTML += headerAudienceText;

    //
    pageTitle.innerHTML += abTitleIcon;

    //
    pageTitle.innerHTML += '<div class="email-title"><div class="title-large"><span>' + toTitleCaseRestricted(emailTitle) + '</span></div>' + showEmailDate + '</div>'

    // Inject content into the title bar
    // pageTitle.innerHTML = headerIcon + headerAudienceText + abTitleIcon + '<div class="email-title"><div class="title-large"><span>' + toTitleCaseRestricted(emailTitle) + '</span></div>' + showEmailDate + '</div>';

    //
    // headerBar.appendChild(pageTitle);

    /////
    // Append document description to the the info-bar
    var documentTitle = document.createElement("div");
    documentTitle.innerHTML = headerAudienceText;
    documentTitle.className = "document-title";
    documentDesc.appendChild(documentTitle);

    infoBar.prepend(documentDesc);

/////

// var mainMenu = document.createElement("div");
// mainMenu.className = "main-menu";
//
// if ( onDropbox ) {
//   var navLocalView = '<div id="nav-local-view" class="nav-local-view"><span>Local View</span></div>';
// } else {
//   var navLocalView = '';
// }
//
// mainMenu.innerHTML = '<div id="nav-plain-text" class="nav-item nav-plain-text"><span class="icon"></span><span>Create Plain Text</span></div><div id="nav-share" class="nav-item nav-share"><span class="icon"></span><span>Share</span></div>' + navLocalView + '<div class="nav-item nav-dropbox"><span class="icon"></span><a href="https://www.dropbox.com/work/' + localParentFolder + '">Open in Dropbox</a></div>'
// headerBar.appendChild(mainMenu);
//
// // Attach event listenrs
// document.querySelector("#nav-plain-text").addEventListener('click', plainText, false);
// document.querySelector("#nav-share").addEventListener('click', getDbShareLink, false);
//
// if ( onDropbox ) {
//   document.querySelector("#nav-local-view").addEventListener('click', swapUrl, false);
// }


// document.querySelector("#nav-dropbox").addEventListener('click', getDbShareLink, false);


// function mainMenuOnClick() {
//   console.log( event.target );
//   console.log( event.currentTarget );
// }

//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
////                                              ////
////  Create Dropbox Shareable URL INPUT          ////
////                                              ////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////

var dropboxUrlInput = document.createElement("input");
dropboxUrlInput.id = "dropbox-shareable-link-text";
dropboxUrlInput.className = "temporary-copy-holder";
document.body.appendChild(dropboxUrlInput);

//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
////                                              ////
////  Create Newsletter QA Control Bar Wrapper    ////
////                                              ////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////

var controlBar = document.createElement("div");
controlBar.className = "control-bar";
qaWrapper.appendChild(controlBar);

  //////////
  ////
  ////  Preflight Status
  ////
  /////////

  var preflightStatus = document.createElement("div");
  preflightStatus.id = "preflight";
  preflightStatus.className = "preflight-wrapper initial-load";
  preflightStatus.innerHTML = '<div id="preflight-total" class="preflight-status preflight-total">0</div><div class="preflight-rocket preflight-status icomoon icomoon-rocket"></div>'
  preflightStatus.addEventListener("click", showPreflight, false);
  controlBar.appendChild(preflightStatus);

  var preflightTotal = preflightStatus.querySelector(".preflight-total");

  function showPreflight() {

    console.log("showPreflight() function started");

    // instanciate new modal
    preflightWindow = new tingle.modal({
      footer: false,
      stickyFooter: false,
      cssClass: ['fill'],

      onOpen: function() {
        console.log('modal open');
      },
      onClose: function() {
        console.log('modal closed');
      }
    });

    var preflightHTML = "<div id='preflight-window'><div class='preflight-header'>Preflight Check</div><div class='main-checks'><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br></div></div>"
    preflightWindow.setContent(preflightHTML);

    preflightWindow.open();

    console.log("showPreflight() function ended");

  }

  // Orbs Top
  var orbsTop = document.createElement("div");
  orbsTop.className = "orbs-top";
  controlBar.appendChild(orbsTop);

  // Orbs Bottom
  var orbsBottom = document.createElement("div");
  orbsBottom.className = "orbs-bottom";
  controlBar.appendChild(orbsBottom);


//////////
////
////  Create Pane Toggle Orb
////
/////////

var paneToggleOrb = document.createElement("div");
paneToggleOrb.className = "pane-orb orb glyph";
paneToggleOrb.addEventListener("click", paneToggle, false);
orbsBottom.appendChild(paneToggleOrb);

var infobarPaneStatus = 1;
var mobilePaneStatus = 1;

function paneToggle(infobar, mobile) {

    if (infoBar.classList.contains('off')) {
      infobarPaneStatus = 0;
    } else {
      infobarPaneStatus = 1;
    }
    if (mobileIframeWrapper.classList.contains('off')) {
      mobilePaneStatus = 0;
    } else {
      mobilePaneStatus = 1;
    }

  // console.log("1: infobar: " + infobar);
  // console.log("1: infobarPaneStatus: " + infobarPaneStatus);
  // console.log("1: mobile: " + mobile);
  // console.log("1: mobilePaneStatus: " + mobilePaneStatus);

  // If we got some data, process it.
  if ( infobar >= 0 || mobile >= 0 ) {

    if ( infobar === null ) {
      infobarPaneStatus = 1;
    } else {
      infobarPaneStatus = parseInt(infobar);
    }

    if ( mobile === null ) {
      mobilePaneStatus = 1;
    } else {
      mobilePaneStatus = parseInt(mobile);
    }

  // No data found, update the values based on what we know.
  } else {

    if ( infobarPaneStatus === 1 && mobilePaneStatus === 1 ) {
      infobarPaneStatus = 0;
    }
    else if ( infobarPaneStatus === 0 && mobilePaneStatus === 1 ) {
      mobilePaneStatus = 0;
    }
    else if ( infobarPaneStatus === 0 && mobilePaneStatus === 0 ) {
      infobarPaneStatus = 1;
      mobilePaneStatus = 1;
    }

  }

  // console.log("2: infobar: " + infobar);
  // console.log("2: infobarPaneStatus: " + infobarPaneStatus);
  // console.log("2: mobile: " + mobile);
  // console.log("2: mobilePaneStatus: " + mobilePaneStatus);

  // Update the css based on our values calculated above.
  // if ( infobarPaneStatus !== 2 ) {
    if ( infobarPaneStatus === 0 ) {
      infoBar.classList.add("off");
      history.replaceState(null,null, updateQueryString("infobar", "0") ); // http://stackoverflow.com/a/32171354/556079
    } else {
      infoBar.classList.remove("off");
      history.replaceState(null,null, updateQueryString("infobar") );
    }
  // }

  // if ( mobilePaneStatus !== 2 ) {
    if ( mobilePaneStatus === 0 ) {
      mobileIframeWrapper.classList.add("off");
      history.replaceState(null,null, updateQueryString("mobile", "0") );
    } else {
      mobileIframeWrapper.classList.remove("off");
      history.replaceState(null,null, updateQueryString("mobile") );
    }
  // }

  // if ( infobarPaneStatus = 2 ) {
  //   if (infoBar.classList.contains('off')) {
  //     infobarPaneStatus = 0;
  //   }
  // }
  // if ( mobilePaneStatus = 2 ) {
  //   if (mobileIframeWrapper.classList.contains('off')) {
  //     mobilePaneStatus = 0;
  //   }
  // }

}



// window.addEventListener('resize', function(event){
//
//   console.log(document.documentElement.clientWidth);
//
//   if ( document.documentElement.clientWidth > 960 && ( globalpaneStatusMobile === 0 || globalpaneStatusMobile === null || globalpaneStatusInfobar === 0 || globalpaneStatusInfobar === null ) ) {
//     // console.log("fire function (> 960)");
//     paneToggle(1, 1);
//   }
//
//   if ( document.documentElement.clientWidth <= 960 && ( globalpaneStatusMobile === 1 || globalpaneStatusMobile === null) ) {
//     // console.log(globalpaneStatusMobile + ":fire function (<= 960)");
//     paneToggle(2, 0);
//   }
//
//   if ( document.documentElement.clientWidth <= 580 && ( globalpaneStatusInfobar === 1 || globalpaneStatusInfobar === null) ) {
//     // console.log(globalpaneStatusInfobar + ": fire function (<= 580)");
//     paneToggle(0, 2);
//   }
// });

//////////
////
////  Create Trello Orb
////
/////////

// var trelloOrb = document.createElement("a");
// trelloOrb.className = "trello-orb orb off";
// trelloOrb.target = "_trello";
// orbsTop.appendChild(trelloOrb);
//   chrome.storage.promise.sync.get(key).then(function(result) {
//     if(typeof result[key] !== "undefined") {
//       if(result[key].hasOwnProperty(["t"])){
//         trelloOrb.href = "https://www.trello.com/c/" + result[key]["t"];
//         trelloOrb.classList.remove("off");
//       }
//     }
//   });



//////////
////
////   Create Share Email Orb
////
/////////

var shareOrb = document.createElement("div");
shareOrb.className = "share-orb orb glyph";
if ( onLocalServer ) { shareOrb.classList.add("off") };
shareOrb.addEventListener("click", getDbShareLink, false);
orbsTop.appendChild(shareOrb);


function getDbShareLink() {

  t0 = performance.now();

  console.groupCollapsed("Dropbox Share Function Initiated");

  var source = this;

  // console.error("getDbShareLink");
  // console.error(this);
  // console.error(event.target);

  if ( !this.classList.contains("loading") ) {

    source.classList.add("loading");

    if ( dropboxUrlInput.value !== "" ) {

      source.classList.remove("loading");
      copyToClipboard(dropboxUrlInput, "success", true);
      console.log("Shareable link found in the DOM. Copying to clipboard.")

    } else {

      if ( onDropbox ) {

        processDbLink(document.URL, "copy", source);
        console.log("This page is currently being viewed on Dropbox.com. Running processDbLink().")

      } else {

        callDropbox("copy", this);
        console.log("This page is a local file and the shareable link has not been retrieved yet. Running callDropbox().")

      }

    }
  }
}


function callDropbox(action, source) {

  // console.error("callDropbox");
  // console.error(source);
  // console.error(this);
  // console.error(event.target);

  var dropboxEscapedParentFolder = escapeRegExp(dropboxParentFolder)
  var dropboxTestPattern = new RegExp("^.+?" + dropboxEscapedParentFolder, "gi");

  if ( dropboxTestPattern.test(document.URL) ) {

    console.log("Yes! This file exists in the local DropBox folder. [" + document.URL + "]");

    var dropboxFilePath = document.URL.replace(dropboxTestPattern, "")
    var dropboxFilePath = dropboxFilePath.replace(/\?.+$/gi, "")
    var dropboxFilePath = decodeURIComponent(dropboxFilePath); // the API does not accept encoded paths (eg %20 instead of a space)

    //
    // Dropbox API SDK - http://dropbox.github.io/dropbox-sdk-js/#toc0__anchor
    // Documentation - https://www.dropbox.com/developers/documentation/http/documentation#sharing-create_shared_link_with_settings
    // Get Token - https://dropbox.github.io/dropbox-api-v2-explorer/#sharing_create_shared_link_with_settings
    //

    var shareableLink = "";

    // console.log("dropboxFilePath - " + dropboxFilePath);

    ////
    // Check Dropbox for a shareable link that might already exist.
    ////
    dbx.sharingListSharedLinks({path: dropboxFilePath})
      .then(function(response) {

        // console.log(response);
        // console.log(response.links[0]);
        // console.log(response.links[0][".tag"]);
        // console.log(response.links[0].url);

        if (response.links.length > 0 && response.links[0][".tag"] !== "folder") {

          // console.log("true: response.links.length > 0 = " + response.links.length);
          processDbLink(response.links[0].url, action, source);

        } else {
          ////
          // Could not find a pre-existing link for sharing. Create a new one instead.
          ////
          console.log("Could not find a pre-existing link for sharing. Create a new one instead.");
          console.log("false: response.links.length > 0 = " + response.links.length);

          dbx.sharingCreateSharedLinkWithSettings({path: dropboxFilePath})
            .then(function(response) {

              // console.log(response);
              processDbLink(response.url, action, source);

            })
            .catch(function(error) {
              console.log(error);
              source.classList.remove("loading");
            });
        }

      })
      .catch(function(error) {
        console.log(error);
        alertify.error("Could not find file on Dropbox.", 0);
        source.classList.remove("loading");
        source.classList.add("error");
        // To-Do: Add css to make the orb look like there's been an error.

        console.groupEnd();

      });

  } else {
    source.classList.remove("loading");
    console.log("No! This file is not located in the local DropBox folder. [" + document.URL + "]");
    alert("No! This file is not located in the local DropBox folder. [" + document.URL + "]");

    console.groupEnd();

  }
}


function processDbLink(shareableLink, action, source) {

  // console.error(shareableLink + ", " + action);
  console.log("Link retrieved from Dropbox API. Running processDbLink().")

  if ( shareableLink.length > 0 ) {

    if( !/dl\.dropboxusercontent/gi.test(shareableLink) ) {
      shareableLink = shareableLink.replace(/www\./i, "dl.");
      shareableLink = shareableLink.replace(/dropbox\.com/i, "dropboxusercontent.com");
      shareableLink = shareableLink.replace(/\?dl=0/i, "");
    } else {
      shareableLink = getPathFromUrl(shareableLink);
    }

    if ( action === "copy" ) {

      // var shareableLinkHolder = document.createElement("input");
      // shareableLinkHolder.id = "dropbox-link-text"
      // shareableLinkHolder.className = "hidden"
      // shareableLinkHolder.value = shareableLink;
      // document.body.appendChild(shareableLinkHolder);

      dropboxUrlInput.value = shareableLink;

      var t1 = performance.now();

      copyToClipboard(dropboxUrlInput, "success", true);

      // var x = (t1 - t0) / 1000;
      // var seconds = x % 60;

      var seconds = Math.round(((t1 - t0)/1000)%60);

      console.log("Call to DropBox took " + (t1 - t0) + " milliseconds (" + seconds + " seconds).");

      source.classList.remove("loading");

      console.log("Copying processed link to clipboard. [" + shareableLink + "]");

    } else {

      // var dbLinkForClicking = document.createElement("a");
      // dbLinkForClicking.id = "dropbox-link-for-clicking";
      // dbLinkForClicking.href = shareableLink
      // document.body.appendChild(dbLinkForClicking);
      // dbLinkForClicking.click();

      // history.pushState(null,null, shareableLink );

      console.log("Navigating to processed link. [" + shareableLink + "]");
      window.location.href = shareableLink;

    }


  } else {
    alert("error!");
  }

  console.groupEnd();

}

//////////
////
////  Create Orb Dividers
////
/////////

// var orbDivider1 = document.createElement("div");
// orbDivider1.className = "orb-divider orb-divider-1";
// orbsBottom.appendChild(orbDivider1);

var orbDivider2 = document.createElement("div");
orbDivider2.className = "orb-divider orb-divider-2";
orbsBottom.appendChild(orbDivider2);

var orbDivider3 = document.createElement("div");
orbDivider3.className = "orb-divider orb-divider-3";
orbsBottom.appendChild(orbDivider3);


//////////
////
////  Create Swap Orb
////
/////////

//
// var swapOrb = document.createElement("div");
// swapOrb.className = "swap-orb orb glyph";
// if ( onLocalServer ) { swapOrb.classList.add("off") };
// swapOrb.addEventListener("click", swapUrl, false);
// orbsTop.appendChild(swapOrb);

function swapUrl() {

  var source = this;

  console.log("Beginning URL swap.");

  source.classList.add("loading");

  if ( window.history.length > 1 ) {
    // Don't call the Dropbox API if there's a history available, instead just go back or forward.
    // If going back fails, then forward works instead. If for some reason this breaks in the future, this answer on SO is a nice alternative: http://stackoverflow.com/a/24056766/556079
    window.history.back();
    window.history.forward();
    console.log("navigated using window.history");
    console.log(document.referrer)
  } else {

    if ( onDropbox ) {

      var normalDbLink = pageUrl.replace(/dl\./gi, "www.");
          normalDbLink = normalDbLink.replace(/\.dropboxusercontent/gi, ".dropbox");

      console.log(normalDbLink);

      var localFilePath = "file:///Users/jameskupczak/Dropbox%20(MedBridge%20.)"

      // https://dropbox.github.io/dropbox-api-v2-explorer/#sharing_get_shared_link_metadata
      dbx.sharingGetSharedLinkMetadata({url: normalDbLink})
        .then(function(response) {

          console.log(response);

          var fileNameWithQuery = document.URL.replace(/^.+\//gi, "");
          var cleanFileName = document.URL.replace(/(^.+\/|\?.+)/gi, "");

          var cleanFileNameRegEx = escapeRegExp(cleanFileName);
          var cleanFileNameRegEx = new RegExp(cleanFileNameRegEx, "gi");

          var pathFromDb = response.path_lower.replace(cleanFileNameRegEx, "")

          var fullLocalFilePath = localFilePath + pathFromDb + fileNameWithQuery;

          console.log(cleanFileName);
          console.log(fileNameWithQuery);
          console.log(pathFromDb);
          console.log(fullLocalFilePath);

          // We cannot navigate to local paths from a website. So we send a message to the chrome extension event page to do it for us.
        	chrome.runtime.sendMessage({greeting: fullLocalFilePath}, function(response) {
        	  // console.log(response.farewell);
        	});

        })
        .catch(function(error) {
          console.log(error);
          alertify.error("Could not find file on Dropbox for reference.", 0);
          source.classList.remove("loading");
          source.classList.add("error");
          // To-Do: Add css to make the orb look like there's been an error.
        });

    }
        // Deprecated because we no longer show a Swap/Switch orb when on local. Use Share for that.
        // else {
        //
        //   if ( elExists(document.querySelector("#dropbox-link-text")) ) {
        //     window.location.href = document.querySelector("#dropbox-link-text").value;
        //   } else {
        //     callDropbox("go", this);
        //   }
        //
        // }
  }
}



//////////
////
////  Check Links - Manual Button Click
////
/////////

// Show/hide link checking orb.
// Used to activate link checking on older emails (> 1 month).
// By default we don't link check old emails.
if ( !isRecentEmail ) {
  var checkLinksOrb = document.createElement("div");
  checkLinksOrb.id = "check-links-orb";
  checkLinksOrb.className = "check-links-orb orb glyph";
  checkLinksOrb.addEventListener("click", runLinkValidation, false);
  orbsBottom.appendChild(checkLinksOrb);

  function runLinkValidation() {
    linkValidationLoop("false");
  }
}


//////////
////
////  Check the Blog
////
/////////

  // !!!!!!!!!!!!!!!!!!!!
  //
  // FUNCTION COMMENTED OUT. THE SWITCH TO HTTPS MEANS THIS NO LONGER WORKS. NEED TO FIX!
  //

// var blogOrb = document.createElement("div");
// blogOrb.id = "blog-orb";
// blogOrb.className = "blog-orb orb glyph";
// blogOrb.addEventListener("click", runCheckTheBlog, false);
// orbsBottom.appendChild(blogOrb);
//
// function runCheckTheBlog() {
//   // Code that runs the blog check is located in a separate file.
//   checkTheBlog();
// }

//////////
////
////  Zoom Check Orb
////
/////////

// var zoomCheckOrb = document.createElement("div");
// zoomCheckOrb.id = "zoom-check-orb";
// zoomCheckOrb.className = "zoom-check-orb orb glyph icomoon icomoon-search";
// zoomCheckOrb.addEventListener("click", zoomCheck, false);
// orbsBottom.appendChild(zoomCheckOrb);
// var showDimsToggle = false;
//
// function zoomCheck() {
//
// }



//////////
////
////  Create Borders/Dimensions Orb
////
/////////

var showDimsOrb = document.createElement("div");
showDimsOrb.id = "show-dims-orb";
showDimsOrb.className = "show-dims-orb orb glyph";
showDimsOrb.addEventListener("click", showDims, false);
orbsBottom.appendChild(showDimsOrb);
var showDimsToggle = false;

function showDims() {

  showDimsToggle = !showDimsToggle;

  if ( showDimsToggle ) {
    history.replaceState(null,null, updateQueryString("showdims", "1") );

    [].forEach.call(dFrameContents.querySelectorAll("*:not(section)"),function(a){ a.dataset.dimsColor = Math.floor(Math.random() * Math.floor(30)) });
    [].forEach.call(mFrameContents.querySelectorAll("*:not(section)"),function(a){ a.dataset.dimsColor = Math.floor(Math.random() * Math.floor(30)) });

  } else {
    history.replaceState(null,null, updateQueryString("showdims") );
    [].forEach.call(dFrameContents.querySelectorAll("*"),function(a){a.style.outline=""});
    [].forEach.call(mFrameContents.querySelectorAll("*"),function(a){a.style.outline=""});
  }

  document.getElementById("show-dims-orb").classList.toggle("on");

  dFrameContents.documentElement.classList.toggle("debug-show-dims-highlight");
  mFrameContents.documentElement.classList.toggle("debug-show-dims-highlight");



  // if ( elExists(dFrameContents.getElementById("debug")) ) {
  //   destroy(dFrameContents.getElementById("debug"));
  //   destroy(mFrameContents.getElementById("debug"));
  // } else {
  //   var debugStylingD = dFrameContents.createElement("style");
  //   debugStylingD.id = "debug";
  //   debugStylingD.appendChild(dFrameContents.createTextNode("") );
  //
  //   var debugStylingM = mFrameContents.createElement("style");
  //   debugStylingM.id = "debug";
  //   debugStylingM.appendChild(dFrameContents.createTextNode("td { box-shadow: inset 0 0 0 1px rgba(255,0,0,.25); } div:not(.alignment-guide) { box-shadow: inset 0 0 0 2px rgba(0,0,255,.25), 0 0 0 2px rgba(0,0,255,.25); }") );
  //
  //   dFrameContents.getElementsByTagName("head")[0].appendChild(debugStylingD);
  //   mFrameContents.getElementsByTagName("head")[0].appendChild(debugStylingM);
  // }

  //
  // Find <td> dimensions
  //

  // Destory the td markers if they exist, create the wrapper for them if they do not.
  if ( elExists(dFrameContents.getElementById("td-markers")) ) {

    destroy(dFrameContents.getElementById("td-markers"));
    destroy(mFrameContents.getElementById("td-markers"));

  } else {

    let dFrameTdList = dFrameContents.querySelectorAll("td");
    var tdCount = 0

    console.groupCollapsed("<td> Group (dFrameContents) - Total <td>'s Processed: " + dFrameTdList.length);

    var tdMarkerWrapper = document.createElement("section");
    tdMarkerWrapper.id = "td-markers";
    tdMarkerWrapper.className = "debug td-markers-wrapper";
    dFrameContents.body.appendChild(tdMarkerWrapper);
    mFrameContents.body.appendChild(tdMarkerWrapper.cloneNode(true));


    for (let tdEle of dFrameTdList) {
      if ( (tdEle.clientWidth !== 0 && tdEle.clientHeight !== 0) && (tdEle.clientWidth < 650) ) {

        tdCount++

        var tdPos = getPosition(tdEle, dFrameContents);

        var tdMarker = document.createElement("section");
        tdMarker.className = "td-marker";
        tdMarker.style.top = (tdPos.y) + "px";
        tdMarker.style.left = (tdPos.x) + "px";
        tdMarker.dataset.number = tdCount;

        var tdTextNode = document.createTextNode(tdEle.clientWidth + " x " + tdEle.clientHeight);

        // tdMarker.style.width = (tdEle.clientWidth) + "px";
        // tdMarker.style.height = (tdEle.clientHeight) + "px";
        // var tdTextPos = document.createElement("section");
        // tdTextPos.className = "td-dims";
        // tdTextPos.appendChild(tdTextNode);
        // tdMarker.appendChild(tdTextPos);

        tdMarker.appendChild(tdTextNode);
        dFrameContents.getElementById("td-markers").appendChild(tdMarker);

      }
    }

    console.groupEnd();


    let mFrameTdList = mFrameContents.querySelectorAll("td");
    var tdCount = 0

    console.groupCollapsed("<td> Group (mFrame) - Total <td>'s Processed: " + mFrameTdList.length);

    for (let tdEle of mFrameTdList) {
      if ( (tdEle.clientWidth !== 0 && tdEle.clientHeight !== 0) && (tdEle.clientWidth < 650) ) {

        // console.log(tdEle);
        // console.log(tdEle.clientHeight);
        // console.log(tdEle.clientWidth);

        tdCount++

        var tdPos = getPosition(tdEle, mFrameContents);

        var tdMarker = document.createElement("section");
        tdMarker.className = "td-marker";
        tdMarker.style.top = (tdPos.y) + "px";
        tdMarker.style.left = (tdPos.x) + "px";
        tdMarker.dataset.number = tdCount;

        var tdTextNode = document.createTextNode(tdEle.clientWidth + " x " + tdEle.clientHeight);

        // tdMarker.style.width = (tdEle.clientWidth) + "px";
        // tdMarker.style.height = (tdEle.clientHeight) + "px";
        // var tdTextPos = document.createElement("section");
        // tdTextPos.className = "td-dims";
        // tdTextPos.appendChild(tdTextNode);
        // tdMarker.appendChild(tdTextPos);

        tdMarker.appendChild(tdTextNode);
        mFrameContents.getElementById("td-markers").appendChild(tdMarker);

      }
    }

    console.groupEnd();

  }

  toggleImgDims();
}


//////////
////
////  Create Guides Orb
////
/////////

var guidesOrb = document.createElement("div");
guidesOrb.id = "guides-orb";
guidesOrb.className = "guides-orb orb glyph";
guidesOrb.addEventListener("click", toggleGuides, false);
orbsBottom.appendChild(guidesOrb);
var guidesToggle = false;

function toggleGuides() {

  guidesToggle = !guidesToggle;

  if ( guidesToggle ) {
    history.replaceState(null,null, updateQueryString("guides", "1") );
  } else {
    history.replaceState(null,null, updateQueryString("guides") );
  }

  document.getElementById("guides-orb").classList.toggle("on");

  if ( elExists(dFrameContents.getElementById("alignment-guides")) ) {
    destroy(dFrameContents.getElementById("alignment-guides"));
  } else {

    var guidesStylingWrapper = dFrameContents.createElement("section");
    guidesStylingWrapper.id = "alignment-guides";
    guidesStylingWrapper.className = "debug alignment-guides-wrapper";

      var guidesStyling1 = dFrameContents.createElement("section");
      guidesStyling1.classList.add("alignment-guide");
      guidesStyling1.style.left = "0";
      guidesStyling1.style.right = "0";
      guidesStylingWrapper.appendChild(guidesStyling1);

      var guidesStyling2 = dFrameContents.createElement("section");
      guidesStyling2.classList.add("alignment-guide");
      guidesStyling2.style.left = "589px";
      guidesStyling2.style.right = "0";
      guidesStylingWrapper.appendChild(guidesStyling2);

      var guidesStyling3 = dFrameContents.createElement("section");
      guidesStyling3.classList.add("alignment-guide");
      guidesStyling3.style.left = "619px";
      guidesStyling3.style.right = "0";
      guidesStylingWrapper.appendChild(guidesStyling3);

      var guidesStyling4 = dFrameContents.createElement("section");
      guidesStyling4.classList.add("alignment-guide");
      guidesStyling4.style.left = "0";
      guidesStyling4.style.right = "589px";
      guidesStylingWrapper.appendChild(guidesStyling4);

      var guidesStyling5 = dFrameContents.createElement("section");
      guidesStyling5.classList.add("alignment-guide");
      guidesStyling5.style.left = "0";
      guidesStyling5.style.right = "619px";
      guidesStylingWrapper.appendChild(guidesStyling5);


    dFrameContents.getElementsByTagName("body")[0].appendChild(guidesStylingWrapper);
  }
}

//////////
////
////  Create Nav Up/Down Orb
////
/////////

//
// var navOrb = document.createElement("div");
// navOrb.className = "nav-orb orb dual-orb glyph";
// orbsBottom.appendChild(navOrb);
//
//   var navOrbUp = document.createElement("div");
//   navOrbUp.className = "nav-orb-up orb glyph";
//   navOrbUp.addEventListener("click", navUp, false);
//   navOrb.appendChild(navOrbUp);
//
//   var navOrbDown = document.createElement("div");
//   navOrbDown.className = "nav-orb-down orb glyph";
//   navOrbDown.addEventListener("click", navDown, false);
//   navOrb.appendChild(navOrbDown);
//
//   function navUp() {
//
//     var dFrameScroll = document.getElementById('desktop-view');
//     dFrameScroll.contentWindow.scrollTo(0,0);
//
//     var mFrameScroll = document.getElementById('mobile-view');
//     mFrameScroll.contentWindow.scrollTo(0,0);
//
//   }
//
//   function navDown() {
//
//     var dFrameScroll = document.getElementById('desktop-view');
//     dFrameScroll.contentWindow.scrollTo(0,dFrameContents.body.scrollHeight);
//
//     var mFrameScroll = document.getElementById('mobile-view');
//     mFrameScroll.contentWindow.scrollTo(0,mFrameContents.body.scrollHeight);
//
//   }


//////////
////
////   Create Power Orb (turn off JavaScript)
////
/////////

var powerOrb = document.createElement("a");
powerOrb.className = "power-orb orb glyph";
powerOrb.href = document.URL + "?view=1";
orbsBottom.appendChild(powerOrb);


//////////
////
////   Presentation Orb
////
/////////

var customOrb = document.createElement("div");
customOrb.className = "custom-orb orb glyph";
customOrb.id = "custom-orb";
customOrb.addEventListener("click", togglePresentation, false);
orbsBottom.appendChild(customOrb);
var presentationToggle = false

// document.body.classList.toggle("beta");

function togglePresentation() {

  presentationToggle = !presentationToggle;

  if ( presentationToggle ) {
    history.replaceState(null,null, updateQueryString("presentation", "1") );
  } else {
    history.replaceState(null,null, updateQueryString("presentation") );
  }

  // document.body.classList.toggle("beta");

  // history.replaceState(null,null, updateQueryString("presentation", "1") );

  if ( document.body.classList.contains("presentation-mode") ) {
    paneToggle(1,1);
  } else {
    paneToggle(0,1);
  }

  document.body.classList.toggle("presentation-mode");

  //
  // console.error(Notification.permission);
  //
  // if ( Notification.permission !== "granted" ) {
  //   Notification.requestPermission();
  //   console.error(Notification.permission);
  // } else {
  //   console.error(Notification.permission);
  //   var notification = new Notification('Pending Drafts', {
  //     body: "Hey there! You have pending drafts in MailChimp, get on it!",
  //     requireInteraction: true
  //   });
  // }
  //
  // console.error(Notification.permission);
  //
  // console.log(dFrameContents.body);
  // console.log(dFrameContents.getElementsByTagName("body")[0]);
  //
  // console.log(dFrameContents.body.scrollTop);
  // console.log(dFrameContents.getElementsByTagName("body")[0].scrollTop);
  //
  // var articleNumber = "1";
  // sessionStorage.setItem('article' + articleNumber + "status", "protected");
  // sessionStorage.setItem('article' + articleNumber + "type", "pearl");
  //
  // console.log(+ new Date());
  //
  // var currentdate = new Date();
  // var datetime = "Last Sync: " + currentdate.getDate() + "/"
  //                 + (currentdate.getMonth()+1)  + "/"
  //                 + currentdate.getFullYear() + " @ "
  //                 + currentdate.getHours() + ":"
  //                 + currentdate.getMinutes() + ":"
  //                 + currentdate.getSeconds();
  //
  // console.log(currentdate);
  // console.log(datetime);
  // console.log(currentdate.getHours());
  // console.log(new Date().getHours());
}



//////////
////
////   Create Style Toggle Orb
////
/////////

var styleOrb = document.createElement("div");
styleOrb.className = "style-orb orb glyph";
styleOrb.id = "style-orb";
styleOrb.addEventListener("click", toggleStyles, false);
orbsBottom.appendChild(styleOrb);
var styleToggle = false

function toggleStyles() {

  styleToggle = !styleToggle;

  if ( styleToggle ) {
    history.replaceState(null,null, updateQueryString("style", "0") );
  } else {
    history.replaceState(null,null, updateQueryString("style") );
  }

  if ( styleToggle ) {

    let dStyleSheetEle = dFrameContents.querySelectorAll("style:not(.debug)");
    for (let style of dStyleSheetEle) {
      style.disabled = true;
    }

    let mStyleSheetEle = mFrameContents.querySelectorAll("style:not(.debug)");
    for (let style of mStyleSheetEle) {
      style.disabled = true;
    }

  } else {

    let dStyleSheetEle = dFrameContents.querySelectorAll("style:not(.debug)");
    for (let style of dStyleSheetEle) {
      style.disabled = false;
    }

    let mStyleSheetEle = mFrameContents.querySelectorAll("style:not(.debug)");
    for (let style of mStyleSheetEle) {
      style.disabled = false;
    }

  }

  document.getElementById("style-orb").classList.toggle("on");

}


//////////
////
////  Create Edit Email Orb
////
/////////

var editOrb = document.createElement("div");
editOrb.className = "edit-orb orb glyph";
editOrb.id = "edit-orb";
editOrb.addEventListener("click", editEmail, false);
orbsBottom.appendChild(editOrb);
var editToggle = false

function editEmail() {
  editToggle = !editToggle;
  var editDesktop = dFrameContents.getElementsByTagName('html')[0].contentEditable = editToggle;
  document.getElementById("desktop-view").classList.toggle("editing");
  document.getElementById("edit-orb").classList.toggle("on");
  dFrameBody.focus();
}


//////////
////
////  Create Toggle Images On/Off
////
/////////

var imagesToggleOrb = document.createElement("div");
imagesToggleOrb.className = "images-orb orb glyph";
imagesToggleOrb.id = "images-orb";
imagesToggleOrb.addEventListener("click", toggleImages, false);
orbsBottom.appendChild(imagesToggleOrb);
var imagesToggle = false

function toggleImages() {

  imagesToggle = !imagesToggle;

  if ( imagesToggle ) {
    history.replaceState(null,null, updateQueryString("img", "0") );
  } else {
    history.replaceState(null,null, updateQueryString("img") );
  }

    let dFrameimgList = dFrameContents.querySelectorAll("img");
    for (let img of dFrameimgList) {
      if ( imagesToggle ) {
        img.dataset.src = img.src;
        img.src = "";
      } else {
        img.src = img.dataset.src;
        img.dataset.src = "";
      }
    }

    let dFrameBkgList = dFrameContents.querySelectorAll("[background]");
    for (let bkg of dFrameBkgList) {
      console.log(bkg);
      console.log(bkg.getAttribute("background"));
      if ( imagesToggle ) {
        bkg.dataset.bkgImg = bkg.getAttribute("background");
        bkg.setAttribute("background", "");
        bkg.style.backgroundImage = "";
      } else {
        console.log("ELSE");
        bkg.setAttribute("background", bkg.dataset.bkgImg);
        bkg.style.backgroundImage = "url('" + bkg.dataset.bkgImg + "')";
        bkg.dataset.bkgImg = "";
      }
    }

    let mFrameimgList = mFrameContents.querySelectorAll("img");
    for (let img of mFrameimgList) {
      if ( imagesToggle ) {
        img.dataset.src = img.src;
        img.src = "";
      } else {
        img.src = img.dataset.src;
        img.dataset.src = "";
      }
    }

    let mFrameBkgList = mFrameContents.querySelectorAll("[background]");
    for (let bkg of mFrameBkgList) {
      console.log(bkg);
      console.log(bkg.getAttribute("background"));
      if ( imagesToggle ) {
        bkg.dataset.bkgImg = bkg.getAttribute("background");
        bkg.setAttribute("background", "");
        bkg.style.backgroundImage = "";
      } else {
        console.log("ELSE");
        bkg.setAttribute("background", bkg.dataset.bkgImg);
        bkg.style.backgroundImage = "url('" + bkg.dataset.bkgImg + "')";
        bkg.dataset.bkgImg = "";
      }
    }

  // document.getElementById("desktop-view").classList.toggle("editing");
  document.getElementById("images-orb").classList.toggle("on");
}




//////////
////
//// Image Dimensions
////
/////////

// var imgDimsOrb = document.createElement("div");
// imgDimsOrb.id = "img-dims-orb";
// imgDimsOrb.className = "img-dims-orb orb glyph";
// imgDimsOrb.addEventListener("click", toggleImgDims, false);
// orbsBottom.appendChild(imgDimsOrb);

var imgDimsToggle = false;

function toggleImgDims() {

  imgDimsToggle = !imgDimsToggle;

// Commented out because I've folded this function into the borders function.
  // if ( imgDimsToggle ) {
  //   history.replaceState(null,null, updateQueryString("imgdims", "1") );
  // } else {
  //   history.replaceState(null,null, updateQueryString("imgdims") );
  // }

  // document.getElementById("img-dims-orb").classList.toggle("on");

// Continue...

  dFrameContents.documentElement.classList.toggle("debug-imgdims-highlight");
  mFrameContents.documentElement.classList.toggle("debug-imgdims-highlight");

  //
  // Find <img> dimensions
  //

  // Destory the td markers if they exist, create the wrapper for them if they do not.
  if ( elExists(dFrameContents.getElementById("img-dims-markers")) ) {

    destroy(dFrameContents.getElementById("img-dims-markers"));
    destroy(mFrameContents.getElementById("img-dims-markers"));

  } else {

    // Create wrapper to old all of the dims markers
    var imgDimsWrapper = document.createElement("section");
    imgDimsWrapper.id = "img-dims-markers";
    imgDimsWrapper.className = "debug img-dims-markers-wrapper";
    dFrameContents.body.appendChild(imgDimsWrapper);
    mFrameContents.body.appendChild(imgDimsWrapper.cloneNode(true));


    let dFrameImgDimsList = dFrameContents.querySelectorAll("img");
    var imgDimsCount = 0

    console.groupCollapsed("<img> Group (dFrameContents) - Total <img>'s Processed: " + dFrameImgDimsList.length);
    for (let imgDimsEle of dFrameImgDimsList) {

      imgDimsCount++;

      var imgNaturalWidth = imgDimsEle.naturalWidth;
      var imgNaturalHeight = imgDimsEle.naturalHeight;

      var imgClientWidth = imgDimsEle.clientWidth;
      var imgClientHeight = imgDimsEle.clientHeight;

      var imgPos = getPosition(imgDimsEle, dFrameContents);

      var imgDimsMarker = document.createElement("section");
      imgDimsMarker.className = "img-dims-marker";
      imgDimsMarker.style.top = (imgPos.y) + "px";
      imgDimsMarker.style.left = (imgPos.x) + "px";

      imgDimsMarker.style.width = imgClientWidth + "px";
      imgDimsMarker.style.height = imgClientHeight + "px";

      var imgDimsFontSizeLarge = imgClientWidth * 0.176;
      if ( imgDimsFontSizeLarge > 60 ) {
        imgDimsFontSizeLarge = 60;
      } else if ( imgDimsFontSizeLarge < 12 ) {
        imgDimsFontSizeLarge = 12;
      }

      var imgDimsFontSizeSmall = imgDimsFontSizeLarge * 0.6;
      if ( imgDimsFontSizeSmall < 10 ) {
        imgDimsFontSizeSmall = 10;
      }

      imgDimsMarker.style.fontSize = imgDimsFontSizeLarge + "px";

      var naturalWidthText = "";

      if ( imgNaturalWidth === 0 || imgNaturalHeight === 0 ) {

        if ( imgDimsFontSizeSmall > 18 ) {
          imgDimsFontSizeSmall = 18;
        }
        naturalWidthText = "<section style='font-size:" + imgDimsFontSizeSmall + "px'>?x?</section>";

      } else if ( imgNaturalWidth === imgClientWidth && imgNaturalHeight === imgClientHeight ) {

        if ( imgDimsFontSizeSmall > 18 ) {
          imgDimsFontSizeSmall = 18;
        }
        naturalWidthText = "<section style='font-size:" + imgDimsFontSizeSmall + "px'>full size</section>"

      } else  if ( ( imgNaturalWidth !== 0 || imgNaturalHeight !== 0 ) && (imgNaturalWidth !== imgClientWidth && imgNaturalHeight !== imgClientHeight) ) {

        naturalWidthText = "<section style='font-size:" + imgDimsFontSizeSmall + "px'>" + imgNaturalWidth + "x" + imgNaturalHeight + "</section>"

      }



      imgDimsMarker.innerHTML = "<section><section>" + imgClientWidth + "x" + imgClientHeight + "</section>" + naturalWidthText + "</section>"
      dFrameContents.getElementById("img-dims-markers").appendChild(imgDimsMarker);

      console.log(imgDimsEle);
      console.log("[" + imgDimsCount + "] imgNaturalWidth: " + imgNaturalWidth + ", imgNaturalHeight: " + imgNaturalHeight + ", imgClientWidth: " + imgClientWidth + ", imgNaturalHeight:" + imgNaturalHeight);


      // tdCount++
      //
      // var tdPos = getPosition(tdEle, dFrameContents);
      //
      // var tdMarker = document.createElement("section");
      // tdMarker.className = "td-marker";
      // tdMarker.style.top = (tdPos.y) + "px";
      // tdMarker.style.left = (tdPos.x) + "px";
      // tdMarker.dataset.number = tdCount;
      //
      // var tdTextNode = document.createTextNode(tdEle.clientWidth + " x " + tdEle.clientHeight);
      //
      // tdMarker.appendChild(tdTextNode);
      // dFrameContents.getElementById("td-markers").appendChild(tdMarker);

    }
    console.groupEnd();



    // let mFrameImgDimsList = mFrameContents.querySelectorAll("img");
    // var imgDimsCount = 0
    //
    // console.groupCollapsed("<img> Group (mFrame) - Total <img>'s Processed: " + mFrameImgDimsList.length);
    // for (let imgDimsEle of mFrameImgDimsList) {
    //
    //   imgDimsCount++;
    //
    //   var imgNaturalWidth = imgDimsEle.naturalWidth;
    //   var imgNaturalHeight = imgDimsEle.naturalHeight;
    //
    //   var imgClientWidth = imgDimsEle.clientWidth;
    //   var imgNaturalHeight = imgDimsEle.clientHeight;
    //
    //   console.log(imgDimsEle);
    //   console.log("[" + imgDimsCount + "] imgNaturalWidth: " + imgNaturalWidth + ", imgNaturalHeight: " + imgNaturalHeight + ", imgClientWidth: " + imgClientWidth + ", imgNaturalHeight:" + imgNaturalHeight);
    //
    // }
    // console.groupEnd();

  }

}



//////////
////
////  Create Plain-Text Generator Orb
////
/////////

// var plainTextOrb = document.createElement("div");
// plainTextOrb.className = "plain-text-orb orb glyph";
// plainTextOrb.addEventListener("click", plainText, false);
// orbsBottom.appendChild(plainTextOrb);


function plainText() {

  console.error("totalProtectedArticles: " + totalProtectedArticles);

  if ( typeof(plainTextTingle) == 'undefined' || plainTextTingle == null ) {

    // data-module="preheader"
    // data-module="featured-article"
    // data-module="testimonial"
    // data-module="wildcard"
    // data-module="featured-courses"
    // data-module="bbanner"
    // data-module="sale-banner"
    // data-module="from-the-blog"

    var moduleType = ""
    var plainText = ""

    ////
    //////
    // Iterate through DOM nodes - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of
    let moduleList = domCopy.querySelectorAll("[data-module]");

    console.log(domCopy);

    for (let module of moduleList) {

      var insertText = "";


      console.log(module);
      var moduleType = module.getAttribute("data-module");
      console.log(moduleType);


      if (moduleType === "preheader") {
        var insertText =  module.textContent;
      }

      if (moduleType === "testimonial") {

        var insertText = "\""

        insertText += cleanPlainTxt(module.querySelector("[data-sub-mod='summary']").innerText.replace(/(\t+|\n+)/gi, " ")) + "\"\n\n";
        insertText += module.querySelector("[data-sub-mod='author']").innerText.trim();
        insertText += grabText(module.querySelector("[data-sub-mod='profession']"));

      }

      if (moduleType === "featured-article") {

        console.log( module.querySelector("[data-sub-mod='title']") );

        insertText += module.querySelector("[data-sub-mod='title']").innerText.trim() + "\n"

        if ( elExists(module.querySelector("[data-sub-mod='author']")) ) {
          insertText +=   module.querySelector("[data-sub-mod='author']").innerText.trim() + "\n\n";
        }

        insertText +=  cleanPlainTxt(module.querySelector("[data-sub-mod='summary']").innerText) + "\n\n";

        if ( elExists(module.querySelector("[data-sub-mod='cta']")) ) {
          insertText +=  module.querySelector("[data-sub-mod='cta']").innerText.trim() + "\n";
          insertText +=  module.querySelector("[data-sub-mod='cta'] a").getAttribute("href").trim();
        }

      }

      if (moduleType === "did-you-know") {
        var headline = module.innerText.trim();

        var insertText = headline;
      }

      if (moduleType === "from-the-blog") {
        var insertText = ""

        /// 1

        insertText += module.querySelector("[data-sub-mod='category-title']").innerText.trim() + "\n\n"
        insertText += module.querySelectorAll("[data-sub-mod='title']")[0].innerText.trim() + "\n";

        if ( elExists(module.querySelectorAll("[data-sub-mod='author']")[0]) ) {
          insertText += module.querySelectorAll("[data-sub-mod='author']")[0].innerText.trim() + "\n\n";
        }

        insertText += module.querySelectorAll("[data-sub-mod='title'] a")[0].getAttribute("href").trim() + "\n\n * * * \n\n";

        /// 2

        insertText += module.querySelectorAll("[data-sub-mod='title']")[1].innerText.trim() + "\n";

        if ( elExists(module.querySelectorAll("[data-sub-mod='author']")[1]) ) {
          insertText += module.querySelectorAll("[data-sub-mod='author']")[1].innerText.trim() + "\n\n";
        }

        insertText += module.querySelectorAll("[data-sub-mod='title'] a")[1].getAttribute("href").trim() + "\n\n * * * \n\n";

        /// 3

        insertText += module.querySelectorAll("[data-sub-mod='title']")[2].innerText.trim() + "\n";

        if ( elExists(module.querySelectorAll("[data-sub-mod='author']")[2]) ) {
          insertText += module.querySelectorAll("[data-sub-mod='author']")[2].innerText.trim() + "\n\n";
        }

        insertText += module.querySelectorAll("[data-sub-mod='title'] a")[2].getAttribute("href").trim();
      }

      if (moduleType === "two-column-articles") {
        var insertText = ""
        insertText += module.querySelectorAll("[data-sub-mod='title']")[0].innerText.trim() + "\n";
        insertText += cleanPlainTxt(module.querySelectorAll("[data-sub-mod='summary']")[0].innerText) + "\n\n";
        insertText += module.querySelectorAll("[data-sub-mod='cta']")[0].innerText.trim() + "\n";
        insertText += module.querySelectorAll("[data-sub-mod='cta'] a")[0].getAttribute("href").trim() + "\n\n* * *\n\n";

        insertText += module.querySelectorAll("[data-sub-mod='title']")[1].innerText.trim() + "\n";
        insertText += cleanPlainTxt(module.querySelectorAll("[data-sub-mod='summary']")[1].innerText) + "\n\n";
        insertText += module.querySelectorAll("[data-sub-mod='cta']")[1].innerText.trim() + "\n";
        insertText += module.querySelectorAll("[data-sub-mod='cta'] a")[1].getAttribute("href").trim();
      }

      if (moduleType === "featured-courses") {

        var insertText = ""

        if ( elExists(module.querySelectorAll("[data-sub-mod='all-courses-title']")[0]) ) {
          insertText +=   module.querySelectorAll("[data-sub-mod='all-courses-title']")[0].innerText.trim() + "\n"
          insertText += module.querySelectorAll("[data-sub-mod='all-courses-cta']")[0].innerText.trim() + " (";
          insertText += module.querySelectorAll("[data-sub-mod='all-courses-cta'] a")[0].getAttribute("href").trim() + ")" + "\n\n* * *\n\n";
        }
        ////
        if ( elExists(module.querySelectorAll("[data-sub-mod='course-title']")[0]) ) {
          insertText += module.querySelectorAll("[data-sub-mod='course-title']")[0].innerText.trim() + "\n\n";
        }
        if ( elExists(module.querySelectorAll("[data-sub-mod='author']")[0]) ) {
          insertText += module.querySelectorAll("[data-sub-mod='author']")[0].innerText.trim() + "\n\n";
        }
        insertText += module.querySelectorAll("[data-sub-mod='cta']")[0].innerText.trim() + " ";
        insertText += module.querySelectorAll("[data-sub-mod='cta'] a")[0].getAttribute("href").trim();
        insertText += "\n\n* * *\n\n";
        ////
        if ( elExists(module.querySelectorAll("[data-sub-mod='course-title']")[1]) ) {
          insertText += module.querySelectorAll("[data-sub-mod='course-title']")[1].innerText.trim() + "\n\n";
        }
        if ( elExists(module.querySelectorAll("[data-sub-mod='author']")[1]) ) {
          insertText += module.querySelectorAll("[data-sub-mod='author']")[1].innerText.trim() + "\n\n";
        }
        insertText += module.querySelectorAll("[data-sub-mod='cta']")[1].innerText.trim() + " ";
        insertText += module.querySelectorAll("[data-sub-mod='cta'] a")[1].getAttribute("href").trim();
        insertText += "\n\n* * *\n\n";
        ////
        if ( elExists(module.querySelectorAll("[data-sub-mod='course-title']")[2]) ) {
          insertText += module.querySelectorAll("[data-sub-mod='course-title']")[2].innerText.trim() + "\n\n";
        }
        if ( elExists(module.querySelectorAll("[data-sub-mod='author']")[2]) ) {
          insertText += module.querySelectorAll("[data-sub-mod='author']")[2].innerText.trim() + "\n\n";
        }
        insertText += module.querySelectorAll("[data-sub-mod='cta']")[2].innerText.trim() + " ";
        insertText += module.querySelectorAll("[data-sub-mod='cta'] a")[2].getAttribute("href").trim();

      }

      if (moduleType === "wildcard") {

        var insertText = ""

        if ( elExists(module.querySelector("[data-sub-mod='category-title']")) ) {
          insertText += toTitleCase(module.querySelector("[data-sub-mod='category-title']").innerText.trim()) + "\n\n"
        }

        insertText += module.querySelector("[data-sub-mod='title']").innerText.trim() + "\n";

        if ( elExists(module.querySelector("[data-sub-mod='sub-title']")) ) {
          insertText += module.querySelector("[data-sub-mod='sub-title']").innerText.trim() + "\n";
        }

        if ( elExists(module.querySelector("[data-sub-mod='summary']")) ) {
          insertText += cleanPlainTxt(module.querySelector("[data-sub-mod='summary']").innerText) + "\n\n";
        }

        insertText += module.querySelector("[data-sub-mod='cta']").innerText.trim() + "\n";
        insertText += module.querySelector("[data-sub-mod='cta'] a").getAttribute("href").trim();

      }

      if (moduleType === "bbanner" || moduleType === "tbanner" || moduleType === "banner") {

        var insertText = ""

        if ( elExists(module.querySelector("[data-sub-mod='title']")) ) {
          insertText += module.querySelector("[data-sub-mod='title']").innerText.trim() + "\n";
        }
        if ( elExists(module.querySelector("[data-sub-mod='summary']")) ) {
          insertText += module.querySelector("[data-sub-mod='summary']").innerText.trim() + "\n";
        }
        if ( elExists(module.querySelector("[data-sub-mod='cta']")) ) {
          insertText += "\n" + module.querySelector("[data-sub-mod='cta']").innerText.trim() + "\n";
          insertText += module.querySelector("[data-sub-mod='cta'] a").getAttribute("href").trim();
        }

      }

      if (moduleType === "sale-banner") {

        var insertText = ""

        insertText += module.querySelector("[data-sub-mod='title']").innerText.trim() + "\n";
        insertText += module.querySelector("[data-sub-mod='summary']").innerText.trim() + "\n\n";
        insertText += cleanPlainTxt(module.querySelector("[data-sub-mod='cta']").innerText) + "\n";
        insertText += module.querySelector("[data-sub-mod='cta'] a").getAttribute("href").trim();

      }


      var plainText = plainText + insertText + "\n\n" + "===============================================" + "\n\n";

    }

      console.log(plainText);

      // Create Plain-Text Modal

      // document.body.appendChild(plainTextModal);

      // instanciate new modal
      plainTextTingle = new tingle.modal({
          footer: false,
          stickyFooter: false,
          cssClass: ['fill'],

          onOpen: function() {
              console.log('modal open');
          },
          onClose: function() {
              console.log('modal closed');
              // plainTextTingle.destroy();
          }
      });

      var plainTextContainer = createPlainTextContainer(plainText);
      plainTextTingle.setContent(plainTextContainer);

  }

  var plainTextContainer = document.querySelector(".tingle-modal-box textarea")
  plainTextTingle.open();
  selectElementContents(plainTextContainer);

}

function processModuleText(moduleType) {

  // if () {
  //
  // }

}


///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//////////////////////////// == xxxxxxxxxxxxxxxx == ///////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

/////////////////////////////
/////
/////   QA Bars
/////
/////////////////////////////

function appendQaBar(newBar) {

  newBar.className = "qa-bar"
  newBar.innerHTML = "<div class='qa-title'><div class='qa-icon'></div><div class='qa-text'>Processing...</div></div>"
  qaResults.appendChild(newBar);

}

// After a test has concluded, run this function to update the icon that shows the status.
function applyQaResults(qaBar, status, msg) {
  qaBar.classList.add("finished", status);
  qaBar.querySelector(".qa-text").innerHTML = msg;
}

/////////////
// QA RESULTS Container
/////////////

var qaResults = document.createElement("div");
qaResults.id = "qa-results";
infoBar.appendChild(qaResults);


//////////
////
////  Create Preheader Module
////  https://www.campaignmonitor.com/blog/email-marketing/2015/08/improve-email-open-rates-with-preheader-text/
////
/////////

var preheaderQaBar = document.createElement("div");
preheaderQaBar.id = "qa-preheader";
preheaderQaBar.className = "qa-preheader expanded preheader-wrapper mod-wrapper";
appendQaBar(preheaderQaBar);


var preheader150 = preheader.substring(0, 150).trim();
preheader150 = [preheader150.slice(0, 90), "<span class='preheader-back'>", preheader150.slice(90)].join('') + "</span>"; // http://stackoverflow.com/a/4364902/556079

var preheaderTextPreview = document.createElement("div");
preheaderTextPreview.innerHTML = preheader150;
preheaderTextPreview.className = "preheader-preview-text"
preheaderQaBar.appendChild(preheaderTextPreview);



////
//// Evaluate the preheader to see if it's been updated
////
//// Match the words in the first 90 characters against the rest of the email. Return the total matches as a percentage and throw an error if it's below a certain threshold.
////
////
console.groupCollapsed("Preheader Matching Log");

var preheader90 = cut(preheader, 90);

var textMinusPreheader = preheader.replace(preheader90,"");

var preheader90Pattern = escapeRegExp(preheader90.replace(/\..+/gi, "."));
    preheader90Pattern = new RegExp(preheader90Pattern, "gi");

if ( !preheader90Pattern.test(textMinusPreheader) ) {
  console.log("No exact match found, looking for individual matches. (failed regex: " + preheader90Pattern + ")");

  preheader90 = preheader90.replace(/\b(in|and|a|the|of|or|is|to)\b/gi, "");
  preheader90 = preheader90.replace(/(\!|\,|\.|\:)\s/gi, " ");
  preheader90 = preheader90.trim();
  preheader90 = preheader90.replace(/ +/gi, " ");

  preheader90 = preheader90.split(" ");

  var preheaderTotalWords = preheader90.length;

  var totalPreheaderWordsMatched = 0;

  console.log("Total important words in preheader: " + preheaderTotalWords + " - Word list: " + preheader90);

  console.groupCollapsed("All text minus preheader");
  console.log(textMinusPreheader);
  console.groupEnd();

  for (var i = 0; i < preheaderTotalWords; i++) {

    // var matcher = escapeRegExp(preheader90[i]);
    var wordToMatch = preheader90[i].replace(/(^[^a-zA-Z\d\s]|[^a-zA-Z\d\s]$)/gi, "");
    var  matcher = new RegExp("\\b" + escapeRegExp(wordToMatch) + "\\b", "gi"); // double escape special characters
    // var  matcher = new RegExp("\\b" + escapeRegExp(wordToMatch) + "(\\b|\\r\\n?|\\n|$|<br\s*.*?\/?>)", "gi"); // double escape special characters

    if ( matcher.test(textMinusPreheader) ) {
      totalPreheaderWordsMatched++;
      console.log("Matched (" + totalPreheaderWordsMatched + "): " + wordToMatch + " (regex: " + matcher + ")");
    } else {
      console.error("Unmatched (X): " + wordToMatch + " (regex: " + matcher + ")");
    }

  }

  var matchRating = Math.round(totalPreheaderWordsMatched/preheaderTotalWords*100);

} else {
  console.log("exact match! (successful regex: " + preheader90Pattern + ")");
  var matchRating = 100;
}


var preheaderMatchText = "Preheader at <span class='preheader-match-rating'>" + matchRating + "%</span> Match";

// Test finished, determine status
if ( matchRating > 69 ) {
  applyQaResults(preheaderQaBar, "success", preheaderMatchText);
} else {
  applyQaResults(preheaderQaBar, "error", preheaderMatchText);
}

setTimeout(function() {

  if ( matchRating < 70 ) {
    toast("suppress", "error", "Preheader text may not be updated! <div>Only " + matchRating + "% of the important words in the preheader match the rest of the email.</div>", 0);
    // alertify.error("Preheader text may not be updated! <div>Only " + matchRating + "% of the important words in the preheader match the rest of the email.", 0);
    // preheaderMatchDiv.classList.add("error");
    // preflightErrors++;
    preflightError();
  }
  // preheaderMatchDiv.classList.add("ready");

}, 500);

console.groupEnd();



//////////
////
////  QA Bar: Links
////
/////////

var linksQaBar = document.createElement("div");
linksQaBar.id = "qa-links";
linksQaBar.className = "qa-links";
appendQaBar(linksQaBar);


//////////
////
////  QA Bar: Articles
////
/////////

var articlesQaBar = document.createElement("div");
articlesQaBar.id = "qa-articles";
articlesQaBar.className = "qa-articles";
appendQaBar(articlesQaBar);


//////////
////
////  QA Bar: Audience
////
/////////

// We need to know if an email is going to be sent NS, SUB, or Both/Neither.
// Some link checking relies on this.
// Append a value of -sub, -ns, or ??? (tbd) to the filename to find out the audience.

var audienceQaBar = document.createElement("div");
audienceQaBar.id = "qa-audience";
audienceQaBar.className = "qa-audience";
appendQaBar(audienceQaBar);

if ( emailSubType ) {
  applyQaResults(audienceQaBar, "success", "Audience Value Found");
} else {
  applyQaResults(audienceQaBar, "error", "Audience Value Missing");
}



//////////
////
////  QA Bar: Mobile Layout
////
/////////

var mobileLayoutQaBar = document.createElement("div");
mobileLayoutQaBar.id = "qa-mobile-layout";
mobileLayoutQaBar.className = "qa-mobile-layout";
appendQaBar(mobileLayoutQaBar);

// console.log(mFrameContents.body.scrollWidth);
// console.log(mobileIframe.offsetWidth);

if ( mFrameContents.body.scrollWidth > mobileIframe.offsetWidth ) {
  applyQaResults(mobileLayoutQaBar, "error", "Mobile Layout Too Wide");
} else {
  applyQaResults(mobileLayoutQaBar, "success", "Mobile Layout Approved");
}


//////////
////
////  QA Bar: Zoom Levels
////
/////////

var zoomLevelsQaBar = document.createElement("div");
zoomLevelsQaBar.id = "qa-zoom-levels";
zoomLevelsQaBar.className = "qa-zoom-levels";
appendQaBar(zoomLevelsQaBar);


//////////
////
////  QA Bar: Filsize
////
/////////

// The Gmail limit for emails is 102kb. After that the email will be truncated.

// Inspired by: https://www.sendwithus.com/resources/gmail_size_test
// Uses: - https://stackoverflow.com/a/7343013/556079
//       - https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder

var filesizeQaBar = document.createElement("div");
filesizeQaBar.id = "qa-filesize";
filesizeQaBar.className = "qa-filesize";
appendQaBar(filesizeQaBar);

// We need to calculate the email size.
// Let's take our original HTML (kinda) and make some modifications to try and make its contents more accurate.

  // MailChimp's tracking links are a fairly consistent length. Let's replace all of ours with them.
    htmlForSizeCalc = cleanedOriginalHtml.replace(/(href=".+?"|href='.+?')/gi, 'href="https://medbridgeeducation.us2.list-manage.com/track/click?u=9929f5c1548f4f842c9470a5f&id=620d233a43&e=46a1f0c393"');
  // Let's also remove MailChimp conditionals.
  // If some exist, I should add an alert that explains that.
    var conditionalsExist = htmlForSizeCalc.match(/\*\|.+?\|\*/gi);
      htmlForSizeCalc = htmlForSizeCalc.replace(/\*\|(END|IF).+?\|\*/gi, "");

// Calculate the size with our extra clean string.
var emailSize = Math.round( ( new TextEncoder('utf-8').encode(htmlForSizeCalc).length / 1024 ) * 10 ) / 10;

if ( emailSize > 100 ) {
  if ( conditionalsExist ) {
    applyQaResults(filesizeQaBar, "error", "Email Too Big* (~" + emailSize + " Kb)");
  } else {
    applyQaResults(filesizeQaBar, "error", "Email Too Big (~" + emailSize + " Kb)");
  }
} else {
  applyQaResults(filesizeQaBar, "success", "Email is ~" + emailSize + " Kb");
}

//////////
////
////  QA Bar: Citations
////
/////////

var citationsQaBar = document.createElement("div");
citationsQaBar.id = "qa-citations";
citationsQaBar.className = "qa-citations";
appendQaBar(citationsQaBar);


//////////
////
////  QA Bar: Images
////
/////////

var imagesQaBar = document.createElement("div");
imagesQaBar.id = "qa-images";
imagesQaBar.className = "qa-images";
appendQaBar(imagesQaBar);


//////////
////
////  QA Bar: Text Warnings
////
/////////

var textWarningsQaBar = document.createElement("div");
textWarningsQaBar.id = "qa-text-warnings";
textWarningsQaBar.className = "qa-text-warnings";
appendQaBar(textWarningsQaBar);


//////////
////
////  QA Bar: Spelling Errors
////
/////////

var spellcheckQaBar = document.createElement("div");
spellcheckQaBar.id = "qa-spellcheck";
spellcheckQaBar.className = "qa-spellcheck";
appendQaBar(spellcheckQaBar);



/////////
////
////  Create Link Checker Module
////
/////////

    // var linkCheckerWrapper = document.createElement("div");
    // linkCheckerWrapper.id = "link-checker";
    // linkCheckerWrapper.className = "link-checker-wrapper mod-wrapper";
    // infoBar.appendChild(linkCheckerWrapper);
    //
    // var linkCheckerHtml = "<div class='mod mod-link-checker'><div class='title'>MedBridge Links</div><div class='mod-body'></div></div>";
    // linkCheckerWrapper.innerHTML = linkCheckerHtml;
    //
    // var modLinkToggle = document.createElement("div");
    // modLinkToggle.className = "toggle";
    // modLinkToggle.addEventListener("click", toggleLinkMarkers, false);
    // document.querySelector(".mod-link-checker .title").appendChild(modLinkToggle);
    //
    // var linkMarkersToggle = false;
    //
    // function toggleLinkMarkers() {
    //
    //   if ( this.nodeType !== 1 ) {
    //     dFrameContents.getElementById("link-markers").classList.add("on-page-load");
    //   } else if ( dFrameContents.querySelector(".on-page-load") ) {
    //     dFrameContents.getElementById("link-markers").classList.remove("on-page-load");
    //   } else {
    //     dFrameContents.getElementById("link-markers").classList.toggle("hidden");
    //   }
    //
    //   linkMarkersToggle = !linkMarkersToggle;
    //
    //   if ( linkMarkersToggle ) {
    //     history.replaceState(null,null, updateQueryString("links", "0") );
    //   } else {
    //     history.replaceState(null,null, updateQueryString("links") );
    //   }
    //
    // }



//////////
////
////  Create Image Checker Module
////
/////////

    // var imgCheckerWrapper = document.createElement("div");
    // imgCheckerWrapper.id = "img-checker";
    // imgCheckerWrapper.className = "img-checker-wrapper mod-wrapper";
    // infoBar.appendChild(imgCheckerWrapper);
    //
    // var imgCheckerHtml = "<div class='mod mod-img-checker'><div class='title'>Images</div><div class='mod-body'></div></div>";
    // imgCheckerWrapper.innerHTML = imgCheckerHtml;



///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//////////////////////////// == xxxxxxxxxxxxxxxx == ///////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

//
// Modify our page view/style/css based on the querystring before we start modifying dFrame and mFrameContents.
//

if ( getParameterByName("infobar") || getParameterByName("mobile") ) {
  paneToggle(getParameterByName("infobar"), getParameterByName("mobile"));
  console.log("panes modified on page load via querystring");
}

if ( getParameterByName("presentation") === "1" ) {
  togglePresentation();
  console.log("presentation mode on");
}

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//////////////////////////// == xxxxxxxxxxxxxxxx == ///////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

////////////
////////////
////////////
//
//    alertify.js
//    https://github.com/MohammadYounes/AlertifyJS
//
//    Replace with https://github.com/CodeSeven/toastr
//
//
////////////
////////////
////////////

alertify.set('notifier','position', 'bottom-right');



////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////
////     __   __  _______  ___      ___   ______   _______  _______  _______
////     |  | |  ||   _   ||   |    |   | |      | |   _   ||       ||       |
////     |  |_|  ||  |_|  ||   |    |   | |  _    ||  |_|  ||_     _||    ___|
////     |       ||       ||   |    |   | | | |   ||       |  |   |  |   |___
////     |       ||       ||   |___ |   | | |_|   ||       |  |   |  |    ___|
////      |     | |   _   ||       ||   | |       ||   _   |  |   |  |   |___
////       |___|  |__| |__||_______||___| |______| |__| |__|  |___|  |_______|
////
////    Our page layout has been built.
////    Start looking at the code in dFrame to validate links and more.
////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//////////////////////// ==  xxxxxxxxxxxxxxx  == //////////////////////////////
//////////////////////// ==                   == //////////////////////////////
//////////////////////// ==  ZOOM LEVEL CHECK == //////////////////////////////
//////////////////////// ==                   == //////////////////////////////
//////////////////////// ==  xxxxxxxxxxxxxxx  == //////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////


var zoomLevelChecked = false;
function checkZoomLevel() {
// https://stackoverflow.com/a/6365777/556079
// https://stackoverflow.com/a/6365777/556079

  // var screenCssPixelRatio = (window.outerWidth - 8) / window.innerWidth;
  // var zoomLevel;
  // if (screenCssPixelRatio <= .34) {
  //   zoomLevel = "-6+";
  // } else if (screenCssPixelRatio <= .44) {
  //   zoomLevel = "-5";
  // } else if (screenCssPixelRatio <= .54) {
  //   zoomLevel = "-4";
  // } else if (screenCssPixelRatio <= .64) {
  //   zoomLevel = "-3";
  // } else if (screenCssPixelRatio <= .76) {
  //   zoomLevel = "-2";
  // } else if (screenCssPixelRatio <= .92) {
  //   zoomLevel = "-1";
  // } else if (screenCssPixelRatio <= 1.05 && screenCssPixelRatio >= .98) {
  //   zoomLevel = "0";
  // } else if (screenCssPixelRatio <= 1.10) {
  //   zoomLevel = "1";
  // } else if (screenCssPixelRatio <= 1.32) {
  //   zoomLevel = "2";
  // } else if (screenCssPixelRatio <= 1.58) {
  //   zoomLevel = "3";
  // } else if (screenCssPixelRatio <= 1.90) {
  //   zoomLevel = "4";
  // } else if (screenCssPixelRatio <= 2.28) {
  //   zoomLevel = "5";
  // } else if (screenCssPixelRatio >= 2.29) {
  //   zoomLevel = "6+";
  // } else {
  //   zoomLevel = "unknown";
  // }
  //
  //
  // console.log("Zoom Level: " + zoomLevel + " (" + screenCssPixelRatio + ")");


  // console.error(Number(dFrameContents.documentElement.style.zoom));
  // console.error(currentZoomLevel);

  // setTimeout(function(){

    var currentZoomLevel = dFrameContents.documentElement.style.zoom || 1;

    if ( currentZoomLevel && currentZoomLevel <= 0.85 ) {
      zoomLevelChecked = true;
      // console.log("Zoom level checked!");
    }
    console.log("Current Zoom Level:", currentZoomLevel);

  // }, 1000);


}


var zoomCheckStatus = false;
updatePreflightErrorTotal("error", 1); // Zoom level is an error on page load. Only one time! If zoom check is found in sessionsStorage, all of this should be ignored. Or should it? Major changes to HTML should be re-checked at different zoom levels after a page refresh. Figure out what to do here.
checkZoomLevel();



//
// Deprecated. Different modules can now be within what were previously considered top level modules. I now have to manually label modules with [data-mod]. This makes declaring the parent wrapper pointless.
// if ( !elExists(dFrameContents.querySelector("[data-module-wrapper]")) ) {
//   alertify.error("[data-module-wrapper] is missing. <div>Add this data- attribute to the <code>&lt;td&gt;</code> that wraps your main content.</div>", 0);
// }

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//////////////////////////// == xxxxxxxxxxxxxxxx == ///////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

////////////
////////////
////////////
//
//    Iterate Through All Modules
//    https://www.kirupa.com/html5/get_element_position_using_javascript.htm
//    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of
//
////////////
////////////
////////////

var moduleSettingsWrapper = document.createElement("section");
    moduleSettingsWrapper.id = "module-settings";
    moduleSettingsWrapper.className = "debug module-settings-wrapper";
    dFrameContents.documentElement.appendChild(moduleSettingsWrapper);


let moduleList = dFrameContents.querySelectorAll("[data-mod]");
var i = 0

console.groupCollapsed("Modules Group - Total Modules Found: " + moduleList.length);

for (let module of moduleList) {

  i++
  module.dataset.moduleCount = i;
  console.log(i);

  var moduleSettingsMenu = document.createElement("section");
      moduleSettingsMenu.className = "module-menu module-menu-" + i;

  var moduleSettingsMenuEdit = document.createElement("section");
      moduleSettingsMenuEdit.className = "edit";

  var moduleSettingsMenuHide = document.createElement("section");
      moduleSettingsMenuHide.className = "hide";

      moduleSettingsMenu.appendChild(moduleSettingsMenuEdit);
      moduleSettingsMenu.appendChild(moduleSettingsMenuHide);
      moduleSettingsWrapper.appendChild(moduleSettingsMenu);


}

console.groupEnd();

// Check if it exists first. If there were no modules to iterate through than this will be an undefined variable and throw an error.
if (typeof moduleSettingsMenu != 'undefined') {
  moduleSettingsWrapper.appendChild(moduleSettingsMenu);
}




///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
////
////
////    LINK VALIDATION
////
////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

////////////
////////////
////////////
//
//    Iterate Through All Links
//    https://www.kirupa.com/html5/get_element_position_using_javascript.htm
//    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of
//
////////////
////////////
////////////

    ///////////////////////
    ///////////////////////
    ///////////////////////

    ////////
    ////////
    ////////

    // Function to handle creating error markers, error tags (that explain the error), and incrementing the error counter.
    function createLinkErrorRow(link, msg, type, icon) {

      // console.log(link);
      // console.log("[" + link.dataset.number + "] " + link);

      console.error("Error Found: " + msg);

      var linkMarker = dFrameContents.querySelector("#link-markers .link-marker[data-number='" + link.dataset.number + "']")
      // console.log(linkMarker);

      var errorRow = document.createElement("section");
      var errorRowText = document.createElement("section");
          errorRowText.innerHTML = msg
      errorRow.appendChild(errorRowText);

      // Instead of just assuming linkErrorLogNoticeWrapper is the right wrapper, we'll reset it to a variable by checking for this link data number. This is better because any errors that come in asynchronously can now be applied properly.
      var currentErrorWrapper = dFrameContents.querySelector("section.link-errors[data-number='" + link.dataset.number + "'] .link-errors-wrapper");
      // linkErrorLogNoticeWrapper.appendChild(errorRow);
      currentErrorWrapper.appendChild(errorRow);

      if ( type === "warning" ) {

        errorRow.classList.add("warning");
        totalLinkWarnings++

      } else {

        // Increment total preflight errors
        preflightError();
        totalLinkErrors++;

        errorRow.classList.add("error");

        link.dataset.error = "true";
        linkMarker.classList.add("error");

        // totalLinkErrors++
        // linkErrors++
        // totalErrors++

        // Instead of relying on the variables above, read the innerHtml of the linkMarker object. Convert it to a number and increment it. Better for async!
        if ( linkMarker.innerHTML === "" || linkMarker.innerHTML === "0" ) {
          linkMarker.innerHTML = "1";
        } else {
          var currentLinkErrors = Number(linkMarker.innerHTML);
          currentLinkErrors++
          linkMarker.innerHTML = currentLinkErrors;
        }

      }

      if ( icon ) {
        errorRow.classList.add("fontastic-icon", "error-icon-" + icon);
      } else {
        errorRow.classList.add("error-icon-x");
      }

      // console.log(linkErrorLogNoticeWrapper);
      // console.log(currentErrorWrapper);
      // console.log(errorRow);


    }

    ////////
    ////////
    ////////

                  // ///////////
                  // //
                  // //  Variables needed for checking the blog.
                  // //
                  // ///////////
                  //
                  // var totalProtectedArticles = 0;
                  // var blogStatusSuccessArray = [];
                  // var isBlogLoaded = false;
                  // var totalBlogIframesOpen = 0; // Track the total amount of iframes we open to check the blog.
                  //
                  // ///////////
                  // //
                  // //  Function to check the blog for data on an article.
                  // //
                  // ///////////
                  //
                  // function checkTheBlog(linkHref, link) {
                  //
                  //   // If a URL was passed into this function...
                  //   if ( linkHref ) {
                  //
                  //     // Grab the data-number from this link object. We're going to use it with the iframe to track what's going on.
                  //     var blogLinkNumber = link.dataset.number;
                  //
                  //     console.groupCollapsed("Checking blog link for data: [" + blogLinkNumber + "]" + linkHref);
                  //
                  //     // Check if an iframe already exists with this URL by iterating through all relevant iframes in the DOM.
                  //     console.log("Total iFrames currently open: " + totalBlogIframesOpen + " - Now beginning for...let loop to find iframes that have already been loaded.");
                  //
                  //     let blogCheckList = document.querySelectorAll("iframe.blog-check");
                  //
                  //     var iframesFoundinDOM = 0;
                  //     for (let blogIframe of blogCheckList) {
                  //
                  //       iframesFoundinDOM++;
                  //
                  //       console.log("Current iFrame found in the DOM (#" + iframesFoundinDOM + ") during this loop has this src: " + blogIframe.getAttribute("src"));
                  //
                  //       if ( blogIframe.getAttribute("src").replace(/[?&]blog\-check\=.+/gi, "") === linkHref ) {
                  //         isBlogLoaded = true;
                  //         console.log("The current link we're checking MATCHES this iFrame that's already in the DOM.");
                  //       } else {
                  //         isBlogLoaded = false;
                  //         console.log("The current link we're checking DOES NOT MATCH this iFrame that's already in the DOM.");
                  //       }
                  //
                  //     }
                  //     console.log("All iframes (" + iframesFoundinDOM + ") in the DOM have been checked. End of for...let loop.");
                  //
                  //     //
                  //     if ( isBlogLoaded === false ) {
                  //
                  //       // Create an iframe for this link
                  //       totalBlogIframesOpen++
                  //       console.log("Creating an iframe for current link: " + totalBlogIframesOpen + " - " + linkHref);
                  //
                  //       var blogCheck = document.createElement("iframe");
                  //           blogCheck.src = linkHref + "&blog-check=" + blogLinkNumber;
                  //           blogCheck.className = "blog-check blog-check-" + blogLinkNumber;
                  //           blogCheck.id = "iframe-" + blogLinkNumber;
                  //       document.body.appendChild(blogCheck);
                  //
                  //       // Wait X seconds for the blog to send a reply. If it doesn't, throw an error.
                  //       // I thought I needed this, but apparently not! - http://stackoverflow.com/a/9540320/556079
                  //       // (function(link) {
                  //           // setTimeout(function(){console.log(i)}, 1000);
                  //
                  //           var blogTimeout = 25000 + (totalBlogIframesOpen*10000);
                  //           var blogTimeoutStr = blogTimeout.toString();
                  //               blogTimeoutStr = blogTimeoutStr.substring(0, blogTimeoutStr.length-3);
                  //
                  //           console.log(totalBlogIframesOpen + " iframe(s) are open. Setting the blog check timer to " + blogTimeoutStr + " seconds.");
                  //           setTimeout(function(){
                  //             if ( blogStatusSuccessArray.indexOf(processBlogLinkBeingChecked(linkHref) ) > -1 ) {
                  //               console.log("Blog loaded!");
                  //             } else {
                  //               console.log("Blog didn't load after " + blogTimeoutStr + " seconds. Verify the link.");
                  //               console.log(link);
                  //               createLinkErrorRow(link, "Blog took too long to load. Check the link.");
                  //             }
                  //           }, blogTimeout);
                  //       // })(link);
                  //
                  //
                  //
                  //     } else {
                  //       console.log("This link is already loaded in an iframe. End of check on this link.");
                  //     }
                  //
                  //     console.info("Total iFrames now open: " + totalBlogIframesOpen);
                  //
                  //     console.groupEnd();
                  //
                  //   // *No* URL was passed into this function...
                  //   } else {
                  //
                  //     console.log("No linkHref found. Looping through all links.");
                  //
                  //     let freshBlogCheck = dFrameContents.querySelectorAll("a");
                  //     for (let link of freshBlogCheck) {
                  //
                  //       if ( /(after_affiliate_url=blog|blog\/2|\-article|\-blog\/)/gi.test(link.href) && !/p=2503/gi.test(link.href) ) {
                  //         checkTheBlog(link.href, link);
                  //       }
                  //
                  //     }
                  //     console.log("Finished looping through all links.");
                  //   }
                  // }

    ///////////////////////
    ///////////////////////
    ///////////////////////
    ///////////////////////


// Create the wrapper for the link-markers.
var linkMarkerWrapper = document.createElement("section");
linkMarkerWrapper.id = "link-markers";
linkMarkerWrapper.className = "debug link-markers-wrapper";
dFrameContents.documentElement.appendChild(linkMarkerWrapper);

//////
//////
//
// Find and loop through all links
//
/////
/////

// Wait until the desktop iframe has finished loading.
// Images loading in late can alter the layout. Wait until they've loaded in to check the links.
// Links with errors will get a badge that is positioned above them. The layout needs to be solid before we place them.
// desktopIframe.onload = () => {
  // Run the function that will loop through all links.
  // Optional content states that we don't want to check the age of the email while we're link checking.
  linkValidationLoop("false");
// }

function linkValidationLoop(ageCheck) {

      let linkList = dFrameContents.querySelectorAll("a");

      console.groupCollapsed("Links Group for Validation - Total Links Processed: " + linkList.length);

      // Loop through each link on the page first before we validate individually.
      var allLinkUrlsList = [];
      var medbridgeLinkUrlsList = [];

      for (let link of linkList) {

        allLinkUrlsList.push(link.href);

        if ( /medbridge(ed(ucation)?|massage)\.com\//gi.test(link.href) ) {
          medbridgeLinkUrlsList.push(link.href);
        }

      }

      // Grab all MedBridge links and output them to the console for a quick helpful view.
      console.groupCollapsed("All MedBridge Links Listed");
        console.log(medbridgeLinkUrlsList);
      console.groupEnd();


      // Determine if portions of links in -ns emails match each other by finding the most common string and checking against it later when we loop through the links again for validation.
      // This is important for marketing tracking urls, utm_source, and utm_campaign
      //////////////////
      if ( emailSubType === "ns" ) {
        // tracking url
        commonTrkUrl = mostCommonString("tracking", medbridgeLinkUrlsList);
        if ( commonTrkUrl ) {
          commonTrkUrlRegex = new RegExp(escapeRegExp(commonTrkUrl) + "\/?\\?","i");
        }
      }

      // utm_source
      commonUtmSource = mostCommonString("utm_source", medbridgeLinkUrlsList);
      if ( commonUtmSource ) {
        commonUtmSourceRegex = new RegExp(escapeRegExp(commonUtmSource) + "(&|$)","i");
      }
      // utm_campaign
      commonUtmCampaign = mostCommonString("utm_campaign", medbridgeLinkUrlsList);
      if ( commonUtmCampaign ) {
        commonUtmCampaignRegex = new RegExp(escapeRegExp(commonUtmCampaign) + "(&|$)","i");
      }

      // ageCheck = true | false
      //////////////////////////
      console.log("ageCheck is set to: " + ageCheck);



      //////////////////////////////
      //////////////////////////////
      //  Validate Links
      //  Loop through each link and run a validation function on each.
      //////////////////////////////
      //////////////////////////////

      var i = 0
      for (let link of linkList) {

        var linkErrors = 0;
        i++

        validateLinks(link, i);

      }

      console.groupEnd();

      var totalLinksWithErrors = dFrameContents.querySelectorAll(".link-marker.error").length;
      console.log("Links with Errors", totalLinksWithErrors);

      console.log("Combined Link Errors", totalLinkErrors);



      if ( totalLinksWithErrors > 0 ) {
        applyQaResults(linksQaBar, "error", "<b>" + totalLinksWithErrors + "</b> Links with Errors");
      } else {
        applyQaResults(linksQaBar, "success", "All Links Approved");
      }

      // Wait for the desktop iframe to finish loading.
      // Once it's done, run a function that will position our link markers.
      desktopIframe.onload = () => {
        var i = 0
        for (let link of linkList) {
          i++
          positionLinkMarkers(link, i)
        }
      }

}
console.groupEnd();

//////////
//////////
//////////

function positionLinkMarkers(link, i) {

    // Get the position of the current link.
    var linkPosition = getPosition(link, dFrameContents);

    // Find the matching link marker in the DOM.
    var linkMarker = dFrameContents.querySelector("#link-marker-" + i);

    // Check if the position of this link is 0,0. This indicates that it's a hidden link.
    // As a result, our marker will appear at the very top left of the page.
    // Adjust it's position for better visibility.
    if ( linkPosition.y === 0 || linkPosition.x === 0 ) {
      linkMarker.style.top = (linkPosition.y + 20) + "px";
      linkMarker.style.left = (linkPosition.x + 20) + "px";
    } else {
    // Else it's visible, position it just above and to the left of the link.
      linkMarker.style.top = (linkPosition.y - 10) + "px";
      linkMarker.style.left = (linkPosition.x - 10) + "px";
    }

}

function validateLinks(link, i) {

  // Set link to a variable and clean it if it's local.
  var linkHref = link.href;
  if ( /^(file\:|(https?\:\/\/)?localhost)/gi.test(linkHref) ) {
    linkHref = linkHref.replace(/^.+\//gi, "");
  }

  // Making our counter for console.log 2 digits instead of 1. (1 vs 01)
  if ( i < 10 ) {
    var iLog = "0" + i;
  } else { iLog = i; }

  console.groupCollapsed("[" + iLog + "] VALIDATION RESULTS - " + linkHref);
  console.log(link);

  //
  link.classList.add("marked");
  link.dataset.number = i;

  // Create a corresponding link marker (#) for this link and append it to a container
  /////////
  var linkMarker = document.createElement("section");
  linkMarker.id = "link-marker-" + i;
  linkMarker.className = "link-marker";

  linkMarker.dataset.href = linkHref;
  linkMarker.dataset.number = i;
  linkMarker.addEventListener("click", pinLinkMarker, false);
  dFrameContents.getElementById("link-markers").appendChild(linkMarker);

  // Create a container that will hold all of the errors associated with this link.
  /////////
  var linkErrorLog = document.createElement("section");
  linkErrorLog.className = "link-errors";
  linkErrorLog.dataset.number = i;
  linkErrorLog.addEventListener("mousedown", unpinLinkMarker, false);
  insertAfter(linkErrorLog, linkMarker);

  // Create a container for the link href to show with the errors
  /////////
  var linkErrorLogURL = document.createElement("section");
  linkErrorLogURL.className = "link-errors-url";
  linkErrorLogURL.innerHTML = "<div class='link-number'>" + i + "</div>"

  var linkErrorLogURLTextNode = document.createTextNode(linkHref);
  linkErrorLogURL.appendChild(linkErrorLogURLTextNode);
  linkErrorLog.appendChild(linkErrorLogURL);

  var linkErrorLogNoticeWrapper = document.createElement("section");
  linkErrorLogNoticeWrapper.className = "link-errors-wrapper";
  linkErrorLog.appendChild(linkErrorLogNoticeWrapper);


  ////////////////
  ////////////////
  //
  //  TO DO
  //
  //  - Check for medium=email in blog links during sale weeks. Look for -Presale- or -Sale- in filename.
  //  - Same as above, but look at required text for sale periods.
  //  - Verify pearl versus blog by creating an array of all the instructors. Show a warning if no match is found so that I can update the array.
  //  - Count modules and check if the utm_content has the right mod# for each link.
  //
  //
  ////////////////
  ////////////////

  // If this is a merge tag link - MailChimp, SendGrid, or GetResponse link (eg. *|ARCHIVE|* or [weblink] [[email]]
  if ( /^(\*\|.+?\|\*|\*\%7C.+?%7C\*|\[\[?.+\]\]?)/gi.test(linkHref) ) {

      // Links in an email for the GetResponse Platform
      if ( emailPlatform === "gr" && /(\*\|.+?\|\*|\*\%7C.+?%7C\*|\[[^\[\]]+?\][^\]])/gi.test(linkHref) ) { // Look for MailChimp and SendGrid merge tags.
        createLinkErrorRow(link, "wrong merge tag for this platform (" + emailPlatformName + ")");
      }
      // Links in an email for the MailChimp Platform
      else if ( emailPlatform === "mc" && /^\[\[?.+\]\]?/gi.test(linkHref) ) { // Look for SendGrid and GR merge tags.
        createLinkErrorRow(link, "wrong merge tag for this platform (" + emailPlatformName + ")");
      }
      // Links in an email for the SendGrid Platform
      else if ( emailPlatform === "sg" && /(^\[\[.+\]\]|\*\|.+?\|\*|\*\%7C.+?%7C\*)/gi.test(linkHref) ) { // Look for MailChimp and GR merge tags.
        createLinkErrorRow(link, "wrong merge tag for this platform (" + emailPlatformName + ")");
      }

  }

  // All other links
  else if ( !/^mailto/.test(linkHref) ) {

    console.log("url - " + linkHref);

    // Global link testing variables
    var medbridgeEdLink
    if ( /^https?:\/\/([^.]+\.)?medbridge(ed|education)\.com/gi.test(linkHref) ) {
      medbridgeEdLink = true;
    } else {
      medbridgeEdLink = false;
    }

    var massageLink
    if ( /^https?:\/\/(www\.)?medbridgemassage\.com/gi.test(linkHref) ) {
      massageLink = true;
    } else {
      massageLink = false;
    }

    var medbridgeOrMassageLink
    if ( medbridgeEdLink || massageLink ) {
      medbridgeOrMassageLink = true;
    } else {
      medbridgeOrMassageLink = false;
    }

    console.log("medbridgeEdLink - " + medbridgeEdLink);
    console.log("massageLink - " + massageLink);
    console.log("medbridgeOrMassageLink - " + medbridgeOrMassageLink);

    ////
    var blogLink
    if ( medbridgeEdLink && (/\.com\/blog/.test(linkHref) || /url=\/?blog.+?p=/.test(linkHref) || /\-blog(\/|\?)/.test(linkHref) || /after_affiliate_url=blog/.test(linkHref)) ) {
      blogLink = true;
    } else {
      blogLink = false;
    }
    console.log("blogLink - " + blogLink);

    ////
    var articleLink
    if ( (/medbridge(ed|education)\.com\/blog\/20\d\d\//gi.test(linkHref) || /medbridge(ed|education)\.com\/.+?p=\d\d\d/gi.test(linkHref)) && !/p=2503/gi.test(linkHref) ) {
      articleLink = true;
    } else {
      articleLink = false;
    }
    console.log("articleLink - " + articleLink);

    ////
    var isMarketingUrl
    if ( medbridgeOrMassageLink && /\.com\/(gr|mc)?trk\-/gi.test(linkHref) ) {
      isMarketingUrl = true;
    } else {
      isMarketingUrl = false;
    }
    console.log("isMarketingUrl - " + isMarketingUrl);

    // Deprecated. No longer checking for https. - 4/18/17
    // var needsHttps
    // if ( medbridgeOrMassageLink && !blogLink && !articleLink ) {
    //   needsHttps = true;
    // } else {
    //   needsHttps = false;
    // }
    // console.log("needsHttps - " + needsHttps);

    ////
    linkNeedsGoogleTracking = false;
    if ( medbridgeEdLink && !outsideOrg ) {
      linkNeedsGoogleTracking = true;
    } else {
      linkNeedsGoogleTracking = false;
    }
    console.log("linkNeedsGoogleTracking - " + linkNeedsGoogleTracking);

    ////
    var linkNeedsPromoCode
    if ( (emailSubType === "ns" && !outsideOrg && emailDisc !== "ent") && medbridgeOrMassageLink ) {
      linkNeedsPromoCode = true;
    } else {
      linkNeedsPromoCode = false;
    }
    console.log("linkNeedsPromoCode - " + linkNeedsPromoCode);

    ///////////////////////
    ///////////////////////
    ///////////////////////
    ///////////////////////

    ////
    // Validate URL
    // Ignore valid URLs, valid mailto:, and valid MailChimp links ( *|text|* converted to *%7Ctext%7C* )
    // http://stackoverflow.com/a/15734347/556079
    // http://stackoverflow.com/a/3809435/556079
    // Unused - http://stackoverflow.com/questions/161738/what-is-the-best-regular-expression-to-check-if-a-string-is-a-valid-url
    ////
    // WTF IS THIS ===  !/^(http|https):\/\/[^ "]+$/.test(linkHref)


  ///////
  //// Begin Link Check ////
  ///////

  ///////
  // Ignore mailto's and localhost:
  ///////
  ///////
  ///////

    if ( !/\*%7C.+?%7C\*/.test(linkHref) && !/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(linkHref) ) {
      createLinkErrorRow(link, "invalid URL scheme [1]");
    }

    // http://stackoverflow.com/a/9284473/556079
    // https://gist.github.com/dperini/729294
    // Edited by me to allow _ in subdomain.
    // Does not support _ in domain, but it should.
    // Does not support URL's ending with a - but it should.

    else if ( !/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9](?:_|-)*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(linkHref) )
    {
      createLinkErrorRow(link, "invalid URL scheme [2]");
    }

    // Marketing URL's
    // trk = mc, grtrk = getresponse
    if ( emailPlatform === "gr" && linkNeedsPromoCode && !/\.com\/grtrk\-/i.test(linkHref) ) { // Look for MailChimp and SendGrid merge tags.
      createLinkErrorRow(link, "wrong tracking url for this email platform, use grtrk-");
    }


    //////
    ////// Detect the use of merge tags.
    ////// This is different than earlier where detected links that were JUST merge tags. Like [[email]] and *|UNSUB|*

      // Wrong merge tags in a Link for the GetResponse Platform
      if ( emailPlatform === "gr" && /(\*\|.+?\|\*|\*\%7C.+?%7C\*|^\[[A-Za-z0-9]+?\])/gi.test(linkHref) ) { // Look for MailChimp and SendGrid merge tags.
        createLinkErrorRow(link, "wrong merge tag for this platform (" + emailPlatformName + ")");
      }
      // Wrong merge tags in a Link for the MailChimp Platform
      else if ( emailPlatform === "mc" && /^\[\[?.+\]\]?/gi.test(linkHref) ) { // Look for SendGrid and GR merge tags.
        createLinkErrorRow(link, "wrong merge tag for this platform (" + emailPlatformName + ")");
      }

    ///////////////////////
    ///////////////////////
    ///////////////////////
    ///////////////////////


    ////-----------------------------////
    ////
    // Check if it's a link to the blog.
    // Get its "Protected" status and ifs type (pearl or blog).

    // To-Do Notes:
    // ============
    //
    // Dropbox
    //  - Broken on Dropbox: Although we can load blog articles with https into the iframe, they eventually redirect (in ns emails) to an http address. When viewing the email on Dropbox the iframes get blocked because Dropbox can only be loaded with https. The http content gets blocked because it's an insecure resource. Sigh.
    //  - And since sessionsStorage we setup on file:/// doesn't transfer over to files viewed on Dropbox, it's always going to try to check the blog.
    //
    // ---
    //
    // sessionsStorage isn't good enough. I need to minimize my calls to the blog. chrome.storage.local might be necessary.
    // Can I periodically purge chrome.storage.local so that it doesn't get too big?
    //
    // After the affiliate linkback is fixed, I can switch over to uses the actual blog URL. This will allow me the -sub version to not recheck each article because it will be able to look at the same object as -ns does in sessionsStorage.
    //
    // If the tracking link (or any article link) doesn't load the article properly (or at all), a message is never sent to the eventpage and in turn nothing is sent back to the newsletter.
    //
    // Display an indicator that tells me the iframes are still processing. Give the green light once they've all been destroyed.
    //
    // Should I modify so that it only re-checks if I click something?
    // Should I consider looking the date in this files URL to help decide IF I should check?
    // Run the check again AFTER the postMessage comes back.
    // Do not fire alerts until I've determined that no more postMessages are comeing in from the blog.
    // Alerts should reference which article is protected.
    // What if when I land on the blog page and it's protected, and I haven't logged in yet to view the article?
    //  - Return a message where the authorType is ambiguous. Deal with it when you read it back.
    //
    // Definitely create a button to FORCE a recheck of all linked articles. Just in case!
    //
    // Reminders:
    // ==========
    //
    // A blog's author type should never change. As long as it's been set in sessionstorage, I don't need to check the blog more than once for this data.
    // Once unprotected, articles should never go protected. So I don't think I need to bother checking.
    //

    if ( medbridgeOrMassageLink && /(blog\/2|\-article|p=\d\d\d)/gi.test(linkHref) && isRecentEmail && !/p=2503/gi.test(linkHref)) {
      if ( onDropbox ) {
        createLinkErrorRow(link, "cannot check blog while on dropbox.com");
      } else {

        console.groupCollapsed(" - Starting Blog Link Check");

        console.info("This blog link is being published in a recent email.");

        isBlogLoaded = false;

        ////
        ////
        var blogLinkToCheck = processBlogLinkBeingChecked(linkHref);

        //
        console.log("Checking for blogStatus in sessionStorage using this name: " + blogLinkToCheck);

        // Check if this URL is already in sessionStorage
        blogStatus = sessionStorage.getItem(blogLinkToCheck);

        // Run a check on this link using the object we found in sessionStorage.
        if ( blogStatus ) {

          console.log("Found blog data in sessionStorage.");

          // blogStatus exists in sessionStorage. Check the link using data from sessionStorage.
          var blogStatusFromStorage = sessionStorage.getItem(blogLinkToCheck).split(",");
          console.log(blogStatusFromStorage);

          console.log("Checking article link using fnction checkArticleLink(link, blogStatusFromStorage)")
          checkArticleLink(link, blogStatusFromStorage);

          if ( blogStatusFromStorage[2] === "protected" ) {

            createLinkErrorRow(link, "run a blog check to update", "warning");

            // //Article is still protected, open an iframe and check again.
            // if ( getParameterByName("checkblog") !== "0" ) {
            //   checkTheBlog(linkHref);
            // }
          }

        } else {

          // !!!!!!!!!!!!!!!!!!!!
          // 11-3-17
          // COMMENTED OUT UNTIL IT CAN BE FIXED!

          // if ( getParameterByName("checkblog") !== "0" ) {
          //   var updatedLinkObj = link;
          //   checkTheBlog(linkHref, updatedLinkObj);
          //   console.log("Could not find data in storage for this blog link, checking the blog for data.");
          //   createLinkErrorRow(link, "blog data not found in storage, running check now");
          // } else {
          //   console.log("Could not find data in storage for this blog link, no check is being run.");
          //   createLinkErrorRow(link, "blog data not found in storage, refresh to try again");
          // }

        }

        console.groupEnd();
      }
    }

    ////-----------------------------////
    ////
    // Every link needs a target attribute.
    // Deprecated. This is an old idea. It's not needed in mobile or desktop apps. And web clients like Yahoo, Gmail, and Hotmail already open links in a new tab.
          // if ( !link.hasAttribute("target") ) {
          //   createLinkErrorRow(link, "missing target attribute");
          // }

    ////-----------------------------////
    ////
    // Link do NOT need a target attribute.
    if ( link.hasAttribute("target") ) {
      createLinkErrorRow(link, "target attribute not needed");
    }

    ////-----------------------------////
    ////
    // utm's other than content are unlikely to be used

    // !!!! //////////////////// Re-active this when I can make a feature that allows you to ignore it.

    // if ( /utm_(medium|source|campaign)/gi.test(linkHref) ) {
    //   createLinkErrorRow(link, "extra utm's");
    // }

    ////-----------------------------////
    ////
    // MUST HAVE UTM - Check for utm_content on links going to medbridgeeducation.com or medbridgemassage.com. Error if utm_content is not present.
    if ( linkNeedsGoogleTracking && !/utm_content/gi.test(linkHref) ) {
      createLinkErrorRow(link, "missing utm");
    }

    ////-----------------------------////
    ////
    // MUST HAVE UTM - Check for utm_content on links going to medbridgeeducation.com or medbridgemassage.com. Error if utm_content is not present.
    if ( /\.com\/\//gi.test(linkHref) ) {
      createLinkErrorRow(link, "remove extra /");
    }

    ////-----------------------------////
    ////
    // DON'T USE UTM - outsideOrg and off domain urls should not have utms
    if ( /utm_content/gi.test(linkHref) && !linkNeedsGoogleTracking ) {
      createLinkErrorRow(link, "remove utm");
    }

    ////-----------------------------////
    ////
    // Check tracking links to see if the URL is consistent with the rest of the links.
    // eg. If most links say trk-sep-17-davenport, but this one says trk-sep-17-walter, throw an error.
    // The logic for this is resolved higher up where we looped through each link, saved all tracking URLs to an array, and determined the most common.

    if ( emailSubType === "ns" && isMarketingUrl && linkNeedsPromoCode ) {
      if ( !commonTrkUrlRegex.test(linkHref) ) {
        createLinkErrorRow(link, "tracking URL is missing or inconsistent, " + commonTrkUrl + " is more common");
      }
    }

    if ( medbridgeOrMassageLink ) {
      if ( commonUtmSource ) {
        if ( !commonUtmSourceRegex.test(linkHref) ) {
          createLinkErrorRow(link, "utm_source is missing or inconsistent, " + commonUtmSource + " is more common");
        }
      }
      if ( commonUtmCampaign ) {
        if ( !commonUtmCampaignRegex.test(linkHref) ) {
          createLinkErrorRow(link, "utm_campaign is missing or inconsistent, " + commonUtmCampaign + " is more common");
        }
      }
    }

    ////
    // Check for whitelabeling versus www
    if ( outsideOrg && medbridgeEdLink ) {

      if ( /https?:\/\/(www\.)?med/.test(linkHref) ) {
        createLinkErrorRow(link, "missing whitelabeling");
      }
      else if ( ( (emailSubType === "hs" || emailSubType === "eh") && !/\/(encompasshealth|healthsouth)\./i.test(linkHref)) || (emailSubType === "dr" && !/\/drayerpt\./i.test(linkHref)) || (emailSubType === "fox" && !/\/foxrehab\./i.test(linkHref)) ) {
        createLinkErrorRow(link, "incorrect whitelabeling");
      }

    }
    if ( !outsideOrg && medbridgeEdLink && !/https?:\/\/(support\.|www\.|medbridgeed(ucation)?\.com\/)/gi.test(linkHref) ) {
      createLinkErrorRow(link, "remove whitelabeling");
    }

    ////
    // Validate querystring pattern if it looks like there is one

    // http://stackoverflow.com/a/23959662/556079
    // http://rubular.com/r/kyiKS9OlsM

    // Check the query string without any ending hash
    var linkHrefNoHash = linkHref.replace(/\#.+/, "");

    if ( /[^#]+\&.+\=/.test(linkHrefNoHash) || /[^#]+\?.+\=/.test(linkHrefNoHash) && ( !/after_signin_url/.test(linkHrefNoHash) ) ) {

      if ( /\&.+\=/.test(linkHref) && !/\?./.test(linkHref) ) {
        createLinkErrorRow(link, "missing ? in query string");
      }

      if ( /\?[^#]+\?.+\=/.test(linkHref) ) {
        createLinkErrorRow(link, "replace ? with & in query string");
      }

      if ( !/\?([\.\w-]+(=[\!\|\*\:\%\+\.\/\w-]*)?(&[\.\w-]+(=[\*\|\+\.\/\w-]*)?)*)?$/.test(linkHrefNoHash) ) {
        createLinkErrorRow(link, "invalid query string");
      }

    }

    // Leftover & or ? from a removed querystring
    if ( /(\?|&)$/g.test(linkHref) ) {
      createLinkErrorRow(link, "link ending with ? or &");
    }



    ////-----------------------------////
    ////
    if ( linkNeedsPromoCode ) {

      // console.error("hi");

      // Links to MedBridge in -ns emails need to use a marketing URL
      if ( !/\.com\/(gr|mc)?trk\-/gi.test(linkHref) || /\.com\/(signin|courses\/|blog\/)/gi.test(linkHref) ) {
        createLinkErrorRow(link, "use a marketing URL");
      }

      // Spell after_affiliate_url correctly!
      if ( !/\-(blog|article)/gi.test(linkHref) && !/after_affiliate_url/gi.test(linkHref) ) {
        createLinkErrorRow(link, "missing after_affiliate_url");
      }

      // Too many leading /'s' during a redirect can cause a link to not work
      if ( /after_affiliate_url=\/\/+/gi.test(linkHref) ) {
        createLinkErrorRow(link, "too many consecutive /'s'");
      }

      // Watch out for extra hyphens!
      if ( /\-\-.+?after_affiliate_url/gi.test(linkHref) ) {
        createLinkErrorRow(link, "investigate consecutive hyphens");
      }
      // Watch out for extra forward slashes!
      if ( /https?:\/\/.+?\/\//gi.test(linkHref) ) {
        createLinkErrorRow(link, "investigate consecutive forward slashes");
      }

      // console.log("emailDate.getMonth(); " + emailDate.getMonth());

      // Check the date in a tracking URL if the email's filename has a date in it to match against
      if ( emailDate.getMonth() ) {
        var monthPattern = new RegExp("\\/(gr|mc)?trk\\-.*?" + emailMonthAbbr + "\\-", "gi");
        if ( !monthPattern.test(linkHref) ) {
          createLinkErrorRow(link, "link should included '-" + emailMonthAbbr + "-' to match current month");
        }
      }

    }



    ////
    // Is the module # in the utm correct?
    ////

    // console.error("0");
    //
    // console.log("emailSubType: " + emailSubType);
    // console.log("outsideOrg: " + outsideOrg);
    // console.log("medbridgeOrMassageLink: " + medbridgeOrMassageLink);

    if ( linkNeedsGoogleTracking ) {

      var moduleNumber = link.closest("[data-module-count]");

      if ( elExists(moduleNumber) ) {

        var moduleNumber = moduleNumber.getAttribute("data-module-count");
        var moduleNumberMatch = new RegExp("utm_content=mod" + moduleNumber, "gi");

        // mod followed by 1 or 2 digits, followed by - or # or & or the link ends.
        if ( /utm_content=mod\d(\d)?([\-&#]|$)/gi.test(linkHref) ) {

          if ( !moduleNumberMatch.test(linkHref) ) {
            // console.log( "no match: " + !moduleNumberMatch.test(linkHref) );
            createLinkErrorRow(link, "wrong mod #, use " + "mod" + moduleNumber);
          } else {
            // console.log( "match: " + !moduleNumberMatch.test(linkHref) );
          }

        } else {

          createLinkErrorRow(link, "missing or mistyped mod #, use mod" + moduleNumber);

        }
      }
    }

    ////
    // Is color present in the style attribute?
    // Ignore if there's no text, or it's an image (unless that image has alt text).
    ////

        // Get the img child first.
        if ( elExists(link.getElementsByTagName('img')[0]) ) {
          var linkedImg = link.getElementsByTagName('img')[0];
        }

    if ( link.style.color === '' && (link.textContent !== '' || linkedImg.alt !== '' ) ) {
      createLinkErrorRow(link, "missing color in style attribute");
    }

    if ( link.style.textAlign !== '' && linkedImg ) {
      createLinkErrorRow(link, "don't use text-align in links when linking images, it breaks in safari");
    }



    ////
    // Check for old fashioned marketing URLS in sub, ent, or outsideOrg
    if ( (outsideOrg || emailSubType === "sub" || emailDisc === "ent" ) && (medbridgeOrMassageLink && /\.com\/(gr|mc)?trk\-/gi.test(linkHref) || /after_affiliate_url/gi.test(linkHref)) ) {
      createLinkErrorRow(link, "do not use a marketing url");
    }

    ////
    // Check for medium=email in Sale and Presale emails
    if ( (emailSubType === "sub" || !emailAnySale) && /[\?&]medium=email/gi.test(linkHref) ) {

      createLinkErrorRow(link, "remove medium=email");

    }

    else if ( emailSubType === "ns" && !outsideOrg && medbridgeOrMassageLink && ( articleLink || /\-article/gi.test(linkHref) ) ) {

      if ( emailAnySale && !/medium=email/gi.test(linkHref)) { // Any sale email
        createLinkErrorRow(link, "add medium=email");
      }

    }

    ////
    // Check for sub=yes
    ////
    // Check sub emails
    if ( emailSubType === "sub" || outsideOrg ) {

      // sub=yes is required in blog links.
      if ( articleLink && !/sub=yes/gi.test(linkHref) ) {
        createLinkErrorRow(link, "add sub=yes");
      }
      // sub=yes should not be in any other links.
      if ( ( !articleLink && !/\-article/gi.test(linkHref) ) && /sub=yes/gi.test(linkHref) ) {
        createLinkErrorRow(link, "remove sub=yes");
      }

    }

    ////
    // Check for broken article links in sub
    if ( medbridgeEdLink && emailSubType === "sub" && /p=\d\d\d/gi.test(linkHref) && !/\.com\/blog(\/|\?)/gi.test(linkHref) ) {
      createLinkErrorRow(link, "article link is broken");
    }

    ////
    // Check all links in non-subscriber emails for sub=yes, never use it in ns.
    if ( emailSubType === "ns" && /sub=yes/gi.test(linkHref) ) {
      createLinkErrorRow(link, "remove sub=yes");
    }

    ////
    /// DEPREACTED - Phil fixed the blog! 09/2017
    // Use p=#### to force Wordpress to redirect to http.
    // Check for existence of https in blog links in sub version when NOT using p=####
        // if ( blogLink && !linkNeedsPromoCode && /https:\/\//gi.test(linkHref) && !/p=\d\d\d/gi.test(linkHref) ) {
        //   createLinkErrorRow(link, "full blog/article links cannot be https");
        // }

    ////
    // https required
    // DEPRECATED - Links to MedBridge with http automatically switch to https on load. So we don't need to bother specifying.
    // Since blog links require http, its much less maintenance to just make all links http.
    // if ( needsHttps && /http:\//gi.test(linkHref) ) {
    //   createLinkErrorRow(link, "https missing");
    // }

    ////
    // Verify links in A/B emails if it looks like the link is using -a or -b.
    if ( isMarketingUrl && abTesting === "a" && /\-b[\?\/]/i.test(linkHref) ) {
      createLinkErrorRow(link, "fix a/b version");
    }
    if ( isMarketingUrl && abTesting === "b" && /\-a[\?\/]/i.test(linkHref) ) {
      createLinkErrorRow(link, "fix a/b version");
    }
    if ( isMarketingUrl && (abTesting !== "a" && abTesting !== "b") && /\-(a|b)[\?\/]/i.test(linkHref) ) {
      createLinkErrorRow(link, "remove -a/-b");
    }


    ////
    // Link Text Hints
    if ( (/Request (Group|a Demo|Info|EMR Integration)/gi.test(link.textContent) && !/#request\-a\-demo$/i.test(linkHref)) || (!/(Group Pricing|Part of an organization|Request (Group|a Demo|Info|EMR Integration))/gi.test(link.textContent) && /#request\-a\-demo$/i.test(linkHref)) ) {
      createLinkErrorRow(link, "link text does not match url (demo related)");
    }
    if ( /Article/gi.test(link.textContent) && !/(h\/(encompasshealth|healthsouth)\-|\/blog\/|(\?|&)p=\d{4})/gi.test(linkHref) ) {
      createLinkErrorRow(link, "link text does not match url (article related)");
    }

    ////
    // Enterprise
    // Deprecated - Just because a contact is subscribed to our Enterprise solution, doesn't mean that they have all of the enterprise products.
    // if ( medbridgeOrMassageLink && emailSubType === "sub" && emailDisc === "ent" && /request\-a\-demo/gi.test(linkHref) ) {
    //   createLinkErrorRow(link, "no demo requests in enterprise sub");
    // }


    ////
    // outsideOrg and subs should not link to home-exercise-program.
    // Use sign-in/?after_signin_url=patient_care/programs/create
    if ( (outsideOrg || emailSubType === "sub") && /\.com\/home\-exercise\-program/gi.test(linkHref) ) {
      createLinkErrorRow(link, "use <code>sign-in/?after_signin_url=patient_care/programs/create</code>");
    }
    if ( (outsideOrg || emailSubType === "sub") && /patient_care\/programs\/create/gi.test(linkHref) && !/after_signin_url/gi.test(linkHref) ) {
      createLinkErrorRow(link, "use <code>sign-in/?after_signin_url=patient_care/programs/create</code>");
    }
    if ( (!outsideOrg && emailSubType !== "sub") && /patient_care\/programs\/create/gi.test(linkHref) ) {
      createLinkErrorRow(link, "use <code>home-exercise-program</code>");
    }

    ////
    // Tracking URL - Discipline Check

    if ( emailDisc !== "multi" && emailDisc !== "ent" && emailDisc !== null && medbridgeOrMassageLink && !/\/courses\/details\//g.test(linkHref) && isMarketingUrl ) {

      if ( emailDisc === "pt" && !/\-pt(\-(\/?$|.+?(\?|\&)after|$)|\/|\?)/gi.test(linkHref) ) {
        createLinkErrorRow(link, "missing discipline");
      }
      if ( emailDisc === "at" && !/\-at(\-(\/?$|.+?(\?|\&)after|$)|\/|\?)/gi.test(linkHref) ) {
        createLinkErrorRow(link, "missing discipline");
      }
      if ( emailDisc === "ot" && !/\-ot(\-(\/?$|.+?(\?|\&)after|$)|\/|\?)/gi.test(linkHref) ) {
        createLinkErrorRow(link, "missing discipline");
      }
      if ( emailDisc === "slp" && !/\-slp(\-(\/?$|.+?(\?|\&)after|$)|\/|\?)/gi.test(linkHref) ) {
        createLinkErrorRow(link, "missing discipline");
      }
      if ( emailDisc === "other" && !/\-other(\-(\/?$|.+?(\?|\&)after|$)|\/|\?)/gi.test(linkHref) ) {
        createLinkErrorRow(link, "missing discipline");
      }
    }

    // Homepage - Discipline Check
    // Checking NS and SUB.
    if ( emailDisc !== "multi" && emailDisc !== null && !outsideOrg && medbridgeOrMassageLink ) { //&& isMarketingUrl

      if ( (emailDisc !== "pt" && emailDisc !== "other") && (/after_affiliate_url=\/?physical-therapy(&|$)/gi.test(linkHref) || /\.com\/physical-therapy\/?(\?|$)/gi.test(linkHref)) ) {
        createLinkErrorRow(link, "wrong homepage");
      }
      if ( (emailDisc !== "other" && emailDisc !== "lmt") && (/after_affiliate_url=\/(&|$)/gi.test(linkHref) || /\.com\/(\?|$)/gi.test(linkHref)) ) {
        createLinkErrorRow(link, "wrong homepage");
      }
      if ( emailDisc !== "at" && (/after_affiliate_url=\/?athletic-training(&|$)/gi.test(linkHref) || /\.com\/athletic-training\/?(\?|$)/gi.test(linkHref)) ) {
        createLinkErrorRow(link, "wrong homepage");
      }
      if ( emailDisc !== "ot" && (/after_affiliate_url=\/?occupational-therapy(&|$)/gi.test(linkHref) || /\.com\/occupational-therapy\/?(\?|$)/gi.test(linkHref)) ) {
        createLinkErrorRow(link, "wrong homepage");
      }
      if ( emailDisc !== "slp" && (/after_affiliate_url=\/?speech-language-pathology(&|$)/gi.test(linkHref) || /\.com\/speech-language-pathology\/?(\?|$)/gi.test(linkHref)) ) {
        createLinkErrorRow(link, "wrong homepage");
      }
    }


    // Courses Page - Discipline Check
    if ( emailDisc !== "multi" && emailDisc !== null && /#/g.test(linkHref) && /(\.com\/|=\/?)courses/gi.test(linkHref) ) { //  && medbridgeOrMassageLink

      // if ( (emailDisc !== "pt" && emailDisc !== "other") && /#\/?physical-therapy/gi.test(linkHref) ) {
      //   createLinkErrorRow(link, "wrong hashtag");
      // }
      // if ( emailDisc !== "at" && /#\/?athletic/gi.test(linkHref) ) {
      //   createLinkErrorRow(link, "wrong hashtag");
      // }
      // if ( emailDisc !== "ot" && /#\/?occupational-therapy/gi.test(linkHref) ) {
      //   createLinkErrorRow(link, "wrong hashtag");
      // }
      // if ( emailDisc !== "slp" && /#\/?speech-language-pathology/gi.test(linkHref) ) {
      //   createLinkErrorRow(link, "wrong hashtag");
      // }

      if ( (emailDisc === "pt" || emailDisc === "other") && !/#\/?physical-therapy/gi.test(linkHref) ) {
        createLinkErrorRow(link, "wrong hashtag");
      }
      if ( emailDisc === "at" && !/#\/?athletic-training/gi.test(linkHref) ) {
        createLinkErrorRow(link, "wrong hashtag");
      }
      if ( emailDisc === "ot" && !/#\/?occupational-therapy/gi.test(linkHref) ) {
        createLinkErrorRow(link, "wrong hashtag");
      }
      if ( emailDisc === "slp" && !/#\/?speech-language-pathology/gi.test(linkHref) ) {
        createLinkErrorRow(link, "wrong hashtag");
      }
    }



    // Pricing
    // SUB
    if ( medbridgeOrMassageLink && emailSubType === "sub" && /\.com\/pricing/gi.test(linkHref) ) {
      createLinkErrorRow(link, "dont link to pricing in sub");
    }
    // NS
    if ( medbridgeOrMassageLink && emailSubType === "ns" && /pricing/gi.test(linkHref) ) {

      // PT
      if ( emailDisc === "pt" && !/pricing\/pt/gi.test(linkHref) ) {
        createLinkErrorRow(link, "link to pricing/pt");
      }
      // AT
      else if ( emailDisc === "at" && !/pricing\/at/gi.test(linkHref) ) {
        createLinkErrorRow(link, "link to pricing/at");
      }
      // OT
      else if ( emailDisc === "ot" && !/pricing\/ot/gi.test(linkHref) ) {
        createLinkErrorRow(link, "link to pricing/ot");
      }
      // SLP
      else if ( emailDisc === "slp" && !/pricing\/slp/gi.test(linkHref) ) {
        createLinkErrorRow(link, "link to pricing/slp");
      }
      // Other
      else if ( emailDisc === "other" && !/pricing(\/(pt|other)|\/?(&|$))/gi.test(linkHref) ) {
        createLinkErrorRow(link, "link to pricing/other");
      }
      // No Discipline
      else if ( !emailDisc && /pricing\/(pta?|at|ota?|slp|cscs|other)/gi.test(linkHref) ) {
        createLinkErrorRow(link, "link to standard pricing page");
      }

    }


    // Check for unecessary discipline hastags. Should only be used when linking to courses page
    if ( /#\/?(speech-language-pathology|physical-therapy|athletic-training|occupational-therapy)/gi.test(linkHref) && ( !/(_url=courses|\/courses)(#|\/|\?|&|$)/gi.test(linkHref) && !/\/\/(foxrehab|drayerpt)\.medbridgeeducation\.com\/#/gi.test(linkHref) ) ) {
      createLinkErrorRow(link, "unecessary hashtag");
    }


    ////
    // Do not link to medbridgeed.com. Use the full medbridgeeducation.com URL.
    if ( /(\:\/\/|\.)medbridgeed\.com/gi.test(linkHref) ) {
      createLinkErrorRow(link, "use medbridgeeducation.com");
    }

    ////
    // NO //support. in outsideOrg
    if ( /\/support\./gi.test(linkHref) && outsideOrg ) {
      createLinkErrorRow(link, "://support. not allowed in outsideOrg, use mailto:support@medbridgeed.com");
    }

    ////
    // Do not advertise Enterprise products to outsideOrg
    if ( /enterprise/gi.test(linkHref) && outsideOrg ) {
      createLinkErrorRow(link, "do not advertise enterprise to outsideOrg");
    }

  ///////
  //// End Link Check ////
  ///////
  }
  ///////
  ///////

  ////
  console.groupEnd();
  ////
}
//////////
//////////
//////////



///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
////
////    IMG CHECK - UNFINISHED
////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

////
//////
// Iterate through ALL IMAGES - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of
let imgList = dFrameContents.querySelectorAll("img");
var i = 0
console.log("Images", + imgList.length)
for (let img of imgList) {

  i++

  // console.log(img);
  // console.log("[" + i + "] " + img.src);

  img.classList.add("test");

}

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
////
////    GRAMMAR AND VERBIAGE CHECKS
////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

////////////
////////////
////////////
//
//    Highlight words that may be used in error.
//
//    * no success callback supported yet.
//
////////////
////////////
////////////

/*

Text to Search For

ASHA (only in SLP)
AOTA (only in OT)


*/

// Only check words if this is a recent email.
if ( isRecentEmail ) {

  countCitations();

} else {
  console.error("Text was not checked for errors.")
}

function countCitations() {
  console.log( "Citations", dFrameContents.getElementsByTagName('sup').length );
  var asters = (dFrameContents.body.innerText.match(/[^\|]\*[^\|]/g)||[]).length;
  console.log( "Asterisks", asters);
}

// Run a check on all text in the email
highlightTextErrors();



// This function allows findAndReplaceDOMText to exclude matches. This functionality is not built-in to the script so we need this function.
// Visit this closed issue on GitHub for more info: https://github.com/padolsey/findAndReplaceDOMText/issues/64

    function globalRegexWithFilter(regex, filterFn) {
      if (!regex.global) {
        throw new Error('Regex must be global');
      }
      function exec(text) {
        var result = regex.exec(text);
        if (result && !filterFn(result[0])) {
          return exec(text);
        }
        return result;
      }
      return {
        global: true,
        exec: exec
      };
    }

function highlightTextErrors() {
//
// SPAM TRIGGER WORD
//
// Click|Click below|Click here|Click to remove|
findAndReplaceDOMText(dFrameBody, {
  find: /((‘|')?Hidden(’|')? assets|100% free|100% Satisfied|4U|\$\$\$|\bAd\b|Accept credit cards|Acceptance|Act Now!?|Act now!? Don(’|')?t hesitate\!?|Additional income|Addresses on CD|All natural|All new|Amazing stuff|Apply now|Apply Online|As seen on|Auto email removal|Avoid bankruptcy|Bargain|Be amazed|Be your own boss|Beneficiary|Beverage|Big bucks|Bill 1618|Billing address|Brand new pager|Bulk email|Buy direct|Buying judgements|Buying judgments|Cable converter|Call free|Call now|Calling creditors|Can(’|')?t live without|Cancel at any time|Cannot be combined with any other offer|Cards accepted|Cash bonus|Casino|Celebrity|Cell phone cancer scam|Cents on the dollar|Check or money order|Claims|Claims not to be selling anything|Claims to be in accordance with some spam law|Claims to be legal|Clearance|Collect child support|Compare rates|Compete for your business|Confidentially on all orders|Consolidate debt and credit|Consolidate your debt|Copy accurately|Copy DVDs|Credit bureaus|Credit card offers|Cures baldness|Dig up dirt on friends|Direct email|Direct marketing|Do it today|Don(’|')?t delete|Don(’|')?t hesitate|Double your|Double your income|Drastically reduced|Earn \$|Earn extra cash|Earn per week|Easy terms|Eliminate bad credit|Eliminate debt|Email harvest|Email marketing|Expect to earn|Explode your business|Extra income|F r e e|Fantastic deal|Fast cash|Fast Viagra delivery|Financial freedom|Financially independent|For instant access|For just \$|For just \$[0-9]+?|Free access|Free cell phone|Free consultation|Free consultation|Free DVD|Free gift|Free grant money|Free hosting|Free info|Free installation|Free Instant|Free investment|Free leads|Free membership|Free money|Free offer|Free preview|Free priority mail|Free quote|Free sample|Free trial|Free website|Full refund|Get it now|Get out of debt|Get paid|Gift certificate|Give it away|Giving away|Great offer|Have you been turned down\??|Hidden assets|Hidden charges|Home based|Home employment|Homebased business|Human growth hormone|If only it were that easy|Important information regarding|In accordance with laws|Income from home|Increase sales|Increase traffic|Increase your sales|Incredible deal|Info you requested|Information you requested|Insurance|Internet market|Internet marketing|Investment decision|It(’|')?s effective|It(’|')?s effective|Join millions|Join millions of Americans|Laser printer|Life Insurance|Loans|Long distance phone offer|Lose weight|Lose weight spam|Lower interest rate|Lower interest rates|Lower monthly payment|Lower your mortgage rate|Lowest insurance rates|Luxury car|Mail in order form|Make \$|Make money|Marketing solutions|Mass email|Meet singles|Member stuff|Message contains|Message contains disclaimer|Miracle|MLM|Money back|Money making|Month trial offer|More Internet Traffic|Mortgage|Mortgage rates|Multi\-?level marketing|New customers only|New domain extensions|Nigerian|No age restrictions|No catch|No claim forms|No cost|No credit check|No disappointment|No experience|No fees|No gimmick|No hidden|No inventory|No investment|No medical exams|No questions asked|No selling|No strings attached|Not intended|Notspam|Now only|Off shore|Offer expires|Once in lifetime|One hundred percent free|One hundred percent guaranteed|One time|One time mailing|Online biz opportunity|Online degree|Online marketing|Online pharmacy|Opt in|Order now|Order shipped by|Order status|Order today|Orders shipped by|Outstanding values|Passwords|Pennies a day|Please read|Potential earnings|Pre-approved|Print form signature|Print out and fax|Priority mail|Produced and sent out|Promise you|Pure Profits|Real thing|Refinance home|Refinanced home|Removal instructions|Removes wrinkles|Reserves the right|Reverses aging|Risk free|S 1618|Safeguard notice|Satisfaction guaranteed|Save \$|Save big money|Save up to|Score with babes|Search engine listings|Search engines|Section 301|See for yourself|Sent in compliance|Serious cash|Serious only|Shopping spree|Sign up free today|Social security number|Stainless steel|Stock alert|Stock disclaimer statement|Stock pick|Stop snoring|Strong buy|Stuff on sale|Subject to cash|Subject to credit|Supplies are limited|Take action now|Talks about hidden charges|Talks about prizes|Tells you it(’|')?s an ad|The best rates|The following form|They keep your money \– no refund|They(’|')?re just giving it away|This isn(’|')?t (junk|spam|last|a scam)?|Time limited|Trial|Undisclosed recipient|University diplomas|Unsecured (credit|debt)|Unsolicited|US dollars|Vacation|Vacation offers|Valium|Viagra|Viagra and other drugs|Vicodin|Visit our website|Wants credit card|Warranty|We hate spam|We honor all|Web traffic|Weekend getaway|Weight loss|What are you waiting for\??|While supplies last|While you sleep|Who really wins\??|Why pay more\??|Wife|Will not believe your eyes|Work at home|Work from home|Xanax|You are a winner!?|You have been selected|You(’|')?re a Winner!?|Your income)/gi,
  wrap: 'span', wrapClass: "text-error"
});

///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////


// Platform Checks
if ( emailPlatform === "gr" ) {
  // Do not use *|MAILCHIMP|* merge tags with a GetResponse email.
  findAndReplaceDOMText(dFrameBody, {
    find: /(\*\|.+?\|\*|\[[^\[\]]+?\][^\]])/gi,
    wrap: 'span', wrapClass: "text-error"
  });
}

if ( emailPlatform === "mc" ) {
  // Do not use [[getresponse]] merge tags with a MailChimp email.
  findAndReplaceDOMText(dFrameBody, {
    find: /\[\[?.+?\]\]?/gi,
    wrap: 'span', wrapClass: "text-error"
  });
}

if ( emailPlatform === "sg" ) {
  // Do not use *|MAILCHIMP|* merge tags with a GetResponse email.
  findAndReplaceDOMText(dFrameBody, {
    find: /(\*\|.+?\|\*|\[\[.+?\]\])/gi,
    wrap: 'span', wrapClass: "text-error"
  });
}

/////////////////////////////////
////                         ////
////    DISCIPLINE CHECKS    ////
////                         ////
/////////////////////////////////


// Promo Codes
  if ( emailDisc !== "pt" ) {
    findAndReplaceDOMText(dFrameBody, {
      find: /(Promo Code.+?\b[A-Za-z0-9]+?PT\b)/gi,
      wrap: 'span', wrapClass: "text-error"
    });
  }
  if ( emailDisc !== "at" ) {
    findAndReplaceDOMText(dFrameBody, {
      find: /(Promo Code.+?\b[A-Za-z0-9]+?AT\b)/gi,
      wrap: 'span', wrapClass: "text-error"
    });
  }
  if ( emailDisc !== "ot" ) {
    findAndReplaceDOMText(dFrameBody, {
      find: /(Promo Code.+?\b[A-Za-z0-9]+?OT\b)/gi,
      wrap: 'span',
      wrapClass: "text-error"
    });
  }
  if ( emailDisc !== "slp" ) {
    findAndReplaceDOMText(dFrameBody, {
      find: /(Promo Code.+?\b[A-Za-z0-9]+?SLP\b)/gi,
      wrap: 'span', wrapClass: "text-error"
    });
  }
  if ( emailDisc === "other" ) {
    findAndReplaceDOMText(dFrameBody, {
      find: /(Promo Code.+?\b[A-Za-z0-9]+?(PT|AT|OT|SLP)\b)/gi,
      wrap: 'span', wrapClass: "text-error"
    });
  }

//////////
////
//// Physical Therapy - PT
////
//////////
if ( emailDisc === "pt" || emailDisc === "other" ) {

  findAndReplaceDOMText(dFrameBody, {
    find: /(ASHA|\bAOTA|BOC\-Approved|Athletic Training|Occupational Therapy|(only )?\$95|(only )?\$145)/g,
    wrap: 'span', wrapClass: "text-error"
  });

//////////
////
//// Athletic Training - AT
////
//////////
} else if ( emailDisc === "at" ) {

  findAndReplaceDOMText(dFrameBody, {
    find: /(ASHA|\bAOTA|Physical Therapy|Occupational Therapy|(only )?\$95|(only )?\$145)/g,
    wrap: 'span', wrapClass: "text-error"
  });
  // case-insensitive
  // 11-13-17 - We use this patients and outcomes a lot in AT afterall. Can't justify tagging them.
  // findAndReplaceDOMText(dFrameBody, {
  //   find: /(patients? [^education]|outcomes?)/gi,
  //   wrap: 'span', wrapClass: "text-error"
  // });

//////////
////
//// Occupational Therapy - OT
////
//////////
} else if ( emailDisc === "ot" ) {

  findAndReplaceDOMText(dFrameBody, {
    find: /(ASHA|BOC\-Approved|Physical Therapy|Athletic Training|(only )?\$95|(only )?\$145)/g,
    wrap: 'span', wrapClass: "text-error"
  });
  // case-insensitive
  findAndReplaceDOMText(dFrameBody, {
    find: /home exercise program/gi,
    wrap: 'span', wrapClass: "text-error"
  });

//////////
////
//// Speech Language Pathology - SLP
////
//////////
} else if ( emailDisc === "slp" ) {

  findAndReplaceDOMText(dFrameBody, {
    find: /(\bAOTA|BOC\-Approved|Physical Therapy|Athletic Training|Occupational Therapy|(only )?\$200|(only )?\$250)/g,
    wrap: 'span', wrapClass: "text-error"
  });
  // case-insensitive
  findAndReplaceDOMText(dFrameBody, {
    find: /(patient outcomes?|home exercise program|clinician)/gi,
    wrap: 'span', wrapClass: "text-error"
  });

//////////
////
//// Massage
////
//////////
} else if ( emailDisc === "lmt" ) {

  findAndReplaceDOMText(dFrameBody, {
    find: /(ASHA|\bAOTA|BOC\-Approved|Physical Therapy|CCC\-SLP|\$95|\$145|\$200|\$250)/g,
    wrap: 'span', wrapClass: "text-error"
  });
  // case-insensitive
  findAndReplaceDOMText(dFrameBody, {
    find: /patient engagement tool/gi,
    wrap: 'span', wrapClass: "text-error"
  });

//////////
////
//// Enterprise
////
//////////
} else if ( emailDisc === "ent" ) {
  // Enterprise

  ///

}


//
// ALL
//

  // NOTES ABOUT TEXT WARNINGS ---
  ////////////////////////////////

  // 17-11-06 - Subscribers don't win a free subscription, they win a subscription extension and vice versa for non-subscribers.
  // 17-06-14 - Decided to stop saying "Unlimited CEUs" and instead say "Unlimited Access to CEUs" or "Unlimited CEU Access". We don't literally have unlimited CEUs, but we can provide unlimited ACCESS. Thanks ASHA! -_-
    // - 10/30/17 Update: Per ASHA, "Unlimited Access to CEUs" is still not right. We have to say "Unlimited Access to CE Courses". This only applies to SLP.
  // 17-09-05 - Justin does not like "From the Blog" or even referring to our blog site as a blog at all.

  ////////////////////////////////
  ////////////////////////////////

  // All (case INsensitive)
  findAndReplaceDOMText(dFrameBody, {
    find: /(from the )?blog|Unlimited CEUs(\.|!)|(asha( |\-)(approved|accredited) (ceu|course)s?|at no extra cost|get your ceu|ceu's|\/?[A-Za-z]+>)/gi,
    // Update to add "word &nbsp;&rarr;" as an error
    wrap: 'span', wrapClass: "text-error"
  });
  findAndReplaceDOMText(dFrameBody, {
    find: /(?:(?!\u00a0).{1}|^.{0,0})(\u2192)(?!\u00a0)/g,
    // find: /?:(?!\\u00a0).{6}|^.{0,5})(\\u2192)(?!\\u00a0)/gi,
    wrap: 'span', wrapClass: "text-error"
  });
  // findAndReplaceDOMText(dFrameBody, {
  //   find: //gi,
  //   // find: /?:(?!\\u00a0).{6}|^.{0,5})(\\u2192)(?!\\u00a0)/gi,
  //   wrap: 'span', wrapClass: "text-error"
  // });

  // All (case sensitive)
  findAndReplaceDOMText(dFrameBody, {
    find: /\b[Mm]edbridge( |\.|\!|\?|,)/g,
    wrap: 'span', wrapClass: "text-error"
  });


//
// NUMBERS - MISSING COMMAS
// Ignore numbers that start with 0, the end of phone numbers (-####), common years (1990-1999, 2001-2040), MedBridge address (1633, 98109)
//
  findAndReplaceDOMText(dFrameBody, {
  	find: globalRegexWithFilter(/[^-–:#]\b[1-9]\d\d\d\b/g, function(theMatch) {
    	return !/(98109|1633|199[0-9]|20[0-4][0-9])/g.test(theMatch);
    }),
    wrap: 'span', wrapClass: "text-error"
  })
//
// findAndReplaceDOMText(dFrameBody, {
//   find: /\b[1-9]\d\d\d\b/g,
//   wrap: 'span', wrapClass: "text-error"
// });

//
// PRODUCT CAPITALIZATION
//
findAndReplaceDOMText(dFrameBody, {
  find: /MedBridge ((?:patient [Ee]|Patient e)ngagement|Prep\-program|prep\-[Pp]rogram)/g,
  wrap: 'span', wrapClass: "text-error"
});

//
// Prep-Program
//
findAndReplaceDOMText(dFrameBody, {
  find: /\b(MedBridge|.CS) prep [Pp]rogram\b/g,
  wrap: 'span', wrapClass: "text-error"
});

findAndReplaceDOMText(dFrameBody, {
  find: /\bprep\-programs?\b/gi,
  wrap: 'span', wrapClass: "text-error"
});

//
// Subscriber
//
if ( emailSubType === "sub" ) { // Removed && emailDisc !== "ent"
  findAndReplaceDOMText(dFrameBody, {
    find: /(win a free subscription|Start for Free|\bSubscribe\b|(?:in the (?:annual )?|in the annual MedBridge )subscription|in a(?:n annual|(?:n annual MedBridge)?) subscription|with a(?:n annual|(?:n annual MedBridge)?) subscription)/gi,
    wrap: 'span', wrapClass: "text-error"
  });
}

//
// Non-Subscribers
//
if ( emailSubType === "ns" ) {
  findAndReplaceDOMText(dFrameBody, {
    find: /(Start Now|Refer(\-| )a(\-| )Friend|in(?:cluded with)? your (?:(?:MedBridge )?s|annual (?:MedBridge )?s)ubscription)/gi,
    wrap: 'span', wrapClass: "text-error"
  });
}

//
// outsideOrg
//
if ( outsideOrg ) {

  findAndReplaceDOMText(dFrameBody, {
    find: /additional cost|Refer(\-| )a(\-| )Friend/gi,
    wrap: 'span', wrapClass: "text-error"
  });

  findAndReplaceDOMText(dFrameBody, {
    find: /Enterprise/g,
    wrap: 'span', wrapClass: "text-error"
  });

}

//
// emailAnySale
//
if ( (emailSubType === "ns" || emailSubType === "sub") && !emailAnySale ) {
  findAndReplaceDOMText(dFrameBody, {
    find: /(only )?\$(200|95|145|250)( |!|\.)/gi,
    wrap: 'span', wrapClass: "text-error"
  });
}

//
// Sale Verbiage
//

// MedBridge Pricing
// What was this for?!
// findAndReplaceDOMText(dFrameBody, {
//   find: /([^r] 40% off)/gi,
//   wrap: 'span', wrapClass: "text-error"
// });
if ( emailAnySale && emailDisc !== "lmt" ) {
  findAndReplaceDOMText(dFrameBody, {
    find: /50%/gi,
    wrap: 'span', wrapClass: "text-error"
  });
}
// Massage Pricing
if ( emailAnySale && emailDisc === "lmt" ) {
  findAndReplaceDOMText(dFrameBody, {
    find: /40%/gi,
    wrap: 'span', wrapClass: "text-error"
  });
}


//
// Grammar
//
findAndReplaceDOMText(dFrameBody, {
  find: /evidence based EBP/gi,
  wrap: 'span', wrapClass: "text-error"
});

findAndReplaceDOMText(dFrameBody, {
  find: /evidence\-based EBP/gi,
  wrap: 'span', wrapClass: "text-error"
});


//
// Personalization
//
// findAndReplaceDOMText(dFrameBody, {
//   find: /Valued Customer/gi,
//   wrap: 'span', wrapClass: "text-error"
// });




//
// Enterprise
//
///// Deprecated -  Just because a contact is subscribed to our Enterprise solution, doesn't mean that they have all of the enterprise products.
/////
// if ( emailDisc === "ent" && emailSubType === "sub" ) {
//   findAndReplaceDOMText(dFrameBody, {
//     find: /request a demo/gi,
//     wrap: 'span', wrapClass: "text-error"
//   });
// }


if ( outsideOrg ) {

  findAndReplaceDOMText(dFrameBody, {
    find: /(request a demo|part of an? (group|organization)|sign(\-| )up|\bsubscribe\b)/gi,
    wrap: 'span', wrapClass: "text-error"
  });

}


if ( emailDisc === "slp" ) {

  findAndReplaceDOMText(dFrameBody, {
    find: /Unlimited (Access to )?(CE'?s|CEU'?s)/gi,
    // Must say CE Courses
    wrap: 'span', wrapClass: "text-error"
  });

}


// Check for words that would typically be linked by stupid Gmail. Like "tomorrow" linking to the calendar.
findAndReplaceDOMText(dFrameBody, {
  find: /tomorrow/gi,
  wrap: 'span', wrapClass: "text-error gmail-fix", forceContext: true
});



}
// end function

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//////////////////////////////// == ALERTS == /////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

// Refer-a-Friend Reminder
if ( /Refer(\-| )a(\-| )Friend/gi.test(dFrameContents.body.textContent) ) {
  alertify.error("Refer a Friend<div>Remember update the MailChimp database and use conditional statements to only show Refer a Friend content to eligible contacts.</div>", 0);
}


// if ( !elExists(dFrameContents.querySelector("[data-module-wrapper]")) ) {
//   alertify.error("[data-module-wrapper] is missing. <div>Add this data- attribute to the <code>&lt;td&gt;</code> that wraps your main content.</div>", 0);
// }
// if ( emailSubType === "ns" && ) {
//   findAndReplaceDOMText(dFrameBody, {
//     find: /(Start Now|in (an|your) annual|Register Now|Refer(\-| )a(\-| )Friend)/gi,
//     wrap: 'span',
//     wrapClass: "text-error"
//   });
// }

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////// == PERSISTENT PARAMETERS == /////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////


////////////
////////////
////////////
//
//    URL Querystring settings
//
//    1/30 - Moved further to the bottom of the code because when it was placed earlier, loading a file with styles off (style=0) cause the desktop view to bug out.
//    It didn't seem to understand that the iFrame width wasn't mobile sized thus activating unwated styles.
//
////////////
////////////
////////////

function toggleHelpers() {
  dFrameContents.documentElement.classList.toggle("all-helpers-off");
}

// Turns off link error badges
if ( getParameterByName("helpers") === "0" ) {
  toggleHelpers();
  console.log("helpers off");
}

window.onload = function () {
  // Wait until all images are downloaded before running functions that alter or enhance the email preview.
  // These functions rely on the layout being set in its place.
  // https://stackoverflow.com/a/588048/556079

  if ( getParameterByName("img") === "0" ) {
    toggleImages();
    console.log("images off");
  }

  if ( getParameterByName("style") === "0" ) {
    toggleStyles();
    console.log("style blocks off");
  }

  if ( getParameterByName("showdims") === "1" ) {
    showDims();
    console.log("container outlines shown");
  }

  if ( getParameterByName("links") === "0" ) {
    toggleLinkMarkers();
    console.log("links hidden");
  }

  if ( getParameterByName("imgdims") === "1" ) {
    toggleImgDims();
    console.log("img dimensions revealed");
  }

}

// These functions don't need to wait for the layout to settle down.

if ( getParameterByName("guides") === "1" ) {
  toggleGuides();
  console.log("guides shown");
}


///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
////////////////////////// == SPELL CHECK == //////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////


// 05-25-17 - DEPRECATED
// A recent update to Google Chrome cause the built-in spellchecking feature to no longer function as expected.
// The feature was a bug in chrome. But since it's fixed now, it doesn't work for us.
// Research possible replacements.

//
// function checkSpelling() {
//
//   //Activate Chrome's built-in spellcheck by focusing the cursor and then un-focusing. This works by making the HTML contenteditable and then applying focus. For some reason Chrome keeps the squiggly lines when you unfocus and turn off contenteditable which is great for us because it keeps everything else nice and clean.
//   dFrameContents.getElementsByTagName('html')[0].contentEditable = 'true';
//   dFrameContents.getElementsByTagName('html')[0].classList.add("spellcheck");
//   dFrameBody.focus();
//
//   // For some reason, if contenteditable is turned off too quickly, the red squiggles are sometimes misaligned with the text they are indicating as incorrectly spelled. For this reason we're using a setTimeout here.
//   setTimeout(function() {
//     dFrameContents.getElementsByTagName('html')[0].contentEditable = 'false';
//     dFrameContents.getElementsByTagName('html')[0].classList.remove("spellcheck");
//
//     mFrameContents.getElementsByTagName('html')[0].contentEditable = 'true';
//     mFrameContents.getElementsByTagName('html')[0].classList.add("spellcheck");
//     mFrameContents.getElementsByTagName('body')[0].focus();
//   }, 200);
//
//   setTimeout(function() {
//     mFrameContents.getElementsByTagName('html')[0].contentEditable = 'false';
//     mFrameContents.getElementsByTagName('html')[0].classList.remove("spellcheck");
//
//     document.querySelector('.mod-preheader .mod-body').contentEditable = 'true';
//     document.querySelector('.mod-preheader .mod-body').focus();
//   }, 400);
//
//   setTimeout(function() {
//     document.querySelector('.mod-preheader .mod-body').contentEditable = 'false';
//   }, 600);
//
//   dFrameBody.spellcheck = true;
//
//   console.log("Spell check function complete.");
// }
//
// checkSpelling();




///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//////////////////////////// == xxxxxxxxxxxxxxxx == ///////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

    //////////
            //
            // chrome.runtime.onMessage.addListener(
            //   function(request, sender, sendResponse) {
            //
            //       // console.log("request.greeting: " + request.greeting);
            //       var blogStatusReply = request.greeting.split("|");
            //       console.log("blogStatusReply: ");
            //       console.log(blogStatusReply);
            //
            //       if ( blogStatusReply[1] === "error" ) {
            //
            //       } else {
            //
            //         // console.log("blogStatusReply: " + blogStatusReply);
            //         // console.log("blogStatusReply[4]: " + blogStatusReply[4]);
            //
            //         var blogUrlChecked = document.querySelector("#iframe-" + blogStatusReply[4]).getAttribute("src").replace(/[?&]blog\-check.+/gi, "");
            //
            //
            //         console.log("blogStatusReply[4]: ");
            //         console.log(blogStatusReply[4]);
            //         console.log("blogUrlChecked: " + blogUrlChecked);
            //
            //
            //         blogUrlChecked = processBlogLinkBeingChecked(blogUrlChecked);
            //
            //         blogStatusSuccessArray.push(blogUrlChecked);
            //
            //
            //         // if ( /after_affiliate_url/gi.test(blogUrlChecked) ) {
            //         //   blogUrlChecked = blogUrlChecked.replace(/\&.+/gi, "");
            //         //   console.log("blogUrlChecked: " + blogUrlChecked);
            //         // }
            //         // // New way to link articles in -ns and -sub. Using the p=#### id of the article lets us keep the same link if the URL changes in the future
            //         // else if ( /p=\d\d\d/gi.test(linkHref) ) {
            //         //   console.log("This blog link uses p=#### id for linking.")
            //         //   var blogLinkToCheckArray = linkHref.match(/p=[0-9]*/gi);
            //         //   var blogLinkToCheck = blogLinkToCheckArray[0].replace(/p=/gi,"");
            //         // }
            //         // else {
            //         //   blogUrlChecked = blogUrlChecked.replace(/\?.+/gi, "");
            //         //   console.log("blogUrlChecked: " + blogUrlChecked);
            //         // }
            //
            //         blogUrlChecked = blogUrlChecked.replace(/^https?\:\/\/.+?\//i, "");
            //         blogUrlChecked = blogUrlChecked.replace(/\/$/i, "");
            //
            //         // console.log(blogUrlChecked);
            //         // console.log(blogStatusReply[1] + "|" + blogUrlChecked);
            //
            //         console.log("Saving to sessionStorage: " + blogUrlChecked + " - " + blogStatusReply);
            //         sessionStorage.setItem(blogUrlChecked, blogStatusReply);
            //
            //         destroy(document.querySelector("#iframe-" + blogStatusReply[4]));
            //         // console.log("#iframe-" + blogStatusReply[4] + " destroyed.")
            //
            //       }
            //
            //
            //   }
            // );
            //
            //
            // function processBlogLinkBeingChecked(link) {
            //
            //   console.log("function is processing the blog link being checked: " + link);
            //
            //   // First 'if' handles the blog link when we eventually are allowed to use after_affiliate_url for blog links, this is just future proofing (4/14/17)
            //   // if ( /after_affiliate_url/gi.test(link) ) {
            //   //   console.log("This blog link uses after_affiliate_url for linking.");
            //   //   var blogLinkToCheck = link.replace(/\&.+/gi, "");
            //   //       blogLinkToCheck = blogLinkToCheck.replace(/https?\:\/\/.+?after_affiliate_url\=\/?/gi, "");
            //   //       console.log("in function we set blogLinkToCheck: " + blogLinkToCheck);
            //   // }
            //   // // New way to link articles in -ns and -sub. Using the p=#### id of the article lets us keep the same link if the URL changes in the future
            //   // else
            //
            //   if ( /p=\d\d\d/gi.test(link) ) {
            //     console.log("This blog link uses p=#### id for linking.")
            //     var blogLinkToCheckArray = link.match(/p=[0-9]*/gi);
            //     var blogLinkToCheck = blogLinkToCheckArray[0].replace(/p=/gi,"");
            //         console.log("in function we set blogLinkToCheck: " + blogLinkToCheck);
            //   }
            //   else {
            //     console.log("This blog link uses ??? for linking.");
            //     var blogLinkToCheck = link.replace(/\/?\?.+/gi, "");
            //         blogLinkToCheck = blogLinkToCheck.replace(/https?\:\/\/.+?\//gi, "");
            //         console.log("in function we set blogLinkToCheck: " + blogLinkToCheck);
            //   }
            //
            //   return blogLinkToCheck;
            //
            // }
            //
            // // Need to use this during link checking and again once the postMessages come back. Figure that out.
            // function checkArticleLink(linkObject, blogStatusFromStorage) {
            //
            //   // console.log(link.href);
            //   // console.log(blogStatusFromStorage);
            //
            //   var blogStatusFromStorage = blogStatusFromStorage;
            //   // Check Protects/Unprotected
            //   if ( blogStatusFromStorage[2] === "protected" ) {
            //     createLinkErrorRow(linkObject, "article is protected", "error", "lock");
            //     totalProtectedArticles++;
            //   }
            //   // Check Pearl vs Blog
            //   if ( linkNeedsGoogleTracking ) {
            //     if ( blogStatusFromStorage[3] === "blog" && !/utm_content=.+?\-blog/gi.test(linkObject.href) ) {
            //       createLinkErrorRow(linkObject, "add 'blog' to utm");
            //     } else if ( blogStatusFromStorage[3] === "pearl" && !/utm_content=.+?\-pearl/gi.test(linkObject.href) ) {
            //       createLinkErrorRow(linkObject, "add 'pearl' to utm");
            //     }
            //   }
            //
            //   // console.error(totalProtectedArticles);
            // }
            //
            // // console.error(totalProtectedArticles);
            //
            // if ( totalProtectedArticles > 0 ) {
            //   console.error(totalProtectedArticles);
            //   alertify.error("1 or more articles are protected<div>Remember to unprotect all articles and re-check their status before sending out the newsletter.</div>", 0);
            // }


///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
/////////////////////////// == SCROLL SYNCING == //////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////



dFrameContents.addEventListener('scroll', function(e) {
  syncScroll(dFrameContents, document.querySelector("#desktop-view"));
  // console.groupCollapsed("dFrame is being scrolled");
  // console.log("dFrameContents / targetFrame: ", dFrameContents);
  // console.log("document.querySelector('#desktop-view') / iFrameObj: ", document.querySelector("#desktop-view"));
  // console.groupEnd();
});
mFrameContents.addEventListener('scroll', function(e) {
  syncScroll(mFrameContents, document.querySelector("#mobile-view"));
  // console.log("mFrame is being scrolled");
});

    // dFrameContents.removeEventListener('scroll', makeBackgroundYellow, false);
    // mFrameContents.removeEventListener('scroll', makeBackgroundYellow, false);

function syncScroll(targetFrame, iFrameObj) {

  // console.log("syncScroll function activated.")

  // If this function is called on a frame with "syncing" in the classList, return false.
  if ( iFrameObj.classList.contains("syncing") ) {

    // console.log("'syncing' FOUND in classList of ", iFrameObj);

    iFrameObj.classList.remove("syncing");
    return false;

  // Else, continue running the function to sync scrolling across frames.
  } else {

    // console.log("'syncing' NOT FOUND in classList of ", iFrameObj);

    // Grab relevent variables
    //////////////////////////
    var targetFrameHeight = targetFrame.body.scrollHeight - iFrameObj.clientHeight;

    // DEPRECATED in Chrome 61 ref: https://stackoverflow.com/questions/45061901/chrome-61-body-doesnt-scroll
    // - var targetScrollPos = targetFrame.body.scrollTop;

    var targetScrollPos = targetFrame.scrollingElement.scrollTop;
    var targetScrollPerc = targetScrollPos / targetFrameHeight;

    // console.log("targetFrameHeight: ", targetFrameHeight, "targetScrollPos: ", targetScrollPos, "targetScrollPerc: ", targetScrollPerc);

    // Modify the scrolling position of the frame that we weren't scrolling.
    if ( iFrameObj.id === "desktop-view" ) {
      // var matchingFramePos = (mFrameContents.body.scrollHeight - mFrameContents.body.clientHeight) * targetScrollPerc;
      var matchingFramePos = (mFrameContents.body.scrollHeight - document.querySelector("#mobile-view").clientHeight) * targetScrollPerc;
      var matchingFrameScroll = document.getElementById('mobile-view');
      // console.log("Active: Scrolling Desktop View - targetScrollPerc: " + targetScrollPerc + ", matchingFramePos: " + matchingFramePos);
    } else {
      // var matchingFramePos = (dFrameContents.body.scrollHeight - dFrameContents.body.clientHeight) * targetScrollPerc;
      var matchingFramePos = (dFrameContents.body.scrollHeight - document.querySelector("#desktop-view").clientHeight) * targetScrollPerc;
      var matchingFrameScroll = document.getElementById('desktop-view');
      // console.log("Active: Scrolling Mobile View - targetScrollPerc: " + targetScrollPerc + ", matchingFramePos: " + matchingFramePos);
    }

    matchingFrameScroll.classList.add("syncing");
    matchingFrameScroll.contentWindow.scrollTo(0,matchingFramePos);
  }

}


///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//////////////////////////// == PRE-FLIGHT == /////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////


// Hide rocket and reveal errors in the notifier after a few seconds on initial page load.
// Only reveal it if the tab is active when the settimeout fires.
// Re-try whenever the tab becomes active until it works, then remove the event listener.


// Listen for changes to the pages visibility
  // Page Visibility in 2015 - https://stackoverflow.com/a/6184276/556079
  // You can't remove eventlisteners if the function is anonymous - https://stackoverflow.com/a/10444156/556079 / https://stackoverflow.com/a/5825519/556079
  // Naming a function so that you can pass extra variables and also remove the event later - https://stackoverflow.com/a/16651942/556079
  // Bubbling/false vs Capturing/true - https://stackoverflow.com/a/14807507/556079

window.addEventListener('visibilitychange', activatePreflightNotifier, true);

function activatePreflightNotifier() {

  console.log("activatePreflightNotifier initiated");

  setTimeout(function() {

    // Check if the current tab is visible using the Page Visibility API
    if ( !document.hidden ) { // https://stackoverflow.com/a/12186061/556079

      preflightStatus.classList.remove("initial-load");
      preflightStatus.classList.add("load-finished");

      if ( preflightTotal.textContent === "0" ) {
        preflightNotifierSuccess();
      }

      // Document is visible, remove the eventlistener
      window.removeEventListener('visibilitychange', activatePreflightNotifier, true);
      // window.removeEventListener('visibilitychange', true);

       // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener
      // Events https://developers.google.com/web/tools/chrome-devtools/console/events


    } else {
      // document is hidden, do nothing
    }

  }, 1000);

}
activatePreflightNotifier();


function preflightNotifierSuccess() {
  preflightStatus.classList.remove("error");
  preflightTotal.textContent = "";
  preflightStatus.classList.add("success");
  preflightTotal.classList.add("icomoon", "icomoon-checkmark");
}


function updatePreflightErrorTotal(type, i) {

  console.groupCollapsed("updatePreflightErrorTotal function initiated.")

  var currentValue = parseInt(preflightTotal.innerHTML);

  // Increment total by 1, reduce by 1, or increase by a given integer
  if ( type === "error" ) {
    console.log("Adding " + i + " to total error value.");
    currentValue = currentValue + i;
    preflightTotal.innerHTML = currentValue;
  } else if ( type = "success" ) {
    console.log("Subtracting " + i + " from total error value.");
    currentValue = currentValue - i;
    preflightTotal.innerHTML = currentValue;
  }
  console.log("currentValue: " + currentValue);
  // if ( type === "zoom" ) {
  //   if ( status = true ) {
  //
  //   }
  // }

  // Update Class
  if ( currentValue <= 0 ) {
    preflightNotifierSuccess();
  } else if ( currentValue > 0 ) {
    preflightStatus.classList.add("error");
    preflightStatus.classList.remove("success");
  }

  console.groupEnd();
}



function preflightError() {

  var currentValue = parseInt(preflightTotal.innerHTML);

  currentValue++;

  preflightStatus.classList.add("error");
  preflightTotal.innerHTML = currentValue;
}


///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
////////////////////////// == DRAG TO RESIZE == ///////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

// Drag to Resize
// https://codepen.io/zz85/post/resizing-moving-snapping-windows-with-js-css
// http://codepen.io/zz85/pen/gbOoVP?editors=0100


///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//////////////////////////// == xxxxxxxxxxxxxxxx == ///////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

///////
document.querySelector("html").classList.toggle("errors");

} // END TEST

console.log("// end of newsletter.js");
