console.warn("[sonic-toolkit-extension] loaded /js/mailchimp/mailchimp-campaign-edit.js");
//////////////////////////////////////////////////////////////////////////////////////////


var settingsAndTrackingContainer = document.querySelector("div[data-dojo-attach-point='secondaryItemsContainer'] > div:last-child");

// var settingsContainer = settingsAndTrackingContainer.querySelector("div > div:first-child")
// var trackingContainer = settingsAndTrackingContainer.querySelector("div > div:last-child")
//
//
// console.log("settingsAndTrackingContainer: " + settingsAndTrackingContainer, "settingsContainer: " + settingsContainer, "trackingContainer: " + trackingContainer);
// var campaignNameh2 = document.querySelector(".c-checklistEditor h2:first-child");
//
// console.log(campaignNameh2);
// console.log(campaignNameh2.innerText);



// Get the Campaign Name on page load.
var campaignNameOnLoad = document.querySelector(".c-checklistEditor h2:first-child").innerText;




document.leave("#name", function() {

  if ( !document.body.classList.contains('triggered') && !document.querySelector(".c-checklistEditor h2:first-child") ) {
    console.log("#name left");

    var campaignNameAfterSave = document.querySelector(".c-checklistEditor h2:first-child").innerText;

    console.log("campaignNameOnLoad: " + campaignNameOnLoad + ", campaignNameAfterSave: " + campaignNameAfterSave);

    // Only run function if the campaign name is different than the one that was present on page load
    if ( campaignNameOnLoad !== campaignNameAfterSave ) {
      document.body.classList.add("triggered");
      replicateCampaignName();
    } else {
      console.log("Did not run replicateCampaignName() function. Campaign name did not change.");
      document.body.classList.remove("triggered");
    }


  } else {
    document.body.classList.remove("triggered");
  }


});




          // document.arrive(".c-checklistEditor h2:first-child", {onceOnly: true}, function() {
          //
          //   console.log("h2 showed up!");
          //   // campaignName = this.innerText;
          //
          //   var campaignNameAfterSave = document.querySelector(".c-checklistEditor h2:first-child").innerText;
          //
          //   console.log("campaignNameOnLoad: " + campaignNameOnLoad + ", campaignNameAfterSave: " + campaignNameAfterSave);
          //
          //   // Only run function if the campaign name is different than the one that was present on page load
          //   if ( campaignNameOnLoad !== campaignNameAfterSave ) {
          //     replicateCampaignName();
          //   } else {
          //     console.log("Did not run replicateCampaignName() function. Campaign name did not change.")
          //   }
          //
          // });

// var campaignNameEdit = document.querySelector("div > h2 + span > a");

// campaignNameEdit.addEventListener("click", replicateCampaignName, false);

//
// document.arrive("#name ~ div > button[type='submit']", function(e) {
//
//   // var campaignNameSave = document.querySelector("#name ~ div > button[type='submit']");
//   this.addEventListener("click", replicateCampaignName, false);
//   console.log("eventlistener attached")
//
// });




function replicateCampaignName() {

  console.log("replicateCampaignName() function running.");

  // Get GA Tag
  /////////////
  var currentGaTag = settingsAndTrackingContainer.querySelector("div:nth-child(2) > h4 + ul li:last-child strong:last-child").innerText.trim();
  currentGaTag = currentGaTag.substr(0, currentGaTag.length-1); //Remove the period at the end.
  console.log("currentGaTag: " + currentGaTag);

  // Get Campaign Name
  ////////////////////
  var campaignName = document.querySelector(".c-checklistEditor h2:first-child").innerText;
  console.log("campaignName: " + campaignName);

  // Only finish running this function if the current campaign name and the current GA tag are not identical.
  //////////////
  if ( currentGaTag !== campaignName ) {

    // var campaignName = document.getElementById("name").value || document.querySelector("div > h2:first-child").innerText;

    // var campaignName = campaignNameInput.value;

    document.arrive("#google_analytics_tracking_tag_input", {onceOnly: true}, function() {

      console.log("google_analytics_tracking_tag_input arrived");

      console.log(document.querySelector("#google_analytics_tracking_tag_input"));
      console.log(this);

      document.querySelector("#google_analytics_tracking_tag_input").value = campaignName;
      document.querySelector("#google_analytics_tracking_tag_input").focus();
      document.querySelector("#google_analytics_tracking_tag_input").blur();

      document.querySelector("button[data-dojo-attach-event='click: save']").click();

    });

    // Click the edit button
    ////
    document.querySelector("div:last-child > div:first-child > div:last-child > h4 > a").click();
            // document.arrive("div:last-child > div:first-child > div:last-child > h4 > a", function(e) {
            //   this.click();
            // });


  }

  document.body.classList.remove("triggered");


}
