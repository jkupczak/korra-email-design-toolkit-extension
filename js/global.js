console.warn("[sonic-toolkit-extension] loaded /js/global.js");
///////////////////////////////////////////////////////////////

////////////////////
////////////////////
/////
/////
/////   Helpful Sites
/////
/////
/////   1. Curated collection of useful Javascript snippets that you can understand in 30 seconds or less.
/////      - https://github.com/Chalarangelo/30-seconds-of-code
/////
/////
/////
/////
////////////////////
////////////////////






////
////// Global Functions
////

//
// Get Date MMM Month
//
function getMonthAbbr(date) {

  var monthNames = [
    "jan", "feb", "mar",
    "apr", "may", "jun", "jul",
    "aug", "sep", "oct",
    "nov", "dec"
  ];

  // If a date wasn't passed to this function, create one based on today's date.
  if (!date) {
    var date = new Date();
  }

  var monthIndex = date.getMonth();

  return monthNames[monthIndex];

}

// https://davidwalsh.name/javascript-debounce-function
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

//
// You'll pass the debounce function the function to execute and the fire rate limit in milliseconds.  Here's an example usage:
//
// var myEfficientFn = debounce(function() {
// 	// All the taxing stuff you do
// }, 250);
//
// window.addEventListener('resize', myEfficientFn);
//


//
// Select the contents of an element
// http://stackoverflow.com/a/6150060/556079
//
function selectElementContents(el) {

  if ( el.scrollTop !== 0 ) {
    el.scrollTop = 0;
  }

  var range = document.createRange();
  range.selectNodeContents(el);
  var sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
}


//
// Create a <textarea> and insert a passed string. For use with Tingle.js to quickly create copyable modals.
//
function createPlainTextContainer(string) {
  var plainTextContainer = document.createElement("textarea");
  plainTextContainer.className = "plain-text-modal";
  var plainTextString = document.createTextNode(string);
  plainTextContainer.appendChild(plainTextString);

  return plainTextContainer;
}

//
// Format Date
//
function formatDate(date) {

  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];
  var dayNames = [
    "Sunday", "Monday", "Tuesday",
    "Wednesday", "Thursday", "Friday", "Saturday"
  ];

  var dayIndex = date.getDay();
  var dayNumber = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  // console.log(date);
  // console.log(dayIndex);
  // console.log(dayNumber);
  // console.log(monthIndex);
  // console.log(year);

  return dayNames[dayIndex] + ', ' + monthNames[monthIndex] + ' ' + dayNumber + ', ' + year;
}

