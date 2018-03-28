console.warn("loaded js/mailchimp/mailchimp-design.js");
///////////////////////////////////////////////////////


//
document.querySelector("body").classList.add("initial-load");


// Set a default preheader.
var preheader = "Join more than 70,000 clinicians using MedBridge to advance their careers and improve outcomes every day. Subscribe now and gain unlimited access to hundreds of interactive video-based CEU courses and patient engagement tools on the all-in-one MedBridge platform.";

//
var previewCol = document.querySelector("#previewcol");
var iframeWrapper = previewCol.querySelector(".colbody");

// Create our "Gmail" style preview box that will show From name, subject line, and preheader.
var gmailWrapper = document.createElement("div");
    gmailWrapper.className = "gmail-wrapper";

    previewCol.prepend(gmailWrapper);

    console.log("1");
    console.log(gmailWrapper);


// Open the "Enter preview mode (1)" modal with a click so that we can gather data.
// We'll grab the from name and subject line. They don't appear immediately, so we'll grab them later once they are dynamically loaded into the page.
document.querySelector("#preview-actions a[title*='Preview the content']").click();

// The "Preview and Test" menu that holds the "Enter preview mode (1)" modal link stays open after we clicked on it above, remove a class to close it.
document.querySelector(".hover-list.small-meta.stayopen").classList.remove("stayopen");




//
document.arrive(".initial-load .preview-container .float-left > ul", function() {

  console.log("preview container <ul> arrived!");

  var subjectLine = document.querySelector(".preview-container .float-left > ul > li:nth-child(3) p:last-child").textContent;
  var fromName    = document.querySelector(".preview-container .float-left > ul > li:nth-child(2) p:nth-child(2)").textContent;
  var fromEmail   = document.querySelector(".preview-container .float-left > ul > li:nth-child(2) p:nth-child(3)").textContent;
  var toName      = document.querySelector(".preview-container .float-left > ul > li:nth-child(1) p:nth-child(2)").textContent;

  // The preheader text is saved to data-preheader in the body tag everytime the preview iframe on the left is refreshed to match the pasted HTML code in the right iframe.
  var preheader   = document.body.dataset.preheader;

  document.querySelector(".preview-container a[data-dojo-attach-point='closeLink']").click();

  setTimeout(function(){
    document.querySelector("body").classList.remove("initial-load");
  }, 1000);


  console.log(subjectLine);
  console.log(fromName);
  console.log(fromEmail);
  console.log(toName);

  var gmailRow = '<div class="gmail-row"><div class="from-name-wrapper"><div class="from-name">' + fromName + '</div></div><div class="subject-line-wrapper"><div class="subject-line">' + subjectLine + '</div></div><div class="preheader-wrapper"><div class="preheader">' + preheader + '</div></div></div>';

  console.log("2");
  console.log(gmailWrapper);

  gmailWrapper.innerHTML = gmailRow;



});
///// END ARRIVE



//////////////////
//////////////////
// Create a label to place above the test email that we're going to send out.
//////////////////
//////////////////

var sendTestLnk = document.querySelector("a[onclick*='showSendTestDialog']");
sendTestLnk.addEventListener("click", generateTestLabeler, false);

