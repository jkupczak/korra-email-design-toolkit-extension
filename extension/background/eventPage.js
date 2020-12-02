// @TODO - What if the user doesn't sync their storage? Do I need to code for that?
// @TODO -
// @TODO -
// @TODO -
// @TODO -
// @TODO -
// @TODO -

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
//
//
//    Getting Options
//
//
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////


// Log all data from chrome.storage.sync
// http://stackoverflow.com/a/27432365/556079

let options = {};
var getOptions = function() {

  // Get Sync
  chrome.storage.sync.get(function(result) {
    options.sync = result;
    console.log(options);

    checkForPresetSettings("sync", defaultSyncSettings, options.sync);

    // // Open Options Pinned?
    // if ( result.openPinnedOptions === "1" ) {
    //   openOptionsTab({pinned: true, active: false});
    // }



  });

  // Get Local
  chrome.storage.local.get(function(result) {
    options.local = result;
    console.log(options);

    checkForPresetSettings("local", defaultLocalSettings, options.local);

    // Remove any existing webRequest listeners
    chrome.webRequest.onBeforeRequest.removeListener(openFromDropbox);
    chrome.webRequest.onBeforeRequest.removeListener(openFromLocalURL);
    chrome.webRequest.onBeforeRequest.removeListener(openFromLocalServer);
    chrome.webRequest.onBeforeRequest.removeListener(logAllRequests);

          // @todo
          // Figure out ASYNC. These webRequests are reliant on data in the options.
          // So I can't use them until we've asynchronously retrieved options from storage.
          // I'd prefer it if we didn't have to stick it all inside this block
          //
          // Redirect Links using webRequest blocking.
          // https://developer.chrome.com/extensions/webRequest

          /////////////////////////
          //
          // Watching EVERYTHING
          //
          /////////////////////////

          // webRequest Listener
          ///////////////////////////
          chrome.webRequest.onBeforeRequest.addListener( logAllRequests,
            {
              urls: ["<all_urls>"],
              types: ['main_frame']
            }
          );
          console.log("initiated webRequest listener for EVERYTHING in main_frame");

          //  === DEPRECATED
          //  === Briefly used to overwrite requests for images at relative URLs.
          // webRequest Listener
          ///////////////////////////
              // chrome.webRequest.onBeforeRequest.addListener( imageRequests,
              //   {
              //     urls: [chrome.extension.getURL('*')],
              //     types: ['image']
              //     },
              //     ['blocking']
              // );
              // console.log("initiated webRequest listener for images,", [chrome.extension.getURL('*')]);

          /////////////////////////
          //
          // Watching dropbox
          //
          /////////////////////////

          // Only add a listener for Dropbox if auto-redirect is set to on.
          if ( options.sync.autoRedirectDropboxLinkstoLocal === "1" ) {
            // webRequest Listener
            chrome.webRequest.onBeforeRequest.addListener( openFromDropbox,
              {
                urls: ["*://*.dropbox.com/s/*/*?dl=1", "*://*.dropboxusercontent.com/s/*"]
              },
              ['blocking']
            );
            console.log("initiated webRequest listener for dropbox");
          }



          /////////////////////////
          //
          // Watched file extensions
          //
          /////////////////////////

          // Convert watchedExtensions to an array using split
          let watchedExtensions = options.sync.watchedExtensions.split(",");
          console.log("watchedExtensions", watchedExtensions);



          /////////////////////////
          //
          // Watching local servers
          //
          /////////////////////////

          // ensure that watchedServers exists and is longer than 0.
          if ( !isUndefined(options.local.watchedServers) && options.local.watchedServers.length > 0 ) {

            // Convert watchedServers to an array using split
            let watchedServers = options.local.watchedServers.split("\n");
            console.log("watchedServers", watchedServers);

            let serverWatchList = [];
            watchedServers.forEach(function (server, index) {

              if ( server.length > 0 ) {
                watchedExtensions.forEach(function (extension, index) {
                  serverWatchList.push( server.trim().replace(/\/+$/,"") + "/*" + extension.trim() );
                });
              }

            });

            console.log("serverWatchList", serverWatchList);

            // webRequest Listener
            // onBeforeRequest is too early, the DOM isn't ready
            chrome.webRequest.onBeforeRequest.addListener( openFromLocalServer,
              {
                urls: serverWatchList,
                types: ['main_frame'] // prevents this from running on requests from iframes
              },
              ['blocking']
            );
            console.log("initiated webRequest listener for serverWatchList");

          }
          else {
            console.log("user is not watching any local servers");
          }


          /////////////////////////
          //
          // Watching local folders
          //
          /////////////////////////

          let localPathWatchList = [];

          // check if the user has indicated that they'd only like to watch specific local folders
          if ( !isUndefined(options.local.watchedFoldersEncoded) && options.local.watchedFoldersEncoded.length > 0 ) {

            // Convert watchedExtensions to an array using split
            const watchedFolders = options.local.watchedFoldersEncoded;
            console.log("watchedFolders", watchedFolders);

            watchedFolders.forEach(function (path, index) {

              if ( path.length > 0 ) {
                watchedExtensions.forEach(function (extension, index) {
                  localPathWatchList.push( "file:///" + path + "/*" + extension.trim() );
                });
              }

            });

          // watchedFolders was blank or undefined, so we will watch ALL paths
          } else {

            watchedExtensions.forEach(function (extension, index) {
              localPathWatchList.push( "file:///*" + extension.trim() );
            });

          }
          console.log("localPathWatchList", localPathWatchList);


          // webRequest Listener
          ///////////////////////////
          chrome.webRequest.onBeforeRequest.addListener( openFromLocalURL,
            {
              urls: localPathWatchList, // won't match local files with a querystring at the end.
              types: ['main_frame']
            },
            ['blocking']
          );
          console.log("initiated webRequest listener for localPathWatchList");



  });
};
getOptions();

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
//
//   > Check for Default Settings
//
//   Whenever the background page is loaded, we're going to check the local and
//   sync storages to make sure that default settings have been declared.
//
//   This is important for when new default settings are designed for Korra.
//
//   Without this check, a new setting will not have a value in an existing
//   install of Korra until the user navigates to the options.html page
//   and modifies that setting specifically.
//
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

