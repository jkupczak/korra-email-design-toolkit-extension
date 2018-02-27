console.warn("[sonic-toolkit-extension] loaded /js/mailchimp/mailchimp-lists.js");
console.log("v1.3");
//////////////////////////////////////////////////////////////////////////////////



var toggleColumnsBtn = document.querySelector("div > div.reorder:first-child");



////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
/*


Automate Group Removal
---------------------

Details here...

*/
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////


////
////
//// Get the total contacts left on page load to determine what's the max pages we can automate.
////
////

calculatePagesLeft();
function calculatePagesLeft() {

  document.arrive(".table-pagination > div:nth-child(2) > div > div:first-child", {onceOnly: true, fireOnAttributesModification: true, existing: true}, function() {

    console.error(this);

    var contactsString = this.innerText.trim();
    console.log(contactsString);

    var contactsOnNextPages = Number(contactsString.replace(/(^.+? of |,)/gi,""));
    var contactsDisplayed = Number(contactsString.replace(/(^.+? (–|\-) | of.+)/gi,""));
    var totalContacts = contactsOnNextPages + contactsDisplayed;

    var totalPages = Math.floor(totalContacts / contactsDisplayed);

    console.error(contactsOnNextPages);
    console.error(contactsDisplayed);
    console.error(totalContacts);
    console.error(totalPages);

  });
}



////
////
//// Build our settings menu modal
////
////

var dataListHtml = "";

let groups = document.querySelectorAll("tr[data-mojo-bulk-action='remove-group']");
for (let group of groups) {
  var groupText = group.querySelectorAll("td:nth-child(2)")[0].innerText;
  var groupId = group.querySelectorAll("td:nth-child(2)")[0].id;
  dataListHtml += '<option value="' + groupId + '">' + groupText + '</option>';
}

var automateSettingsHtml = '<div><div><input id="automate-action-pages" value="1" type="text" placeholder="# of Pages to Automate"></input></div><div><datalist id="group-names-list">' + dataListHtml + '</datalist><input id="group-name" type="text" name="group-names-list" list="group-names-list" placeholder="Group to Remove From"></input></div><div><button class="button" id="start-automation">Start Automation</button></div></div>';

// instanciate new modal
automateSettingsModal = new tingle.modal({
    footer: false,
    stickyFooter: false,
    cssClass: ['fill', 'html-output', 'automate-modal'],

    onOpen: function() {
        console.log('modal open');
    },
    onClose: function() {
        console.log('modal closed');
    }
});

automateSettingsModal.setContent(automateSettingsHtml);
document.getElementById("start-automation").addEventListener("click", automateActionFunc, false);





////
////
//// Inject button that will open the settings modal
////
////

//// Create HTML
var automateAction = '<div id="automate-settings" class="button float-left">Automate</div>';

//// Inject it
toggleColumnsBtn.insertAdjacentHTML('afterend', automateAction);

//// Add an eventlistener
document.getElementById("automate-settings").addEventListener("click", openAutomateSettingsFunc, false);

//// Function to open the settings module.
function openAutomateSettingsFunc() {
  automateSettingsModal.open();
}




////
////
//// Function that determines the settings that will be used during automation.
////
////

function automateActionFunc() {

    // Get the total pages we want to automate through from the input value we entered on the page
    pages = document.getElementById("automate-action-pages").value;
    console.log(pages);

    // Get the total pages we want to automate through from the input value we entered on the page
    groupSelected = document.getElementById("group-name").value;
    console.log(groupSelected);

    automateSettingsModal.close();

    console.log("automateClicks(); beginning: " + pages + " pages will be automated");
    // Run function that does all the clicking.
    automateClicks(pages, groupSelected);

}



////
////
//// Function that does all the work.
////
////

