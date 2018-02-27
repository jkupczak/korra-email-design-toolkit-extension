console.warn("[sonic-toolkit-extension] loaded /js/newsletter/newsletter-functions.js");
////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
/////
/////
/////    Global Variables
/////
/////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////


// Used to determine if the resizable dFrame is currently being resized.
let resizeActive = false;



///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//////////////////////////// == xxxxxxxxxxxxxxxx == ///////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
/////
/////
/////    Observe Resizing
/////
/////    https://developers.google.com/web/updates/2016/10/resizeobserver
/////
/////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////


// Observe one or multiple elements
// https://developers.google.com/web/updates/2016/10/resizeobserver


var ro = new ResizeObserver( entries => {

  for (let link of linksWithErrorsArr) {

    var linkm = dFrameContents.querySelectorAll(".link-marker[data-number='" + link.getAttribute('data-number') + "']")[0];

    linkm.style.top  =  (link.offsetTop - 10) + "px";
    linkm.style.left =  (link.offsetLeft -10) + "px";

  }

});


///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
/////
/////
/////    Breakdown a Querystring
/////
/////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////

function breakdownQuerystring(url) {

  // var url = location;
  // var querystring = linkUrl.search.slice(1);
  var querystring = url.replace(/^.+?\?/gi, "");
  var tab = querystring.split("&").map(function(qs) {
    return { "Key": qs.split("=")[0], "Value": qs.split("=")[1], "Pretty Value": decodeURIComponent(qs.split("=")[1]) } //.replace(//g," ")
  });

  // console.group("Querystring Values");
  // console.log("URL: "+url+"\nQS:  "+querystring);
  // console.table(tab);
  // console.log(tab);
  // console.groupEnd("Querystring Values");

  return tab

};

///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
/////
/////
/////    KeyPress Capture
/////
/////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////


// Watch for keypresses and react accordingly.
// Load in ASAP so that we can catch everything as the page is loading.
window.onkeydown = KeyPress;

function KeyPress(e) {

  // Get the event keycodes
  var evtobj = window.event? event : e

  // Zoom Detection
  // Watch for Chrome zoom shortcuts, cmd/ctrl plus +/-/0
  // Block their function and let zoom.js handle the rest.
  if ( (e.ctrlKey || e.metaKey) && (evtobj.keyCode == 48 || evtobj.keyCode == 187 || evtobj.keyCode == 189) ) {
    e.preventDefault();
    checkZoomLevel();
  }
}



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


function pinLinkMarker(e) {
  // http://stackoverflow.com/a/8454104/556079
  this.classList.toggle("pinned");
  this.nextSibling.style.display = this.nextSibling.style.display === 'block' ? '' : 'block';
}

function unpinLinkMarker(e) {

  var linkNum = this.dataset.number;

  dFrameContents.querySelectorAll("#link-marker-" + linkNum)[0].classList.toggle("pinned");

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
/////    Change mobile viewport width
/////
/////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////

// Future Upgrade:
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

        if ( selectedSize !== "320" ) {
          history.replaceState(null,null, updateQueryString("mobilewidth", selectedSize) );
        } else {
          history.replaceState(null,null, updateQueryString("mobilewidth", null) );
        }

        document.querySelector(".mobile-iframe-settings .active").classList.remove("active");
        clickedSize.classList.add("active");
      }
    }

  }
  if ( mobileDeviceWrapper.offsetWidth !== parseInt(selectedSize) ) {
    // console.log("resizing mobile container", mobileDeviceWrapper.offsetWidth, parseInt(selectedSize));
    mobileDeviceWrapper.style.width = selectedSize + "px";
    showdFrameWidthStatus();
    if ( resizeActive ) {
      resetDesktopResize();
    }
  }

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