function checkForPresetSettings(location, presetSettings, savedSettings) {

  console.group("checkForPresetSettings() in", location, "storage");

  // Function to compare keys
	var compare = function (key, preset, saved) {

    console.group(key);
    console.log("preset:", preset);
    console.log("saved:", saved);

    // We've attempted to pull in a key from saved storage that matches a key in our default settings.
    // If this variable returns as undefined, that means it doesn't exist in storage.
    // Knowing this we can use the default setting and save it to storage
    if ( saved === undefined ) {
      console.error(key, "key is missing in storage. It needs to be set with a value of \"" + JSON.stringify(preset) + "\"");
      _set(location, {[key]: preset});
    }
    // the default setting key was found in storage, do nothing
    else {
      console.log("found matching key in storage");
    }

    console.groupEnd();
	};

  // Loop through the constant defaultSyncSettings variable
	for (var key in presetSettings) {

	  compare(key, presetSettings[key], savedSettings[key]);

	}

  console.groupEnd();
}



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

  // If this is a new install...
  if ( details.reason == 'install' || options.sync.defaultSyncOptionsLoaded !== 'true' ) {

    // Set default options to storage
    // @TODO I need to check for this value before setting the default options.
    // If its true, we want to set the sync options with data from storage rather than using defaults
    setDefaultOptions( {set: {sync: true, local: true}} );

    // Show start page to provide instructions
    // showStartPage();

  }

  if ( details.reason == 'update' ) {

    // show 'whats new' modal the next time an email is loaded
    chrome.tabs.create({
      url: 'whats-new.html'
    });

  }

}

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
//
//
//    Functions
//
//
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