function generateTestLabeler() {

  console.log("'Send a test email' link clicked. Generating the test label code.")



  // ORGANIZATION
  ///////////////

  console.log(orgId);

  var orgColor = "#ffffff";
  var orglabel;

  if ( orgId === "fox" ) {
    orgColor = "#f05922";
    orglabel = "FOX Rehab";
  } else if ( orgId === "hs" ) {
    orgColor = "#ff4f4f";
    orglabel = "HealthSouth";
  } else if ( orgId === "dr" ) {
    orgColor = "#89daa2";
    orglabel = "Drayer";
  }

  if ( orglabel ) {
    var insertOrg = '<font color="' + orgColor + '">' + orglabel + '</font>';
  }


  // DISCIPLINE
  /////////////

  console.log(pageDisciplineId);

  var classDisc;
  var discColor = "#ffffff";
  var discLabel = "";

  if ( pageDisciplineId === "pt" ) {
    discColor = "#ffbe12";
    discLabel = "PT";
  } else if ( pageDisciplineId === "at" ) {
    discColor = "#ff620d";
    discLabel = "AT";
  } else if ( pageDisciplineId === "ot" ) {
    discColor = "#bf002d";
    discLabel = "OT";
  } else if ( pageDisciplineId === "slp" ) {
    discColor = "#4dbbdd";
    discLabel = "SLP";
  } else if ( pageDisciplineId === "other" ) {
    discColor = "#c454ed";
    discLabel = "Other";
  } else if ( pageDisciplineId === "ent" ) {
    discColor = "#84b2c5";
    discLabel = "Enterprise";
  } else if ( pageDisciplineId === "multi" ) {
    discColor = "#ffffff";
    discLabel = "Multiple Disciplines";
  } else if ( pageDisciplineId === "all" ) {
    discColor = "#ffffff";
    discLabel = "All Disciplines";
  } else if ( pageDisciplineId === "lmt" ) {
    discColor = "#1aa37a";
    discLabel = "Massage";
  } else {
    var discLabel = "";
  }


  var insertFullLabel = "";

  if ( discLabel !== "" ) {
    insertFullLabel = '<font color="' + discColor + '">' + discLabel + '</font>&nbsp;&nbsp;&bull;&nbsp;&nbsp;';
  }

  if ( insertOrg ) {
    insertFullLabel = insertOrg + "&nbsp;&nbsp;&bull;&nbsp;&nbsp;" + insertFullLabel;
  }



  // CAMPAIGN NAME
  ////////////////
  console.log(mcCampaignName);

  var campaignNameTrunc = mcCampaignName.replace(/(\r|\n)+?\(.+/gi, "");
  console.log(campaignNameTrunc);


  // VERSION FOR A/B TESTING
  //////////

  var versionNum = mcCampaignName.replace(/^(.|\r|\n)+?\(Content /gi,"");
  console.log(versionNum);

  //Test if string contains # of #. Then we know if this campaign is being A/B tested.
  if ( /\d of \d/.test(versionNum) ) {

      if ( versionNum.substring(0,1) === "1" ) {
        versionNum = "A"
    } else if ( versionNum.substring(0,1) === "2" ) {
      versionNum = "B"
    } else if ( versionNum.substring(0,1) === "3" ) {
      versionNum = "C"
    } else if ( versionNum.substring(0,1) === "4" ) {
      versionNum = "D"
    } else if ( versionNum.substring(0,1) === "5" ) {
      versionNum = "E"
    } else if ( versionNum.substring(0,1) === "6" ) {
      versionNum = "F"
    } else if ( versionNum.substring(0,1) === "7" ) {
      versionNum = "G"
    } else if ( versionNum.substring(0,1) === "8" ) {
      versionNum = "H"
    }

    versionNum = '<font color="#e4e4e4" size="3">&nbsp;&nbsp;&bull;&nbsp;&nbsp;Version <font color="#ffffff"><b>' + versionNum + '</b></font></font>';

  } else {
    versionNum = '';
  }

  // Grab the preheader!
  var preheader   = document.body.dataset.preheader.substring(0,120) + "&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;";

  // Subscriber or Non-Subscriber?
  var audience;
  if ( /\-S(UB)?\-/gi.test(campaignNameTrunc) || pageDisciplineId === "fox" || pageDisciplineId === "dr" || pageDisciplineId === "hs" || orgId === "dr" || orgId === "hs" ) {
    audience = "Subscribers";
  } else if ( /\-NS?\-/gi.test(campaignNameTrunc) ) {
   audience = "Non-Subscribers";
  } else if ( /\-MX?\-/gi.test(campaignNameTrunc) ) {
   audience = "Mixed";
  } else {
    audience = "Unknown Subscription Status";
  }

  var tableData = '<table cellpadding="3" cellspacing="2" border="0"><tr><td class="t"><font size="2" color="#cccccc">' + preheader + '...</font></td></tr><tr><td class="t"><font color="#ffffff" size="4"><b>' + insertFullLabel + audience + '</b></font>' + versionNum + '</td></tr><tr><td><font color="#cccccc" size="2">Campaign: ' + campaignNameTrunc + '</font></td></tr></table>'


  // Insert into the textarea;
  document.querySelector("#test-message").value = tableData;



  //////////////////
  //////////////////


  var testModalWrapper = document.querySelector("#send-test-form");

  // Label Preview
  var labelPreview = document.querySelector("#send-test-form #label-preview") || document.createElement("div");
  labelPreview.style = "background:#444; color:#fff; padding:20px;";
  labelPreview.id = "label-preview";
  labelPreview.innerHTML = tableData

  // Preheader Preview
  // var preheaderPreview = document.createElement("div");
  // preheaderPreview.style = "background:#5c5c5c; color:#fff; padding:20px; font-size:12px; line-height:16px;";
  // preheaderPreview.innerHTML = preheader

  // testModalWrapper.prepend(preheaderPreview);
  testModalWrapper.prepend(labelPreview);
}
