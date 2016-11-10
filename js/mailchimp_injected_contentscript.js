console.log("mailchimp_injected_contentScript.js loaded");

var mcCampaignName = document.querySelector("#builder-header") || document.querySelector("h1");

if ( mcCampaignName ) {
  mcCampaignName = mcCampaignName.innerText;
  console.log(mcCampaignName);
  console.log(getDisciplineId(mcCampaignName));

  document.body.classList.add("discipline-" + getDisciplineId(mcCampaignName));
}





// document.documentElement.scrollHeight;

// document.body.onload = addElement;
//
// function addElement () {
//   // create a new div element
//   // and give it some content
//   var newDiv = document.createElement("div");
//   var newContent = document.createTextNode("Hi there and greetings!");
//   newDiv.appendChild(newContent); //add the text node to the newly created div.
//
//   // add the newly created element and its content into the DOM
//   // var currentDiv = document.querySelector("body");
//   // document.body.insertBefore(newDiv, currentDiv);
//   document.getElementsByTagName('body')[0].appendChild(newDiv);
//
//   console.log("success?");
// }


// var mcFilterBtn = document.querySelector(".filter-btn");
//
// if ( mcFilterBtn ) {
//
//   var newFilter = document.createElement("li");
//
//   document.querySelector('.filter-btn').appendChild(newFilter);
//
// } else {
//   console.log("not found");
// }


setTimeout(function() {

  // Iterate through DOM nodes - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of
  let campaignsList = document.querySelectorAll("#campaigns-list li.selfclear");
  for (let campaign of campaignsList) {
    var campaignName = campaign.querySelector('a[title="Campaign Name"]').innerText;
    campaign.classList.add("discipline-" + getDisciplineId(campaignName) );
    console.log(getDisciplineId(campaignName) + " - " + campaignName);
  }
},2000);

// setTimeout(function() {
//   var p = document.querySelector("div.slats + div.sub-section");
//   var p_prime = p.cloneNode(true);
//   var secondPageNav = document.querySelector(".line.action-bar");
//   insertAfter(p_prime, secondPageNav);
// },1000);