function automateClicks(pages, groupSelected) {

      //// Add a class that identifies that automation is in progress.
      document.body.classList.add("automating-in-progress");

      //// Select all contacts on the page.
      var selectVisible = document.querySelector("#bulk-action-selectall");
      // console.log(selectVisible);
      selectVisible.click();

      var groupToRemove = document.getElementById(groupSelected);
      // console.log(groupToRemove);

      //// Click the appropriate button to remove them from the group.
      // if ( groupToRemove.innerText === "Suppress (GetResponse Placeholders)" ) {
        groupToRemove.click();
      // }

      //// Listen for the confirm modal to appear.
      document.arrive(".automating-in-progress .dijitFocused .bulk-action-button", {onceOnly: true}, function() {
        // console.log("confirm button arrived");
        var confirmModalBtn = document.querySelectorAll(".dijitFocused .bulk-action-button")[0];
        // console.log(confirmModalBtn);

        //// Click to confirm removal.
        confirmModalBtn.click();

        //// Automation is complete. Remove class from body.
        document.body.classList.remove("automating-in-progress");
        document.body.classList.add("waiting-for-rows");

        //// Go to the next page.
        var nextBtn = document.querySelectorAll("button[title='Next']")[0];
        // console.log(nextBtn);
        nextBtn.click();
      });


      //// Listen for the table to repopulate after the next button was clicked.
      document.arrive(".waiting-for-rows #member-grid .row-head", {onceOnly: true}, function() {

        //// Rows arrived, remove the class from the body.
        document.body.classList.remove("waiting-for-rows");

        // console.log(".table-contents arrived");

        //// Subtract one from our page counter.
        pages--;

        //// How many pages left?
        console.log("automateClicks(); progress: " + pages + " left");

        if ( pages > 0 ) {
          automateClicks(pages, groupSelected);
        } else {
          // Push a browser notification
          browserNotification("Automation Complete", "mailchimpAutomation", "img/mailchimp-notification.png", true, 180000);
        }

      });


}





////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
/*

Generate Segment Link
---------------------

When you create a segment and click the "Preview Segment" button, we loop through all of the parameters that were selected.
From the values we find we piece together a URL.

This URL can be shared with anyone that has access to view the segment without needing to save the segment in MailChimp. This allows us to create many,
many segments and save the links locally without cluttering up our account with a long list of segments.

Currently this only works with one parameter. To use more I'd have to crack the querystring code that they use.

*/
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////


var previewBtn = document.querySelector("a[data-mc-el='previewSegmentBtn']");

previewBtn.addEventListener("click", generateLink, false);


var mailchimpDomain = document.URL.replace(/\?.+/gi,"");
var listId = "?" + document.URL.match(/id=.+?\b/i)[0] + "&";
var listType = "type=active&";
var listSegment = "segment=";

console.log(mailchimpDomain);
console.log(listId);
console.log(listType);
console.log(listSegment);

var shareLinkBtn = document.createElement("div");
shareLinkBtn.className = "!margin-bottom--lv1 download-excel button download";
shareLinkBtn.innerText = "Copy Link";
createCopyBtn(shareLinkBtn, document.URL);
insertAfter(shareLinkBtn, document.querySelector("a[data-mc-group='exportLink']"));


function generateLink() {

  console.log("running generateLink");
  var listSegmentValues = "";

  // let rows = document.querySelectorAll(".segment-conditions > li");
  // for (let row of rows) {
  //
  //   let segments = row.querySelectorAll("div.segment-block select");
  //   for (let segment of segments) {
  //     console.log( segment.querySelector("option:checked").value );
  //     listSegmentValues += segment.querySelector("option:checked").value + ",";
  //   }
  //
  // }

  var row = document.querySelectorAll(".segment-conditions > li")[0]

  let segments = row.querySelectorAll("div.segment-block select, div.segment-block input");
  for (let segment of segments) {
    if (segment.tagName === "SELECT") {
      console.log( segment.querySelector("option:checked").value );
      listSegmentValues += segment.querySelector("option:checked").value + ",";
    } else {
      console.log( segment.value );
      listSegmentValues += segment.value + ",";
    }

  }

  listSegmentValues = listSegmentValues.replace(/,$/,"");

  var shareableLink = mailchimpDomain + listId + listType + listSegment + listSegmentValues;
  console.log(shareableLink);
  shareLinkBtn.dataset.copy = shareableLink;
}
