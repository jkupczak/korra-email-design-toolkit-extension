var recipientsText, recipientsNumber, recipientsNumberPretty, recipientsLastNumber, campaignType

// Determine page
if ( /wizard\/variateconfirm/i.test(document.location.pathname) ) {
  campaignType = "variate";
} else if ( /campaigns\/edit/i.test(document.location.pathname) ) {
  campaignType = "regular";
}

function processRecipientCount(string) {
  recipientsNumber = parseInt(string.replace(/[^\d]/gi, ""));
  recipientsNumberPretty = recipientsNumber.toLocaleString('en');

  recipientsText = "(" + recipientsNumberPretty + " Recipients)";

  verifyRecipientCount();
}

// Edit Recipients
function clickEditRecipients() {

  if ( campaignType === "variate" ) {
    document.querySelectorAll("div.media-body > div > div > a[href*='wizard/recipients']")[0].click();
  } else if ( campaignType === "regular" ) {
    document.querySelectorAll("div.c-slatMeta_action > button.c-slatButton[data-dojo-attach-event='click: activate']")[0].click();
  }
}


// Verify Send Count
function verifyRecipientCount() {

  console.log("recipients changed", recipientsNumberPretty);

  // Check if we've already seen this exact number before.
  if ( recipientsLastNumber === recipientsNumber ) {


  // If we haven't, check if it's too big.
  } else {

    recipientsLastNumber = recipientsNumber;

    if ( recipientsNumber > 50000 ) {

      var confirmSend = prompt('Recipients exceed ' + recipientsNumber.toLocaleString('en') + '. This exceeds the normal send amount for our typical emails. Are you sure you want to do this?\n\nManually enter the total recipients below to continue.', "");

      console.log(confirmSend);

      if ( confirmSend === null || confirmSend === undefined || parseInt(confirmSend.trim().replace(/[^\d]/gi, "")) !== recipientsNumber ) {
        clickEditRecipients();
        console.log("Canceled!");
      } else {
        alert("Ok! Your funeral bud!");
        console.log("Confirmed!");
      }

    }
  }

}

// Listen for Recipient Total in...
// Variate Campaign
///////////////////
document.arrive(".media-body h3 + p > a[href='#'][onclick]", {fireOnAttributesModification: true, existing: true}, function() {

  processRecipientCount(this.innerHTML);

  // Update fields inside buttons
  var scheduleBtn = document.querySelectorAll("#delivery-options > a.button[onclick*='prepareSchedule']")[0];
  var sendBtn = document.querySelectorAll("#delivery-options > a.button[onclick*='confirm-send']")[0];
  scheduleBtn.innerHTML = "Schedule " + recipientsText;
  sendBtn.innerHTML = "Send " + recipientsText;

});

// Listen for Recipient Total in...
// Regular Campaign
///////////////////
document.arrive("div > p > a.font-weight--bold[href='javascript:']", {fireOnAttributesModification: true, existing: true}, function() {

  processRecipientCount(this.innerHTML)

  // Update fields inside buttons
  var scheduleBtn = document.querySelectorAll("div > button.button[data-dojo-attach-event*='openSendLaterModal']")[0];
  var sendBtn = document.querySelectorAll("div > button.button[data-dojo-attach-event*='openSendNowModal']")[0];
  scheduleBtn.innerHTML = "Schedule " + recipientsText;
  sendBtn.innerHTML = "Send " + recipientsText;

});
