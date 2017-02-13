// console.warn(">>> global.js loaded");

////
////// Global Functions
////

//
// Process string to find disciplineId
//
function getDisciplineId(string) {
  // console.log("running function on string: " + string);

  var string = string.trim();

       if ( /-(PT|Physical)(\s|-|\.|$)/gi.test(string) ) { var disciplineId = "pt"; }
  else if ( /-(AT|Athletic)(\s|-|\.|$)/gi.test(string) ) { var disciplineId = "at"; }
  else if ( /-OT(\s|-|\.|$)/gi.test(string) )            { var disciplineId = "ot"; }
  else if ( /-SLP(\s|-|\.|$)/gi.test(string) )           { var disciplineId = "slp"; }
  else if ( /-(Other|PTO)(\s|-|\.|$)/gi.test(string) )   { var disciplineId = "other"; }
  else if ( /-LMT(\s|-|\.|$)/gi.test(string) )           { var disciplineId = "lmt"; }
  else if ( /-MT(\s|-|\.|$)/gi.test(string) )            { var disciplineId = "lmt"; }
  else if ( /-Enterprise(\s|-|\.|$)/gi.test(string) )    { var disciplineId = "ent"; }
  else if ( /-DR(\s|-|\.|$)/gi.test(string) )            { var disciplineId = "dr"; }
  else if ( /-Fox(-|\.|$)/gi.test(string) )              { var disciplineId = "fox"; }
  else if ( /-HS(-|\.|$)/gi.test(string) )               { var disciplineId = "hs"; }
  else { var disciplineId = null }

  // console.log("function returned this: " + disciplineId);

  return disciplineId;
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

// Insert an element after another element.
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
// OPEN BACKGROUND-IMAGE ON AWS
// On right-click, get the background-image of the clicked element (or nearest parent that has one)
//
// Capture the right-click event: http://stackoverflow.com/a/4236294/556079
// Getting the background-image using plain js: http://stackoverflow.com/a/24520183/556079
// BETTER: Getting the background-image from parent nodes if the clicked element doesn't have one: http://stackoverflow.com/a/40407848/556079
//
document.body.addEventListener('contextmenu', function(ev) {

    var src = getBackgroundImage(ev.target);

  //  console.log("message to send: " + src);

		chrome.runtime.sendMessage({bkgUrl: src});

    return false;
}, false);


//Where el is the DOM element you'd like to test for visibility
// http://stackoverflow.com/questions/19669786/check-if-element-is-visible-in-dom
function isHidden(el) {
    return (el.offsetParent === null)
}

// Update the query string
// http://stackoverflow.com/a/11654596/556079
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
function getPosition(el) {
  var xPos = 0;
  var yPos = 0;

  while (el) {
    if (el.tagName == "BODY") {
      // deal with browser quirks with body/window/document and page scroll
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
  return {
    x: xPos,
    y: yPos
  };
}

//
function destroy(el) {
  el.parentNode.removeChild(el);
}

//
function destroyIfExists(el) {
  if ( elExists(el) ) {
    el.parentNode.removeChild(el);
  }
}


//
function copyToClipboard(el) {
    // Copy the Link - http://www.jstips.co/en/copy-to-clipboard/
    // Select the content
    el.select();

    // Copy to the clipboard
    setTimeout( function() {
      document.execCommand('copy');
      alertify.success("Saved to clipboard!<br><span style='display:block;padding-top:4px;font-size:80%;opacity:.85;line-height:16px;word-break:break-all'>" + el.value + "</span>", 20);
      document.execCommand('copy');
    }, 1000);
}

// Test if an element exists in the DOM.
function elExists(el) {
  if ( typeof(el) != 'undefined' && el != null ) {
    return true;
  } else {
    return false;
  }
}

// http://stackoverflow.com/a/22119674/556079
function findAncestor (el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
}

// Clean a string to create a nice looking plain text version.
function cleanPlainTxt(text) {

  // console.log(text);

  text = text.replace(/(\&nbsp\;|\n|\t|\r|\u00a0)/gi, " "); // http://stackoverflow.com/a/1496863/556079
  // text = text.replace(/(  +)/gi, "");
  text = text.replace(/\t/gi, "");
  text = text.replace(/\n\n+/gi, "\n\n");
  text = text.replace(/   +/gi, " ");
  text = text.replace(/(^ +?| +?$)/gi, "");
  text = text.trim();

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
