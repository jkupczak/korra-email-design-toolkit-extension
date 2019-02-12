///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
/////
/////
/////    Get All Options
/////
/////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////

var getAllOptions = new Promise((resolve, reject) => {
  chrome.storage.sync.get(null, (items) => {
    let err = chrome.runtime.lastError;
    if (err) {

      //@TODO What do I do if the call errors out?!
      reject(err);

    } else {

      // Apply our result to a global variable so that we can use it throughout our other scripts.
      // Maybe not the best way to handle this?
      exOptions = items;
      korraOptions = items;

      resolve(items);

      console.log(korraOptions);
    }
  });
});


///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
/////
/////
/////    Receive code from a postMessage
/////
/////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////

window.addEventListener("message", receiveMessage, false);

function receiveMessage(event) {
  console.log(event);
  document.getElementById("html").value = event.data;
}


///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
/////
/////
/////
/////
/////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////

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
// API - https://documentation.mailgun.com/en/latest/api_reference.html
// Recipient must be an Authorized Recipient in order to send using the sandbox (300 messages a day max)
  // https://app.mailgun.com/app/account/authorized

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
var sendEmail = function(payload) {

  console.log(korraOptions.mailgunApiKey, korraOptions.mailgunDomainName);

  // If no payload was passed, create one.
  if ( !payload ) {

    // create a default payload
    payload = {
      from:         "Korra via Mailgun <postmaster@" + mailgunDomainName + ">",
      to:           "james@medbridgeed.com",
      subject:      "Hello from Korra & Mailgun",
      description:  "",
      html:         originalHtml,
      text:         ""
    };

    // update it with values from the form
    payload.to = document.getElementById("to").value;
    payload.subject = document.getElementById("subject").value;
    payload.html = document.getElementById("html").value;
    payload.text = document.getElementById("text").value;

  }

  console.log(payload);

  var data = new FormData();
  data.append("from", payload.from);
  data.append("to", payload.to);
  data.append("subject", payload.subject);

  // Process HTML
  // @TODO : Ask if they want us to encode their HTML (to fix special characters). Most ESPs do this.
  //          - Do Mailgun or Sparkpost do this already?

  var sendHtml = true;
  if ( sendHtml ) {
    data.append("html", payload.html);
  } else {
    data.append("text", payload.text);
  }


  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      console.log("to:", payload.to, "from:", payload.from, "subject:", payload.subject);
      console.log(this.responseText);
    }
  });

  xhr.open("POST", "https://api:" + korraOptions.mailgunApiKey + "@api.mailgun.net/v3/" + korraOptions.mailgunDomainName + "/messages");
  xhr.setRequestHeader("cache-control", "no-cache");
  xhr.setRequestHeader("postman-token", "0a3ad9d5-22b5-6308-d6e7-59f66360fa26");

  xhr.send(data);
};
