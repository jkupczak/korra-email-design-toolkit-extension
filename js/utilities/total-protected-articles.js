console.warn(" 💎💎💎 [korra-email-design-tooklit] loaded /js/utilities/total-protected-articles.js");
/////////////////////////////////////////////////////////////////////////////////////////////

// Get Protected Articles value from chrome.storage

  // get
  chrome.storage.promise.local.get('protectedarticles').then(function(data) {

    if (typeof data.protectedarticles !== 'undefined') {

      // "protectedarticles" exists

      // Convert the value we got from chrome.storage into an array.
      // https://stackoverflow.com/a/20881336/556079
      var arr = Object.values(data.protectedarticles);
      console.log(arr);

      if ( arr.length > 0 ) {
        alertify.error("<h1>Articles are Protected</h1><b>" + arr.length + "</b> blog articles are currently <b><u>protected</u></b>. Verify that none of them are featured in this email before scheduling.", 0);
      } else {
        alertify.success("<h1>All Clear!</h1>No articles are protected. You're safe to send!", 0);
      }


    } else {
      // "protectedarticles" does not exists
      console.error("'protectedarticles' not set yet");
    }



  }, function(error) {
    // rejected
    console.log(error);
  });
