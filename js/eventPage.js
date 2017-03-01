// !!!!!!!!!!!!!
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



// Log all data from chrome.storage.sync
// http://stackoverflow.com/a/27432365/556079
function logChromeStorage() {
  chrome.storage.sync.get(function(result) {
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

  console.log("The current hour is " + currentHour + ".");

  // Create the alarm:
  chrome.alarms.create('mailchimp-draft-reminder', {
    periodInMinutes: alarmTime
  });
}

getCurrentHour();




chrome.alarms.onAlarm.addListener(function(alarm) {
  if (alarm.name == 'mailchimp-draft-reminder') {
    mailchimpCheckAndAlert();
  }
});


var totalNotificationsSent;

function mailchimpCheckAndAlert() {

  logChromeStorage();

  getCurrentHour();

  chrome.storage.sync.get("pendingDrafts", function (obj) {

    var draftsFromStorage = obj.pendingDrafts;

    if ( draftsFromStorage > 0 ) {

      mailchimpDraftsNotification(draftsFromStorage);
      totalNotificationsSent++
      console.log("Notifications Sent: " + totalNotificationsSent);

    }

  });

  console.warn("10 minutes remaining until the next notification.");

}

// Attempt to fire a notification when the browser or extension are first loaded.
// mailchimpCheckAndAlert();


function mailchimpDraftsNotification(draftsFromStorage) {
  if (Notification.permission !== "granted")
    Notification.requestPermission();
  else {
    console.log("Notification opened via eventPage.js.");
    var notification = new Notification(draftsFromStorage + ' Pending Drafts', {
      tag: "mailchimp", // Notifications with the same tag will replace each other instead of all showing up. - https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API/Using_the_Notifications_API#Replacing_existing_notifications
      icon: chrome.extension.getURL('img/mailchimp-notification.png'),
      body: "Hey there! You have " + draftsFromStorage + " pending drafts in MailChimp, get on it!",
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


//
// If I want to share this extension, I need a way to make it easy to find/keep the Users/<namehere>/ value.
// Idea: Options page where they enter their mac name. Save that in the extension and use it as a variable.
//

var bkg = chrome.extension.getBackgroundPage();


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

  	console.log(request.greeting);

    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");


    // Check if the message sent is a url beginning with "file:"
    // Change current tab URL to a local version of this Dropbox file.
    // Chrome security settings do not allow pages to navigate to local files.
    // Using eventpages allows you to get around this limitation.
    if ( /^file:.+\//gi.test(request.greeting) ) {
  		chrome.tabs.update({
  		     url: request.greeting
  		});
    }

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

});



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
	var filePath = link.replace(/^.+medbridgemarketing\//gi, "");

	var splitUrl = filePath.split("/");
	splitUrl.pop();

	var arrayLength = splitUrl.length;
	var awsPrefix = splitUrl[0];
  awsPrefix = awsPrefix.replace(/\+/gi, "%20"); // Image URLs use a + for spaces in a folder name, but you have to %20 when looking at that folder on AWS.

	for (var i = 1; i < arrayLength; i++) {
	    console.log(splitUrl[i]);

	    awsPrefix = awsPrefix + "/" + splitUrl[i];
	}

	return awsPrefix
}

///////////////////////////////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////



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
  	window.open("https://console.aws.amazon.com/s3/home?region=us-east-1#&bucket=medbridgemarketing&prefix=" + awsFilepath(bkgUrl));
  }
  else if (info.menuItemId == "viewBackgroundImg") {
  	window.open(trimUrl(bkgUrl));
  }
  else if (info.menuItemId == "contextimage") {
  	window.open("https://console.aws.amazon.com/s3/home?region=us-east-1#&bucket=medbridgemarketing&prefix=" + awsFilepath(info.srcUrl));
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
	    console.log("'" + context + "' item:" + id);
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
