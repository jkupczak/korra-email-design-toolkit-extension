console.warn("loaded /js/mailchimp/mailchimp-design-iframe.js");

// var preheaderFromIframe = "hi";
// var preheader = document.body.textContent;

// console.log(preheader);

// console.log(window);
// console.log(window.parent);
// console.log(window.parent.document);
// console.log(window.parent.document.body);

var preheader = cleanPlainTxt(document.body.textContent).substring(0, 200);

if ( elExists(window.parent.document.querySelector(".preheader")) ) {
  window.parent.document.querySelector(".preheader").innerHTML = preheader;
} else {
  window.parent.document.body.dataset.preheader = preheader;
}
