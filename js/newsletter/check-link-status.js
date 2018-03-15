var logging = true;

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
//
//  - Add custom timeout values via options - https://github.com/ocodia/Check-My-Links/issues/33
//
//  - Skip non-unique URLs so that we aren't hitting the same link more than once per check. See: https://github.com/ocodia/Check-My-Links/issues/30
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
//
//
/////////

////////
//
////////
function getOption(key) {
    var value;
    var defaultOptions = {
        blacklist: "googleleads.g.doubleclick.net\n" +
                    "doubleclick.net\n" +
                    "googleadservices.com\n" +
                    "www.googleadservices.com\n" +
                    "googlesyndication.com\n" +
                    "adservices.google.com\n" +
                    "appliedsemantics.com",
        checkType: "GET",
        cache: "true",
        noFollow: "false",
        parseDOM: "false",
        trailingHash: "false",
        emptyLink: "false",
        noHrefAttr: "false",
        autoCheck: "false",
        optionsURL: chrome.extension.getURL("options.html")
    };

    // Get Option from LocalStorage
    value = getItem(key);

    // Default the value if it does not exist in LocalStorage and a default value is defined above
    if ( (value === null || value == "null") && (key in defaultOptions) ) {
        setItem(key, defaultOptions[key]);
        value = defaultOptions[key];
    }
    return value;
}

////////
//
////////
function getOptions() {
    var options = {};
    options.blacklist = getOption("blacklist");
    options.checkType = getOption("checkType");
    options.cache = getOption("cache");
    options.noFollow = getOption("noFollow");
    options.parseDOM = getOption("parseDOM");
    options.trailingHash = getOption("trailingHash");
    options.emptyLink = getOption("emptyLink");
    options.noHrefAttr = getOption("noHrefAttr");
    options.autoCheck = getOption("autoCheck");
    options.optionsURL = getOption("optionsURL");
    return options;
}

////////
//
////////
function onRequest(i, linkHref, linkObj) {

      var options = getOptions();
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

        linkStorage.getLink( linkHref ).then(function(link) {

          // Is it already in chrome.storage?
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
          // Nope, could not find link in cache.
          else {

            // If we're offline..
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

        // Is it safe to cache these results in chrome.storage?
        // console.log("2");
        processLinkStatusResponse(i, linkHref, linkObj, response, options);

        return new Promise(function(resolve, reject){resolve(response);});

      });

      return false;

  }
}

////////
//
////////
function processLinkStatusResponse(i, linkHref, linkObj, response, options) {

  console.log(i, response);

  // Read the response.document to find out if an article is protected. We don't cache protected articles.
  checkIfArticleProtected(i, linkObj, response);

  // Check if a MedBridge redirect isn't working correctly. We don't cache links with broken redirects.
  checkRedirectErrors(i, linkObj, response);

  // Make sure we didn't deny caching due to MedBridge redirect errors or protected blog articles
  // If the source is a fresh XHR (and not cache), and the response status code is >= 200 and less than 400...
  if ( (response.source == "xhr") && (200 <= response.status && response.status < 400) ) {

    if ( response.redirectOK === false ) {
      response.statusText = "Redirect Failed";
    } else if ( response.statusText === "" ) {
      response.statusText = "OK";
    } else if ( response.statusText === "Not Found" ) {
      response.addToCache = false;
      response.status = 404;
    }

    // Make sure there are no overrides in place to prevent caching. Either on all links or this specific link.
    if ( options.cache == 'true' && response.addToCache !== false ) {
      linkStorage.addLink(linkHref, response);
    }

  }

  // Assign XHR status to this link's link row in the dFrame
  createLinkStatusRow(i, linkObj, response);

  // Use the response to assign error rows if needed
  assignErrorRows(i, linkHref, linkObj, response);

  // Get the corresponding linkmarker in the DOM.
  var linkMarker = dFrameContents.querySelector("#link-markers .link-marker[data-number='" + i + "']");

  // LinkMarker Styling:
  // XHR/Cache checking is done, remove the loading spinner and add classes 'done' and the source (cache or fresh);
  linkMarker.classList.remove("loading");
  linkMarker.classList.add("done", response.source);

  // If no errors were found, set the linkmarker to approved, turn it green, and give it a checkmark.
  if ( linkMarker.innerHTML === "" && !linkMarker.classList.contains("offline") ) {
    linkMarker.classList.add("approved");
    linkMarker.innerHTML = '<svg class="icon-check" xmlns="http://www.w3.org/2000/svg" width="12" height="9" viewBox="0 0 12 9.4"><path fill="#FFFFFF" d="M12 1.9L4.5 9.4 0 4.9 1.9 3l2.6 2.6L10.1 0 12 1.9z"/></svg>';

    // Show the checkmark and then fade it away if the response is fresh and NOT from the cache.
    if ( !linkMarker.classList.contains("cache") && !linkMarker.classList.contains("has-message") ) {
      linkMarkerCheckedOff(linkMarker);
      linkMarker.classList.add("animated-approval");
    }

  } else if ( linkMarker.innerHTML === "" && linkMarker.classList.contains("offline") ) {
    linkMarker.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><rect x="9.5" y="5.7" fill="#ffffff" width="4.9" height="12.8"/><path fill="#f1a511" d="M23 12l-2.4-2.8 0.3-3.7 -3.6-0.8 -1.9-3.2L12 3 8.6 1.5 6.7 4.7 3.1 5.5l0.3 3.7L1 12l2.4 2.8 -0.3 3.7 3.6 0.8 1.9 3.2L12 21l3.4 1.5 1.9-3.2 3.6-0.8 -0.3-3.7L23 12zM13 17h-2v-2h2V17zM13 13h-2V7h2V13z"/></svg>';
  }

}

