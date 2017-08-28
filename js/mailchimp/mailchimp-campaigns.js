console.warn("[sonic-toolkit-extension] loaded /js/mailchimp/mailchimp-campaigns.js");
//////////////////////////////////////////////////////////////////////////////////////


// Global Variables
///////////////////

var totalUrgentDrafts;

///////
///////
//
// Filter Bar
//
///////
///////
          //
          // // Filter Bar Wrapper Element
          // var filterBar = document.createElement("div");
          // filterBar.id = "filter-bar";
          // document.querySelector("div.line.action-bar > div.lastUnit.size1of1").appendChild(filterBar);
          //
          // // Check All Button
          // var btnCheckVisible = document.createElement("div");
          // btnCheckVisible.id = "check-visible";
          // btnCheckVisible.className = "filter-group";
          // btnCheckVisible.addEventListener('click', checkVisible, false);
          // filterBar.appendChild(btnCheckVisible);
          //
          // // Discipline Filters
          // var disciplineFilters = document.createElement("div");
          // disciplineFilters.id = "discipline-filters";
          // disciplineFilters.className = "filter-group";
          // disciplineFilters.innerHTML = "<div class='discipline-filter filter-pt' data-filter='pt' data-status='off'></div><div class='discipline-filter filter-at' data-filter='at' data-status='off'></div><div class='discipline-filter filter-ot' data-filter='ot' data-status='off'></div><div class='discipline-filter filter-slp' data-filter='slp' data-status='off'></div><div class='discipline-filter filter-other' data-filter='other' data-status='off'></div><div class='discipline-filter filter-lmt' data-filter='lmt' data-status='off'></div><div class='discipline-filter filter-ent' data-filter='ent' data-status='off'></div>";
          // filterBar.appendChild(disciplineFilters);
          //
          // document.querySelector("#discipline-filters").addEventListener('click', filterRows, false);
          //
          //
          // function checkVisible() {
          //
          //   console.log("checkVisible() running...")
          //
          //   let rows = document.querySelectorAll(".campaign-list-row");
          //   for (let row of rows) {
          //
          //     if ( row.classList.contains("filtered-out") ) {
          //       console.log("filtered out")
          //     } else {
          //       row.querySelector("div > div > .selectCheckBox > input.dijitCheckBoxInput").click();
          //       console.log("checked!");
          //     }
          //
          //   }
          // }
          //
          //
          //
          // var activeFiltersArr = [];
          // function filterRows() {
          //
          //   console.log(this);
          //   console.log(event.target);
          //   console.log(event.target.dataset.filter);
          //   console.log(activeFiltersArr);
          //
          //   // Figure out which filter was clicked
          //   var filterName = event.target.dataset.filter;
          //   var filterObject = event.target;
          //
          //   if ( filterName ) {
          //
          //     // Is this the first time a filter has been selected?
          //     if ( this.dataset.active !== "true" ) {
          //       this.dataset.active = "true";
          //       this.classList.add("filters-active");
          //
          //       let filters = document.querySelectorAll("#discipline-filters .discipline-filter");
          //       for (let filter of filters) {
          //
          //         if ( filter.dataset.discipline !== filterName ) {
          //           filter.classList.add("unselected");
          //           filter.dataset.status = "off";
          //         } else {
          //           filter.classList.remove("unselected");
          //           filter.dataset.status = "on";
          //         }
          //       }
          //
          //     }
          //
          //   // Determine the status of the newly clicked filter
          //   var filterStatus = event.target.dataset.status;
          //
          //   if ( filterStatus === "off" ) {
          //
          //     // This filter is now active
          //     filterObject.classList.remove("unselected");
          //     filterObject.dataset.status = "on";
          //
          //     activeFiltersArr.push(filterName);
          //
          //   } else {
          //
          //     var index = activeFiltersArr.indexOf(filterName);
          //     activeFiltersArr.splice(index, 1);
          //
          //     filterObject.classList.add("unselected");
          //     filterObject.dataset.status = "off";
          //   }
          //   console.log(activeFiltersArr);
          //
          //
          //   // Filter out the rows
          //   let rows = document.querySelectorAll(".campaign-list-row");
          //   for (let row of rows) {
          //
          //     console.log("Current Row: " + row.dataset.discipline);
          //     row.classList.remove("filtered-out");
          //
          //     var arrayLength = activeFiltersArr.length;
          //     for (var i = 0; i < arrayLength; i++) {
          //       if ( row.dataset.discipline === activeFiltersArr[i] ) {
          //         row.classList.remove("filtered-out");
          //         console.log('row.classList.remove("filtered-out");');
          //         break
          //       } else {
          //         row.classList.add("filtered-out");
          //         console.log('row.classList.add("filtered-out");');
          //       }
          //     }
          //
          //
          //
          //   }
          //
          //
          //   }
          // }