// Function to process requests for files on dropbox.com
///////////
var openFromDropbox = function(details) {
  console.log("navigated to dropbox file");
  console.log(details);

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

  return { redirectUrl: newUrl };

};

// Function to process requests for files on the local harddrive
///////////
var openFromLocalURL = function(details) {
  console.log("  > navigated to a local file, redirecting to extension page preview.html");
  console.log("  > local URL visited:", details.url);
  console.log("  > redirecting to:", chrome.extension.getURL('preview.html?open='));
  console.log("  > `open` value:", encodeURIComponent(details.url));

  // encode the filename, encodeURIComponent will encode everything except for ~!*()'
  return { redirectUrl: chrome.extension.getURL('preview.html?open=') + encodeURIComponent(details.url) };
};

// Function to process requests for file on local servers
// In order to keep the functionality of the local server, Korra handles these requests differently.
// Instead of redirecting the whole page, Korra injects an iframe and loads the extension page inside that.
// This keeps the user on their local server page so that things like auto-reload continue to work
// This is done by adding ?korra=hijack to the end of the server URL on every page refresh
// Korra see the querystring on page load and gets to work
///////////
var openFromLocalServer = function(details) {

    console.log("  > navigated to a local server");
    console.log("  > ", details.url);

    // @TODO need to take into consideration that the server URL might already have a querystring,
    // in which case this needs to change to "&="
    return { redirectUrl: details.url + "?korra=hijack" };
};

var logAllRequests = function(details) {

  console.log("___");
  console.log("tracking requests made to <all_urls> in the main_frame, new request:", details.url, details);

};

//  === DEPRECATED
//  === Briefly used to overwrite requests for images at relative URLs.
////////
//
//  This function helps us support relative image URLs.
//
//  By default relative image URLs don't work in Korra because we load the users HTML in an iframe with the src "about:blank".
//  We need to do this so that we can freely modify the code as we see fit.
//  The downside is that since the src is not a valid address, the origin of the iframe is "chrome-extension://...."
//  Relative images will use this origin instead of the file system path.
//  The solution we came up with was to block image requests in the background and then rewrite the URL.
//  This method does not support relative images links that use ../../ to go up the folder structure.
//  This function relies on a webRequest event listener.
//  ---
//  This function only fires on webrequests where the URL requested is the Extension protocol + the unique ID.
//  ---
//  See this issue on Github:
//  https://github.com/jkupczak/korra-email-design-toolkit-extension/issues/94
//

    // var imageRequests = function(details) {
    //
    //   var newUrl;
    //
    //   console.log( details.tabId );
    //   console.log( tabInfo[details.tabId] );
    //
    //   // Determine if this came from an iframe inside of the Korra extension page.
    //   if ( details.parentFrameId === 0 ) {
    //
    //     console.log("___");
    //     console.log("tracking requests made to <all_urls> for images, new request:", details.url, details);
    //
    //     newUrl = "file://" + tabInfo[details.tabId].filePath + "/" + details.url.replace(/chrome\-extension\:\/\/.*?\//i, "");
    //
    //   }
    //
    //   // If it didn't, then this is just Korra requesting its own images. We don't need to change the URL.
    //   else {
    //     newUrl = details.url;
    //   }
    //
    //   return { redirectUrl: newUrl };
    //
    // };



///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////





// Helper function to open up the options page
var openOptionsTab = function(options) {

  var defaults = {
		url: chrome.extension.getURL('/options/options.html')
	};

  if ( options.shortcut ) {
    defaults.url = defaults.url + options.shortcut;
  }
  if ( options.pinned ) {
    defaults.pinned = options.pinned;
  }
  defaults.active = options.active;


  chrome.tabs.create(defaults);

};


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
// chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//   chrome.tabs.reload(tabs[0].id);
// });



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

