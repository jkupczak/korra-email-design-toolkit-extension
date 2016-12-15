console.log("newsletter_injected_contentScript.js loaded");
var testing = true;
var view = getParameterByName("view");

if ( testing && view !== "1" ) {

var pageUrl = document.URL;
console.log("pageUrl = " + pageUrl);

var fileUrl = pageUrl.replace(/.+\//gi, "");
console.log("fileUrl = " + fileUrl);

if ( /dropboxusercontent/gi.test(pageUrl) ) {
  var onDropbox = true;
} else if ( /file:\/\/\//gi.test(pageUrl) ) {
  var onLocal = true;
}

if ( onLocal ) {

      // Get name for the key
      var emailId     = pageUrl.replace(/(.+\/|-ns\.html?|-sub\.html?)/gi, "");
      console.log("emailId = " + emailId);

      var emailId2 = "16-12-05-SLP-Lisa-Mitchell-CAS-ns-a.html"
     chrome.storage.sync.get(emailId2, function (result) {
        console.log(result[emailId2]);
        // alert(result.channels);
        // $("#channels").val(channels);
      });

      // get
      chrome.storage.promise.sync.get('foo').then(function(items) {
        console.log("resolved");
        console.log(items); // => {'foo': 'bar'}
      }, function(error) {
        // rejected
        console.log(error);
      });


      // Get the local path
      var localPath = pageUrl.replace(fileUrl, "");
      console.log("localPath = " + localPath);

      // Is this sub or non-sub
      if ( /-ns(\.|-)/gi.test(pageUrl) ) {
        localIdNs = fileUrl
        console.log("localIdNs = " + localIdNs);
      } else if ( /-ns(\.|-)/gi.test(pageUrl) ) {
        localIdSub = fileUrl
        console.log("localIdSub = " + localIdSub);
      }

      // var dropboxId = dropboxUrl.replace(/(.+s\/|\/.+$)/gi, "")
      // var trelloId  =  trelloUrl.replace(/(.+c\/|\/.+$)/gi, "")

      // var ids = { "s": "", "n": "", "d": dropboxId, "t": trelloId, "m": "", "l": "" };
      // var obj= {};
      // var key = emailId
      // obj[key] = ids;
      // chrome.storage.sync.set(obj);
      //
      // chrome.storage.sync.get(key,function(result){
      //   console.log("key");
      //   console.log(result[key]["d"]);
      //   console.log(result[key]["t"]);
      // });


}

  //     var emailId   = dropboxUrl.replace(/(.+\/)/gi, "")
  //     var dropboxId = dropboxUrl.replace(/(.+s\/|\/.+$)/gi, "")
  //     var trelloId  =  trelloUrl.replace(/(.+c\/|\/.+$)/gi, "")
  //
  //     var ids = { "d":dropboxId, "t":trelloId };
  //     var obj= {};
  //     var key = emailId
  //     obj[key] = ids;
  //     chrome.storage.sync.set(obj);
  //
  //     chrome.storage.sync.get(key,function(result){
  //       console.log("key");
  //       console.log(result[key]["d"]);
  //       console.log(result[key]["t"]);
  //     });
  //
  // chrome.storage.promise.sync.get(key).then(function(result) {
  //   var trelloId = result[key]["t"];
  //   if (trelloId !== "") {
  //     trelloOrb.href = "https://www.trello.com/c/" + result[key]["t"];
  //     trelloOrb.classList.remove("off");
  //   }
  // });


////////////////////
////////////////////
////////////////////
///
///    Apply the original code to an iFrame to save it
///
////////////////////
////////////////////
////////////////////

  ////
  //////
  // Grab all of the TEXT in the document before we start manipulating the HTML
  var preheader = document.body.textContent; // http://stackoverflow.com/a/19032002/556079

  ////
  //////
  // Grab all of the HTML in the document before we start manipulating the HTML
  var htmlTags = document.body.outerHTML; // http://stackoverflow.com/a/19032002/556079


  // Get the page's HTML and Doctype
  var html = "";
  // Reassemble the doctype if there is one
  if (document.doctype && document.doctype.name) {
      html = "<!doctype " + document.doctype.name;
      if (document.doctype.publicId) {
          html += " PUBLIC \"" + document.doctype.publicId;
      }
      if (document.doctype.systemId) {
          html += "\" \"" + document.doctype.systemId + '">';
      }
  }
  // Add in the document's markup
  html +=  document.documentElement.outerHTML;


  // Apply the original code to an iFrame to save it
  var domCopy = document.createElement("iframe");
  domCopy.className = "og-dom";
  document.body.appendChild(domCopy)

  domCopy.contentWindow.document.open();
  domCopy.contentWindow.document.write(html);
  domCopy.contentWindow.document.close();

  var domCopy = domCopy.contentWindow.document;




////////////////////
////////////////////
////////////////////
///
///    Clean the page of the original HTML and styling before restructuring it
///
////////////////////
////////////////////
////////////////////

  // Remove <body> contents
  var ogBody = document.body;
  while (ogBody.firstChild) {
      ogBody.removeChild(ogBody.firstChild);
  }

  // Remove inline styling from <body>
  ogBody.removeAttribute("style");

  // Remove <style> tag
  var ogHead = document.getElementsByTagName('head')[0];
  var ogStyle = document.getElementsByTagName("style")[0];
  ogHead.removeChild(ogStyle);



////////////////////
////////////////////
////////////////////
///
///    Check chrome.storage for saved link IDs
///
////////////////////
////////////////////
////////////////////

//
// var promise = new Promise(function(resolve, reject) {
//   // do a thing, possibly async, then…
  var key = pageUrl.replace(/(.+\/)/gi, "");
//   chrome.storage.sync.get(key,function(result){
//     console.log("key");
//
//     var dropboxId = result[key]["d"];
//     console.log(result[key]["d"]);
//
//     var trelloId = result[key]["t"];
//     console.log(result[key]["t"]);
//   });
//
//   return trelloId
//
//   if ( trelloId ) {
//     resolve("Stuff worked!");
//     console.log("Stuff worked!");
//   }
//   else {
//     reject(Error("It broke"));
//     console.log("It broke");
//   }
// });
//
// promise.then(function(result) {
//   console.log("success"); // "Stuff worked!"
//   console.log(result); // "Stuff worked!"
// }, function(err) {
//   console.log("error"); // Error: "It broke"
//   console.log(err); // Error: "It broke"
// });



// get
// var key = pageUrl.replace(/(.+\/)/gi, "");
// chrome.storage.promise.sync.get(key).then(function(result) {
//   // resolved
//   console.log("resolved")
//   console.log(result); // => {'foo': 'bar'}
//   console.log(result[key]["t"]); // => {'foo': 'bar'}
//   var trelloId = result[key]["t"];
// }, function(error) {
//   // rejected
//   console.log("rejected");
//   console.log(error);
// });




////
//////
// Iterate through ALL LINKS - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of
let linkList = domCopy.querySelectorAll("a");
var i = 0
console.log("Total Links: " + linkList.length)
for (let link of linkList) {

  i++

  // console.log(link);
  // console.log("[" + i + "] " + link.href);

  link.classList.add("test");

  var linkText = link.innerText;
  // console.log("Link Text = " + linkText);

}


////
//////
// Iterate through ALL IMAGES - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of
let imgList = domCopy.querySelectorAll("img");
var i = 0
console.log("Total Images: " + imgList.length)
for (let img of imgList) {

  i++

  // console.log(img);
  // console.log("[" + i + "] " + img.src);

  img.classList.add("test");


}



//////////

  // Create QA Wrapper
  var qaWrapper = document.createElement("div");
  qaWrapper.className = "qa-wrapper";
  document.body.appendChild(qaWrapper);

  // Create Split View
  console.log("activate split mode");
  document.body.classList.toggle("split-view-on");

  var iframeWrapper = document.createElement("div");
  iframeWrapper.className = "iframe-wrapper";
  qaWrapper.appendChild(iframeWrapper);

  var desktopIframeWrapper = document.createElement("div");
  desktopIframeWrapper.className = "desktop-view-wrapper";
  iframeWrapper.appendChild(desktopIframeWrapper);

    var desktopIframe = document.createElement("iframe");
    desktopIframe.className = "iframe-desktop-view";
    desktopIframe.id = "desktop-view"
    desktopIframeWrapper.appendChild(desktopIframe)

    desktopIframe.contentWindow.document.open();
    desktopIframe.contentWindow.document.write(html);
    desktopIframe.contentWindow.document.close();

    // Apply the desktop iframes document object to a variable
    var dFrame = desktopIframe.contentDocument;

    // Add contentEditable to the desktop versions HTML tag for future editing capabilites.
    dFrame.getElementsByTagName('html')[0].contentEditable = 'false';

  var mobileIframeWrapper = document.createElement("div");
  mobileIframeWrapper.className = "mobile-view-wrapper portrait";
  iframeWrapper.appendChild(mobileIframeWrapper);

    var mobileDeviceWrapper = document.createElement("div");
    mobileDeviceWrapper.className = "mobile-device-view";
    mobileIframeWrapper.appendChild(mobileDeviceWrapper)

    var mobileIframe = document.createElement("iframe");
    mobileIframe.className = "iframe-mobile-view";
    mobileIframe.id = "mobile-view"
    mobileDeviceWrapper.appendChild(mobileIframe)

    mobileIframe.contentWindow.document.open();
    mobileIframe.contentWindow.document.write(html);
    mobileIframe.contentWindow.document.close();

    var mobileIframeSetting = document.createElement("div");
    mobileIframeSetting.className = "mobile-iframe-settings";

    var showPortrait = document.createElement("div");
    showPortrait.className = "show-portrait";
    var showPortraitText = document.createTextNode("Portrait");
    showPortrait.appendChild(showPortraitText);
    showPortrait.addEventListener("click", togglePerspective, false);
    mobileIframeSetting.appendChild(showPortrait);

    var showLandscape = document.createElement("div");
    showLandscape.className = "show-landscape";
    var showLandscapeText = document.createTextNode("Landscape");
    showLandscape.appendChild(showLandscapeText);
    showLandscape.addEventListener("click", togglePerspective, false);
    mobileIframeSetting.appendChild(showLandscape);

      function togglePerspective() {
        mobileIframeWrapper.classList.toggle('portrait');
      }

    var hideMobile = document.createElement("div");
    hideMobile.className = "hide";
    var hideMobileText = document.createTextNode("Hide");
    hideMobile.appendChild(hideMobileText);
    hideMobile.addEventListener("click", hideMobileWrapper, false);
    mobileIframeSetting.appendChild(hideMobile);

      function hideMobileWrapper() {
        mobileIframeWrapper.classList.toggle('off');
      }

    mobileDeviceWrapper.appendChild(mobileIframeSetting);

    // Apply the mobile iframes document object to a variable
    var mFrame = mobileIframe.contentDocument;

    // Remove scrollbar from mobile view while still allowing scrolling
    // http://stackoverflow.com/a/33079951/556079
    var styleElement = mFrame.createElement("style");
    styleElement.appendChild(mFrame.createTextNode("html::-webkit-scrollbar-track { background:#fbfbfb; } html::-webkit-scrollbar { width:0px; background: transparent; } html::-webkit-scrollbar-thumb { border-radius:10px; background:#a6a6a6; border:4px solid #fbfbfb; } * { cursor:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAARVBMVEUAAABdXV0AAABdXV0bGxtOTk5dXV1dXV1dXV1dXV0uLi4lJSUODg4HBwddXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV04FrOjAAAAF3RSTlOMqACik6NmF5oImZaQjomEWgU5mSE6W6bKrUEAAADNSURBVDjLhZPdEoQgCIXZMEnT/Kn2/R91sR2trXU4d8o3HESAoclkHSbEKehsztsGkMZXE2q6ASnWcEViugK0lMvRKue9U3Ysp4VOYFtLWEGTKsi6VYAmPs7wo5mvJvoCqeRXcJMqLukAYo0/iVgAwpb/4YLEgOb64K+4Uj2AwdPgaYIG8pGgmyIDO9geYNkDwuHQ9QjATXI9wHGzgGv0PcBzlSIgWohFis8UGyW2Wvos8buFgXlLI2fEoZXHXl4cefXk5W0ye13//bL+H4yFCQFUrJO8AAAAAElFTkSuQmCC) 16 16, none; } ") );
    // styleElement.appendChild(mFrame.createTextNode("html::-webkit-scrollbar { display:none;} * { cursor:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAARVBMVEUAAABdXV0AAABdXV0bGxtOTk5dXV1dXV1dXV1dXV0uLi4lJSUODg4HBwddXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV04FrOjAAAAF3RSTlOMqACik6NmF5oImZaQjomEWgU5mSE6W6bKrUEAAADNSURBVDjLhZPdEoQgCIXZMEnT/Kn2/R91sR2trXU4d8o3HESAoclkHSbEKehsztsGkMZXE2q6ASnWcEViugK0lMvRKue9U3Ysp4VOYFtLWEGTKsi6VYAmPs7wo5mvJvoCqeRXcJMqLukAYo0/iVgAwpb/4YLEgOb64K+4Uj2AwdPgaYIG8pGgmyIDO9geYNkDwuHQ9QjATXI9wHGzgGv0PcBzlSIgWohFis8UGyW2Wvos8buFgXlLI2fEoZXHXl4cefXk5W0ye13//bL+H4yFCQFUrJO8AAAAAElFTkSuQmCC), none; }") );
    mFrame.getElementsByTagName("head")[0].appendChild(styleElement);


    // Add drag scrolling
    // https://codepen.io/JTParrett/pen/rkofB
    var scriptElement = mFrame.createElement("script");
    scriptElement.appendChild(mFrame.createTextNode('var curYPos=0,curXPos=0,curDown=!1;window.addEventListener("mousemove",function(a){curDown===!0&&window.scrollTo(document.body.scrollLeft+(curXPos-a.pageX),document.body.scrollTop+(curYPos-a.pageY))}),window.addEventListener("mousedown",function(a){curDown=!0,curYPos=a.pageY,curXPos=a.pageX}),window.addEventListener("mouseup",function(a){curDown=!1});' ) );
    mFrame.getElementsByTagName("head")[0].appendChild(scriptElement);

    // Change cursor to a touch-looking icon
    // Pending

    // Allow touch events to mimic mobile behavior
    // Pending


// Create Newsletter QA Control Bar Wrapper
var controlBar = document.createElement("div");
controlBar.className = "control-bar";
qaWrapper.appendChild(controlBar);

  var orbsTop = document.createElement("div");
  orbsTop.className = "orbs-top";
  controlBar.appendChild(orbsTop);

  var orbsBottom = document.createElement("div");
  orbsBottom.className = "orbs-bottom";
  controlBar.appendChild(orbsBottom);

// Create QA Control Orb
var qaControl = document.createElement("div");
qaControl.className = "qa-orb orb";
qaControl.addEventListener("click", qaToggle, false);
orbsBottom.appendChild(qaControl);

function qaToggle() {
  qaControl.classList.toggle('off');
  document.body.classList.toggle('qa-off');
}

// Create Split View Orb (Desktop AND Mobile)
// var splitViewOrb = document.createElement("div");
// splitViewOrb.className = "split-view-orb orb glyph";
// // splitViewOrb.addEventListener("click", viewSplitMode, false);
// controlBar.appendChild(splitViewOrb);


// Create Mobile View Orb
var mobileViewOrb = document.createElement("div");
mobileViewOrb.className = "mobile-orb orb glyph";
mobileViewOrb.addEventListener("click", viewMobile, false);
orbsBottom.appendChild(mobileViewOrb);

function viewMobile() {
  mobileIframeWrapper.classList.toggle('off');
}


// Create Trello Orb
var trelloOrb = document.createElement("a");
trelloOrb.className = "trello-orb orb off";
trelloOrb.target = "_trello";
orbsTop.appendChild(trelloOrb);
  chrome.storage.promise.sync.get(key).then(function(result) {
    if(typeof result[key] !== "undefined") {
      if(result[key].hasOwnProperty(["t"])){
        trelloOrb.href = "https://www.trello.com/c/" + result[key]["t"];
        trelloOrb.classList.remove("off");
      }
    }
  });

// Create Dropbox Orb

if ( onDropbox ) {
  var localOrb = document.createElement("a");
  localOrb.className = "local-orb orb glyph off";
  orbsTop.appendChild(localOrb);
    chrome.storage.promise.sync.get(key).then(function(result) {
      if(typeof result[key] !== "undefined") {
        if(result[key].hasOwnProperty(["l"])){
          localOrb.href = result[key]["l"];
        }
      }
    });
} else {
  var dropboxOrb = document.createElement("a");
  dropboxOrb.className = "dropbox-orb orb";
  dropboxOrb.href = "https://www.dropbox.com/home/" + pageUrl.replace(/^.+Dropbox%20\(MedBridge%20\.\)\//gi, "");
  orbsTop.appendChild(dropboxOrb);
    chrome.storage.promise.sync.get(key).then(function(result) {
      if(typeof result[key] !== "undefined") {
        if(result[key].hasOwnProperty(["d"])){
          dropboxOrb.href = "https://dl.dropboxusercontent.com/s/" + result[key]["d"];
        }
      }
    });
}

// Create MailChimp Orb
var mailchimpOrb = document.createElement("a");
mailchimpOrb.className = "mailchimp-orb orb";
mailchimpOrb.href = "https://us2.admin.mailchimp.com/campaigns/";
mailchimpOrb.target = "_mailchimp";
orbsTop.appendChild(mailchimpOrb);

// Create Share Email Orb
var shareOrb = document.createElement("div");
shareOrb.className = "share-orb orb glyph";
shareOrb.addEventListener("click", shareEmail, false);
orbsTop.appendChild(shareOrb);

function shareEmail() {

}

// Create Edit Email Orb
var editOrb = document.createElement("div");
editOrb.className = "edit-orb orb glyph";
editOrb.id = "edit-orb";
editOrb.addEventListener("click", editEmail, false);
orbsBottom.appendChild(editOrb);
var editToggle = false

function editEmail() {
  editToggle = !editToggle;
  var editDesktop = dFrame.getElementsByTagName('html')[0].contentEditable = editToggle;
  document.getElementById("desktop-view").classList.toggle("editing");
  document.getElementById("edit-orb").classList.toggle("on");
}

// Create Plain-Text Generator
var plainTextOrb = document.createElement("div");
plainTextOrb.className = "plain-text-orb orb glyph";
plainTextOrb.addEventListener("click", plainText, false);
orbsBottom.appendChild(plainTextOrb);

function cleanPlainTxt(text) {
  console.log("function for cleaning!");
  console.log(text);

  var cleanedTxt = text

  cleanedTxt = cleanedTxt.replace(/(  +)/gi, "");
  cleanedTxt = cleanedTxt.replace(/\t/gi, "");
  cleanedTxt = cleanedTxt.replace(/\n\n+/gi, "\n\n");
  cleanedTxt = cleanedTxt.trim();

  return cleanedTxt
}


function plainText() {

  if ( typeof(plainTextTingle) == 'undefined' || plainTextTingle == null ) {

    // data-module="preheader"
    // data-module="featured-article"
    // data-module="testimonial"
    // data-module="wildcard"
    // data-module="featured-courses"
    // data-module="bbanner"

    var moduleType = ""
    var plainText = ""
    // processModuleText(moduleType)

    ////
    //////
    // Iterate through ALL LINKS - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of
    let moduleList = domCopy.querySelectorAll("[data-module]");

    for (let module of moduleList) {

      var insertText = "";

      console.log(module);

      var moduleType = module.getAttribute("data-module");

      console.log(moduleType);


      if (moduleType === "preheader") {
        var summary =  module.innerText.trim();
        var insertText = summary;
      }

      if (moduleType === "testimonial") {
        var summary =  module.querySelector("[data-sub-mod='summary']").innerText.replace(/(\t+|\n+)/gi, "").trim() + "\"\n\n";
        var author =  module.querySelector("[data-sub-mod='author']").innerText.trim();
        var profession =  module.querySelector("[data-sub-mod='profession']").innerText.trim();
        var insertText = "\"" + summary + author + profession;
      }

      if (moduleType === "featured-article") {
        var headline = module.querySelector("[data-sub-mod='title']").innerText.trim() + "\n"
        var author =   module.querySelector("[data-sub-mod='author']").innerText.trim() + "\n\n";
        var summary =  module.querySelector("[data-sub-mod='summary']").innerText.trim() + "\n\n";
        var ctaText =  module.querySelector("[data-sub-mod='cta']").innerText.trim() + "\n";
        var ctaLink =  module.querySelector("[data-sub-mod='cta'] a").getAttribute("href").trim();

        var insertText = headline + author + summary + ctaText + ctaLink;
      }

      if (moduleType === "did-you-know") {
        var headline = module.innerText.trim();

        var insertText = headline;
      }

      if (moduleType === "from-the-blog") {
        var categoryTitle = module.querySelector("[data-sub-mod='category-title']").innerText.trim() + "\n\n"
        var title1 =   module.querySelectorAll("[data-sub-mod='title']")[0].innerText.trim() + "\n";
        var author1 =   module.querySelectorAll("[data-sub-mod='author']")[0].innerText.trim() + "\n\n";
        var ctaLink1 =  module.querySelectorAll("[data-sub-mod='title'] a")[0].getAttribute("href").trim() + "\n\n * * * \n\n";
        var title2 =   module.querySelectorAll("[data-sub-mod='title']")[1].innerText.trim() + "\n";
        var author2 =   module.querySelectorAll("[data-sub-mod='author']")[1].innerText.trim() + "\n\n";
        var ctaLink2 =  module.querySelectorAll("[data-sub-mod='title'] a")[1].getAttribute("href").trim() + "\n\n * * * \n\n";
        var title3 =   module.querySelectorAll("[data-sub-mod='title']")[2].innerText.trim() + "\n";
        var author3 =   module.querySelectorAll("[data-sub-mod='author']")[2].innerText.trim() + "\n\n";
        var ctaLink3 =  module.querySelectorAll("[data-sub-mod='title'] a")[2].getAttribute("href").trim();

        var insertText = categoryTitle + title1 + author1 + ctaLink1 + title2 + author2 + ctaLink2 + title3 + author3 + ctaLink3;
      }

      if (moduleType === "two-column-articles") {
        var headline1 = module.querySelectorAll("[data-sub-mod='title']")[0].innerText.trim() + "\n";
        var summary1  = module.querySelectorAll("[data-sub-mod='summary']")[0].innerText.trim() + "\n\n";
        var ctaText1  = module.querySelectorAll("[data-sub-mod='cta']")[0].innerText.trim() + "\n";
        var ctaLink1  = module.querySelectorAll("[data-sub-mod='cta'] a")[0].getAttribute("href").trim();

        var headline2 = module.querySelectorAll("[data-sub-mod='title']")[1].innerText.trim() + "\n";
        var summary2  = module.querySelectorAll("[data-sub-mod='summary']")[1].innerText.trim() + "\n\n";
        var ctaText2  = module.querySelectorAll("[data-sub-mod='cta']")[1].innerText.trim() + "\n";
        var ctaLink2  = module.querySelectorAll("[data-sub-mod='cta'] a")[1].getAttribute("href").trim();

        var insertText = headline1 + summary1 + ctaText1 + ctaLink1 + "\n\n* * *\n\n" + headline2 + summary2 + ctaText2 + ctaLink2;
      }

      if (moduleType === "featured-courses") {

        var insertText = ""

        // insertText += module.querySelectorAll("[data-sub-mod='all-courses-title']")[0].innerText.trim() + "\n"
        insertText += module.querySelectorAll("[data-sub-mod='all-courses-cta']")[0].innerText.trim() + " (";
        insertText += module.querySelectorAll("[data-sub-mod='all-courses-cta'] a")[0].getAttribute("href").trim() + ")" + "\n\n* * *\n\n";

        insertText += module.querySelectorAll("[data-sub-mod='course-title']")[0].innerText.trim() + "\n"
        insertText += module.querySelectorAll("[data-sub-mod='author']")[0].innerText.trim() + "\n\n";
        insertText += module.querySelectorAll("[data-sub-mod='cta']")[0].innerText.trim() + " ";
        insertText += module.querySelectorAll("[data-sub-mod='cta'] a")[0].getAttribute("href").trim();
        insertText += "\n\n* * *\n\n";

        insertText += module.querySelectorAll("[data-sub-mod='course-title']")[1].innerText.trim() + "\n"
        insertText += module.querySelectorAll("[data-sub-mod='author']")[1].innerText.trim() + "\n\n";
        insertText += module.querySelectorAll("[data-sub-mod='cta']")[1].innerText.trim() + " ";
        insertText += module.querySelectorAll("[data-sub-mod='cta'] a")[1].getAttribute("href").trim();
        insertText += "\n\n* * *\n\n";

        insertText += module.querySelectorAll("[data-sub-mod='course-title']")[2].innerText.trim() + "\n"
        insertText += module.querySelectorAll("[data-sub-mod='author']")[2].innerText.trim() + "\n\n";
        insertText += module.querySelectorAll("[data-sub-mod='cta']")[2].innerText.trim() + " ";
        insertText += module.querySelectorAll("[data-sub-mod='cta'] a")[2].getAttribute("href").trim();

      }

      if (moduleType === "wildcard") {
        var categoryTitle = toTitleCase(module.querySelector("[data-sub-mod='category-title']").innerText.trim()) + "\n\n"
        var headline = module.querySelector("[data-sub-mod='title']").innerText.trim() + "\n";
        // var subheadline = module.querySelector("[data-sub-mod='sub-title']").innerText.trim() + "\n";
        var summary = cleanPlainTxt(module.querySelector("[data-sub-mod='summary']").innerText) + "\n\n";
        var ctaText = module.querySelector("[data-sub-mod='cta']").innerText.trim() + "\n";
        var ctaLink = module.querySelector("[data-sub-mod='cta'] a").getAttribute("href").trim();

        var insertText = categoryTitle + headline + summary + ctaText + ctaLink;
      }

      if (moduleType === "bbanner") {
        var headline = module.querySelector("[data-sub-mod='title']").innerText.trim() + "\n";
        var summary = module.querySelector("[data-sub-mod='summary']").innerText.trim() + "\n\n";
        var ctaText = module.querySelector("[data-sub-mod='cta']").innerText.trim() + "\n";
        var ctaLink = module.querySelector("[data-sub-mod='cta'] a").getAttribute("href").trim();

        var insertText = headline + summary + ctaText + ctaLink;
      }


      var plainText = plainText + insertText + "\n\n" + "===============================================" + "\n\n";

    }

      console.log(plainText);


      // Create Plain-Text Modal
      var plainTextModal = document.createElement("textarea");
      plainTextModal.className = "plain-text-modal";
      var plainTextModalText = document.createTextNode(plainText);
      plainTextModal.appendChild(plainTextModalText);

      // document.body.appendChild(plainTextModal);

      // instanciate new modal
      plainTextTingle = new tingle.modal({
          footer: false,
          stickyFooter: false,
          cssClass: ['fill'],

          onOpen: function() {
              console.log('modal open');
          },
          onClose: function() {
              console.log('modal closed');
              // plainTextTingle.destroy();
          }
      });

      plainTextTingle.setContent(plainTextModal);

  }

  plainTextTingle.open();

}

function processModuleText(moduleType) {

  // if () {
  //
  // }

}




// Create Newsletter QA Info Bar Wrapper
var infoBar = document.createElement("div");
infoBar.className = "info-bar";
qaWrapper.appendChild(infoBar);


// Create Preheader Module
// https://www.campaignmonitor.com/blog/email-marketing/2015/08/improve-email-open-rates-with-preheader-text/
var preheaderWapper = document.createElement("div");
preheaderWapper.className = "preheader-wrapper";
infoBar.appendChild(preheaderWapper);




preheader = preheader.replace(/(\&nbsp\;|\n|\t|\r|\u00a0)/gi, " "); // http://stackoverflow.com/a/1496863/556079
preheader = preheader.replace(/   +/gi, " ");
preheader = preheader.replace(/(^ +?| +?$)/gi, "");
preheader = preheader.substring(0, 149);
preheader = preheader.trim();

preheader = "<div class='mod mod-preheader'><div class='title'>Preheader</div><div class='mod-body'>" + [preheader.slice(0, 89), "<span class='preheader-back'>", preheader.slice(89)].join('') + "</span></div></div>"; // http://stackoverflow.com/a/4364902/556079

preheaderWapper.innerHTML = preheader;


// Create


//
//
//
} // END TEST
//
//
//
