// alert("hi!");

let rowList = document.querySelectorAll("div.fieldContainer.simpleTextContainer");
var i = 0

var obj = {};

for (let row of rowList) {

  i++

  // console.log(obj);

  var title =   row.querySelector(".fieldLabel").textContent.trim();
  // console.log(title);

  var data = row.querySelector(".fieldBody").textContent.trim();
  // console.log(data);

  obj[title] = data;

  // console.log(obj);

};

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

// console.log(savedData);


setTimeout(function() {
  window.close();
}, 1000);
