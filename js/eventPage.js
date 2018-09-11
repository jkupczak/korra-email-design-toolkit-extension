console.warn("Korra " + chrome.runtime.getManifest().version);

// !!!!!!!!!!!!!
// EVENT / BACKGROUND PAGE
// NO DOM ACCESS
// !!!!!!!!!!!!!

// ================================================================
//
// Event Pages: https://developer.chrome.com/extensions/event_pages
//
// ================================================================
//
// Event pages go 'inactive' after about 15 seconds (approx. based on my tests) if "persistent": false is set in the manifest.
// Becoming inactive is what separates event pages from background pages, the idea is to free up memory so that Chrome doesn't chug.
//
// An event page will become active when any of these things happen:
//
//   - The app or extension is first installed or is updated to a new version (in order to register for events).
//   - The event page was listening for an event, and the event is dispatched.
//   - A content script or other extension sends a message.
//   - Another view in the extension (for example, a popup) calls runtime.getBackgroundPage.
//
// Code that runs at regular intervals using setInterval() will not work in an eventpage once it has gone inactive.
// Instead, it's best to use the Chrome Alarms API: https://developer.chrome.com/extensions/alarms.html
//
//
// ================================================================
// ================================================================
// ================================================================


//                                                                                                    //
// -------------------------------------------------------------------------------------------------- //
//                                                                                                    //


// Refreshes the current tab.
// Implemented specifically to compliment the .reload function below.
// When I click the Korra icon the extension reloads. After its done reloading this code runs and refreshes my active tab.
// This was added to make development of the extension quicker.
// Instead of opening the Extensions settings tab I can reload the extension without ever leaving the page I'm looking at.
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.reload(tabs[0].id);
});


//
// Redirect Links using webRequest blocking.
//
// https://developer.chrome.com/extensions/webRequest
chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
      console.log(details);
      // return {cancel: true};

      var newUrl = details.url;
      if ( /\?dl=1/i.test(newUrl) ) {
        newUrl = newUrl.replace(/\?dl=1/,"?dl=0");
      }
      else if ( /\?dl=0/i.test(newUrl) ) {
        // do nothing
      }
      else {
        newUrl = "https://www.dropbox.com/s/" + newUrl.replace(/^.+?\/s\//i,"");
      }

      return { redirectUrl: newUrl /*Redirection URL*/ };
      // return {cancel: details.url.indexOf("://www.evil.com/") != -1};
    },
    {
      urls: ["*://*.dropbox.com/s/*/*?dl=1", "*://*.dropboxusercontent.com/s/*"]
      // urls: ["*://*.medbridgeeducation.com/*"]
    },
    ["blocking"]
);

// Views on Dropbox
// https://www.dropbox.com/s/sp7b14k2ejj1r3e/18-04-10-Other-John-Snyder-Avascular-Necrosis-ns-a.html?dl=0

// Downloads
// https://dl.dropboxusercontent.com/s/sp7b14k2ejj1r3e/18-04-10-Other-John-Snyder-Avascular-Necrosis-ns-a.html
// https://www.dropbox.com/s/sp7b14k2ejj1r3e/18-04-10-Other-John-Snyder-Avascular-Necrosis-ns-a.html?dl=1

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
//
//
//    Protect Article Tracker - Badge Update
//
//
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

  // Update extension icon counter
  // https://developer.chrome.com/extensions/browserAction
  function updateBadgeText(value) {

    // This function is delivered an array of all protected blog articles.
    // Get the length of the array.
    ids = value.length.toString();

    // If the array is empty, we want to set the badge to '' to remove it.
    if ( ids === "0" ) {
      ids = '';
    }
    chrome.browserAction.setBadgeText({text: ids}); // We have 10+ protected articles
    chrome.browserAction.setBadgeBackgroundColor([0,0,0,100]); // Black badge
  }

  // Get protectedarticles value from chrome.storage when background page loads
  // Send the value over to updateBadgeText().
  chrome.storage.local.get('protectedarticles', function (result) {
    updateBadgeText(result.protectedarticles);
  });

  // Monitor chrome.storage for changes to "protectedarticles"
  // Send the value over to updateBadgeText().
  chrome.storage.onChanged.addListener(function(changes, namespace) {
    for (key in changes) {
      var storageChange = changes[key];

      console.log(key, namespace, storageChange);

      if ( key === "protectedarticles" ) {
        updateBadgeText(storageChange.newValue);
      }

      console.log('Storage key "%s" in namespace "%s" changed. ' +
                  'Old value was "%s", new value is "%s".',
                  key,
                  namespace,
                  storageChange.oldValue,
                  storageChange.newValue);
    }
  });


