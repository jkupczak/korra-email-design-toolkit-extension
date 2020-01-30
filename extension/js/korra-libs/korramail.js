function sendEmail(payload) {

  if ( !payload ) {
    var payload = {};
    payload.to = "james@medbridgeed.com"
  }
  else if ( !payload.hasOwnProperty('to') ) {
    payload.to = "james@medbridgeed.com"
  }

  korramail.build({
    html:       originalHtml,
    apiKey:     options.sync.mailgunApiKey,
    domainName: options.sync.mailgunDomainName,
    to:         payload.to
  });

}


function sendToLitmus() {

  korramail.build({
    to:         "medbridge@litmusemail.com",
    html:       originalHtml,
    subject:    email.filename,
    apiKey:     options.sync.mailgunApiKey,
    domainName: options.sync.mailgunDomainName
  });

}

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
 *
 *
 */
var korramail = {

  defaults: {
    from:         "Korra via Mailgun",
    to:           "james@medbridgeed.com",
    subject:      "Hello from Korra & Mailgun (" + new Date() + ")",
    description:  "",
    html:         "",
    text:         "",
    apiKey:       "",
    domainName:   ""
  },

  build: function(sendSettings) {

    // Merged settings
  	var settings = Object.assign({}, korramail.defaults, sendSettings);

    // Attach the required "From" string to the string that was provided.
    settings.from += " <postmaster@" + settings.domainName + ">";

    // log the final settings to the console
    console.log(settings);

    korramail.send(settings);

  },

  send: function(settings) {

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

    xhr.open("POST", "https://api:" + settings.apiKey + "@api.mailgun.net/v3/" + settings.domainName + "/messages");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.setRequestHeader("postman-token", "0a3ad9d5-22b5-6308-d6e7-59f66360fa26");

    xhr.send(data);
  }
};
