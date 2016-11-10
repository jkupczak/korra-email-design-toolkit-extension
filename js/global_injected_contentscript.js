console.log("global_contentScript.js loaded");

////
////// Global Functions
////

//
// Process string to find disciplineId
//
function getDisciplineId(string) {
  if ( /-(PT(-|\.|$)|(Physical$|Physical-?))/gi.test(string) ) { var disciplineId = "pt"; }
  else if ( /-(AT(-|\.|$)|(Athletic$|Athletic-?))/gi.test(string) ) { var disciplineId = "at"; }
  else if ( /-OT(-|\.|$)/gi.test(string) ) { var disciplineId = "ot"; }
  else if ( /-SLP(-|\.|$)/gi.test(string) ) { var disciplineId = "slp"; }
  else if ( /-(Other|PTO)(-|\.|$)/gi.test(string) ) { var disciplineId = "other"; }
  else if ( /-L?MT(-|\.|$)/gi.test(string) ) { var disciplineId = "lmt"; }
  else if ( /-Enterprise(-|\.|$)/gi.test(string) ) { var disciplineId = "enterprise"; }
  else { var disciplineId = "undefined" }

  return disciplineId;
}

//
// Process string to find sub vs ns
//
function getSubStatus(string) {

  return /(-sub(-|\.)|-s(-|\.)|-sub$)/gi.test(string);

}

// Insert an element after another element.
function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

// Determine the background image of an element or its nearest parent that has one.
function getBackgroundImage(el) {
    if (el == null) {
    	console.log("null");
      return null;
    }
    var backgroundImage = window.getComputedStyle(el, false).getPropertyValue("background-image");
    if (backgroundImage !== 'none') {
      return backgroundImage.slice(4, -1);
    } else {
      return getBackgroundImage(el.parentElement);
    }
}





// http://stackoverflow.com/questions/11129373/listen-for-creation-of-an-element-and-fire-an-event-when-it-appears-on-the-page
// var observer = new WebKitMutationObserver(function(mutations) {
//     mutations.forEach(function(mutation) {
//         for (var i = 0; i < mutation.addedNodes.length; i++) {
//             if(mutation.addedNodes[i].id == "myDiv") {
//                 // target node added, respond now...
//             }
//         }
//     });
// });
// observer.observe(document, { subtree: true });



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

    console.log("message to send: " + src);

		chrome.runtime.sendMessage({bkgUrl: src});

    return false;
}, false);