///////
///////
//
// Get the buttons in the header
//
///////
///////

        // var dlSentCampaigns = document.querySelector("div.float-right.hide-phone > a.button");
        // console.log(dlSentCampaigns);
        //
        // var headerBtns = document.querySelector("div.selfclear > div.float-right.hide-phone:last-child");
        // console.log(headerBtns);

///////
///////
//
// HARVEST!
//
///////
///////

        // var harvestDataBtn = document.createElement("a");
        //     harvestDataBtn.className = "button !margin-right--lv0 jk-btn jk-export-extra-data";
        //     harvestDataBtn.innerHTML = "Harvest Data";
        //     harvestDataBtn.addEventListener("click", harvestData, false);
        //
        // // Add it to the DOM with the rest of the buttons
        // headerBtns.insertBefore(harvestDataBtn, dlSentCampaigns);

function harvestData() {

    let arr = document.querySelectorAll("a[title='Campaign Name']");
    let genObj = genFunc();

    let val = genObj.next();

    console.log(val.value);
    console.log(val.value.href.replace(/^.+?id=/gi,""));
    window.open('https://us2.admin.mailchimp.com/reports/show?id=' + val.value.href.replace(/^.+?id=/gi,"") + "&capture=1", '_blank');

    let interval = setInterval(() => {
      val = genObj.next();

      if (val.done) {
        clearInterval(interval);
      } else {

        console.log(val.value.href);
        console.log(val.value.href.replace(/^.+?id=/gi,""));
        window.open('https://us2.admin.mailchimp.com/reports/show?id=' + val.value.href.replace(/^.+?id=/gi,"") + "&capture=1", '_blank');

      }
    }, 3500);

    function* genFunc() {
      for(let item of arr) {
        yield item;
      }
    }

}


///////
///////
//
// Create a New Button
//
///////
///////
          //
          // var exportExtraCampaignData = document.createElement("a");
          //     exportExtraCampaignData.className = "button !margin-right--lv0 jk-btn jk-export-extra-data";
          //     exportExtraCampaignData.innerHTML = "Export Extra Data";
          //     exportExtraCampaignData.addEventListener("click", processExtraData, false);
          //
          // // Add it to the DOM with the rest of the buttons
          // headerBtns.insertBefore(exportExtraCampaignData, dlSentCampaigns);

function processExtraData() {

  var data = "";

  let rows = document.querySelectorAll(".campaign-list-row");
  for (let row of rows) {

    if ( row.dataset.status === "delivered" )  {
      data += row.dataset.id + "|" + row.dataset.type + "|" + row.querySelector("h4 a").textContent + "\n"
    }

  }

  data = data.trim();



  // instanciate new modal
  tingleExportData = new tingle.modal({
      footer: false,
      stickyFooter: false,
      cssClass: ['fill'],

      onOpen: function() {
          console.log('modal open');
      },
      onClose: function() {
          console.log('modal closed');
          // plainTextTingle.destroy();
      }
  });

  var plainTextContainer = createPlainTextContainer(data);
  tingleExportData.setContent(plainTextContainer);

  tingleExportData.open();
  selectElementContents(plainTextContainer);

}


///////
///////
//
// Create a New Button
//
///////
///////


          // var createReferenceSheet = document.createElement("a");
          //     createReferenceSheet.className = "button !margin-right--lv0 jk-btn jk-export-extra-data";
          //     createReferenceSheet.innerHTML = "Create Reference Sheet";
          //     createReferenceSheet.addEventListener("click", processReferenceSheet, false);
          //
          // // Add it to the DOM with the rest of the buttons
          // headerBtns.insertBefore(createReferenceSheet, dlSentCampaigns);

