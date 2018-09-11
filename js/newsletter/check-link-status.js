//
// Inspiration
// https://github.com/ocodia/Check-My-Links
// https://github.com/ocodia/Check-My-Links/issues

/////////
//
// TO-DO
//
/////////
//
//  - IMPORTANT: I can use the xhr.responseURL value to see if after_afiliate_url links are redirecting to the right page or not!
//
//  - Implement rate limiting. - https://github.com/ocodia/Check-My-Links/issues/57
//
//  - Figure out how to prevent client blocking errors, is another extension doing it??
//     - Yes! Some of my extensions were causing errors.
//
//  - Add custom timeout values via options - https://github.com/ocodia/Check-My-Links/issues/33
//
//  - Add option for blacklisting links - e.g. skip certain links when looping
//
//  - Parse DOM after hashtag (<a href="page2.html#elementID">Link</a>) to see if it exists
//
//  - check for Anchor tag without href (<a>No href</a>)
//
//  - [DONE!] Add Valid Link Caching
//    - provide manual clear cache button
//    - try to get them to clear every X hours
//
//  - [DONE!] Skip non-unique URLs so that we aren't hitting the same link more than once per check. See: https://github.com/ocodia/Check-My-Links/issues/30
//
//
/////////


/////////////////
/////////////////
/////////////////
function onRequest(i, linkHref, linkObj) {

      var promise;
      var response = {source:null,status:null,statusText:null,responseURL:null,document:null,isRedirect:null,redirectOK:null};

      // if we need to check the DOM, checkurl :checkurl = true/false
      // - we dont need to check the DOM.
      // if caching is off checkURL :checkurl = true/false
      // - caching is on
      // if caching is on getlink from database :checkurl = true/false


      // We're online
      // If the DOM needs to be parsed, or if we aren't caching links, then we need to XHR right now.
      if ( XHRisNecessary(options) === true ) {

        //TODO we need to check if we're offline...

          checkURL(i, linkHref, linkObj)

          .then(function(response) {

            // Is it safe to cache these results in chrome.storage?
            // console.log("1");
            processLinkStatusResponse(i, linkHref, linkObj, response);

            return new Promise(function(resolve, reject){resolve(response);});

          });
          // .then(function(response){
          //     callback(response);
          // });
      }

      // Caching is true or the DOM doesn't need to be parsed
      else {

        checkCacheElseXHR(i, linkHref, linkObj, response);

      return false;

  }
}

////////////////
////////////////
////////////////
function checkCacheElseXHR(i, linkHref, linkObj, response) {

      linkStorage.getLink(linkHref).then(function(link) {

        // console.log(1, "begin");
        // console.log(2, i);
        // console.log(3, Object.getOwnPropertyNames(link));
        // console.log(4, Object.getOwnPropertyNames(link).length);
        // console.log(5, response);
        // console.log(6, linkObj);
        // console.log(7, linkHref);
        // console.log(8, link);
        // console.log(9, link[linkHref]);
        // console.log(10, link[linkHref]['status']);
        // console.log("end");

        // Is it already in chrome.storage?
        // If yes...
        if ( Object.getOwnPropertyNames(link).length > 0 ) {
          if ( (200 <= link[linkHref]['status'] && link[linkHref]['status'] < 400) ) {
            response.source      = "cache";
            response.status      = link[linkHref]['status'];
            response.statusText  = link[linkHref]['statusText'];
            response.responseURL = link[linkHref]['responseURL'];
            response.isRedirect  = link[linkHref]['isRedirect'];
            response.timestamp   = link[linkHref]['timestamp'];
          }
        }
        // // Not in cache (yet). If this is a duplicate link it might show up in the cache soon.
        // // In that case, return false to end the check on this link.
        // // The matching link that IS being XHR'd will eventually finish and then use its results to apply to this link
        // else if ( linkInfoArray[i]['firstInstance'] === false ) {
        //   response = false;
        // }
        // Nope, definitely not in the cache and it isn't currently being XHR'd.
        else {

          // Let's check if we're offline..
          if ( !navigator.onLine ) {
            response.source      = "offline";
            response.status      = "0";
            response.statusText  = "Offline";
            response.responseURL = "unavailable";
            response.isRedirect  = null;
            response.redirectOK  = null;
          }
          // Else, we're online. Let's check the URL using xhr.
          else {
            response = checkURL(i, linkHref, linkObj);
          }

        }
        return new Promise(function(resolve, reject) { resolve(response); } );
    })

    // We've got our response, whether from XHR or from cache. Let's process it.
    .then(function(response) {

      // If our response is false then we're done.
      // If our response is not false...
      // if ( response !== false ) {

        // then we process the response we got from cache or XHR
        processLinkStatusResponse(i, linkHref, linkObj, response, options);

        // Now that the response has been processed, was this link the first of other identical links?
        if ( linkInfoArray[i]['firstInstance'] === true ) {
          // if so, process these results again for all other matching links in the DOM
          applyXHRResultsToDupeLinks(linkHref, response, options);
        } else {
          console.error("!!!! ERROR !!!! not the first instance of this link"); // technically this should never fire because the !== false above should stop it
        }

      // }

      return new Promise(function(resolve, reject){resolve(response);});

    });

}


