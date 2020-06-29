"use strict";

/////
///// Get options from storage
/////

let options = {};
let o = {};
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
      o.sync = items;

      console.groupCollapsed("Options from chrome.storage.sync");
      console.timeEnd('storage.sync');
      console.log(options.sync);
      console.groupEnd();


      // Dark Mode Custom Settings
      if ( o.sync.customColorScheme !== "" ) {
        email.korraColorScheme = o.sync.customColorScheme;
      }

      //Convert some option values
      console.log(o.sync.primaryDomains);
      o.sync.primaryDomains = o.sync.primaryDomains.split("\n");
      console.log(o.sync.primaryDomains);

      // Created this function to take the items we got from the async call
      // and apply them to variables for easy use in other scripts.
      // I don't actually think this is necessary. Shouldn't I just call the items object?
      // Like...
      // exOptions = items;
      // And then later...
      // exOptions.optionName // returns the option I want.
      // They are afterall all already named within the object!
      // @TODO
      // resolveOptions(items);
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
      o.local = items;

      console.groupCollapsed("Options from chrome.storage.local");
      console.timeEnd('storage.local');
      console.log(options.local);
      console.groupEnd();

      // resolveOptions(items);
      resolve(items);
    }
  });

});

///////
///////
// Where are we?
///////
///////

let isSavedFile, labelsAvailable;

let email = {};

// Set the default color scheme
if ( window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ) {
  email.osColorScheme     = "dark";
  email.activeColorScheme = "dark";
} else {
  email.osColorScheme     = "light";
  email.activeColorScheme = "light";
}

// decode the URL located in the `open` parameter before we use it
email.fileLocation = decodeURIComponent(getParameterByName("open"));

