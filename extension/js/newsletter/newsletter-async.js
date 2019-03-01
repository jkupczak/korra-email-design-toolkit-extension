"use strict";

/////
///// Get options from storage
/////

let options = {};
var getAllOptions = new Promise((resolve, reject) => {

  console.time('storage.sync');
  chrome.storage.sync.get(null, (items) => {

    let err = chrome.runtime.lastError;
    if (err) {

      //@TODO What do I do if the call errors out?!
      reject(err);

    } else {

      // Apply our result to a global variable so that we can use it throughout our other scripts.
      // Maybe not the best way to handle this?
      options.sync = items;

      console.groupCollapsed("Options from chrome.storage.sync");
      console.timeEnd('storage.sync');
      console.log(options.sync);
      console.groupEnd();


      // Created this function to take the items we got from the async call
      // and apply them to variables for easy use in other scripts.
      // I don't actually think this is necessary. Shouldn't I just call the items object?
      // Like...
      // exOptions = items;
      // And then later...
      // exOptions.optionName // returns the option I want.
      // They are afterall all already named within the object!
      // @TODO
      resolveOptions(items);
      resolve(items);
    }
  });

  console.time('storage.local');
  chrome.storage.local.get(null, (items) => {

    let err = chrome.runtime.lastError;
    if (err) {

      //@TODO What do I do if the call errors out?!
      reject(err);

    } else {

      // Apply our result to a global variable so that we can use it throughout our other scripts.
      // Maybe not the best way to handle this?
      options.local = items;

      console.groupCollapsed("Options from chrome.storage.local");
      console.timeEnd('storage.local');
      console.log(options.local);
      console.groupEnd();

      resolveOptions(items);
      resolve(items);
    }
  });

});

///////
///////
// Where are we?
///////
///////

let fileLocation, fileLocationWithoutProtocol, filename, filePath, isSavedFile, labelsAvailable;

fileLocation = getParameterByName("open");

