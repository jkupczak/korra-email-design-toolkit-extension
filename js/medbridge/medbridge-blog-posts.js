console.warn("[medbridge-home-extension] loaded /js/medbridge/medbridge-blog-posts.js");
//////////////////////////////////////////////////////////////////////////////////


// Update chrome.storage with this articles status (log protected articles, remove non-protected articles)
logArticleStatusInStorge(document.documentElement.outerHTML);


////////////////////////
////////////////////////
////                ////
////                ////
////   PROTECTED!   ////
////                ////
////                ////
////////////////////////
////////////////////////

var isProtected = document.querySelector(".post__title").getAttribute("title");

if ( /^Protected:/.test(isProtected) ) {
  isProtected = true;
  document.body.classList.add("post-protected");
}


////////////////////////
////////////////////////
////                ////
////                ////
////    Copy Btn    ////
////                ////
////                ////
////////////////////////
////////////////////////


  var blogId = document.querySelector("link[rel='shortlink']").href.replace(/^.+?p=/gi,"");

  var helpBar = document.createElement("div");
  helpBar.className = "jk-helpBar"

  var copyIdBtn = document.createElement("div");
  copyIdBtn.innerHTML = "Copy Blog ID: " + blogId;
  createCopyBtn(copyIdBtn, document.querySelector("link[rel='shortlink']").href.replace(/^.+?p=/gi,""));
  copyIdBtn.className = "copy blog-id"

  helpBar.appendChild(copyIdBtn);
  document.body.appendChild(helpBar);
