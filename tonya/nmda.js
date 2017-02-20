
var dataString = "";

let rowList = document.querySelectorAll("section.entry-content");

for (let row of rowList) {

  var companyName = ""
  var indexUrl = ""

  var firstName = ""
  var lastName = ""

  var address = ""
  var state = ""
  var city = ""
  var zip = ""

  var email = ""

  var phoneNumber = ""
  var mobileNumber = ""
  var fax = ""

  var website = ""

  var vcard = ""

  /////

  var companyName = row.querySelector(".org").textContent.trim();
  var indexUrl    = row.querySelector(".org a").getAttribute("href");

  var firstName = row.querySelector(".fn").textContent.trim().replace(/ .+/i, "");
  var lastName  = row.querySelector(".fn").textContent.trim().replace(/^.+ /i, "");

  var address = row.querySelector(".adr .street-address").textContent.trim();
  var city   = row.querySelector(".adr .locality").textContent.trim();
  var state    = row.querySelector(".adr .region").textContent.trim();
  var zip     = row.querySelector(".adr .postal-code").textContent.trim();

  var email   = row.querySelector(".email").textContent.trim();


  let phoneList = row.querySelectorAll("div.label-tel");
  for (let phone of phoneList) {
    if ( phone.textContent.trim() === "Work phone:" ) {
      var phoneNumber   = phone.nextElementSibling.textContent.trim();
    } else {
      var mobileNumber  = phone.nextElementSibling.textContent.trim();
    }
  }

  var fax     = (row.querySelector(".fax") != null ? row.querySelector(".fax").textContent.trim() : "");

  var website = (row.querySelector(".url") != null ? row.querySelector(".url").textContent.trim() : "");

  var vcard   = row.querySelector(".vcard-dl a").getAttribute("href");


  dataString += companyName + "|" + indexUrl + "|" + firstName + "|" + lastName + "|" + address + "|" + city + "|" + state + "|" + zip + "|" + email + "|" + phoneNumber + "|" + mobileNumber + "|" + fax + "|" + website + "|" + vcard + "\n";

};


console.log(dataString);
