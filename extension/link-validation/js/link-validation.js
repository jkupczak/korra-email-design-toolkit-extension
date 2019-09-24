// Global Variables
var totalLinkErrors = 0;
var totalLinkWarnings = 0;

function launchLinkValidation(source, frameContentsPassed, errorBox, dummyLinkList) {

  // Get our options from chrome.storage.async
  var getAllOptions = new Promise((resolve, reject) => {
    chrome.storage.sync.get(null, (items) => {
      let err = chrome.runtime.lastError;
      if (err) {

        //@TODO What do I do if the call errors out?!
        reject(err);

      } else {

        // Apply our result to a global variable so that we can use it throughout our other scripts.
        // Maybe not the best way to handle this?
        exOptions = items;
        korraOptions = items;

        console.groupCollapsed("Options from Storage (exOptions)");
        console.log(exOptions);
        console.groupEnd();

        resolve(items);

        // Now that we have our options, we can run the link check
        ///////
        linkValidationLoop(source, frameContentsPassed, errorBox, dummyLinkList);

      }
    });
  });

}

///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
/////
/////
/////    Link Validation Function
/////
/////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////

/**
 * [someFunction description]
 * @param  {[string]} source [where the links are located]
 * @param  {[object]} frameContentsPassed [the frame where the links are located]
 * @param  {[type]}   errorBoxPassed [location where the errors should be logged]
 * @param  {[type]}   dummyLinkList [a list of links from a separate copy of the main frame]
 */
var linkValidationLoop = function (source, frameContentsPassed, errorBoxPassed, dummyLinkList) {

// Make the frameContents a global variable
/////////////
if ( frameContentsPassed.tagName === "IFRAME" ) {
  frame = frameContentsPassed;
  frameContents = frameContentsPassed.contentDocument;
} else {
  frameContents = frameContentsPassed;
}

// Make the frameContents a global variable
/////////////
errorBox = errorBoxPassed;

// Get all links, global variable
/////////////
linkList = frameContents.querySelectorAll("a");
linkListArr = Array.from(linkList);
linkInfoArray = [];

linkListUniqueURLs = createUniqueArrayOfURLs(linkListArr);
linkListUniqueURLs.push("https://www.google.com");

// TODO
// Temporary Variables
/////////////
if ( typeof emailSubType === 'undefined' ) {
  // In the absence of a emailsubtype, use "ns"
  emailSubType = "ns";
}
if (typeof outsideOrg === 'undefined') {
  outsideOrg = false;
}
if (typeof emailPlatform === 'undefined') {
  emailPlatform = "mc";
}
if (typeof emailOrgName === 'undefined') {
  emailOrgName = "";
}
if (typeof emailDisc === 'undefined') {
  emailDisc = undefined;
}

// Inject Stylesheet
// console.log( frameContents );
// console.log( frameContents.body );

var validationStylesheet = document.createElement('link');
validationStylesheet.setAttribute('rel', 'stylesheet');
validationStylesheet.setAttribute('type', 'text/css');
validationStylesheet.setAttribute('href', chrome.extension.getURL('/link-validation/css/link-validation.css'));

// console.log(validationStylesheet);

frameContents.documentElement.appendChild(validationStylesheet);


      // Create the wrapper for the link-markers.
      var linkMarkerWrapper = document.createElement("korra-link-validation");
      linkMarkerWrapper.dataset.korra = "";
      linkMarkerWrapper.id = "link-markers";
      linkMarkerWrapper.className = "debug link-markers-wrapper";
      // linkMarkerWrapper.style = "display:none";
      frameContents.documentElement.appendChild(linkMarkerWrapper);

      // Watch the contents of the frameContents for size changes.
      // Modifies placement of link markers.
      lm.observe(frameContents.body);

  // Verify the visibility of all links in Desktop and Mobile.
  // Wait for the iframe to finish loading before we do though.
  // Modify this to use the dummyIframe for both desktop and mobile so that we can avoid errors.

  if ( dummyLinkList ) {
    addLoadEvent(dummyIframe, function() {
      verifyLinkVisibility(dummyLinkList);
    });
  }

  // addLoadEvent( verifyLinkVisibility(linkList) );
  // desktopIframe.onload = () => {
  //   verifyLinkVisibility(linkList);
  // }

  // Array that contains only the link objects that have errors.
  linksWithErrorsArr = [];

  // Instead of waiting for this function to run grab all links and place them in an array, we moved this up to happen right after the iframe is created.
  // Regardless of whether or not we end up checking the links.
  // let linkList = frameContents.querySelectorAll("a");

  console.groupCollapsed("[Link Validation] Total Links Processed: " + linkList.length);

  // Loop through each link on the page first before we validate individually.
  var medbridgeLinkUrlsList = [];

  for (let linkObj of linkList) {

    if ( /^https?\:\/\/(.+?\.)?medbridge(ed(ucation)?|massage)\.com\/?/gi.test(linkObj.href) ) {
      medbridgeLinkUrlsList.push(linkObj.href);
    }

  }


  // Determine if portions of links in -ns emails match each other by finding the most common string and
  // checking against it later when we loop through the links again for validation.
  // This is important for marketing tracking urls, utm_source, and utm_campaign
  //////////////////

  if ( emailSubType === "ns" ) {
    // tracking url
    commonTrkUrl = mostCommonString("tracking", medbridgeLinkUrlsList);
    if ( commonTrkUrl ) {
      commonTrkUrlRegex = new RegExp(escapeRegEx(commonTrkUrl) + "\/?\\?","i");
    }
  }

  // utm_source
  commonUtmSource = mostCommonString("utm_source", medbridgeLinkUrlsList);
  if ( commonUtmSource ) {
    commonUtmSourceRegex = new RegExp(escapeRegEx(commonUtmSource) + "(&|$)","i");
  }
  // utm_campaign
  commonUtmCampaign = mostCommonString("utm_campaign", medbridgeLinkUrlsList);
  if ( commonUtmCampaign ) {
    commonUtmCampaignRegex = new RegExp(escapeRegEx(commonUtmCampaign) + "(&|$)","i");
  }


  //////////////////////////////
  //////////////////////////////
  //  Validate Links
  //  Loop through each link and run a validation function on each.
  //////////////////////////////
  //////////////////////////////

  var i = 0;
  for (let linkObj of linkList) {

    var linkErrors = 0;

    // Give the link object an ID property.
    // linkObj.korraId = i;
    // linkObj.wow = "ok";
    // console.log(linkObj.korraId);

    validateLinks(linkObj, i);

    i++;

  }
  console.groupEnd();


  //
  var totalLinksWithErrors = frameContents.querySelectorAll(".link-marker.error").length;
  // console.log("Links with Errors", linksWithErrorsArr.length, "Total Link Errors", totalLinkErrors);


  if ( source !== "fromContextMenu" ) {
    if ( totalLinksWithErrors > 0 ) {
      applyQaResults(linksQaBar, "error", "<korra-bold>" + totalLinksWithErrors + "</korra-bold> Links with Errors");
    } else {
      applyQaResults(linksQaBar, "success", "All Links Approved");
    }
  }

  // Otherwise, wait for the desktop iframe to finish loading.
  // Once it's done, run a function that will position our link markers.
  // I can only use .onload once per document. So instead we use an eventlistner.
  // After we're done, we need to remove the eventlistner.
  // Resource: https://stackoverflow.com/a/27032611/556079

  frameContents.addEventListener("load", function positionLinkMarkers(e) {

    var i = 0;
    for (let linkObj of linkList) {

      // Get the position of the current link.
      var linkPosition = getPosition(linkObj, frameContents);

      // Find the matching link marker in the DOM.
      var linkMarker = frameContents.querySelector("#link-marker-" + i);

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
      linkMarker.classList.add("positioned");

      i++;

    }
    // We're done, remove the eventlistener.
    frame.removeEventListener("load", positionLinkMarkers, false);

    // We defaulted the link markers wrapper to hidden using CSS. Reverse that now that their positions are ready.
    linkMarkerWrapper.style = "display:block";

    // Start watching the iframe's height and width.



  }, false);

  // We've successfully run through every link. Log our results.
  // console.log("linkInfoArray", linkInfoArray);
  console.info("linkInfoArray", linkInfoArray);


}



///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
/////
/////    Observe Resizing
/////    Adjust the position of the link markers as their parent container changes in size
/////
/////    https://developers.google.com/web/updates/2016/10/resizeobserver
/////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////

