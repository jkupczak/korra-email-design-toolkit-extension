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

    if (request.greeting == "hello") {
      sendResponse({farewell: "goodbye"});
    }

    sharePath = request.greeting;
    console.log(sharePath);

});



//
// ICON CLICK ACTION
// Do this when icon is clicked.
//
chrome.browserAction.onClicked.addListener(function(tab) {

	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {


		var currUrl = tabs[0].url

		if ( /^https?:\/\/(www\.)?dropbox\.com\/home\//.test(currUrl) ) { // If the current URL is on Dropbox, and is not a shortened link.
			var newUrl = currUrl.replace(/https?:\/\/(www\.)?dropbox\.com\/home\//gi, "file:///Users/jameskupczak/Dropbox%20(MedBridge%20.)/");
			var newUrl = newUrl.replace(/\/?\?preview=/gi, "\/");
		} 

		else if ( /^https?:\/\/(www\.)?dropbox\.com\/s\//.test(currUrl) ) { // Else, if the URL is shortened.

			var filename = currUrl.replace(/(https?:\/\/(www\.)?dropbox\.com\/s\/.+?\/|\?dl=.+)/gi, "");

			var newUrl = "file:///Users/jameskupczak/Dropbox%20(MedBridge%20.)" + sharePath + filename

		} else if ( /^https?:\/\/(dl\.)?dropboxusercontent\.com\/s\//.test(currUrl) ) { // Else, if the URL is dl.dropboxusercontent.com

			var newUrl = currUrl.replace(/(https?:\/\/(dl\.)?dropboxusercontent\.com\/s\/.+?\/|\?dl.+)/gi, "");

			var splitUrl = newUrl.split("-",6);

			var discipline = splitUrl[3];
			var year       = splitUrl[0];
			var fullYear   = "20" + year;
			var month      = splitUrl[1];
			var fullMonth  = "";
			var day        = splitUrl[2];
			var author     = splitUrl[5];
			var filename = newUrl;

			if ( month === "01" ) { fullMonth = "Jan" }
				else if ( month === "02" ) { fullMonth = "Feb" }
				else if ( month === "03" ) { fullMonth = "Mar" }
				else if ( month === "04" ) { fullMonth = "Apr" }
				else if ( month === "05" ) { fullMonth = "May" }
				else if ( month === "06" ) { fullMonth = "June" }
				else if ( month === "07" ) { fullMonth = "July" }
				else if ( month === "08" ) { fullMonth = "Aug" }
				else if ( month === "09" ) { fullMonth = "Sept" }
				else if ( month === "10" ) { fullMonth = "Sept" }
				else if ( month === "11" ) { fullMonth = "Nov" }
				else if ( month === "12" ) { fullMonth = "Dec" }


			var newUrl = "file:///Users/jameskupczak/Dropbox%20(MedBridge%20.)/Marketing%202/Campaigns/Email/" + discipline + "/" + fullYear + "/" + fullMonth + "-" + discipline + "/" + year + "-" + month + "-" + day + "-" + author + "/" + filename

		}

		else { // Else, it's a local file.
			var newUrl = currUrl.replace(/file:\/\/\/Users\/(jameskupczak)?\/Dropbox%20\(MedBridge%20\.\)\//gi, "https://www.dropbox.com/home/");
		}

		chrome.tabs.update({
		     url: newUrl
		});

	});

});



////
//// MY FUNCTIONS
////

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

  } else if (info.menuItemId == "contextimage") {
  	window.open("https://console.aws.amazon.com/s3/home?region=us-east-1#&bucket=medbridgemarketing&prefix=" + awsFilepath(info.srcUrl));
  } else {
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

  // Create one test item for each context type.
	  // var contexts = ["page","selection","link","editable","image","video",
	  //                 "audio"];
	  // for (var i = 0; i < contexts.length; i++) {
	  //   var context = contexts[i];
	  //   var title = "Test '" + context + "' menu item";
	  //   var id = chrome.contextMenus.create({"title": title, "contexts":[context],
	  //                                        "id": "context" + context});
	  //   console.log("'" + context + "' item:" + id);
	  // }

  // Load the AWS page based on the Amazon Image that is clicked
  // Can I load different scripts based on the image clicked? And load different "title" text to match those different images?
  chrome.contextMenus.create({"title": "Open image folder on AWS", "contexts":["image"], "id": "context" + "image"});

  // Create a parent item and two children.
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


});