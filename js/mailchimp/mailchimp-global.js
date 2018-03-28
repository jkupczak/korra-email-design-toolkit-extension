console.warn(" 💎💎💎 [korra-email-design-tooklit] loaded /js/mailchimp/mailchimp-global.js");
///////////////////////////////////////////////////////////////////////////////////

alertify.set('notifier','position', 'bottom-right');

///////////////////
///////////////////
///////////////////
///////////////////



///////////
//
//   TO-DO
//
///////////

// Activate preview mode in "Design" and grab the subject line, from name, and to field.
// Create a header in the preview area that looks like a Gmail line item. Use the data above plus extract preheader tex.



//
//
// Global MailChimp Functions
//
///////////////
///////////////
///////////////

function getMailChimpSendDate(string) {

  var sendDateText        = string.replace(/(?:\r\n|\r|\n)/g,"");
      sendDateText        = sendDateText.replace(/(^.+? on ..., | \d\d?\:.+)/gi,"");

  var sendMonth           = sendDateText.match(/[A-Z][a-z][a-z]/);
  var sendDay             = sendDateText.match(/\d\d?,/)[0].replace(/,/,"");
  var sendYear            = sendDateText.match(/\d\d\d\d/);
  var formattedSendDate   = moment(sendYear+"/"+sendMonth+"/"+sendDay).format('MM/DD/YYYY') || "Error (Unknown Date)";

  return formattedSendDate;

}



///////////////////
///////////////////
///////////////////
///////////////////


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
var mcCampaignName = document.querySelector("#builder-header") || document.querySelector("h1") || document.querySelector(".c-checklistEditor div.header > h2:first-child");
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
  orgId = getOrgId(mcCampaignName);

  if ( pageDisciplineId ) {
    document.body.classList.add("discipline-ready");
    console.groupCollapsed("found discipline id: " + pageDisciplineId);
  } else {
    document.body.classList.add("discipline-ready");
    console.groupCollapsed("could not find discipline id");
  }


  console.log("mcCampaignName: " + mcCampaignName);
  console.log("pageDisciplineId: " + pageDisciplineId);
  console.groupEnd();

  document.body.classList.add("discipline-" + pageDisciplineId);
}




