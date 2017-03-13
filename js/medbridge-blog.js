// Only run script if the referrer is empty.
// Clicking from newsletters where target="_blank" is set will result in an empty referrer.

console.groupCollapsed("Blog Article Check (medbridge-blog.js)");

console.info(">>> js/medbridge-blog.js loaded.");

if ( document.referrer === "" ) {
  if ( /blog\-check\=\d/.test(document.URL) ) {
    console.warn("Found blog-check= parameter in querystring, continue processing.");


    console.log("document.referrer === \"\" [true] - " + document.referrer);
    console.log("document.URL: " + document.URL);

    var actualUrl = document.URL.replace(/^.+?\/blog/gi, "/blog");
        actualUrl = actualUrl.replace(/\?.+/gi, "");
        actualUrl = actualUrl.replace(/\/$/gi, "");

    var iframeNumber = document.URL.replace(/^.+?blog\-check\=/gi, "");
    console.log("iframeNumber: " + iframeNumber);

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

  	chrome.runtime.sendMessage({greeting: "blogStatus|" + actualUrl + "|" + protectedStatus + "|" + authorType + "|" + iframeNumber}, function(response) { });

  } else {
    console.error("Error: blog-check= querystring parameter was not found. This link was likely redirected and needs to be fixed.");
    chrome.runtime.sendMessage({greeting: "blogStatus|error"}, function(response) { });
  }

} else {
  console.log("document.referrer === \"\" [false] - " + document.referrer);
}

console.groupEnd();