function callback(data) {
  console.log(data);
}

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
    chrome.browserAction.setBadgeBackgroundColor({color: [0,0,0,100]}); // Black badge
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

  if ( localStorage.fileAccessOff ) {
    // showStartPage(1);
  } else {
    // Show popup HTML with information.
    // Until that's ready, show options.html instead
    // chrome.tabs.create({ url: chrome.extension.getURL('options.html') });

    // Temporarily off
    // chrome.runtime.reload();

  }

});

//
// Set the default options to chrome.storage.sync
// Used on first initilization (first install)
// and whenever the user specifically requests to reset all options to defaullt.
function setDefaultOptions(a) {

  console.log(actions);

  // Defaults
  var defaults = {
    clear: {
      sync: "",
      local: ""
    },
    set: {
      sync: "",
      local: ""
    }
  };


  var actions = Object.assign({}, defaults, a);

  //////////////////
  // clear storage if we're resetting the options
  if (actions.clear.sync) {
    chrome.storage.sync.clear(function() {
      var error = chrome.runtime.lastError;
      if (error) {
        console.error(error);
      }
    });
  }
  if ( actions.clear.local ) {
    chrome.storage.local.clear(function() {
      var error = chrome.runtime.lastError;
      if (error) {
        console.error(error);
      }
    });
  }

  //////////////////
  // set the default options for sync storage
  if ( actions.set.sync ) {
    chrome.storage.sync.set(defaultSyncSettings);
  }
  // set the default options for local storage
  if ( actions.set.local ) {
    chrome.storage.local.set(defaultLocalSettings);
  }

}


// Determine if the extension has access to local files.
function checkForFileAccessOption() {

	chrome.extension.isAllowedFileSchemeAccess(function (answer) {

    // console.log("chrome.extension.isAllowedFileSchemeAccess", answer);
    // console.log("localStorage.fileAccessOff", localStorage.fileAccessOff);

			if (answer) {
        // console.log("a", localStorage.fileAccessOff);
					if (localStorage.fileAccessOff) {
							localStorage.removeItem('fileAccessOff');
							// showStartPage(2);
              console.log(localStorage["b", "fileAccessOff"]);
					}
          // console.log("c", localStorage.fileAccessOff);
			} else {
				localStorage.fileAccessOff = true;
        // console.log("d", localStorage.fileAccessOff);
			}
	});

}
checkForFileAccessOption();


// Function to determine what content should be shown
// Skip step 1 if needed (page that shows how to turn on file access)
function sss() {

}

function showStartPage() {

  console.log(arguments);

    var step = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

  console.log(step);

		var path = 'startpage/index.html';
		if (step > 0) {
				path += '#step-' + step;
		}
		chrome.tabs.create({ url: chrome.extension.getURL(path) });
}


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

// IndexedDB Databases

//
// Define your databases
//
const db = new Dexie("korra_database");
db.version(1).stores({
    emails: 'location,lastViewed',
    links: 'url,details'
});

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


