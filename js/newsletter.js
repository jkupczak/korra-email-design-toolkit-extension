
////////////////////////////////
////////////////////////////////
////////////////////////////////
////////////////////////////////
////////////////////////////////
////////////////////////////////
// This: https://www.medbridgeeducation.com/h/pivot-physical-therapy-case-study/#request-a-demo
// Versus THis: https://www.medbridgeeducation.com/h/pivot-physical-therapy-case-study#request-a-demo
// Doesn't work without the / before the #. Make a link validator based on this nonsense.
////////////////////////////////
////////////////////////////////
////////////////////////////////
////////////////////////////////
////////////////////////////////



// console.error( "newsletter.js - " + document.documentElement.clientWidth );

console.warn(">>> newsletter.js loaded");

function KeyPress(e) {
// http://keycode.info/
// http://jsfiddle.net/29sVC/
// Consider using https://github.com/madrobby/keymaster

  // console.log("begin function");
  // console.log(evtobj.keyCode);

  var evtobj = window.event? event : e

  // Watch for Chrome zoom shortcuts, cmd/ctrl plus +/-/0
  if ( (e.ctrlKey || e.metaKey) && (evtobj.keyCode == 48 || evtobj.keyCode == 187 || evtobj.keyCode == 189) ) {
    setTimeout(function(){ checkZoomLevel(); }, 100);
  }

}

window.onkeydown = KeyPress;



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
//    ■ - Add multiple width options for the mFrame. 320, 360, 480, iPhone (375, 414) and popular Android specific (all versions, from dropdown menu)
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