/////////////////
/////////////////
/////////////////
function applyXHRResultsToDupeLinks(linkHref, response, options) {

  // console.log("running applyXHRResultsToDupeLinks on links that match", linkHref);

  // Start a new loop through all links in the DOM
  var i = 0
  for (let linkObj of linkList) {

    if ( linkInfoArray[i]['url'] === linkHref && linkInfoArray[i]['firstInstance'] === false ) {

      processLinkStatusResponse(i, linkHref, linkObj, response, options);

    }

    i++

  }

}

function linkMarkerDone(linkMarker, source) {

  linkMarker.classList.remove("loading");
  linkMarker.classList.add("done", source);

  // If no errors were found, set the linkmarker to approved, turn it green, and give it a checkmark.
  if ( linkMarker.children[0].innerHTML === "" && !linkMarker.classList.contains("offline") ) {
    linkMarkerApproved(linkMarker);

    // Show the checkmark and then fade it away if the response is fresh and NOT from the cache.
    if ( !linkMarker.classList.contains("cache") && !linkMarker.classList.contains("has-message") ) {
      linkMarkerCheckedOff(linkMarker);
      linkMarker.classList.add("animated-approval");
    }

  } else if ( linkMarker.innerHTML === "" && linkMarker.classList.contains("offline") ) {
    linkMarker.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><rect x="9.5" y="5.7" fill="#ffffff" width="4.9" height="12.8"/><path fill="#f1a511" d="M23 12l-2.4-2.8 0.3-3.7 -3.6-0.8 -1.9-3.2L12 3 8.6 1.5 6.7 4.7 3.1 5.5l0.3 3.7L1 12l2.4 2.8 -0.3 3.7 3.6 0.8 1.9 3.2L12 21l3.4 1.5 1.9-3.2 3.6-0.8 -0.3-3.7L23 12zM13 17h-2v-2h2V17zM13 13h-2V7h2V13z"/></svg>';
  }
}

function linkMarkerApproved(linkMarker) {
  linkMarker.classList.add("approved");
  linkMarker.children[1].innerHTML = '<svg class="icon-check" xmlns="http://www.w3.org/2000/svg" width="12" height="9" viewBox="0 0 12 9.4"><path fill="#FFFFFF" d="M12 1.9L4.5 9.4 0 4.9 1.9 3l2.6 2.6L10.1 0 12 1.9z"/></svg>';
}

function resetLinkMarker(linkMarker) {
  // console.log(linkMarker);
  linkMarker.classList.add("loading");
  linkMarker.classList.remove("approved");
  linkMarker.classList.remove("done");
  linkMarker.classList.remove("xhr");
  linkMarker.classList.remove("cache");
  linkMarker.children[1].innerHTML = "";
}

////////////////
////////////////
////////////////
function manualXHRLinkCheck() {

  // Kill the cache of all links that are in the DOM
  chrome.storage.promise.local.remove(linkListUniqueURLs).then(function() {
    // resolved
    console.log('removed');

    // Loop through all links and XHR them
    var i = 0
    for (let linkObj of linkList) {

      resetLinkMarker(linkMarkersList[i]);

      // Only check the link if checkStatus is true
      if ( linkInfoArray[i]['checkStatus'] === true ) {
        // Skip links that are duplicates. When the original link is done being XHR'd we'll apply the results to all matching links.
        if ( linkInfoArray[i]['firstInstance'] === true ) {
          onRequest(i, linkInfoArray[i]['url'], linkObj);
        }
      // checkStatus is False, so we're done. Turn off the loading icon.
      } else {
        linkMarkerDone(linkMarkersList[i]);
      }

      i++

    }
  }, function(error) {
    // rejected
    console.log(error);
  });

}