/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
//
//
//    Icon Clicks
//
//
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////


// Handle clicks on the icon.
chrome.browserAction.onClicked.addListener(function(tab) {

  if ( localStorage['fileAccessOff'] ) {
    showStartPage(1);
  } else {
    // Show popup HTML with information.
    // Until that's ready, show options.html instead
    // chrome.tabs.create({ url: chrome.extension.getURL('options.html') });

    chrome.runtime.reload();

  }

});


/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
//
//
//    Startup
//
//
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////


// Listen for installation at runtime
chrome.runtime.onInstalled.addListener(handleInstalled);


// When onInstalled is detected, do this.
function handleInstalled(details) {

  console.log(details.reason);

  // If this is a new install...
  if ( details.reason == 'install') {
    chrome.storage.sync.set({ 'newInstalled': true });
    showStartPage();

    // Set default values on install
    chrome.storage.local.set({ 'protectedarticles': "" });

  }

}


// Determine if the extension has access to local files.
function checkForFileAccessOption() {

	chrome.extension.isAllowedFileSchemeAccess(function (answer) {

    console.log("chrome.extension.isAllowedFileSchemeAccess", answer);
    console.log("localStorage['fileAccessOff']", localStorage['fileAccessOff']);

			if (answer) {
        console.log("a", localStorage['fileAccessOff']);
					if (localStorage['fileAccessOff']) {
							localStorage.removeItem('fileAccessOff');
							showStartPage(2);
              console.log(localStorage["b", 'fileAccessOff'])
					}
          console.log("c", localStorage['fileAccessOff']);
			} else {
				localStorage['fileAccessOff'] = true;
        console.log("d", localStorage['fileAccessOff']);
			}
	});

};
checkForFileAccessOption();


// Function to determine what content should be shown
// Skip step 1 if needed (page that shows how to turn on file access)
function showStartPage() {

  console.log(arguments);

    var step = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

  console.log(step);

		var path = 'startpage/index.html';
		if (step > 0) {
				path += '#step-' + step;
		}
		chrome.tabs.create({ url: chrome.extension.getURL(path) });
};



/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
//
//
//      FUNCTIONS
//
//
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////


// Function that allows us to inject multiple scripts at once.
// https://stackoverflow.com/a/21535234/556079
    // function executeScripts(tabId, injectDetailsArray)
    // {
    //     function createCallback(tabId, injectDetails, innerCallback) {
    //         return function () {
    //             chrome.tabs.executeScript(tabId, injectDetails, innerCallback);
    //         };
    //     }
    //
    //     var callback = null;
    //
    //     for (var i = injectDetailsArray.length - 1; i >= 0; --i)
    //         callback = createCallback(tabId, injectDetailsArray[i], callback);
    //
    //     if (callback !== null)
    //         callback();   // execute outermost function
    // }


////////////////////////////// ### //////////////////////////////
////////////////////////////// ### //////////////////////////////
////_________________________________________________________////



