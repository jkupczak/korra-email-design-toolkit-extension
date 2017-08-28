if ( getParameterByName("capture") === "1" && /reports\/show/gi.test(document.URL) ) {

  // https://stackoverflow.com/a/40287132/556079
  var storage = chrome.storage.local;

  ///

  console.log("true");


  // Get campaign data automatically on page load

  // Get variables
  var campaignId = document.URL.replace(/(^.+?id=|&.+)/gi,"");

  var combo1 = document.querySelector("ol.media-list > li:first-child .media-body h4 a").href.replace(/(^.+?id=|&.+)/gi,"");
  var combo1id = document.querySelector("ol.media-list > li:first-child .media-image").style.background.replace(/(^.+?cid=|"\).+)/gi,"");

  var combo2 = document.querySelector("ol.media-list > li:nth-child(2) .media-body h4 a").href.replace(/(^.+?id=|&.+)/gi,"");
  var combo2id = document.querySelector("ol.media-list > li:nth-child(2) .media-image").style.background.replace(/(^.+?cid=|"\).+)/gi,"");

  var combo3 = elExists(document.querySelector("ol.media-list > li:nth-child(3) .media-body h4 a"));
      combo3 = (combo3) ? combo3.href.replace(/(^.+?id=|&.+)/gi,"") : combo3;

  var combo3id = elExists(document.querySelector("ol.media-list > li:nth-child(3) .media-image"));
      combo3id = (combo3id) ? combo3id.style.background.replace(/(^.+?cid=|"\).+)/gi,"") : combo3id;

  var variateTested = document.querySelector("#content > div.sub-section p").textContent.replace(/^.+?: /gi, "");

///////////
///////////
///////////


  // Save Combo 1 to chrome.local.storage
  var string1 = combo1id + "|" + combo1 + "|" + campaignId + "|" + variateTested;

  // https://stackoverflow.com/a/40287132/556079
  storage.set({
    [combo1id]: string1
  });


  // Save Combo 2 to chrome.local.storage
  var string2 = combo2id + "|" + combo2 + "|" + campaignId + "|" + variateTested;

  storage.set({
    [combo2id]: string2
  });


  // Save Combo 3 to chrome.local.storage
  if ( combo3 !== false  ) {
    var string3 = combo3id + "|" + combo3 + "|" + campaignId + "|" + variateTested;
    storage.set({
      [combo3id]: string3
    });
  }





  // var obj1 = {};
  // obj1["variate"] = variateTested
  // obj1["campaignId"] = campaignId
  // obj1["combo"] = combo1
  //
  // var mcData1 = {};
  // mcData1[combo1id] = obj1;
  // chrome.storage.local.set(mcData1);

  // // Save Combo 2 to chrome.local.storage
  // var obj2 = {};
  // obj2["variate"] = variateTested
  // obj2["campaignId"] = campaignId
  // obj2["combo"] = combo2
  //
  // var mcData2 = {};
  // mcData2[combo2id] = obj2;
  // chrome.storage.local.set(mcData2);
  //
  // // Save Combo 3 to chrome.local.storage
  //
  //   var obj3 = {};
  //   obj3["variate"] = variateTested
  //   obj3["campaignId"] = campaignId
  //   obj3["combo"] = combo3
  //
  //   var mcData3 = {};
  //   mcData3[combo3id] = obj3;
  //   chrome.storage.local.set(mcData3);
  // }





  // console.log( chrome.storage.local.get(mcData) );

  // chrome.storage.local.get(function(result){console.log(result)});

  setTimeout(function() {
    window.close();
  }, 500);


} else {

  console.log("false");

}