var lm = new ResizeObserver( entries => {

  for (let linkObj of linkList) {

    // Find each links position relative to the document so that we can reposition the link markers if the viewport changes size or if elements move around.
    var linkFoundPos = findLinkPos(linkObj, frameContents);
    var linkm = frameContents.querySelectorAll(".link-marker[data-number='" + linkObj.getAttribute('data-number') + "']")[0];

    // Links that have a top or left of 0 are hidden. So the marker should be hidden too.
    // Possibly too aggresive. What if I actually want a link at top:0 or left:0?
    // @TODO: Switch this to find the CURRENT display of the matching link instead.
            // if ( linkFoundPos[0] === 0 || linkFoundPos[1] === 0 ) {
            //   linkm.style.display = "none";
            // } else {
            //   linkm.style.display = "";
            // }
      linkm.style.display = "";

    // Using the links position, set the linkmarker to the 10px offset from the top and left.
    linkm.style.top  =  (linkFoundPos[0] - 10) + "px";
    linkm.style.left =  (linkFoundPos[1] - 10) + "px";

  }

});



///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
/////
/////
/////    Pinning and unpinning link markers
/////
/////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////

    /**
     * [someFunction description]
     * @param  {[type]} arg1 [description]
     * @param  {[type]} arg2 [description]
     * @return {[type]}      [description]
     */
    function pinLinkMarker(e) {
      // http://stackoverflow.com/a/8454104/556079
      this.classList.toggle("pinned");
      this.nextSibling.style.display = this.nextSibling.style.display === 'block' ? '' : 'block';
    }


    /**
     * [someFunction description]
     * @param  {[type]} arg1 [description]
     * @param  {[type]} arg2 [description]
     * @return {[type]}      [description]
     */
    function unpinLinkMarker(e) {

      var linkNum = this.dataset.number;

      frameContents.querySelectorAll("#link-marker-" + linkNum)[0].classList.toggle("pinned");

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




///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
/////
/////
/////    Create Link Error Marker and Row
/////
/////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////


/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */

// Function to handle creating error markers, error tags (that explain the error), and incrementing the error counter.
function createLinkErrorRow(linkObj, msg, type, icon, marker) {

  // Set the 'type' to error if one wasn't passed.
  if ( !type ) {
    type = "error";
  }

  if ( type === "error" ) {
    linkObj.dataset.error = true;
  }

  // Target the link marker in dFrame based on which link we're looking at right now
  var linkMarker = frameContents.querySelector("#link-markers .link-marker[data-number='" + linkObj.dataset.number + "']");
  linkMarker.classList.add("has-message");

  // Create an error pill
  var errorRow = document.createElement("korra-div");
      errorRow.dataset.korra = "";
  var errorRowText = document.createElement("korra-div");
      errorRowText.innerHTML = msg;
  errorRow.appendChild(errorRowText);


  allErrorMsgsForCurrentLink.push({[type]: msg});


  // Instead of just assuming linkErrorLogNoticeWrapper is the right wrapper, we'll reset it to a variable by checking for this link data number.
  // This is better because any errors that come in asynchronously can now be applied properly.
  var currentErrorWrapper = frameContents.querySelector("korra-link-data.link-errors[data-number='" + linkObj.dataset.number + "'] .link-errors-wrapper");
  currentErrorWrapper.appendChild(errorRow);

  if ( type === "warning" ) {

    errorRow.classList.add("warning");
    linkMarker.classList.add("warning");
    totalLinkWarnings++;

  } else {

    // Increment total preflight errors
    if ( typeof errorBox !== 'undefined' ) {
      incrementErrorUI(errorBox);
    }
    totalLinkErrors++;

    errorRow.classList.add("error");
    linkMarker.classList.add("error");

    linkObj.dataset.error = "true";

    // Instead of relying on the variables above, read the innerHtml of the linkMarker object. Convert it to a number and increment it. Better for async!
    if ( linkMarker.children[0].innerHTML === "" || linkMarker.children[0].innerHTML === "0" ) {
      linkMarker.children[0].innerHTML = "1";
    } else {
      var currentLinkErrors = Number(linkMarker.children[0].innerHTML);
      currentLinkErrors++;
      linkMarker.children[0].innerHTML = currentLinkErrors;
    }

  }

  if ( icon ) {
    errorRow.classList.add("fontastic-icon", "error-icon-" + icon);
  } else {
    errorRow.classList.add("error-icon-x");
  }

  if ( marker === "lock" ) {
    linkMarker.children[1].innerHTML = svgIconLock;
    linkMarker.classList.add("lock");
  }

  //////
  //////
  // if ( !containsObject(linkObj, linksWithErrorsArr) ) {
  //   linksWithErrorsArr.push(linkObj);
  // } else {
  //   linksWithErrorsArr.push("nope");
  // }
  if ( linksWithErrorsArr.includes(linkObj) ) { // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
    // linksWithErrorsArr.push("this link is already in the linksWithErrorsArr array"); // get ride of this eventually
  } else {
    linksWithErrorsArr.push(linkObj);
  }


}






///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
/////
/////
/////    Link Validation Loop
/////
/////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////

// An array that keeps track of which URL's we are doing an XHR for.
// Allows us to skip an XHR for duplicate links. Used in the checkURL function.
xhrLoopArray = [];

// How many times did we XHR?
totalXHRs = 0;

// The options related to checking XHR status
// var options = getOptions(); // Deprecated. This function was taken from another extension. Doesn't really work for me.
var linkMarkersList = [];

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
function validateLinks(linkObj, i) {

  // Set link URL to a variable.
  // Use getAttribute instead of linkObj.href because merge tag links get file:/// or localhost appended there when the page is loaded
  var linkHref = linkObj.getAttribute("href");

  // Making our counter for console.log 2 digits instead of 1. (1 vs 01)
  var iLog;
  if ( i < 10 ) {
    iLog = "0" + i;
  } else {
    iLog = i;
  }

  // Check link url length
  var ell;
  if ( linkHref ) {
    if ( linkHref.length > 70 ) {
      ell = linkHref.substring(0,70) + "...";
    } else {
      ell = linkHref;
    }
  }
  else {
    ell = "no href attribute";
  }

  console.groupCollapsed("[" + iLog + "] " + ell);
  console.log(linkObj);

  //
  linkObj.classList.add("marked");
  linkObj.dataset.number = i;

  // Create a corresponding link marker (#) for this link and append it to parent container after the associated error log
  // innerHTML out empty. Eventually fills with error count (1, 2, 3)
  // Begins with a loading spinner. Gets removed later when all checks have finished.
  //
  /////////
  var linkMarker = document.createElement("korra-link-marker");
  linkMarker.id = "link-marker-" + i;
  linkMarker.className = "link-marker loading";

  linkMarker.dataset.href = linkHref;
  linkMarker.dataset.number = i;
  linkMarker.addEventListener("click", pinLinkMarker, false);

  // child to hold error total
  var linkMarkerErrorsSection = document.createElement("korra-div");
  linkMarkerErrorsSection.classList.add("link-marker-error-total");
  linkMarker.appendChild(linkMarkerErrorsSection);

  // child to hold status icon (svg)
  var linkMarkerStatusSection = document.createElement("korra-div");
  linkMarkerStatusSection.classList.add("link-marker-status");
  linkMarker.appendChild(linkMarkerStatusSection);

  frameContents.getElementById("link-markers").appendChild(linkMarker);
  linkMarkersList.push(linkMarker);

  // Create a container that will hold all of the errors associated with this link.
  var linkErrorLog = document.createElement("korra-link-data");
  linkErrorLog.className = "link-errors";
  linkErrorLog.dataset.number = i;
  linkErrorLog.addEventListener("mousedown", unpinLinkMarker, false);
  // insertAfter(linkErrorLog, linkMarker);
  linkMarker.parentNode.insertBefore(linkErrorLog, linkMarker.nextSibling);

  // Create a container for the link href to show with the errors
  var linkErrorLogURL = document.createElement("korra-div");
  linkErrorLogURL.className = "link-errors-url";
  linkErrorLogURL.innerHTML = "<korra-div class='link-number'>#" + (i + 1) + "</korra-div><korra-div class='link-url'>" + linkHref + "</korra-div>";

  //
  // var linkErrorLogURLTextNode = document.createTextNode(linkHref);
  // linkErrorLogURL.appendChild(linkErrorLogURLTextNode);
  linkErrorLog.appendChild(linkErrorLogURL);

  // Wrapper for error badges and status info
  var linkInfoContainer = document.createElement("korra-div");
  linkInfoContainer.className = "link-info-container";
  linkErrorLog.appendChild(linkInfoContainer);

  // Wrapper for error badges
  var linkErrorBubbleWrapper = document.createElement("korra-div");
  linkErrorBubbleWrapper.className = "link-errors-wrapper link-info-wrapper";
  linkInfoContainer.appendChild(linkErrorBubbleWrapper);


  // Hold all of the error messages for each link. Will be added to the array above for use in the Link Browser.
  allErrorMsgsForCurrentLink = [];

  // Holds all of the data for a single link.
  var singleLinkInfoArray = {};

  singleLinkInfoArray.object = linkObj; //link object
  singleLinkInfoArray.url = linkHref; //link url
  singleLinkInfoArray.text = linkObj.textContent.trim(); //link text
  singleLinkInfoArray.imgsLinked = linkObj.querySelectorAll('img'); // images linked
  singleLinkInfoArray.querystring = decipherQuerystring(linkHref, linkObj); //querystring
  singleLinkInfoArray.espMergeTag = false;
  singleLinkInfoArray.type = null;
  singleLinkInfoArray.checkStatus = null;

  // What kind of content is linked? text, img, none, or mixed (text and img)
  /////
  if ( singleLinkInfoArray.imgsLinked.length > 0 && singleLinkInfoArray.text !== "" ) {
    singleLinkInfoArray.contentLinked = 'mixed';

  } else if ( singleLinkInfoArray.imgsLinked.length > 0 ) {
    singleLinkInfoArray.contentLinked = 'img';

  } else if ( singleLinkInfoArray.text ) {
    singleLinkInfoArray.contentLinked = 'text';

  } else {
    singleLinkInfoArray.contentLinked = 'none';
  }

  // Assign a type to the URL based on how its written
  // mailto
  if ( !linkHref || linkHref === "" ) {
    singleLinkInfoArray.type = "empty"; //empty
    singleLinkInfoArray.checkStatus = false;

  } else if ( linkObj.protocol === "mailto:" ) {
    singleLinkInfoArray.type = "mailto"; //mailto link
    singleLinkInfoArray.checkStatus = false;

  //merge tags
  } else if ( /^\[.+?\]$/.test(linkHref) ) {
    singleLinkInfoArray.espMergeTag = "sendgrid";
    singleLinkInfoArray.type = "merge tag";
    singleLinkInfoArray.checkStatus = false;

  } else if ( /^\*\|.+?\|\*$/.test(linkHref) ) {
    singleLinkInfoArray.espMergeTag = "mailchimp";
    singleLinkInfoArray.type = "merge tag";
    singleLinkInfoArray.checkStatus = false;

  } else if ( /^\[\[.+?\]\]$/.test(linkHref) ) {
    singleLinkInfoArray.espMergeTag = "getresponse";
    singleLinkInfoArray.type = "merge tag";
    singleLinkInfoArray.checkStatus = false;

  } else if ( /^\%.+?\%$/.test(linkHref) ) {
    singleLinkInfoArray.espMergeTag = "activecampaign";
    singleLinkInfoArray.type = "merge tag";
    singleLinkInfoArray.checkStatus = false;

  } else if ( /^#.+?#$/.test(linkHref) ) {
    singleLinkInfoArray.espMergeTag = "on24";
    singleLinkInfoArray.type = "merge tag";
    singleLinkInfoArray.checkStatus = false;

  } else if ( /^({{|\%\%).+?(\%\%$|}})/.test(linkHref) ) {
    singleLinkInfoArray.espMergeTag = "pardot";
    singleLinkInfoArray.type = "merge tag";
    singleLinkInfoArray.checkStatus = false;

  // http
  } else if ( linkObj.protocol === "http:" ) {
    singleLinkInfoArray.type = "http"; //normal link
    singleLinkInfoArray.checkStatus = true;

  // https
  } else if ( linkObj.protocol === "https:" ) {
    singleLinkInfoArray.type = "https"; //secure link
    singleLinkInfoArray.checkStatus = true;

  // unknown
  } else {
    singleLinkInfoArray.type = "unknown"; //no idea what this link is
    singleLinkInfoArray.checkStatus = true;

  }

  // Is this the first time this link appears in the DOM?
	if ( xhrLoopArray.includes(linkHref) ) {
    console.log("This link (" + i + ") is a duplicate.");
    singleLinkInfoArray.firstInstance = false;
  } else {
    console.log("This link (" + i + ") is unique.");
    singleLinkInfoArray.firstInstance = true;
  }
  xhrLoopArray.push(linkHref); // Add it to the array.
  singleLinkInfoArray.instanceOrder = countInsideArray(xhrLoopArray, linkHref); // Apply an order #. (eg. the 4th instance of this exact link in the DOM)


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

  // If the link doesn't have an href attribute, stop this loop.
  if ( !linkHref ) {
    createLinkErrorRow(linkObj, "Missing href attribute.");
    // linkMarkerDone(linkMarker);
  }

  // Empty link? Skip it.
  ///////////////////////
  else if ( linkHref === "" ) {
    createLinkErrorRow(linkObj, "Empty Link.");
  }

  // VALIDATE MERGE TAGS
  //////////////////////
  // If this is a merge tag link - MailChimp, SendGrid, or GetResponse link (eg. *|ARCHIVE|* or [weblink] [[email]]
  else if ( singleLinkInfoArray.type === "merge tag" ) {

    // Links in an email for the GetResponse Platform
    if ( emailPlatform === "gr" && /(\*\|.+?\|\*|\*\%7C.+?%7C\*|\[[^\[\]]+?\][^\]])/gi.test(linkHref) ) { // Look for MailChimp and SendGrid merge tags.
      createLinkErrorRow(linkObj, "Wrong merge tag for this platform (" + emailPlatformName + ").");
    }
    // Links in an email for the MailChimp Platform
    else if ( emailPlatform === "mc" && /^\[\[?.+\]\]?/gi.test(linkHref) ) { // Look for SendGrid and GR merge tags.
      createLinkErrorRow(linkObj, "Wrong merge tag for this platform (" + emailPlatformName + ").");
    }
    // Links in an email for the SendGrid Platform
    else if ( emailPlatform === "sg" && /(^\[\[.+\]\]|\*\|.+?\|\*|\*\%7C.+?%7C\*)/gi.test(linkHref) ) { // Look for MailChimp and GR merge tags.
      createLinkErrorRow(linkObj, "Wrong merge tag for this platform (" + emailPlatformName + ").");
    }

    // QUICK FIX: The mailchimp merge tag *|...|* doesn't play well with Twitter during our ajax request. We need to escape the pipes | in order to get a working URL.
    // These tags automatically change in MailChimp so it's no problem there. Just right now when we are testing the URL.
    // This may also be a problem with SendGrid, GetResponse, etc. Look into that.
    if ( linkHref.match(/\*\|.+?\|\*/) ) {
      linkHref = linkHref.replace(/\|/g,"%7C");
    }
  }

  // VALIDATE MAILTOS
  ///////////////////
  else if ( singleLinkInfoArray.type === "mailto" ) {
    // @ TODO
  }

  // VALIDATE ALL OTHER LINKS
  ///////////////////////////
  else {

    // Check if we're online. If not, we need to apply a warning badge.
    // This excludes merge tags since there's nothing to check except for formatting.
    if ( !navigator.onLine && singleLinkInfoArray.checkStatus === true ) {
      createLinkErrorRow(linkObj, "Be aware that you are currently offline.", "warning");
    }

    console.log("url - " + linkHref);

    // Global link testing variables

    // MedBridgeEd
    if ( /\.medbridgeeducation\.com/gi.test(linkObj.hostname) ) {
      singleLinkInfoArray.isMedBridgeEdLink = true;
    } else {
      singleLinkInfoArray.isMedBridgeEdLink = false;
    }

    // Massage
    if ( /\.medbridgemassage\.com/gi.test(linkObj.hostname) ) {
      singleLinkInfoArray.isMedBridgeMassageLink = true;
    } else {
      singleLinkInfoArray.isMedBridgeMassageLink = false;
    }

    // MedBridge Brand
    if ( singleLinkInfoArray.isMedBridgeEdLink || singleLinkInfoArray.isMedBridgeMassageLink ) {
      singleLinkInfoArray.isMedBridgeBrandLink = true;
    } else {
      singleLinkInfoArray.isMedBridgeBrandLink = false;
    }

    //// Is Blog Link
    if ( singleLinkInfoArray.isMedBridgeEdLink && (/\.com\/blog/.test(linkHref) || /url=\/?blog.+?p=/.test(linkHref) || /\-blog(\/|\?)/.test(linkHref) || /after_affiliate_url=\/?blog/.test(linkHref)) ) {
      singleLinkInfoArray.isBlogLink = true;
    } else {
      singleLinkInfoArray.isBlogLink = false;
    }

    // Is Article Link
    if ( singleLinkInfoArray.isMedBridgeEdLink && /blog/i.test(linkHref) && /(\/20\d\d\/\d\d\/|p=.+)/i.test(linkHref) && !/p=2503/gi.test(linkHref) ) {
      singleLinkInfoArray.isArticle = true;
    } else {
      singleLinkInfoArray.isArticle = false;
    }

    // is Marketing URL
    if ( singleLinkInfoArray.isMedBridgeBrandLink && /(\.com\/(gr|mc)?trk\-|after_affiliate_url=)/gi.test(linkHref) ) {
      singleLinkInfoArray.isMarketingUrl = true;
    } else {
      singleLinkInfoArray.isMarketingUrl = false;
    }

    // Has tracking link back (after_affiliate_url)
    if ( singleLinkInfoArray.isMedBridgeBrandLink && /after_affiliate_url/gi.test(linkHref) ) {
      singleLinkInfoArray.hasTrackingLinkback = true;
    } else {
      singleLinkInfoArray.hasTrackingLinkback = false;
    }

    // Needs Google Tracking (utm_content
    linkNeedsGoogleTracking = false;
    if ( singleLinkInfoArray.isMedBridgeEdLink && !outsideOrg && emailPlatform === "mc" ) {
      linkNeedsGoogleTracking = true;
    } else {
      linkNeedsGoogleTracking = false;
    }
    console.log("linkNeedsGoogleTracking - " + linkNeedsGoogleTracking);

    ////
    var linkNeedsPromoCode;
    if ( (emailSubType === "ns" && !outsideOrg && emailPlatform !== "pd" && emailDisc !== "ent" ) && singleLinkInfoArray.isMedBridgeBrandLink ) {
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


    if ( !/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(linkHref) ) {
      createLinkErrorRow(linkObj, "Invalid URL scheme [1].");
    }

    // http://stackoverflow.com/a/9284473/556079
    // https://gist.github.com/dperini/729294
    // Edited by me to allow _ in subdomain.
    // Does not support _ in domain, but it should.
    // Does not support URL's ending with a - but it should.
    else if ( !/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9](?:_|-)*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(linkHref) )
    {
      createLinkErrorRow(linkObj, "Invalid URL scheme [2].");
    }


    // Marketing URL's
    // trk = mc, grtrk = getresponse
    if ( emailPlatform === "gr" && linkNeedsPromoCode && !/\.com\/grtrk\-/i.test(linkHref) ) { // Look for MailChimp and SendGrid merge tags.
      createLinkErrorRow(linkObj, "Wrong tracking url for this email platform, use grtrk-.");
    }


    //////
    ////// Detect the use of merge tags.
    ////// This is different than earlier where detected links that were JUST merge tags. Like [[email]] and *|UNSUB|*

      // Wrong merge tags in a Link for the GetResponse Platform
      if ( emailPlatform === "gr" && /(\*\|.+?\|\*|\*\%7C.+?%7C\*|^\[[A-Za-z0-9]+?\])/gi.test(linkHref) ) { // Look for MailChimp and SendGrid merge tags.
        createLinkErrorRow(linkObj, "Wrong merge tag for this platform (" + emailPlatformName + ").");
      }
      // Wrong merge tags in a Link for the MailChimp Platform
      else if ( emailPlatform === "mc" && /^\[\[?.+\]\]?/gi.test(linkHref) ) { // Look for SendGrid and GR merge tags.
        createLinkErrorRow(linkObj, "Wrong merge tag for this platform (" + emailPlatformName + ").");
      }

    ///////////////////////
    ///////////////////////
    ///////////////////////
    ///////////////////////


    ////-----------------------------////
    ////
    // Link do NOT need a target attribute.

    if ( options.sync.checkTargetAttribute === "1" ) {
      if ( linkObj.hasAttribute("target") ) {
        createLinkErrorRow(linkObj, "Target attribute not needed.");
      }
    }

    ////-----------------------------////
    ////
    // utm's other than content are unlikely to be used

    // !!!! //////////////////// Re-active this when I can make a feature that allows you to ignore it.

    // if ( /utm_(medium|source|campaign)/gi.test(linkHref) ) {
    //   createLinkErrorRow(linkObj, "extra utm's");
    // }

    ////-----------------------------////
    ////
    // MUST HAVE UTM - Check for utm_content on links going to medbridgeeducation.com or medbridgemassage.com. Error if utm_content is not present.
    if ( linkNeedsGoogleTracking && !/utm_content/gi.test(linkHref) ) {
      createLinkErrorRow(linkObj, "Missing <code>utm_content</code>.");
    }

    ////-----------------------------////
    ////
    // MUST HAVE UTM - Check for utm_content on links going to medbridgeeducation.com or medbridgemassage.com. Error if utm_content is not present.
    if ( /\.com\/\//gi.test(linkHref) ) {
      createLinkErrorRow(linkObj, "Remove extra /.");
    }

    ////-----------------------------////
    ////
    // MUST HAVE UTM - Check for utm_content on links going to medbridgeeducation.com or medbridgemassage.com. Error if utm_content is not present.
    if ( /after_affiliate_url=&/i.test(linkHref) ) {
      createLinkErrorRow(linkObj, "Missing redirect URL for <code>after_affiliate_url</code>. ");
    }

    ////-----------------------------////
    ////
    // DON'T USE UTM - outsideOrg and off domain urls should not have utms
    if ( /utm_content/gi.test(linkHref) && !singleLinkInfoArray.isMedBridgeEdLink ) {
      createLinkErrorRow(linkObj, "Remove <code>utm_content</code> parameter in non-MedBridge links.");
    }

    ////-----------------------------////
    ////
    // MedBridge links must be https. If only because it makes sorting links easier when we do our metrics
    if ( singleLinkInfoArray.isMedBridgeBrandLink && singleLinkInfoArray.type !== "https" ) {
      createLinkErrorRow(linkObj, "Use <code>https</code> for MedBridge links.");
    }

    ////-----------------------------////
    ////
    // Check tracking links to see if the URL is consistent with the rest of the links.
    // eg. If most links say trk-sep-17-davenport, but this one says trk-sep-17-walter, throw an error.
    // The logic for this is resolved higher up where we looped through each link, saved all tracking URLs to an array, and determined the most common occurence.

    if ( emailSubType === "ns" && singleLinkInfoArray.isMarketingUrl && linkNeedsPromoCode ) {
      // Ignore if the links pathname ends in -student
      if ( !commonTrkUrlRegex.test(linkHref) && !/\-student\/?$/gi.test(linkObj.pathname) ) {
        createLinkErrorRow(linkObj, "Tracking URL is missing or inconsistent, " + commonTrkUrl + " is most common. - " + linkHref);
      }
    }

    if ( singleLinkInfoArray.isMedBridgeBrandLink && emailPlatform !== "gr" ) {
      if ( commonUtmSource ) {
        if ( !commonUtmSourceRegex.test(linkHref) ) {
          createLinkErrorRow(linkObj, "<code>utm_source</code> is missing or inconsistent, " + commonUtmSource + " is most common.");
        }
      }
      if ( commonUtmCampaign ) {
        if ( !commonUtmCampaignRegex.test(linkHref) ) {
          createLinkErrorRow(linkObj, "<code>utm_campaign</code> is missing or inconsistent, " + commonUtmCampaign + " is most common.");
        }
      }
    }

    ////
    // Check for whitelabeling versus www
    if ( outsideOrg && singleLinkInfoArray.isMedBridgeEdLink ) {

      if ( /https?:\/\/(www\.)?med/.test(linkHref) ) {
        createLinkErrorRow(linkObj, "Missing whitelabeling.");
      }
      else if ( ( emailOrgName === "hs" && !/\/(encompasshealth|healthsouth)\./i.test(linkHref)) || (emailOrgName === "dr" && !/\/drayerpt\./i.test(linkHref)) || (emailOrgName === "fox" && !/\/foxrehab\./i.test(linkHref)) ) {
        createLinkErrorRow(linkObj, "Incorrect whitelabeling.");
      }

    }
    if ( !outsideOrg && singleLinkInfoArray.isMedBridgeEdLink && !/\/(support\.|www\.|medbridgeed(ucation)?\.com)/gi.test(linkHref) ) {
      createLinkErrorRow(linkObj, "Remove whitelabeling.");
    }

    ////
    ////
    // Validate querystring pattern if it looks like there is one
    //////////////
    //////////////
    //////////////

    // http://stackoverflow.com/a/23959662/556079
    // http://rubular.com/r/kyiKS9OlsM

    // Check the query string without any ending hash
    // Ignore links with after_signin_url, we'll check that later.
    var linkHrefNoHash = linkHref.replace(/\#.+/, "");

    if ( /[^#]+\&.+\=/.test(linkHrefNoHash) || /[^#]+\?.+\=/.test(linkHrefNoHash) && ( !/after_signin_url/.test(linkHrefNoHash) ) ) {

      if ( /\&.+\=/.test(linkHref) && !/\?./.test(linkHref) ) {
        createLinkErrorRow(linkObj, "Missing ? in querystring.");
      }

      if ( /\?[^#]+\?.+\=/.test(linkHref) ) {
        createLinkErrorRow(linkObj, "Replace the ? with an & in the querystring.");
      }

      ///////////
      // @TODO - Add exclusions for merge tags
      ///////////

      // Add characters you want to ignore twice. Like *, |, and '.
      if ( !/\?([\@\%\.\w-]+(=[\!\'\*\|\:\+\@\%\.\/\w-]*)?(&[\@\%\.\w-]+(=[\'\*\|\+\@\%\.\/\w-]*)?)*)?$/.test(linkHrefNoHash) ) {
        createLinkErrorRow(linkObj, "Invalid querystring.");
        console.log(linkHrefNoHash);
      }

    }
          // after_signin_url is different.
          // If you're using more than one qs parameter then the ? needs to be followed immediately
          // by another ? for the redirect to carry the parameters over to the next page.
          if ( /after_signin_url=/.test(linkHrefNoHash) ) {

            // Can't (shouldn't) do &after_signin_url.
            if ( !/\?after_signin_url=/.test(linkHref) ) {
              createLinkErrorRow(linkObj, "<code>after_signin_url</code> must be the first parameter.");
            }

            if ( /\?after_signin_url=[^\?#]*?&/.test(linkHref) ) {
              createLinkErrorRow(linkObj, "Replace the & with a ? in the querystring.");
            }

          }

    // Leftover & or ? from a removed querystring
    if ( /(\?|&)$/g.test(linkHref) ) {
      createLinkErrorRow(linkObj, "Remove the trailing ? or &.");
    }



    ////-----------------------------////
    ////
    if ( /google\.com\/url\?/gi.test(linkHref) ) {
      createLinkErrorRow(linkObj, "This looks like a Google redirect.");
    }

    ////-----------------------------////
    ////
    if ( linkNeedsPromoCode ) {

      // Links to MedBridge in -ns emails need to use a marketing URL
      if ( !/\.com\/(gr|mc)?trk\-/gi.test(linkHref) || /\.com\/(signin|courses\/|blog\/)/gi.test(linkHref) ) {
        createLinkErrorRow(linkObj, "Use a Marketing URL.");
      }

      // Spell after_affiliate_url correctly!
      if ( !/\-(blog|article)/gi.test(linkHref) && !/after_affiliate_url/gi.test(linkHref) ) {
        createLinkErrorRow(linkObj, "Missing after_affiliate_url query parameter.");
      }

      // Too many leading /'s' during a redirect can cause a link to not work
      if ( /after_affiliate_url=\/\/+/gi.test(linkHref) ) {
        createLinkErrorRow(linkObj, "Too many consecutive /s.");
      }

      // Watch out for extra hyphens!
      if ( /\-\-.+?after_affiliate_url/gi.test(linkHref) ) {
        createLinkErrorRow(linkObj, "Investigate consecutive hyphens.");
      }
      // Watch out for extra forward slashes!
      if ( /https?:\/\/.+?\/\//gi.test(linkHref) ) {
        createLinkErrorRow(linkObj, "Investigate consecutive forward slashes.");
      }

      // console.log("emailDate.getMonth(); " + emailDate.getMonth());

      // Check the date in a tracking URL if the email's filename has a date in it to match against
      if ( labelsAvailable ) {
        if ( emailDate.getMonth() ) {
          var monthPattern = new RegExp("\\/(gr|mc)?trk\\-.*?" + emailMonthAbbr + "\\-", "gi");
          if ( !monthPattern.test(linkHref) ) {
            createLinkErrorRow(linkObj, "Link should include '-" + emailMonthAbbr + "-' to match month in filename.");
          }
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
    // console.log("singleLinkInfoArray.isMedBridgeBrandLink: " + singleLinkInfoArray.isMedBridgeBrandLink);

    if ( linkNeedsGoogleTracking && emailPlatform !== "gr" ) {

      var moduleNumber = linkObj.closest("[data-module-count]");

      if ( elementExists(moduleNumber) ) {

        moduleNumber = moduleNumber.getAttribute("data-module-count");
        var moduleNumberMatch = new RegExp("utm_content=.*?mod" + moduleNumber + "(\/|\-|&|$|#)", "gi");

        // mod followed by 1 or 2 digits, followed by - or # or & or the link ends.
        if ( /utm_content=.*?mod\d(\d)?(\/|\-|&|$|#)/gi.test(linkHref) ) {

          if ( !moduleNumberMatch.test(linkHref) ) {
            // console.log( "no match: " + !moduleNumberMatch.test(linkHref) );
            createLinkErrorRow(linkObj, "Wrong mod #, use " + "mod" + moduleNumber + ".");
          } else {
            // console.log( "match: " + !moduleNumberMatch.test(linkHref) );
          }

        } else {

          createLinkErrorRow(linkObj, "Missing or mistyped mod #, use mod" + moduleNumber + ".");

        }
      }
    }

    ////
    // Is color present in the style attribute?
    // Ignore if there's no text, or it's an image (unless that image has alt text).
    ////

    var linkedImg;

    // Get the img child first.
    if ( elementExists(linkObj.getElementsByTagName('img')[0]) ) {
      linkedImg = linkObj.getElementsByTagName('img')[0];


    if ( linkObj.style.color === '' ) {

      if ( (linkedImg && linkObj.textContent !== '') || linkObj.textContent !== '' )
      createLinkErrorRow(linkObj, "Missing color in style attribute.");
      }

    }

    // @TODO: Not seeing this bug. Disabled until I see it again.
    // if ( linkObj.style.textAlign !== '' && linkedImg ) {
    //   createLinkErrorRow(linkObj, "Don't use <code>text-align</code> in links when linking images, it breaks in Safari.");
    // }



    ////
    // Check for old fashioned marketing URLS in sub, ent, or outsideOrg
    if ( (outsideOrg || emailSubType === "sub" || emailDisc === "ent" ) && (singleLinkInfoArray.isMedBridgeBrandLink && /\.com\/(gr|mc)?trk\-/gi.test(linkHref) || /after_affiliate_url/gi.test(linkHref)) ) {
      createLinkErrorRow(linkObj, "Do not use a Marketing URL.");
    }

    ////
    // Check for medium=email in Sale and Presale emails
    if ( (emailSubType === "sub" || !emailAnySale) && /[\?&]medium=email/gi.test(linkHref) ) {

      createLinkErrorRow(linkObj, "Remove <code>medium=email</code>.");

    }

    else if ( emailSubType === "ns" && !outsideOrg && singleLinkInfoArray.isMedBridgeBrandLink && ( singleLinkInfoArray.isArticle || /\-article/gi.test(linkHref) ) ) {

      if ( emailAnySale && !/medium=email/gi.test(linkHref)) { // Any sale email
        createLinkErrorRow(linkObj, "Add <code>medium=email</code>.");
      }

    }


    //
    // Check ns emails
    //
    if ( singleLinkInfoArray.isMedBridgeEdLink && emailSubType === "ns" ) {

      // Webinars
      if ( /\.com\/webinars(\?|\/|#|$)[^d]/gi.test(linkHref) ) {
        createLinkErrorRow(linkObj, "Link to /live-webinars instead in Non-Subscriber emails.");
      }

    }

    //
    // Check sub emails
    //
    if ( singleLinkInfoArray.isMedBridgeEdLink && (emailSubType === "sub" || outsideOrg) ) {

      //
      if ( /\.com\/continuing-education(\?|\/|#|$)/gi.test(linkHref) ) {
        createLinkErrorRow(linkObj, "Link to /courses instead in Subscriber emails.");
      }
      //
      if ( /\.com\/(speech-language-pathology|occupational-therapy|athletic-training|physical-therapy)(\?|\/|#|$)/gi.test(linkHref) ) {
        createLinkErrorRow(linkObj, "Link to a page without conversion messaging in Subscriber emails.");
      }
      // Webinars
      if ( /\.com\/live-webinars(\?|\/|#|$)/gi.test(linkHref) ) {
        createLinkErrorRow(linkObj, "Link to /webinars instead in Subscriber emails.");
      }

      ////
      // Check for sub=yes
      ////
      // sub=yes is required in blog links.
      if ( singleLinkInfoArray.isBlogLink && !/sub=yes/gi.test(linkHref) ) {
        createLinkErrorRow(linkObj, "Add <code>sub=yes</code>.");
      }
      // sub=yes should not be in any other links.
      if ( ( !singleLinkInfoArray.isBlogLink && !/\-(blog|article)/gi.test(linkHref) ) && /sub=yes/gi.test(linkHref) ) {
        createLinkErrorRow(linkObj, "Remove <code>sub=yes</code>.");
      }

    }

    ////
    // Check for broken article links in sub
    if ( singleLinkInfoArray.isMedBridgeEdLink && emailSubType === "sub" && /p=\d\d\d/gi.test(linkHref) && !/\.com\/blog(\/|\?)/gi.test(linkHref) ) {
      createLinkErrorRow(linkObj, "Article link is broken.");
    }

    ////
    // Check all links in non-subscriber emails for sub=yes, never use it in ns.
    if ( emailSubType === "ns" && /sub=yes/gi.test(linkHref) ) {
      createLinkErrorRow(linkObj, "Remove <code>sub=yes</code>.");
    }

    ////
    // Verify links in A/B emails if it looks like the link is using -a or -b.
    if ( singleLinkInfoArray.isMarketingUrl && abTesting === "a" && /\-b[\?\/]/i.test(linkHref) ) {
      createLinkErrorRow(linkObj, "Fix a/b version.");
    }
    if ( singleLinkInfoArray.isMarketingUrl && abTesting === "b" && /\-a[\?\/]/i.test(linkHref) ) {
      createLinkErrorRow(linkObj, "Fix a/b version.");
    }
    if ( singleLinkInfoArray.isMarketingUrl && (abTesting !== "a" && abTesting !== "b") && /\-(a|b)[\?\/]/i.test(linkHref) ) {
      createLinkErrorRow(linkObj, "Remove -a/-b.");
    }


    ////
    // Link Text Hints
    // Only test for link -vs- text inconsistencies if we've determined that the linked content actually includes text.
    if ( singleLinkInfoArray.contentLinked === 'mixed' || singleLinkInfoArray.contentLinked === 'text' ) {

      // Request a Demo
      if ( ( /(Group Pricing|Part of an organization|(Schedule|Request) (Group|a Demo|Info))|Pricing/gi.test(linkObj.textContent) && !/#request\-a\-demo/i.test(linkHref) ) || (!/(form|schedule time|(Group Pricing|Part of an organization|(Schedule|Request) (Group|a Demo|Info))|Pricing|Request)/gi.test(linkObj.textContent) && /#request\-a\-demo/i.test(linkHref)) ) {
        createLinkErrorRow(linkObj, "Text and URL are inconsistent (Demo Request related).");
      }
      // Request EMR Integration
      if ( (singleLinkInfoArray.contentLinked === 'mixed' || singleLinkInfoArray.contentLinked === 'text') && (/Request (EMR|Integration)/gi.test(linkObj.textContent) && !/#request-integration/i.test(linkHref)) || (!/Request|EMR|Integration/gi.test(linkObj.textContent) && /#request-integration/i.test(linkHref)) ) {
        createLinkErrorRow(linkObj, "Text and URL are inconsistent (EMR Integration related).");
      }

    }

    if ( emailOrgName !== "hs" ) {
      if ( /\barticle\b/gi.test(linkObj.textContent) && !singleLinkInfoArray.isArticle ) {
        createLinkErrorRow(linkObj, "Text references an article but the URL does not go to one.");
      }
      if ( /\barticles\b/gi.test(linkObj.textContent) && !singleLinkInfoArray.isBlogLink ) {
        createLinkErrorRow(linkObj, "Text references articles but the URL does not go to the blog.");
      }
      // This was a failed experiment. I later realized that we would want to link article titles that don't
      // have the word "Read" or "Article" in them.
      // if ( !/Read|Article/gi.test(linkObj.textContent) && singleLinkInfoArray.isArticle ) {
      //   createLinkErrorRow(linkObj, "Link text does not match url (article related) [2].");
      // }
    }

    ////
    // Enterprise
    // Deprecated - Just because a contact is subscribed to our Enterprise solution, doesn't mean that they have all of the enterprise products.
    // if ( singleLinkInfoArray.isMedBridgeBrandLink && emailSubType === "sub" && emailDisc === "ent" && /request\-a\-demo/gi.test(linkHref) ) {
    //   createLinkErrorRow(linkObj, "no demo requests in enterprise sub");
    // }

    //// Using after_signin_url on Subscriber links
    ///////////////////////////////////////////////
    // outsideOrg and subs should not link to home-exercise-program.
    // Use sign-in/?after_signin_url=patient_care/programs/create

    // Check that this is a sub or outsideorg email
    if ( outsideOrg || emailSubType === "sub") {

      // // // Courses
      // if ( /\.com\/courses\/details\//gi.test(linkHref) ) {
      //   createLinkErrorRow(linkObj, "Use <code>sign-in/?after_signin_url=courses/details/...</code>");
      // }

      // Patient Education
      if ( /\.com\/patient\-education\-library\/condition\//gi.test(linkHref) ) {
        createLinkErrorRow(linkObj, "Use <code>sign-in/?after_signin_url=patient-education-library/condition/...</code>");
      }

      // Webinars
      if ( /\.com\/webinars\/details\//gi.test(linkHref) ) {
        createLinkErrorRow(linkObj, "Use <code>sign-in/?after_signin_url=webinars/details/...</code>");
      }
      // HEP
      if ( /\.com\/home\-exercise\-program/gi.test(linkHref) || /patient_care\/programs\/create/gi.test(linkHref) ) {

        if ( !/after_signin_url/gi.test(linkHref) ) {
          createLinkErrorRow(linkObj, "Use <code>sign-in/?after_signin_url=patient_care/programs/create</code>");
        }

      }

      // TODO: TEMPORARY UNTIL DEV FIXES A BUG
      if ( /after_signin_url=/gi.test(linkHref) && !outsideOrg && !/(patient_care\/programs\/create|webinars\/details\/|patient\-education\-library\/condition)/gi.test(linkHref) && !/refer/gi.test(linkHref) ) {
        createLinkErrorRow(linkObj, "Don't use <code>after_signin_url</code> (temporary).");
      }

    } else {
      // This is an NS email? No after_signin_url for you!
      if ( /(\.com\/sign-in|after_signin_url=)/gi.test(linkHref) ) {
        createLinkErrorRow(linkObj, "Don't use sign-in related URLs in Non-Subscriber emails.");
      }
    }

    if ( (!outsideOrg && emailSubType !== "sub") && /patient_care\/programs\/create/gi.test(linkHref) ) {
      createLinkErrorRow(linkObj, "use <code>home-exercise-program</code>");
    }



    ////
    // Tracking URL - Discipline Check

    if ( emailDisc !== "multi" && emailDisc !== "ent" && emailDisc !== null && emailSubType === "ns" && singleLinkInfoArray.isMedBridgeBrandLink && !/\/courses\/details\//g.test(linkHref) && singleLinkInfoArray.isMarketingUrl ) {

      if ( emailDisc === "pt" && !/\-pt(\-(\/?$|.+?(\?|\&)after|$)|\/|\?)/gi.test(linkHref) ) {
        createLinkErrorRow(linkObj, "Missing/wrong discipline.");
      }
      if ( emailDisc === "at" && !/\-at(\-(\/?$|.+?(\?|\&)after|$)|\/|\?)/gi.test(linkHref) ) {
        createLinkErrorRow(linkObj, "Missing/wrong discipline.");
      }
      if ( emailDisc === "ot" && !/\-ot(\-(\/?$|.+?(\?|\&)after|$)|\/|\?)/gi.test(linkHref) ) {
        createLinkErrorRow(linkObj, "Missing/wrong discipline.");
      }
      if ( emailDisc === "slp" && !/\-slp(\-(\/?$|.+?(\?|\&)after|$)|\/|\?)/gi.test(linkHref) ) {
        createLinkErrorRow(linkObj, "Missing/wrong discipline.");
      }
      if ( emailDisc === "other" && !/\-other(\-(\/?$|.+?(\?|\&)after|$)|\/|\?)/gi.test(linkHref) ) {
        createLinkErrorRow(linkObj, "Missing/wrong discipline.");
      }
    }

    // Homepage - Discipline Check
    // Checking NS and SUB.
    if ( emailDisc !== "multi" && emailDisc !== "all" && emailDisc !== null && emailDisc !== undefined && !outsideOrg && singleLinkInfoArray.isMedBridgeBrandLink ) {

      if ( (emailDisc !== "pt" && emailDisc !== "other") && (/after_affiliate_url=\/?physical-therapy(&|$)/gi.test(linkHref) || /\.com\/physical-therapy\/?(\?|$)/gi.test(linkHref)) ) {
        createLinkErrorRow(linkObj, "Wrong homepage.");
      }
      if ( (emailDisc !== "other" && emailDisc !== "lmt") && (/after_affiliate_url=\/(&|$)/gi.test(linkHref) || /\.com\/(\?|$)/gi.test(linkHref)) ) {
        createLinkErrorRow(linkObj, "Wrong homepage.");
      }
      if ( emailDisc !== "at" && (/after_affiliate_url=\/?athletic-training(&|$)/gi.test(linkHref) || /\.com\/athletic-training\/?(\?|$)/gi.test(linkHref)) ) {
        createLinkErrorRow(linkObj, "Wrong homepage.");
      }
      if ( emailDisc !== "ot" && (/after_affiliate_url=\/?occupational-therapy(&|$)/gi.test(linkHref) || /\.com\/occupational-therapy\/?(\?|$)/gi.test(linkHref)) ) {
        createLinkErrorRow(linkObj, "Wrong homepage.");
      }
      if ( emailDisc !== "slp" && (/after_affiliate_url=\/?speech-language-pathology(&|$)/gi.test(linkHref) || /\.com\/speech-language-pathology\/?(\?|$)/gi.test(linkHref)) ) {
        createLinkErrorRow(linkObj, "Wrong homepage.");
      }
    }

    // Discipline Check - Blog
    // Checking NS and SUB.
    if ( /blog\/discipline\/pt/gi.test(linkHref) && (emailDisc !== "pt" && emailDisc !== "other") ) {
      createLinkErrorRow(linkObj, "Wrong discipline.");
    }
    else if ( /blog\/discipline\/at/gi.test(linkHref) && emailDisc !== "at" ) {
      createLinkErrorRow(linkObj, "Wrong discipline.");
    }
    else if ( /blog\/discipline\/ot/gi.test(linkHref) && emailDisc !== "ot" ) {
      createLinkErrorRow(linkObj, "Wrong discipline.");
    }
    else if ( /blog\/discipline\/slp/gi.test(linkHref) && emailDisc !== "slp" ) {
      createLinkErrorRow(linkObj, "Wrong discipline.");
    }
    else if ( /blog\/discipline\/(at|ot|slp)/gi.test(linkHref) && emailDisc === "other" ) {
      createLinkErrorRow(linkObj, "Wrong discipline.");
    }


    // False Courses Page URL
    // courses/speech-language-pathology isn't a page
    // The only valid pages for courses is courses/# and courses/details
    // First match that this is intended to be a courses link. Then see if it DOESN'T match the only valid kinds of courses links.
    if ( /(\.com\/|after_signin_url=\/?|after_affiliate_url=\/?)courses/gi.test(linkHref) && !/(\.com\/|after_signin_url=\/?|after_affiliate_url=\/?)courses(\/details|\/?(#|&|\?|$))/gi.test(linkHref) ) {
      createLinkErrorRow(linkObj, "Invalid courses page. Only <code>courses/#</code> and <code>courses/details</code> is valid.");
    }


    // Courses Page
    // Is this the courses page (not the courses detail page)?
    if ( /(\.com\/|after_signin_url=\/?|after_affiliate_url=\/?)courses(\/?#|\/?&|\/?\?|\/?$|\/[^d])/gi.test(linkHref) ) {

      // If the email has a discipline, the link to the courses page needs one too.
      // Check the discipline of the email against the hashtag that's being used for links meant to go to the courses page
      if ( emailDisc === "enterprise" || emailDisc === "ent" || emailDisc === "multi" || emailDisc === "all" || emailDisc === null || emailDisc === undefined ) {

        // Removed on 9/25/18
        // I was editing a Pardot campaign that had no discipline set. But we were linking to the #nursing category of the courses page.
        // This threw an error when I'd rather it hadn't.
        // if ( /#/gi.test(linkHref) ) {
        //   createLinkErrorRow(linkObj, "Remove the hashtag. This email has no assigned discipline to link to.");
        // }

      } else {
        if ( !/#/gi.test(linkHref) ) {
          createLinkErrorRow(linkObj, "Missing discipline in the hashtag.");
        } else {
          if ( (emailDisc === "pt" ) && !/#\/?physical-therapy/gi.test(linkHref) ) {
            createLinkErrorRow(linkObj, "Wrong discipline in the hashtag.");
          }
          if ( (emailDisc === "other" ) && /#\/?(athletic-training|occupational-therapy|speech-language-pathology|nursing)/gi.test(linkHref) ) {
            createLinkErrorRow(linkObj, "Wrong discipline in the hashtag.");
          }
          if ( emailDisc === "at" && !/#\/?athletic-training/gi.test(linkHref) ) {
            createLinkErrorRow(linkObj, "Wrong discipline in the hashtag.");
          }
          if ( emailDisc === "ot" && !/#\/?occupational-therapy/gi.test(linkHref) ) {
            createLinkErrorRow(linkObj, "Wrong discipline in the hashtag.");
          }
          if ( emailDisc === "slp" && !/#\/?speech-language-pathology/gi.test(linkHref) ) {
            createLinkErrorRow(linkObj, "Wrong discipline in the hashtag.");
          }
          if ( emailDisc === "rn" && !/#\/?nursing/gi.test(linkHref) ) {
            createLinkErrorRow(linkObj, "Wrong discipline in the hashtag.");
          }
        }
      }

    }

    // Patient Engagement Landing Page
    // Discipline Check
    // [NS]
    if ( emailSubType === "ns" ) {
      if ( /h\/patient-engagement-for-physical-therapists/gi.test(linkHref) && (emailDisc !== "pt" && emailDisc !== "other") ) {
        createLinkErrorRow(linkObj, "Wrong landing page for this discipline.");
      }
      else if ( /h\/patient-engagement-for-athletic-trainers/gi.test(linkHref) && emailDisc !== "at" ) {
        createLinkErrorRow(linkObj, "Wrong landing page for this discipline.");
      }
      else if ( /h\/patient-engagement-for-occupational-therapists/gi.test(linkHref) && emailDisc !== "ot" ) {
        createLinkErrorRow(linkObj, "Wrong landing page for this discipline.");
      }
      else if ( /h\/patient-engagement-for-speech-language-pathology/gi.test(linkHref) && emailDisc !== "slp" ) {
        createLinkErrorRow(linkObj, "Wrong landing page for this discipline.");
      }
    }
    // [SUB]
    if ( /h\/patient-engagement-for-(physical-therapists|athletic-trainers|occupational-therapists|speech-language-pathology)/gi.test(linkHref) && emailSubType === "sub" ) {
      // createLinkErrorRow(linkObj, "Wrong landing page for subscribers. Use <code>sign-in/?after_signin_url=patient_care/programs/create</code>");
      createLinkErrorRow(linkObj, "Wrong landing page for subscribers. Use <code>patient_care/programs/create</code>");
    }


    // Pricing
    // SUB
    if ( singleLinkInfoArray.isMedBridgeBrandLink && emailSubType === "sub" && /\.com\/(cart|pricing)/gi.test(linkHref) ) {
      createLinkErrorRow(linkObj, "Don't link to the pricing or cart pages in subscriber emails.");
    }
    // NS -
    if ( singleLinkInfoArray.isMedBridgeBrandLink && emailSubType === "ns" ) {

      // Pricing Page - Discipline Check
      if ( /pricing/gi.test(linkHref) ) {
        // PT
        if ( emailDisc === "pt" && !/pricing\/pt/gi.test(linkHref) ) {
          createLinkErrorRow(linkObj, "Link to pricing/pt.");
        }
        // AT
        else if ( emailDisc === "at" && !/pricing\/at/gi.test(linkHref) ) {
          createLinkErrorRow(linkObj, "Link to pricing/at.");
        }
        // OT
        else if ( emailDisc === "ot" && !/pricing\/ot/gi.test(linkHref) ) {
          createLinkErrorRow(linkObj, "Link to pricing/ot.");
        }
        // SLP
        else if ( emailDisc === "slp" && !/pricing\/slp/gi.test(linkHref) ) {
          createLinkErrorRow(linkObj, "Link to pricing/slp.");
        }
        // Other
        else if ( emailDisc === "other" && !/pricing(\/(pt|other)|\/?(&|$))/gi.test(linkHref) ) {
          createLinkErrorRow(linkObj, "Link to pricing/other.");
        }
        // No Discipline
        else if ( !emailDisc && /pricing\/(pta?|at|ota?|slp|cscs|other)/gi.test(linkHref) ) {
          createLinkErrorRow(linkObj, "Link to standard pricing page.");
        }

        // Students
        if ( /student/.test(linkObj.pathname) ) {
          createLinkErrorRow(linkObj, "If this is a student promo code, link to <code>cart/get_subscription/9</code> instead.");
        }
      }

      // NS - Cart Page - Discipline Check
      if ( /cart/gi.test(linkHref) && !/get_subscription\/[0-9]/gi.test(linkHref) ) {
        createLinkErrorRow(linkObj, "Links to the cart page need to link to <code>cart/get_subscription/##</code>.");
      }
    }


    // Check for unecessary discipline hastags. Should only be used when linking to courses page
    if ( /#\/?(speech-language-pathology|physical-therapy|nursing|athletic-training|occupational-therapy)/gi.test(linkHref) && ( !/(_url=courses|\/courses)(#|\/|\?|&|$)/gi.test(linkHref) && !/\/\/(foxrehab|drayerpt)\.medbridgeeducation\.com\/#/gi.test(linkHref) ) ) {
      createLinkErrorRow(linkObj, "Unecessary hashtag.");
    }


    ////
    // Do not link to medbridgeed.com. Use the full medbridgeeducation.com URL.
    // Unless it starts with enterprise\.
    if ( /(\:\/\/|\.)medbridgeed\.com/gi.test(linkHref) && !/\:\/\/enterprise\.medbridgeed\.com/gi.test(linkHref) ) {
      createLinkErrorRow(linkObj, "Use medbridgeeducation.com");
    }

    ////
    // NO //support. in outsideOrg
    if ( /\/support\./gi.test(linkHref) && outsideOrg ) {
      createLinkErrorRow(linkObj, "://support. not allowed in outsideOrg, use mailto:support@medbridgeed.com");
    }

    ////
    // Do not advertise Enterprise products to outsideOrg
    if ( /enterprise/gi.test(linkHref) && outsideOrg ) {
      createLinkErrorRow(linkObj, "do not advertise enterprise to outsideOrg");
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

  // End of link validation.
  // console.error(i, link);

  singleLinkInfoArray.errors = allErrorMsgsForCurrentLink;
  linkInfoArray.push(singleLinkInfoArray);


  // Do NOT show approval check marks on page load for mergetags or mailtos.
  // Since these are not checked with AJAX, they are not cached in storage.
  // As a result, they are always "approved" for the first time.
  // This is annoying, lets just not show them on page load.
  // The approval marks are still there, and can be viewed if a toggle is clicked.
  if ( singleLinkInfoArray.type === "merge tag" || singleLinkInfoArray.type === "mailto" ) {
    linkMarker.classList.add("do-not-highlight");
  }

  // Now that we've created an object for this link and added it to the array
  // Check the links status (async) and add the results to the array.

  // Only check the link if checkStatus is true
  if ( singleLinkInfoArray.checkStatus === true ) {
    // Skip links that are duplicates. When the original link is done being XHR'd we'll apply the results to all matching links.
    if ( singleLinkInfoArray.firstInstance === true ) {
      onRequest(i, linkHref, linkObj);
    }
  // checkStatus is False, so we're done. Turn off the loading icon.
  } else {
    linkMarkerDone(linkMarker);
  }


}








///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
/////
/////
/////    Check if a Link is Visible in Desktop and Mobile
/////
/////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////

// This function gets run after dummyIframe is finished loading.
// The primary means of determining visibility is offsetTop and offsetLeft.
// If we check these before the page is loaded they can often return a value of 0.

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
function verifyLinkVisibility(linkList) {

  // Modify this to use the dummyIframe for both desktop and mobile so that we can avoid errors.
  // Get link position in desktop view and check desktop visibility
  var i = 0;
  for (let linkObj of linkList) {

    linkInfoArray[i].desktopposition = { "top": linkObj.getBoundingClientRect().top, "left": linkObj.getBoundingClientRect().left };

    // Link Visibility (Desktop)
    if ( isElementVisible(linkObj) ) {
      linkInfoArray[i].desktopVisibile = false;
    } else {
      linkInfoArray[i].desktopVisibile = true;
    }
    i++;

  }

  // Get link position in mobile view and check mobile visibility
  // Change dummy iframe width to be mobile sized.
  dummyIframe.style.width = "360px";

  // Do another loop.
  var j = 0;
  for (let linkObj of linkList) {

    linkInfoArray[j].mobileposition = { "top": linkObj.getBoundingClientRect().top, "left": linkObj.getBoundingClientRect().left };

    // Link Visibility (Mobile)
    if ( isElementVisible(linkObj) ) {
      linkInfoArray[j].mobileVisible = false;
    } else {
      linkInfoArray[j].mobileVisible = true;
    }
    j++;
  }

  // We're done here. Kill the dummy iframe.
  // 4/28/18 - Actually, keep it. We'll use it to generate the plaintext.
  // destroy(dummyIframe);

  // console.log("end verifyLinkVisibility");

}



///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
/////
/////
/////   Check if Element is in Viewport /
/////   Check if Element is Visibility
/////
/////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */

// https://stackoverflow.com/a/7557433/556079
function isElementInViewport (el) {

    var rect = el.getBoundingClientRect();

    return rect.bottom > 0 &&
        rect.right > 0 &&
        rect.left < (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */ &&
        rect.top < (window.innerHeight || document.documentElement.clientHeight) /* or $(window).height() */;
}

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */

// A modification of isElementInViewport(el) from => https://stackoverflow.com/a/7557433/556079
function isElementVisible (el) {

    var rect = el.getBoundingClientRect();

    return (
        rect.top === 0 &&
        rect.left === 0 &&
        rect.x === 0 &&
        rect.y === 0
    );
}



/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
function findLinkPos(object, currentDocument) {

  var objectPosFromTop = object.getBoundingClientRect().top + currentDocument.documentElement.scrollTop;
  var objectPosFromLeft = object.getBoundingClientRect().left + currentDocument.documentElement.scrollLeft;

  return [objectPosFromTop, objectPosFromLeft];
}




///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
/////
/////
/////    Search all relevant links for commonalities.
/////    Return the most common matching substring and use it to warn/error links in the main validation loop.
/////
/////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
function mostCommonString(searchTerm, linkList) {

  if ( !/utm_/.test(searchTerm) ) {
    searchTerm = new RegExp(/\.com\/.+?\?/i);
  } else {
    searchTerm = new RegExp(escapeRegEx(searchTerm) + ".+?(&|$)","i");
  }

  ///////////
  // STEP 1 - Add all of the tracking url strings to an array while we're looping through each link.
  ///////////
  var matchingNames = [];

  for (var i = 0, len = linkList.length; i < len; i++) {
    var matchingName = linkList[i].match(searchTerm);
    if ( matchingName ) {
      if ( /utm_/gi.test(searchTerm) ) {
        matchingName = matchingName[0].replace(/&$/gi,"");
      } else {
        matchingName = matchingName[0].replace(/(\.com\/|\/?\?)/gi,"");
      }

      matchingNames.push(matchingName);
    }
  }

  ///////////
  // STEP 2 - Finish determining which tracking URL is the most common and apply it to a variable.
  // Code Source: https://stackoverflow.com/a/32799486/556079
  ///////////
  var distribution = {},
      max = 0,
      result = [];

  matchingNames.forEach(function (a) {
      distribution[a] = (distribution[a] || 0) + 1;
      if (distribution[a] > max) {
          max = distribution[a];
          result = [a];
          return;
      }
      if (distribution[a] === max) {
          result.push(a);
      }
  });

  // Create a regex with the most common url + the optional ending / and the mandatory ?
  // console.error(result[0]);
  return result[0];

}




/**
 * [someFunction description]
 * ref: http://stackoverflow.com/questions/17885855/use-dynamic-variable-string-as-regex-pattern-in-javascript
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
function escapeRegEx(stringToGoIntoTheRegex) {
    return stringToGoIntoTheRegex.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}



/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
function decipherQuerystring(url, linkObj) {

  // We'll create an object with keys and values
  var qsObject = {};

  // Grab the querystring using the .search property.
  // Pulling it from the search property excludes ending # hashes for us
  // Remove leading '?'s and trailing /'s.'
  var querystring = linkObj.search.replace(/(^\?+?|\/+?$)/gi,"");

  // Using Map to iterate through the remaining Querystring
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
  querystring.split("&").map(function(qs) {

    var key = qs.split("=")[0];
    var val = qs.split("=")[1];

    qsObject[key] = val;

  });

  // Check for querystrings after the hash. This is specifically for MedBridge.
  var querystringAfterHash = linkObj.hash.replace(/^#+?/i,"");

  if ( /\?.+?=/.test(querystringAfterHash) ) {

    // Remove all characters from the beginning of the string up until we get to the first ?
    querystringAfterHash = querystringAfterHash.replace(/^(\?|[^?]+\?)/gi,"");

    querystringAfterHash.split("&").map(function(qs) {

      var key = qs.split("=")[0];
      var val = qs.split("=")[1];

      qsObject[key] = val;

    });
  }

  return qsObject;

}


/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
function countInsideArray(array, value) {
  return array.reduce((n, x) => n + (x === value), 0);
}


/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
function elementExists(el, set) {
  if ( typeof(el) != 'undefined' && el != null ) {
    if ( set === "object" ) {
      return el;
    } else if ( set === "text" ) {
      return el.textContent;
    } else {
      return true;
    }
  } else {
    return false;
  }
}


/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
function destroyIfElementExists(el) {
  if ( elementExists(el) ) {
    if ( el.target ) {
      el = this;
    }
    el.parentNode.removeChild(el);
  }
}



///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
/////
/////
/////    createUniqueArrayOfURLs
/////
/////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
function createUniqueArrayOfURLs(arr) {

  var uniqueLinksArray = [];

  var i = 0;
  for (let linkObj of arr) {

    uniqueLinksArray.push(linkObj.getAttribute("href"));

    i++;

  }

  var finishedArr = uniq(uniqueLinksArray);
  // console.log(finishedArr);
  return finishedArr;

}


// Create a unique array
// https://stackoverflow.com/a/9229821/556079

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
function uniq(a) {
   return Array.from(new Set(a));
}



/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
function incrementErrorUI(errorBox) {

  var currentValue = parseInt(errorBox.innerHTML);

  currentValue++;

  errorBox.classList.add("error");
  errorBox.querySelectorAll(".value")[0].innerHTML = currentValue;
}
