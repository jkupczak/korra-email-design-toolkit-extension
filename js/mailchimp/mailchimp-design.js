console.warn("loaded js/mailchimp/mailchimp-design.html");

//
document.querySelector("body").classList.add("initial-load");


//
var preheader = "Join more than 70,000 clinicians using MedBridge to advance their careers and improve outcomes every day. Subscribe now and gain unlimited access to hundreds of interactive video-based CEU courses and patient engagement tools on the all-in-one MedBridge platform.";



var previewCol = document.querySelector("#previewcol");
var iframeWrapper = previewCol.querySelector(".colbody");

var gmailWrapper = document.createElement("div");
    gmailWrapper.className = "gmail-wrapper";

    previewCol.prepend(gmailWrapper);

    console.log("1");
    console.log(gmailWrapper);


// Open the "Preview" screen with a click so that we can gather data.
document.querySelector("#preview-actions a[title*='Preview the content']").click();
// The menu stays open after click, remove a class to close it.
document.querySelector(".hover-list.small-meta.stayopen").classList.remove("stayopen");




//
document.arrive(".initial-load .preview-container .float-left > ul", function() {

  console.log("preview container <ul> arrived!");

  var subjectLine = document.querySelector(".preview-container .float-left > ul > li:nth-child(3) p:last-child").textContent;
  var fromName    = document.querySelector(".preview-container .float-left > ul > li:nth-child(2) p:nth-child(2)").textContent;
  var fromEmail   = document.querySelector(".preview-container .float-left > ul > li:nth-child(2) p:nth-child(3)").textContent;
  var toName      = document.querySelector(".preview-container .float-left > ul > li:nth-child(1) p:nth-child(2)").textContent;
  var preheader   = document.body.dataset.preheader;

  document.querySelector(".preview-container a[data-dojo-attach-point='closeLink']").click();

  setTimeout(function(){
    document.querySelector("body").classList.remove("initial-load");
  }, 1000);


  console.log(subjectLine);
  console.log(fromName);
  console.log(fromEmail);
  console.log(toName);

  var gmailRow = '<div class="gmail-row"><div class="from-name-wrapper"><div class="from-name">' + fromName + '</div></div><div class="subject-line-wrapper"><div class="subject-line">' + subjectLine + '</div></div><div class="preheader-wrapper"><div class="preheader">' + preheader + '</div></div></div>';

  console.log("2");
  console.log(gmailWrapper);

  gmailWrapper.innerHTML = gmailRow;


});