////////
// Used to animate and hide checkboxes when links are approved on a fresh XHR
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
  // Check Article Protected Status
  if ( linkInfoArray[i]['isArticle'] ) {

    // Save the protected status to chrome.storage for use elswhere.
    determineArticleStatus(response.document);
    
    if ( isArticleProtected(response.document) ) {
    // if ( /title="Protected\: /.test(response.document) ) {
      linkInfoArray[i]['articleProtected'] = true;
      response.articleProtected = true;
      response.addToCache = false;
      createLinkErrorRow(linkObj, "Article is protected.");
    } else {
      linkInfoArray[i]['articleProtected'] = false;
      response.articleProtected = false;
    }
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

  // Wrapper for the XHR'd Link Status
  var linkErrorXHRStatus = document.createElement("section");
  linkErrorXHRStatus.className = "link-status-wrapper link-info-wrapper";
  linkErrorXHRStatus.innerHTML = "<div class='status-bubble'><div class='status-code'><span id='status-text'><b>" + response.statusText + "</b></span> " + statusCode + "</div><div class='status-age'><b id='cache-status'>" + source + "</b> " + sourceTime + "</div></div>";

  currentErrorWrapper.appendChild(linkErrorXHRStatus);

}

////////
// Check if a MedBridge redirect isn't working correctly. We don't cache links with broken redirects.
////////
function checkRedirectErrors(i, linkObj, response) {
  // Check succesful redirection of tracking links on MedBridge
  // Broken tracking links do not redirect, instead they just land on the homepage. So they will resolve as 200.
  // So we also need to prevent it from being cached.
  if ( linkInfoArray[i]['isMedBridgeBrandLink'] && linkInfoArray[i]['hasTrackingLinkback'] ) {
    if ( /after_affiliate_url/i.test(response.responseURL) ) {
      createLinkErrorRow(linkObj, "MedBridge tracking link not redirecting.");
      response.addToCache = false;
      response.redirectOK = false;
    } else if ( linkInfoArray[i]['isArticle'] && linkInfoArray[i]['isBlogLink'] && /(&|\?)p=/i.test(response.responseURL) ) {
      createLinkErrorRow(linkObj, "Blog redirect not working. Check post ID in URL.");
      response.addToCache = false;
      response.redirectOK = false;
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

  var response = {source:null,status:null,statusText:null,responseURL:null,document:null,isRedirect:null,redirectOK:null,articleProtected:null,cache:null};

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

          // Redirects eventually 200, comparing response URL with requested to detect redirects
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
  linkInfoArray[i]['status'] = { "key": keyValue, "statusCode": response.status, "statusText": response.statusText, "redirected": response.isRedirect, "source": response.source, "responseURL": response.responseURL }
}



////////
// Should DOM be parsed || OR || is caching set to off?
// If so, XHR is necessary.
////////
function XHRisNecessary(options, linkHref) {
  if ( shouldDOMbeParsed(linkHref, options.parseDOM, options.checkType) === true || options.cache == 'false' ) {
    return true;
  }
  return false;
}

////////
//
////////
function shouldDOMbeParsed(linkHref, parseDOMoption, checkTypeOption) {
  if ( parseDOMoption === "true" && checkTypeOption == "GET" ) {
    if ( (linkHref.lastIndexOf("#") > linkHref.lastIndexOf("/") ) && (linkHref.lastIndexOf("#") < linkHref.length-1) ) {
      return true;
    }
  }
  return false;
}

//////////////////////
//////////////////////

// OPTIONS: Management

//////////////////////
//////////////////////

////////
// OPTIONS: Set items in localstore
////////
function setItem(key, value) {
    try {
      log("Inside setItem:" + key + ":" + value);
      window.localStorage.removeItem(key);
      window.localStorage.setItem(key, value);
    }catch(e) {
      log("Error inside setItem");
      log(e);
    }
    log("Return from setItem" + key + ":" +  value);
}

////////
// OPTIONS: Get items from localstore
////////
function getItem(key) {
    var value;
    log('Get Item:' + key);
    try {
      value = window.localStorage.getItem(key);
      if(typeof value === 'undefined'){
        return null;
      }
    }catch(e) {
      log("Error inside getItem() for key:" + key);
      log(e);
      value = null;
    }

    log("Returning value: " + value);
    return value;
}

////////
// OPTIONS: Zap all items in localstore
////////
function clearStrg() {
    log('about to clear local storage');
    window.localStorage.clear();
    log('cleared');
}

////////
//
////////
function log(txt) {
  if (logging) {
    // console.log(txt);
  }
}