function processReferenceSheet() {

  var referenceSheet = "<ul style='list-style-type:disc;padding-left:20px;'>";

  let rows = document.querySelectorAll(".campaign-list-row:not(.filtered-out)");
  for (let row of rows) {

    var reportLink = "<a style='display:inline;' href='https://us2.admin.mailchimp.com/reports/summary?id=" + row.dataset.id + "'>View Report</a>";

    if ( row.dataset.type === "Regular" ) {
      var emailLink = "<a style='display:inline;' href='https://us2.admin.mailchimp.com/reports/show?id=" + row.dataset.id + "'>View Email (Direct Link)</a>";
    } else {
      var emailLink = "Email Available in Report"
    }


    if ( row.dataset.status === "delivered" )  {
      referenceSheet += "<li><b style='font-size:12px;'>" + row.querySelector("h4 a").textContent + "</b> &nbsp;|&nbsp; <span style='font-size:10px;'>" + reportLink + " - " + emailLink + "</span></li>"
    }

  }

  referenceSheet += "</ul>"

  // instanciate new modal
  tingleExportData = new tingle.modal({
      footer: false,
      stickyFooter: false,
      cssClass: ['fill', 'html-output'],

      onOpen: function() {
          console.log('modal open');
      },
      onClose: function() {
          console.log('modal closed');
      }
  });

  tingleExportData.setContent(referenceSheet);
  tingleExportData.open();


}


//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
///////
///////         MOVE SEARCH BAR
///////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

var sideBarWrapper = document.querySelectorAll(".c-campaignManager_sidebar")[0];
var searchBar = document.querySelectorAll(".c-campaignManager_actionBar")[0];

sideBarWrapper.prepend(searchBar);

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
///////
///////         MOVE CREATE BTN
///////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

var createBtn = document.querySelector("button[data-test-id='createCampaignButton']");
createBtn.style = "display: block !important;"
sideBarWrapper.prepend(createBtn);


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

document.arrive("#campaigns-list .c-campaignManager_list_group .c-campaignManager_slat", function(e) {

  // console.log("campaign list arrived!");
  processCampaignList();

});