// Variables
var tabInfo = {};
var saveTabInfo = function(tabId, data) {

  tabInfo[tabId] = data;

  console.log(tabInfo);

};

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

    // Show all frames from the requester tab.
    // var gettingAllFrames = chrome.webNavigation.getAllFrames({tabId: sender.tab.id});
    // console.log( gettingAllFrames );

    ////
    // Output to the console the message we received.
    ////
    console.group('sendMessage received');
    	console.log("request", request);
    	console.log("sender", sender);
      console.log("tabId:", sender.tab.id, sender.tab ?
                  "Message received from a content script: " + sender.tab.url :
                  "from the extension");
    console.groupEnd();


    ////
    if (request.cmd === "shutdown") {
      sendResponse({farewell: "goodbye"});
    }

    ////
    if (request.type === "tabInfo") {
      saveTabInfo(sender.tab.id, request.data);
    }

    ////
    // Request from the popup.js file
    if (request.type === "viewDropboxFile") {
      saveTabInfo(sender.tab.id, request.data);

      var localUrl = chrome.extension.getURL('preview.html?open=') + "file:///" + options.local.fullPathToDropboxFolderEncoded + "/" + request.message.url;

  		chrome.tabs.update(sender.tab.id, {
  		    url: localUrl
  		});

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
    if ( /dropbox\.com/gi.test(sender.tab.url) ) {

      initDropboxRedirect(request, sender);

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

    ///////////////////////
    ///////////////////////
    ///////////////////////
    if ( request.saveEmailLocation ) {

      // do something
      console.log( request );
      console.log( request.saveEmailLocation );

      //
      // Put some data into the emails db
      //
      db.emails.put({location: request.saveEmailLocation, lastViewed: + new Date()}).then (function(){
          //
          // Then when data is stored, read from it
          //
          return db.emails.get(request.saveEmailLocation);
      }).then(function (email) {
          //
          // Display the result
          //
          console.log("location " + email.location);
          console.log("timestamp " + email.lastViewed);
      }).catch(function(error) {
         //
         // Finally don't forget to catch any error
         // that could have happened anywhere in the
         // code blocks above.
         //
         console.log("Ooops: " + error);
      });

    }

    ///////////////////////
    ///////////////////////
    ///////////////////////
    if ( request.queryEmailTable ) {

      console.log(request.queryEmailTable);

    }


    // Open the Options page
    ////////////////////////
    if ( request.openOptions ) {

      // var optionsShortcut = chrome.extension.getURL('options.html');
      var options = {index: sender.tab.index + 1};

      // Link directly to a specific section.
      if ( /^section\-/gi.test(request.openOptions) ) {
        options.shortcut = "#" + request.openOptions;
      }

      openOptionsTab(options);

    }

    // Get right-click background image message
    // Use a function to save it outside of this listener.
    // http://stackoverflow.com/a/26373282/556079
    saveMessage(request.bkgUrl);

    ////
    // There might be a reason we need this. Look it up and document why.
    return true;

  });



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

// ### No longer using

        // // Check the time. Display alerts more frequently after 12 PM.
        // function getCurrentHour() {
        //
        //   var currentHour = new Date().getHours();
        //
        //   if ( currentHour >= 12 ) {
        //     var alarmTime = 15;
        //   } else {
        //     var alarmTime = 30;
        //   }
        //
        //   // console.log("The current hour is " + currentHour + ".");
        //
        //   // Create the alarm:
        //   chrome.alarms.create('mailchimp-draft-reminder', {
        //     periodInMinutes: alarmTime
        //   });
        // }
        //
        // getCurrentHour();




////////////////////////////// ### //////////////////////////////
////////////////////////////// ### //////////////////////////////
////_________________________________________________________////


// ### no longer using

        // chrome.alarms.onAlarm.addListener(function(alarm) {
        //   if (alarm.name == 'mailchimp-draft-reminder') {
        //     mailchimpCheckAndAlert();
        //   }
        // });




////////////////////////////// ### //////////////////////////////
////////////////////////////// ### //////////////////////////////
////_________________________________________________________////


// ### No longer using

      // var totalNotificationsSent;
      //
      // function mailchimpCheckAndAlert() {
      //
      //   logChromeStorage();
      //
      //   getCurrentHour();
      //
      //   chrome.storage.sync.get( function(result) {
      //
      //     var pendingDraftsFromStorage = obj.pendingDrafts;
      //     var urgentDraftsFromSotrage = obj.urgentDrafts;
      //
      //     if ( urgentDraftsFromSotrage > 0 ) {
      //
      //       mailchimpDraftsNotification(urgentDraftsFromSotrage, pendingDraftsFromStorage);
      //       totalNotificationsSent++
      //       // console.log("Notifications Sent: " + totalNotificationsSent);
      //
      //     }
      //   });
      //
      //   // console.warn("10 minutes remaining until the next notification.");
      //
      // }



////////////////////////////// ### //////////////////////////////
////////////////////////////// ### //////////////////////////////
////_________________________________________________________////



// Attempt to fire a notification when the browser or extension are first loaded.
// mailchimpCheckAndAlert();