////////////////
////////////////
////////////////
function processLinkStatusResponse(i, linkHref, linkObj, response, options) {

  // Results
  // console.log("response [" + response.source + "]:", i, response);

  // Make sure we didn't deny caching due to MedBridge redirect errors or protected blog articles
  // If the source is a fresh XHR (and not cache), and the response status code is >= 200 and less than 400...
  if ( (response.source == "xhr") && (200 <= response.status && response.status < 400) ) {

    // Check if a MedBridge redirect isn't working correctly.
    // Or if MedBridge links land on the homepage because the page does not exist.
    checkResponseURL(i, linkObj, response);

    if ( response.redirectOK === false ) {

      response.statusText = "Redirect Failed";

    } else if ( response.statusText === "" || response.statusText === "OK" ) {

      response.statusText = "OK";
      // This link has an OK status and it was a fresh XHR (not from cache), so let's check if it's a protected article.
      // Read the response.document to find out if an article is protected. We don't cache protected articles.
      checkIfArticleProtected(i, linkObj, response);

    } else if ( response.statusText === "Not Found" ) {

      response.addToCache = false;
      response.status = 404;

    }

    // Make sure there are no overrides in place to prevent caching. Either on all links or this specific link.
    // If not, then add it to chrome.storage
    if ( options.cache == 'true' && response.addToCache !== false ) {
      linkStorage.addLink(linkHref, response);
    }

  }

  // Assign XHR status to this link's link row in the dFrame
  createLinkStatusRow(i, linkObj, response);

  // Use the response to assign error rows if needed
  assignErrorRows(i, linkHref, linkObj, response);

  // LinkMarker Styling:
  // XHR/Cache checking is done, remove the loading spinner and add classes 'done' and the source (cache or fresh);
  linkMarkerDone(linkMarkersList[i], response.source);

}



////////
// Used to animate and hide checkmarks when links are approved on a fresh XHR
////////
function linkMarkerCheckedOff(linkMarker) {
  setTimeout(function(){
    linkMarker.classList.remove("animated-approval");
  }, 10000);
}

////////
// Read the response.document to find out if an article is protected. We don't cache protected articles.
////////
function checkIfArticleProtected(i, linkObj, response) {
  // console.error(i, "checkIfArticleProtected()");

  // Check Article Protected Status
  if ( linkInfoArray[i]['isArticle'] ) {
    // console.error(i, "isArticle = true");

    // Save the article's status to chrome.storage for use elsewhere.
    logArticleStatusInStorge(response.document);

    if ( isArticleProtected(response.document) ) {
      linkInfoArray[i]['articleProtected'] = true;
      response.articleProtected = true;
      response.addToCache = false;
      createLinkErrorRow(linkObj, "Article is protected.", "error", null, "lock");
    } else {
      linkInfoArray[i]['articleProtected'] = false;
      response.articleProtected = false;
    }
  } else {
    // console.error(i, "isArticle = false");
  }

}

////////
// Check if a MedBridge redirect isn't working correctly. We don't cache links with broken redirects.
////////
function createLinkStatusRow(i, linkObj, response) {

  var currentErrorWrapper = dFrameContents.querySelector("section.link-errors[data-number='" + i + "'] .link-info-container");

  if ( response.redirectOK === false ) {
    currentErrorWrapper.classList.add("error");
  } else if ( response.statusText === "OK" ) {
    currentErrorWrapper.classList.add("ok");
  } else if ( response.statusText === "Offline" ) {
    currentErrorWrapper.classList.add("offline");
  } else if ( response.statusText === "Error" || response.statusText === "Not Found" || response.statusText === "Bad Request" ) {
    currentErrorWrapper.classList.add("error");
  } else {
    console.error("missed");
  }

  // If the source is the cache
  if ( response.source == "cache" ) {
    var source = "Cached";

    // Determine time since check/cache
    var cacheTimeString = moment().diff(moment(response.timestamp), 'days');

    if ( cacheTimeString <= 0 ) {
      cacheTimeString = " today"
    } else if ( cacheTimeString === 1 ) {
      cacheTimeString = cacheTimeString + " day ago"
    } else {
      cacheTimeString = cacheTimeString + " days ago"
    }

    var sourceTime = "<span id='last-checked'>" + cacheTimeString + "</span>";

  } else if ( response.source == "offline" ) {
    var source = "Status";
    var sourceTime = " not checked"
  } else {
    var source = "Checked";
    var sourceTime = " just now"
  }

  var statusCode = "";
  if ( response.status !== 0 && response.status !== "0" && response.status !== null ) {
    var statusCode = "<sup>(<span id='status-code'>" + response.status + "</span>)</sup>";
  }

  // Destroy the status container if it already exists.
  destroyIfExists(currentErrorWrapper.querySelectorAll(".link-status-wrapper")[0]);

  // Wrapper for the XHR'd Link Status
  var linkErrorXHRStatus = document.createElement("section");
  linkErrorXHRStatus.className = "link-status-wrapper link-info-wrapper";
  linkErrorXHRStatus.innerHTML = "<section class='status-bubble'><section class='status-code'><span id='status-text'><b>" + response.statusText + "</b></span> " + statusCode + "</section><section class='status-age'><b id='cache-status'>" + source + "</b> " + sourceTime + "</div></section>";

  currentErrorWrapper.appendChild(linkErrorXHRStatus);

}

