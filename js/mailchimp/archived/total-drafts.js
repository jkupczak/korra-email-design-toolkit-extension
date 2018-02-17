// Created as a way to remind myself if/when campaigns were in draft status.
// Helped to avoid forgetting to send something.
// In the end it wasn't that helpful as forgetting to send a campaign was an extreme rarity.
// After MailChimp's campaign page was updated this script got kind of wonky.
// Decided to retire it to avoid complications with other more relevant and helpful scripts.


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