//
// Get Filename
//
function getFilename(url) {
  var filename = url.match(/.+?\.html?/gi);
      filename = filename[0].replace(/.+\//gi, "");

  return filename
}

//
// Process filename to find email date
// Filenames should use YY-MM-DD.
// YYYY can be used as well, but will be ignored. No harm!
//
function getEmailDate(filename) {

  var dateArray = filename.match(/\d\d-\d\d-\d\d/g);

  if ( dateArray ) {
  	dateArray = dateArray[0].split("-")

    var year = dateArray[0];
    var month = dateArray[1];
    var day = dateArray[2];

  }

  // Use forward slash /, not hyphen - http://stackoverflow.com/a/31732581/556079
  var emailDate = "20" + year + "/" + month + "/" + day;
  emailDate = new Date(emailDate);


  // if ( isNaN(emailDate) == false ) {
  //   console.error(emailDate);
  //   console.error("if");
  // } else {
  //     console.error(emailDate);
  //     console.error("else");
  //   }

  return emailDate

}

// https://plainjs.com/javascript/manipulation/wrap-an-html-structure-around-an-element-28/
function wrap(el, wrapper) {
  el.parentNode.insertBefore(wrapper, el);
  wrapper.appendChild(el);
}


//
// Wrap wrapper around nodes
// Just pass a collection of nodes, and a wrapper element
// http://stackoverflow.com/a/41391872/556079
//
function wrapAll(nodes, wrapper) {

    console.log(nodes);
    console.log(wrapper);

    // Cache the current parent and previous sibling of the first node.
    if ( nodes.constructor === Array ) {
      var parent = nodes[0].parentNode;
      var previousSibling = nodes[0].previousSibling;
    } else {
      var parent = nodes.parentNode;
      var previousSibling = nodes.previousSibling;
    }

    // Place each node in wrapper.
    //  - If nodes is an array, we must increment the index we grab from
    //    after each loop.
    //  - If nodes is a NodeList, each node is automatically removed from
    //    the NodeList when it is removed from its parent with appendChild.
    for (var i = 0; nodes.length - i; wrapper.firstChild === nodes[0] && i++) {
        wrapper.appendChild(nodes[i]);
    }

    // Place the wrapper just after the cached previousSibling
    parent.insertBefore(wrapper, previousSibling.nextSibling);

    return wrapper;
}


//
// Access window variable from Content Script
// http://stackoverflow.com/a/20513730/556079
//
function injectScript(file, node) {
  var th = document.getElementsByTagName(node)[0];
  var s = document.createElement('script');
  s.setAttribute('type', 'text/javascript');
  s.setAttribute('src', file);
  th.appendChild(s);
}


//
// Push a Browser Notification
//
function browserNotification(title, tag, icon, requireClick, timer) {
  console.warn("notification fired", title, tag, icon, requireClick, timer);

  if (Notification.permission !== "granted")
    Notification.requestPermission();
  else {

    var notification = new Notification(title, {
      tag: tag,
      icon: chrome.extension.getURL(icon),
      requireInteraction: requireClick,
    });

    // Automatically close after x seconds if a time was given.
    if ( timer ) {
      setTimeout(notification.close.bind(notification), timer);
    }

    notification.onclick = function () {
      notification.close();
    };

  }

}


//
// Get Email Title
//
function getEmailTitle(fileName, disciplineId) {

	var re = new RegExp("^.+?-" + disciplineId + "","gi");

  // console.error(fileName);

	var emailTitle = fileName.replace(re, "");

      emailTitle = emailTitle.replace(/\-(ns|sub)|-(a|b)\./gi, "");

      emailTitle = emailTitle.replace(/\.?html?/gi, "");

      emailTitle = emailTitle.replace(/\-/gi, " ");

  return emailTitle;

}



//
// Calculate Working days
//
function calcWorkingDays(fromDate, days) {
    var count = 0;
    while (count < days) {
        fromDate.setDate(fromDate.getDate() + 1);
        if (fromDate.getDay() != 0 && fromDate.getDay() != 6) // Skip weekends
            count++;
    }
    return fromDate;
}


//
// Is this a recent email?
//
function isRecentEmail(emailDate) {

  var todaysDate = new Date();
      lastWeek = new Date(todaysDate.setDate(todaysDate.getDate()-5));

  if ( emailDate > lastWeek ) {
    // console.error("emailDate (" + emailDate + ") is greater than yesterdaysDate (" + yesterdaysDate + ")");
    return true;
  } else {
    // console.error("yesterdaysDate (" + yesterdaysDate + ") is greater than emailDate (" + emailDate + ")");
    return false;
  }
}

//
//
//
function addToDate(date, days) {

  var calculatedDate = new Date(date.setDate(date.getDate()+days));
  return calculatedDate;

}
function subtractFromDate(date, days) {

  var calculatedDate = new Date(date.setDate(date.getDate()-days));
  return calculatedDate;

}

//
// Process string to find organization
//
function getOrgId(string) {

  var trimmedString = string.trim();

       if ( /-(EH|HS)(\s|-|\.|$)/gi.test(trimmedString)  )      { var orgId = "hs";    }
  else if ( /-DR(\s|-|\.|$)/gi.test(trimmedString)  )      { var orgId = "dr";    }
  else if ( /-FOX(\s|-|\.|$)/gi.test(trimmedString) )      { var orgId = "fox";   }
  else    { var orgId = "mb"; }

  return orgId;
}

//
// Process string to find disciplineId
//
function getDisciplineId(string) {

  var trimmedString = string.trim();

       if ( /-PT(\s|-|\.|$)/gi.test(trimmedString) )               { var disciplineId = "pt";    }
  else if ( /-AT(\s|-|\.|$)/gi.test(trimmedString) )               { var disciplineId = "at";    }
  else if ( /-OT(\s|-|\.|$)/gi.test(trimmedString) )               { var disciplineId = "ot";    }
  else if ( /-SLP(\s|-|\.|$)/gi.test(trimmedString) )              { var disciplineId = "slp";   }
  else if ( /-(Other|PTO)(\s|-|\.|$)/gi.test(trimmedString) )      { var disciplineId = "other"; }
  else if ( /-L?MT(\s|-|\.|$)/gi.test(trimmedString) )             { var disciplineId = "lmt";   }

  else if ( /-DR(\s|-|\.|$)/gi.test(trimmedString) )               { var disciplineId = "pt";    }
  else if ( /-Fox(-|\.|$)/gi.test(trimmedString) )                 { var disciplineId = "fox";   }
  else if ( /-(EH|HS)(-|\.|$)/gi.test(trimmedString) )                  { var disciplineId = "hs";    }
  else if ( /-Multi(-|\.|$)/gi.test(trimmedString) )               { var disciplineId = "multi"; }
  else if ( /-(ENT|Enterprise|MFB)(\s|-|\.|$)/gi.test(trimmedString) ) { var disciplineId = "ent";   }

  else if ( /-(Physical)(\s|-|\.|$)/gi.test(trimmedString) )       { var disciplineId = "pt";    }
  else if ( /-Athletic(\s|-|\.|$)/gi.test(trimmedString) )         { var disciplineId = "at";    }

  else { var disciplineId = null }


  ////
  // console.groupCollapsed("getDisciplineId - " + disciplineId);
  //
  //   console.log("running function on trimmedString: " + trimmedString);
  //   console.log("function returned this: " + disciplineId);
  //   console.log(this);
  //
  // console.groupEnd();
  ////

  return disciplineId;

}

//
// Process string to find disciplineId
//
function getDisciplineName(id) {
  if (id === "pt") {
    return "Physical Therapy"
  }
  else if (id === "at") {
    return "Athletic Training"
  }
  else if (id === "ot") {
    return "Occupational Therapy"
  }
  else if (id === "slp") {
    return "Speech-Language Pathology"
  }
  else if (id === "other") {
    return "Other"
  }
  else if (id === "lmt") {
    return "Massage"
  }
  else if (id === "ent") {
    return "Enterprise"
  }
  else if (id === "dr") {
    return "Drayer"
  }
  else if (id === "fox") {
    return "Fox Rehab"
  }
  else if (id === "hs" || id === "eh") {
    return "HealthSouth"
  }
  else if (id === "multi") {
    return "Multi-Discipline"
  }
}


//
//
// http://stackoverflow.com/a/2541083/556079
function getPathFromUrl(url) {
  return url.split(/[?#]/)[0];
}

//
// Process string to find sub vs ns
//
function getSubStatus(string) {

  return /(-sub(-|\.)|-s(-|\.)|-sub$)/gi.test(string);

}

//
// Process string to find sub vs ns
//
function getABstatus(string) {

  if ( /-a\.htm/gi.test(string) ) {
    return "a";
  } else if ( /-b\.htm/gi.test(string) ) {
    return "b";
  } else {
    return false;
  }

}

// Insert an element BEFORE another element.
function insertBefore(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode);
}

// Insert an element AFTER another element.
function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

// Determine the background image of an element or its nearest parent that has one.
function getBackgroundImage(el) {
    if (el == null) {
    //	console.log("null");
      return null;
    }
    var backgroundImage = window.getComputedStyle(el, false).getPropertyValue("background-image");
    if (backgroundImage !== 'none') {
      return backgroundImage.slice(4, -1);
    } else {
      return getBackgroundImage(el.parentElement);
    }
}

// http://stackoverflow.com/questions/17885855/use-dynamic-variable-string-as-regex-pattern-in-javascript
function escapeRegExp(stringToGoIntoTheRegex) {
    return stringToGoIntoTheRegex.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

//
// Get querystring values
// http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
//
function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

//
// Find if an array contains a specific string.
// Returns a boolean.
// http://stackoverflow.com/a/15276975/556079
//
function arrayContains(string, array) {
  return (array.indexOf(string) > -1);
}


//
// Convert a string to title case
//
function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

//
// Convert a string to title case (ignore letters after the first letter)
//
function toTitleCaseRestricted(str) {
  return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1)});
}

