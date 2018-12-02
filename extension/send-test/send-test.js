console.log("send-test.js loaded");

var payload = {
  from:         "Korra for Email",
  to:           "james@medbridgeed.com",
  subject:      "Hello from Korra & Mailgun",
  description:  "",
  html:         "",
  text:         ""
};

///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
/////
/////
/////    Send Email
/////
/////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////

// MailGun Send
// Recipient must be an Authorized Recipient in order to send using the sandbox (300 messages a day max)
  // https://app.mailgun.com/app/account/authorized

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
var sendEmail = function(payload) {

  console.log(sendOptions.mailgunApiKey, sendOptions.mailgunDomainName);

  var data = new FormData();
  data.append("from", payload.to);
  data.append("to", payload.from);
  data.append("subject", payload.subject);

  var sendHtml = true;
  if ( sendHtml ) {
    if ( !html ) {
      html = cleanedOriginalHtml;
    }
    data.append("html", html);
  } else {

    if ( !text ) {
      text = plainTextVersion;
    }
    data.append("text", text);
  }


  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      console.log("to:", emailTo, "from:", emailFrom, "subject:", emailSubject);
      console.log(this.responseText);
    }
  });

  xhr.open("POST", "https://api:" + sendOptions.mailgunApiKey + "@api.mailgun.net/v3/" + sendOptions.mailgunDomainName + "/messages");
  xhr.setRequestHeader("cache-control", "no-cache");
  xhr.setRequestHeader("postman-token", "0a3ad9d5-22b5-6308-d6e7-59f66360fa26");

  xhr.send(data);
};


///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
/////e2e3ea
/////
/////    Build Email
/////
/////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////


var buildEmail = function() {

  console.log("sending test");
  var emailBuilder = document.createElement("iframe");

  emailBuilder.id = "korra-test-email-builder";
  emailBuilder.setAttribute("allowtransparency", "true");
  emailBuilder.setAttribute("frameborder", "0");

  emailBuilder.style = "position:fixed; top:0; right:0; height: calc(100vh + 40px); width:450px; background:#fff; display:block; z-index:999999; outline:0; border:0; border-left:1px solid #e2e3ea; box-shadow:0 0 15px rgba(0,0,0,0.2)";

  console.log( chrome.extension.getURL('send-test/send-test.html') );
  emailBuilder.src = chrome.extension.getURL('send-test/send-test.html');

  console.log(emailBuilder);
  document.body.appendChild(emailBuilder);

};

// buildEmail();