if ( /^(https?|file):\/\//i.test(fileLocation) ) {
  fileLocationWithoutProtocol = fileLocation.replace(/^(https?|file)\:\/\//i,"");

  isSavedFile = true;
  labelsAvailable = true;

  filename = getFilename(fileLocation);
  filePath = getFilePath(fileLocation);
}

else { // this is unsaved code

  isSavedFile = false;
  labelsAvailable = false;

}


///////////
///// Name the location of the file.
///// Is it a file on the local harddrive? = "local"
///// Is it unsaved code located in extension storage? = "korra"
///// Is on being from a locally hosted server? = "server"
///////////

let fileHost;
if ( /^file\:\/\//i.test(fileLocation) ) {
  fileHost = "local";

// @TODO - This should pull from user submitted paths.
} else if ( /^https?\:\/\//i.test(fileLocation) ) {
  fileHost = "server";

} else {
  fileHost = "korra";
}

console.groupCollapsed("[location]");
  console.log("fileLocation:", fileLocation);
  console.log("fileLocationWithoutProtocol:", fileLocationWithoutProtocol);
  console.log("filePath:", filePath);
  console.log("filename:", filename);
  console.log("isSavedFile:", isSavedFile);
  console.log("labelsAvailable:", labelsAvailable);
  console.log("fileHost:", fileHost);
console.groupEnd();

////////////////////////////
////////////////////////////
////////////////////////////


// This requests the original files HTML using the extensions access to the filesystem.
// By default this request is asynchronous.
// If we want to make it synchronous, just change true to false in the xhr.open statement.

// Resources:
// https://stackoverflow.com/q/11452758/556079
// https://stackoverflow.com/a/14092195/556079
// https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/send


////////////////////////////////////
////////////////////////////////////
////////////////////////////////////

let originalHtml, cleanedOriginalHtml, cleanedDesktopHtml, cleanedMobileHtml, conditionalsExist;

var processCode = function (code) {

  originalHtml = code;
  cleanedOriginalHtml = code;
  cleanedDesktopHtml = cleanedOriginalHtml;
  cleanedMobileHtml = cleanedOriginalHtml;

  // Check for conditional statements.
  ////////////////////////////////////
  if ( cleanedDesktopHtml.match(/\*\|IF:.+?\|\*/gi) && cleanedDesktopHtml.match(/\*\|END:IF\|\*/gi)  ) {

    conditionalsExist = true;

    // OFF UNTIL THIS IS 100% DONE
    // Parse the conditionals from MailChimp if they exists.
    // cleanedDesktopHtml = processMcConditionals(cleanedDesktopHtml);

  } else {
    conditionalsExist = false;
  }

  ////!!!!!!!!!!!!!!!!!!!
  ////!!!!!!!!!!!!!!!!!!! Figure out how to make the iframe loading wait for us to get the HTML back
  ////!!!!!!!!!!!!!!!!!!!
  ////!!!!!!!!!!!!!!!!!!!

// To prevent flashes of unstyled text, we are adding some links to css files BEFORE we render the iframes.
// To do this we have to just append a string to the code we got above from the xhr.
// [TO-DO]: Consider removing this and just adding it after the iframe renders if there's no downside.

  // // Remove all <script> tags. HTML emails cannot have them. We don't design them in there, but if you're viewing this page with Middleman then there will be some injected <script> tags that can cause us issues. These <script> tags allow Middleman to reload the page when changes to the file are made. We don't need them in our dFrame or mFrameContents potentially mucking things up.
  // // Also removes <object> tags. Which is also injected by Middleman (and MM sometimes tries to remove it itself and fails)
  // // cleanedOriginalHtml = cleanedOriginalHtml.replace(/<(object|script)\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/(object|script)>/gi, "");
  //
  cleanedOriginalHtml = cleanedOriginalHtml.replace(/<(object|script)\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/(object|script)>/gi, "");
  cleanedDesktopHtml  = cleanedDesktopHtml.replace(/<(object|script)\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/(object|script)>/gi, "");
  cleanedMobileHtml   = cleanedMobileHtml.replace(/<(object|script)\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/(object|script)>/gi, "");

  // Add allFrames.css to both views
  var allFramesCssString = '<link data-korra href="' + chrome.extension.getURL('css/newsletter/newsletter-allFrames.css') + '" id="debug-unique-style-block" class="debug" rel="stylesheet" type="text/css">';
  cleanedDesktopHtml += allFramesCssString;
  cleanedMobileHtml += allFramesCssString;

  //////////////
  //
  //   DESKTOP
  //
  //////////////

  // Add dFrame.js
  var dFrameFrameScript = '<script data-korra src="' + chrome.extension.getURL('js/newsletter/dFrame.js') + '"></script>';
  cleanedDesktopHtml += dFrameFrameScript;

  // Add keymaster.js
  // var dFrameKeymaster = '<script data-korra src="' + chrome.extension.getURL('js/libs/keymaster.js') + '"></script>';
  // cleanedDesktopHtml += dFrameKeymaster;

  // Add dFrame.css to the desktop view
  var dFrameCssString = '<link data-korra href="' + chrome.extension.getURL('css/newsletter/newsletter-dFrame.css') + '" id="debug-unique-style-block" class="debug" rel="stylesheet" type="text/css">';
  cleanedDesktopHtml += dFrameCssString;

  //////////////
  //
  //   MOBILE
  //
  //////////////

  // Add mFrame.js
  var mFrameScript = '<script data-korra src="' + chrome.extension.getURL('js/newsletter/mFrame.js') + '"></script>';
  cleanedMobileHtml += mFrameScript;

  // Add keymaster.js
  // var mFrameKeymaster = '<script data-korra src="' + chrome.extension.getURL('js/libs/keymaster.js') + '"></script>';
  // cleanedMobileHtml += mFrameKeymaster;

  // Add mFrame.css to the mobile view
  var mFrameCssString = '<link data-korra href="' + chrome.extension.getURL('css/newsletter/newsletter-mFrame.css') + '" id="debug-unique-style-block" class="debug" rel="stylesheet" type="text/css">';
  cleanedMobileHtml += mFrameCssString;

};


///////////////////////////////////
///////////////////////////////////
///////////////////////////////////
///////////////////////////////////

var getHtml = new Promise(function(resolve, reject) {

  // Check if its code saved in storage
  if ( !isSavedFile ) {

    console.info("Doing a GET request for code saved in storage.\n", fileLocation);
    chrome.storage.promise.local.get(fileLocation).then(function(items) {
      // resolved
      console.log(items); // => {'foo': 'bar'}
      processCode(items[fileLocation]);
      resolve(items[fileLocation]);
    }, function(error) {
      // rejected
      console.log(error);
    });

  // It's not code saved in storage, it's a local file.
  } else {

    console.info("Doing a GET request for a local file.\n", fileLocation);
    var xhr = new XMLHttpRequest();
    xhr.open("GET", fileLocation, false); // true = async, false = sync

    // When xhring a local file, the response.status is 0
    xhr.onload = function (e) {

      if (this.response.length > 0) {

        processCode(this.response);
        resolve(this.response);

      } else {

        displayErrorMsg("missing");

        reject({
          status: this.status,
          statusText: xhr.statusText,
        });
      }
    };

    xhr.onerror = function () {

      reject({
        status: this.status,
        statusText: xhr.statusText,
      });
    };


    try {
      xhr.send();
    }
    catch(error) {

      displayErrorMsg("fileaccess");
      console.error(error);

    }


  }

});

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
Promise.all([getAllOptions, getHtml]).then(function(values) {

  // console.warn("getAllOptions and getHtml promised returned");
  //@TODO
  // This doesn't actually work. The options aren't available! :(((

      // HTML and options are ready...
      // do something

    // @@IDEA: Wait until the user clicks the button to assign an href.
    setTimeout(function(){

        var editorPath = "";

        // if ( typeof exOptions.openInEditor !== 'undefined' ) {

          var openInEditorLink = document.createElement("a");
          openInEditorLink.classList.add("main-pane-extra-btn", "open-in-editor-btn");
          openInEditorLink.innerHTML = "Open in Editor";
          stagePreviewBtns.insertAdjacentElement('afterend',openInEditorLink);

          if ( options.sync.openInEditor === "atom" ) {
             editorPath = 'atom://open?url=';
             openInEditorLink.href = editorPath + fileLocation;

          } else if ( options.sync.openInEditor === "sublime" ) {
            editorPath = 'subl://open?url=';
            openInEditorLink.href = editorPath + fileLocation;

          } else if ( options.sync.openInEditor === "vscode" ) {
            editorPath = 'vscode://file/';
            openInEditorLink.href = editorPath + fileLocation.replace(/^file:\/\//i,"");

          }


        // }


    }, 1000);

});


///////////////////////////////////
///////////////////////////////////
///////////////////////////////////
///////////////////////////////////
// Modify these to pull ALL options instead.

// TODO
// Use https://stackoverflow.com/a/33813793/556079
// To wrap the options async call and the HTML async call above into one promise.
// It will allow us to wait for both of them to finish before rendering the test of the page
// Once that works, use the same code to wrap all of our XHR link checks together so that we know when they are all done.


// Dropbox Access Token
// var dbx;
// chrome.storage.promise.sync.get('dropboxAccessToken').then(function(items) {
//   dbx = new Dropbox({ accessToken: items.dropboxAccessToken });
//   console.log("dropboxAccessToken: ", items.dropboxAccessToken);
// }, function(error) {
//   console.error("Could not retrieve Dropbox access token from chrome.storage.sync. items.dropboxAccessToken is " + items.dropboxAccessToken, " - Visit https://dropbox.github.io/dropbox-api-v2-explorer/#auth_token/from_oauth1 to get an access token.");
// });
//
// // Dropbox Parent Folder
// chrome.storage.promise.sync.get('dropboxFolderName').then(function(items) {
//   dropboxFolderName = items.dropboxFolderName;
//   console.log("dropboxFolderName: ", dropboxFolderName);
// }, function(error) {
//   console.error("Could not retrieve Dropbox folder name from chrome.storage.sync. items.dropboxFolderName is " + items.dpLocalParentFolder);
// });

function resolveOptions(items) {

  // [OPTION]: Dropbox Folder Name
  // if (items.fullPathToDropboxFolder) {
    // dropboxFolderName = items.fullPathToDropboxFolder.replace(/(^.+\/|\/$)/gi,"");

    // [OPTION]: Dropbox Access Token
                // dbx = new Dropbox({ accessToken: items.dropboxAccessToken });
                // if ( items.dropboxAccessToken ) {
                //   // console.log("dropboxAccessToken: ", items.dropboxAccessToken);
                // } else {
                //   console.error("Could not retrieve Dropbox access token from chrome.storage.sync. items.dropboxAccessToken is " + items.dropboxAccessToken, " - Visit https://dropbox.github.io/dropbox-api-v2-explorer/#auth_token/from_oauth1 to get an access token.");
                // }
  // }

}



////
//// http://jsfiddle.net/02ohnth4/45/
////
function doTheWork(input, i) {
    //normal async work will probably have its own promise, but we need to create our own:
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            var output = (input || "") + i + " ";
            resolve(output);
        }, Math.floor(Math.random() * 200) + 1);
    });
}

function seqLoopReduce(someInput, times) {
    var arr = new Array(times);
    for (var i = 1; i < times; i++) {
        arr[i] = i; //we need to populate the array because Array.reduce will ignore empty elements
    }

    return arr.reduce(function (prev, curr) {
        return prev.then(function (val) {
            return doTheWork(val, curr); //curr = current arr value, val = return val from last iteration
        });
    }, doTheWork(someInput, 0));
}


var ticks6 = (new Date()).valueOf();
var p6 = seqLoopReduce("10 iterations: <br />", 15).then(function (result) {
    var endTicks = (new Date()).valueOf();
    // console.log("<h2>Sequential reduced, done in " + (endTicks - ticks6) + " ms: </h2>");
    // console.log(result);
    // console.log("<br />");
});
