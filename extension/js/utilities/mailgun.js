///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
/////
/////
/////    Mailgun
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
function sendEmail(html, text) {
  console.log(options.sync.mailgunApiKey);
  // console.log(mailgunApiKey);

  var emailTo      = "Korra via Mailgun <postmaster@" + options.sync.mailgunDomainName + ">";
  var emailFrom    = "james@medbridgeed.com";
  var emailSubject = "Hello from Korra & Mailgun";

  var data = new FormData();
  data.append("from", emailTo);
  data.append("to", emailFrom);
  data.append("subject", emailSubject);

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

  xhr.open("POST", "https://api:" + options.sync.mailgunApiKey + "@api.mailgun.net/v3/" + options.sync.mailgunDomainName + "/messages");
  xhr.setRequestHeader("cache-control", "no-cache");
  xhr.setRequestHeader("postman-token", "0a3ad9d5-22b5-6308-d6e7-59f66360fa26");

  xhr.send(data);
}
