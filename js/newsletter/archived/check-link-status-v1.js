////////
////////
////////


// This version of the link checker was written by me mostly from scratch.
// I later found the "Check My Links" Chrome extension and github repo.
// I lifted their code and made some modifications.
// This version below is retired.


///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
/////
/////
/////    Check if a Link works using AJAX to get the headers
/////
/////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////

//// Check if links work or not by doing an XMLHttpRequest and getting the headers.
//// Normally same-origin policy would prevent us from doing this. Luckily extensions are exempt from this.

//// https://developer.chrome.com/extensions/xhr
//// https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/getAllResponseHeaders
//// http://www.jibbering.com/2002/4/httprequest.html

function checkLinkStatus(i, linkHref, linkObject) {

  // Check if its in the cache first.
  // if ( status is in cache ) {
    // linkInfoArray[i]['status'] = { "Key": from.cache, "StatusCode": from.cache, "StatusText": from.cache, "FromCache": true }
    // linkInfoArray[i]['requesttype'] = "cached";

  // else if
  if ( !navigator.onLine ) {

    linkInfoArray[i]['status'] = { "Key": "Offline" }
    linkInfoArray[i]['requesttype'] = false;

  // Do not check these URL's.
  } else if ( !linkHref.match(/^(mailto:|file:\/\/\/)/) ) {

    linkInfoArray[i]['requesttype'] = "fresh";

    // Begin AJAX request
    var linkstatus = new XMLHttpRequest();
    linkstatus.open("GET", linkHref, true);

    // This error will fire typically because the domain does not exist at all (net::ERR_NAME_NOT_RESOLVED)
    linkstatus.onerror = function () {
      // DO NOT CACHE AN ERROR RESULT
      console.log(linkstatus.status, linkstatus.statusText)
      linkInfoArray[i]['status'] = { "Key": "Error", "StatusCode": "N/A", "StatusText": "net::ERR_NAME_NOT_RESOLVED", "FromCache": false }
      createLinkErrorRow(linkObject, "Link Status: net::ERR_NAME_NOT_RESOLVED", "error");
    };

    linkstatus.send();

    linkstatus.onreadystatechange = function() {

      if ( this.readyState == this.HEADERS_RECEIVED ) {

        //
        // RAW STRING OF HEADERS
        //
        var headers = linkstatus.getAllResponseHeaders();

        //
        // ARRAY OF HEADERS
        // Unused.. decide if I need it.
        // var arr = headers.trim().split(/[\r\n]+/);

        // Convert status code from integer to string so we can match against it with regex.
        var statusNum = linkstatus.status.toString();

        // Error Codes
        if ( statusNum.match(/^(4|5)\d\d/g) ) {
          // DO "NOT" CACHE ERRORS
          linkInfoArray[i]['status'] = { "Key": "Error", "StatusCode": linkstatus.status, "StatusText": linkstatus.statusText, "FromCache": false }
          createLinkErrorRow(linkObject, "Link Status: " + linkstatus.status + " " + linkstatus.statusText, "error");

        // Warning Codes
        } else if (statusNum.match(/^(999|(1|3)\d\d)/g) ) {
          // DO "NOT" CACHE WARNINGS
          linkInfoArray[i]['status'] = { "Key": "Warning", "StatusCode": linkstatus.status, "StatusText": linkstatus.statusText, "FromCache": false }
          createLinkErrorRow(linkObject, "Link Status: " + linkstatus.status + " " + linkstatus.statusText, "warning");
        }

        // Success Codes
        else {
          // "DO" CACHE SUCCESSFUL ATTEMPTS
          linkInfoArray[i]['status'] = { "Key": "OK", "StatusCode": linkstatus.status, "StatusText": linkstatus.statusText, "FromCache": false }
        }

      }
    }

  }

}