/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
//
//
// Message Listening
// Get messages from content scripts and process the data.
//
//
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

    // Show all frames from the requester tab.
    // var gettingAllFrames = chrome.webNavigation.getAllFrames({tabId: sender.tab.id});
    // console.log( gettingAllFrames );

    ////
    // Output to the console the message we received.
    ////
  	console.log(request);
  	console.log(sender);
  	console.log(sender.tab.id);
    console.log(sender.tab ?
                "Message received from a content script: " + sender.tab.url :
                "from the extension");



    ////
    if (request.cmd === "shutdown") {
      sendResponse({farewell: "goodbye"});
    }

    ////////////////////
    // Dynamically loading content scripts into iframes using .executeScript();
    // Originally designed to deal with the issue of not being able to add content scripts to iframes using the manifest.
    // The original intention was to make my shortcut handling cleaner.
    // On 8/20/18 I discovered a way to handle this without using an event page.
    // It could be done in the manifest using:
          // "all_frames": true,
          // "match_about_blank": true,
    // Full code:
          // {
          //   "matches": ["file:///*.htm*", "file:///*.html*", "http://localhost:4567/*.htm*", "http://localhost:3000/*.htm*"],
          //   "exclude_matches": ["file:///*?view=1*", "file:///var/folders/*", "http://localhost:4567/__middleman/*"],
          //
          //   "js": ["js/libs/keymaster.js", "js/newsletter/shortcuts.js"],
          //
          //   "all_frames": true,
          //   "match_about_blank": true,
          //   "run_at": "document_idle"
          // },
    // But even that was not needed. Turns out a addEventListener on the iframes was enough.
    // No need to inject anything in any fashion to get the keypresses.


            // if (request.greeting === "runContentScript") {
            //   console.log("Begin runContentScript");
            //
            //   /* ASYNC */
            //   // Get the frameids of the tab that sent the message
            //   ////////////////////////////////////////////////////
            //   chrome.webNavigation.getAllFrames({tabId: sender.tab.id}, function (frames) {
            //
            //       framesToInject = [];
            //
            //       console.info(frames); // logs "FRAMES null"
            //
            //       for (var i = 0; i < frames.length; i++) {
            //
            //           console.log(frames[i]);
            //           console.log(frames[i].frameId);
            //
            //           if ( frames[i].frameId > 0 ) {
            //             framesToInject.push(frames[i].frameId);
            //           }
            //
            //       }
            //
            //       console.log(framesToInject);
            //       framesToInject.sort();
            //       console.log(framesToInject);
            //
            //
            //       // All of the scripts we want to inject.
            //       custDetailsDesktop = [
            //           { file: "js/libs/keymaster.js", allFrames: false, frameId: framesToInject[0], matchAboutBlank: true },
            //           { file: "js/exe.js", allFrames: false, frameId: framesToInject[0], matchAboutBlank: true },
            //           { file: "js/exe2.js", allFrames: false, frameId: framesToInject[0], matchAboutBlank: true }
            //       ];
            //       executeScripts(sender.tab.id, custDetailsDesktop);
            //
            //       custDetailsMobile = [
            //           { file: "js/libs/keymaster.js", allFrames: false, frameId: framesToInject[1], matchAboutBlank: true },
            //           { file: "js/exe.js", allFrames: false, frameId: framesToInject[1], matchAboutBlank: true },
            //           { file: "js/exe2.js", allFrames: false, frameId: framesToInject[1], matchAboutBlank: true }
            //       ];
            //       executeScripts(sender.tab.id, custDetailsMobile);
            //
            //       sendResponse({farewell: "done!" });
            //
            //   console.log("End runContentScript");
            //   });
            //
            // }
    //////////////////////////////////////

    ////
    if ( request.checkLinkDB ) {
      sendResponse({farewell: indexedDBHelper.getLink( request.checkLinkDB )});
    }

    // Use postmessage to get a local file URL and navigate a tab to that URL.
    // Content scripts can't do this on their own. So instead they send a message to the background page.
    // This code receives the message and loads the URL.
    // sender.tab.id is used to open the URL in the same tab that sent the message.
    // without that, the following code would open the URL in the currently active tab instead.
    if ( /^file:.+\//gi.test(request.greeting) && /dropbox\.com/gi.test(sender.url) ) {
  		chrome.tabs.update(sender.tab.id, {
  		     url: request.greeting
  		});
    }

    // @TODO what is this
    ////
    if ( /^blogStatus/gi.test(request.greeting) ) {

      console.log(request.greeting);

      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {greeting: request.greeting}, function(response) {
          console.log(response.farewell);
        });
      });

    }

    // Get right-click background image message
    // Use a function to save it outside of this listener.
    // http://stackoverflow.com/a/26373282/556079
    saveMessage(request.bkgUrl);

    ////
    // There might be a reason we need this. Look it up and document why.
    return true;

  });



////////////////////////////// ### //////////////////////////////
////////////////////////////// ### //////////////////////////////
////_________________________________________________________////




// Log all data from chrome.storage.sync
// http://stackoverflow.com/a/27432365/556079
function logChromeStorage() {
  chrome.storage.sync.get(function(result) {
    console.log(result)
  });
  chrome.storage.local.get(function(result) {
    console.log(result)
  });
}

logChromeStorage();



//==============================
//
// MailChimp Alert Notifications
//
// Every 10 minutes check chrome.storage for the amount of pending drafts on MailChimp. If it's greater than 0, push a desktop notification.
//
//==============================
//
// chrome.storage - http://stackoverflow.com/a/14533446/556079
// Notifications - http://stackoverflow.com/a/13328513/556079
// Alarms - https://developer.chrome.com/extensions/alarms
//
//==============================

// Check the time. Display alerts more frequently after 12 PM.
function getCurrentHour() {

  var currentHour = new Date().getHours();

  if ( currentHour >= 12 ) {
    var alarmTime = 15;
  } else {
    var alarmTime = 30;
  }

  // console.log("The current hour is " + currentHour + ".");

  // Create the alarm:
  chrome.alarms.create('mailchimp-draft-reminder', {
    periodInMinutes: alarmTime
  });
}

getCurrentHour();




