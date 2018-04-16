// console.warn(" 💎💎💎 [korra-email-design-tooklit] loaded /js/newsletter-async.js");
/////////////////////////////////////////////////////////////////////////


var view = getParameterByName("view");

if ( view !== "1" && !/\/var\/folders\//gi.test(document.URL) ) {


// This requests the original files HTML using the extensions access to the filesystem.
// By default this request is asynchronous.
// If we want to make it synchronous, just change true to false in the xhr.open statement.
// It remains to be seen if async will cause me any issues with page rendering. But nothing so far!

// Resources:
// https://stackoverflow.com/q/11452758/556079
// https://stackoverflow.com/a/14092195/556079
// https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/send


// MailChimp doesn't have the HTML loaded right away. So we HAVE to XHR for it. This is not currently implemented.

// var xhrA = new XMLHttpRequest();
// xhrA.open("GET", "https://pages.litmus.com/webmail/31032/494395994/cd7225862ccaeed9432230a0dc260788d20e752ee3c3ea1ab27ae37c2345749a", true);
// xhrA.onload = function(e) {
//   // processCode(xhr.response);
//   console.log(xhrA.response);
// };
// xhrA.onerror = function () {
//   console.error("** An error occurred during the transaction");
// };
// xhrA.send();



//////
//////
// This is the call for the local HTML I was using. I've promisified this further down now so that I can use promise.all to wait for this to be return and also wait for the options to show up.
  // var xhr = new XMLHttpRequest();
  // xhr.open("GET", document.URL, true);
  // xhr.onload = function(e) {
  //   processCode(xhr.response);
  // };
  // xhr.onerror = function () {
  //   console.error("** An error occurred during the transaction");
  // };
  // xhr.send();


////////////////////////////////////
////////////////////////////////////
////////////////////////////////////


function processCode(code) {

  cleanedOriginalHtml = code;
  cleanedDesktopHtml = cleanedOriginalHtml;
  cleanedMobileHtml = cleanedOriginalHtml;

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
  var allFramesCssString = '<link href="' + chrome.extension.getURL('css/newsletter/newsletter-allFrames.css') + '" id="debug-unique-style-block" class="debug" rel="stylesheet" type="text/css">'
  cleanedDesktopHtml += allFramesCssString;
  cleanedMobileHtml += allFramesCssString;

  // Add allFrames.js to both views
  var allFramesScript = '<script src="' + chrome.extension.getURL('js/newsletter/allFrames.js') + '"></script>';
  cleanedDesktopHtml += allFramesScript;
  cleanedMobileHtml += allFramesScript;

  //////////////
  //
  //   DESKTOP
  //
  //////////////

  // Add dFrame.js
  var dFrameFrameScript = '<script src="' + chrome.extension.getURL('js/newsletter/dFrame.js') + '"></script>';
  cleanedDesktopHtml += dFrameFrameScript;

  // Add dFrame.css to the desktop view
  var dFrameCssString = '<link href="' + chrome.extension.getURL('css/newsletter/newsletter-dFrame.css') + '" id="debug-unique-style-block" class="debug" rel="stylesheet" type="text/css">'
  cleanedDesktopHtml += dFrameCssString;

  //////////////
  //
  //   MOBILE
  //
  //////////////

  // Add mFrame.js
  var mFrameScript = '<script src="' + chrome.extension.getURL('js/newsletter/mFrame.js') + '"></script>';
  cleanedDesktopHtml += mFrameScript;

  // Add mFrame.css to the mobile view
  var mFrameCssString = '<link href="' + chrome.extension.getURL('css/newsletter/newsletter-mFrame.css') + '" id="debug-unique-style-block" class="debug" rel="stylesheet" type="text/css">'
  cleanedMobileHtml += mFrameCssString;


  // buildPage();

}


//
//
//
//  Experimental design
//  If I need a value from chrome.storage, why not look for it as soon as the page starts loading instead of waiting for it to finish loading?
//  This script runs in the manifest at document_start
//  It loads approximately 300ms faster.
//
//


// Get dropbox access token from chrome.storage.

// chrome.storage.sync.get("dpToken", function(items) {
//   if (!chrome.runtime.error && items.dpToken) {
//     // console.log(items);
//     dbx = new Dropbox({ accessToken: items.dpToken });
//     // console.groupCollapsed("Dropbox access token retrieved.");
//     // console.log(items.dpToken);
//     // console.groupEnd();
//   } else {
//     console.error("Could not retrieve Dropbox access token from chrome.storage.sync. items.dpToken is " + items.dpToken, " - Visit https://dropbox.github.io/dropbox-api-v2-explorer/#auth_token/from_oauth1 to get an access token.");
//   }
// });
//
// // Dropbox Local Parent Folder Path
// chrome.storage.sync.get("dpLocalParentFolder", function(items) {
//   if (!chrome.runtime.error && items.dpLocalParentFolder) {
//     dropboxFolderName = items.dpLocalParentFolder;
//   } else {
//     dropboxFolderName = "Dropbox%20(MedBridge%20.)";
//     console.error("Could not retrieve Dropbox local parent folder path from chrome.storage.sync. items.dpLocalParentFolder is " + items.dpLocalParentFolder);
//   }
// });



// chrome.runtime.sendMessage({cmd: "shutdown"}, function(response) {
//   console.log(response.farewell);
// });



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

/////
/////
/////

var isinss = false;
// Get all options
if ( isinss ) {
// First check sessionStorage. We'll store options here after the first load to make subsequent loads faster.

  var getAllOptions = "options!";
  resolveOptions("options!");

} else {
// Not in synchronous sessionStorage, do an async call to chrome.storage.sync

  var getAllOptions = new Promise((resolve, reject) => {
      chrome.storage.sync.get(null, (items) => {
          let err = chrome.runtime.lastError;
          if (err) {
            reject(err);
          } else {
            // console.log(items);
            resolveOptions(items);
            resolve(items);
          }
      });
  });

}



function resolveOptions(items) {

  console.groupCollapsed("Options from Storage");

  console.log("All Options", items);
  console.group("Variables for Use");

  // [OPTION]: Dropbox Folder Name
  dropboxFolderName = items.dropboxFolderName;
  console.log("dropboxFolderName:", dropboxFolderName);

  // [OPTION]: Dropbox Access Token
  dbx = new Dropbox({ accessToken: items.dropboxAccessToken });
  if ( items.dropboxAccessToken ) {
    console.log("dropboxAccessToken: ", items.dropboxAccessToken);
  } else {
    console.error("Could not retrieve Dropbox access token from chrome.storage.sync. items.dropboxAccessToken is " + items.dropboxAccessToken, " - Visit https://dropbox.github.io/dropbox-api-v2-explorer/#auth_token/from_oauth1 to get an access token.");
  }

  // [OPTION]:
  // [OPTION]:
  // [OPTION]:
  // [OPTION]:
  // [OPTION]:
  // [OPTION]:
  // [OPTION]:
  // [OPTION]:
  // [OPTION]:
  // [OPTION]:
  // [OPTION]:
  // [OPTION]:

  console.groupEnd();
  console.groupEnd();
}


var getHtml = new Promise(function(resolve, reject) {

  var xhr = new XMLHttpRequest();
  xhr.open("GET", document.URL, true);

  // When xhring a local file, the response.status is 0
  xhr.onload = function (e) {
    // if (this.status === 0) {

      // console.log(this);
      // console.log(xhr);
      // console.log(this.response);
      // console.log(xhr.response);
      resolve(this.response);

    // } else {
    //   reject({
    //     status: this.status,
    //     statusText: xhr.statusText
    //   });
    // }
  };
  xhr.onerror = function () {
    reject({
      status: this.status,
      statusText: xhr.statusText
    });
  };
  xhr.send();

});

///////////
///////////
///////////

//
// var promise1 = Promise.resolve(3);
// var promise2 = 42;
// var promise3 = new Promise(function(resolve, reject) {
//   setTimeout(resolve, 1000, 'foo');
// });


// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
Promise.all([getAllOptions, getHtml]).then(function(values) {
  // console.log(values[0]);
  // console.log(values[1]);
  processCode(values[1]);
});




//////////////////////
//////////////////////
//////////////////////
//////////////////////

//
//
// var getResponse = new Promise(function(resolve, reject) {
//
//   var xhr = new XMLHttpRequest();
//   xhr.open("GET", document.URL, true);
//
//   xhr.onload = function () {
//
//     console.log(this.response); // shows the HTML of the page I'm requesting
//     resolve(this.response);
//
//   };
//   xhr.onerror = function () {
//     reject({
//       status: this.status,
//       statusText: xhr.statusText
//     });
//   };
//   xhr.send();
//
// });
//
// var testPromise = new Promise(function(resolve, reject) {
//   setTimeout(resolve, 1000, 'foo');
// });
//
// Promise.all([getResponse, testPromise]).then(function(values) {
//   console.log(values);
//   console.log(values[0]); // this.response
//   console.log(values[1]); // foo
// });
//


// var mailgunApiKey;
// // mailgun api key
// chrome.storage.sync.get("mailgunKey", function(items) {
//   if (!chrome.runtime.error && items.mailgunKey) {
//     mailgunApiKey = items.mailgunKey;
//   } else {
//     console.error("Could not retrieve Mailgun API Key from chrome.storage.sync.");
//   }
// });


function doTheWork(input, i) {
    //normal async work will probably have its own promise, but we need to create our own:
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            var output = (input || "") + i + " ";
            resolve(output);
        }, Math.floor(Math.random() * 200) + 1)
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



} else {
  document.documentElement.classList.add("plain-view");
} // END TEST