//
// OPEN BACKGROUND-IMAGE ON AWS
// On right-click, get the background-image of the clicked element (or nearest parent that has one)
//
// Capture the right-click event: http://stackoverflow.com/a/4236294/556079
// Getting the background-image using plain js: http://stackoverflow.com/a/24520183/556079
// BETTER: Getting the background-image from parent nodes if the clicked element doesn't have one: http://stackoverflow.com/a/40407848/556079
//
window.onload = function() {
  document.body.addEventListener('contextmenu', function(ev) {

      var src = getBackgroundImage(ev.target);

    //  console.log("message to send: " + src);

  		chrome.runtime.sendMessage({bkgUrl: src});

      return false;
  }, false);
}

//Where el is the DOM element you'd like to test for visibility
// http://stackoverflow.com/questions/19669786/check-if-element-is-visible-in-dom
function isHidden(el) {
    return (el.offsetParent === null)
}

// Update the query string
// http://stackoverflow.com/a/11654596/556079
// TIP: Set value to null to remove the key from the URL.
function updateQueryString(key, value, url) {
    if (!url) url = window.location.href;
    var re = new RegExp("([?&])" + key + "=.*?(&|#|$)(.*)", "gi"),
        hash;

    if (re.test(url)) {
        if (typeof value !== 'undefined' && value !== null)
            return url.replace(re, '$1' + key + "=" + value + '$2$3');
        else {
            hash = url.split('#');
            url = hash[0].replace(re, '$1$3').replace(/(&|\?)$/, '');
            if (typeof hash[1] !== 'undefined' && hash[1] !== null)
                url += '#' + hash[1];
            return url;
        }
    }
    else {
        if (typeof value !== 'undefined' && value !== null) {
            var separator = url.indexOf('?') !== -1 ? '&' : '?';
            hash = url.split('#');
            url = hash[0] + separator + key + '=' + value;
            if (typeof hash[1] !== 'undefined' && hash[1] !== null)
                url += '#' + hash[1];
            return url;
        }
        else
            return url;
    }
}

