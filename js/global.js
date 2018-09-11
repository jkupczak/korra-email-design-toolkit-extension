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

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
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

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
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
// Finding out how many times an array element appears
// https://stackoverflow.com/a/41941954/556079
//

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
function countInArray(array, value) {
  return array.reduce((n, x) => n + (x === value), 0);
  // console.log(countInArray([1,2,3,4,4,4,3], 4)); // 3
}


//
// Remove a value from an array by searching for that value
// https://stackoverflow.com/a/3954451/556079
//

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
function removeValueFromArray(array, value) {
  var index = array.indexOf(value);
  if (index !== -1) {
    array.splice(index, 1);
  }
  return array;
}

//
// Select the contents of an element
// http://stackoverflow.com/a/6150060/556079
//

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
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

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
function createPlainTextContainer(string) {
  var plainTextContainer = document.createElement("textarea");
  plainTextContainer.className = "plain-text-modal";
  var plainTextString = document.createTextNode(string);
  plainTextContainer.appendChild(plainTextString);

  return plainTextContainer;
}

/**
 * Is an element empty of visible text or objects?
 * @param  {[type]} arg1 [description]
 * @return {[type]}      [description]
 */
function isElementEmpty(element) {

  // Are there children? Check if one of them is visibile and has dimensions.
  // If so, we don't need to check for text nodes.
  // .children does not show text nodes.
  if ( element.children.length > 0 ) {

    for (var i = 0; i < element.children.length; i++) {
      if ( element.offsetParent !== null && element.hidden === false ) {

        // We found a visible child.
        // Does it have an explcitly set width or height?
        // If so, the element is NOT empty.
        if ( element.children[i].clientWidth !== 0 || element.children[i].clientHeight !== 0 ) {
          // console.log("Element NOT empty. Failed element visibility check.");
          return false;

        // If both "width" or "height" were 0, we still may have text nodes.
        } else {
          return hasVisibleCharacters(element.children[i]);
        }

      }
      // None of the children were visible.
      // Check if any text is visible.
      else {
        return hasVisibleCharacters(element, true);
      }
    }

  }

  // Are there zero children?
  // If so, check for visible text nodes.
  else if ( element.children.length === 0 ) {
    return hasVisibleCharacters(element);
  }

}

//
// Has visible characters?
//

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
function hasVisibleCharacters(element, checkImmediateChildren) {

  // Find invisible characters and whitespace characters
  // Replace them with nothing and then check if the total length of innerText is 0
    // https://stackoverflow.com/q/51905565/556079
    // https://stackoverflow.com/a/2812314/556079
    // https://en.wikipedia.org/wiki/Whitespace_character

  // Check only the immediate children of this element.
  if ( checkImmediateChildren === true ) {

    // console.log("looking only at immediate children: ", element.childNodes.length );

    for (var i = 0; i < element.childNodes.length; i++) {
      if ( element.childNodes[i].nodeName === "#text" ) {
        console.log("node WAS a text node");
        if ( element.childNodes[i].nodeValue.replace( /[^\x00-\x7F]+/g, "").length !== 0 ) {

          // console.log("Some text is visible in the direct children of this <td>.");
          // Some text is visible.
          return false;
        }

      } else {
        // console.log("node was NOT a text node");
      }
    }

    // console.log("Loop finished and found NO text that is visible in the direct children of this <td>.");
    // No text is visible.
    return true;

  }
  // Check all text content. NOT just the immediate children.
  else {

    // console.log("looking at all children");

    if ( element.innerText.replace( /[^\x00-\x7F]+/g, "").length === 0 ) {

      // console.log("No text is visible in any of the children of this <td>.");
      // No text is visible.
      return true;

    } else {

      // console.log("Some text is visible in the children of this <td>.");
      // Some text is visible.
      return false;

    }

  }
}