// ### No longer using

      // function mailchimpDraftsNotification(urgentDraftsFromSotrage, pendingDraftsFromStorage) {
      //   if (Notification.permission !== "granted")
      //     Notification.requestPermission();
      //   else {
      //     console.log("Notification opened via eventPage.js.");
      //     var notification = new Notification(urgentDraftsFromSotrage + ' Urgent Drafts', {
      //       tag: "mailchimp", // Notifications with the same tag will replace each other instead of all showing up. - https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API/Using_the_Notifications_API#Replacing_existing_notifications
      //       icon: chrome.extension.getURL('img/mailchimp-notification.png'),
      //       body: "Hey there! You have " + urgentDraftsFromSotrage + " urgent drafts in MailChimp (and " + pendingDraftsFromStorage + " total pending drafts), get on it!",
      //       requireInteraction: true
      //     });
      //
      //     // Automatically close after 3 minutes.
      //     setTimeout( function() {
      //       // notification.close.bind(notification);
      //       console.log(notification);
      //       notification.close();
      //       console.log("Notification scheduled for automatic dismissal right now. Dismissing if still present.");
      //     }, 180000);
      //     // }, 1800);
      //
      //     // setTimeout(notification.close.bind(notification), 180000);
      //
      //     notification.onclick = function () {
      //       // window.open("https://us2.admin.mailchimp.com/campaigns/");
      //       notification.close();
      //       console.log("Notification closed via click.");
      //     };
      //
      //   }
      //
      // }



// =================================
// =================================
// =================================
// =================================


var bkg = chrome.extension.getBackgroundPage();



////
//// MY FUNCTIONS
////

function trimUrl(url) {
 var url = url.replace(/(^("| +)|("| +)$)/gi, "");
 return url;
}