if ( /^(https?|file):\/\//i.test(email.fileLocation) ) {
  email.fileLocationWithoutProtocol = email.fileLocation.replace(/^(https?|file)\:\/\//i,"");

  isSavedFile = true;
  labelsAvailable = true;

  email.filename = getFilename(email.fileLocation);
  email.fileParentFolder = getFileParentFolder(email.fileLocation);
  email.filePath = getFilePath(email.fileLocation);

  // There are some characters in a file URL that prevent us from loading it.
  // At this point `email.fileLocation` has been decoded after having been previously part of the url params.
  // The only special characters in here should be literal.
  // So we're going to encode any instances of the % sign.
  // Once that is done we're then going to encode any instances of the '?' character.
  // Otherwise, I believe Chrome thinks the '?' represents the beginning of a param? Unsure.
  // Fact is that we can't load a file that that includes those characters without encoding them first.
  // As of 8/29/19 this is working and I'm not aware of any filenames that we can't open
  email.encodedFileLocation = email.fileLocation.replace(/%/gi, "%25");
  email.encodedFileLocation = email.encodedFileLocation.replace(/\?/gi, "%3F");

  // Send the filePath to the background for use in potential webRequest blocking.
  chrome.runtime.sendMessage({type: "tabInfo", data: {filePath: email.filePath}}, function(response) {
    // console.log(response.farewell);
  });

  // Send the file location back to the background page for saving to our file history feature
  chrome.runtime.sendMessage({saveEmailLocation: email.fileLocation});

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

if ( /^file\:\/\//i.test(email.fileLocation) ) {
  email.fileHost = "local";

// @TODO - This should pull from user submitted paths.
} else if ( /^https?\:\/\/localhost\:/i.test(email.fileLocation) ) {
  email.fileHost = "localserver";

// @TODO - This should pull from user submitted paths.
} else if ( /^https?\:\/\//i.test(email.fileLocation) ) {
  email.fileHost = "externalserver";

} else {
  email.fileHost = "korra";
}

console.info("email data:", email);

console.groupCollapsed("location data:");
  console.log("email.fileLocation:", email.fileLocation);
  console.log("email.fileLocationWithoutProtocol:", email.fileLocationWithoutProtocol);
  console.log("email.filePath:", email.filePath);
  console.log("email.filename:", email.filename);
  console.log("isSavedFile:", isSavedFile);
  console.log("labelsAvailable:", labelsAvailable);
  console.log("email.fileHost:", email.fileHost);
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

  // Does the email have color scheme @media queries?
  if ( /(\( *?prefers-dark-interface *?\)|\(prefers-light-interface\))/gi.test(originalHtml) ) {
    email.hasColorSchemeCSS = true;
  } else {
    email.hasColorSchemeCSS = false;
  }

  // Check for relative resource URLs
  ////////////////////////////////////
  // cleanedOriginalHtml = updateRelativeResources(cleanedOriginalHtml);

  // Add the <base> tag to both views
  var baseTag;

  // Add an href if we detect at least one src="" using a URL with an invalid scheme
  var imgSrcs = cleanedOriginalHtml.match(/( |[A-Za-z0-9])src=('|")?\s*?.{8}/gmi);
  if ( imgSrcs ) {
    imgSrcs.forEach(function (imgSrc, index) {

      // Build the href we want to use
      var baseHref = email.filePath;
      if ( email.fileHost !== "externalserver" ) {
        baseHref = "file://" + email.filePath;
      }

      if ( !/(http(s)?|ftp|file):\/\//i.test(imgSrc) ) {
        baseTag = '<base target="_blank" href="' + baseHref + '/">';
      }
      else {
        baseTag = '<base target="_blank">';
      }

    });
  }
  else {
    baseTag = '<base target="_blank">';
  }


  // Add it before the end of the <head> tag if it exists.
  if ( /<\/head>/gmi.test(cleanedOriginalHtml) ) {
    cleanedOriginalHtml = cleanedOriginalHtml.replace(/<\/head>/gmi, baseTag + "</head>");
  }
  // Else add it before the beginning of the first <body> tag.
  else {
    cleanedOriginalHtml = cleanedOriginalHtml.replace(/<body/mi, "<head>" + baseTag + "</head><body");
  }
  // Else we don't add it at all.


  //
  ////////////////////////////////////
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


  // Considered deprecated because we changed the way we load in code.

      // // Remove all <script> tags. HTML emails cannot have them. We don't design them in there, but if you're viewing this page with Middleman then there will be some injected <script> tags that can cause us issues. These <script> tags allow Middleman to reload the page when changes to the file are made. We don't need them in our dFrame or mFrameContents potentially mucking things up.
      // // Also removes <object> tags. Which is also injected by Middleman (and MM sometimes tries to remove it itself and fails)
      // // cleanedOriginalHtml = cleanedOriginalHtml.replace(/<(object|script)\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/(object|script)>/gi, "");
      //
      // cleanedOriginalHtml = cleanedOriginalHtml.replace(/<(object|script)\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/(object|script)>/gi, "");
      // cleanedDesktopHtml  = cleanedDesktopHtml.replace(/<(object|script)\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/(object|script)>/gi, "");
      // cleanedMobileHtml   = cleanedMobileHtml.replace(/<(object|script)\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/(object|script)>/gi, "");

  //////////////
  //
  //   BOTH VIEWS
  //
  //////////////

  // Add allFrames.css to both views
  var allFramesCssString = '<link data-korra href="' + chrome.extension.getURL('css/newsletter/newsletter-allFrames.css') + '" id="debug-unique-style-block" class="debug" rel="stylesheet" type="text/css">';

  //////////////
  //
  //   DESKTOP
  //
  //////////////

  // Add dFrame.js
  var dFrameFrameScript = '<script data-korra src="' + chrome.extension.getURL('js/newsletter/dFrame.js') + '"></script>';

  // Add keymaster.js
  // var dFrameKeymaster = '<script data-korra src="' + chrome.extension.getURL('js/libs/keymaster.js') + '"></script>';
  // cleanedDesktopHtml += dFrameKeymaster;

  // Add dFrame.css to the desktop view
  var dFrameCssString = '<link data-korra href="' + chrome.extension.getURL('css/newsletter/newsletter-dFrame.css') + '" id="debug-unique-style-block" class="debug" rel="stylesheet" type="text/css">';

  //////////////
  //
  //   MOBILE
  //
  //////////////

  // Add mFrame.js
  var mFrameScript = '<script data-korra src="' + chrome.extension.getURL('js/newsletter/mFrame.js') + '"></script>';

  // Add keymaster.js
  // var mFrameKeymaster = '<script data-korra src="' + chrome.extension.getURL('js/libs/keymaster.js') + '"></script>';
  // cleanedMobileHtml += mFrameKeymaster;

  // Add mFrame.css to the mobile view
  var mFrameCssString = '<link data-korra href="' + chrome.extension.getURL('css/newsletter/newsletter-mFrame.css') + '" id="debug-unique-style-block" class="debug" rel="stylesheet" type="text/css">';

  //////////////
  //
  //   WRAP IN <KORRA>
  //
  //////////////


  cleanedDesktopHtml += "<korra data-korra>" + allFramesCssString + dFrameFrameScript + dFrameCssString + "</korra>";
  cleanedMobileHtml += "<korra data-korra>" + allFramesCssString + mFrameScript + mFrameCssString + "</korra>";
};


///////////////////////////////////
///////////////////////////////////
///////////////////////////////////
///////////////////////////////////

var getHtml = new Promise(function(resolve, reject) {

  // Check if its code saved in storage
  if ( !isSavedFile ) {

    console.info("Doing a GET request for code saved in storage.\n", email.fileLocation);
    chrome.storage.promise.local.get(email.fileLocation).then(function(items) {
      // resolved
      console.log(items); // => {'foo': 'bar'}
      processCode(items[email.fileLocation]);
      resolve(items[email.fileLocation]);
    }, function(error) {
      // rejected
      console.log(error);
    });

  // It's not code saved in storage, it's a local file.
  } else {

    console.info("Doing a GET request for a local file.\n", email.encodedFileLocation);
    var xhr = new XMLHttpRequest();

    // The encoded
    xhr.open("GET", email.encodedFileLocation, false); // true = async, false = sync

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
      console.error(error.name);
      console.error(error.message);
      console.error(error.stack);
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

        var openInEditorLink = document.createElement("a");
        openInEditorLink.classList.add("main-pane-extra-btn", "main-pane-btn", "open-in-editor-btn");
        stagePreviewBtns.insertAdjacentElement('afterend',openInEditorLink);

        // Encode some characters like &.
        let editorSafeFileUrl = email.fileLocation.replace(/&/gi, "%26");

        if ( options.sync.openInEditor === "atom" ) {
          openInEditorLink.innerHTML = "Open in Atom";
          openInEditorLink.href = 'atom://open?url=' + editorSafeFileUrl;

        } else if ( options.sync.openInEditor === "sublime" ) {
          openInEditorLink.innerHTML = "Open in Sublime Text";
          openInEditorLink.href = 'subl://open?url=' + editorSafeFileUrl;

        } else if ( options.sync.openInEditor === "vscode" ) {
          openInEditorLink.innerHTML = "Open in VS Code";
          openInEditorLink.href = 'vscode://file/' + editorSafeFileUrl.replace(/^file:\/\//i,"");

        }

    }, 1000);

});


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
