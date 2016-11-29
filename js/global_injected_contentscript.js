console.log("global_injected_contentScript.js loaded");

////
////// Global Functions
////

//
// Process string to find disciplineId
//
function getDisciplineId(string) {
  console.log("running function on string: " + string);

  var string = string.trim();

       if ( /-(PT|Physical)(\s|-|\.|$)/gi.test(string) ) { var disciplineId = "pt"; }
  else if ( /-(AT|Athletic)(\s|-|\.|$)/gi.test(string) ) { var disciplineId = "at"; }
  else if ( /-OT(\s|-|\.|$)/gi.test(string) )            { var disciplineId = "ot"; }
  else if ( /-SLP(\s|-|\.|$)/gi.test(string) )             { var disciplineId = "slp"; }
  else if ( /-(Other|PTO)(\s|-|\.|$)/gi.test(string) )   { var disciplineId = "other"; }
  else if ( /-LMT(\s|-|\.|$)/gi.test(string) )           { var disciplineId = "lmt"; }
  else if ( /-MT(\s|-|\.|$)/gi.test(string) )            { var disciplineId = "mt"; }
  else if ( /-Enterprise(\s|-|\.|$)/gi.test(string) )    { var disciplineId = "enterprise"; }
  else if ( /-DR(\s|-|\.|$)/gi.test(string) )            { var disciplineId = "dr"; }
  else { var disciplineId = "undefined" }

  console.log("function returned this: " + disciplineId);

  return disciplineId;
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

  if ( /-a\.html?$/gi.test(string) ) {
    return "a";
  } else if ( /-b\.html?$/gi.test(string) ) {
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
