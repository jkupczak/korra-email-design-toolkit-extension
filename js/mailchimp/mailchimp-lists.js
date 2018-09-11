console.warn("Korra loaded /js/mailchimp/mailchimp-lists.js");
//////////////////////////////////////////////////////////////

var originalPageTitle = document.title;
var mainBtns = document.querySelectorAll("#member-grid-wrap .table-pagination > div:first-child")[0];
var toggleColumnsBtn = document.querySelector("div > div.reorder:first-child");



////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
/*


  Links to Profiles in MedBridge Admin Panel
  ------------------------------------------

  Give each row a link that searches for the email address in the admin panel.


*/
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////


  document.arrive(".profile-view", {fireOnAttributesModification: true, existing: true}, function() {

    this.style = "padding-left:28px;"

    var email = this.querySelectorAll("a")[0].innerText;

    // Link to the admin page
    var adminLink = document.createElement("a");
    adminLink.classList.add("material-icons", "mdk-icon-btn", "mdk-icon-circle", "mdk-icon-xs", "mdk-icon-blue");
    adminLink.innerHTML = "person_pin";
    adminLink.target = "_blank";
    adminLink.href = "https://www.medbridgeeducation.com/admin/students/index?txt_search=" + email;
    adminLink.style = "margin:auto; position:absolute; top:0; bottom:0; left:0px;"

    this.appendChild(adminLink);

    // Quick copy icon
    var copyLink = document.createElement("div");
    copyLink.classList.add("material-icons", "mdk-icon-btn", "mdk-icon-circle", "mdk-icon-xs", "mdk-icon-purple");
    copyLink.innerHTML = "bookmark";
    copyLink.style = "margin:auto; position:absolute; top:0; bottom:0; left:22px;"

    createCopyBtn(copyLink, email);

    this.appendChild(copyLink);

  });


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

var automateSettingsHtml = '<div class="automate-modal"><section><h4>Pages to Automate</h4><input id="automate-action-pages" value="1" type="text" placeholder="# of Pages to Automate"></input></section><section><div><datalist id="group-names-list">' + dataListHtml + '</datalist><input id="group-name" type="text" name="group-names-list" list="group-names-list" placeholder="Group to Remove From"></input></div><div><button class="button" id="automate-group-removal">Remove from Group</button></div></section><section><div><button id="automate-unsubscribe">Unsubscribe</button></div></section><section><div><button id="automate-resubscribe">Resubscribe</button></div></section></div>';

// instanciate new modal
automateSettingsModal = new tingle.modal({
    footer: false,
    stickyFooter: false,
    cssClass: ['fill', 'html-output', 'automate-modal'],

    onOpen: function() {
        // console.log('modal open');
    },
    onClose: function() {
        // console.log('modal closed');
    }
});

automateSettingsModal.setContent(automateSettingsHtml);
document.getElementById("automate-group-removal").addEventListener("click", automateActionFunc, false);
document.getElementById("automate-unsubscribe").addEventListener("click", automateActionFunc, false);
document.getElementById("automate-resubscribe").addEventListener("click", automateActionFunc, false);



////
////
//// Inject button that will open the settings modal
////
////

//// Create HTML
var automateAction = document.createElement("div");
automateAction.style = "display:none; margin-right:6px !important";
automateAction.innerHTML = "Automate";
automateAction.classList.add("button", "float-left");

//// Add an eventlistener
// document.getElementById("automate-settings").addEventListener("click", openAutomateSettingsFunc, false);
automateAction.addEventListener("click", openAutomateSettingsFunc, false);

//// Inject it
mainBtns.appendChild(automateAction);
// toggleColumnsBtn.insertAdjacentHTML('afterend', automateAction);


// Only add the Automate button when we are looking at a segment.
document.arrive(".status-container > span > span.fwn", {fireOnAttributesModification: true, existing: true}, function() {

  automateAction.style.display = "inline-block";

});


//// Function to open the settings module.
function openAutomateSettingsFunc() {
  automateSettingsModal.open();
}

var closeSegment = document.querySelectorAll(".float-right.bar-button[data-dojo-attach-point='closeAction']")[0];
console.log(closeSegment)

closeSegment.addEventListener("click", removeAutomateBtn, false);

function removeAutomateBtn() {
  automateAction.style.display = "none";
}


////
////
//// Function that determines the settings that will be used during automation.
////
////

function getSegmentName() {
  return document.querySelectorAll("span[data-dojo-attach-point='statusMessage']")[0].innerHTML.replace(/<.+/gi,"");
}

function automateActionFunc(e) {

  console.log(this, event, event.target);

    var action;
    var groupSelected;

    //
    var segmentName = getSegmentName();

    // Get the total pages we want to automate through from the input value we entered on the page
    var pages = document.getElementById("automate-action-pages").value;


    if ( this.id === "automate-group-removal") {

      action = "groups";
      // Get the total pages we want to automate through from the input value we entered on the page
      groupSelected = document.getElementById("group-name").value;
      console.log(groupSelected);

    } else if  ( this.id === "automate-unsubscribe") {
      action = "unsubscribe";
    } else if  ( this.id === "automate-resubscribe") {
      action = "resubscribe";
    }

    automateSettingsModal.close();

    console.log("automateClicks(); beginning: " + pages + " pages will be automated");
    // Run function that does all the clicking.
    automateClicks(segmentName, pages, action, groupSelected);

}


////
////
//// Function that does all the work.
////
////

function automateClicks(segmentName, pages, action, groupSelected) {

  console.log(segmentName, pages, action, groupSelected);

  // console.log(segmentName, getSegmentName());

  // Make sure we're still automating the right contacts by checking the segment name.
  if ( segmentName === getSegmentName() ) {

      //// Add a class that identifies that automation is in progress.
      document.body.classList.add("automating-in-progress");

      //// Select all contacts on the page.
      var selectVisible = document.querySelector("#bulk-action-selectall");
      // console.log(selectVisible);
      selectVisible.click();

      // Remove from Group
      if ( action === "groups") {

        var groupToRemove = document.getElementById(groupSelected);
        groupToRemove.click();

      // Unsusbcribe
      } else if ( action === "unsubscribe" ) {

        document.querySelectorAll("[data-mojo-bulk-action='unsubscribe']")[0].click();

      // Resubscribe
      } else if ( action === "resubscribe" ) {

        document.querySelectorAll("[data-mojo-bulk-action='admin-resubscribe']")[0].click();

      }

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
        document.title = "(" + pages + " pages left) " + originalPageTitle;

        if ( pages > 0 ) {
          automateClicks(segmentName, pages, action, groupSelected);
        } else {
          // Push a browser notification
          browserNotification("Automation Complete", "mailchimpAutomation", "img/mailchimp-notification.png", true, 180000);
        }

      });

  } else {
    console.error("Error! Segment name did not match! Automation cancelling. Check that data was not improperly altered.")
  }


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