// console.log(document);
// console.log(document.body);

  ////
  //////
  // Grab all of the TEXT in the document before we start manipulating the HTML
  var preheader = cleanPlainTxt(document.body.textContent); // http://stackoverflow.com/a/19032002/556079
  // var preheader = cleanPlainTxt(document.body.innerText); // http://stackoverflow.com/a/19032002/556079

  ////
  //////
  // Grab all of the HTML in the document before we start manipulating the HTML
  // var htmlTags = document.body.outerHTML; // http://stackoverflow.com/a/19032002/556079
  // console.log(htmlTags)

  //////
  //// Get the page's HTML and Doctype
  //////
  console.groupCollapsed("doctype");

  var savedDocType = "";

  // We need a doctype first. Reassemble the doctype if there is one in the code.
  if (document.doctype && document.doctype.name) {
    savedDocType = "<!doctype " + document.doctype.name;
    console.log(savedDocType)
    if (document.doctype.publicId) {
      savedDocType += " PUBLIC \"" + document.doctype.publicId;
      console.log(savedDocType)
    }
    if (document.doctype.systemId) {
      savedDocType += "\" \"" + document.doctype.systemId + '">';
      console.log(savedDocType)
    }
    if (!document.doctype.publicId && !document.doctype.systemId) {
      savedDocType += ">";
    }
  }
  console.log(savedDocType)
  console.groupEnd();



  // Create a copy of the original HTML
  var cleanedOriginalHtml = savedDocType;
  cleanedOriginalHtml += document.documentElement.outerHTML;

  // Create the desktop and mobile versions
  var cleanedDesktopHtml = savedDocType;
  var cleanedMobileHtml = savedDocType;

    // Add dFrame.css/dFrame.css
    var toolkitStyle = document.createElement("link");
    toolkitStyle.href = chrome.extension.getURL('css/dFrame.css');
    toolkitStyle.id = "debug-unique-style-block";
    toolkitStyle.className = "debug";
    toolkitStyle.rel = "stylesheet";
    toolkitStyle.type = "text/css";
    document.head.appendChild(toolkitStyle);

    // Add allFrames.css
    var globalToolkitStyle = document.createElement("link");
    globalToolkitStyle.href = chrome.extension.getURL('css/allFrames.css');
    globalToolkitStyle.id = "debug-global-style-block";
    globalToolkitStyle.className = "debug";
    globalToolkitStyle.rel = "stylesheet";
    globalToolkitStyle.type = "text/css";
    document.head.appendChild(globalToolkitStyle);

    // Next add in the document's markup. Everything inside the <html> tag and including the <html> tag.
    cleanedDesktopHtml += document.documentElement.outerHTML;

    document.getElementById("debug-unique-style-block").setAttribute("href", chrome.extension.getURL('css/mFrame.css'))
    cleanedMobileHtml += document.documentElement.outerHTML;

  // Remove all <script> tags. HTML emails cannot have them. We don't design them in there, but if you're viewing this page with Middleman then there will be some injected <script> tags that can cause us issues. These <script> tags allow Middleman to reload the page when changes to the file are made. We don't need them in our dFrame or mFrame potentially mucking things up.
  // Also removes <object> tags. Which is also injected by Middleman (and MM sometimes tries to remove it itself and fails)
  // cleanedOriginalHtml = cleanedOriginalHtml.replace(/<(object|script)\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/(object|script)>/gi, "");

  cleanedOriginalHtml = cleanedOriginalHtml.replace(/<(object|script)\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/(object|script)>/gi, "");
  cleanedDesktopHtml  = cleanedDesktopHtml.replace(/<(object|script)\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/(object|script)>/gi, "");
  cleanedMobileHtml   = cleanedMobileHtml.replace(/<(object|script)\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/(object|script)>/gi, "");

  //////
  //////
  //////


  //////////////////////////////////////////////
  //////////////////////////////////////////////
  //////////////////////////////////////////////
  //////////////////////////////////////////////
  //////////////////////////////////////////////
  ////                                     /////
  ////                                     /////
  ////    MAILCHIMP CONDITIONALS PARSER    /////
  ////                                     /////
  ////                                     /////
  //////////////////////////////////////////////
  //////////////////////////////////////////////
  //////////////////////////////////////////////
  //////////////////////////////////////////////

  // Conditionals Reference
  // http://kb.mailchimp.com/merge-tags/use-conditional-merge-tag-blocks

  // Only parse the conditionals if we see that they are in the plain text HTML
  if ( conditionsParser && cleanedDesktopHtml.match(/\*\|IF:/gi) && cleanedDesktopHtml.match(/\*\|END:IF\|\*/gi)  ) {

      // Remove all linebreaks/newlines from HTML plain text so that we can REGEX more easily.
      cleanedDesktopHtml = cleanedDesktopHtml.trim();
      cleanedDesktopHtml = cleanedDesktopHtml.replace(/(\r\n|\n|\r)/gm,"");

      // Count the total ifs so that we can mark our <condition> tag.
      var totalConditions = 0;

      ////////////////////
      ////////////////////
      ////     IF    /////
      ////////////////////
      ////////////////////
      matchIfs();
      function matchIfs() {

        totalConditions++;

        var ifMatch = cleanedDesktopHtml.match(/\*\|IF:.+?\|\*.+?\*\|/i);
        // ifMatch = ifMatch[0].replace(/\*\|$/, "");
        // console.log(ifMatch);
        // var ifMatch = ifMatch[0].replace(/p=/gi,"");

        // cleanedDesktopHtml = cleanedDesktopHtml.replace(ifMatch, "<if>" + ifMatch[0] + "</if>" );

        var conditionType = getConditionText(ifMatch[0]);

        var modifiedMatch = ifMatch[0].replace(/\*\|$/, "");
        var ifData = ifMatch[0].match(/^\*\|.+?\|\*/);
        modifiedMatch = modifiedMatch.replace(ifData[0], "");

        ifData = ifData[0].replace(/\*\|IF:/gi, "");
        ifData = ifData.replace(/\|\*/gi, "");

        var ifTag = "<if data-step='if' data-type='merge' data-conditions='" + conditionType + "'>"

        cleanedDesktopHtml = cleanedDesktopHtml.replace(ifMatch[0], "<condition data-step='condition' data-condition-count='" + totalConditions + "'>" + ifTag + modifiedMatch + "</if>*|");

        if ( cleanedDesktopHtml.match(/\*\|IF:.+?\|\*.+?\*\|/i) ) {
          console.log("true");
          matchIfs();
        } else {
          console.log("false");
        }
      }


      ////////////////////
      ////////////////////
      ///   END IF   /////
      ////////////////////
      ////////////////////
      // Close <condition> tags
      cleanedDesktopHtml = cleanedDesktopHtml.replace(/\*\|END:IF\|\*/gi, "</condition>");


      ////////////////////
      ////////////////////
      ////  ELSE IF  /////
      ////////////////////
      ////////////////////
      matchElseIfs();
      function matchElseIfs() {

        // Look for instances of *|ELSEIF in the string.
        var ifMatch = cleanedDesktopHtml.match(/\*\|ELSEIF:.+?\|\*.+?(<\/condition>|\*\|ELSE)/i);

        // elseifs aren't required in a condition. If the .match above did not find any, skip this section
        if ( ifMatch !== null ) {

            var conditionType = getConditionText(ifMatch[0]);

            if ( ifMatch[0].endsWith("</condition>") ) {

              var modifiedMatch = ifMatch[0].replace(/^\*\|ELSEIF:/, "");

              var elseifTag = "<elseif data-step='elseif' data-conditions='" + conditionType + "'>";

              var cleanedMatch = modifiedMatch.replace(/.+\|\*/, "");

              cleanedDesktopHtml = cleanedDesktopHtml.replace(ifMatch[0], elseifTag + cleanedMatch + "</elseif>");

            } else {

              var modifiedMatch = ifMatch[0].replace(/^\*\|ELSEIF:/, "");

              var elseifTag = "<elseif data-step='elseif' data-conditions='" + conditionType + "'>";

              var cleanedMatch = modifiedMatch.replace(/.+\|\*/, "");
                  cleanedMatch = cleanedMatch.replace(/\*\|ELSE/, "");

              cleanedDesktopHtml = cleanedDesktopHtml.replace(ifMatch[0], elseifTag + cleanedMatch + "</elseif>*|ELSE");

            }

            if ( cleanedDesktopHtml.match(/\*\|ELSEIF:.+?\|\*.+?(<\/condition>|\*\|ELSE)/i) ) {
              matchElseIfs();
            }

        }
      }

      ////////////////////
      ////////////////////
      ////    ELSE   /////
      ////////////////////
      ////////////////////
      matchElse();
      function matchElse() {
        var ifMatch = cleanedDesktopHtml.match(/\*\|ELSE:\|\*.+?<\/condition>/i);

        var modifiedMatch = ifMatch[0].replace(/^\*\|ELSE:\|\*/, "");

        var cleanedMatch = modifiedMatch.replace(/<\/condition>/, "");

        cleanedDesktopHtml = cleanedDesktopHtml.replace(ifMatch[0], "<else data-step='else'>" + cleanedMatch + "</else></condition>");


        if ( cleanedDesktopHtml.match(/\*\|ELSE:\|\*.+?<\/condition>/i) ) {
          matchElse();
        }
      }

      /////////////////
      /////////////////
      /////////////////
      function getConditionText(string) {

        var conditionText = string.replace(/^\*\|.+?:/, "");
            conditionText = conditionText.replace(/\|\*.+/, "");

        return conditionText;
      }

      console.log(cleanedDesktopHtml);


  } //// End of MailChimp Conditionals Parser
  //////
  //////






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
  insertAfter(newBody, document.head)



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
  var domCopy = document.createElement("iframe");
  domCopy.className = "og-dom";
  document.body.appendChild(domCopy)

  domCopy.contentWindow.document.open();
  domCopy.contentWindow.document.write(cleanedOriginalHtml);
  domCopy.contentWindow.document.close();

  var domCopy = domCopy.contentWindow.document;


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


    // Quick <style> Injection
    // Inject a style block into this iframe via javascript to quickly apply styles on page load. Loading a link to a css file takes a bit to activate. So any styles that are important to have right away should go here. We inject it here instead of adding it inside a .css link because it loads faster. If we used a .css file there would be a flash on page load where the  styles aren't applied yet.
    // http://stackoverflow.com/a/33079951/556079
    //
    // - Prevent flash of contenteditable cursor when spell check is activated.
    //
    var dStyleElement = dFrameContents.createElement("style");
    // Experimenting with position .debug on page load to prevent the scrollbar from jumping around while the HTML waits for dFrame.css to load.
    dStyleElement.appendChild(dFrameContents.createTextNode("html { overflow-y: scroll; } /* .spellcheck body { color:transparent; } */ elseif, else { display: none; }") );
    dFrameContents.getElementsByTagName("head")[0].appendChild(dStyleElement);

    //////////////

    // Add allFrames.js
        var dFrameAllFramesScript = document.createElement("script");
        dFrameAllFramesScript.src = chrome.extension.getURL('js/allFrames.js');
        insertAfter(dFrameAllFramesScript, dFrameContents.body);

    // Add dFrame.js
    var dFrameFrameScript = document.createElement("script");
    dFrameFrameScript.src = chrome.extension.getURL('js/dFrame.js');
    insertAfter(dFrameFrameScript, dFrameContents.body);

  /////////
  /////////
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
    var mFrame = mobileIframe.contentDocument;

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
    var mStyleElement = mFrame.createElement("style");
        mStyleElement.className = "debug";
    mStyleElement.appendChild(mFrame.createTextNode("html::-webkit-scrollbar-track { background:#fbfbfb; } html::-webkit-scrollbar { width:0px; background: transparent; } html::-webkit-scrollbar-thumb { border-radius:10px; background:#a6a6a6; border:4px solid #fbfbfb; } * { cursor:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAARVBMVEUAAABdXV0AAABdXV0bGxtOTk5dXV1dXV1dXV1dXV0uLi4lJSUODg4HBwddXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV04FrOjAAAAF3RSTlOMqACik6NmF5oImZaQjomEWgU5mSE6W6bKrUEAAADNSURBVDjLhZPdEoQgCIXZMEnT/Kn2/R91sR2trXU4d8o3HESAoclkHSbEKehsztsGkMZXE2q6ASnWcEViugK0lMvRKue9U3Ysp4VOYFtLWEGTKsi6VYAmPs7wo5mvJvoCqeRXcJMqLukAYo0/iVgAwpb/4YLEgOb64K+4Uj2AwdPgaYIG8pGgmyIDO9geYNkDwuHQ9QjATXI9wHGzgGv0PcBzlSIgWohFis8UGyW2Wvos8buFgXlLI2fEoZXHXl4cefXk5W0ye13//bL+H4yFCQFUrJO8AAAAAElFTkSuQmCC) 16 16, none; } /* .spellcheck body { color:transparent; } */") );
    mFrame.getElementsByTagName("head")[0].appendChild(mStyleElement);

    // Add allFrames.js
        // var mFrameAllFramesScript = document.createElement("script");
        // mFrameAllFramesScript.src = chrome.extension.getURL('js/allFrames.js');
        // insertAfter(mFrameAllFramesScript, mFrame.body);

    // Add mFrame.js
    var mFrameScript = document.createElement("script");
    mFrameScript.src = chrome.extension.getURL('js/mFrame.js');
    insertAfter(mFrameScript, mFrame.body);


    // Add allFrames.css
    // var allFramesStyles = document.createElement("link");
    // allFramesStyles.href = chrome.extension.getURL('css/allFrames.css');
    // allFramesStyles.rel = "stylesheet";
    // allFramesStyles.type = "text/css";
    // dFrameContents.head.appendChild(allFramesStyles);
    // mFrame.head.appendChild(allFramesStyles.cloneNode(true));


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
///// Get Discipline
///////////
var emailDisc = getDisciplineId(pageUrl);
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
if ( /\-HS\-/gi.test(pageUrl) ) {
  emailSubType = "hs"
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
if ( /\-(HS|DR|Fox)\-/gi.test(pageUrl) ) {
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
var emailDate = getEmailDate(fileName);
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
    mFrame.body.classList.add("disc-" + emailDisc);



//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
////                                              ////
////  Global Functions                            ////
////                                              ////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////


//////////
/////
///// Show dFrame width on window resize
/////
//////////
//// - Update using element watcher when it's available in Chrome: https://jsfiddle.net/atotic/mr47wt1a/

var dFrameWidthStatus = document.createElement("div");
dFrameWidthStatus.id = "desktop-width-status";
dFrameWidthStatus.className = "iframe-width-status";
desktopIframeWrapper.appendChild(dFrameWidthStatus);
var fadeWidthStatus;

window.addEventListener('resize', showdFrameWidthStatus, true);

function showdFrameWidthStatus() {
  dFrameWidthStatus.classList.add("show");
  dFrameWidthStatus.innerHTML = desktopIframe.clientWidth;

  clearTimeout(fadeWidthStatus); //https://www.w3schools.com/jsref/met_win_cleartimeout.asp

  fadeWidthStatus = setTimeout(function() {
    dFrameWidthStatus.classList.remove("show");
  }, 2000);
}

// https://stackoverflow.com/a/39312522/556079





function changeMobileSize(width) {

  if ( typeof width === 'string' || width instanceof String ) {
    console.error(width);
    var widthToSet = width + "px";
    console.log("if");

    document.querySelector(".mobile-iframe-settings .active").classList.remove("active");
    document.querySelector(".mobile-iframe-settings [data-mobile-width='"+ width + "']").classList.add("active");

  } else {

    if (typeof(event) !== "undefined") {
      if (event.target.dataset.mobileWidth !== undefined) {
        var clickedSize = event.target;
        var selectedSize = event.target.dataset.mobileWidth;

        var widthToSet = selectedSize + "px";
        history.replaceState(null,null, updateQueryString("mobilewidth", selectedSize) );

        document.querySelector(".mobile-iframe-settings .active").classList.remove("active");
        clickedSize.classList.add("active");
      }
    }

  }
  mobileDeviceWrapper.style.width = widthToSet
  showdFrameWidthStatus();
}



//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
////                                              ////
////  Newsletter Functions                        ////
////                                              ////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////

function pinLinkMarker() {
  // http://stackoverflow.com/a/8454104/556079
  this.nextSibling.style.display = this.nextSibling.style.display === 'block' ? '' : 'block';
}

function unpinLinkMarker() {
  // http://stackoverflow.com/a/6042235/556079
  var flag = 0;

  this.addEventListener("mousemove", function(){
    flag = 1;
  }, false);

  this.addEventListener("mouseup", function(){
    if(flag === 0){
      this.style.display = "";
    }
  }, false);
}

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
//      Now that dFrame and mFrame have been created we'll build the rest of the layout.
//
//
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
////                                                   ////
////  Create Newsletter Header                         ////
////                                                   ////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////


var headerBar = document.createElement("div");
headerBar.className = "header-bar";
mainContainer.appendChild(headerBar);

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
      headerIcon = "<div class='disc-img svg-'" + emailDisc + "'>" + iconCode + "</div>";
    } else {
      // No discipline found in emailDisc
      headerIcon = "";
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

    // Inject content into the title bar
    pageTitle.innerHTML = headerIcon + headerAudienceText + abTitleIcon + '<div class="email-title"><div class="title-large"><span>' + toTitleCaseRestricted(emailTitle) + '</span></div>' + showEmailDate + '</div>';
    headerBar.appendChild(pageTitle);

/////

var mainMenu = document.createElement("div");
mainMenu.className = "main-menu";

if ( onDropbox ) {
  var navLocalView = '<div id="nav-local-view" class="nav-local-view"><span>Local View</span></div>';
} else {
  var navLocalView = '';
}

mainMenu.innerHTML = '<div id="nav-plain-text" class="nav-item nav-plain-text"><span class="icon"></span><span>Create Plain Text</span></div><div id="nav-share" class="nav-item nav-share"><span class="icon"></span><span>Share</span></div>' + navLocalView + '<div class="nav-item nav-dropbox"><span class="icon"></span><a href="https://www.dropbox.com/work/' + localParentFolder + '">Open in Dropbox</a></div><div class="nav-item nav-settings"><span class="icon"></span><span>Settings</span></div>'
headerBar.appendChild(mainMenu);

// Attach event listenrs
document.querySelector("#nav-plain-text").addEventListener('click', plainText, false);
document.querySelector("#nav-share").addEventListener('click', getDbShareLink, false);

if ( onDropbox ) {
  document.querySelector("#nav-local-view").addEventListener('click', swapUrl, false);
}


// document.querySelector("#nav-dropbox").addEventListener('click', getDbShareLink, false);


// function mainMenuOnClick() {
//   console.log( event.target );
//   console.log( event.currentTarget );
// }

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
    // ...
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

// var shareOrb = document.createElement("div");
// shareOrb.className = "share-orb orb glyph";
// if ( onLocalServer ) { shareOrb.classList.add("off") };
// shareOrb.addEventListener("click", getDbShareLink, false);
// orbsTop.appendChild(shareOrb);


function getDbShareLink() {

  console.groupCollapsed("Dropbox Share Function Initiated");

  var source = this;

  // console.error("getDbShareLink");
  // console.error(this);
  // console.error(event.target);

  if ( !this.classList.contains("loading") ) {

    source.classList.add("loading");

    if ( elExists(document.querySelector("#dropbox-link-text")) ) {

      source.classList.remove("loading");
      copyToClipboard(document.querySelector("#dropbox-link-text"), "success");
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

      var shareableLinkHolder = document.createElement("input");
      shareableLinkHolder.id = "dropbox-link-text"
      shareableLinkHolder.className = "hidden"
      shareableLinkHolder.value = shareableLink;
      document.body.appendChild(shareableLinkHolder);
      copyToClipboard(document.querySelector("#dropbox-link-text"), "success");
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
////  Check Links
////
/////////

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

var blogOrb = document.createElement("div");
blogOrb.id = "blog-orb";
blogOrb.className = "blog-orb orb glyph";
blogOrb.addEventListener("click", runCheckTheBlog, false);
orbsBottom.appendChild(blogOrb);

function runCheckTheBlog() {
  checkTheBlog();
}

//////////
////
////  Zoom Check Orb
////
/////////

var zoomCheckOrb = document.createElement("div");
zoomCheckOrb.id = "zoom-check-orb";
zoomCheckOrb.className = "zoom-check-orb orb glyph icomoon icomoon-search";
zoomCheckOrb.addEventListener("click", zoomCheck, false);
orbsBottom.appendChild(zoomCheckOrb);
var showDimsToggle = false;

function zoomCheck() {

}



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
  } else {
    history.replaceState(null,null, updateQueryString("showdims") );
  }

  document.getElementById("show-dims-orb").classList.toggle("on");

  dFrameContents.documentElement.classList.toggle("debug-show-dims-highlight");
  mFrame.documentElement.classList.toggle("debug-show-dims-highlight");

  // if ( elExists(dFrameContents.getElementById("debug")) ) {
  //   destroy(dFrameContents.getElementById("debug"));
  //   destroy(mFrame.getElementById("debug"));
  // } else {
  //   var debugStylingD = dFrameContents.createElement("style");
  //   debugStylingD.id = "debug";
  //   debugStylingD.appendChild(dFrameContents.createTextNode("") );
  //
  //   var debugStylingM = mFrame.createElement("style");
  //   debugStylingM.id = "debug";
  //   debugStylingM.appendChild(dFrameContents.createTextNode("td { box-shadow: inset 0 0 0 1px rgba(255,0,0,.25); } div:not(.alignment-guide) { box-shadow: inset 0 0 0 2px rgba(0,0,255,.25), 0 0 0 2px rgba(0,0,255,.25); }") );
  //
  //   dFrameContents.getElementsByTagName("head")[0].appendChild(debugStylingD);
  //   mFrame.getElementsByTagName("head")[0].appendChild(debugStylingM);
  // }

  //
  // Find <td> dimensions
  //

  // Destory the td markers if they exist, create the wrapper for them if they do not.
  if ( elExists(dFrameContents.getElementById("td-markers")) ) {

    destroy(dFrameContents.getElementById("td-markers"));
    destroy(mFrame.getElementById("td-markers"));

  } else {

    let dFrameTdList = dFrameContents.querySelectorAll("td");
    var tdCount = 0

    console.groupCollapsed("<td> Group (dFrameContents) - Total <td>'s Processed: " + dFrameTdList.length);

    var tdMarkerWrapper = document.createElement("section");
    tdMarkerWrapper.id = "td-markers";
    tdMarkerWrapper.className = "debug td-markers-wrapper";
    dFrameContents.body.appendChild(tdMarkerWrapper);
    mFrame.body.appendChild(tdMarkerWrapper.cloneNode(true));


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


    let mFrameTdList = mFrame.querySelectorAll("td");
    var tdCount = 0

    console.groupCollapsed("<td> Group (mFrame) - Total <td>'s Processed: " + mFrameTdList.length);

    for (let tdEle of mFrameTdList) {
      if ( (tdEle.clientWidth !== 0 && tdEle.clientHeight !== 0) && (tdEle.clientWidth < 650) ) {

        // console.log(tdEle);
        // console.log(tdEle.clientHeight);
        // console.log(tdEle.clientWidth);

        tdCount++

        var tdPos = getPosition(tdEle, mFrame);

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
        mFrame.getElementById("td-markers").appendChild(tdMarker);

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
//     mFrameScroll.contentWindow.scrollTo(0,mFrame.body.scrollHeight);
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

    let mStyleSheetEle = mFrame.querySelectorAll("style:not(.debug)");
    for (let style of mStyleSheetEle) {
      style.disabled = true;
    }

  } else {

    let dStyleSheetEle = dFrameContents.querySelectorAll("style:not(.debug)");
    for (let style of dStyleSheetEle) {
      style.disabled = false;
    }

    let mStyleSheetEle = mFrame.querySelectorAll("style:not(.debug)");
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
  dFrameContents.getElementsByTagName('body')[0].focus();
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

    let mFrameimgList = mFrame.querySelectorAll("img");
    for (let img of mFrameimgList) {
      if ( imagesToggle ) {
        img.dataset.src = img.src;
        img.src = "";
      } else {
        img.src = img.dataset.src;
        img.dataset.src = "";
      }
    }

    let mFrameBkgList = mFrame.querySelectorAll("[background]");
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
  mFrame.documentElement.classList.toggle("debug-imgdims-highlight");

  //
  // Find <img> dimensions
  //

  // Destory the td markers if they exist, create the wrapper for them if they do not.
  if ( elExists(dFrameContents.getElementById("img-dims-markers")) ) {

    destroy(dFrameContents.getElementById("img-dims-markers"));
    destroy(mFrame.getElementById("img-dims-markers"));

  } else {

    // Create wrapper to old all of the dims markers
    var imgDimsWrapper = document.createElement("section");
    imgDimsWrapper.id = "img-dims-markers";
    imgDimsWrapper.className = "debug img-dims-markers-wrapper";
    dFrameContents.body.appendChild(imgDimsWrapper);
    mFrame.body.appendChild(imgDimsWrapper.cloneNode(true));


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



    // let mFrameImgDimsList = mFrame.querySelectorAll("img");
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



//////////
////
////  Create Preheader Module
////  https://www.campaignmonitor.com/blog/email-marketing/2015/08/improve-email-open-rates-with-preheader-text/
////
/////////


var preheaderWapper = document.createElement("div");
preheaderWapper.className = "preheader-wrapper mod-wrapper";
infoBar.appendChild(preheaderWapper);


var preheader150 = preheader.substring(0, 150).trim();
preheader150 = "<div class='mod mod-preheader'><div class='title'>Preheader</div><div class='mod-body'>" + [preheader150.slice(0, 90), "<span class='preheader-back'>", preheader150.slice(90)].join('') + "</span></div></div>"; // http://stackoverflow.com/a/4364902/556079

preheaderWapper.innerHTML = preheader150;



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


var preheaderMatchDiv = document.createElement("div");
    preheaderMatchDiv.className = "preheader-match-rating";
var preheaderMatchTextNode = document.createTextNode(matchRating + "%");
preheaderMatchDiv.appendChild(preheaderMatchTextNode);
preheaderWapper.appendChild(preheaderMatchDiv);

setTimeout(function() {

  if ( matchRating < 95 ) {
    toast("suppress", "error", "Preheader text may not be updated! <div>Only " + matchRating + "% of the important words in the preheader match the rest of the email.</div>", 0);
    // alertify.error("Preheader text may not be updated! <div>Only " + matchRating + "% of the important words in the preheader match the rest of the email.", 0);
    preheaderMatchDiv.classList.add("error");
    // preflightErrors++;
    preflightError();
  }
  preheaderMatchDiv.classList.add("ready");

}, 500);

console.groupEnd();

/////////
////
////  Create Link Checker Module
////
/////////

var linkCheckerWrapper = document.createElement("div");
linkCheckerWrapper.id = "link-checker";
linkCheckerWrapper.className = "link-checker-wrapper mod-wrapper";
infoBar.appendChild(linkCheckerWrapper);

var linkCheckerHtml = "<div class='mod mod-link-checker'><div class='title'>MedBridge Links</div><div class='mod-body'></div></div>";
linkCheckerWrapper.innerHTML = linkCheckerHtml;

var modLinkToggle = document.createElement("div");
modLinkToggle.className = "toggle";
modLinkToggle.addEventListener("click", toggleLinkMarkers, false);
document.querySelector(".mod-link-checker .title").appendChild(modLinkToggle);

var linkMarkersToggle = false;

function toggleLinkMarkers() {

  if ( this.nodeType !== 1 ) {
    dFrameContents.getElementById("link-markers").classList.add("on-page-load");
  } else if ( dFrameContents.querySelector(".on-page-load") ) {
    dFrameContents.getElementById("link-markers").classList.remove("on-page-load");
  } else {
    dFrameContents.getElementById("link-markers").classList.toggle("hidden");
  }

  linkMarkersToggle = !linkMarkersToggle;

  if ( linkMarkersToggle ) {
    history.replaceState(null,null, updateQueryString("links", "0") );
  } else {
    history.replaceState(null,null, updateQueryString("links") );
  }

}



//////////
////
////  Create Image Checker Module
////
/////////

var imgCheckerWrapper = document.createElement("div");
imgCheckerWrapper.id = "img-checker";
imgCheckerWrapper.className = "img-checker-wrapper mod-wrapper";
infoBar.appendChild(imgCheckerWrapper);

var imgCheckerHtml = "<div class='mod mod-img-checker'><div class='title'>Images</div><div class='mod-body'></div></div>";
imgCheckerWrapper.innerHTML = imgCheckerHtml;



///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//////////////////////////// == xxxxxxxxxxxxxxxx == ///////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

//
// Modify our page view/style/css based on the querystring before we start modifying dFrame and mFrame.
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

  var screenCssPixelRatio = (window.outerWidth - 8) / window.innerWidth;
  var zoomLevel;
  if (screenCssPixelRatio <= .34) {
    zoomLevel = "-6+";
  } else if (screenCssPixelRatio <= .44) {
    zoomLevel = "-5";
  } else if (screenCssPixelRatio <= .54) {
    zoomLevel = "-4";
  } else if (screenCssPixelRatio <= .64) {
    zoomLevel = "-3";
  } else if (screenCssPixelRatio <= .76) {
    zoomLevel = "-2";
  } else if (screenCssPixelRatio <= .92) {
    zoomLevel = "-1";
  } else if (screenCssPixelRatio <= 1.05 && screenCssPixelRatio >= .98) {
    zoomLevel = "0";
  } else if (screenCssPixelRatio <= 1.10) {
    zoomLevel = "1";
  } else if (screenCssPixelRatio <= 1.32) {
    zoomLevel = "2";
  } else if (screenCssPixelRatio <= 1.58) {
    zoomLevel = "3";
  } else if (screenCssPixelRatio <= 1.90) {
    zoomLevel = "4";
  } else if (screenCssPixelRatio <= 2.28) {
    zoomLevel = "5";
  } else if (screenCssPixelRatio >= 2.29) {
    zoomLevel = "6+";
  } else {
    zoomLevel = "unknown";
  }


  console.log("Zoom Level: " + zoomLevel + " (" + screenCssPixelRatio + ")");


  if ( zoomLevelChecked ) {

  }
  else if ( screenCssPixelRatio >= .88 ) {
    zoomLevelChecked = false;
    console.log("Zoom level not checked.");
  }
  else if ( screenCssPixelRatio <= .87 ) {
    zoomLevelChecked = true;
    console.log("Zoom level checked.");
    updatePreflightErrorTotal("success", 1);
  }

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
    dFrameContents.body.appendChild(moduleSettingsWrapper);


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
//////////////////////// ==  xxxxxxxxxxxxxxx  == //////////////////////////////
//////////////////////// ==                   == //////////////////////////////
//////////////////////// ==  LINK VALIDATION  == //////////////////////////////
//////////////////////// ==                   == //////////////////////////////
//////////////////////// ==  xxxxxxxxxxxxxxx  == //////////////////////////////
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

      console.log(link);
      console.log("[" + link.dataset.number + "] " + link);

      console.error("Error Found: " + msg);

      var linkMarker = dFrameContents.querySelector("#link-markers .link-marker[data-number='" + link.dataset.number + "']")
      // console.log(linkMarker);

      var errorRow = document.createElement("section");
      var errorRowText = document.createElement("div");
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

    ///////////
    //
    //  Variables needed for checking the blog.
    //
    ///////////

    var totalProtectedArticles = 0;
    var blogStatusSuccessArray = [];
    var isBlogLoaded = false;
    var totalBlogIframesOpen = 0; // Track the total amount of iframes we open to check the blog.

    ///////////
    //
    //  Function to check the blog for data on an article.
    //
    ///////////

    function checkTheBlog(linkHref, link) {

      // If a URL was passed into this function...
      if ( linkHref ) {

        // Grab the data-number from this link object. We're going to use it with the iframe to track what's going on.
        var blogLinkNumber = link.dataset.number;

        console.groupCollapsed("Checking blog link for data: [" + blogLinkNumber + "]" + linkHref);

        // Check if an iframe already exists with this URL by iterating through all relevant iframes in the DOM.
        console.log("Total iFrames currently open: " + totalBlogIframesOpen + " - Now beginning for...let loop to find iframes that have already been loaded.");

        let blogCheckList = document.querySelectorAll("iframe.blog-check");

        var iframesFoundinDOM = 0;
        for (let blogIframe of blogCheckList) {

          iframesFoundinDOM++;

          console.log("Current iFrame found in the DOM (#" + iframesFoundinDOM + ") during this loop has this src: " + blogIframe.getAttribute("src"));

          if ( blogIframe.getAttribute("src").replace(/[?&]blog\-check\=.+/gi, "") === linkHref ) {
            isBlogLoaded = true;
            console.log("The current link we're checking MATCHES this iFrame that's already in the DOM.");
          } else {
            isBlogLoaded = false;
            console.log("The current link we're checking DOES NOT MATCH this iFrame that's already in the DOM.");
          }

        }
        console.log("All iframes (" + iframesFoundinDOM + ") in the DOM have been checked. End of for...let loop.");

        //
        if ( isBlogLoaded === false ) {

          // Create an iframe for this link
          totalBlogIframesOpen++
          console.log("Creating an iframe for current link: " + totalBlogIframesOpen + " - " + linkHref);

          var blogCheck = document.createElement("iframe");
              blogCheck.src = linkHref + "&blog-check=" + blogLinkNumber;
              blogCheck.className = "blog-check blog-check-" + blogLinkNumber;
              blogCheck.id = "iframe-" + blogLinkNumber;
          document.body.appendChild(blogCheck);

          // Wait X seconds for the blog to send a reply. If it doesn't, throw an error.
          // I thought I needed this, but apparently not! - http://stackoverflow.com/a/9540320/556079
          // (function(link) {
              // setTimeout(function(){console.log(i)}, 1000);

              var blogTimeout = 25000 + (totalBlogIframesOpen*10000);
              var blogTimeoutStr = blogTimeout.toString();
                  blogTimeoutStr = blogTimeoutStr.substring(0, blogTimeoutStr.length-3);

              console.log(totalBlogIframesOpen + " iframe(s) are open. Setting the blog check timer to " + blogTimeoutStr + " seconds.");
              setTimeout(function(){
                if ( blogStatusSuccessArray.indexOf(processBlogLinkBeingChecked(linkHref) ) > -1 ) {
                  console.log("Blog loaded!");
                } else {
                  console.log("Blog didn't load after " + blogTimeoutStr + " seconds. Verify the link.");
                  console.log(link);
                  createLinkErrorRow(link, "Blog took too long to load. Check the link.");
                }
              }, blogTimeout);
          // })(link);



        } else {
          console.log("This link is already loaded in an iframe. End of check on this link.");
        }

        console.info("Total iFrames now open: " + totalBlogIframesOpen);

        console.groupEnd();

      // *No* URL was passed into this function...
      } else {

        console.log("No linkHref found. Looping through all links.");

        let freshBlogCheck = dFrameContents.querySelectorAll("a");
        for (let link of freshBlogCheck) {

          if ( /(after_affiliate_url=blog|blog\/2|\-article|\-blog\/)/gi.test(link.href) && !/p=2503/gi.test(link.href) ) {
            checkTheBlog(link.href, link);
          }

        }
        console.log("Finished looping through all links.");
      }
    }

    ///////////////////////
    ///////////////////////
    ///////////////////////
    ///////////////////////


// Create the wrapper for the link-markers.
var linkMarkerWrapper = document.createElement("section");
linkMarkerWrapper.id = "link-markers";
linkMarkerWrapper.className = "debug link-markers-wrapper";
dFrameContents.body.appendChild(linkMarkerWrapper);

//////
//////
//
// Find and loop through all links
//
/////
/////

linkValidationLoop("true");

function linkValidationLoop(ageCheck) {

  let linkList = dFrameContents.querySelectorAll("a");
  var i = 0

  console.groupCollapsed("Links Group for Validation - Total Links Processed: " + linkList.length);

// ageCheck = true | false
  console.log("ageCheck is set to: " + ageCheck);

  for (let link of linkList) {

    var linkErrors = 0;
    i++

    // Set link to a variable and clean it if it's local.
    var linkHref = link.href;
    if ( /^file:.+\//gi.test(linkHref) ) {
      linkHref = linkHref.replace(/^file:.+\//gi, "");
    }


    if ( !/^(\*%7C.+?%7C\*|\[.+?\])/gi.test(linkHref) ) { // If this isn't a MailChimp or SendGrid link (eg. *|ARCHIVE|* or [weblink]), continue processing.

      // Create link module ROW in left column.
      var linkRowsWrapper = document.querySelector(".mod-link-checker .mod-body");

      var linkRow = document.createElement("div");
      linkRow.className = "link-row";
      linkRowsWrapper.appendChild(linkRow);

      var linkRowNum = document.createElement("div");
      linkRowNum.className = "link-row-num";
      var textLinkNum = document.createTextNode(i);
      linkRowNum.appendChild(textLinkNum);
      linkRow.appendChild(linkRowNum);

      var linkRowHref = document.createElement("div");
      linkRowHref.className = "link-row-href";

      if ( /\.medbridgeeducation\.com/gi.test(linkHref) ) {
        var textLinkHref = document.createTextNode(linkHref.replace(/https?\:\/\/www\.medbridgeeducation\.com/gi, ""));
      } else {
        var textLinkHref = document.createTextNode(linkHref.replace(/https?\:\/\/www\./gi, ""));
      }

      linkRowHref.appendChild(textLinkHref);
      linkRow.appendChild(linkRowHref);



      //////////////////////////////
      //////////////////////////////
      //    Validate Links
      //////////////////////////////
      //////////////////////////////

      if ( isRecentEmail || ageCheck === "false" ) {
        // Only validate the link if the date on the email filename is recent.
        validateLinks(link, i);
      } else {
        // Else, skip validation of this link.
        if ( i < 10 ) {
          var iLog = "0" + i;
        } else { iLog = i; }
        console.log("[" + iLog + "] VALIDATION SKIPPED - " + linkHref + " (This IS NOT a recent email, skipping automatic link validation.)");
      }


    }
  }
  console.groupEnd();

}

//////////
//////////
//////////
function validateLinks(link, i) {

    // Set link to a variable and clean it if it's local.
    var linkHref = link.href;
    if ( /^file:.+\//gi.test(linkHref) ) {
      linkHref = linkHref.replace(/^file:.+\//gi, "");
    }

    if ( i < 10 ) {
      var iLog = "0" + i;
    } else { iLog = i; }

    console.groupCollapsed("[" + iLog + "] VALIDATION RESULTS - " + linkHref);
    console.log(link);
    console.log( getPosition(link, dFrameContents) );


    // Create Link Markers in HTML Email
    var linkPosition = getPosition(link, dFrameContents);

    link.classList.add("marked");
    link.dataset.number = i;

    var linkMarker = document.createElement("section");
    linkMarker.className = "link-marker";
    linkMarker.style.top = (linkPosition.y - 10) + "px";
    linkMarker.style.left = (linkPosition.x - 10) + "px";
    linkMarker.dataset.href = linkHref;
    linkMarker.dataset.number = i;
    linkMarker.addEventListener("click", pinLinkMarker, false);
    dFrameContents.getElementById("link-markers").appendChild(linkMarker);


    var linkErrorLog = document.createElement("section");
    linkErrorLog.className = "link-errors";
    linkErrorLog.dataset.number = i;
    linkErrorLog.addEventListener("mousedown", unpinLinkMarker, false);
    insertAfter(linkErrorLog, linkMarker);


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

    // Global link testing variables
    var medbridgeEdLink
    if ( /^https?:\/\/(.+?\.)?medbridge(ed|education)\.com/gi.test(linkHref) ) {
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
    if ( medbridgeOrMassageLink && /\.com\/trk\-/gi.test(linkHref) ) {
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
    if ( medbridgeOrMassageLink && !outsideOrg && !emailSale ) {
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

    ////
    console.groupEnd();
    ////


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
  if ( !/^mailto/.test(linkHref) && !/localhost\:/.test(linkHref) ) {
  ///////
  // Ignore mailto's and localhost:
  ///////
  ///////
  ///////

    if ( !/\*%7C.+?%7C\*/.test(linkHref) && !/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(linkHref) ) {
      createLinkErrorRow(link, "invalid URL scheme [1]");
    }

    // http://stackoverflow.com/a/9284473/556079

    else if ( !/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(linkHref) ) {
      createLinkErrorRow(link, "invalid URL scheme [2]");
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

          if ( getParameterByName("checkblog") !== "0" ) {
            var updatedLinkObj = link;
            checkTheBlog(linkHref, updatedLinkObj);
            console.log("Could not find data in storage for this blog link, checking the blog for data.");
            createLinkErrorRow(link, "blog data not found in storage, running check now");
          } else {
            console.log("Could not find data in storage for this blog link, no check is being run.");
            createLinkErrorRow(link, "blog data not found in storage, refresh to try again");
          }

        }

        console.groupEnd();
      }
    }

    ////-----------------------------////
    ////
    // Every link needs a target attribute.
    if ( !link.hasAttribute("target") ) {
      createLinkErrorRow(link, "missing target attribute");
    }

    ////-----------------------------////
    ////
    // utm's other than content are unlikely to be used
    if ( /utm_(medium|source|campaign)/gi.test(linkHref) ) {
      createLinkErrorRow(link, "extra utm's");
    }

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
    // DON'T USE UTM - outsideOrg, off domain urls, and Sale emails should not have utms
    if ( /utm_content/gi.test(linkHref) && !linkNeedsGoogleTracking ) {
      createLinkErrorRow(link, "remove utm");
    }

    ////
    // Check for whitelabeling versus www
    if ( outsideOrg && !blogLink && medbridgeEdLink ) {

      if ( /https?:\/\/(www\.)?med/.test(linkHref) ) {
        createLinkErrorRow(link, "missing whitelabeling");
      }
      else if ( (emailSubType === "hs" && !/\/healthsouth\./i.test(linkHref)) || (emailSubType === "dr" && !/\/drayerpt\./i.test(linkHref)) || (emailSubType === "fox" && !/\/foxrehab\./i.test(linkHref)) ) {
        createLinkErrorRow(link, "incorrect whitelabeling");
      }

    }
    if ( !outsideOrg && medbridgeEdLink && !/https?:\/\/(www\.|medbridgeed(ucation)?\.com\/)/gi.test(linkHref) ) {
      createLinkErrorRow(link, "remove whitelabeling");
    }

    ////
    // Validate querystring pattern if it looks like there is one
    if ( /[^#]+\&.+\=/.test(linkHref) || /[^#]+\?.+\=/.test(linkHref) && ( !/after_signin_url/.test(linkHref) ) ) {

      if ( /\&.+\=/.test(linkHref) && !/\?./.test(linkHref) ) {
        createLinkErrorRow(link, "missing ? in query string");
      }

      if ( /\?[^#]+\?.+\=/.test(linkHref) ) {
        createLinkErrorRow(link, "replace ? with & in query string");
      }

      // http://stackoverflow.com/a/23959662/556079
      // http://rubular.com/r/kyiKS9OlsM

      // Check the query string without any ending hash
      var linkHrefNoHash = linkHref.replace(/#.+/, "");

      if ( !/\?([\.\w-]+(=[\+\.\/\w-]*)?(&[\.\w-]+(=[\+\.\/\w-]*)?)*)?$/.test(linkHrefNoHash) ) {
        createLinkErrorRow(link, "invalid query string");
      }

    }



    ////-----------------------------////
    ////
    if ( linkNeedsPromoCode ) {

      // Links to MedBridge in -ns emails need to use a marketing URL
      if ( !/\.com\/trk\-/gi.test(linkHref) || /\.com\/(signin|courses\/|blog\/)/gi.test(linkHref) ) {
        createLinkErrorRow(link, "use a marketing URL");
      }

      // Spell after_affiliate_url correctly!
      if ( !/\-(blog|article)/gi.test(linkHref) && !/after_affiliate_url/gi.test(linkHref) ) {
        createLinkErrorRow(link, "missing after_affiliate_url");
      }

      // Too many leading /'s' during a redirect can cause a link to not work
      if ( /after_affiliate_url=\/\/+/gi.test(linkHref) ) {
        createLinkErrorRow(link, "too many /'s'");
      }

      // Watch out for extra hyphens!
      if ( /\-\-/gi.test(linkHref) ) {
        createLinkErrorRow(link, "investigate consecutive hyphens");
      }

      // Check the date in a tracking URL
      var monthPattern = new RegExp("\\/trk\\-.*?" + emailMonthAbbr + "\\-", "gi");
      if ( !monthPattern.test(linkHref) ) {
        createLinkErrorRow(link, "link should included '-" + emailMonthAbbr + "-' to match current month");
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

        if ( /utm_content=mod\d/gi.test(linkHref) ) {

          if ( !moduleNumberMatch.test(linkHref) ) {
            // console.log( "no match: " + !moduleNumberMatch.test(linkHref) );
            createLinkErrorRow(link, "wrong mod #, use " + "mod" + moduleNumber);
          } else {
            // console.log( "match: " + !moduleNumberMatch.test(linkHref) );
          }

        } else {

          createLinkErrorRow(link, "missing mod #, use " + "mod" + moduleNumber);

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
    if ( (outsideOrg || emailSubType === "sub" || emailDisc === "ent" ) && (medbridgeOrMassageLink && /\.com\/trk\-/gi.test(linkHref) || /after_affiliate_url/gi.test(linkHref)) ) {
      createLinkErrorRow(link, "do not use a marketing url");
    }

    ////
    // Check for medium=email in Sale and Presale emails
    ////

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
    // Use p=#### to force Wordpress to redirect to http.
    // Check for existence of https in blog links in sub version when NOT using p=####
    if ( blogLink && emailSubType === "sub" && /https:\/\//gi.test(linkHref) && !/p=\d\d\d/gi.test(linkHref) ) {
      createLinkErrorRow(link, "blog links cannot be https");
    }

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
    // outsideOrg and subs should not link to home-exercise-program.
    // Use /patient_care/programs/create
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
    // Traking URL - Discipline Check

    if ( emailDisc !== "multi" && emailDisc !== "ent" && emailDisc !== null && medbridgeOrMassageLink && !/\/courses\/details\//g.test(linkHref) && isMarketingUrl ) {

      if ( emailDisc === "pt" && !/-pt(\-|\/|\?)/g.test(linkHref) ) {
        createLinkErrorRow(link, "missing discipline");
      }
      if ( emailDisc === "at" && !/-at(\-|\/|\?)/g.test(linkHref) ) {
        createLinkErrorRow(link, "missing discipline");
      }
      if ( emailDisc === "ot" && !/-ot(\-|\/|\?)/g.test(linkHref) ) {
        createLinkErrorRow(link, "missing discipline");
      }
      if ( emailDisc === "slp" && !/-slp(\-|\/|\?)/g.test(linkHref) ) {
        createLinkErrorRow(link, "missing discipline");
      }
      if ( emailDisc === "other" && !/-other(\-|\/|\?)/g.test(linkHref) ) {
        createLinkErrorRow(link, "missing discipline");
      }
    }

    // Homepage - Discipline Check
    if ( emailDisc !== "multi" && emailDisc !== null && medbridgeOrMassageLink ) { //&& isMarketingUrl

      if ( (emailDisc !== "pt" && emailDisc !== "other") && /after_affiliate_url=\/?physical-therapy(&|$)/gi.test(linkHref) ) {
        createLinkErrorRow(link, "wrong homepage");
      }
      if ( emailDisc !== "at" && /after_affiliate_url=\/?athletic-training(&|$)/gi.test(linkHref) ) {
        createLinkErrorRow(link, "wrong homepage");
      }
      if ( emailDisc !== "ot" && /after_affiliate_url=\/?occupational-therapy(&|$)/gi.test(linkHref) ) {
        createLinkErrorRow(link, "wrong homepage");
      }
      if ( emailDisc !== "slp" && /after_affiliate_url=\/?speech-language-pathology(&|$)/gi.test(linkHref) ) {
        createLinkErrorRow(link, "wrong homepage");
      }
    }


    // Courses Page - Discipline Check
    if ( emailDisc !== "multi" && emailDisc !== null && /#/g.test(linkHref) ) { //  && medbridgeOrMassageLink

      if ( (emailDisc !== "pt" && emailDisc !== "other") && /#\/?physical-therapy/gi.test(linkHref) ) {
        createLinkErrorRow(link, "wrong hashtag");
      }
      if ( emailDisc !== "at" && /#\/?athletic-training/gi.test(linkHref) ) {
        createLinkErrorRow(link, "wrong hashtag");
      }
      if ( emailDisc !== "ot" && /#\/?occupational-therapy/gi.test(linkHref) ) {
        createLinkErrorRow(link, "wrong hashtag");
      }
      if ( emailDisc !== "slp" && /#\/?speech-language-pathology/gi.test(linkHref) ) {
        createLinkErrorRow(link, "wrong hashtag");
      }
    }

    // Check for unecessary discipline hastags. Should only be used when linking to courses page
    if ( /#\/?(speech-language-pathology|physical-therapy|athletic-training|occupational-therapy)/gi.test(linkHref) && !/(_url=courses|\/courses)(\/|\?|&|$)/gi.test(linkHref) ) {
      createLinkErrorRow(link, "unecessary hashtag");
    }


    ////
    // NO //support. in outsideOrg
    if ( /\/support\./gi.test(linkHref) && outsideOrg ) {
      createLinkErrorRow(link, "://support. not allowed in outsideOrg, use mailto:support@medbridgeed.com");
    }

  ///////
  //// End Link Check ////
  ///////
  }
  ///////
  ///////
  ///////


    // unused... what was I doing?

    var linkText = link.innerText;


}
//////////
//////////
//////////



///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//////////////////////////// == xxxxxxxxxxxxxxxx == ///////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

////
//////
// Iterate through ALL IMAGES - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of
let imgList = dFrameContents.querySelectorAll("img");
var i = 0
console.log("Total Images: " + imgList.length)
for (let img of imgList) {

  i++

  // console.log(img);
  // console.log("[" + i + "] " + img.src);

  img.classList.add("test");

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


//
// SPAM TRIGGER WORD
//
// Click|Click below|Click here|Click to remove|
findAndReplaceDOMText(dFrameContents.getElementsByTagName('body')[0], {
  find: /((‘|')?Hidden(’|')? assets|100% free|100% Satisfied|4U|\$\$\$|\bAd\b|Accept credit cards|Acceptance|Act Now!?|Act now!? Don(’|')?t hesitate\!?|Additional income|Addresses on CD|All natural|All new|Amazing stuff|Apply now|Apply Online|As seen on|Auto email removal|Avoid bankruptcy|Bargain|Be amazed|Be your own boss|Being a member|Beneficiary|Best price|Beverage|Big bucks|Bill 1618|Billing address|Brand new pager|Bulk email|Buy direct|Buying judgements|Buying judgments|Cable converter|Call free|Call now|Calling creditors|Can(’|')?t live without|Cancel at any time|Cannot be combined with any other offer|Cards accepted|Cash bonus|Casino|Celebrity|Cell phone cancer scam|Cents on the dollar|Check or money order|Claims|Claims not to be selling anything|Claims to be in accordance with some spam law|Claims to be legal|Clearance|Collect child support|Compare rates|Compete for your business|Confidentially on all orders|Congratulations|Consolidate debt and credit|Consolidate your debt|Copy accurately|Copy DVDs|Credit bureaus|Credit card offers|Cures baldness|Dig up dirt on friends|Direct email|Direct marketing|Do it today|Don(’|')?t delete|Don(’|')?t hesitate|Double your|Double your income|Drastically reduced|Earn \$|Earn extra cash|Earn per week|Easy terms|Eliminate bad credit|Eliminate debt|Email harvest|Email marketing|Expect to earn|Explode your business|Extra income|F r e e|Fantastic deal|Fast cash|Fast Viagra delivery|Financial freedom|Financially independent|For instant access|For just \$|For just \$[0-9]+?|Free access|Free cell phone|Free consultation|Free consultation|Free DVD|Free gift|Free grant money|Free hosting|Free info|Free installation|Free Instant|Free investment|Free leads|Free membership|Free money|Free offer|Free preview|Free priority mail|Free quote|Free sample|Free trial|Free website|Full refund|Get it now|Get out of debt|Get paid|Gift certificate|Give it away|Giving away|Great offer|Have you been turned down\??|Hidden assets|Hidden charges|Home based|Home employment|Homebased business|Human growth hormone|If only it were that easy|Important information regarding|In accordance with laws|Income from home|Increase sales|Increase traffic|Increase your sales|Incredible deal|Info you requested|Information you requested|Insurance|Internet market|Internet marketing|Investment decision|It(’|')?s effective|It(’|')?s effective|Join millions|Join millions of Americans|Laser printer|Leave|Life Insurance|limited time|Limited time offer|Limited time only|Loans|Long distance phone offer|Lose weight|Lose weight spam|Lower interest rate|Lower interest rates|Lower monthly payment|Lower your mortgage rate|Lowest insurance rates|Lowest Price|Luxury car|Mail in order form|Make \$|Make money|Marketing solutions|Mass email|Meet singles|Member stuff|Message contains|Message contains disclaimer|Miracle|MLM|Money back|Money making|Month trial offer|More Internet Traffic|Mortgage|Mortgage rates|Multi\-?level marketing|New customers only|New domain extensions|Nigerian|No age restrictions|No catch|No claim forms|No cost|No credit check|No disappointment|No experience|No fees|No gimmick|No hidden|No inventory|No investment|No medical exams|No middleman|No obligation|No purchase necessary|No questions asked|No selling|No strings attached|No\-?obligation|Not intended|Notspam|Now only|Obligation|Off shore|Offer expires|Once in lifetime|One hundred percent free|One hundred percent guaranteed|One time|One time mailing|Online biz opportunity|Online degree|Online marketing|Online pharmacy|Opt in|Order now|Order shipped by|Order status|Order today|Orders shipped by|Outstanding values|Passwords|Pennies a day|Please read|Potential earnings|Pre-approved|Print form signature|Print out and fax|Priority mail|Prizes?|Produced and sent out|Promise you|Pure Profits|Real thing|Refinance home|Refinanced home|Removal instructions|Removes wrinkles|Reserves the right|Reverses aging|Risk free|Round the world|S 1618|Safeguard notice|Satisfaction guaranteed|Save \$|Save big money|Save up to|Score with babes|Search engine listings|Search engines|Section 301|See for yourself|Sent in compliance|Serious cash|Serious only|Shopping spree|Sign up free today|Social security number|Special promotion|Stainless steel|Stock alert|Stock disclaimer statement|Stock pick|Stop snoring|Strong buy|Stuff on sale|Subject to cash|Subject to credit|Supplies are limited|Take action now|Talks about hidden charges|Talks about prizes|Tells you it(’|')?s an ad|The best rates|The following form|They keep your money \– no refund|They(’|')?re just giving it away|This isn(’|')?t (junk|spam|last|a scam)?|Time limited|Trial|Undisclosed recipient|University diplomas|Unsecured (credit|debt)|Unsolicited|US dollars|Vacation|Vacation offers|Valium|Viagra|Viagra and other drugs|Vicodin|Visit our website|Wants credit card|Warranty|We hate spam|We honor all|Web traffic|Weekend getaway|Weight loss|What are you waiting for\??|While supplies last|While you sleep|Who really wins\??|Why pay more\??|Wife|Will not believe your eyes|Work at home|Work from home|Xanax|You are a winner!?|You have been selected|You(’|')?re a Winner!?|Your income)/gi,
  wrap: 'span',
  wrapClass: "text-error"
});


//
// DISCIPLINE CHECKS
//

// Promo Codes
  if ( emailDisc !== "pt" ) {
    findAndReplaceDOMText(dFrameContents.getElementsByTagName('body')[0], {
      find: /(Promo.+?\b[A-Za-z0-9]+?PT\b)/gi,
      wrap: 'span',
      wrapClass: "text-error"
    });
  }
  if ( emailDisc !== "at" ) {
    findAndReplaceDOMText(dFrameContents.getElementsByTagName('body')[0], {
      find: /(Promo.+?\b[A-Za-z0-9]+?AT\b)/gi,
      wrap: 'span',
      wrapClass: "text-error"
    });
  }
  if ( emailDisc !== "ot" ) {
    findAndReplaceDOMText(dFrameContents.getElementsByTagName('body')[0], {
      find: /(Promo.+?\b[A-Za-z0-9]+?OT\b)/gi,
      wrap: 'span',
      wrapClass: "text-error"
    });
  }
  if ( emailDisc !== "slp" ) {
    findAndReplaceDOMText(dFrameContents.getElementsByTagName('body')[0], {
      find: /(Promo.+?\b[A-Za-z0-9]+?SLP\b)/gi,
      wrap: 'span',
      wrapClass: "text-error"
    });
  }
  if ( emailDisc === "other" ) {
    findAndReplaceDOMText(dFrameContents.getElementsByTagName('body')[0], {
      find: /(Promo.+?\b[A-Za-z0-9]+?(PT|AT|OT|SLP)\b)/gi,
      wrap: 'span',
      wrapClass: "text-error"
    });
  }

if ( emailDisc === "pt" || emailDisc === "other" ) {
  // Physical Therapy - PT

  findAndReplaceDOMText(dFrameContents.getElementsByTagName('body')[0], {
    find: /(ASHA|\bAOTA|BOC\-Approved|Athletic Training|Occupational Therapy|CCC\-SLP)/g,
    wrap: 'span',
    wrapClass: "text-error"
  });

} else if ( emailDisc === "at" ) {
  // Athletic Training - AT

  findAndReplaceDOMText(dFrameContents.getElementsByTagName('body')[0], {
    find: /(patient|ASHA|\bAOTA|Physical Therapy|Occupational Therapy|CCC\-SLP)/g,
    wrap: 'span',
    wrapClass: "text-error"
  });

} else if ( emailDisc === "ot" ) {
  // Occupational Therapy - OT

  findAndReplaceDOMText(dFrameContents.getElementsByTagName('body')[0], {
    find: /(ASHA|BOC\-Approved|Physical Therapy|Athletic Training|CCC\-SLP)/g,
    wrap: 'span',
    wrapClass: "text-error"
  });
  // case-insensitive
  findAndReplaceDOMText(dFrameContents.getElementsByTagName('body')[0], {
    find: /home exercise program/gi,
    wrap: 'span',
    wrapClass: "text-error"
  });

} else if ( emailDisc === "slp" ) {
  // Speech Language Pathology - SLP

  findAndReplaceDOMText(dFrameContents.getElementsByTagName('body')[0], {
    find: /(\bAOTA|BOC\-Approved|Physical Therapy|Athletic Training|Occupational Therapy)/g,
    wrap: 'span',
    wrapClass: "text-error"
  });

} else if ( emailDisc === "lmt" ) {
  // Massage

  findAndReplaceDOMText(dFrameContents.getElementsByTagName('body')[0], {
    find: /(ASHA|\bAOTA|BOC\-Approved|Physical Therapy|patient engagement tool|CCC\-SLP)/g,
    wrap: 'span',
    wrapClass: "text-error"
  });

} else if ( emailDisc === "ent" ) {
  // Enterprise

  ///

}


//
// ALL
//

  // NOTES ---
  // 17-06-14 - Decided to stop saying "Unlimited CEUs" and instead say "Unlimited Access to CEUs" or "Unlimited CEU Access".

  // All (case INsensitive)
  findAndReplaceDOMText(dFrameContents.getElementsByTagName('body')[0], {
    find: /Unlimited CEUs(\.|!)|(asha( |\-)(approved|accredited) (ceu|course)s?|certification(\.| |$)[^p]|at no extra cost|[^\u00a0]\u2192|get your ceu|ceu's|\/?[A-Za-z]+>)/gi,
    // Update to add "word &nbsp;&rarr;" as an error
    wrap: 'span',
    wrapClass: "text-error"
  });

  // All (case sensitive)
  findAndReplaceDOMText(dFrameContents.getElementsByTagName('body')[0], {
    find: /\b[Mm]edbridge( |\.|\!|\?|,)/g,
    wrap: 'span',
    wrapClass: "text-error"
  });




//
// PRODUCT CAPITALIZATION
//
findAndReplaceDOMText(dFrameContents.getElementsByTagName('body')[0], {
  find: /MedBridge (?:patient [Ee]|Patient e)ngagement/g,
  wrap: 'span',
  wrapClass: "text-error"
});

// Sub
if ( emailSubType === "sub" && emailDisc !== "ent" ) {
  findAndReplaceDOMText(dFrameContents.getElementsByTagName('body')[0], {
    find: /(Start for Free|in (an|the) annual|\bSubscribe)/gi,
    wrap: 'span',
    wrapClass: "text-error"
  });
}

// NS
if ( emailSubType === "ns" ) {
  findAndReplaceDOMText(dFrameContents.getElementsByTagName('body')[0], {
    find: /(Start Now|in (an|your) annual|Refer(\-| )a(\-| )Friend)/gi,
    wrap: 'span',
    wrapClass: "text-error"
  });
}

// outsideOrg
if ( outsideOrg ) {
  findAndReplaceDOMText(dFrameContents.getElementsByTagName('body')[0], {
    find: /additional cost|Refer(\-| )a(\-| )Friend/gi,
    wrap: 'span',
    wrapClass: "text-error"
  });
}

// emailAnySale
// if ( !emailAnySale ) {
//   findAndReplaceDOMText(dFrameContents.getElementsByTagName('body')[0], {
//     find: /\$200/gi,
//     wrap: 'span',
//     wrapClass: "text-error"
//   });
// }



////////////
////////////
////////////
//
//    Alerts!!
//
////////////
////////////
////////////

if ( /Refer(\-| )a(\-| )Friend/gi.test(dFrameContents.body.textContent) ) {
  alertify.error("Refer a Friend<div>Remember update the MailChimp database and use conditional statements to only show Refer a Friend content to eligible contacts.</div>", 0);
}


// if ( !elExists(dFrameContents.querySelector("[data-module-wrapper]")) ) {
//   alertify.error("[data-module-wrapper] is missing. <div>Add this data- attribute to the <code>&lt;td&gt;</code> that wraps your main content.</div>", 0);
// }
// if ( emailSubType === "ns" && ) {
//   findAndReplaceDOMText(dFrameContents.getElementsByTagName('body')[0], {
//     find: /(Start Now|in (an|your) annual|Register Now|Refer(\-| )a(\-| )Friend)/gi,
//     wrap: 'span',
//     wrapClass: "text-error"
//   });
// }

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//////////////////////////// == xxxxxxxxxxxxxxxx == ///////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

function toggleHelpers() {
  dFrameContents.documentElement.classList.toggle("all-helpers-off");
}
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

if ( getParameterByName("helpers") === "0" ) {
  toggleHelpers();
  console.log("helpers off");
}

if ( getParameterByName("img") === "0" ) {
  toggleImages();
  console.log("images off");
}

if ( getParameterByName("style") === "0" ) {
  toggleStyles();
  console.log("styles off");
}

if ( getParameterByName("showdims") === "1" ) {
  showDims();
  console.log("box-shadow borders shown");
}

if ( getParameterByName("guides") === "1" ) {
  toggleGuides();
  console.log("guides shown");
}

if ( getParameterByName("links") === "0" ) {
  toggleLinkMarkers();
  console.log("links hidden");
}

if ( getParameterByName("imgdims") === "1" ) {
  toggleImgDims();
  console.log("img dimensions revealed");
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
//    Spell Check
//
////////////
////////////
////////////

// 05-25-17 - DEPRECATED
// A recent update to Google Chrome cause the built-in spellchecking feature to no longer function as expected.

//
// function checkSpelling() {
//
//   //Activate Chrome's built-in spellcheck by focusing the cursor and then un-focusing. This works by making the HTML contenteditable and then applying focus. For some reason Chrome keeps the squiggly lines when you unfocus and turn off contenteditable which is great for us because it keeps everything else nice and clean.
//   dFrameContents.getElementsByTagName('html')[0].contentEditable = 'true';
//   dFrameContents.getElementsByTagName('html')[0].classList.add("spellcheck");
//   dFrameContents.getElementsByTagName('body')[0].focus();
//
//   // For some reason, if contenteditable is turned off too quickly, the red squiggles are sometimes misaligned with the text they are indicating as incorrectly spelled. For this reason we're using a setTimeout here.
//   setTimeout(function() {
//     dFrameContents.getElementsByTagName('html')[0].contentEditable = 'false';
//     dFrameContents.getElementsByTagName('html')[0].classList.remove("spellcheck");
//
//     mFrame.getElementsByTagName('html')[0].contentEditable = 'true';
//     mFrame.getElementsByTagName('html')[0].classList.add("spellcheck");
//     mFrame.getElementsByTagName('body')[0].focus();
//   }, 200);
//
//   setTimeout(function() {
//     mFrame.getElementsByTagName('html')[0].contentEditable = 'false';
//     mFrame.getElementsByTagName('html')[0].classList.remove("spellcheck");
//
//     document.querySelector('.mod-preheader .mod-body').contentEditable = 'true';
//     document.querySelector('.mod-preheader .mod-body').focus();
//   }, 400);
//
//   setTimeout(function() {
//     document.querySelector('.mod-preheader .mod-body').contentEditable = 'false';
//   }, 600);
//
//   dFrameContents.getElementsByTagName('body')[0].spellcheck = true;
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

    chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {

          // console.log("request.greeting: " + request.greeting);
          var blogStatusReply = request.greeting.split("|");
          console.log("blogStatusReply: ");
          console.log(blogStatusReply);

          if ( blogStatusReply[1] === "error" ) {

          } else {

            // console.log("blogStatusReply: " + blogStatusReply);
            // console.log("blogStatusReply[4]: " + blogStatusReply[4]);

            var blogUrlChecked = document.querySelector("#iframe-" + blogStatusReply[4]).getAttribute("src").replace(/[?&]blog\-check.+/gi, "");


            console.log("blogStatusReply[4]: ");
            console.log(blogStatusReply[4]);
            console.log("blogUrlChecked: " + blogUrlChecked);


            blogUrlChecked = processBlogLinkBeingChecked(blogUrlChecked);

            blogStatusSuccessArray.push(blogUrlChecked);


            // if ( /after_affiliate_url/gi.test(blogUrlChecked) ) {
            //   blogUrlChecked = blogUrlChecked.replace(/\&.+/gi, "");
            //   console.log("blogUrlChecked: " + blogUrlChecked);
            // }
            // // New way to link articles in -ns and -sub. Using the p=#### id of the article lets us keep the same link if the URL changes in the future
            // else if ( /p=\d\d\d/gi.test(linkHref) ) {
            //   console.log("This blog link uses p=#### id for linking.")
            //   var blogLinkToCheckArray = linkHref.match(/p=[0-9]*/gi);
            //   var blogLinkToCheck = blogLinkToCheckArray[0].replace(/p=/gi,"");
            // }
            // else {
            //   blogUrlChecked = blogUrlChecked.replace(/\?.+/gi, "");
            //   console.log("blogUrlChecked: " + blogUrlChecked);
            // }

            blogUrlChecked = blogUrlChecked.replace(/^https?\:\/\/.+?\//i, "");
            blogUrlChecked = blogUrlChecked.replace(/\/$/i, "");

            // console.log(blogUrlChecked);
            // console.log(blogStatusReply[1] + "|" + blogUrlChecked);

            console.log("Saving to sessionStorage: " + blogUrlChecked + " - " + blogStatusReply);
            sessionStorage.setItem(blogUrlChecked, blogStatusReply);

            destroy(document.querySelector("#iframe-" + blogStatusReply[4]));
            // console.log("#iframe-" + blogStatusReply[4] + " destroyed.")

          }


      }
    );


    function processBlogLinkBeingChecked(link) {

      console.log("function is processing the blog link being checked: " + link);

      // First 'if' handles the blog link when we eventually are allowed to use after_affiliate_url for blog links, this is just future proofing (4/14/17)
      // if ( /after_affiliate_url/gi.test(link) ) {
      //   console.log("This blog link uses after_affiliate_url for linking.");
      //   var blogLinkToCheck = link.replace(/\&.+/gi, "");
      //       blogLinkToCheck = blogLinkToCheck.replace(/https?\:\/\/.+?after_affiliate_url\=\/?/gi, "");
      //       console.log("in function we set blogLinkToCheck: " + blogLinkToCheck);
      // }
      // // New way to link articles in -ns and -sub. Using the p=#### id of the article lets us keep the same link if the URL changes in the future
      // else

      if ( /p=\d\d\d/gi.test(link) ) {
        console.log("This blog link uses p=#### id for linking.")
        var blogLinkToCheckArray = link.match(/p=[0-9]*/gi);
        var blogLinkToCheck = blogLinkToCheckArray[0].replace(/p=/gi,"");
            console.log("in function we set blogLinkToCheck: " + blogLinkToCheck);
      }
      else {
        console.log("This blog link uses ??? for linking.");
        var blogLinkToCheck = link.replace(/\/?\?.+/gi, "");
            blogLinkToCheck = blogLinkToCheck.replace(/https?\:\/\/.+?\//gi, "");
            console.log("in function we set blogLinkToCheck: " + blogLinkToCheck);
      }

      return blogLinkToCheck;

    }

    // Need to use this during link checking and again once the postMessages come back. Figure that out.
    function checkArticleLink(linkObject, blogStatusFromStorage) {

      // console.log(link.href);
      // console.log(blogStatusFromStorage);

      var blogStatusFromStorage = blogStatusFromStorage;
      // Check Protects/Unprotected
      if ( blogStatusFromStorage[2] === "protected" ) {
        createLinkErrorRow(linkObject, "article is protected", "error", "lock");
        totalProtectedArticles++;
      }
      // Check Pearl vs Blog
      if ( linkNeedsGoogleTracking ) {
        if ( blogStatusFromStorage[3] === "blog" && !/utm_content=.+?\-blog/gi.test(linkObject.href) ) {
          createLinkErrorRow(linkObject, "add 'blog' to utm");
        } else if ( blogStatusFromStorage[3] === "pearl" && !/utm_content=.+?\-pearl/gi.test(linkObject.href) ) {
          createLinkErrorRow(linkObject, "add 'pearl' to utm");
        }
      }

      // console.error(totalProtectedArticles);
    }

    // console.error(totalProtectedArticles);

    if ( totalProtectedArticles > 0 ) {
      console.error(totalProtectedArticles);
      alertify.error("1 or more articles are protected<div>Remember to unprotect all articles and re-check their status before sending out the newsletter.</div>", 0);
    }


///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////// == Scroll Syncing == ////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////



dFrameContents.addEventListener('scroll', function(e) {
  syncScroll(dFrameContents, document.querySelector("#desktop-view"));
});
mFrame.addEventListener('scroll', function(e) {
  syncScroll(mFrame, document.querySelector("#mobile-view"));
});

    // dFrameContents.removeEventListener('scroll', makeBackgroundYellow, false);
    // mFrame.removeEventListener('scroll', makeBackgroundYellow, false);

function syncScroll(targetFrame, iFrameObj) {

  // console.log("syncScroll function activated.")

  if ( iFrameObj.classList.contains("syncing") ) {
    iFrameObj.classList.remove("syncing");
    return false;
  } else {

    // var targetFrameHeight = targetFrame.body.scrollHeight - targetFrame.body.clientHeight;
    // var targetFrameHeight = targetFrame.body.scrollHeight - targetFrame.clientHeight;
    var targetFrameHeight = targetFrame.body.scrollHeight - iFrameObj.clientHeight;
    var targetScrollPos = targetFrame.body.scrollTop;
    var targetScrollPerc = targetScrollPos / targetFrameHeight;

    // console.log("targetFrame.body.scrollHeight: " + targetFrame.body.scrollHeight + ", targetFrame.body.clientHeight: " + targetFrame.body.clientHeight);
    // console.log("targetFrame.body.scrollHeight: " + targetFrame.body.scrollHeight + ", targetFrame.clientHeight: " + targetFrame.clientHeight);
    // console.log("targetFrame.body.scrollHeight: " + targetFrame.body.scrollHeight + ", iFrameObj.clientHeight: " + iFrameObj.clientHeight);
    // console.log("targetFrameHeight: " + targetFrameHeight + ", targetScrollPos: " + targetScrollPos + ", targetScrollPerc: " + targetScrollPerc);

    if ( iFrameObj.id === "desktop-view" ) {
      // var matchingFramePos = (mFrame.body.scrollHeight - mFrame.body.clientHeight) * targetScrollPerc;
      var matchingFramePos = (mFrame.body.scrollHeight - document.querySelector("#mobile-view").clientHeight) * targetScrollPerc;
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
//////////////////////////// == xxxxxxxxxxxxxxxx == ///////////////////////////
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

    if ( !document.hidden ) { // https://stackoverflow.com/a/12186061/556079
      console.log("document.hidden = false");

      preflightStatus.classList.remove("initial-load");
      preflightStatus.classList.add("load-finished");

      if ( preflightTotal.textContent === "0" ) {
        preflightNotifierSuccess();
      }

      window.removeEventListener('visibilitychange', activatePreflightNotifier, true);
      // window.removeEventListener('visibilitychange', true);

       // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener
      // Events https://developers.google.com/web/tools/chrome-devtools/console/events
      console.log("listener removed");

    } else {
      console.log("document.hidden = true");
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
//////////////////////////// == xxxxxxxxxxxxxxxx == ///////////////////////////
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
console.log("// end of newsletter.js")
//
// var scrolltest = document.querySelector("#desktop-view");
//
// scrolltest.addEventListener('scroll', function(e) {
//
//   console.log(window.scrollY);
//
// });





} // END TEST
//
//
//

// console.error( "newsletter.js - " + document.documentElement.clientWidth );