// function updateQueryString(key, value, uri) {
//   if (!uri) uri = window.location.href;
//
//   console.log(key);
//   console.log(value);
//   console.log(uri);
//
//   var re = new RegExp("([?&])" + key + "=.*?(&|#|$)", "i");
//   if( value === undefined ) {
//     if (uri.match(re)) {
//         return uri.replace(re, '$1$2');
//     } else {
//         return uri;
//     }
//   } else {
//     if (uri.match(re)) {
//         return uri.replace(re, '$1' + key + "=" + value + '$2');
//     } else {
//     var hash =  '';
//     if( uri.indexOf('#') !== -1 ){
//         hash = uri.replace(/.*#/, '#');
//         uri = uri.replace(/#.*/, '');
//     }
//     var separator = uri.indexOf('?') !== -1 ? "&" : "?";
//     return uri + separator + key + "=" + value + hash;
//   }
//   }
// }



// Helper function to get an element's exact position
function getPosition(el, frame) {

  var xPos = 0;
  var yPos = 0;

  while (el) {
    if (el.tagName == "BODY") {
      // deal with browser quirks with body/window/document and page scroll
      // document.documentElement.scrollTop always returns 0 on Chrome. This is because WebKit uses body for keeping track of scrolling, whereas Firefox and IE use html.

      var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
      var yScroll = el.scrollTop || document.documentElement.scrollTop;

      xPos += (el.offsetLeft - xScroll + el.clientLeft);
      yPos += (el.offsetTop - yScroll + el.clientTop);


    } else {
      // for all other non-BODY elements
      xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
      yPos += (el.offsetTop - el.scrollTop + el.clientTop);
    }

    el = el.offsetParent;
  }

  yPos += frame.body.scrollTop;

  return {
    x: xPos,
    y: yPos
  };
}

//
function destroy(el) {
  if ( el.target ) {
    var el = this;
  }
  el.parentNode.removeChild(el);
}

