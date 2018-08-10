console.warn(" 💎💎💎 [korra-email-design-tooklit] loaded /js/mailchimp/mailchimp-campaigns.js");
//////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
///////
///////         MOVE SEARCH BAR
///////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

// var sideBarWrapper = document.querySelectorAll(".c-campaignManager_sidebar")[0];
// var searchBar = document.querySelectorAll(".c-campaignManager_actionBar")[0];
//
// sideBarWrapper.prepend(searchBar);

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
///////
///////         MOVE CREATE BTN
///////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

// var createBtn = document.querySelector("button[data-test-id='createCampaignButton']");
// createBtn.style = "display: block !important;"
// sideBarWrapper.prepend(createBtn);


//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
///////
///////         PROCESS CAMPAIGN ROWS
///////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////


// watch for element creation in the whole HTML document
// document.arrive("button[data-dojo-attach-point='node_loadButton']", function() {
//   console.log("load button arrived");
//   if ( !this.classList.contains("clicked") ) {
//
//     var loadMoreBtn = document.querySelector("button[data-dojo-attach-point='node_loadButton']");
//     loadMoreBtn.classList.add("clicked");
//     console.log('this.classList.contains("clicked") = false');
//     setTimeout(function() {
//       loadMoreBtn.click()
//     }, 3000);
//   } else {
//     console.log('this.classList.contains("clicked") = true');
//   }
//
// });

var i = 0;
document.arrive("#campaigns-list .c-campaignManager_list_group .c-campaignManager_slat", function(e) {

  // Listen for when campaign rows are added to the DOM.
  console.log("campaign list item arrived! - " + i++);
  processCampaignList();

});


function clickedReportDLButton() {
  console.log("Running clickedReportDLButton() function.");
  this.style.opacity = ".85";
  this.style.background = "#fff";
  this.style.boxShadow = "inset 0 0 0 2px #e0e0e0, 0 0 0 1px #e0e0e0";
  this.classList.remove("icomoon-arrow-down");
  this.classList.add("icomoon-checkmark");
}

