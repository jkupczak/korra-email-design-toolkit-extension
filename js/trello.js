console.warn(">>> trello.js loaded");

// HELP
// https://developer.chrome.com/extensions/storage
// https://developer.chrome.com/extensions/overview#sync
//
// http://stackoverflow.com/questions/41049155/how-can-get-object-data-that-ive-set-in-chrome-storage
// https://stackoverflow.com/questions/11692699/chrome-storage-local-set-using-a-variable-key-name/40287132
// http://stackoverflow.com/questions/11922964/how-do-i-view-the-storage-of-a-chrome-extension-ive-installed
// http://stackoverflow.com/questions/13872542/chrome-chrome-storage-local-get-and-set
//




// Track clicks on dropbox links so that we can get the originating Trello card URL.
// Log it into storage so that we can quickly visit the Trello card from other pages.
window.onclick = function(e) {
  if (e.target.localName == 'a') {

    var dropboxUrl = e.target.href

    if ( /dropbox.+?\.htm/gi.test(dropboxUrl) ) {
      var trelloUrl = document.URL;

      var emailId   = dropboxUrl.replace(/(.+\/)/gi, "")
      var dropboxId = dropboxUrl.replace(/(.+s\/|\/.+$)/gi, "")
      var trelloId  =  trelloUrl.replace(/(.+c\/|\/.+$)/gi, "")

      var ids = { "s": "", "n": "", "d": dropboxId, "t": trelloId, "m": "", "l": "" };
      var obj= {};
      var key = emailId
      obj[key] = ids;
      chrome.storage.sync.set(obj);

      chrome.storage.sync.get(key,function(result){
        console.log("key");
        console.log(result[key]["d"]);
        console.log(result[key]["t"]);
      });

      chrome.storage.sync.get("a", function(result) { console.log(result) });

      //
      // storeUserPrefs();
      //
      // function storeUserPrefs() {
      //     var key = "myKey",
      //         testPrefs = JSON.stringify({
      //             'val': 10,
      //             'foo': 'bar'
      //         });
      //     var jsonfile = {};
      //     jsonfile[key] = testPrefs;
      //
      //     chrome.storage.sync.set(jsonfile, function () {
      //         console.log('Saved', key, testPrefs);
      //     });
      //
      //
      //     var channels = "";
      //     var keywords = "";
      //     chrome.storage.sync.get('myKey', function (result) {
      //         channels = result.myKey;
      //         console.log("#");
      //         console.log(result.myKey);
      //         console.log(result.myKey.foo);
      //     });
      //
      //
      //     chrome.storage.sync.get("myKey",function(result){
      //
      //       // console.log("myKey",result);
      //       // var yourData0 = "myKey",result;
      //       // var yourData1 = JSON.stringify(result);
      //       // var yourData2 = JSON.parse(yourData1);
      //       // console.log(yourData2);
      //       // console.log("myKey",result.count);
      //       // console.log("myKey",result.length);
      //       // console.log(yourData1.count);
      //       // console.log(yourData1.length);
      //       // console.log(yourData2.count);
      //       // console.log(yourData2.length);
      //       //
      //       // console.log("myKey",result[0].val);
      //       // console.log("myKey"[0].val,result);
      //       // console.log(yourData0[0].val);
      //       // console.log(yourData0[1].val);
      //       // console.log(yourData0[2].val);
      //       // var yourData3 = JSON.parse(result);
      //
      //       for (var i=0; i<result.length; i++)
      //           for (var name in result[i]) {
      //               console.log("Item name: "+name);
      //               console.log("Source: "+result[i][name].sourceUuid);
      //               console.log("Target: "+result[i][name].targetUuid);
      //           }
      //
      //     });

      // }



      // View entire storage
      chrome.storage.sync.get(function(result) { console.log("Entire chrome.storage results: "); console.log(result); });

      // chrome.storage.sync.set({
      //   "" + emailId: trelloId
      // }, function() {
      //   console.log("Value set: " + trelloId);
      // });
      //
      // chrome.storage.onChanged.addListener(function(changes, namespace) {
      //   for (key in changes) {
      //     var storageChange = changes[key];
      //     console.log('Storage key "%s" in namespace "%s" changed. ' +
      //                 'Old value was "%s", new value is "%s".',
      //                 key,
      //                 namespace,
      //                 storageChange.oldValue,
      //                 storageChange.newValue);
      //   }
      // });
      //
      // chrome.storage.sync.get(emailId, function(result) {
      //   console.log("get - " + result.emailId);
      // });

      // console.log("done")

    }

  }
};
