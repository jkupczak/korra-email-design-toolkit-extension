console.warn("[sonic-toolkit-extension] loaded /js/mailchimp/mailchimp-global.js");
///////////////////////////////////////////////////////////////////////////////////


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
