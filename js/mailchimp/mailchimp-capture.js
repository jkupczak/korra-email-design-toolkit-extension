console.warn(" 💎💎💎 [korra-email-design-tooklit] loaded /js/mailchimp/mailchimp-capture.js");
///////////////////////////////////////////////////////////////////////////////////
///////
///////
//
// HARVEST A/B DATA
//
//=================
//
// The purpose of this function is to load the report pages of A/B campaigns.
// This does not capture data from NON-A/B campaigns, or campaigns that have not been delivered.
// Once the page is loaded, a separate script called mailchimp-capture.js (THIS SCRIPT!) scans the page for data.
// That data is then saved to the extensions chrome.local.storage for export later.
// This data pertains to IDs of each A/B test that cannot be extracted from just the main campaigns overview page.
// Go to Extensions > Background page > Storage Explorer to find the saved data.
// Add this data to the local Excel reporting file.
// Once all of the data is extracted from a page, the tab is closed and the function continues by opening the next link as a new tab.
//
//// Data Collected
//////  - Campaign ID
//////  - A/B ID's
//////  - Type of A/B Test
//////  - Unique ID to index/match with the actual MailChimp downloaded report.
//////  - Send Date
//
///////
///////

// Only run this script if "capture=1" is in the URL and the page is /reports/show
if ( getParameterByName("capture") === "1" && /reports\/show/gi.test(document.URL) ) {

  // https://stackoverflow.com/a/40287132/556079
  var storage = chrome.storage.local;

  ///

  console.log("Running mailchimp-capture.js");


  // Get campaign data automatically on page load

  // Get constant variables
  var campaignId = document.URL.replace(/(^.+?id=|&.+)/gi,"");
  var campaignParentName = document.querySelector("#content div > h1:only-child").innerText.trim();
  var variateTested = document.querySelector("#content > div.sub-section p").textContent.replace(/^.+?: /gi, "").trim();

  let rows = document.querySelectorAll("ol.media-list > li");
  for (let row of rows) {

    var sendDate = row.dataset.sendDate;
    var combo = row.querySelector(".media-body h4 a").href.replace(/(^.+?id=|&.+)/gi,"").trim();
    var comboid = row.querySelector(".media-image").style.background.replace(/(^.+?cid=|"\).+)/gi,"").trim();
    var campaignComboName = row.querySelector(".media-body h4 a").innerText.trim();
    var campaignLevel = row.querySelector(".media-body h4 a").innerText.replace(/^.+? \| /i,"").trim();

    // Save Combo to chrome.local.storage
    var string = comboid + "  " + combo + "  " + campaignId + "  " + variateTested + "  " + "A/B" + "  " + campaignComboName + "  " + campaignParentName + "  " + sendDate + "  " + campaignLevel;

    // https://stackoverflow.com/a/40287132/556079
    storage.set({
      [comboid]: string
    });

  }


///////////
///////////
///////////


  setTimeout(function() {
    window.close();
  }, 500);


} else {

  console.log("false");

}
