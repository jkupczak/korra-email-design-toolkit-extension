if ( getParameterByName("capture") === "1" && /reports\/show/gi.test(document.URL) ) {

  // https://stackoverflow.com/a/40287132/556079
  var storage = chrome.storage.local;

  ///

  console.log("Running mailchimp-capture.js");


  // Get campaign data automatically on page load

  // Get constant variables
  var campaignId = document.URL.replace(/(^.+?id=|&.+)/gi,"");
  var variateTested = document.querySelector("#content > div.sub-section p").textContent.replace(/^.+?: /gi, "");


  let rows = document.querySelectorAll("ol.media-list > li");
  for (let row of rows) {

    var combo = row.querySelector(".media-body h4 a").href.replace(/(^.+?id=|&.+)/gi,"");
    var comboid = row.querySelector(".media-image").style.background.replace(/(^.+?cid=|"\).+)/gi,"");

    // Save Combo to chrome.local.storage
    var string = comboid + "|" + combo + "|" + campaignId + "|" + variateTested;

    // https://stackoverflow.com/a/40287132/556079
    storage.set({
      [comboid]: string
    });

  }


///////////
///////////
///////////


  setTimeout(function() {
    window.close();
  }, 500);


} else {

  console.log("false");

}
