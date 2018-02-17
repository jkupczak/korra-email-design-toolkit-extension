console.warn("[sonic-toolkit-extension] loaded /js/trello.js");
///////////////////////////////////////////////////////////////

// Add support for using shortcuts when inputs are focused.
// https://github.com/madrobby/keymaster#filter-key-presses
key.filter = function(event){
  var tagName = (event.target || event.srcElement).tagName;
  key.setScope(/^(INPUT|TEXTAREA|SELECT)$/.test(tagName) ? 'input' : 'other');
  return true;
}

// Save open editing window
key('⌘+s, ctrl+s', function(event){

  console.log("Save current edits.")

  if ( elExists(document.querySelector(".edit-controls .confirm.mod-submit-edit.js-save-edit")) ) {
    document.querySelector(".edit-controls .confirm.mod-submit-edit.js-save-edit").click();
  }

  // Regardless if the save button exists or not, block the browser save function.
  return false; //prevent default browser function
});


// Bold
key('⌘+b, ctrl+b, ⌘+i, ctrl+i', function(event, handler){


  console.log(handler.shortcut, handler.scope);

  console.log("Make text bold with markdown");

  var text = "";
  // var range;
  // var range2;

  var activeEl = document.activeElement;

  // var activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
  //
  // if (
  //   (activeElTagName == "textarea") || (activeElTagName == "input" &&
  //   /^(?:text|search|password|tel|url)$/i.test(activeEl.type)) &&
  //   (typeof activeEl.selectionStart == "number")
  // ) {
  //     text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
  //
  // } else if (window.getSelection) {
  //     text = window.getSelection().toString();
  // }
  // console.log(text);


  let {selectionStart, selectionEnd} = activeEl;

  // nothing is selected
  if (selectionStart === selectionEnd) return;

  let string = activeEl.value;
  let prefix = string.substring(0, selectionStart);
  let infix = string.substring(selectionStart, selectionEnd);
  let postfix = string.substring(selectionEnd);

  if ( /b/.test(handler.shortcut) ) {
    var markdown = "**"
  } else if ( /i/.test(handler.shortcut) ) {
    var markdown = "*";
  }
  activeEl.value = prefix + markdown + infix + markdown + postfix;



  return false; //prevent default browser function
});

// Duplicate currently selected line
key('⌘+d, ctrl+d', function(event){

  console.log("Duplicate currently selected line.")

  return false; //prevent default browser function
});

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


// Add a Copy Button to <code> blocks.
//////////////////////////////////////
document.arrive(".description-content .markeddown", function() {

  console.log("markeddown arrived!");

  console.log(this);

  let codeBlocks = this.querySelectorAll("pre");
  for (let codeBlock of codeBlocks) {
    console.log(codeBlock);

    var codeToCopy = codeBlock.querySelectorAll("code")[0].innerText;

    var copyCode = document.createElement("div");
    copyCode.innerText = "Copy";
    copyCode.style = "border-radius:4px;background:rgb(177, 221, 242); padding:2px 6px;font-weight:bold; display:inline-block; font-size:10px; margin-bottom:12px; position:relative; top:-5px;"

    createCopyBtn(copyCode, codeToCopy);

    insertAfter(copyCode, codeBlock);

  }

});
//
// document.arrive(".list-card:not(.styled)", function() {
//
//   console.log(this);
//
// });

// Style cards in calendar view.


// Run the function to process all list cards on page load.
loopListCards();

function loopListCards() {

  let listCards = document.querySelectorAll("a.list-card:not([data-processed])");

  for (let listCard of listCards) {
    processListCard(listCard);
  }

}


// Oh, what's that? We have to wait for them to load? Ok.
document.arrive("a.list-card:not([data-processed])", function() {

  processListCard(this);

});



function processListCard(card) {

  var cardTitle = card.querySelector(".list-card-title");
  var cardTitleText = card.querySelector(".list-card-title").innerText;

  if ( /^(\[E\]|#)/gi.test(cardTitleText) ) {
    card.dataset.type = "event";
    card.dataset.icomoonParent = "true";

    if ( /webinar/gi.test(cardTitleText) ) {
      card.dataset.subtype = "webinar";
    }

    var newCardTitle = cardTitleText.replace(/\[.+?\] ?/gi, "");
    cardTitle.innerText = newCardTitle;

  }

  card.dataset.processed = "true";

}