function awsFilename(link) {
	var imgFile = link.replace(/^.+\//gi, "");
	return imgFile
}
function awsFilepath(link) {

  link = link.replace(/^.+?\.com/i, "");
	link = link.match(/^.+\//i, "");
  return link;

}

///////////////////////////////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////


////////////////////////////// ### //////////////////////////////
////////////////////////////// ### //////////////////////////////
////_________________________________________________________////


// chrome.extension.onMessage.addListener(onRequest);
// var beginLinkCheck = function beginLinkCheck(tab) {
//     chrome.tabs.executeScript(tab.id, {file:'functions.js'});
//     chrome.tabs.executeScript(tab.id, {file:'check.js'}, function () {
//         chrome.tabs.sendMessage(tab.id, {options:getOptions(), action:"initial"});
//     });
// };
// chrome.tabs.onUpdated.addListener(function(tabid, changeinfo, tab) {
//     chrome.tabs.query({active: true, currentWindow: true}, function(arrayOfTabs) {
//      var activeTab = arrayOfTabs[0];
//      //If the active tab was updated
//      if(activeTab.id == tab.id){
//         var url = tab.url;
//         if (url !== undefined && changeinfo.status == "complete" && getItem("autoCheck")=="true") {
//           beginLinkCheck(tab);
//         }
//      }
//   });
// });

///// CONTEXT MENUS
///// CONTEXT MENUS
///// CONTEXT MENUS
///// CONTEXT MENUS
                      //
                      //
                      // // http://stackoverflow.com/a/26373282/556079
                      // function saveMessage(data) {
                      //
                      //   bkgUrl = data;
                      //
                      //   if (data == null) {
                      //   	chrome.contextMenus.update("backgroundImageAWS", { enabled: false });
                      //   	chrome.contextMenus.update("viewBackgroundImg", { enabled: false });
                      //   } else {
                      //   	chrome.contextMenus.update("backgroundImageAWS", { enabled: true });
                      //   	chrome.contextMenus.update("viewBackgroundImg", { enabled: true });
                      //   }
                      //
                      //   console.log("saveMessage function: " + bkgUrl);
                      //
                      // }

                      //
                      // ////////////////////////////// ### //////////////////////////////
                      // ////////////////////////////// ### //////////////////////////////
                      // ////_________________________________________________________////
                      //
                      //
                      // // What does this do?
                      // chrome.contextMenus.onClicked.addListener(onClickHandler);
                      //
                      //
                      // // Copyright (c) 2012 The Chromium Authors. All rights reserved.
                      // // Use of this source code is governed by a BSD-style license that can be
                      // // found in the LICENSE file.
                      //
                      // // The onClicked callback function.
                      // function onClickHandler(info, tab) {
                      //
                      //   if (info.menuItemId == "validateLinks") {
                      //     beginLinkCheck();
                      //   }
                      //
                      //   else if (info.menuItemId == "radio1" || info.menuItemId == "radio2") {
                      //     console.log("radio item " + info.menuItemId +
                      //                 " was clicked (previous checked state was "  +
                      //                 info.wasChecked + ")");
                      //   }
                      //
                      //   else if (info.menuItemId == "checkbox1" || info.menuItemId == "checkbox2") {
                      //     console.log(JSON.stringify(info));
                      //     console.log("checkbox item " + info.menuItemId +
                      //                 " was clicked, state is now: " + info.checked +
                      //                 " (previous state was " + info.wasChecked + ")");
                      //
                      //   }
                      //   else if (info.menuItemId == "backgroundImageAWS") {
                      //   	window.open("https://console.aws.amazon.com/s3/buckets" + awsFilepath(bkgUrl));
                      //   }
                      //   else if (info.menuItemId == "viewBackgroundImg") {
                      //   	window.open(trimUrl(bkgUrl));
                      //   }
                      //   else if (info.menuItemId == "contextimage") {
                      //   	window.open("https://console.aws.amazon.com/s3/buckets" + awsFilepath(info.srcUrl));
                      //   }
                      //   else {
                      //     console.log("item " + info.menuItemId + " was clicked");
                      //     console.log("info: " + JSON.stringify(info));
                      //     console.log("tab: " + JSON.stringify(tab));
                      //     console.log(awsFilename(info.srcUrl));
                      //     console.log(awsFilepath(info.srcUrl));
                      //   }
                      // };
                      //
                      //
                      //
                      // ///////////////////////////////////
                      // ///////////////////////////////////
                      // ///////////////////////////////////
                      //
                      //
                      // // Set up context menu tree at install time.
                      // chrome.runtime.onInstalled.addListener(function() {
                      //
                      //   // 'Validate Links' on this page
                      //   chrome.contextMenus.create({
                      //     "title": "Validate Links",
                      //     "contexts": ["all"],
                      //     "documentUrlPatterns": ["file:///*", "*://*/*"],
                      //     "id": "validateLinks"
                      //   });
                      //
                      //   // Separator
                      //   chrome.contextMenus.create({ "id": "sep", "type":'separator' });
                      //
                      //   // AMAZON
                      //   // Load the AWS page based on the Amazon Image that is clicked
                      //   // Can I load different scripts based on the image clicked? And load different "title" text to match those different images?
                      //   chrome.contextMenus.create({
                      //     "title": "Open image folder in AWS",
                      //     "contexts": ["image"],
                      //     "documentUrlPatterns": ["file:///*", "*://*.medbridgemassage.com/*", "*://s3.amazonaws.com/*", "*://*.medbridgeeducation.com/*", "http://localhost:4567/*", "*://*.dropbox.com/home/*", "*://*.dropbox.com/s/*", "*://*.dropboxusercontent.com/s/*"],
                      //     "id": "context" + "image"
                      //   });
                      //
                      //   // Create one test item for each context type.
                      //   var contexts = ["all", "page", "selection", "link", "editable", "video", "audio", "browser_action", "page_action"];
                      //
                      //   for (var i = 0; i < contexts.length; i++) {
                      //     var context = contexts[i];
                      //     var title = "Test '" + context + "' menu item";
                      //     var id = chrome.contextMenus.create({
                      //       "title": title,
                      //       "contexts": [context],
                      //       "id": "context" + context
                      //     });
                      //     // console.log("'" + context + "' item:" + id);
                      //   }
                      //
                      //
                      //   // Separator
                      //   // Commented out, was causing an error
                      //   // chrome.contextMenus.create({ "id": "sep", "type":'separator' });
                      //
                      //
                      //   // Create a parent item and two children.
                      //   chrome.contextMenus.create({
                      //     "title": "Test parent item",
                      //     "id": "parent"
                      //   });
                      //
                      //   chrome.contextMenus.create({
                      //     "title": "Child 1",
                      //     "parentId": "parent",
                      //     "id": "child1"
                      //   });
                      //
                      //   chrome.contextMenus.create({
                      //     "title": "Child 2",
                      //     "parentId": "parent",
                      //     "id": "child2"
                      //   });
                      //   console.log("parent child1 child2");
                      //
                      //   // Create some radio items.
                      //   chrome.contextMenus.create({
                      //     "title": "Radio 1",
                      //     "type": "radio",
                      //     "id": "radio1"
                      //   });
                      //
                      //   chrome.contextMenus.create({
                      //     "title": "Radio 2",
                      //     "type": "radio",
                      //     "id": "radio2"
                      //   });
                      //   console.log("radio1 radio2");
                      //
                      //   // Create some checkbox items.
                      //   chrome.contextMenus.create({
                      //     "title": "Checkbox1",
                      //     "type": "checkbox",
                      //     "id": "checkbox1"
                      //   });
                      //
                      //   chrome.contextMenus.create({
                      //     "title": "Checkbox2",
                      //     "type": "checkbox",
                      //     "id": "checkbox2"
                      //   });
                      //   console.log("checkbox1 checkbox2");
                      //
                      //   chrome.contextMenus.create({
                      //     "title": "Radio 3",
                      //     "type": "radio",
                      //     "id": "radio3"
                      //   });
                      //
                      //   chrome.contextMenus.create({
                      //     "id": "sep2",
                      //     "type": "separator"
                      //   });
                      //
                      //   chrome.contextMenus.create({
                      //     "id": "sep1",
                      //     "type": "separator"
                      //   });
                      //
                      //   chrome.contextMenus.create({
                      //     "title": "Open image folder in AWS!",
                      //     "contexts": ["all"],
                      //     "documentUrlPatterns": ["file:///*", "*://*.medbridgemassage.com/*", "*://*.medbridgeeducation.com/*", "http://localhost:4567/*", "*://*.dropbox.com/home/*", "*://*.dropbox.com/s/*", "*://*.dropboxusercontent.com/s/*"],
                      //     "id": "backgroundImageAWS"
                      //   });
                      //
                      //   chrome.contextMenus.create({
                      //     "title": "Open background image in new tab",
                      //     "contexts": ["all"],
                      //     "documentUrlPatterns": ["*://*.medbridgemassage.com/*","*://*.medbridgeeducation.com/*","file:///*", "http://localhost:4567/*", "*://*.dropbox.com/home/*", "*://*.dropbox.com/s/*", "*://*.dropboxusercontent.com/s/*"],
                      //     "id": "viewBackgroundImg"
                      //   });
                      //
                      //
                      // });


/////////////////
/////////////////
/////////////////

var initDropboxRedirect = function(request, sender) {

    console.log( options );
    console.log( request.message.type, options.sync.autoRedirectDropboxLinkstoLocal );

    // Only open the link if auto redirect is set to on.
    if ( request.message.type === "auto" && (options.sync.autoRedirectDropboxLinkstoLocal === "0" || isUndefined(options.sync.autoRedirectDropboxLinkstoLocal)) ) return;

    console.log(options.local.fullPathToDropboxFolder);

    var localUrl = chrome.extension.getURL('preview.html?open=') + "file:///" + options.local.fullPathToDropboxFolderEncoded + "/" + request.message.url;

		chrome.tabs.update(sender.tab.id, {
		    url: localUrl
		});

};

console.log("end of eventPage.js");