function processCampaignList() {


  // Iterate through DOM nodes
  // Add a class to allow custom styling based on discipline.
  let campaignsList = document.querySelectorAll(".c-campaignManager_slat:not(.processed)");

  if ( campaignsList.length > 0 ) {
    console.groupCollapsed("Campaign Disciplines - All Processed Rows");
  }

  for (let campaignRow of campaignsList) {

    // Mark this row as processed.
    campaignRow.classList.add("processed");

    // Campaign Variables
    var emailIcon          = campaignRow.querySelector(".c-channelIcon--email");
    var campaignStatus     = campaignRow.querySelector(".c-campaignManager_slat_status");
    var campaignStatusText = campaignRow.querySelector(".c-campaignManager_slat_status span").innerText;
    var scheduledObject    = campaignRow.querySelector(".c-campaignManager_slat_details p:last-child");
    var campaignId         = campaignRow.querySelector("input[type='checkbox']").value;
    var campaignName       = campaignRow.querySelector("a.c-campaignManager_slat_details_link").innerText;
    var campaignDetails    = campaignRow.querySelector(".c-campaignManager_slat_details");
    var campaignType       = campaignRow.querySelector("[data-dojo-attach-point='node_typeName']");
    var campaignList       = campaignRow.querySelector("[data-dojo-attach-point='node_listName']");
    var campaignDiscipline = getDisciplineId(campaignName);

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
          var totalSent = scheduledObject.textContent.replace(/(^.+ to| recipients)/gi,"");
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
    destroy(campaignList.childNodes[0]);

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
    disciplineImg.width = "30";
    disciplineImg.height = "30";
    insertBefore(disciplineImg, campaignDetails);


    // Add a data attribute the current row based on the campaignt type
    ////////
        if ( campaignType.innerText === "Regular" ) {
          campaignRow.dataset.type = "Regular";
        } else {
          campaignRow.dataset.type = "A/B";
        }
        destroy(campaignType);

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


  // Set it to chrome.storage if it's recent.
  // Only set it if we're on the main Campaigns page. Olders drafts on past pages are irrelvant.
  if ( /\/campaigns\/(\#t\:campaigns\-list)?$/gi.test(document.URL) ) {


    ////
    ////  Doesn't work sometimes! Fix!
    ////

    totalDraftsOnPage = 0;
    totalUrgentDrafts = 0;

    // Iterate through rows listed as .status-draft
    /////
    let campaignStatusList = document.querySelectorAll(".status-draft");
    for (let pendingCampaign of campaignStatusList) {

      var draftName = pendingCampaign.nextElementSibling.querySelector("a").textContent.trim();
      draftName = draftName.replace(/[^\d]/gi, "");

      if ( draftName !== "" ) {

        // console.log( draftName.substring(0,2) );
        // console.log( draftName.substring(2,4) );

        // Use / and not - http://stackoverflow.com/a/31732581/556079
        var draftDate = new Date(new Date().getFullYear() + "/" + draftName.substring(0,2) + "/" + draftName.substring(2,4));
        // console.log(draftDate);

        // console.log("Draft: " + draftName + " - Draft Date: " + draftDate);

        var draftDeadline = calcWorkingDays(new Date(), 2);

        if ( draftDate <= draftDeadline ) {
          totalUrgentDrafts++
          pendingCampaign.closest("li").classList.add("urgent");
          // console.log("totalUrgentDrafts: " + totalUrgentDrafts);
        }

      }

      totalDraftsOnPage++
      pendingCampaign.closest("li").classList.add("draft");
      console.log("totalDraftsOnPage: " + totalDraftsOnPage);

    }

    // Save to localStorage (do not use)
    // localStorage.setItem('pendingDrafts', totalDraftsOnPage);

    // Save it using the Chrome extension storage API.
    // http://stackoverflow.com/a/14533446/556079
    chrome.storage.sync.set({'pendingDrafts': totalDraftsOnPage}, function() {
      // Notify that we saved.
      // message('Settings saved');
      // console.log('Saved', key, testPrefs);
      // console.log('Saved', 'pendingDrafts', totalDraftsOnPage);
      // console.log('Saved', 'pendingDrafts');
    });
    chrome.storage.sync.set({'urgentDrafts': totalUrgentDrafts}, function() {
      // Notify that we saved.
      // message('Settings saved');
      // console.log('Saved', key, testPrefs);
      // console.log('Saved', 'pendingDrafts', totalDraftsOnPage);
      // console.log('Saved', 'pendingDrafts');
    });
  }




  destroyIfExists( document.querySelector(".total-drafts") );

  // if ( elExists(document.querySelector(".total-drafts")) ) {
  //
  //   document.querySelector(".total-drafts-number").innerHTML = totalDraftsOnPage;
  //
  // } else {

    // Create menu item to show total drafts
    var draftsEle = document.createElement("li");
    draftsEle.className = "total-drafts nav-link small-meta fwb hide-mobile"
    if ( totalDraftsOnPage > 0 ) {
      draftsEle.classList.add("drafts-exist");
    }

    var totalDraftsNumber = document.createElement("div");
    totalDraftsNumber.className = "total-drafts-number"
    var draftTotalWrapperText = document.createTextNode(totalDraftsOnPage);
    totalDraftsNumber.appendChild(draftTotalWrapperText);


    var draftTotalTextWrapper = document.createElement("div");
    draftTotalTextWrapper.className = "alignc padding--lv3 gray-link !padding-top-bottom--lv0"

    draftTotalTextWrapper.appendChild(totalDraftsNumber);

    var draftPluralTextNode = document.createTextNode("Pending Drafts");
    var draftPluralWrapper = document.createElement("div");
    draftPluralWrapper.appendChild(draftPluralTextNode);
    draftTotalTextWrapper.appendChild(draftPluralWrapper);

    draftsEle.appendChild(draftTotalTextWrapper);


    var lastMenuItem = document.querySelector("li.nav-link:last-child");
    insertAfter(draftsEle, lastMenuItem);

  // }



  //////////////
  //////////////
  //////////////
  //////////////
  //
  //  NOTIFICATIONS
  //
  //  request permission on page load
  //
  // !!! - THe notify function exists here and in mailchimp.js. Can I have it in just one place?
  //
  //////////////
  //////////////
  //////////////
  document.addEventListener('DOMContentLoaded', function () {
    if (!Notification) {
      alert('Desktop notifications not available in your browser. Try Chromium.');
      return;
    }

    if (Notification.permission !== "granted")
      Notification.requestPermission();
  });


  // On page load (once the observer picks up the DOM)
  if ( totalUrgentDrafts && totalUrgentDrafts > 0 && /\/campaigns\/(\#t\:campaigns\-list)?$/gi.test(document.URL) ) {
    notifyMe();
  }



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
