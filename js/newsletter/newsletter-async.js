// console.warn(" 💎💎💎 [korra-email-design-tooklit] loaded /js/newsletter-async.js");
/////////////////////////////////////////////////////////////////////////


///////
///////
///////
var getHtml = new Promise(function(resolve, reject) {

  var xhr = new XMLHttpRequest();
  xhr.open("GET", document.URL, true);

  // When xhring a local file, the response.status is 0
  xhr.onload = function (e) {
    // if (this.status === 0) {

      console.log(this);

      processCode(this.response);
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

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
Promise.all([getAllOptions, getHtml]).then(function(values) {
  // HTML and options are ready...
  // do something

        setTimeout(function(){
          // Check the options for a value.
          if ( exOptions.openInApp === "atom" ) {
            var appLink = 'atom://open?url=';
          } else if ( exOptions.openInApp === "sublime" ) {
            var appLink = 'subl://open?url=';
          }


          // Create the link
          if (typeof openInApp != "undefined") {
            openInApp.href = appLink + document.location.origin + document.location.pathname;
          }


        }, 1000);

});


var view = getParameterByName("view");
if ( view !== "1" && !/\/var\/folders\//gi.test(document.URL) ) {
  // console.log(document.URL);


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

  originalHtml = code;
  cleanedOriginalHtml = code;
  cleanedDesktopHtml = cleanedOriginalHtml;
  cleanedMobileHtml = cleanedOriginalHtml;

  // Check for conditional statements.
  ////////////////////////////////////
  if ( cleanedDesktopHtml.match(/\*\|IF:.+?\|\*/gi) && cleanedDesktopHtml.match(/\*\|END:IF\|\*/gi)  ) {

    conditionalsExist = true;

    // Parse the conditionals from MailChimp if they exists.
    cleanedDesktopHtml = processMcConditionals(cleanedDesktopHtml);

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
  var allFramesCssString = '<link data-korra href="' + chrome.extension.getURL('css/newsletter/newsletter-allFrames.css') + '" id="debug-unique-style-block" class="debug" rel="stylesheet" type="text/css">'
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
  var dFrameCssString = '<link data-korra href="' + chrome.extension.getURL('css/newsletter/newsletter-dFrame.css') + '" id="debug-unique-style-block" class="debug" rel="stylesheet" type="text/css">'
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
  var mFrameCssString = '<link data-korra href="' + chrome.extension.getURL('css/newsletter/newsletter-mFrame.css') + '" id="debug-unique-style-block" class="debug" rel="stylesheet" type="text/css">'
  cleanedMobileHtml += mFrameCssString;


  //////////////
  //
  //   ALL
  //
  //////////////

  // Add allFrames.js to both views
  var allFramesScript = '<script data-korra src="' + chrome.extension.getURL('js/newsletter/allFrames.js') + '"></script>';
  // cleanedDesktopHtml += allFramesScript;
  // cleanedMobileHtml += allFramesScript;


  // Now that we've got the HTML from our async call AND we've processed it...
  // buildPage();

}



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

  // TODO
  var getAllOptions = "options!";
  resolveOptions("options!");

} else {
// Not in synchronous sessionStorage, do an async call to chrome.storage.sync

  var getAllOptions = new Promise((resolve, reject) => {
      chrome.storage.sync.get(null, (items) => {
          let err = chrome.runtime.lastError;
          if (err) {

            //@TODO What do I do if the call errors out?!
            reject(err);

          } else {

            // Apply our result to a global variable so that we can use it throughout our other scripts.
            // Maybe not the best way to handle this?
            exOptions = items;

            console.groupCollapsed("Options from Storage (exOptions)");
            console.log(exOptions);
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
  });

}



function resolveOptions(items) {

  // [OPTION]: Dropbox Folder Name
  dropboxFolderName = items.dropboxFolderName;
  // console.log("dropboxFolderName:", dropboxFolderName);

  // [OPTION]: Dropbox Access Token
  dbx = new Dropbox({ accessToken: items.dropboxAccessToken });
  if ( items.dropboxAccessToken ) {
    // console.log("dropboxAccessToken: ", items.dropboxAccessToken);
  } else {
    console.error("Could not retrieve Dropbox access token from chrome.storage.sync. items.dropboxAccessToken is " + items.dropboxAccessToken, " - Visit https://dropbox.github.io/dropbox-api-v2-explorer/#auth_token/from_oauth1 to get an access token.");
  }

  // [OPTION]: Mailgun API Key
  mailgunApiKey = items.mailgunApiKey;
  // console.log("mailgunApiKey:", mailgunApiKey);

  // [OPTION]: Mailgun Domain Name
  mailgunDomainName = items.mailgunDomainName.trim();
  // console.log("mailgunDomainName:", mailgunDomainName);

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


var ticks6 = (new Date()).valueOf();
var p6 = seqLoopReduce("10 iterations: <br />", 15).then(function (result) {
    var endTicks = (new Date()).valueOf();
    // console.log("<h2>Sequential reduced, done in " + (endTicks - ticks6) + " ms: </h2>");
    // console.log(result);
    // console.log("<br />");
});




} else {
  document.documentElement.classList.add("plain-view");
} // END TEST