// Add a class to the body based on the current page's URL. For easy css styling.
var pageClass = document.URL.replace(/(^.+?\.com\/?|\/?\?.+|\/?#.+)/gi, "");
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
//    ■ - ...
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

  if ( /(\-ns|\-n\-)/gi.test(campaignTitle) ) {
    var audience = "NS"
  } else {
    var audience = "SUB"
  }

  var versionAclickMap   = versionAUrl.replace("summary", "clickmap-data");
  var versionBclickMap   = versionBUrl.replace("summary", "clickmap-data");


  var abReportText = "- **" + pageDisciplineId.toUpperCase() + "-" + audience + "** [" + campaignTitle + "](" + campaignOverview + "), **Clicks:** [**A**](" + versionAclickMap + ") | [**B**](" + versionBclickMap + ")\n\n"

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


//
// Apply check tool to each campaign as it loads in
//
// https://hacks.mozilla.org/2012/05/dom-mutationobserver-reacting-to-dom-changes-without-killing-browser-performance/
//




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




// setTimeout(function() {
//   var p = document.querySelector("div.slats + div.sub-section");
//   var p_prime = p.cloneNode(true);
//   var secondPageNav = document.querySelector(".line.action-bar");
//   insertAfter(p_prime, secondPageNav);
// },1000);





function processCampaignOverviewList(campaignListParent) {

  console.log("Running processCampaignOverviewList() function.");

  // Iterate through DOM nodes
  // Add a class to allow custom styling based on discipline.
  let campaignsList = document.querySelectorAll("#campaigns-list > li:not(.processed)");


  if ( campaignsList.length > 0 ) {
    console.groupCollapsed("Campaign Disciplines - All Processed Rows");
  }

  // console.log(campaignListParent);
  // console.log(campaignsList);

  for (let campaignRow of campaignsList) {

    // Mark this row as processed.
    campaignRow.classList.add("processed", "campaign-list-row");

    // Campaign Variables
    var emailIcon          = campaignRow.querySelector(".c-channelIcon--email");
    // var campaignStatus     = campaignRow.querySelector(".c-campaignManager_slat_status");
    // var campaignStatusText = campaignRow.querySelector(".c-campaignManager_slat_status span").innerText;
    var scheduledObject    = campaignRow.querySelector(".c-campaignManager_slat_details p:last-child");
    var campaignId         = campaignRow.querySelector("a[title='Campaign name']").href.replace(/^.+?id=/i,"");
    var campaignUniqueId   = campaignRow.querySelector("input[type='checkbox']").value;
    var campaignName       = campaignRow.querySelector("a[title='Campaign name']").innerText;
    var campaignDetails    = campaignRow.querySelector(".c-campaignManager_slat_details");
    // var campaignType       = campaignRow.querySelector("[data-dojo-attach-point='node_typeName']");
    var campaignType       = campaignRow.querySelector("span[aria-label*='Campaign type:']");
    var campaignList       = campaignRow.querySelector("[data-dojo-attach-point='node_listName']");
    var campaignDiscipline = getDisciplineId(campaignName);

    var formattedSendDate = getMailChimpSendDate(campaignRow.querySelector("div > p + p.hide-phone > span.msg").innerText)

    // Begin Grouping
    console.groupCollapsed("Campaign Discipline: " + getDisciplineId(campaignName) + " - Campaign ID: " + campaignId);


        console.log(campaignRow);
        console.log(campaignRow.querySelector("div[widgetid='dijit_form_CheckBox_2']"));
        console.log(campaignRow.querySelector("input[type='checkbox']"));


    // Apply a class to the status badge.
    // campaignStatus.classList.add("current-status-is-" + campaignStatusText.toLowerCase());

    // TOTAL SENT BADGE
    // Set the "Sent" badge if this campaign has been sent
    // if ( campaignStatusText === "Sent" ) {
    //     destroyIfExists(campaignRow.querySelector(".c-campaignManager_slat_stat:empty"));
    //
    //     var dupNode = campaignRow.querySelector(".c-campaignManager_slat_stat:first-child").cloneNode(true);
    //     dupNode.querySelector("p:last-child").innerText = "Sent";
    //
    //     dupNode.children[0].style = "display:block !important;";
    //     destroyIfExists(dupNode.children[1]);
    //
    //     campaignRow.getElementsByClassName("c-campaignManager_slat_stats")[0].prepend(dupNode);
    //
    //
    //
    //     if ( campaignStatusText === "Sent" ) {
    //       console.log(scheduledObject.textContent);
    //       var totalSent = scheduledObject.textContent.replace(/(^.+ to| recipients)/gi,"");
    //       console.log(totalSent);
    //     } else {
    //       var totalSent = "TBD"
    //     }
    //     dupNode.children[0].children[0].innerText = totalSent;
    //
    //     // Add a "Report Download" Button
    //     ///////////
    //     var reportDlLink = document.createElement("a");
    //         reportDlLink.href = "/reports/excel?id=" + campaignId;
    //         reportDlLink.classList.add("icomoon", "icomoon-arrow-down", "button", "campaign-report-dl-button");
    //         reportDlLink.style = "line-height:24px; height:22px; padding:0 8px; font-size:12px; margin:0;"
    //         reportDlLink.addEventListener("click", clickedReportDLButton, false);
    //
    //     insertAfter(reportDlLink, campaignRow.getElementsByClassName("c-campaignManager_slat_stats")[0]);
    //
    // }




    // Class the current row based on the campaigns status
    ///////
        // if ( campaignStatusText === "Sent" ) {
        //   campaignRow.classList.add("status-delivered");
        //   campaignRow.dataset.status = "delivered";
        // } else if ( campaignStatusText === "Scheduled" ) {
        //   campaignRow.classList.add("status-scheduled");
        //   campaignRow.dataset.status = "scheduled";
        // } else if ( campaignStatusText === "Draft" ) {
        //   campaignRow.classList.add("status-draft");
        //   campaignRow.dataset.status = "draft";
        // } else {
        //   campaignRow.classList.add("status-unknown");
        //   campaignRow.dataset.status = "unknown";
        // }
        campaignRow.classList.add("status-delivered");
        campaignRow.dataset.status = "delivered";

    // Add a data attribute the current row based on the campaign ID
    ////////
        campaignRow.dataset.campaignid = campaignId;
        campaignRow.dataset.uniqueid = campaignUniqueId;
        campaignRow.dataset.sendDate = formattedSendDate;


    // Destroy <b> in list name.
    // destroy(campaignList.childNodes[0]);

    // campaignRow.classList.add("campaign-list-row");

    campaignRow.classList.add("discipline-" + campaignDiscipline );
    campaignRow.dataset.discipline = campaignDiscipline;


    // img icon
    // destroy(emailIcon);

    // var disciplineImg = document.createElement("img");
    // if ( campaignDiscipline && /(pt|at|ot|slp|other|ent)/i.test(campaignDiscipline) ) {
    //   disciplineImg.src = chrome.extension.getURL('img/disciplines/' + campaignDiscipline + '.svg');
    // } else {
    //   disciplineImg.src = chrome.extension.getURL('img/disciplines/unknown.svg');
    // }
    // disciplineImg.className = "position--relative";
    // disciplineImg.style = "margin-right:9px;";
    // disciplineImg.width = "20";
    // disciplineImg.height = "20";
    // insertBefore(disciplineImg, campaignDetails);


    // Add a data attribute the current row based on the campaignt type
    ////////
        if ( campaignType.innerText === "Regular" ) {
          campaignRow.dataset.type = "Regular";
        } else {
          campaignRow.dataset.type = "A/B";
        }
        // destroy(campaignType);
        //
        // var campaignTypeIcon = document.createElement("div");
        // campaignTypeIcon.style = "display:flex; align-items:center; margin-right:18px;"
        // campaignTypeIcon.innerHTML = '<svg width="25" height="25" viewBox="0 0 50.3 81.9"><path class="beaker beaker-1" d="M49.7 73.2L35.2 47V34.8c0-2.6-1.1-3.5-4-3.5h-12c-2.9 0-4 0.8-4 3.5V47L0.4 73.6c-0.7 1.3-0.6 3.7 0.5 5.2 0.7 0.9 2.4 3.2 4.8 3.2h39.3c2.5 0 3.7-2.2 4.4-3.2C50.5 77.4 50.5 74.7 49.7 73.2zM21.2 47.9V36.8h8v11.1l7.1 13.7H14.2L21.2 47.9z"/><path class="beaker beaker-2" d="M14 28.1c3.7 0 6.8-3 6.8-6.8 0-3.7-3-6.8-6.8-6.8 -3.7 0-6.8 3-6.8 6.8C7.2 25.1 10.2 28.1 14 28.1z"/><path class="beaker beaker-3" d="M33.5 18.7c5.1 0 9.3-4.2 9.3-9.3S38.7 0 33.5 0c-5.1 0-9.3 4.2-9.3 9.3C24.2 14.5 28.4 18.7 33.5 18.7z"/></svg>'

        // insertBefore(campaignTypeIcon, campaignDetails);


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

}
