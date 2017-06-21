console.warn(">>> mailchimp.js loaded - v2");

// Do specific iFrames, not all iFrames.

// let iframes = document.querySelectorAll("iframe");
// for (let iframe of iframes) {
//   var fullScreenLink = document.createElement("a");
//   fullScreenLink.href = iframe.src;
//   fullScreenLink.innerHTML = "Fullscreen";
//
//   var iframeWrapper = document.createElement("div");
//
//   console.log(iframe.parentNode);
//
//   wrap(iframe, iframeWrapper);
//
//   iframeWrapper.prepend(fullScreenLink);
//
// }

/////
// Set body class to a found discipline
/////
var mcCampaignName = document.querySelector("#builder-header") || document.querySelector("h1");
if ( mcCampaignName ) {

  mcCampaignName = mcCampaignName.innerText;

  applyMcTheme();

  if ( typeof(cpTitleInput) != 'undefined' && cpTitleInput != null ) {
    cpTitleInput.addEventListener("blur", function( event ) {
      mcCampaignName = event.target.value;

      // Remove classes with a specific prefix
      // http://stackoverflow.com/a/10835425/556079
      var prefix = "discipline";
      var classes = document.body.className.split(" ").filter(function(c) {
          return c.lastIndexOf(prefix, 0) !== 0;
      });
      document.body.className = classes.join(" ").trim();
      //

      applyMcTheme();
    }, true);

  }
}
function applyMcTheme() {

  pageDisciplineId = getDisciplineId(mcCampaignName);

  if ( getDisciplineId(mcCampaignName) ) {
    document.body.classList.add("discipline-ready");
    console.groupCollapsed("found discipline id");
  } else {
    console.groupCollapsed("could not find discipline id");
  }
    console.log("mcCampaignName: " + mcCampaignName);
    console.log("pageDisciplineId: " + pageDisciplineId);
  console.groupEnd();

  document.body.classList.add("discipline-" + getDisciplineId(mcCampaignName));
}