function linkValidationLoop(linkList, ageCheck) {

      // Verify the visibility of all links in Desktop and Mobile.
      // Wait for the iframe to finish loading before we do though.
      // Modify this to use the dummyIframe for both desktop and mobile so that we can avoid errors.
      desktopIframe.onload = () => {
        verifyLinkVisibility(linkList);
      }

      // Array that contains only the link objects that have errors.
      linksWithErrorsArr = [];

      // Instead of waiting for this function to run grab all links and place them in an array, we moved this up to happen right after the iframe is created.
      // Regardless of whether or not we end up checking the links.
      // let linkList = dFrameContents.querySelectorAll("a");

      console.groupCollapsed("Links Group for Validation - Total Links Processed: " + linkList.length);

      // Loop through each link on the page first before we validate individually.
      var allLinkUrlsList = [];
      var medbridgeLinkUrlsList = [];

      for (let link of linkList) {

        allLinkUrlsList.push({url: link.href});

        if ( /medbridge(ed(ucation)?|massage)\.com\//gi.test(link.href) ) {
          medbridgeLinkUrlsList.push(link.href);
        }

      }

      // Grab all MedBridge links and output them to the console for a quick helpful view.
      // console.groupCollapsed("All MedBridge Links Listed");
      //   console.log(medbridgeLinkUrlsList);
      // console.groupEnd();


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
      // console.log("ageCheck is set to: " + ageCheck);



      //////////////////////////////
      //////////////////////////////
      //  Validate Links
      //  Loop through each link and run a validation function on each.
      //////////////////////////////
      //////////////////////////////

      var i = 0
      for (let link of linkList) {

        var linkErrors = 0;


        validateLinks(link, i);

        i++

      }


      console.groupEnd();

      var totalLinksWithErrors = dFrameContents.querySelectorAll(".link-marker.error").length;
      console.log("Links with Errors", linksWithErrorsArr.length, "Total Link Errors", totalLinkErrors);


      if ( totalLinksWithErrors > 0 ) {
        applyQaResults(linksQaBar, "error", "<b>" + totalLinksWithErrors + "</b> Links with Errors");
      } else {
        applyQaResults(linksQaBar, "success", "All Links Approved");
      }

      // Otherwise, wait for the desktop iframe to finish loading.
      // Once it's done, run a function that will position our link markers.
      // I can only use .onload once per document. So instead we use an eventlistner.
      // After we're done, we need to remove the eventlistner.
      // Resource: https://stackoverflow.com/a/27032611/556079

      desktopIframe.addEventListener("load", function positionLinkMarkers(e) {

        var i = 0
        for (let link of linkList) {

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
          linkMarker.classList.add("positioned");

          i++

        }

        // We're done, remove the eventlistener.
        desktopIframe.removeEventListener("load", positionLinkMarkers, false);

        // We defaulted the link markers wrapper to hidden using CSS. Reverse that now that their positions are ready.
        linkMarkerWrapper.style = "display:block";

        // Start watching the iframe's height and width.
        ro.observe(desktopIframe);


      }, false);

// We've successfully run through every link. Log our results.
console.log("linkInfoArray", linkInfoArray);
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

// This function gets run after desktopIframe is finished loading.
// The primary means of determining visibility is offsetTop and offsetLeft.
// If we check these before the page is loaded they can often return a value of 0.

function verifyLinkVisibility(linkList) {

  // Modify this to use the dummyIframe for both desktop and mobile so that we can avoid errors.

  var i = 0
  for (let link of linkList) {

    linkInfoArray[i]['position'] = { "offsetTop": link.offsetTop, "offsetLeft": link.offsetLeft }

    // Link Visibility (Desktop / Mobile)
    if ( (link.style.visibility === 'hidden' || link.style.display === 'none') || (link.offsetTop === 0 && link.offsetLeft === 0) ) {
      linkInfoArray[i]['desktop'] = false;
    } else {
      linkInfoArray[i]['desktop'] = true;
    }

    i++

  }

  // Destroy the dummy iframe when we're done.

}


///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
/////
/////
/////    Check if a Link Works using AJAX
/////
/////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////

//// Check if links work or not by doing an XMLHttpRequest and getting the headers.
//// Normally same-origin policy would prevent us from doing this. Luckily extensions are exempt from this/

//// https://developer.chrome.com/extensions/xhr
//// https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/getAllResponseHeaders
//// http://www.jibbering.com/2002/4/httprequest.html

function checkLinkStatus(i, url, linkObject) {

  if ( !navigator.onLine ) {

    // if ( status is in cache ) {
      // linkInfoArray[i]['status'] = { "Key": from.cache, "StatusCode": from.cache, "StatusText": from.cache, "Cached": from.cache }
    // } else {
      linkInfoArray[i]['status'] = { "Key": "Offline" }
    // }

  } else if ( url.match(/^(mailto:|file:\/\/\/)/) ) {

    console.log("local file link or mailto");

  } else {

    // The mailchimp merge tag *|...|* doesn't play well with Twitter during our ajax request. We need to escape the pipes | in order to get a working URL.
    // These tags automatically change in MailChimp so it's no problem there. Just right now when we are testing the URL.
    // This may also be a problem with SendGrid, GetResponse, etc. Look into that.
    if ( url.match(/\*\|.+?\|\*/) ) {
      url = url.replace(/\|/g,"%7C");
    }

    var linkstatus = new XMLHttpRequest();
    linkstatus.open("GET", url, true);

    // Typically because the domain does not exist at all (net::ERR_NAME_NOT_RESOLVED)
    linkstatus.onerror = function () {
      linkInfoArray[i]['status'] = { "Key": "Error", "StatusCode": "N/A", "StatusText": "net::ERR_NAME_NOT_RESOLVED", "Cached": false }
      createLinkErrorRow(linkObject, "Link Status: net::ERR_NAME_NOT_RESOLVED", "error");
    };

    linkstatus.send();

    linkstatus.onreadystatechange = function() {

      if(this.readyState == this.HEADERS_RECEIVED) {

        //
        // RAW STRING OF HEADERS
        //
        var headers = linkstatus.getAllResponseHeaders();

        //
        // ARRAY OF HEADERS
        // Unused.. decide if I need it.
        // var arr = headers.trim().split(/[\r\n]+/);

        linkInfoArray[i]['status'] = { "Key": "OK", "StatusCode": linkstatus.status, "StatusText": linkstatus.statusText, "Cached": false }

        // Convert status code from integer to string so we can match against it with regex.
        var statusNum = linkstatus.status.toString();

        // Error Codes
        if ( statusNum.match(/^(4|5)\d\d/g) ) {
          linkInfoArray[i]['status'] = { "Key": "Error", "StatusCode": linkstatus.status, "StatusText": linkstatus.statusText, "Cached": false }
          createLinkErrorRow(linkObject, "Link Status: " + linkstatus.status + " " + linkstatus.statusText, "error");

        // Warning Codes
        } else if (statusNum.match(/^(999|(1|3)\d\d)/g) ) {
          linkInfoArray[i]['status'] = { "Key": "Warning", "StatusCode": linkstatus.status, "StatusText": linkstatus.statusText, "Cached": false }
          createLinkErrorRow(linkObject, "Link Status: " + linkstatus.status + " " + linkstatus.statusText, "warning");
        }

      }
    }

  }

}


///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
/////
/////
/////    Create image info array
/////
/////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////

function createImgInfoArray(imgList) {

  for (let img of imgList) {

    var singleImgInfoArray = {};

    singleImgInfoArray['object'] = img; //link object
    singleImgInfoArray['url'] = img.src; //link url

    imgInfoArray.push(singleImgInfoArray);
  }

  console.log("imgInfoArray", imgInfoArray);

}


///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
/////
/////
/////    Get img size
/////
/////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////

function getImgSizes(imgList) {

  var i = 0

  for (let img of imgList) {

    img.onload = e => {
      fetch(img.src).then(resp => resp.blob())
      .then(blob => {
        imgInfoArray[i]['size'] = { "size": blob.size, "prettysize": prettyFileSize(blob.size) + " Kb" }
        imgInfoArray[i]['type'] = blob.type;
        i++
      });
    };

  }

}


///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
/////
/////
/////    Get Pretty Filesize
/////
/////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////

function prettyFileSize(int) {
  return Math.round( ( int / 1024 ) * 10 ) / 10;
}

///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
/////
/////
/////    Load iFrame
/////
/////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////

function loadIframe(iframe, html, base) {

  iframe.contentWindow.document.open();
  iframe.contentWindow.document.write(html);
  iframe.contentWindow.document.close();

  // Add <base>
  // Forces all links within the iFrame to open in their own separate tabs.
  // <base target="_blank" />

  if ( base === "base" ) {
    var linkTarget = document.createElement("base");
    linkTarget.target = "_blank";
    iframe.contentDocument.head.append(linkTarget);
  }

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

function mostCommonString(searchTerm, linkList) {

  if ( !/utm_/.test(searchTerm) ) {
    var searchTerm = new RegExp(/\.com\/.+?\?/i);
  } else {
    var searchTerm = new RegExp(escapeRegExp(searchTerm) + ".+?(&|$)","i");
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




///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
/////
/////
/////    Check if object already exists in array
/////
/////     https://stackoverflow.com/a/4587130/556079
/////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////


function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i] === obj) {
            return true;
        }
    }

    return false;
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



// Function to handle creating error markers, error tags (that explain the error), and incrementing the error counter.
function createLinkErrorRow(link, msg, type, icon) {

  // Set the 'type' to error if one wasn't passed.
  if ( !type ) {
    type = "error"
  }

  link.dataset.error = true;

  // console.log(link);
  // console.log("[" + link.dataset.number + "] " + link);

  // console.error("Error Found: " + msg);

  // Target the link marker in dFrame based on which link we're looking at right now
  var linkMarker = dFrameContents.querySelector("#link-markers .link-marker[data-number='" + link.dataset.number + "']")

  // Create an error bubble
  var errorRow = document.createElement("section");
  var errorRowText = document.createElement("section");
      errorRowText.innerHTML = msg
  errorRow.appendChild(errorRowText);


  allErrorMsgsForCurrentLink.push({type: msg});


  // Instead of just assuming linkErrorLogNoticeWrapper is the right wrapper, we'll reset it to a variable by checking for this link data number. This is better because any errors that come in asynchronously can now be applied properly.
  var currentErrorWrapper = dFrameContents.querySelector("section.link-errors[data-number='" + link.dataset.number + "'] .link-errors-wrapper");
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

  //////
  //////
  // if ( !containsObject(link, linksWithErrorsArr) ) {
  //   linksWithErrorsArr.push(link);
  // } else {
  //   linksWithErrorsArr.push("nope");
  // }
  if ( linksWithErrorsArr.includes(link) ) { // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
    // linksWithErrorsArr.push("this link is already in the linksWithErrorsArr array"); // get ride of this eventually
  } else {
    linksWithErrorsArr.push(link);
  }


}



///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
/////
/////
/////    Update preflight error total
/////
/////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////



function preflightError() {

  var currentValue = parseInt(preflightTotal.innerHTML);

  currentValue++;

  preflightStatus.classList.add("error");
  preflightTotal.innerHTML = currentValue;
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


function validateLinks(link, i) {

  // Holds all of the data for a single link.
  var singleLinkInfoArray = {};

  singleLinkInfoArray['object'] = link; //link object
  singleLinkInfoArray['url'] = link.href; //link url
  singleLinkInfoArray['querystring'] = breakdownQuerystring(link.href); //querystring

  // singleLinkInfoArray.push(link); //object
  // singleLinkInfoArray.push({url: link.href}); //href
  // singleLinkInfoArray.push(breakdownQuerystring(link.href)); // querystring

  // Hold all of the error messages for each link. Will be added to the array above for use in the Link Browser.
  allErrorMsgsForCurrentLink = [];

  // Set link to a variable and clean it if it's local.
  var linkHref = link.href;
  if ( /^(file\:|(https?\:\/\/)?localhost)/gi.test(linkHref) ) {
    linkHref = linkHref.replace(/^.+\//gi, "");
  }

  // Making our counter for console.log 2 digits instead of 1. (1 vs 01)
  if ( i < 10 ) {
    var iLog = "0" + i;
  } else { iLog = i; }

  console.groupCollapsed("[" + iLog + "] " + linkHref.substring(0,60) + "...");
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
    if ( /^https?\:\/\/[a-zA-Z0-9\-]+?\.medbridge(ed|education)\.com(\/|$)/gi.test(linkHref) ) {
      medbridgeEdLink = true;
    } else {
      medbridgeEdLink = false;
    }

    var massageLink
    if ( /\.medbridgemassage\.com/gi.test(linkHref) ) {
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
    if ( /utm_content/gi.test(linkHref) && !medbridgeEdLink ) {
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
    if ( !outsideOrg && medbridgeEdLink && !/\/(support\.|www\.|medbridgeed(ucation)?\.com)/gi.test(linkHref) ) {
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
    if ( emailDisc !== "multi" && emailDisc !== "all" && emailDisc !== null && !outsideOrg && medbridgeOrMassageLink ) { //&& isMarketingUrl

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

  // End of link validation.
  // console.error(i, link);

  singleLinkInfoArray['errors'] = allErrorMsgsForCurrentLink;
  linkInfoArray.push(singleLinkInfoArray);

  // Now that we've created an object fo rthis link and added it to the array
  // Check the links status (async) and add the results to the array.
  checkLinkStatus(i, link.href, link);
}
