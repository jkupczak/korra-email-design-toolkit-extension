console.warn("js/medbridge-blog.js loaded.");

console.log(document.referrer);
console.log(document.URL);

// setInterval(function(){ console.log(document.querySelector("body").textContent); }, 5000);
//
//
// setTimeout( function() {
//   document.arrive("#author-bio", function() {
//       // 'this' refers to the newly created element
//       console.log("wtf");
//   });
// }, 10000);



// Only run script if the referrer is empty.
// Clicking from newsletters where target="_blank" is set will result in an empty referrer.

if ( document.referrer === "" ) {
  console.log("true: " + document.referrer);

  var actualUrl = document.URL.replace(/^.+?\/blog/gi, "/blog");
      actualUrl = actualUrl.replace(/\?.+/gi, "");
      actualUrl = actualUrl.replace(/\/$/gi, "");

  var iframeNumber = document.URL.replace(/^.+?blog\-check\=/gi, "");

  var protectedStatus = document.querySelector(".post-title a").textContent.trim();
  console.log("protectedStatus: " + protectedStatus);

  if ( /^Protected\:/gi.test(protectedStatus) ) {
    console.log("Protected!");
    var protectedStatus = "protected";
  } else {
    console.log("Not protected!")
    var protectedStatus = "published";
  }

  var authorType = document.querySelector(".author-image a").getAttribute("href");
  console.log("authorType: " + authorType);

  if ( !/medbridgeed(ucation)?\.com/gi.test(authorType) || /medbridgeed(ucation)?\.com\/$/gi.test(authorType) ) {
    console.log("Blogger!");
    var authorType = "blogger";
  } else {
    console.log("Pearl!")
    var authorType = "pearl";
  }

	chrome.runtime.sendMessage({greeting: "blogStatus|" + actualUrl + "|" + protectedStatus + "|" + authorType + "|" + iframeNumber}, function(response) {
	  // console.log(response.farewell);
	});



} else {
  console.log("false: " + document.referrer);
}