////////////////////////////// ### //////////////////////////////
////////////////////////////// ### //////////////////////////////
////_________________________________________________________////



chrome.alarms.onAlarm.addListener(function(alarm) {
  if (alarm.name == 'mailchimp-draft-reminder') {
    mailchimpCheckAndAlert();
  }
});




////////////////////////////// ### //////////////////////////////
////////////////////////////// ### //////////////////////////////
////_________________________________________________________////


var totalNotificationsSent;

function mailchimpCheckAndAlert() {

  logChromeStorage();

  getCurrentHour();

  chrome.storage.sync.get( function(result) {

    var pendingDraftsFromStorage = obj.pendingDrafts;
    var urgentDraftsFromSotrage = obj.urgentDrafts;

    if ( urgentDraftsFromSotrage > 0 ) {

      mailchimpDraftsNotification(urgentDraftsFromSotrage, pendingDraftsFromStorage);
      totalNotificationsSent++
      // console.log("Notifications Sent: " + totalNotificationsSent);

    }
  });

  // console.warn("10 minutes remaining until the next notification.");

}



////////////////////////////// ### //////////////////////////////
////////////////////////////// ### //////////////////////////////
////_________________________________________________________////



// Attempt to fire a notification when the browser or extension are first loaded.
// mailchimpCheckAndAlert();


function mailchimpDraftsNotification(urgentDraftsFromSotrage, pendingDraftsFromStorage) {
  if (Notification.permission !== "granted")
    Notification.requestPermission();
  else {
    console.log("Notification opened via eventPage.js.");
    var notification = new Notification(urgentDraftsFromSotrage + ' Urgent Drafts', {
      tag: "mailchimp", // Notifications with the same tag will replace each other instead of all showing up. - https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API/Using_the_Notifications_API#Replacing_existing_notifications
      icon: chrome.extension.getURL('img/mailchimp-notification.png'),
      body: "Hey there! You have " + urgentDraftsFromSotrage + " urgent drafts in MailChimp (and " + pendingDraftsFromStorage + " total pending drafts), get on it!",
      requireInteraction: true
    });

    // Automatically close after 3 minutes.
    setTimeout( function() {
      // notification.close.bind(notification);
      console.log(notification);
      notification.close();
      console.log("Notification scheduled for automatic dismissal right now. Dismissing if still present.");
    }, 180000);
    // }, 1800);

    // setTimeout(notification.close.bind(notification), 180000);

    notification.onclick = function () {
      // window.open("https://us2.admin.mailchimp.com/campaigns/");
      notification.close();
      console.log("Notification closed via click.");
    };

  }

}



// =================================
// =================================
// =================================
// =================================


var bkg = chrome.extension.getBackgroundPage();




// http://stackoverflow.com/a/26373282/556079
function saveMessage(data) {

  bkgUrl = data;

  if (data == null) {
  	chrome.contextMenus.update("backgroundImageAWS", { enabled: false });
  	chrome.contextMenus.update("viewBackgroundImg", { enabled: false });
  } else {
  	chrome.contextMenus.update("backgroundImageAWS", { enabled: true });
  	chrome.contextMenus.update("viewBackgroundImg", { enabled: true });
  }

  console.log("saveMessage function: " + bkgUrl);

}



////
//// MY FUNCTIONS
////

function trimUrl(url) {
 var url = url.replace(/(^("| +)|("| +)$)/gi, "");
 return url
}