//
function destroyAll(el) {
  for (let o of el) {
    o.parentNode.removeChild(o);
  }
}

//
function destroyIfExists(el) {
  if ( elExists(el) ) {
    if ( el.target ) {
      var el = this;
    }
    el.parentNode.removeChild(el);
  }
}

//
function createCopyBtn(node, stringToCopy) {
  node.dataset.copy = stringToCopy;
  node.onclick = copyToClipboard;
  node.classList.add("jk-hover-pointer", "jk-copy-btn");
}

// Copy to Clipboard Function
////
// How it Works:
// Inserts text passed to it into a temporary object and then executes a copy command.
// After it's finished the temporary object is destroyed.
// If an object is passed instead of text, we use that object to copy from instead of creating a new one.
// The object is still destroyed unless persist === true.
////
// Failure Notes:
// After a user action, document.execCommand('copy') cannot take more than 1000ms (pretty sure) to be run. If it does, nothing will be copied.
// This will most often happen if after a user action we first do an AJAX call or we utilize a setTimeout.
////
function copyToClipboard(toCopy, msg, persist) {

  console.log(this);
  console.log(event);
  event.preventDefault();

  if (toCopy.tagName === "INPUT" || toCopy.tagName === "TEXTAREA" || toCopy.contentEditable === "true" ) {

    var copyHolder = toCopy;

  } else {

    var copyHolder = document.createElement("textarea");
    copyHolder.className = "temporary-copy-holder";

    if (typeof toCopy === 'string' || toCopy instanceof String) {
      copyHolder.textContent = toCopy;
    } else {
      copyHolder.textContent = this.dataset.copy;
    }

    document.body.appendChild(copyHolder);

  }


  // Copy the Link - http://www.jstips.co/en/copy-to-clipboard/
  // Select the content
  copyHolder.select();
  document.execCommand('copy');

  var previewOfCopy = htmlEntities(copyHolder.value).slice(0, 200);
  if ( copyHolder.value.length > 200 ) {
    previewOfCopy += "...";
  }
  // if ( msg === "success" ) {
    alertify.success("Saved to clipboard!<div><span class='copied-text'>" + previewOfCopy + "</span></div>", 10);
  // }

  if ( persist !== true ) {
    destroyIfExists(copyHolder);
  }

}

//
/////
function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

//
// Conditional Alerts
function toast(suppress, type, string, int) {
  if ( suppress === "suppress" && suppressAlerts === true ) {
    // console.log("Alert suppressed: \"" + string + "\"");
    return false;
  }

  alertify.error(string, int);
  // console.log("Alert fired: \"" + string + "\"");

}