//
// Format Date
//

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
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

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
function getFilename(url) {
  var filename = url.match(/.+?\..+/gi);
      filename = filename[0].replace(/.+\//gi, "");

  return filename
}

//
// Process filename to find email date
// Filenames should use YY-MM-DD.
// YYYY can be used as well, but will be ignored. No harm!
//

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
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



/**
 * Wrap a new element around a single node
 * // https://plainjs.com/javascript/manipulation/wrap-an-html-structure-around-an-element-28/
 * @param  {[type]} node [description]
 * @param  {[type]} wrapper [description]
 * @return {[type]}      [description]
 */
function wrap(node, wrapper) {
  node.parentNode.insertBefore(wrapper, node);
  wrapper.appendChild(node);
}



/**
 * Wrap a new element around multiple nodes
 * http://stackoverflow.com/a/41391872/556079
 * @param  {[type]} nodes [description]
 * @param  {[type]} wrapper [description]
 * @return {[type]}      [description]
 */
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

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
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

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
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

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
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

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
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

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
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

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
function addToDate(date, days) {

  var calculatedDate = new Date(date.setDate(date.getDate()+days));
  return calculatedDate;

}


/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
function subtractFromDate(date, days) {

  var calculatedDate = new Date(date.setDate(date.getDate()-days));
  return calculatedDate;

}

//
// Process string to find organization
//

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
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

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
function getDisciplineId(string) {

  var trimmedString = string.trim();

       if ( /-PT(\s|-|\.|$)/gi.test(trimmedString) )               { var disciplineId = "pt";     }
  else if ( /-AT(\s|-|\.|$)/gi.test(trimmedString) )               { var disciplineId = "at";     }
  else if ( /-OT(\s|-|\.|$)/gi.test(trimmedString) )               { var disciplineId = "ot";     }
  else if ( /-SLP(\s|-|\.|$)/gi.test(trimmedString) )              { var disciplineId = "slp";    }
  else if ( /-(Other|PTO)(\s|-|\.|$)/gi.test(trimmedString) )      { var disciplineId = "other";  }
  else if ( /-L?MT(\s|-|\.|$)/gi.test(trimmedString) )             { var disciplineId = "lmt";    }

  else if ( /-DR(\s|-|\.|$)/gi.test(trimmedString) )               { var disciplineId = "pt";     }
  // else if ( /-Fox(-|\.|$)/gi.test(trimmedString) )                 { var disciplineId = "fox";    }
  else if ( /-(EH|HS)(-|\.|$)/gi.test(trimmedString) )             { var disciplineId = undefined;     }
  else if ( /-Multi(-|\.|$)/gi.test(trimmedString) )               { var disciplineId = "multi";  }
  else if ( /-(ENT|Enterprise|MFB)(\s|-|\.|$)/gi.test(trimmedString) ) { var disciplineId = "ent";}

  else if ( /-(Physical)(\s|-|\.|$)/gi.test(trimmedString) )       { var disciplineId = "pt";     }
  else if ( /-Athletic(\s|-|\.|$)/gi.test(trimmedString) )         { var disciplineId = "at";     }
  else if ( /-All(\-|\.|$)/gi.test(trimmedString) )                { var disciplineId = "all";    }

  else { var disciplineId = undefined }


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

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
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
    return "Speech Pathology"
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
  else if (id === "all") {
    return "All Disciplines"
  }
  else {
    return "Unknown"
  }
}


//
//
// http://stackoverflow.com/a/2541083/556079

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
function getPathFromUrl(url) {
  return url.split(/[?#]/)[0];
}

//
// Process string to find sub vs ns
//

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
function getSubStatus(string) {

  return /(-sub(-|\.)|-s(-|\.)|-sub$)/gi.test(string);

}

//
// Process string to find sub vs ns
//

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
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

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
function insertBefore(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode);
}

// Insert an element AFTER another element.

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

// Determine the background image of an element or its nearest parent that has one.

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
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

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
function escapeRegExp(stringToGoIntoTheRegex) {
    return stringToGoIntoTheRegex.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

//
// Get querystring values
// http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
//

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
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

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
function arrayContains(string, array) {
  return (array.indexOf(string) > -1);
}


//
// Convert a string to title case
//

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

//
// Convert a string to title case (ignore letters after the first letter)
//

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
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
// Commented out on 8/24/18 because it was throwing an error when viewing .svg files.

        // window.onload = function() {
        //   document.body.addEventListener('contextmenu', function(ev) {
        //
        //       var src = getBackgroundImage(ev.target);
        //
        //     //  console.log("message to send: " + src);
        //
        //   		chrome.runtime.sendMessage({bkgUrl: src});
        //
        //       return false;
        //   }, false);
        // }

// Greatest Common Factor
// https://stackoverflow.com/a/17445322/556079

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
function gcd_rec(a, b) {
  if (b) {
    return gcd_rec(b, a % b);
  } else {
    return Math.abs(a);
  }
}

//Where el is the DOM element you'd like to test for visibility
// http://stackoverflow.com/questions/19669786/check-if-element-is-visible-in-dom

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
function isHidden(el) {
    return (el.offsetParent === null)
}

// Update the query string
// http://stackoverflow.com/a/11654596/556079
// TIP: Set value to null to remove the key from the URL.

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
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


// Helper function to get an element's exact position

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
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

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
function destroy(el) {
  if ( el.target ) {
    var el = this;
  }
  el.parentNode.removeChild(el);
}

//

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
function destroyAll(el) {
  for (let o of el) {
    o.parentNode.removeChild(o);
  }
}

//

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
function destroyIfExists(el) {
  if ( elExists(el) ) {
    if ( el.target ) {
      var el = this;
    }
    el.parentNode.removeChild(el);
  }
}

//

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
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

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
function copyToClipboard(toCopy, msg, persist) {

  // console.log(this);
  // console.log(event);
  // console.log(typeof toCopy);
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

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

//
// Conditional Alerts

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
function toast(suppress, type, string, int) {
  if ( suppress === "suppress" && suppressAlerts === true ) {
    // console.log("Alert suppressed: \"" + string + "\"");
    return false;
  }

  alertify.error(string, int);
  // console.log("Alert fired: \"" + string + "\"");

}

// Test if an element exists in the DOM.

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
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

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
function cut(text, length) {

  var cutat = text.lastIndexOf(' ', length);

  if ( cutat != -1 ) {
    text = text.substring(0, cutat);
  }
  return text;

}



// Round to fixed decimal place
// both parameters can be string or number
// https://stackoverflow.com/a/43998255/556079

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
function roundTo(number, decimals) {

  // Don't round if this is a whole number.
  if ( number.toString().indexOf(".") == -1 ) { // https://stackoverflow.com/a/7878073/556079
    return number;
  } else {
    var x = Math.pow(10, Number(decimals) + 1);
    return (Number(number) + (1 / x)).toFixed(decimals)
  }

}




// http://stackoverflow.com/a/22119674/556079

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
function findAncestor (el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
}


// Clean a string to create a nice looking plain text version.

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
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

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
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

//
/////////
// isPlainObject({sandwich: 'tuna', chips: 'cape cod'}); // Returns true
// isPlainObject(['tuna', 'chicken', 'pb&j']) // Returns false
var isPlainObject = function (obj) {
	return Object.prototype.toString.call(obj) === '[object Object]';
};


//
////////
// Used in local HTML files and when visiting the blog.

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
function logArticleStatusInStorge(document) {

  var postId = document.match(/rel\=(\"|\')shortlink(\"|\').+?\>/i)[0].match(/\d\d\d+/)[0];
  var isProtected = isArticleProtected(document);

  console.log("postId", postId, "isProtected", isProtected);

  // get
  chrome.storage.promise.local.get('protectedarticles').then(function(data) {
    // resolved

    if (typeof data.protectedarticles !== 'undefined') {

      // "protectedarticles" exists

      // Convert the value we got from chrome.storage into an array.
      // https://stackoverflow.com/a/20881336/556079
      var arr = Object.values(data.protectedarticles);

      if ( !arr.includes(postId) ) {
          console.error("postId " + postId + " is NOT included in 'protectedarticles'");
          if ( isProtected ) {
              arr.push(postId);
          }
      } else {
          console.error("postId already included");
          if ( !isProtected ) {
            console.log("is not protected")
            removeValueFromArray(arr, postId);
          }
      }

      updateProtectArticlesinStorage(arr);

    } else {
      // "protectedarticles" does not exists
      console.error("'protectedarticles' not set yet, setting now...");
      var arr = [postId];
      updateProtectArticlesinStorage(arr);
    }

  }, function(error) {
    // rejected
    console.log(error);
  });

}
    function updateProtectArticlesinStorage(arr) {

      chrome.storage.promise.local.set({'protectedarticles': arr}).then(function() {
        // resolved
      }, function(error) {
        console.log(error);
      });

    }


///////////////////////////
///////////////////////////
///////////////////////////

// View entire storage
// chrome.storage.sync.get(function(result) { console.log("Entire chrome.storage results: "); console.log(result); });




///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
/////
/////
/////    Code Weight
/////
/////
///// - http://bytesizematters.com/
///// - https://github.com/hteumeuleu/email-bugs/issues/41
///// - https://www.sendwithus.com/resources/gmail_size_test
///// - https://codepen.io/cosmin-popovici/pen/yMgwVa?editors=1010
///// - https://gist.github.com/hellocosmin/ca6e3ea7cd7898ce86c606e303bc0aa3
/////
/////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////

(function(){

var crlf = /(\r?\n|\r)/g,
	whitespace = /(\r?\n|\r|\s+)/g;

window.ByteSize = {
	count: function(text, options) {
		// Set option defaults
		options = options || {};
		options.lineBreaks = options.lineBreaks || 1;
		options.ignoreWhitespace = options.ignoreWhitespace || false;

		var length = text.length,
			nonAscii = length - text.replace(/[\u0100-\uFFFF]/g, '').length,
		    lineBreaks = length - text.replace(crlf, '').length;

		if (options.ignoreWhitespace) {
			// Strip whitespace
			text = text.replace(whitespace, '');

			return text.length + nonAscii;
		}
		else {
			return length + nonAscii + Math.max(0, options.lineBreaks * (lineBreaks - 1));
		}
	},

	formatInt: function(count, plainText) {
		var level = 0;

		while (count > 1024) {
			count /= 1024;
			level++;
		}

		return (plainText? count : count);
	},

	formatString: function(count, plainText) {
		var level = 0;

		while (count > 1024) {
			count /= 1024;
			level++;
		}

		// Round to 2 decimals
		count = Math.round(count*100)/100;

		level = ['', 'K', 'M', 'G', 'T'][level];

		return (plainText? count : count) + ' ' + level + 'B';
	},

  // 102kb is known popularly to be the size limit before Gmail clips an email.
  // However, after much testing it seems like its actually 101kb.
  // To make Korra feel more accurate to what the community believes, we'll modify the Filesize
  // that we calculated to add 1 extra kb. So 101kb will instead be 102kb.
	formatIntGmail: function(count, plainText) {
		var level = 0;

		while (count > 1024) {
			count /= 1024;
			level++;
		}

    // As mentioned above, this is where we add 1 KB to the total.
    // This better represents the limit imposed by Gmail.
    count = count + 1;

		return (plainText? count : count);
	},

  // This format is the same as above, except it also incorporates the
  // KB, MB, or GB string to the end of our integer.
  // It also rounds it down to 2 decimals.
	formatStringGmail: function(count, plainText) {
		var level = 0;

		while (count > 1024) {
			count /= 1024;
			level++;
		}

		// Round to 2 decimals
      // Last Updated: 8/21/18
      // JavaScript is not great with rounding.
      // I was previously rounding to 2 decimals. But some values failed to round properly.
      // 32490 is one such value that broke. Instead of 2 decimals it rounded to like 15 decimals.
      // Rounding is not an issue when we aren't showing the user the number.
      // But in this case it is. I've resorted to rounding to 1 decimal instead.
      // This might have its own issues with specific numbers. We'll see if anything pops up.

    // Round to 2 decimals (this is the popular method)
    count = Math.round(count*100)/100;

      // Round to 1 decimal (this is the popular method)
      // count = Math.round( count * 10 ) / 10;

      // Alternate rounding function (unused)
      // Documentation: https://stackoverflow.com/a/12830454/556079
      // count = roundNumber(count, 1);

    // As mentioned above, this is where we add 1 KB to the total.
    // This better represents the limit imposed by Gmail.
    count = count + 1;


    // Catch rounding errors by converting to a string and just chopping off extra characters after 5 (##.##);
    // Not exactly scientific...
    count = count.toString();

    if ( count.length > 5 ) {
      count = count.substring(0,5);
    }

    // Add the prefix to the end of our integer. KB, MB, GB, etc...
		level = ['', 'K', 'M', 'G', 'T'][level];

		return (plainText? count : count) + ' ' + level + 'B';
	}

};

})();

///////////////
///////////////
//
// Rounding numbers in javascript is hard apparently.
// This function is an alternate method of doing it.
// https://stackoverflow.com/a/12830454/556079
//
///////////////
///////////////


/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
function roundNumber(num, scale) {
  if(!("" + num).includes("e")) {
    return +(Math.round(num + "e+" + scale)  + "e-" + scale);
  } else {
    var arr = ("" + num).split("e");
    var sig = ""
    if(+arr[1] + scale > 0) {
      sig = "+";
    }
    return +(Math.round(+arr[0] + "e" + sig + (+arr[1] + scale)) + "e-" + scale);
  }
}


///////////////
///////////////
//
// https://stackoverflow.com/a/18673641/556079
//
///////////////
///////////////


/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
function findPos(object, currentDocument) {

  var objectPosFromTop = object.getBoundingClientRect().top + currentDocument.documentElement.scrollTop;
  var objectPosFromLeft = object.getBoundingClientRect().left + currentDocument.documentElement.scrollLeft;

  return [objectPosFromTop, objectPosFromLeft];
}