////////
// Is this the MedBridge Education homepage?
////////
function isMedBridgeHomepage(document) {
  if ( /discipline-page__hero--home/i.test(document) ) {
    return true;
  }
  return false;
}

////////
// Check the response for additional errors.
// Specifically, if the landing page is the MedBridge homepage and we did not intend for our link to go there.
// This means a tracking link does not work, or that the page does not exist.
////////
function checkResponseURL(i, linkObj, response) {

    // TODO!!!!
    // https://www.medbridgeeducation.com/sign-in/?after_signin_url=patient-engagement-for-speech-language-pathology?utm_content=header
    // This resolved as OK even though its not. The failed redirect check should have caught this. Might have something to do with using after_signin_url.
    // Check this.

  // Is this the homepage?
  ////////////////////////
  if ( /Online CEUs for PT, OT, SLP, AT \| Continuing Education \| MedBridge/i.test(response.document) && /Choose your discipline to view courses\:/i.test(response.document) ) {
    response.isHomepage = true;
  } else {
    response.isHomepage = false;
  }

  // NON-TRACKING LINKS
  /////////////////////
  // If the pathname of the original non-tracking link is "/", then we intended to hit the homepage.
  // If its not, and we actually DID land on the homepage (by checking the code in the response), throw an error.
  // This means the page is broken/non-existant on MedBridge.
  if ( linkInfoArray[i]['isMedBridgeBrandLink'] && !linkInfoArray[i]['hasTrackingLinkback'] && linkObj.pathname !== "/" && response.isHomepage ) {

    createLinkErrorRow(linkObj, "MedBridge URL does not exist.");

  }

  // TRACKING LINKS
  /////////////////
  if ( linkInfoArray[i]['isMedBridgeBrandLink'] && linkInfoArray[i]['hasTrackingLinkback'] ) {

    // Check succesful redirection of tracking links on MedBridge
    // Non-existant MedBridge pages just land on the homepage with the tracking URL intact.
    // They will resolve as 200 but this isn't accurate for our purposes.
    // So we also need to prevent it from being cached.
    if ( /after_affiliate_url/i.test(response.responseURL) ) {

      // console.error(i, "first if", linkInfoArray[i]['querystring']['after_affiliate_url'], linkObj.pathname, response.responseURL);

      createLinkErrorRow(linkObj, "MedBridge tracking link not redirecting.");
      response.addToCache = false;
      response.redirectOK = false;

    // Check if we were redirected to the homepage because the redirect URL doesn't exist.
    // When a MedBridge URL doesn't exist, you are redirected to the MedBridge homepage.
    // Sometimes the incorrect URL will still be at the end (.com/bad-url-here)
    // And sometimes it won't.

    // To check for this look at the response.document to verify that the link redirected to the homepage.
    // Then look at the original link and determine that we are NOT explicitly linking to the homepage.
    // Do this by looking at the querystring for tracking links, and at the object.pathname for non tracking links.
    // If they do not both match a value of / or blank then we are intending to NOT go to the homepage, thus the link is invalid and we throw an error.

    }

    else if ( isMedBridgeHomepage(response.document) && ( !/^(\/|)$/.test(linkInfoArray[i]['querystring']['after_affiliate_url']) && !/^(\/|)$/.test(linkObj.pathname) ) ) {

      createLinkErrorRow(linkObj, "MedBridge URL does not exist.");
      response.addToCache = false;
      response.redirectOK = true;

    } else {

      response.redirectOK = true;

    }
  }

}