function processCampaignList(campaignListParent) {


  // Iterate through DOM nodes
  // Add a class to allow custom styling based on discipline.
  let campaignsList = document.querySelectorAll(".c-campaignManager_slat:not(.processed)");

  if ( campaignsList.length > 0 ) {
    console.groupCollapsed("Campaign Disciplines - All Processed Rows");
  }

  for (let campaignRow of campaignsList) {

    // Mark this row as processed.
    campaignRow.classList.add("processed", "campaign-list-row");

    // Campaign Variables

    var emailIcon, campaignStatus, campaignStatusText, scheduledObject, campaignId, campaignName, campaignDetails, campaignType, campaignList, campaignDiscipline

    emailIcon          = campaignRow.querySelector(".c-channelIcon--email");
    campaignStatus     = campaignRow.querySelector(".c-campaignManager_slat_status");
    campaignStatusText = campaignRow.querySelector(".c-campaignManager_slat_status span").innerText;
    scheduledObject    = campaignRow.querySelector(".c-campaignManager_slat_details p[data-dojo-attach-point='node_additionalMetaData']");
    campaignId         = campaignRow.querySelector("input[type='checkbox']").value;
    campaignName       = campaignRow.querySelector("a.c-campaignManager_slat_details_link").innerText;
    campaignDetails    = campaignRow.querySelector(".c-campaignManager_slat_details");
    campaignType       = campaignRow.querySelector("[data-dojo-attach-point='node_typeName']");
    campaignList       = campaignRow.querySelector("[data-dojo-attach-point='node_listName']");
    campaignDiscipline = getDisciplineId(campaignName);

    // Begin Grouping
    console.groupCollapsed("Campaign Discipline: " + getDisciplineId(campaignName) + " - Campaign ID: " + campaignId + " - Status: " + campaignStatusText);


    // Apply a class to the status badge.
    campaignStatus.classList.add("current-status-is-" + campaignStatusText.toLowerCase());

    // TOTAL SENT BADGE
    // Set the "Sent" badge if this campaign has been sent
    if ( campaignStatusText === "Sent" ) {
        destroyIfExists(campaignRow.querySelector(".c-campaignManager_slat_stat:empty"));

        var dupNode = campaignRow.querySelector(".c-campaignManager_slat_stat:first-child").cloneNode(true);
        dupNode.querySelector("p:last-child").innerText = "Sent";

        dupNode.children[0].style = "display:block !important;";
        destroyIfExists(dupNode.children[1]);

        campaignRow.getElementsByClassName("c-campaignManager_slat_stats")[0].prepend(dupNode);


        if ( campaignStatusText === "Sent" ) {
          console.log(scheduledObject.textContent);
          var totalSent = scheduledObject.textContent.replace(/(^.+ to | recipients.+)/gi,"");
          console.log(totalSent);
        } else {
          var totalSent = "TBD"
        }
        dupNode.children[0].children[0].innerText = totalSent;

    }




    // Class the current row based on the campaigns status
    ///////
        if ( campaignStatusText === "Sent" ) {
          campaignRow.classList.add("status-delivered");
          campaignRow.dataset.status = "delivered";
        } else if ( campaignStatusText === "Scheduled" ) {
          campaignRow.classList.add("status-scheduled");
          campaignRow.dataset.status = "scheduled";
        } else if ( campaignStatusText === "Draft" ) {
          campaignRow.classList.add("status-draft");
          campaignRow.dataset.status = "draft";
        } else {
          campaignRow.classList.add("status-unknown");
          campaignRow.dataset.status = "unknown";
        }

    // Add a data attribute the current row based on the campaign ID
    ////////
        campaignRow.dataset.id = campaignId;


    // Destroy <b> in list name.
    // destroy(campaignList.childNodes[0]);

    // campaignRow.classList.add("campaign-list-row");

    campaignRow.classList.add("discipline-" + campaignDiscipline );
    campaignRow.dataset.discipline = campaignDiscipline;


    // img icon
    destroy(emailIcon);

    var disciplineImg = document.createElement("img");
    if ( campaignDiscipline && /(pt|at|ot|slp|other|ent)/i.test(campaignDiscipline) ) {
      disciplineImg.src = chrome.extension.getURL('img/disciplines/' + campaignDiscipline + '.svg');
    } else {
      disciplineImg.src = chrome.extension.getURL('img/disciplines/unknown.svg');
    }
    disciplineImg.className = "position--relative";
    disciplineImg.style = "margin-right:9px;";
    disciplineImg.width = "20";
    disciplineImg.height = "20";
    insertBefore(disciplineImg, campaignDetails);


    // Add a data attribute the current row based on the campaignt type
    ////////
        if ( campaignType.innerText === "Regular" ) {
          campaignRow.dataset.type = "Regular";
        } else {
          campaignRow.dataset.type = "A/B";
        }
        // destroy(campaignType);

        var campaignTypeIcon = document.createElement("div");
        campaignTypeIcon.style = "display:flex; align-items:center; margin-right:18px;"
        campaignTypeIcon.innerHTML = '<svg width="25" height="25" viewBox="0 0 50.3 81.9"><path class="beaker beaker-1" d="M49.7 73.2L35.2 47V34.8c0-2.6-1.1-3.5-4-3.5h-12c-2.9 0-4 0.8-4 3.5V47L0.4 73.6c-0.7 1.3-0.6 3.7 0.5 5.2 0.7 0.9 2.4 3.2 4.8 3.2h39.3c2.5 0 3.7-2.2 4.4-3.2C50.5 77.4 50.5 74.7 49.7 73.2zM21.2 47.9V36.8h8v11.1l7.1 13.7H14.2L21.2 47.9z"/><path class="beaker beaker-2" d="M14 28.1c3.7 0 6.8-3 6.8-6.8 0-3.7-3-6.8-6.8-6.8 -3.7 0-6.8 3-6.8 6.8C7.2 25.1 10.2 28.1 14 28.1z"/><path class="beaker beaker-3" d="M33.5 18.7c5.1 0 9.3-4.2 9.3-9.3S38.7 0 33.5 0c-5.1 0-9.3 4.2-9.3 9.3C24.2 14.5 28.4 18.7 33.5 18.7z"/></svg>'

        insertBefore(campaignTypeIcon, campaignDetails);


    // // Add a button for downloading reports instantly
    // if ( campaignRow.classList.contains("status-delivered") ) {
    //   var downloadReportEle = document.createElement("a");
    //       // downloadReportEle.innerHTML = "Download Report";
    //       downloadReportEle.className = "mc-btn mc-btn-medium download-report icomoon icomoon-box-add";
    //       downloadReportEle.href = "https://us2.admin.mailchimp.com/reports/excel?id=" + campaignId;
    //       // campaignRow.insertBefore(downloadReportEle, document.querySelector(".meta-actions.campaign.hide-phone"
    //
    //       var dropDownMenu = campaignRow.querySelector(".meta-actions.campaign.lastGroup");
    //       dropDownMenu.insertBefore(downloadReportEle, dropDownMenu.childNodes[0]);
    //       // insertAfter(downloadReportEle, dropDownMenu.lastElementChild);
    // }

    console.groupEnd();

  }
  console.groupEnd();




} // end function
////////////////////////////////////
////////////////////////////////////
////////////////////////////////////


function notifyMe() {
  if (Notification.permission !== "granted")
    Notification.requestPermission();
  else {
    var notification = new Notification(totalUrgentDrafts + ' Urgent Drafts', {
      tag: "mailchimp",
      icon: chrome.extension.getURL('img/mailchimp-notification.png'),
      body: "Hey there! You have " + totalUrgentDrafts + " urgent drafts in MailChimp (and " + totalDraftsOnPage + " total pending drafts), get on it!",
    });

    // Automatically close after 3 minutes.
    setTimeout(notification.close.bind(notification), 180000);

    notification.onclick = function () {
      // window.open("https://us2.admin.mailchimp.com/campaigns/");
      notification.close();
    };

  }

}
