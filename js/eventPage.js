// !!!!!!!!!!!!!
// NO DOM ACCESS
// !!!!!!!!!!!!!


//
// If I want to share this extension, I need a way to make it easy to find/keep the Users/<namehere>/ value.
//

var bkg = chrome.extension.getBackgroundPage();
bkg.console.log('foo');



chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

  	console.log(request.greeting);

    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");


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
  chrome.contextMenus.create({"title": "View image folder on AWS", "contexts":["image"], "documentUrlPatterns": ["*://*.medbridgemassage.com/*","*://*.medbridgeeducation.com/*","file:///*", "*://*.dropbox.com/home/*", "*://*.dropbox.com/s/*", "*://*.dropboxusercontent.com/s/*"], "id": "context" + "image" });

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

  chrome.contextMenus.create({"title": "View background image folder on AWS", "contexts":["all"], "documentUrlPatterns": ["*://*.medbridgemassage.com/*","*://*.medbridgeeducation.com/*","file:///*", "*://*.dropbox.com/home/*", "*://*.dropbox.com/s/*", "*://*.dropboxusercontent.com/s/*"], "id": "backgroundImageAWS"});
  chrome.contextMenus.create({"title": "Open background image in new tab", "contexts":["all"], "documentUrlPatterns": ["*://*.medbridgemassage.com/*","*://*.medbridgeeducation.com/*","file:///*", "*://*.dropbox.com/home/*", "*://*.dropbox.com/s/*", "*://*.dropboxusercontent.com/s/*"], "id": "viewBackgroundImg"});


});
