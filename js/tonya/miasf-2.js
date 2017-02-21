

let rowList = document.querySelectorAll("div.fieldContainer.simpleTextContainer");



var firstName = ""
var lastName = ""
var email = ""
var companyName = ""
var phone = ""
var indexUrl = document.URL


for (let row of rowList) {


  var title = row.querySelector(".fieldLabel").textContent.trim();

  if ( title === "First Name" ) {
    var firstName = row.querySelector(".fieldBody").textContent.trim();
  }

  if ( title === "Last Name" ) {
    var lastName = row.querySelector(".fieldBody").textContent.trim();
  }

  if ( title === "e-Mail" ) {
    var lastName = row.querySelector(".fieldBody").textContent.trim();
  }

  if ( title === "Company Phone" ) {
    var lastName = row.querySelector(".fieldBody").textContent.trim();
  }

  if ( title === "Company Name" ) {
    var lastName = row.querySelector(".fieldBody").textContent.trim();
  }


};

var dataString = firstName + "|" + firstName + "|" + firstName + "|" + firstName + "|" + firstName + "|" + indexUrl


obj["url"] = document.URL;

var id = document.URL.replace(/^.+?PublicProfile\//gi, "");
    id = id.replace(/\/.+/gi, "");

obj["id"] = id;


var savedData = {};

var shortCompanyname = obj["Company Name"].replace(/[^a-z0-9+]+/gi, "").toLowerCase();
    shortCompanyname = shortCompanyname.substring(0, 25);

var key = "miasf-" + Math.round(Math.random() * (999 - 100) + 100) + "-" + id + "-" + shortCompanyname;

savedData[key] = obj;

chrome.storage.local.set(savedData);



setTimeout(function() {
  window.close();
}, 1000);