////////
//
////////

// Timeout for each link is 30+1 seconds
var linkCheckTimeout = 30000;

function checkURL(i, linkHref, linkObj) {

  totalXHRs++;

  var response = {source:null,status:null,statusText:null,responseURL:null,document:null,isRedirect:null,redirectOK:true,articleProtected:null};

  return new Promise(function (resolve, reject) {

    var XMLHttpTimeout = null;
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function (data) {
      if (xhr.readyState == 4) {

        clearTimeout(XMLHttpTimeout);

        if (200 <= xhr.status && xhr.status < 400){
          response.document = xhr.responseText;
        }

        // Set Source
        response.source = "xhr";

        // Set Status
        response.status = xhr.status

        if ( xhr.status !== 0 ) {

          response.statusText = xhr.statusText;
          response.responseURL = xhr.responseURL;

          // Redirects eventually return 200, here we compare the response URL with the requested to detect redirects
          if ( xhr.responseURL == linkHref.split('#')[0] ) {
            response.isRedirect = false;
          }
          // This link was redirected.
          else {
            response.status = 300;
            response.isRedirect = true;
          }
        // Else, the status came back as 0. Which means we couldn't connect at all. Likely because the URL is mistyped.
        // This is different from not being able to connect because we have no internet.
        } else {
          response.statusText = "Error"
        }

        resolve(response);

      }
    }

    try {
      // xhr.open(getOption("checkType"), url, true);
      xhr.open("GET", linkHref, true);
      xhr.send();
    }
    catch(e){
      console.error("e", e);
      console.error("response", response);
      response.status = 0;
      resolve(response);
      console.error("e", e);
      console.error("response", response);
    }

    XMLHttpTimeout = setTimeout(function (){response.status = 408;resolve(response); xhr.abort();}, linkCheckTimeout += 1000);

  });

}


////////
// Based on the status code we get from XHR or from cache.
////////
function assignErrorRows(i, linkHref, linkObj, response) {
  // Assign an error badge
  // Error Codes: https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
  //////////

  var statusCodeString = response.status.toString();

  // console.error(i, linkObj, linkHref);
  // console.error(response.status, , response.status);

  // Link is just busted, it doesn't exist
  if ( response.status === 0 ) {
    keyValue = "Error";
    createLinkErrorRow(linkObj, "Link Status: Invalid URL - Server IP address could not be found.", "error");

  // Error Codes
  // 4xx Client errors
  // 5xx Server errors
  } else if ( statusCodeString.match(/^(4|5)\d\d/g) ) {
    keyValue = "Error";
    createLinkErrorRow(linkObj, "Link Status: " + response.status + " " + response.statusText, "error");

  // Warning Codes
  // 1xx Informational responses
  // 3xx Redirection
  } else if ( response.status.toString().match(/^(999|(1|3)\d\d)/g) && !/300/.test(response.status.toString()) ) {
    keyValue = "Warning";
    createLinkErrorRow(linkObj, "Link Status: " + response.status + " " + response.statusText, "warning");

  // Redirect Failed
  } else if ( response.redirectOK === false ) {
    keyValue = "Redirect Failed";

  // Success
  } else {
    keyValue = "OK";
  }

  // Apply to link object data
  linkInfoArray[i]['status'] = { "key": keyValue, "statusCode": response.status, "statusText": response.statusText, "redirected": response.isRedirect, "source": response.source, "responseURL": response.responseURL, "isHomepage": response.isHomepage, "foo": "bar" }
}



////////
// Should DOM be parsed to check for #'s || OR || is caching set to off?
// If so, XHR is necessary.
////////
function XHRisNecessary(options, linkHref) {
  if ( shouldDOMbeParsed(linkHref, options.parseDOM) === true || options.cache == 'false' ) {
    return true;
  }
  return false;
}

////////
//
////////
function shouldDOMbeParsed(linkHref, parseDOMoption) {
  // If the setting parseDOMoption is true (option specifically for #'s'), and this link has a hash... return shouldDOMbeParsed as true
  if ( parseDOMoption === "true" && (linkHref.lastIndexOf("#") > linkHref.lastIndexOf("/") ) && (linkHref.lastIndexOf("#") < linkHref.length-1) ) {
    return true;
  }
  return false;
}