// Add a class to the body based on the current page's URL. For easy css styling.
var pageClass = document.URL.replace(/(^.+?\.com\/?|\/?\?.+)/gi, "");
    pageClass = pageClass.replace(/\//gi, "-");
document.body.classList.add("page-" + pageClass);

var toolboxBar = document.createElement("div");
toolboxBar.className = "toolbox-bar";
toolboxBar.id = "toolbox-bar";
// toolboxBar.innerHTML = "Test";

document.body.prepend(toolboxBar);



///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////                         ///////////////////////////
///////////////////////////      MAILCHIMP.JS       ///////////////////////////
///////////////////////////                         ///////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//
//  TO-DO LIST ✓ ■
//  ==============
//
//  ## Alerts
//    ■ - Only save a draft in storage if the planned send date is today, tomorrow, or past due.
//
//
//
//
//
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////



if ( /(campaigns|reports)\/(show|variates)\/?\?id=/gi.test(document.URL) ) {


  if ( /reports\/variates\/?\?id=/gi.test(document.URL) ) {

    var campaignTitle = document.querySelector(".header > h1").textContent
    var campaignOverview = document.URL;
    var versionAUrl   = document.querySelector("#dgrid_0-row-0 .field-reportLinks a").href;
    var versionBUrl   = document.querySelector("#dgrid_0-row-1 .field-reportLinks a").href;

  } else {

    var campaignTitle = document.querySelector("#content > div > div > h1").textContent
    var campaignOverview = document.URL.replace("show", "variates");
        campaignOverview = campaignOverview.replace("campaigns", "reports");
    var versionAUrl   = document.querySelector(".media-list > li:first-child h4 a").href;
    var versionBUrl   = document.querySelector(".media-list > li:nth-child(2) h4 a").href;

    var versionAUrl   = versionAUrl.replace("show", "summary");
    var versionBUrl   = versionBUrl.replace("show", "summary");

  }

  if ( /-ns/gi.test(campaignTitle) ) {
    var audience = "NS"
  } else {
    var audience = "SUB"
  }

  var versionAclickMap   = versionAUrl.replace("summary", "clickmap-data");
  var versionBclickMap   = versionBUrl.replace("summary", "clickmap-data");


  var abReportText = "- **" + pageDisciplineId.toUpperCase() + "-" + audience + ":** [" + campaignTitle + "](" + campaignOverview + ")\n> Reports: ( [**A**](" + versionAUrl + ") | [**B**](" + versionBUrl + ") ) - Click Maps: ( [**A**](" + versionAclickMap + ") | [**B**](" + versionBclickMap + ") )\n\n"

  var copyMarkdownData = document.createElement("div");
  copyMarkdownData.innerHTML = "Copy A/B Report Links";
  createCopyBtn(copyMarkdownData, abReportText)

  toolboxBar.appendChild(copyMarkdownData);

}



if ( /reports\/show\?id=/gi.test(document.URL) && document.querySelector("#content h3").textContent !== "Combinations" ) {

  var campaignId = document.URL.replace(/^.+?id=/gi,"");
  var fullEmailURL = "https://us2.admin.mailchimp.com/campaigns/preview-content-html?id=" + campaignId;
  var campaignViewLinkElement = document.createElement("a");
  campaignViewLinkElement.href = fullEmailURL;
  campaignViewLinkElement.innerHTML = "Expand Email View &gt;";

  insertBefore(campaignViewLinkElement, document.querySelector("iframe#campaign-overview-html"));

}


// Check if we're on the campaign list page
var campaignListNode = document.querySelector('#campaigns-list')
var campaignListExists = elExists(campaignListNode);



// Updated Drafts Total
// Update the total when the "finshed-scheduled" page is loaded.
if ( /finished\-scheduled/gi.test(document.URL) ) {

  console.error("it works!");

  chrome.storage.sync.get("pendingDrafts", function (obj) {

    var updateDrafts = obj.pendingDrafts - 1;

    console.error(updateDrafts);

    chrome.storage.sync.set({'pendingDrafts': updateDrafts}, function() {  });

  });

}

//
// Apply check tool to each campaign as it loads in
//
// https://hacks.mozilla.org/2012/05/dom-mutationobserver-reacting-to-dom-changes-without-killing-browser-performance/
//




if ( campaignListExists ) {


  ///////
  ///////
  //
  // Filter Bar
  //
  ///////
  ///////

  // Filter Bar Wrapper Element
  var filterBar = document.createElement("div");
  filterBar.id = "filter-bar";
  document.querySelector("div.line.action-bar > div.lastUnit.size1of1").appendChild(filterBar);

  // Check All Button
  var btnCheckVisible = document.createElement("div");
  btnCheckVisible.id = "check-visible";
  btnCheckVisible.className = "filter-group";
  btnCheckVisible.addEventListener('click', checkVisible, false);
  filterBar.appendChild(btnCheckVisible);

  // Discipline Filters
  var disciplineFilters = document.createElement("div");
  disciplineFilters.id = "discipline-filters";
  disciplineFilters.className = "filter-group";
  disciplineFilters.innerHTML = "<div class='discipline-filter filter-pt' data-filter='pt' data-status='off'></div><div class='discipline-filter filter-at' data-filter='at' data-status='off'></div><div class='discipline-filter filter-ot' data-filter='ot' data-status='off'></div><div class='discipline-filter filter-slp' data-filter='slp' data-status='off'></div><div class='discipline-filter filter-other' data-filter='other' data-status='off'></div><div class='discipline-filter filter-lmt' data-filter='lmt' data-status='off'></div><div class='discipline-filter filter-ent' data-filter='ent' data-status='off'></div>";
  filterBar.appendChild(disciplineFilters);

  document.querySelector("#discipline-filters").addEventListener('click', filterRows, false);


  function checkVisible() {

    console.log("checkVisible() running...")

    let rows = document.querySelectorAll(".campaign-list-row");
    for (let row of rows) {

      if ( row.classList.contains("filtered-out") ) {
        console.log("filtered out")
      } else {
        row.querySelector("div > div > .selectCheckBox > input.dijitCheckBoxInput").click();
        console.log("checked!");
      }

    }
  }



  var activeFiltersArr = [];
  function filterRows() {

    console.log(this);
    console.log(event.target);
    console.log(event.target.dataset.filter);
    console.log(activeFiltersArr);

    // Figure out which filter was clicked
    var filterName = event.target.dataset.filter;
    var filterObject = event.target;

    if ( filterName ) {

      // Is this the first time a filter has been selected?
      if ( this.dataset.active !== "true" ) {
        this.dataset.active = "true";
        this.classList.add("filters-active");

        let filters = document.querySelectorAll("#discipline-filters .discipline-filter");
        for (let filter of filters) {

          if ( filter.dataset.discipline !== filterName ) {
            filter.classList.add("unselected");
            filter.dataset.status = "off";
          } else {
            filter.classList.remove("unselected");
            filter.dataset.status = "on";
          }
        }

      }

    // Determine the status of the newly clicked filter
    var filterStatus = event.target.dataset.status;

    if ( filterStatus === "off" ) {

      // This filter is now active
      filterObject.classList.remove("unselected");
      filterObject.dataset.status = "on";

      activeFiltersArr.push(filterName);

    } else {

      var index = activeFiltersArr.indexOf(filterName);
      activeFiltersArr.splice(index, 1);

      filterObject.classList.add("unselected");
      filterObject.dataset.status = "off";
    }
    console.log(activeFiltersArr);


    // Filter out the rows
    let rows = document.querySelectorAll(".campaign-list-row");
    for (let row of rows) {

      console.log("Current Row: " + row.dataset.discipline);
      row.classList.remove("filtered-out");

      var arrayLength = activeFiltersArr.length;
      for (var i = 0; i < arrayLength; i++) {
        if ( row.dataset.discipline === activeFiltersArr[i] ) {
          row.classList.remove("filtered-out");
          console.log('row.classList.remove("filtered-out");');
          break
        } else {
          row.classList.add("filtered-out");
          console.log('row.classList.add("filtered-out");');
        }
      }



    }


    }
  }

  ///////
  ///////
  //
  // Get the buttons in the header
  //
  ///////
  ///////

  var dlSentCampaigns = document.querySelector("div.float-right.hide-phone > a.button");
  console.log(dlSentCampaigns);

  var headerBtns = document.querySelector("div.selfclear > div.float-right.hide-phone:last-child");
  console.log(headerBtns);

  ///////
  ///////
  //
  // HARVEST!
  //
  ///////
  ///////

  var harvestDataBtn = document.createElement("a");
      harvestDataBtn.className = "button !margin-right--lv0 jk-btn jk-export-extra-data";
      harvestDataBtn.innerHTML = "Harvest Data";
      harvestDataBtn.addEventListener("click", harvestData, false);

  // Add it to the DOM with the rest of the buttons
  headerBtns.insertBefore(harvestDataBtn, dlSentCampaigns);

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

  var exportExtraCampaignData = document.createElement("a");
      exportExtraCampaignData.className = "button !margin-right--lv0 jk-btn jk-export-extra-data";
      exportExtraCampaignData.innerHTML = "Export Extra Data";
      exportExtraCampaignData.addEventListener("click", processExtraData, false);

  // Add it to the DOM with the rest of the buttons
  headerBtns.insertBefore(exportExtraCampaignData, dlSentCampaigns);

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


  var createReferenceSheet = document.createElement("a");
      createReferenceSheet.className = "button !margin-right--lv0 jk-btn jk-export-extra-data";
      createReferenceSheet.innerHTML = "Create Reference Sheet";
      createReferenceSheet.addEventListener("click", processReferenceSheet, false);

  // Add it to the DOM with the rest of the buttons
  headerBtns.insertBefore(createReferenceSheet, dlSentCampaigns);

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


  ////////////
  ////////////
  ////////////
  ////////////


    // select the target node to watch
    var target = campaignListNode;

    // create an observer instance
    var observer = new MutationObserver(function(mutations) {

        // console.log("observer activated");

        processCampaignList();

        mutations.forEach(function(mutation) {
            // console.log(mutation.type);
        });
    });

    // configuration of the observer:
    var config = { attributes: true, childList: true, characterData: true }
    // pass in the target node, as well as the observer options
    observer.observe(target, config);

}

//
// Move Google Tracking input
//
var googleTagDisclose = document.getElementById('google-tag-disclose');

if ( typeof(googleTagDisclose) != 'undefined' && googleTagDisclose != null ) {

  var gaHelp = document.querySelector("#google-tag-disclose .field-help");
  if ( typeof(gaHelp) != 'undefined' && gaHelp != null ) {
    gaHelp.parentNode.removeChild(gaHelp);
  }


  var cpTitleInput = document.getElementById("title");
  cpTitleInput.parentNode.appendChild(googleTagDisclose);
  // document.querySelector('#main > div > div > div > div.lastUnit.size1of2.readable-max-width:first-child').appendChild(googleTagDisclose);
}


/////
// Mirror Text
/////

if ( typeof(cpTitleInput) != 'undefined' && cpTitleInput != null ) {

  cpTitleInput.setAttribute("maxlength", "50");

  var cpWrapper = document.getElementById("google-tag-disclose");
  var gaTitleInput = document.getElementById("analytics-tag");

  var mirrorInput = true;
  // gaTitleInput.classList.add()

  var mirrorBtn = document.createElement("div");
  mirrorBtn.className = "mirror";
  var mirrorBtnText = document.createTextNode("Mirroring Text");
  mirrorBtn.appendChild(mirrorBtnText);
  mirrorBtn.addEventListener("click", mirrorToggle, false);
  cpWrapper.appendChild(mirrorBtn);

  cpTitleInput.onkeyup = function() {
    if ( mirrorInput ) {
      gaTitleInput.value = cpTitleInput.value;
    }
  }

        // Clean Fields Button
        var cleanFieldsEle = document.createElement("div");

        var cleanFieldsEleText = document.createTextNode("Clean Field");
        cleanFieldsEle.appendChild(cleanFieldsEleText);

        cleanFieldsEle.className = "clean-fields chr-btn";
        cleanFieldsEle.addEventListener("click", cleanMcTitleField, false);


        var campaignNameFieldLabel = document.querySelector("div > label[for='title']:first-child") || document.querySelector("div > label[for='title']:nth-child(2)");
        campaignNameFieldLabel.appendChild(cleanFieldsEle);

        function cleanMcTitleField() {
          var campaignNameField = document.querySelector("#title").value.replace(/ \(copy.+/gi, "");
          document.querySelector("#title").value = campaignNameField;
        }

}
function mirrorToggle() {
  mirrorInput = !mirrorInput;
  // console.log("toggle: " + mirrorInput);
  mirrorBtn.classList.toggle("off");
  gaTitleInput.classList.toggle("off");
}


//
// Move Subject Line
//
// var subjectLineEntry = document.querySelector('div.lastGroup.size1of1.border-below:nth-child(3)');
//
// if ( typeof(subjectLineEntry) != 'undefined' && subjectLineEntry != null ) {
//
//   var subjectParent = document.querySelector("#main > div > div.lastUnit.size1of1:first-child");
//   var subjectSibling = document.querySelector("#main > div > div.lastUnit.size1of1:first-child > div:first-child");
//
//   subjectParent.insertBefore(subjectLineEntry, subjectSibling);
// }





// document.documentElement.scrollHeight;

// document.body.onload = addElement;
//
// function addElement () {
//   // create a new div element
//   // and give it some content
//   var newDiv = document.createElement("div");
//   var newContent = document.createTextNode("Hi there and greetings!");
//   newDiv.appendChild(newContent); //add the text node to the newly created div.
//
//   // add the newly created element and its content into the DOM
//   // var currentDiv = document.querySelector("body");
//   // document.body.insertBefore(newDiv, currentDiv);
//   document.getElementsByTagName('body')[0].appendChild(newDiv);
//
//   console.log("success?");
// }


// var mcFilterBtn = document.querySelector(".filter-btn");
//
// if ( mcFilterBtn ) {
//
//   var newFilter = document.createElement("li");
//
//   document.querySelector('.filter-btn').appendChild(newFilter);
//
// } else {
//   console.log("not found");
// }


var totalDraftsOnPage;

chrome.storage.sync.get("pendingDrafts", function (obj) {

  console.error(obj.pendingDrafts + " drafts");
  // console.error(totalDraftsOnPage);

  totalDraftsOnPage = obj.pendingDrafts;

  // console.error(totalDraftsOnPage);

});



function downloadReportBtn() {

}




function processCampaignList() {

  // MailChimp updates #campaigns-list twice on load, the first time it's empty. So we search for a child and then start our script if one exists.
  var campaignCheck = document.querySelector("#campaigns-list > li:first-child")

  if (elExists(campaignCheck)) {

      console.groupCollapsed("Campaign Disciplines - All Processed Rows");

      // Iterate through DOM nodes - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of
      // Add a class to allow custom styling based on discipline.
      let campaignsList = document.querySelectorAll("#campaigns-list li.selfclear");
      for (let campaign of campaignsList) {

        // var campaignId = campaign.querySelector("a[title='Campaign Name']").href.trim().replace(/^.+?=/, "")
        var campaignId = campaign.querySelector("input[type='checkbox']").value;
        var campaignName = campaign.querySelector('a[title="Campaign Name" i]').innerText;

        console.groupCollapsed("Campaign Discipline: " + getDisciplineId(campaignName) + " - Campaign ID: " + campaignId);


        // Class the current row based on the campaigns status
        ///////
        if ( elExists(campaign.querySelector('span[title="delivered"]')) ) {
          campaign.classList.add("status-delivered");
          campaign.dataset.status = "delivered";
        } else if ( elExists(campaign.querySelector('span[title="scheduled"]')) ) {
          campaign.classList.add("status-scheduled");
          campaign.dataset.status = "scheduled";
        } else if ( elExists(campaign.querySelector('span[title="draft"]')) ) {
          campaign.classList.add("status-draft");
          campaign.dataset.status = "draft";
        } else {
          campaign.classList.add("status-unknown");
          campaign.dataset.status = "unknown";
        }

        // Add a data attribute the current row based on the campaign ID
        ////////
        campaign.dataset.id = campaignId;

        if ( campaign.querySelector("span[aria-label*='Campaign type:']").textContent === "regular" ) {
          campaign.dataset.type = "Regular";
        } else {
          campaign.dataset.type = "A/B";
        }




        campaign.classList.add("campaign-list-row");

        campaign.classList.add("discipline-" + getDisciplineId(campaignName) );
        campaign.dataset.discipline = getDisciplineId(campaignName);


        console.log(getDisciplineId(campaignName) + " - " + campaignName);

        // Add a button for downloading reports instantly
        if ( campaign.classList.contains("status-delivered") ) {
          var downloadReportEle = document.createElement("a");
              // downloadReportEle.innerHTML = "Download Report";
              downloadReportEle.className = "mc-btn mc-btn-medium download-report icomoon icomoon-box-add";
              downloadReportEle.href = "https://us2.admin.mailchimp.com/reports/excel?id=" + campaignId;
              // campaign.insertBefore(downloadReportEle, document.querySelector(".meta-actions.campaign.hide-phone"

              var dropDownMenu = campaign.querySelector(".meta-actions.campaign.lastGroup");
              dropDownMenu.insertBefore(downloadReportEle, dropDownMenu.childNodes[0]);
              // insertAfter(downloadReportEle, dropDownMenu.lastElementChild);
        }

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

      // On page load (once the observer picks up the DOM)
      if ( totalUrgentDrafts > 0 && /\/campaigns\/(\#t\:campaigns\-list)?$/gi.test(document.URL) ) {
        notifyMe();
      }

      ////////////////////////////////////
      ////////////////////////////////////
      ////////////////////////////////////





  }
}



// window.onbeforeunload = function (e) {
//
//   // if ( totalDraftsOnPage > 0 ) {
//     return 'There are unsent drafts on this page! Are you sure you want to leave?';
//   // }
//
// };




// alertify.success("Saved to clipboard");


// setTimeout(function() {
//   var p = document.querySelector("div.slats + div.sub-section");
//   var p_prime = p.cloneNode(true);
//   var secondPageNav = document.querySelector(".line.action-bar");
//   insertAfter(p_prime, secondPageNav);
// },1000);
