console.warn(" 💎💎💎 [korra-email-design-tooklit] loaded /js/mailchimp/mailchimp-reports-overview.js");
/////////////////////////////////////////////////////////////////////////////////////////////

document.arrive("ul#campaigns-list > li:first-child", function(e) {

  // Only trigger our function when the first li arrives.
  // Otherwise the function will run each time an li arrives,
  // and it is already going to loop through them all.

  console.log("li:first-child arrived");
  processCampaignOverviewList(document.querySelector("ul#campaigns-list"));

});


var loadedPageTitle = document.title;

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////
////   -----------------------------
////   |  TO-DO!                   |
////   -----------------------------
////
////   CRITERIA CHECK
////   ----------
////    - Use moment.js to read send dates.
////      Trigger a popup that asks for a date.
////      Only extract data from emails sent after that date.
////      Once you hit an email that doesn't apply, stop the script.
////
////    - Also offer an option to harvest X campaigns by typing a number into an input.
////
////
////   COMBINED FUNCTIONS
////   ------------------
////   Make Export Extra Data and Harvest Data one function/button.
////
////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////



///////
///////
//
// HARVEST A/B DATA
//
//=================
//
// The purpose of this function is to load the report pages of A/B campaigns.
// This does not capture data from NON-A/B campaigns, or campaigns that have not been delivered.
// Once the page is loaded, a separate script called mailchimp-capture.js scans the page for data.
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
//
///////
///////


var downloadAll = document.querySelectorAll("a[href='/reports/export']")[0];

var harvestDataBtn = document.createElement("a");
    harvestDataBtn.className = "button !margin-right--lv0 jk-btn jk-export-extra-data";
    harvestDataBtn.innerHTML = "Harvest A/B Data";

    // Can't call our function directly because it will always pass the mouseevent.
    // Instead we put our function within a function.
    // https://stackoverflow.com/a/48548263/556079
    harvestDataBtn.addEventListener("click", function (e){harvestData();}, false);

// Add it to the DOM with the rest of the buttons
insertBefore(harvestDataBtn, downloadAll);

function harvestData(idsToHarvest) {

    // Remove the counter if already exists.
    destroyIfExists(document.getElementById("harvest-counter"));
    document.title = loadedPageTitle;

    // Find all match campaigns we want to process and add to an array
    // Accept a string of ; delimited ID codes.
    if ( idsToHarvest ) {
      console.log(true, idsToHarvest);
      var idsToHarvestArray = idsToHarvest.split(";");
      console.log(idsToHarvestArray);
    // If one wasn't given, select all campaign links on the page and grab their IDS.
    } else {
      console.log("else")
      let campaignsOnPage = document.querySelectorAll("li[data-type='A/B']");
      var idsToHarvestArray = [];

      console.log(campaignsOnPage);

      for (let value of campaignsOnPage) {
        idsToHarvestArray.push(value.dataset.campaignid);
      }

      console.log(idsToHarvestArray);
    }

    // Create a counter
    ///////////////////
    var harvestCounter = document.createElement("div");
    harvestCounter.id = "harvest-counter";
    harvestCounter.addEventListener("click", destroy, false);

    var totalHarvested = document.createElement("div");
    totalHarvested.innerHTML = "0";
    harvestCounter.appendChild(totalHarvested);

    var totalPlanned   = document.createElement("div");
    totalPlanned.innerHTML = "&nbsp;/&nbsp;" + idsToHarvestArray.length;
    harvestCounter.appendChild(totalPlanned);

    harvestCounter.style = "position:fixed; bottom:10px; right:27px; border-radius:4px; background:rgba(0,0,0,0.8); color:#fff; font-size:24px; display:flex; padding:20px; font-family:sans-serif; z-index:9999;"
    document.body.appendChild(harvestCounter);

    /////////////
    let genObj = genFunc();

    let val = genObj.next();

    //// Commented out, I think this was here to load the first link because I was using val = genObj.next(); at the front of my loop instead of the end.
    // console.log(val);
    // console.log(val.value);
    // console.log(val.value.href.replace(/^.+?id=/gi,""));
    // window.open('https://us2.admin.mailchimp.com/reports/show?id=' + val.value.href.replace(/^.+?id=/gi,"") + "&capture=1", '_blank');

    // Count how many pages we've processed.
    var i = 0;

    // Begin loop of all matching links
    let interval = setInterval(() => {

      // If there are no more values left in val, clearInterval() and alert the user
      if (val.done) {
        clearInterval(interval);
        console.log("val.done = true, interval cleared");

        // Push a browser notification
        browserNotification("Harvesting Complete", "mailchimpAbHarvest", "img/mailchimp-notification.png", true);

      // Else, increment our progress counter and open a new tab using the current link
      } else {

        // Increment our counter
        i++;

        // Report progress to console
        console.log(i, val.value);

        // Update inline div to show progress
        totalHarvested.innerText = i;

        // Update page title to show progress
        document.title = "(" + i + "/" + idsToHarvestArray.length + ") " + loadedPageTitle;

        window.open('https://us2.admin.mailchimp.com/reports/show?id=' + val.value + "&capture=1", '_blank');

      }

      // Place this at the end to move val to the next object.
      // Previously it was at the beginning of the loop, but this caused us to skip the first object.
      val = genObj.next();

    // Wait 3.5seconds before looping again and opening the next tab. This allows times for the previous tabs to be loaded, processed, and closed.
    }, 3500);

    function* genFunc() {
      for(let item of idsToHarvestArray) {
        yield item;
      }
    }

}



///////
///////
//
// Export Extra Data
//
//
// Grabs data from every row in the campaigns page and displays it in a modal.
// Used for matching campaign types "A/B" or "Regular" using UID's in our excel report.
//
///////
///////

  var exportExtraCampaignData = document.createElement("a");
      exportExtraCampaignData.className = "button !margin-right--lv0 jk-btn jk-export-extra-data";
      exportExtraCampaignData.innerHTML = "Harvest Regular Data";
      exportExtraCampaignData.addEventListener("click", processExtraData, false);

  // Add it to the DOM with the rest of the buttons
  insertBefore(exportExtraCampaignData, downloadAll);

function processExtraData() {

  console.log("Running processExtraData() function.")

  var data = "";

  // let rows = document.querySelectorAll(".campaign-list-row");
  let rows = document.querySelectorAll("#campaigns-list > li");
  for (let row of rows) {

    if ( row.dataset.status === "delivered" || row.dataset.status === null || row.dataset.status === undefined )  {
      data += row.dataset.uniqueid + ";;" + row.dataset.campaignid + ";;" + row.dataset.type + ";" + row.querySelector("h4 a").textContent + ";;" + row.dataset.sendDate + ";" + "\n"
    } else {
      console.log("This row was not eligible for export.");
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