function awsFilename(link) {
	var imgFile = link.replace(/^.+\//gi, "");
	return imgFile
}
function awsFilepath(link) {

  link = link.replace(/^.+?\.com/i, "");
	link = link.match(/^.+\//i, "");
  return link;

  //
	// var filePath = link.replace(/^.+?\.com\//gi, "");
	//     filePath = filePath.match(/^.+\//gi, "");
  //
	// var splitUrl = filePath.split("/");
	// splitUrl.pop();
  //
	// var arrayLength = splitUrl.length;
	// var awsPrefix = splitUrl[0];
  // awsPrefix = awsPrefix.replace(/\+/gi, "%20"); // Image URLs use a + for spaces in a folder name, but you have to %20 when looking at that folder on AWS.
  //
	// for (var i = 1; i < arrayLength; i++) {
	//     console.log(splitUrl[i]);
  //
	//     awsPrefix = awsPrefix + "/" + splitUrl[i];
	// }
  //
	// return awsPrefix
}

///////////////////////////////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////


////////////////////////////// ### //////////////////////////////
////////////////////////////// ### //////////////////////////////
////_________________________________________________________////


// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// The onClicked callback function.
function onClickHandler(info, tab) {
  if (info.menuItemId == "radio1" || info.menuItemId == "radio2") {
    console.log("radio item " + info.menuItemId +
                " was clicked (previous checked state was "  +
                info.wasChecked + ")");
  } else if (info.menuItemId == "checkbox1" || info.menuItemId == "checkbox2") {
    console.log(JSON.stringify(info));
    console.log("checkbox item " + info.menuItemId +
                " was clicked, state is now: " + info.checked +
                " (previous state was " + info.wasChecked + ")");

  }
  else if (info.menuItemId == "backgroundImageAWS") {
  	window.open("https://console.aws.amazon.com/s3/buckets" + awsFilepath(bkgUrl));
  }
  else if (info.menuItemId == "viewBackgroundImg") {
  	window.open(trimUrl(bkgUrl));
  }
  else if (info.menuItemId == "contextimage") {
  	window.open("https://console.aws.amazon.com/s3/buckets" + awsFilepath(info.srcUrl));
  }
  else {
    console.log("item " + info.menuItemId + " was clicked");
    console.log("info: " + JSON.stringify(info));
    console.log("tab: " + JSON.stringify(tab));
    console.log(awsFilename(info.srcUrl));
    console.log(awsFilepath(info.srcUrl));
  }
};



chrome.contextMenus.onClicked.addListener(onClickHandler);

// Set up context menu tree at install time.
chrome.runtime.onInstalled.addListener(function() {

  // Load the AWS page based on the Amazon Image that is clicked
  // Can I load different scripts based on the image clicked? And load different "title" text to match those different images?
  chrome.contextMenus.create({"title": "Open image folder in AWS", "contexts":["image"], "documentUrlPatterns": ["file:///*", "*://*.medbridgemassage.com/*", "*://s3.amazonaws.com/*", "*://*.medbridgeeducation.com/*", "http://localhost:4567/*", "*://*.dropbox.com/home/*", "*://*.dropbox.com/s/*", "*://*.dropboxusercontent.com/s/*"], "id": "context" + "image" });

  // Create one test item for each context type.
	  var contexts = ["all","page","selection","link","editable","video",
	                  "audio","browser_action","page_action"];
	  for (var i = 0; i < contexts.length; i++) {
	    var context = contexts[i];
	    var title = "Test '" + context + "' menu item";
	    var id = chrome.contextMenus.create({"title": title, "contexts":[context],
	                                         "id": "context" + context});
	    // console.log("'" + context + "' item:" + id);
	  }

  // Create a parent item and two children.

  chrome.contextMenus.create({"id": "sep", "type":'separator'});
  chrome.contextMenus.create({"title": "Test parent item", "id": "parent"});
  chrome.contextMenus.create(
      {"title": "Child 1", "parentId": "parent", "id": "child1"});
  chrome.contextMenus.create(
      {"title": "Child 2", "parentId": "parent", "id": "child2"});
  console.log("parent child1 child2");

  // Create some radio items.
  chrome.contextMenus.create({"title": "Radio 1", "type": "radio",
                              "id": "radio1"});
  chrome.contextMenus.create({"title": "Radio 2", "type": "radio",
                              "id": "radio2"});
  console.log("radio1 radio2");

  // Create some checkbox items.
  chrome.contextMenus.create(
      {"title": "Checkbox1", "type": "checkbox", "id": "checkbox1"});
  chrome.contextMenus.create(
      {"title": "Checkbox2", "type": "checkbox", "id": "checkbox2"});
  console.log("checkbox1 checkbox2");

  chrome.contextMenus.create({"title": "Radio 3", "type": "radio",
                              "id": "radio3"});

  chrome.contextMenus.create({"id": "sep2", "type":'separator'});


  chrome.contextMenus.create({"id": "sep1", "type":'separator'});

  chrome.contextMenus.create({"title": "Open image folder in AWS!", "contexts":["all"], "documentUrlPatterns": ["file:///*", "*://*.medbridgemassage.com/*", "*://*.medbridgeeducation.com/*", "http://localhost:4567/*", "*://*.dropbox.com/home/*", "*://*.dropbox.com/s/*", "*://*.dropboxusercontent.com/s/*"], "id": "backgroundImageAWS"});
  chrome.contextMenus.create({"title": "Open background image in new tab", "contexts":["all"], "documentUrlPatterns": ["*://*.medbridgemassage.com/*","*://*.medbridgeeducation.com/*","file:///*", "http://localhost:4567/*", "*://*.dropbox.com/home/*", "*://*.dropbox.com/s/*", "*://*.dropboxusercontent.com/s/*"], "id": "viewBackgroundImg"});


});
