console.warn(">>> trello.js loaded");

// HELP
// https://developer.chrome.com/extensions/storage
// https://developer.chrome.com/extensions/overview#sync
//
// http://stackoverflow.com/questions/41049155/how-can-get-object-data-that-ive-set-in-chrome-storage
// https://stackoverflow.com/questions/11692699/chrome-storage-local-set-using-a-variable-key-name/40287132
// http://stackoverflow.com/questions/11922964/how-do-i-view-the-storage-of-a-chrome-extension-ive-installed
// http://stackoverflow.com/questions/13872542/chrome-chrome-storage-local-get-and-set
//

// if ( /editorial\-calendar/gi.test(document.URL) ) {
//   var calendarIframe = document.createElement("iframe");
//       calendarIframe.src = document.URL + "/calendar/2017/03";
//       calendarIframe.className = "iframe-calendar";
//       document.body.appendChild(calendarIframe);
// }



// Track clicks on dropbox links so that we can get the originating Trello card URL.
// Log it into storage so that we can quickly visit the Trello card from other pages.
// window.onclick = function(e) {
//   if (e.target.localName == 'a') {
//
//     var dropboxUrl = e.target.href
//
//     if ( /dropbox.+?\.htm/gi.test(dropboxUrl) ) {
//       var trelloUrl = document.URL;
//
//       var emailId   = dropboxUrl.replace(/(.+\/)/gi, "")
//       var dropboxId = dropboxUrl.replace(/(.+s\/|\/.+$)/gi, "")
//       var trelloId  =  trelloUrl.replace(/(.+c\/|\/.+$)/gi, "")
//
//       var ids = { "s": "", "n": "", "d": dropboxId, "t": trelloId, "m": "", "l": "" };
//       var obj= {};
//       var key = emailId
//       obj[key] = ids;
//       chrome.storage.sync.set(obj);
//
//       chrome.storage.sync.get(key,function(result){
//         console.log("key");
//         console.log(result[key]["d"]);
//         console.log(result[key]["t"]);
//       });
//
//       chrome.storage.sync.get("a", function(result) { console.log(result) });
//
//
//       // View entire storage
//       chrome.storage.sync.get(function(result) { console.log("Entire chrome.storage results: "); console.log(result); });
//
//     }
//
//   }
// };
