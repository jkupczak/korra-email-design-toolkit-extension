// Only run script if the referrer is empty.
// Clicking from newsletters where target="_blank" is set will result in an empty referrer.
console.info(">>> js/medbridge-blog.js loaded.");

function getAuthorType() {

  if ( elExists(document.querySelector(".author-image a")) ) {
    var authorLink = document.querySelector(".author-image a").getAttribute("href");
    var authorType = "pearl";

    if ( !/medbridgeed(ucation)?\.com\/about\//gi.test(authorLink) ) {
      // console.log("Blog!");
      authorType = "blog";
    } else {
      // console.log("Pearl!")
      authorType = "pearl";
    }
  } else {
    var authorType = "blog";
  }

  return authorType;
}

function getModeNumber() {
  var modNumber = getParameterByName("utm_content");

  if ( modNumber && modNumber !== "" ) {
    modNumber = modNumber.replace(/mod/gi, "");
    modNumber = modNumber.replace(/\-.+/gi, "");

    if ( modNumber.length = 1 ) {
      return modNumber
    } else {
      return "1";
    }
  }
}


if ( getParameterByName("blog-check") ) {

  console.groupCollapsed("Blog Article Check (medbridge-blog.js)");

  // if ( document.referrer === "" ) {

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

      var authorType = getAuthorType();

      console.log("authorType: " + authorType);

    	chrome.runtime.sendMessage({greeting: "blogStatus|" + actualUrl + "|" + protectedStatus + "|" + authorType + "|" + iframeNumber}, function(response) { });

    } else {
      console.error("Error: blog-check= querystring parameter was not found. This link was likely redirected and needs to be fixed.");
      chrome.runtime.sendMessage({greeting: "blogStatus|error"}, function(response) { });
    }

  // } else {
  //   console.log("document.referrer === \"\" [false] - " + document.referrer);
  // }

  console.groupEnd();
}


////////////////////////
////////////////////////
////                ////
////                ////
////    Help Bar    ////
////                ////
////                ////
////////////////////////
////////////////////////

// if ( /\/blog\//gi.test(document.URL) ) {

  console.log("We're on an article page, activate!");

  var helpBar = document.createElement("div");
  helpBar.className = "jk-helpBar"
  helpBar.innerHTML = "<input id='jk-shortlink' type='text'></input><input id='jk-blog-id' class='offscreen' type='text'></input><input id='jk-sub-url' class='offscreen' type='text'></input><input id='jk-sub-sale-url' class='offscreen' type='text'></input><div class='copy blog-id'>Copy Blog ID</div><div class='copy sub-url'>Copy -sub URL</div><div class='copy sale-url'>Copy -sub Sale URL</div>"
  document.body.appendChild(helpBar);

  // Set Links
  var shortLink = document.querySelector("link[rel='shortlink']").href;

  document.querySelector("#jk-shortlink").value = shortLink;
  document.querySelector("#jk-blog-id").value = shortLink.replace(/^.+?p=/gi,"");
  document.querySelector("#jk-sub-url").value = shortLink + "&utm_content=mod" + getModeNumber() + "-conted-" + getAuthorType() + "&sub=yes";
  document.querySelector("#jk-sub-sale-url").value = shortLink + "&utm_content=mod" + getModeNumber() + "-conted-" + getAuthorType() + "&sub=yes&medium=email";

  //
  document.querySelector(".jk-helpBar .copy.blog-id").addEventListener("click", copyBlogId, false);
  document.querySelector(".jk-helpBar .copy.sub-url").addEventListener("click", copySubUrl, false);
  document.querySelector(".jk-helpBar .copy.sale-url").addEventListener("click", copySubSaleUrl, false);

  function copyBlogId() {
    copyToClipboard(document.querySelector(".jk-helpBar #jk-blog-id"));
  }

  function copySubUrl() {
    copyToClipboard(document.querySelector(".jk-helpBar #jk-sub-url"));
  }

  function copySubSaleUrl() {
    copyToClipboard(document.querySelector(".jk-helpBar #jk-sub-sale-url"));
  }

// } else {
//   console.log("This isn't an article page!");
// }