// Test if an element exists in the DOM.
function elExists(el, set) {
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


// Cut a string after X characters, but if it's in the middle of a word cut the whole word
// http://stackoverflow.com/a/10755510/556079
function cut(text, length) {

  var cutat = text.lastIndexOf(' ', length);

  if ( cutat != -1 ) {
    text = text.substring(0, cutat);
  }
  return text;

}


// http://stackoverflow.com/a/22119674/556079
function findAncestor (el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
}


// Clean a string to create a nice looking plain text version.
function cleanPlainTxt(text) {

  // console.log(text);

  text = text.replace(/(\&nbsp\;|\n|\t|\r\n?|\u00a0)/gi, " "); // http://stackoverflow.com/a/1496863/556079
  // text = text.replace(/(  +)/gi, "");

  // console.log(text);

  text = text.replace(/\t/gi, "");
  text = text.replace(/\n\n+/gi, "\n\n");

  // console.log(text);

  text = text.replace(/   +/gi, " ");
  text = text.replace(/(^ +?| +?$)/gi, "");
  text = text.trim();

  // console.log(text);

  return text
}

// Grab text from an element if it exists in the DOM.
function grabText(el) {
  if ( typeof(el) != 'undefined' && el != null ) {
    return cleanPlainTxt(el.innerText);
  } else {
    return "";
  }
}


// https://github.com/akiomik/chrome-storage-promise
chrome.storage.promise = {

    // sync
    sync: {
        get: (keys) => {
            let promise = new Promise((resolve, reject) => {
                chrome.storage.sync.get(keys, (items) => {
                    let err = chrome.runtime.lastError;
                    if (err) {
                        reject(err);
                    } else {
                        resolve(items);
                    }
                });
            });
            return promise;
        },
        set: (items) => {
            let promise = new Promise((resolve, reject) => {
                chrome.storage.sync.set(items, () => {
                    let err = chrome.runtime.lastError;
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });
            return promise;
        },
        getBytesInUse: (keys) => {
            let promise = new Promise((resolve, reject) => {
                chrome.storage.sync.getBytesInUse(keys, (items) => {
                    let err = chrome.runtime.lastError;
                    if (err) {
                        reject(err);
                    } else {
                        resolve(items);
                    }
                });
            });
            return promise;
        },
        remove: (keys) => {
            let promise = new Promise((resolve, reject) => {
                chrome.storage.sync.remove(keys, () => {
                    let err = chrome.runtime.lastError;
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });
            return promise;
        },
        clear: () => {
            let promise = new Promise((resolve, reject) => {
                chrome.storage.sync.clear(() => {
                    let err = chrome.runtime.lastError;
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });
            return promise;
        }
    },

    // local
    local: {
        get: (keys) => {
            let promise = new Promise((resolve, reject) => {
                chrome.storage.local.get(keys, (items) => {
                    let err = chrome.runtime.lastError;
                    if (err) {
                        reject(err);
                    } else {
                        resolve(items);
                    }
                });
            });
            return promise;
        },
        set: (items) => {
            let promise = new Promise((resolve, reject) => {
                chrome.storage.local.set(items, () => {
                    let err = chrome.runtime.lastError;
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });
            return promise;
        },
        getBytesInUse: (keys) => {
            let promise = new Promise((resolve, reject) => {
                chrome.storage.local.getBytesInUse(keys, (items) => {
                    let err = chrome.runtime.lastError;
                    if (err) {
                        reject(err);
                    } else {
                        resolve(items);
                    }
                });
            });
            return promise;
        },
        remove: (keys) => {
            let promise = new Promise((resolve, reject) => {
                chrome.storage.local.remove(keys, () => {
                    let err = chrome.runtime.lastError;
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });
            return promise;
        },
        clear: () => {
            let promise = new Promise((resolve, reject) => {
                chrome.storage.local.clear(() => {
                    let err = chrome.runtime.lastError;
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });
            return promise;
        }
    },

    // managed
    managed: {
        get: (keys) => {
            let promise = new Promise((resolve, reject) => {
                chrome.storage.managed.get(keys, (items) => {
                    let err = chrome.runtime.lastError;
                    if (err) {
                        reject(err);
                    } else {
                        resolve(items);
                    }
                });
            });
            return promise;
        },
        set: (items) => {
            let promise = new Promise((resolve, reject) => {
                chrome.storage.managed.set(items, () => {
                    let err = chrome.runtime.lastError;
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });
            return promise;
        },
        getBytesInUse: (keys) => {
            let promise = new Promise((resolve, reject) => {
                chrome.storage.managed.getBytesInUse(keys, (items) => {
                    let err = chrome.runtime.lastError;
                    if (err) {
                        reject(err);
                    } else {
                        resolve(items);
                    }
                });
            });
            return promise;
        },
        remove: (keys) => {
            let promise = new Promise((resolve, reject) => {
                chrome.storage.managed.remove(keys, () => {
                    let err = chrome.runtime.lastError;
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });
            return promise;
        },
        clear: () => {
            let promise = new Promise((resolve, reject) => {
                chrome.storage.managed.clear(() => {
                    let err = chrome.runtime.lastError;
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });
            return promise;
        }
    },

    // onChanged
    onChanged: {
        addListener: () => {
            let promise = new Promise((resolve, reject) => {
                chrome.storage.onChanged.addListener((changes, areaName) => {
                    let err = chrome.runtime.lastError;
                    if (err) {
                        reject(err);
                    } else {
                        resolve(changes, areaName);
                    }
                });
            });
            return promise;
        }
    }

}


// View entire storage
// chrome.storage.sync.get(function(result) { console.log("Entire chrome.storage results: "); console.log(result); });
