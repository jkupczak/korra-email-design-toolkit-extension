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
function sendEmail(sendOptions) {
  console.log(options.sync.mailgunApiKey);

	// Default settings
	var defaults = {
    from:         "Korra via Mailgun <postmaster@" + options.sync.mailgunDomainName + ">",
    to:           "james@medbridgeed.com",
    subject:      "Hello from Korra & Mailgun (" + new Date() + ")",
    description:  "",
    html:         originalHtml,
    text:         ""
	};
  // Merged settings
	var settings = Object.assign({}, defaults, sendOptions);

  // log the final settings to the console
  console.log(settings);

  // Data object
  var data = new FormData();
  data.append("from", settings.from);
  data.append("to",   settings.to);
  data.append("subject", settings.subject);

  var sendHtml = true;
  if ( sendHtml ) {
    data.append("html", settings.html);
  } else {
    data.append("text", settings.text);
  }

  console.log(data);

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      console.log(this);
      console.log(this.responseText);
    }
  });

  xhr.open("POST", "https://api:" + options.sync.mailgunApiKey + "@api.mailgun.net/v3/" + options.sync.mailgunDomainName + "/messages");
  xhr.setRequestHeader("cache-control", "no-cache");
  xhr.setRequestHeader("postman-token", "0a3ad9d5-22b5-6308-d6e7-59f66360fa26");

  xhr.send(data);
}
