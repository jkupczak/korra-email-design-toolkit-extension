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
    // if ( typeof email.subscription === 'undefined' ) {
    //   // In the absence of a email.subscription, use "ns"
    //   email.subscription = "ns";
    // }
    // if (typeof email.outsideOrg === 'undefined') {
    //   email.outsideOrg = false;
    // }
    // if (typeof email.esp === 'undefined') {
    //   email.esp = "ac";
    // }
    // if (typeof email.organization === 'undefined') {
    //   email.organization = "";
    // }
    // if (typeof email.audience === 'undefined') {
    //   email.audience = undefined;
    // }

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

  for (let l of linkList) {

    if ( /^https?\:\/\/(.+?\.)?medbridge(ed(ucation)?|massage)\.com\/?/gi.test(l.href) ) {
      medbridgeLinkUrlsList.push(l.href);
    }

  }


  // Determine if portions of links in -ns emails match each other by finding the most common string and
  // checking against it later when we loop through the links again for validation.
  // This is important for marketing tracking urls, utm_source, and utm_campaign
  //////////////////

  if ( email.subscription === "ns" ) {
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
    // l.korraId = i;
    // l.wow = "ok";
    // console.log(l.korraId);

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
    for (let l of linkList) {

      // Get the position of the current link.
      var linkPosition = getPosition(l, frameContents);

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

  for (let l of linkList) {

    // Find each links position relative to the document so that we can reposition the link markers if the viewport changes size or if elements move around.
    var linkFoundPos = findLinkPos(l, frameContents);
    var linkm = frameContents.querySelectorAll(".link-marker[data-number='" + l.getAttribute('data-number') + "']")[0];

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
function createLinkErrorRow(l, msg, type, icon, marker) {

  // Set the 'type' to error if one wasn't passed.
  if ( !type ) {
    type = "error";
  }

  if ( type === "error" ) {
    l.dataset.error = true;
  }

  // Target the link marker in dFrame based on which link we're looking at right now
  var linkMarker = frameContents.querySelector("#link-markers .link-marker[data-number='" + l.dataset.number + "']");
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
  var currentErrorWrapper = frameContents.querySelector("korra-link-data.link-errors[data-number='" + l.dataset.number + "'] .link-errors-wrapper");
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

    l.dataset.error = "true";

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
  // if ( !containsObject(l, linksWithErrorsArr) ) {
  //   linksWithErrorsArr.push(l);
  // } else {
  //   linksWithErrorsArr.push("nope");
  // }
  if ( linksWithErrorsArr.includes(l) ) { // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
    // linksWithErrorsArr.push("this link is already in the linksWithErrorsArr array"); // get ride of this eventually
  } else {
    linksWithErrorsArr.push(l);
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
function validateLinks(l, i) {

  // console.error(l);
  // Set link URL to a variable.
  // Use getAttribute instead of l.href because merge tag links get file:/// or localhost appended there when the page is loaded
  l.urlInDOM = l.getAttribute("href");
  l.urlInDOMMergeTagSafe = l.urlInDOM;

  //### If the user wants us to ignore merge tags,
  // and they've identified at least one pair of opening and closing characters
  // replace them in this link by encoding them
  if ( o.sync.ignoreESPTags === '1' && o.sync.espMergeTags ) {

    // console.log("checking link for merge tags");
    // console.error(o.sync.espMergeTags);

    // Loop through all of the ESP merge tags found in the users settings
    o.sync.espMergeTags.forEach(function (esp, index) {

      // Create our regex based on the current merge tag characters
      let re = new RegExp(escapeRegExp(esp.o) + '[^' + escapeRegExp(esp.o.slice(-1)) + ']+?' + escapeRegExp(esp.c), 'ig');

      // Only check <a> tags that have an `href`.
      if ( l.urlInDOM ) {

        // Does the value in this href have merge tags in it?
        let mergeTagMatches = l.urlInDOM.match(re);

        // if there were any matches, loop through them
        // If there were none, mergeTagMatches will be null.
        if ( mergeTagMatches ) {
          mergeTagMatches.forEach(function (tag, index) {
          	// console.log(index); // index
          	// console.log(tag); // value
            l.urlInDOMMergeTagSafe = l.urlInDOM.replace(tag, 'espmergetagplaceholder');
            // console.log(l.urlInDOM);
          });
        }
      }


    });



  }

  // console.log(l);
  // console.log("l.urlInDOM", l.urlInDOM);
  // console.log("l.urlInDOMMergeTagSafe", l.urlInDOMMergeTagSafe);




  // Making our counter for console.log 2 digits instead of 1. (1 vs 01)
  var iLog;
  if ( i < 10 ) {
    iLog = "0" + i;
  } else {
    iLog = i;
  }

  // Check link url length
  var ell;
  if ( l.urlInDOM ) {
    if ( l.urlInDOM.length > 70 ) {
      ell = l.urlInDOM.substring(0,70) + "...";
    } else {
      ell = l.urlInDOM;
    }
  }
  else {
    ell = "no href attribute";
  }

  console.groupCollapsed("[" + iLog + "] " + ell);
  console.log(l);

  //
  l.classList.add("marked");
  l.dataset.number = i;

  // Create a corresponding link marker (#) for this link and append it to parent container after the associated error log
  // innerHTML out empty. Eventually fills with error count (1, 2, 3)
  // Begins with a loading spinner. Gets removed later when all checks have finished.
  //
  /////////
  var linkMarker = document.createElement("korra-link-marker");
  linkMarker.id = "link-marker-" + i;
  linkMarker.className = "link-marker loading";

  linkMarker.dataset.href = l.urlInDOM;
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
  linkErrorLogURL.innerHTML = "<korra-div class='link-number'>#" + (i + 1) + "</korra-div><korra-div class='link-url'>" + l.urlInDOM + "</korra-div>";

  //
  // var linkErrorLogURLTextNode = document.createTextNode(l.urlInDOM);
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

  singleLinkInfoArray.object = l; //link object
  singleLinkInfoArray.url = l.urlInDOM; //link url
  singleLinkInfoArray.text = l.textContent.trim(); //link text
  singleLinkInfoArray.imgsLinked = l.querySelectorAll('img'); // images linked
  singleLinkInfoArray.querystring = decipherQuerystring(l.urlInDOM, l); //querystring
  singleLinkInfoArray.espMergeTag = false;
  singleLinkInfoArray.type = null;
  singleLinkInfoArray.checkStatus = null;

  // What kind of content is linked? text, img, none, or mixed (text and img)
  /////
  if ( singleLinkInfoArray.imgsLinked.length > 0 ) {
    singleLinkInfoArray.hasImg = true;
  }

  if ( singleLinkInfoArray.text ) {
    singleLinkInfoArray.hasText = true;
  }

  // Assign a type to the URL based on how its written
  // mailto
  if ( !l.urlInDOM || l.urlInDOM === "" ) {
    singleLinkInfoArray.type = "empty"; //empty
    singleLinkInfoArray.checkStatus = false;

  } else if ( l.protocol === "mailto:" ) {
    singleLinkInfoArray.type = "mailto"; //mailto link
    singleLinkInfoArray.checkStatus = false;

  //ignore links that are made up entirely of a merge tag
  } else if ( /^\[[^[]+?\]$/.test(l.urlInDOM) ) {
    singleLinkInfoArray.espMergeTag = "sendgrid";
    singleLinkInfoArray.type = "merge tag";
    singleLinkInfoArray.includesMergeTag = true;
    singleLinkInfoArray.checkStatus = false;

  } else if ( /^\*\|[^|]+?\|\*$/.test(l.urlInDOM) ) {
    singleLinkInfoArray.espMergeTag = "mailchimp";
    singleLinkInfoArray.type = "merge tag";
    singleLinkInfoArray.includesMergeTag = true;
    singleLinkInfoArray.checkStatus = false;

  } else if ( /^\[\[[^[]+?\]\]$/.test(l.urlInDOM) ) {
    singleLinkInfoArray.espMergeTag = "getresponse";
    singleLinkInfoArray.type = "merge tag";
    singleLinkInfoArray.includesMergeTag = true;
    singleLinkInfoArray.checkStatus = false;

  } else if ( /^\%[^%]+?\%$/.test(l.urlInDOM) ) {
    singleLinkInfoArray.espMergeTag = "activecampaign";
    singleLinkInfoArray.type = "merge tag";
    singleLinkInfoArray.includesMergeTag = true;
    singleLinkInfoArray.checkStatus = false;

  } else if ( /^#[^#]+?#$/.test(l.urlInDOM) ) {
    singleLinkInfoArray.espMergeTag = "on24";
    singleLinkInfoArray.type = "merge tag";
    singleLinkInfoArray.includesMergeTag = true;
    singleLinkInfoArray.checkStatus = false;

  } else if ( /^{{[^{]+?}}$/.test(l.urlInDOM) ) {
    singleLinkInfoArray.espMergeTag = "pardot";
    singleLinkInfoArray.type = "merge tag";
    singleLinkInfoArray.includesMergeTag = true;
    singleLinkInfoArray.checkStatus = false;

  // http
  } else if ( l.protocol === "http:" ) {
    singleLinkInfoArray.type = "http"; //normal link
    singleLinkInfoArray.checkStatus = true;

  // https
  } else if ( l.protocol === "https:" ) {
    singleLinkInfoArray.type = "https"; //secure link
    singleLinkInfoArray.checkStatus = true;

  // unknown
  } else {
    singleLinkInfoArray.type = "unknown"; //no idea what this link is
    singleLinkInfoArray.checkStatus = true;

  }

  // Is this the first time this link appears in the DOM?
	if ( xhrLoopArray.includes(l.urlInDOM) ) {
    console.log("This link (" + i + ") is a duplicate.");
    singleLinkInfoArray.firstInstance = false;
  } else {
    console.log("This link (" + i + ") is unique.");
    singleLinkInfoArray.firstInstance = true;
  }

  xhrLoopArray.push(l.urlInDOM); // Add it to the array.
  singleLinkInfoArray.instanceOrder = countInsideArray(xhrLoopArray, l.urlInDOM); // Apply an order #. (eg. the 4th instance of this exact link in the DOM)


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
  if ( !l.urlInDOM ) {
    createLinkErrorRow(l, "Missing href attribute.");
    // linkMarkerDone(linkMarker);
  }

  // Empty link? Skip it.
  ///////////////////////
  else if ( l.urlInDOM === "" ) {
    createLinkErrorRow(l, "Empty Link.");
  }

  // VALIDATE MERGE TAGS
  //////////////////////
  // If the entirety of this link is a merge tag - MailChimp, SendGrid, or GetResponse link (eg. *|ARCHIVE|* or [weblink] [[email]]
  else if ( singleLinkInfoArray.type === "merge tag" ) {

    // Links in an email for the GetResponse Platform
    if ( email.esp === "gr" && !/(\[\[[^[]+?\]\])/gi.test(l.urlInDOM) ) { // Look for MailChimp and SendGrid merge tags.
      createLinkErrorRow(l, "Wrong merge tag for this platform (" + email.espName + ").");
    }
    // Links in an email for the MailChimp Platform
    else if ( email.esp === "mc" && !/^\*\|[^|]+?\|\*/gi.test(l.urlInDOM) ) { // Look for SendGrid and GR merge tags.
      createLinkErrorRow(l, "Wrong merge tag for this platform (" + email.espName + ").");
    }
    // Links in an email for the SendGrid Platform
    else if ( email.esp === "sg" && !/(^\[[^[]+?\])/gi.test(l.urlInDOM) ) { // Look for MailChimp and GR merge tags.
      createLinkErrorRow(l, "Wrong merge tag for this platform (" + email.espName + ").");
    }
    // Links in an email for the ActiveCampaign Platform
    else if ( email.esp === "ac" && !/(^%[^%]+?%)/gi.test(l.urlInDOM) ) {
      createLinkErrorRow(l, "Wrong merge tag for this platform (" + email.espName + ").");
    }
    // Links in an email for the Pardot Platform
    else if ( email.esp === "pd" && !/(^{{[^{]+?}})/gi.test(l.urlInDOM) ) {
      createLinkErrorRow(l, "Wrong merge tag for this platform (" + email.espName + ").");
    }

    // QUICK FIX: The mailchimp merge tag *|...|* doesn't play well with Twitter during our ajax request. We need to escape the pipes | in order to get a working URL.
    // These tags automatically change in MailChimp so it's no problem there. Just right now when we are testing the URL.
    // This may also be a problem with SendGrid, GetResponse, etc. Look into that.
    if ( l.urlInDOM.match(/\*\|.+?\|\*/) ) {
      l.urlInDOM = l.urlInDOM.replace(/\|/g,"%7C");
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
    if ( !navigator.onLine && singleLinkInfoArray.checkStatus ) {
      createLinkErrorRow(l, "Be aware that you are currently offline.", "warning");
    }

    console.log("url - " + l.urlInDOMMergeTagSafe);

    // Global link testing variables

    // MedBridgeEd
    if ( /\.medbridgeeducation\.com/gi.test(l.hostname) ) {
      singleLinkInfoArray.isMedBridgeEdLink = true;
    } else {
      singleLinkInfoArray.isMedBridgeEdLink = false;
    }

    // Massage
    if ( /\.medbridgemassage\.com/gi.test(l.hostname) ) {
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
    if ( singleLinkInfoArray.isMedBridgeEdLink && (/\.com\/blog/.test(l.urlInDOMMergeTagSafe) || /url=\/?blog.+?p=/.test(l.urlInDOMMergeTagSafe) || /\-blog(\/|\?)/.test(l.urlInDOMMergeTagSafe) || /after_affiliate_url=\/?blog/.test(l.urlInDOMMergeTagSafe)) ) {
      singleLinkInfoArray.isBlogLink = true;
    } else {
      singleLinkInfoArray.isBlogLink = false;
    }

    // Is Article Link
    if ( singleLinkInfoArray.isMedBridgeEdLink && /blog/i.test(l.urlInDOMMergeTagSafe) && /(\/20\d\d\/\d\d\/|p=.+)/i.test(l.urlInDOMMergeTagSafe) && !/p=2503/gi.test(l.urlInDOMMergeTagSafe) ) {
      singleLinkInfoArray.isArticle = true;
    } else {
      singleLinkInfoArray.isArticle = false;
    }

    // is Marketing URL
    if ( singleLinkInfoArray.isMedBridgeBrandLink && /(\.com\/(gr|mc)?trk\-|after_affiliate_url=)/gi.test(l.urlInDOMMergeTagSafe) ) {
      singleLinkInfoArray.isMarketingUrl = true;
    } else {
      singleLinkInfoArray.isMarketingUrl = false;
    }

    // Has tracking link back (after_affiliate_url)
    if ( singleLinkInfoArray.isMedBridgeBrandLink && /after_affiliate_url/gi.test(l.urlInDOMMergeTagSafe) ) {
      singleLinkInfoArray.hasTrackingLinkback = true;
    } else {
      singleLinkInfoArray.hasTrackingLinkback = false;
    }

    // Needs Google Tracking (utm_content)
    linkNeedsGoogleTracking = false;
    if ( singleLinkInfoArray.isMedBridgeEdLink && !email.outsideOrg && (email.esp === "mc" || email.esp === "ac") ) {
      linkNeedsGoogleTracking = true;
    } else {
      linkNeedsGoogleTracking = false;
    }
    console.log("linkNeedsGoogleTracking - " + linkNeedsGoogleTracking);

    ////
    var linkNeedsPromoCode;
    if ( (email.subscription === "ns" && !email.outsideOrg && email.esp !== "pd" && email.audience !== "ent" ) && singleLinkInfoArray.isMedBridgeBrandLink ) {
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
    // WTF IS THIS ===  !/^(http|https):\/\/[^ "]+$/.test(l.urlInDOMMergeTagSafe)


  ///////
  //// Begin Link Check ////
  ///////

  ///////
  // Ignore mailto's and localhost:
  ///////
  ///////
  ///////


    if ( !/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(l.urlInDOMMergeTagSafe) ) {
      createLinkErrorRow(l, "Invalid URL scheme [1].");
    }

    // http://stackoverflow.com/a/9284473/556079
    // https://gist.github.com/dperini/729294
    // Edited by me to allow _ in subdomain.
    // Does not support _ in domain, but it should.
    // Does not support URL's ending with a - but it should.
    else if ( !/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9](?:_|-)*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(l.urlInDOMMergeTagSafe) )
    {
      createLinkErrorRow(l, "Invalid URL scheme [2].");
    }


    // Marketing URL's
    // trk = mc, grtrk = getresponse
    if ( email.esp === "gr" && linkNeedsPromoCode && !/\.com\/grtrk\-/i.test(l.urlInDOMMergeTagSafe) ) {
      // Look for MailChimp and SendGrid merge tags.
      createLinkErrorRow(l, "Wrong tracking url for this email platform, use grtrk-.");
    }


    //////
    ////// Detect the use of merge tags.
    ////// This is different than earlier where detected links that were JUST merge tags. Like [[email]] and *|UNSUB|*

      // Wrong merge tags in a Link for the GetResponse Platform
      if ( email.esp === "gr" && /(\*\|.+?\|\*|\*\%7C.+?%7C\*|^\[[A-Za-z0-9]+?\])/gi.test(l.urlInDOMMergeTagSafe) ) { // Look for MailChimp and SendGrid merge tags.
        createLinkErrorRow(l, "Wrong merge tag for this platform (" + email.espName + ").");
      }
      // Wrong merge tags in a Link for the MailChimp Platform
      else if ( email.esp === "mc" && /^\[\[?.+\]\]?/gi.test(l.urlInDOMMergeTagSafe) ) { // Look for SendGrid and GR merge tags.
        createLinkErrorRow(l, "Wrong merge tag for this platform (" + email.espName + ").");
      }

    ///////////////////////
    ///////////////////////
    ///////////////////////
    ///////////////////////


    ////-----------------------------////
    ////
    // Link do NOT need a target attribute.

    if ( o.sync.checkTargetAttribute === "1" ) {
      if ( l.hasAttribute("target") ) {
        createLinkErrorRow(l, "Target attribute not needed.");
      }
    }

    ////-----------------------------////
    ////
    // utm's other than content are unlikely to be used

    // !!!! //////////////////// Re-active this when I can make a feature that allows you to ignore it.

    // if ( /utm_(medium|source|campaign)/gi.test(l.urlInDOMMergeTagSafe) ) {
    //   createLinkErrorRow(l, "extra utm's");
    // }

    ////-----------------------------////
    ////
    // MUST HAVE UTM - Check for utm_content on links going to medbridgeeducation.com or medbridgemassage.com. Error if utm_content is not present.
    if ( linkNeedsGoogleTracking && !/utm_content/gi.test(l.urlInDOMMergeTagSafe) ) {
      createLinkErrorRow(l, "Missing <code>utm_content</code>.");
    }

    ////-----------------------------////
    ////
    // MUST HAVE UTM - Check for utm_content on links going to medbridgeeducation.com or medbridgemassage.com. Error if utm_content is not present.
    if ( /\.com\/\//gi.test(l.urlInDOMMergeTagSafe) ) {
      createLinkErrorRow(l, "Remove extra /.");
    }

    ////-----------------------------////
    ////
    // MUST HAVE UTM - Check for utm_content on links going to medbridgeeducation.com or medbridgemassage.com. Error if utm_content is not present.
    if ( /after_affiliate_url=&/i.test(l.urlInDOMMergeTagSafe) ) {
      createLinkErrorRow(l, "Missing redirect URL for <code>after_affiliate_url</code>. ");
    }

    ////-----------------------------////
    ////
    // DON'T USE UTM - email.outsideOrg and off domain urls should not have utms
    if ( /utm_content/gi.test(l.urlInDOMMergeTagSafe) && !singleLinkInfoArray.isMedBridgeEdLink ) {
      createLinkErrorRow(l, "Remove <code>utm_content</code> parameter in non-MedBridge links.");
    }

    ////-----------------------------////
    ////
    // MedBridge links must be https. If only because it makes sorting links easier when we do our metrics
    if ( singleLinkInfoArray.isMedBridgeBrandLink && singleLinkInfoArray.type !== "https" ) {
      createLinkErrorRow(l, "Use <code>https</code> for MedBridge links.");
    }


    ////-----------------------------////
    ////
    // Mismatching hostnames


    // const tlds = ['aaa','aarp','abarth','abb','abbott','abbvie','abc','able','abogado','abudhabi','ac','academy','accenture','accountant','accountants','aco','actor','ad','adac','ads','adult','ae','aeg','aero','aetna','af','afamilycompany','afl','africa','ag','agakhan','agency','ai','aig','aigo','airbus','airforce','airtel','akdn','al','alfaromeo','alibaba','alipay','allfinanz','allstate','ally','alsace','alstom','am','americanexpress','americanfamily','amex','amfam','amica','amsterdam','analytics','android','anquan','anz','ao','aol','apartments','app','apple','aq','aquarelle','ar','arab','aramco','archi','army','arpa','art','arte','as','asda','asia','associates','at','athleta','attorney','au','auction','audi','audible','audio','auspost','author','auto','autos','avianca','aw','aws','ax','axa','az','azure','ba','baby','baidu','banamex','bananarepublic','band','bank','bar','barcelona','barclaycard','barclays','barefoot','bargains','baseball','basketball','bauhaus','bayern','bb','bbc','bbt','bbva','bcg','bcn','bd','be','beats','beauty','beer','bentley','berlin','best','bestbuy','bet','bf','bg','bh','bharti','bi','bible','bid','bike','bing','bingo','bio','biz','bj','black','blackfriday','blockbuster','blog','bloomberg','blue','bm','bms','bmw','bn','bnpparibas','bo','boats','boehringer','bofa','bom','bond','boo','book','booking','bosch','bostik','boston','bot','boutique','box','br','bradesco','bridgestone','broadway','broker','brother','brussels','bs','bt','budapest','bugatti','build','builders','business','buy','buzz','bv','bw','by','bz','bzh','ca','cab','cafe','cal','call','calvinklein','cam','camera','camp','cancerresearch','canon','capetown','capital','capitalone','car','caravan','cards','care','career','careers','cars','casa','case','caseih','cash','casino','cat','catering','catholic','cba','cbn','cbre','cbs','cc','cd','ceb','center','ceo','cern','cf','cfa','cfd','cg','ch','chanel','channel','charity','chase','chat','cheap','chintai','christmas','chrome','church','ci','cipriani','circle','cisco','citadel','citi','citic','city','cityeats','ck','cl','claims','cleaning','click','clinic','clinique','clothing','cloud','club','clubmed','cm','cn','co','coach','codes','coffee','college','cologne','com','comcast','commbank','community','company','compare','computer','comsec','condos','construction','consulting','contact','contractors','cooking','cookingchannel','cool','coop','corsica','country','coupon','coupons','courses','cpa','cr','credit','creditcard','creditunion','cricket','crown','crs','cruise','cruises','csc','cu','cuisinella','cv','cw','cx','cy','cymru','cyou','cz','dabur','dad','dance','data','date','dating','datsun','day','dclk','dds','de','deal','dealer','deals','degree','delivery','dell','deloitte','delta','democrat','dental','dentist','desi','design','dev','dhl','diamonds','diet','digital','direct','directory','discount','discover','dish','diy','dj','dk','dm','dnp','do','docs','doctor','dog','domains','dot','download','drive','dtv','dubai','duck','dunlop','dupont','durban','dvag','dvr','dz','earth','eat','ec','eco','edeka','edu','education','ee','eg','email','emerck','energy','engineer','engineering','enterprises','epson','equipment','er','ericsson','erni','es','esq','estate','esurance','et','etisalat','eu','eurovision','eus','events','exchange','expert','exposed','express','extraspace','fage','fail','fairwinds','faith','family','fan','fans','farm','farmers','fashion','fast','fedex','feedback','ferrari','ferrero','fi','fiat','fidelity','fido','film','final','finance','financial','fire','firestone','firmdale','fish','fishing','fit','fitness','fj','fk','flickr','flights','flir','florist','flowers','fly','fm','fo','foo','food','foodnetwork','football','ford','forex','forsale','forum','foundation','fox','fr','free','fresenius','frl','frogans','frontdoor','frontier','ftr','fujitsu','fujixerox','fun','fund','furniture','futbol','fyi','ga','gal','gallery','gallo','gallup','game','games','gap','garden','gay','gb','gbiz','gd','gdn','ge','gea','gent','genting','george','gf','gg','ggee','gh','gi','gift','gifts','gives','giving','gl','glade','glass','gle','global','globo','gm','gmail','gmbh','gmo','gmx','gn','godaddy','gold','goldpoint','golf','goo','goodyear','goog','google','gop','got','gov','gp','gq','gr','grainger','graphics','gratis','green','gripe','grocery','group','gs','gt','gu','guardian','gucci','guge','guide','guitars','guru','gw','gy','hair','hamburg','hangout','haus','hbo','hdfc','hdfcbank','health','healthcare','help','helsinki','here','hermes','hgtv','hiphop','hisamitsu','hitachi','hiv','hk','hkt','hm','hn','hockey','holdings','holiday','homedepot','homegoods','homes','homesense','honda','horse','hospital','host','hosting','hot','hoteles','hotels','hotmail','house','how','hr','hsbc','ht','hu','hughes','hyatt','hyundai','ibm','icbc','ice','icu','id','ie','ieee','ifm','ikano','il','im','imamat','imdb','immo','immobilien','in','inc','industries','infiniti','info','ing','ink','institute','insurance','insure','int','intel','international','intuit','investments','io','ipiranga','iq','ir','irish','is','ismaili','ist','istanbul','it','itau','itv','iveco','jaguar','java','jcb','jcp','je','jeep','jetzt','jewelry','jio','jll','jm','jmp','jnj','jo','jobs','joburg','jot','joy','jp','jpmorgan','jprs','juegos','juniper','kaufen','kddi','ke','kerryhotels','kerrylogistics','kerryproperties','kfh','kg','kh','ki','kia','kim','kinder','kindle','kitchen','kiwi','km','kn','koeln','komatsu','kosher','kp','kpmg','kpn','kr','krd','kred','kuokgroup','kw','ky','kyoto','kz','la','lacaixa','lamborghini','lamer','lancaster','lancia','land','landrover','lanxess','lasalle','lat','latino','latrobe','law','lawyer','lb','lc','lds','lease','leclerc','lefrak','legal','lego','lexus','lgbt','li','lidl','life','lifeinsurance','lifestyle','lighting','like','lilly','limited','limo','lincoln','linde','link','lipsy','live','living','lixil','lk','llc','llp','loan','loans','locker','locus','loft','lol','london','lotte','lotto','love','lpl','lplfinancial','lr','ls','lt','ltd','ltda','lu','lundbeck','lupin','luxe','luxury','lv','ly','ma','macys','madrid','maif','maison','makeup','man','management','mango','map','market','marketing','markets','marriott','marshalls','maserati','mattel','mba','mc','mckinsey','md','me','med','media','meet','melbourne','meme','memorial','men','menu','merckmsd','metlife','mg','mh','miami','microsoft','mil','mini','mint','mit','mitsubishi','mk','ml','mlb','mls','mm','mma','mn','mo','mobi','mobile','moda','moe','moi','mom','monash','money','monster','mormon','mortgage','moscow','moto','motorcycles','mov','movie','mp','mq','mr','ms','msd','mt','mtn','mtr','mu','museum','mutual','mv','mw','mx','my','mz','na','nab','nadex','nagoya','name','nationwide','natura','navy','nba','nc','ne','nec','net','netbank','netflix','network','neustar','new','newholland','news','next','nextdirect','nexus','nf','nfl','ng','ngo','nhk','ni','nico','nike','nikon','ninja','nissan','nissay','nl','no','nokia','northwesternmutual','norton','now','nowruz','nowtv','np','nr','nra','nrw','ntt','nu','nyc','nz','obi','observer','off','office','okinawa','olayan','olayangroup','oldnavy','ollo','om','omega','one','ong','onl','online','onyourside','ooo','open','oracle','orange','org','organic','origins','osaka','otsuka','ott','ovh','pa','page','panasonic','paris','pars','partners','parts','party','passagens','pay','pccw','pe','pet','pf','pfizer','pg','ph','pharmacy','phd','philips','phone','photo','photography','photos','physio','pics','pictet','pictures','pid','pin','ping','pink','pioneer','pizza','pk','pl','place','play','playstation','plumbing','plus','pm','pn','pnc','pohl','poker','politie','porn','post','pr','pramerica','praxi','press','prime','pro','prod','productions','prof','progressive','promo','properties','property','protection','pru','prudential','ps','pt','pub','pw','pwc','py','qa','qpon','quebec','quest','qvc','racing','radio','raid','re','read','realestate','realtor','realty','recipes','red','redstone','redumbrella','rehab','reise','reisen','reit','reliance','ren','rent','rentals','repair','report','republican','rest','restaurant','review','reviews','rexroth','rich','richardli','ricoh','rightathome','ril','rio','rip','rmit','ro','rocher','rocks','rodeo','rogers','room','rs','rsvp','ru','rugby','ruhr','run','rw','rwe','ryukyu','sa','saarland','safe','safety','sakura','sale','salon','samsclub','samsung','sandvik','sandvikcoromant','sanofi','sap','sarl','sas','save','saxo','sb','sbi','sbs','sc','sca','scb','schaeffler','schmidt','scholarships','school','schule','schwarz','science','scjohnson','scor','scot','sd','se','search','seat','secure','security','seek','select','sener','services','ses','seven','sew','sex','sexy','sfr','sg','sh','shangrila','sharp','shaw','shell','shia','shiksha','shoes','shop','shopping','shouji','show','showtime','shriram','si','silk','sina','singles','site','sj','sk','ski','skin','sky','skype','sl','sling','sm','smart','smile','sn','sncf','so','soccer','social','softbank','software','sohu','solar','solutions','song','sony','soy','space','sport','spot','spreadbetting','sr','srl','ss','st','stada','staples','star','statebank','statefarm','stc','stcgroup','stockholm','storage','store','stream','studio','study','style','su','sucks','supplies','supply','support','surf','surgery','suzuki','sv','swatch','swiftcover','swiss','sx','sy','sydney','symantec','systems','sz','tab','taipei','talk','taobao','target','tatamotors','tatar','tattoo','tax','taxi','tc','tci','td','tdk','team','tech','technology','tel','temasek','tennis','teva','tf','tg','th','thd','theater','theatre','tiaa','tickets','tienda','tiffany','tips','tires','tirol','tj','tjmaxx','tjx','tk','tkmaxx','tl','tm','tmall','tn','to','today','tokyo','tools','top','toray','toshiba','total','tours','town','toyota','toys','tr','trade','trading','training','travel','travelchannel','travelers','travelersinsurance','trust','trv','tt','tube','tui','tunes','tushu','tv','tvs','tw','tz','ua','ubank','ubs','ug','uk','unicom','university','uno','uol','ups','us','uy','uz','va','vacations','vana','vanguard','vc','ve','vegas','ventures','verisign','versicherung','vet','vg','vi','viajes','video','vig','viking','villas','vin','vip','virgin','visa','vision','vistaprint','viva','vivo','vlaanderen','vn','vodka','volkswagen','volvo','vote','voting','voto','voyage','vu','vuelos','wales','walmart','walter','wang','wanggou','watch','watches','weather','weatherchannel','webcam','weber','website','wed','wedding','weibo','weir','wf','whoswho','wien','wiki','williamhill','win','windows','wine','winners','wme','wolterskluwer','woodside','work','works','world','wow','ws','wtc','wtf','xbox','xerox','xfinity','xihuan','xin','xn--11b4c3d','xn--1ck2e1b','xn--1qqw23a','xn--2scrj9c','xn--30rr7y','xn--3bst00m','xn--3ds443g','xn--3e0b707e','xn--3hcrj9c','xn--3oq18vl8pn36a','xn--3pxu8k','xn--42c2d9a','xn--45br5cyl','xn--45brj9c','xn--45q11c','xn--4gbrim','xn--54b7fta0cc','xn--55qw42g','xn--55qx5d','xn--5su34j936bgsg','xn--5tzm5g','xn--6frz82g','xn--6qq986b3xl','xn--80adxhks','xn--80ao21a','xn--80aqecdr1a','xn--80asehdb','xn--80aswg','xn--8y0a063a','xn--90a3ac','xn--90ae','xn--90ais','xn--9dbq2a','xn--9et52u','xn--9krt00a','xn--b4w605ferd','xn--bck1b9a5dre4c','xn--c1avg','xn--c2br7g','xn--cck2b3b','xn--cg4bki','xn--clchc0ea0b2g2a9gcd','xn--czr694b','xn--czrs0t','xn--czru2d','xn--d1acj3b','xn--d1alf','xn--e1a4c','xn--eckvdtc9d','xn--efvy88h','xn--estv75g','xn--fct429k','xn--fhbei','xn--fiq228c5hs','xn--fiq64b','xn--fiqs8s','xn--fiqz9s','xn--fjq720a','xn--flw351e','xn--fpcrj9c3d','xn--fzc2c9e2c','xn--fzys8d69uvgm','xn--g2xx48c','xn--gckr3f0f','xn--gecrj9c','xn--gk3at1e','xn--h2breg3eve','xn--h2brj9c','xn--h2brj9c8c','xn--hxt814e','xn--i1b6b1a6a2e','xn--imr513n','xn--io0a7i','xn--j1aef','xn--j1amh','xn--j6w193g','xn--jlq61u9w7b','xn--jvr189m','xn--kcrx77d1x4a','xn--kprw13d','xn--kpry57d','xn--kpu716f','xn--kput3i','xn--l1acc','xn--lgbbat1ad8j','xn--mgb9awbf','xn--mgba3a3ejt','xn--mgba3a4f16a','xn--mgba7c0bbn0a','xn--mgbaakc7dvf','xn--mgbaam7a8h','xn--mgbab2bd','xn--mgbah1a3hjkrd','xn--mgbai9azgqp6j','xn--mgbayh7gpa','xn--mgbbh1a','xn--mgbbh1a71e','xn--mgbc0a9azcg','xn--mgbca7dzdo','xn--mgbcpq6gpa1a','xn--mgberp4a5d4ar','xn--mgbgu82a','xn--mgbi4ecexp','xn--mgbpl2fh','xn--mgbt3dhd','xn--mgbtx2b','xn--mgbx4cd0ab','xn--mix891f','xn--mk1bu44c','xn--mxtq1m','xn--ngbc5azd','xn--ngbe9e0a','xn--ngbrx','xn--node','xn--nqv7f','xn--nqv7fs00ema','xn--nyqy26a','xn--o3cw4h','xn--ogbpf8fl','xn--otu796d','xn--p1acf','xn--p1ai','xn--pbt977c','xn--pgbs0dh','xn--pssy2u','xn--q7ce6a','xn--q9jyb4c','xn--qcka1pmc','xn--qxa6a','xn--qxam','xn--rhqv96g','xn--rovu88b','xn--rvc1e0am3e','xn--s9brj9c','xn--ses554g','xn--t60b56a','xn--tckwe','xn--tiq49xqyj','xn--unup4y','xn--vermgensberater-ctb','xn--vermgensberatung-pwb','xn--vhquv','xn--vuq861b','xn--w4r85el8fhu5dnra','xn--w4rs40l','xn--wgbh1c','xn--wgbl6a','xn--xhq521b','xn--xkc2al3hye2a','xn--xkc2dl3a5ee0h','xn--y9a3aq','xn--yfro4i67o','xn--ygbi2ammx','xn--zfr164b','xxx','xyz','yachts','yahoo','yamaxun','yandex','ye','yodobashi','yoga','yokohama','you','youtube','yt','yun','za','zappos','zara','zero','zip','zm','zone','zuerich','zw'];
          //
          // let textHasTlds = function() {
          //
          //   tlds.some(function (tld) {
          //
          //     let re = new RegExp(".\\." + escapeRegEx(tld) + "\\b", "i");
          //
          //     if ( re.test(singleLinkInfoArray.text) ) {
          //       console.log(re);
          //       console.log( singleLinkInfoArray.text );
          //       return true;
          //     }
          //
          //   });
          //
          // };
          //
          // if ( singleLinkInfoArray.hasText ) {
          //
          //   if ( textHasTlds() ) {
          //     console.error("@@@@@@@@@@@@@@@@@@@");
          //     createLinkErrorRow(l, "Link text includes a domain name that may differ from the linked URL.");
          //   }
          //   else {
          //     console.error("!!!!!!!!!!!!!!!!");
          //   }
          // }
          //
    ////-----------------------------////
    ////
    // Check tracking links to see if the URL is consistent with the rest of the links.
    // eg. If most links say trk-sep-17-davenport, but this one says trk-sep-17-walter, throw an error.
    // The logic for this is resolved higher up where we looped through each link, saved all tracking URLs to an array, and determined the most common occurence.

    if ( email.subscription === "ns" && singleLinkInfoArray.isMarketingUrl && linkNeedsPromoCode ) {
      // Ignore if the links pathname ends in -student
      if ( !commonTrkUrlRegex.test(l.urlInDOMMergeTagSafe) && !/\-student\/?$/gi.test(l.pathname) ) {
        createLinkErrorRow(l, "Tracking URL is missing or inconsistent, " + commonTrkUrl + " is most common. - " + l.urlInDOMMergeTagSafe);
      }
    }

    if ( singleLinkInfoArray.isMedBridgeBrandLink && email.esp !== "gr" ) {
      if ( commonUtmSource ) {
        if ( !commonUtmSourceRegex.test(l.urlInDOMMergeTagSafe) ) {
          createLinkErrorRow(l, "<code>utm_source</code> is missing or inconsistent, " + commonUtmSource + " is most common.");
        }
      }
      if ( commonUtmCampaign ) {
        if ( !commonUtmCampaignRegex.test(l.urlInDOMMergeTagSafe) ) {
          createLinkErrorRow(l, "<code>utm_campaign</code> is missing or inconsistent, " + commonUtmCampaign + " is most common.");
        }
      }
    }

    ////
    // Check for whitelabeling versus www
    if ( email.outsideOrg && singleLinkInfoArray.isMedBridgeEdLink ) {

      if ( /https?:\/\/(www\.)?med/.test(l.urlInDOMMergeTagSafe) ) {
        createLinkErrorRow(l, "Missing whitelabeling.");
      }
      else if ( ( email.organization === "hs" && !/\/(encompasshealth|healthsouth)\./i.test(l.urlInDOMMergeTagSafe)) || (email.organization === "dr" && !/\/drayerpt\./i.test(l.urlInDOMMergeTagSafe)) || (email.organization === "fox" && !/\/foxrehab\./i.test(l.urlInDOMMergeTagSafe)) ) {
        createLinkErrorRow(l, "Incorrect whitelabeling.");
      }

    }
    if ( !email.outsideOrg && singleLinkInfoArray.isMedBridgeEdLink && !/\/(support\.|www\.|medbridgeed(ucation)?\.com)/gi.test(l.urlInDOMMergeTagSafe) ) {
      createLinkErrorRow(l, "Remove whitelabeling.");
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
    l.urlInDOMMergeTagSafeNoHash = l.urlInDOMMergeTagSafe.replace(/\#.+/, "");

    if ( /[^#]+\&.+\=/.test(l.urlInDOMMergeTagSafeNoHash) || /[^#]+\?.+\=/.test(l.urlInDOMMergeTagSafeNoHash) && ( !/after_signin_url/.test(l.urlInDOMMergeTagSafeNoHash) ) ) {

      if ( /\&.+\=/.test(l.urlInDOMMergeTagSafe) && !/\?./.test(l.urlInDOMMergeTagSafe) ) {
        createLinkErrorRow(l, "Missing ? in querystring.");
      }

      if ( /\?[^#]+\?.+\=/.test(l.urlInDOMMergeTagSafe) ) {
        createLinkErrorRow(l, "Replace the ? with an & in the querystring.");
      }

      ///////////
      // @TODO - Add exclusions for merge tags
      ///////////

      // Add characters you want to ignore twice. Like *, |, and '.
      if ( !/\?([\@\%\.\w-]+(=[\!\'\*\|\:\+\@\%\.\/\w-]*)?(&[\@\%\.\w-]+(=[\'\*\|\+\@\%\.\/\w-]*)?)*)?$/.test(l.urlInDOMMergeTagSafeNoHash) ) {
        createLinkErrorRow(l, "Invalid querystring.");
        console.log(l.urlInDOMMergeTagSafeNoHash);
      }

    }
          // after_signin_url is different.
          // If you're using more than one qs parameter then the ? needs to be followed immediately
          // by another ? for the redirect to carry the parameters over to the next page.
          if ( /after_signin_url=/.test(l.urlInDOMMergeTagSafeNoHash) ) {

            // Can't (shouldn't) do &after_signin_url.
            if ( !/\?after_signin_url=/.test(l.urlInDOMMergeTagSafe) ) {
              createLinkErrorRow(l, "<code>after_signin_url</code> must be the first parameter.");
            }

            if ( /\?after_signin_url=[^\?#]*?&/.test(l.urlInDOMMergeTagSafe) ) {
              createLinkErrorRow(l, "Replace the & with a ? in the querystring.");
            }

          }

    // Leftover & or ? from a removed querystring
    // TEMPORARILY MODIFIED -
    // In Q4 2019 we started needing to end course links with trailing ?.
    // Something about the combination of AC and the new marketing site made this necessary
    // AC tracking is removing the #discipline at the end of links
    // We currently have to make this link:
       // https://www.medbridgeeducation.com/courses?utm_content=mod1#/discipline
    // Look like this:
       // https://www.medbridgeeducation.com/courses?utm_content=mod1#/discipline?
    // When this is fixed, we can remove the second criteria
              // if ( /(\?|&)$/g.test(l.urlInDOMMergeTagSafe) ) {
              //   createLinkErrorRow(l, "Remove the trailing ? or &.");
              // }

    if ( /(\?|&)$/g.test(l.urlInDOMMergeTagSafe) && email.division === "enterprise" ) {
      createLinkErrorRow(l, "Remove the trailing ? or &.");
    }

    if ( !/(\?|&)$/g.test(l.urlInDOMMergeTagSafe) && /#/g.test(l.urlInDOMMergeTagSafe) && email.division !== "enterprise" ) {
      createLinkErrorRow(l, "Add a trailing ? after your hashtag to be compatible with ActiveCampaign");
    }



    ////-----------------------------////
    ////
    if ( /google\.com\/url\?/gi.test(l.urlInDOMMergeTagSafe) ) {
      createLinkErrorRow(l, "This looks like a Google redirect.");
    }

    ////-----------------------------////
    ////
    if ( linkNeedsPromoCode ) {

      // Links to MedBridge in -ns emails need to use a marketing URL
      if ( !/\.com\/(gr|mc)?trk\-/gi.test(l.urlInDOMMergeTagSafe) || /\.com\/(signin|courses\/|blog\/)/gi.test(l.urlInDOMMergeTagSafe) ) {
        createLinkErrorRow(l, "Use a Marketing URL.");
      }

      // Spell after_affiliate_url correctly!
      if ( !/\-(blog|article)/gi.test(l.urlInDOMMergeTagSafe) && !/after_affiliate_url/gi.test(l.urlInDOMMergeTagSafe) ) {
        createLinkErrorRow(l, "Missing after_affiliate_url query parameter.");
      }

      // Too many leading /'s' during a redirect can cause a link to not work
      if ( /after_affiliate_url=\/\/+/gi.test(l.urlInDOMMergeTagSafe) ) {
        createLinkErrorRow(l, "Too many consecutive /s.");
      }

      // Watch out for extra hyphens!
      if ( /\-\-.+?after_affiliate_url/gi.test(l.urlInDOMMergeTagSafe) ) {
        createLinkErrorRow(l, "Investigate consecutive hyphens.");
      }
      // Watch out for extra forward slashes!
      if ( /https?:\/\/.+?\/\//gi.test(l.urlInDOMMergeTagSafe) ) {
        createLinkErrorRow(l, "Investigate consecutive forward slashes.");
      }

      // console.log("email.date.getMonth(); " + email.date.getMonth());

      // Check the date in a tracking URL if the email's filename has a date in it to match against
      if ( labelsAvailable ) {
        if ( email.date.getMonth() ) {
          var monthPattern = new RegExp("\\/(gr|mc)?trk\\-.*?" + email.monthName + "\\-", "gi");
          if ( !monthPattern.test(l.urlInDOMMergeTagSafe) ) {
            createLinkErrorRow(l, "Link should include '-" + email.monthName + "-' to match month in filename.");
          }
        }
      }

    }


    // DEPRECATED - 2020-02-24
    // Helen has requested that we stop validating the `mod#` on table modules.
    // The B2C team is switching to a more descriptive method to target modules by type.
    //
    // ////
    // // Is the module # in the utm correct?
    // ////
    //
    // // console.error("0");
    // //
    // // console.log("email.subscription: " + email.subscription);
    // // console.log("email.outsideOrg: " + email.outsideOrg);
    // // console.log("singleLinkInfoArray.isMedBridgeBrandLink: " + singleLinkInfoArray.isMedBridgeBrandLink);
    //
    // console.error("1");
    // if ( linkNeedsGoogleTracking && email.esp !== "gr" ) {
    // console.error("2");
    //
    //   var moduleNumber = l.closest("[data-module-count]");
    //
    //   if ( elementExists(moduleNumber) ) {
    //
    //     console.error("3");
    //
    //     moduleNumber = moduleNumber.getAttribute("data-module-count");
    //     var moduleNumberMatch = new RegExp("utm_content=.*?mod" + moduleNumber + "(\/|\-|&|$|#)", "gi");
    //
    //     // mod followed by 1 or 2 digits, followed by - or # or & or the link ends.
    //     if ( /utm_content=.*?mod\d(\d)?(\/|\-|&|$|#)/gi.test(l.urlInDOMMergeTagSafe) ) {
    //
    //       console.error("4");
    //
    //       if ( !moduleNumberMatch.test(l.urlInDOMMergeTagSafe) ) {
    //
    //         console.error("5");
    //
    //         // console.log( "no match: " + !moduleNumberMatch.test(l.urlInDOMMergeTagSafe) );
    //         createLinkErrorRow(l, "Wrong mod #, use " + "mod" + moduleNumber + ".");
    //       } else {
    //         console.error("6");
    //         // console.log( "match: " + !moduleNumberMatch.test(l.urlInDOMMergeTagSafe) );
    //       }
    //
    //     } else {
    //
    //       console.error("7");
    //       createLinkErrorRow(l, "Missing or mistyped mod #, use mod" + moduleNumber + ".");
    //
    //     }
    //   }
    // }
    // console.error("8");

    ////
    // Is color present in the style attribute?
    // Ignore if there's no text, or it's an image (unless that image has alt text).
    ////

    var linkedImg;

    // Get the img child first.
    if ( elementExists(l.getElementsByTagName('img')[0]) ) {
      linkedImg = l.getElementsByTagName('img')[0];


    if ( l.style.color === '' ) {

      if ( (linkedImg && l.textContent !== '') || l.textContent !== '' )
      createLinkErrorRow(l, "Missing color in style attribute.");
      }

    }

    // @TODO: Not seeing this bug. Disabled until I see it again.
    // if ( l.style.textAlign !== '' && linkedImg ) {
    //   createLinkErrorRow(l, "Don't use <code>text-align</code> in links when linking images, it breaks in Safari.");
    // }



    ////
    // Check for old fashioned marketing URLS in sub, ent, or email.outsideOrg
    if ( (email.outsideOrg || email.subscription === "sub" || email.audience === "ent" ) && (singleLinkInfoArray.isMedBridgeBrandLink && /\.com\/(gr|mc)?trk\-/gi.test(l.urlInDOMMergeTagSafe) || /after_affiliate_url/gi.test(l.urlInDOMMergeTagSafe)) ) {
      createLinkErrorRow(l, "Do not use a Marketing URL.");
    }

    ////
    // Check for medium=email in Sale and Presale emails
    if ( (email.subscription === "sub" || !emailAnySale) && /[\?&]medium=email/gi.test(l.urlInDOMMergeTagSafe) ) {

      createLinkErrorRow(l, "Remove <code>medium=email</code>.");

    }

    else if ( email.subscription === "ns" && !email.outsideOrg && singleLinkInfoArray.isMedBridgeBrandLink && ( singleLinkInfoArray.isArticle || /\-article/gi.test(l.urlInDOMMergeTagSafe) ) ) {

      if ( emailAnySale && !/medium=email/gi.test(l.urlInDOMMergeTagSafe)) { // Any sale email
        createLinkErrorRow(l, "Add <code>medium=email</code>.");
      }

    }


    //
    // Check ns emails
    //
    if ( singleLinkInfoArray.isMedBridgeEdLink && email.subscription === "ns" ) {

      // Webinars
      if ( /\.com\/webinars(\?|\/|#|$)[^d]/gi.test(l.urlInDOMMergeTagSafe) ) {
        createLinkErrorRow(l, "Link to /live-webinars instead in Non-Subscriber emails.");
      }

    }

    //
    // Check sub emails
    //
    if ( singleLinkInfoArray.isMedBridgeEdLink && (email.subscription === "sub" || email.outsideOrg) ) {

      //
      if ( /\.com\/continuing-education(\?|\/|#|$)/gi.test(l.urlInDOMMergeTagSafe) ) {
        createLinkErrorRow(l, "Link to /courses instead in Subscriber emails.");
      }
      //
      if ( /\.com\/(speech-language-pathology|occupational-therapy|athletic-training|physical-therapy)(\?|\/|#|$)/gi.test(l.urlInDOMMergeTagSafe) ) {
        createLinkErrorRow(l, "Link to a page without conversion messaging in Subscriber emails.");
      }
      // Webinars
      if ( /\.com\/live-webinars(\?|\/|#|$)/gi.test(l.urlInDOMMergeTagSafe) ) {
        createLinkErrorRow(l, "Link to /webinars instead in Subscriber emails.");
      }

      ////
      // Check for sub=yes
      ////
      // sub=yes is required in blog links.
      if ( singleLinkInfoArray.isBlogLink && !/sub=yes/gi.test(l.urlInDOMMergeTagSafe) ) {
        createLinkErrorRow(l, "Add <code>sub=yes</code>.");
      }
      // sub=yes should not be in any other links.
      if ( ( !singleLinkInfoArray.isBlogLink && !/\-(blog|article)/gi.test(l.urlInDOMMergeTagSafe) ) && /sub=yes/gi.test(l.urlInDOMMergeTagSafe) ) {
        createLinkErrorRow(l, "Remove <code>sub=yes</code>.");
      }

    }

    ////
    // Check for broken article links in sub
    if ( singleLinkInfoArray.isMedBridgeEdLink && email.subscription === "sub" && /p=\d\d\d/gi.test(l.urlInDOMMergeTagSafe) && !/\.com\/blog(\/|\?)/gi.test(l.urlInDOMMergeTagSafe) ) {
      createLinkErrorRow(l, "Article link is broken.");
    }

    ////
    // Check all links in non-subscriber emails for sub=yes, never use it in ns.
    if ( email.subscription === "ns" && /sub=yes/gi.test(l.urlInDOMMergeTagSafe) ) {
      createLinkErrorRow(l, "Remove <code>sub=yes</code>.");
    }

    ////
    // Verify links in A/B emails if it looks like the link is using -a or -b.
    if ( singleLinkInfoArray.isMarketingUrl && abTesting === "a" && /\-b[\?\/]/i.test(l.urlInDOMMergeTagSafe) ) {
      createLinkErrorRow(l, "Fix a/b version.");
    }
    if ( singleLinkInfoArray.isMarketingUrl && abTesting === "b" && /\-a[\?\/]/i.test(l.urlInDOMMergeTagSafe) ) {
      createLinkErrorRow(l, "Fix a/b version.");
    }
    if ( singleLinkInfoArray.isMarketingUrl && (abTesting !== "a" && abTesting !== "b") && /\-(a|b)[\?\/]/i.test(l.urlInDOMMergeTagSafe) ) {
      createLinkErrorRow(l, "Remove -a/-b.");
    }


    ////
    // Link Text Hints
    // Only test for link -vs- text inconsistencies if we've determined that the linked content actually includes text.
    if ( singleLinkInfoArray.hasText ) {

      // Request a Demo
      if ( ( /(speak with|Group Pricing|Part of an organization|(Schedule|Request) (Group|a Demo|Info))|Pricing/gi.test(l.textContent) && !/#request\-a\-demo/i.test(l.urlInDOMMergeTagSafe) ) || (!/((form|schedule (a |some )?time|(speak with|Group Pricing|Part of an organization|(Schedule|Request) (Group|a Demo|Info))|Pricing|Request)|connect to further discuss|connect with us)/gi.test(l.textContent) && /#request\-a\-demo/i.test(l.urlInDOMMergeTagSafe)) ) {
        createLinkErrorRow(l, "Text and URL are inconsistent (Demo Request related).");
      }
      // Request EMR Integration
      if ( (singleLinkInfoArray.hasText ) && (/Request (EMR|Integration)/gi.test(l.textContent) && !/#request-integration/i.test(l.urlInDOMMergeTagSafe)) || (!/Request|EMR|Integration/gi.test(l.textContent) && /#request-integration/i.test(l.urlInDOMMergeTagSafe)) ) {
        createLinkErrorRow(l, "Text and URL are inconsistent (EMR Integration related).");
      }

    }

    if ( email.organization !== "hs" ) {
      if ( /\barticle\b/gi.test(l.textContent) && !singleLinkInfoArray.isArticle ) {
        createLinkErrorRow(l, "Text references an article but the URL does not go to one.");
      }
      if ( /\barticles\b/gi.test(l.textContent) && !singleLinkInfoArray.isBlogLink ) {
        createLinkErrorRow(l, "Text references articles but the URL does not go to the blog.");
      }
      // This was a failed experiment. I later realized that we would want to link article titles that don't
      // have the word "Read" or "Article" in them.
      // if ( !/Read|Article/gi.test(l.textContent) && singleLinkInfoArray.isArticle ) {
      //   createLinkErrorRow(l, "Link text does not match url (article related) [2].");
      // }
    }

    ////
    // Enterprise
    // Deprecated - Just because a contact is subscribed to our Enterprise solution, doesn't mean that they have all of the enterprise products.
    // if ( singleLinkInfoArray.isMedBridgeBrandLink && email.subscription === "sub" && email.audience === "ent" && /request\-a\-demo/gi.test(l.urlInDOMMergeTagSafe) ) {
    //   createLinkErrorRow(l, "no demo requests in enterprise sub");
    // }

    //// Using after_signin_url on Subscriber links
    ///////////////////////////////////////////////
    // email.outsideOrg and subs should not link to home-exercise-program.
    // Use sign-in/?after_signin_url=patient_care/programs/create

    // Check that this is a sub or email.outsideOrg email
    if ( email.outsideOrg || email.subscription === "sub") {

      // // // Courses
      // if ( /\.com\/courses\/details\//gi.test(l.urlInDOMMergeTagSafe) ) {
      //   createLinkErrorRow(l, "Use <code>sign-in/?after_signin_url=courses/details/...</code>");
      // }

      // Patient Education
      if ( /\.com\/patient\-education\-library\/condition\//gi.test(l.urlInDOMMergeTagSafe) ) {
        createLinkErrorRow(l, "Use <code>sign-in/?after_signin_url=patient-education-library/condition/...</code>");
      }

      // Webinars
      if ( /\.com\/webinars\/details\//gi.test(l.urlInDOMMergeTagSafe) ) {
        createLinkErrorRow(l, "Use <code>sign-in/?after_signin_url=webinars/details/...</code>");
      }
      // HEP
      if ( /\.com\/home\-exercise\-program/gi.test(l.urlInDOMMergeTagSafe) || /patient_care\/programs\/create/gi.test(l.urlInDOMMergeTagSafe) ) {

        if ( !/after_signin_url/gi.test(l.urlInDOMMergeTagSafe) ) {
          createLinkErrorRow(l, "Use <code>sign-in/?after_signin_url=patient_care/programs/create</code>");
        }

      }

      // TODO: TEMPORARY UNTIL DEV FIXES A BUG
      if ( /after_signin_url=/gi.test(l.urlInDOMMergeTagSafe) && !email.outsideOrg && !/(patient_care\/programs\/create|webinars\/details\/|patient\-education\-library\/condition)/gi.test(l.urlInDOMMergeTagSafe) && !/refer/gi.test(l.urlInDOMMergeTagSafe) ) {
        createLinkErrorRow(l, "Don't use <code>after_signin_url</code> (temporary).");
      }

    } else {
      // This is an NS email? No after_signin_url for you!
      if ( /(\.com\/sign-in|after_signin_url=)/gi.test(l.urlInDOMMergeTagSafe) ) {
        createLinkErrorRow(l, "Don't use sign-in related URLs in Non-Subscriber emails.");
      }
    }

    if ( (!email.outsideOrg && email.subscription !== "sub") && /patient_care\/programs\/create/gi.test(l.urlInDOMMergeTagSafe) ) {
      createLinkErrorRow(l, "use <code>home-exercise-program</code>");
    }



    ////
    // Tracking URL - Discipline Check

    if ( email.audience !== "multi" && email.audience !== "ent" && email.audience !== null && email.subscription === "ns" && singleLinkInfoArray.isMedBridgeBrandLink && !/\/courses\/details\//g.test(l.urlInDOMMergeTagSafe) && singleLinkInfoArray.isMarketingUrl ) {

      if ( email.audience === "pt" && !/\-pt(\-(\/?$|.+?(\?|\&)after|$)|\/|\?)/gi.test(l.urlInDOMMergeTagSafe) ) {
        createLinkErrorRow(l, "Missing/wrong discipline.");
      }
      if ( email.audience === "at" && !/\-at(\-(\/?$|.+?(\?|\&)after|$)|\/|\?)/gi.test(l.urlInDOMMergeTagSafe) ) {
        createLinkErrorRow(l, "Missing/wrong discipline.");
      }
      if ( email.audience === "ot" && !/\-ot(\-(\/?$|.+?(\?|\&)after|$)|\/|\?)/gi.test(l.urlInDOMMergeTagSafe) ) {
        createLinkErrorRow(l, "Missing/wrong discipline.");
      }
      if ( email.audience === "slp" && !/\-slp(\-(\/?$|.+?(\?|\&)after|$)|\/|\?)/gi.test(l.urlInDOMMergeTagSafe) ) {
        createLinkErrorRow(l, "Missing/wrong discipline.");
      }
      if ( email.audience === "ind-other" && !/\-other(\-(\/?$|.+?(\?|\&)after|$)|\/|\?)/gi.test(l.urlInDOMMergeTagSafe) ) {
        createLinkErrorRow(l, "Missing/wrong discipline.");
      }
    }

    // Homepage - Discipline Check
    // Checking NS and SUB.
    if ( email.division === "individual" ) {
      if ( email.audience !== "multi" && email.audience !== "all" && email.audience !== null && email.audience !== undefined && !email.outsideOrg && singleLinkInfoArray.isMedBridgeBrandLink ) {

        if ( (email.audience !== "pt" && email.audience !== "ind-other") && (/after_affiliate_url=\/?physical-therapy(&|$)/gi.test(l.urlInDOMMergeTagSafe) || /\.com\/physical-therapy\/?(\?|$)/gi.test(l.urlInDOMMergeTagSafe)) ) {
          createLinkErrorRow(l, "Wrong homepage.");
        }
        if ( (email.audience !== "ind-other" && email.audience !== "lmt") && (/after_affiliate_url=\/(&|$)/gi.test(l.urlInDOMMergeTagSafe) || /\.com\/(\?|$)/gi.test(l.urlInDOMMergeTagSafe)) ) {
          createLinkErrorRow(l, "Wrong homepage.");
        }
        if ( email.audience !== "at" && (/after_affiliate_url=\/?athletic-training(&|$)/gi.test(l.urlInDOMMergeTagSafe) || /\.com\/athletic-training\/?(\?|$)/gi.test(l.urlInDOMMergeTagSafe)) ) {
          createLinkErrorRow(l, "Wrong homepage.");
        }
        if ( email.audience !== "ot" && (/after_affiliate_url=\/?occupational-therapy(&|$)/gi.test(l.urlInDOMMergeTagSafe) || /\.com\/occupational-therapy\/?(\?|$)/gi.test(l.urlInDOMMergeTagSafe)) ) {
          createLinkErrorRow(l, "Wrong homepage.");
        }
        if ( email.audience !== "slp" && (/after_affiliate_url=\/?speech-language-pathology(&|$)/gi.test(l.urlInDOMMergeTagSafe) || /\.com\/speech-language-pathology\/?(\?|$)/gi.test(l.urlInDOMMergeTagSafe)) ) {
          createLinkErrorRow(l, "Wrong homepage.");
        }
      }
    }

    // Enterprise Setting Pages
    // Home Care
    if ( email.division === "enterprise" ) {
      if ( email.audience !== "hc" && /medbridgeed(ucation)?\.com\/enterprise\/home-care-and-hospice/gi.test(l.urlInDOMMergeTagSafe) ) {
        createLinkErrorRow(l, "Wrong homepage.");
      }
      // Hospital
      if ( email.audience !== "hosp" && /medbridgeed(ucation)?\.com\/enterprise\/hospitals-health-care-systems/gi.test(l.urlInDOMMergeTagSafe) ) {
        createLinkErrorRow(l, "Wrong homepage.");
      }
      // Long-Term Care
      if ( email.audience !== "ltc" && /medbridgeed(ucation)?\.com\/enterprise\/skilled-nursing-and-long-term-care/gi.test(l.urlInDOMMergeTagSafe) ) {
        createLinkErrorRow(l, "Wrong homepage.");
      }
      // Private Practice
      if ( email.audience !== "pp" && /medbridgeed(ucation)?\.com\/enterprise\/private-practice/gi.test(l.urlInDOMMergeTagSafe) ) {
        createLinkErrorRow(l, "Wrong homepage.");
      }
      // Other/Unknown
      if ( (email.audience !== "ent-other" && email.audience !== "all" ) && /medbridgeed(ucation)?\.com\/enterprise($|\/$|\/?\?)/gi.test(l.urlInDOMMergeTagSafe) ) {
        createLinkErrorRow(l, "Wrong homepage.");
      }
    }


    // Discipline Check - Blog
    // Checking NS and SUB.
    if ( /blog\/discipline\/pt/gi.test(l.urlInDOMMergeTagSafe) && (email.audience !== "pt" && email.audience !== "ind-other") ) {
      createLinkErrorRow(l, "Wrong discipline.");
    }
    else if ( /blog\/discipline\/at/gi.test(l.urlInDOMMergeTagSafe) && email.audience !== "at" ) {
      createLinkErrorRow(l, "Wrong discipline.");
    }
    else if ( /blog\/discipline\/ot/gi.test(l.urlInDOMMergeTagSafe) && email.audience !== "ot" ) {
      createLinkErrorRow(l, "Wrong discipline.");
    }
    else if ( /blog\/discipline\/slp/gi.test(l.urlInDOMMergeTagSafe) && email.audience !== "slp" ) {
      createLinkErrorRow(l, "Wrong discipline.");
    }
    else if ( /blog\/discipline\/(at|ot|slp)/gi.test(l.urlInDOMMergeTagSafe) && email.audience === "ind-other" ) {
      createLinkErrorRow(l, "Wrong discipline.");
    }


    // False Courses Page URL
    // courses/speech-language-pathology isn't a page
    // The only valid pages for courses is courses/# and courses/details
    // First match that this is intended to be a courses link. Then see if it DOESN'T match the only valid kinds of courses links.
    if ( /(\.com\/|after_signin_url=\/?|after_affiliate_url=\/?)courses/gi.test(l.urlInDOMMergeTagSafe) && !/(\.com\/|after_signin_url=\/?|after_affiliate_url=\/?)courses(\/details|\/?(#|&|\?|$))/gi.test(l.urlInDOMMergeTagSafe) ) {
      createLinkErrorRow(l, "Invalid courses page. Only <code>courses/#</code> and <code>courses/details</code> is valid.");
    }


    // Courses Page
    // Is this the courses page (not the courses detail page)?
    if ( /(\.com\/|after_signin_url=\/?|after_affiliate_url=\/?)courses(\/?#|\/?&|\/?\?|\/?$|\/[^d])/gi.test(l.urlInDOMMergeTagSafe) ) {

      // If the email has a discipline, the link to the courses page needs one too.
      // Check the discipline of the email against the hashtag that's being used for links meant to go to the courses page
      if ( email.audience === "enterprise" || email.audience === "ent" || email.audience === "multi" || email.audience === "all" || email.audience === null || email.audience === undefined ) {

        // Removed on 9/25/18
        // I was editing a Pardot campaign that had no discipline set. But we were linking to the #nursing category of the courses page.
        // This threw an error when I'd rather it hadn't.
        // if ( /#/gi.test(l.urlInDOMMergeTagSafe) ) {
        //   createLinkErrorRow(l, "Remove the hashtag. This email has no assigned discipline to link to.");
        // }

      } else {
        if ( !/#/gi.test(l.urlInDOMMergeTagSafe) ) {
          createLinkErrorRow(l, "Missing discipline in the hashtag.");
        } else {
          if ( (email.audience === "pt" ) && !/#\/?physical-therapy/gi.test(l.urlInDOMMergeTagSafe) ) {
            createLinkErrorRow(l, "Wrong discipline in the hashtag.");
          }
          if ( (email.audience === "ind-other" ) && /#\/?(athletic-training|occupational-therapy|speech-language-pathology|nursing)/gi.test(l.urlInDOMMergeTagSafe) ) {
            createLinkErrorRow(l, "Wrong discipline in the hashtag.");
          }
          if ( email.audience === "at" && !/#\/?athletic-training/gi.test(l.urlInDOMMergeTagSafe) ) {
            createLinkErrorRow(l, "Wrong discipline in the hashtag.");
          }
          if ( email.audience === "ot" && !/#\/?occupational-therapy/gi.test(l.urlInDOMMergeTagSafe) ) {
            createLinkErrorRow(l, "Wrong discipline in the hashtag.");
          }
          if ( email.audience === "slp" && !/#\/?speech-language-pathology/gi.test(l.urlInDOMMergeTagSafe) ) {
            createLinkErrorRow(l, "Wrong discipline in the hashtag.");
          }
          if ( email.audience === "rn" && !/#\/?nursing/gi.test(l.urlInDOMMergeTagSafe) ) {
            createLinkErrorRow(l, "Wrong discipline in the hashtag.");
          }
        }
      }

    }

    // Patient Engagement Landing Page
    // Discipline Check
    // [NS]
    if ( email.subscription === "ns" ) {
      if ( /h\/patient-engagement-for-physical-therapists/gi.test(l.urlInDOMMergeTagSafe) && (email.audience !== "pt" && email.audience !== "ind-other") ) {
        createLinkErrorRow(l, "Wrong landing page for this discipline.");
      }
      else if ( /h\/patient-engagement-for-athletic-trainers/gi.test(l.urlInDOMMergeTagSafe) && email.audience !== "at" ) {
        createLinkErrorRow(l, "Wrong landing page for this discipline.");
      }
      else if ( /h\/patient-engagement-for-occupational-therapists/gi.test(l.urlInDOMMergeTagSafe) && email.audience !== "ot" ) {
        createLinkErrorRow(l, "Wrong landing page for this discipline.");
      }
      else if ( /h\/patient-engagement-for-speech-language-pathology/gi.test(l.urlInDOMMergeTagSafe) && email.audience !== "slp" ) {
        createLinkErrorRow(l, "Wrong landing page for this discipline.");
      }
    }
    // [SUB]
    if ( /h\/patient-engagement-for-(physical-therapists|athletic-trainers|occupational-therapists|speech-language-pathology)/gi.test(l.urlInDOMMergeTagSafe) && email.subscription === "sub" ) {
      // createLinkErrorRow(l, "Wrong landing page for subscribers. Use <code>sign-in/?after_signin_url=patient_care/programs/create</code>");
      createLinkErrorRow(l, "Wrong landing page for subscribers. Use <code>patient_care/programs/create</code>");
    }


    // Pricing
    // SUB
    if ( singleLinkInfoArray.isMedBridgeBrandLink && email.subscription === "sub" && /\.com\/(cart|pricing)/gi.test(l.urlInDOMMergeTagSafe) ) {
      createLinkErrorRow(l, "Don't link to the pricing or cart pages in subscriber emails.");
    }
    // NS -
    if ( singleLinkInfoArray.isMedBridgeBrandLink && email.subscription === "ns" ) {

      // Pricing Page - Discipline Check
      if ( /pricing/gi.test(l.urlInDOMMergeTagSafe) ) {
        // PT
        if ( email.audience === "pt" && !/pricing\/pt/gi.test(l.urlInDOMMergeTagSafe) ) {
          createLinkErrorRow(l, "Link to pricing/pt.");
        }
        // AT
        else if ( email.audience === "at" && !/pricing\/at/gi.test(l.urlInDOMMergeTagSafe) ) {
          createLinkErrorRow(l, "Link to pricing/at.");
        }
        // OT
        else if ( email.audience === "ot" && !/pricing\/ot/gi.test(l.urlInDOMMergeTagSafe) ) {
          createLinkErrorRow(l, "Link to pricing/ot.");
        }
        // SLP
        else if ( email.audience === "slp" && !/pricing\/slp/gi.test(l.urlInDOMMergeTagSafe) ) {
          createLinkErrorRow(l, "Link to pricing/slp.");
        }
        // Other
        else if ( email.audience === "ind-other" && !/pricing(\/(pt|other)|\/?(&|$))/gi.test(l.urlInDOMMergeTagSafe) ) {
          createLinkErrorRow(l, "Link to pricing/other.");
        }
        // No Discipline
        else if ( !email.audience && /pricing\/(pta?|at|ota?|slp|cscs|other)/gi.test(l.urlInDOMMergeTagSafe) ) {
          createLinkErrorRow(l, "Link to standard pricing page.");
        }

        // Students
        if ( /student/.test(l.pathname) ) {
          createLinkErrorRow(l, "If this is a student promo code, link to <code>cart/get_subscription/9</code> instead.");
        }
      }

      // NS - Cart Page - Discipline Check
      if ( /cart/gi.test(l.urlInDOMMergeTagSafe) && !/get_subscription\/[0-9]/gi.test(l.urlInDOMMergeTagSafe) ) {
        createLinkErrorRow(l, "Links to the cart page need to link to <code>cart/get_subscription/##</code>.");
      }
    }


    // Check for unecessary discipline hastags. Should only be used when linking to courses page
    if ( /#\/?(speech-language-pathology|physical-therapy|nursing|athletic-training|occupational-therapy)/gi.test(l.urlInDOMMergeTagSafe) && ( !/(_url=courses|\/courses|\/course-catalog)(#|\/|\?|&|$)/gi.test(l.urlInDOMMergeTagSafe) && !/\/\/(foxrehab|drayerpt)\.medbridgeeducation\.com\/#/gi.test(l.urlInDOMMergeTagSafe) ) ) {
      createLinkErrorRow(l, "Unecessary hashtag.");
    }


    ////
    // Do not link to medbridgeed.com. Use the full medbridgeeducation.com URL.
    // Unless it starts with enterprise\.
    if ( /(\:\/\/|\.)medbridgeed\.com/gi.test(l.urlInDOMMergeTagSafe) && !/\:\/\/enterprise\.medbridgeed\.com/gi.test(l.urlInDOMMergeTagSafe) ) {
      createLinkErrorRow(l, "Use medbridgeeducation.com");
    }

    ////
    // NO //support. in email.outsideOrg
    if ( /\/support\./gi.test(l.urlInDOMMergeTagSafe) && email.outsideOrg ) {
      createLinkErrorRow(l, "://support. not allowed in email.outsideOrg, use mailto:support@medbridgeed.com");
    }

    ////
    // Do not advertise Enterprise products to email.outsideOrg
    if ( /enterprise/gi.test(l.urlInDOMMergeTagSafe) && email.outsideOrg ) {
      createLinkErrorRow(l, "do not advertise enterprise to email.outsideOrg");
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
  // if ( singleLinkInfoArray.type === "merge tag" || singleLinkInfoArray.type === "mailto" ) {
  //   linkMarker.classList.add("do-not-highlight");
  // }

  // Now that we've created an object for this link and added it to the array
  // Check the links status (async) and add the results to the array.

  // Only check the link if checkStatus is true
  if ( singleLinkInfoArray.checkStatus ) {
    // Skip links that are duplicates. When the original link is done being XHR'd we'll apply the results to all matching links.
    if ( singleLinkInfoArray.firstInstance ) {
      onRequest(i, l.urlInDOM, l);
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
  for (let l of linkList) {

    linkInfoArray[i].desktopposition = { "top": l.getBoundingClientRect().top, "left": l.getBoundingClientRect().left };

    // Link Visibility (Desktop)
    if ( isElementVisible(l) ) {
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
  for (let l of linkList) {

    linkInfoArray[j].mobileposition = { "top": l.getBoundingClientRect().top, "left": l.getBoundingClientRect().left };

    // Link Visibility (Mobile)
    if ( isElementVisible(l) ) {
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
function decipherQuerystring(url, l) {

  // We'll create an object with keys and values
  var qsObject = {};

  // Grab the querystring using the .search property.
  // Pulling it from the search property excludes ending # hashes for us
  // Remove leading '?'s and trailing /'s.'
  var querystring = l.search.replace(/(^\?+?|\/+?$)/gi,"");

  // Using Map to iterate through the remaining Querystring
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
  querystring.split("&").map(function(qs) {

    var key = qs.split("=")[0];
    var val = qs.split("=")[1];

    qsObject[key] = val;

  });

  // Check for querystrings after the hash. This is specifically for MedBridge.
  var querystringAfterHash = l.hash.replace(/^#+?/i,"");

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
  for (let l of arr) {

    uniqueLinksArray.push(l.getAttribute("href"));

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
