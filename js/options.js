// console.warn(" 💎💎💎 [korra-email-design-tooklit] loaded /js/options.js");
//////////////////////////////////////////////////////////////////////////

/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
//
// Update here, and in get-options.js
// Update this to not have to do that. Check the async func I used in newsletter-async
//
//
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////

function loadOptions() {

  var bkg = chrome.runtime.getBackgroundPage(function(bkg){

    var options = bkg.getOptions();
    console.log(options);

    //////
    /// Dropbox
    /////

    console.error("hi!");

    console.log("options.dropboxAccessToken", options.dropboxAccessToken);
    // Dropbox Access Token
    if(options.dropboxAccessToken !== '' && options.dropboxAccessToken !== undefined){
      document.getElementById("dropboxAccessToken").value = options.dropboxAccessToken;
    }

    console.log("options.fullPathToDropboxFolder", options.fullPathToDropboxFolder);
    // Dropbox Parent Folder
    if(options.fullPathToDropboxFolder !== '' && options.fullPathToDropboxFolder !== undefined){
      document.getElementById("fullPathToDropboxFolder").value = options.fullPathToDropboxFolder;
    }

    //////
    /// Mailgun
    /////

    console.log(options)
    console.log(options.mailgunApiKey)

    console.log("options.mailgunApiKey", options.mailgunApiKey);
    // Mailgun API Key
    if(options.mailgunApiKey !== '' && options.mailgunApiKey !== undefined){
      document.getElementById("mailgunApiKey").value = options.mailgunApiKey;
      console.log(options)
      console.log(options.mailgunApiKey)
    }

    console.log("options.mailgunDomainName", options.mailgunDomainName);
    // Mailgun Domain Name
    if(options.mailgunDomainName !== '' && options.mailgunDomainName !== undefined){
      document.getElementById("mailgunDomainName").value = options.mailgunDomainName;
    }

    //////
    /// Open in App
    /////

    console.log(options)
    console.log(options.openInApp)

    console.log("options.openInApp", options.openInApp);

    if(options.openInApp !== '' && options.openInApp !== undefined){
      document.getElementById("openInApp").value = options.openInApp;
      console.log(options)
      console.log(options.openInApp)
    }

    //////
    /// Link Validation
    /////

    if(options.cache == 'true'){
      document.getElementById("cache").checked = true;
    }

    if(options.noFollow == 'true'){
      document.getElementById("noFollow").checked = true;
    }

    if(options.parseDOM == 'true'){
      document.getElementById("parseDOM").checked = true;
    }

    if(options.trailingHash == 'true'){
      document.getElementById("trailingHash").checked = true;
    }

    if(options.emptyLink == 'true'){
      document.getElementById("emptyLink").checked = true;
    }

    if(options.noHrefAttr == 'true'){
      document.getElementById("noHrefAttr").checked = true;
    }
    if(options.autoCheck == 'true'){
      document.getElementById("autoCheck").checked = true;
    }

    document.getElementById("blacklistEntries").value = options.blacklist.split(" ");
    var requestType = document.getElementById("requestType");

    for (var i = 0; i < requestType.children.length; i++) {
      var requestTypechild = requestType.children[i];
        if (requestTypechild.value == options.checkType) {
        requestTypechild.selected = "true";
        break;
      }
    }
  });
}

function saveOptions() {
  console.log("running saveOptions()");

  var bkg = chrome.runtime.getBackgroundPage(function(bkg){
    var blacklistEntries = document.getElementById("blacklistEntries");
    var requestType = document.getElementById("requestType");

    // Save selected options to localstore

    // Dropbox
    //////////

      // Dropbox Access Token
      bkg.setItem("dropboxAccessToken", dropboxAccessToken.value);

      // Full Path + Dropbox Folder as it was entered (minus trimming)
      var fullPathToDropboxFolder = document.getElementById("fullPathToDropboxFolder").value.trim().replace(/(^file:\/\/\/|^\/+|\/+$)/i,"");
      bkg.setItem("fullPathToDropboxFolder", fullPathToDropboxFolder);

      // Just the Dropbox folder name
      var dropboxFolderName = fullPathToDropboxFolder.replace(/(^.+\/|\/$)/gi,"")
      bkg.setItem("dropboxFolderName", dropboxFolderName);

      // Local user path
      bkg.setItem("localUserProfilePath", fullPathToDropboxFolder.replace("/" + dropboxFolderName));

    // Mailgun
    //////////

      // Mailgun API Key
      bkg.setItem("mailgunApiKey", mailgunApiKey.value);

      // Mailgun Domain Name
      bkg.setItem("mailgunDomainName", mailgunDomainName.value);

    // Open in App
    //////////

      // App Selection
      bkg.setItem("openInApp", openInApp.value);


    // Link Validation
    //////////////////
    bkg.setItem("blacklist", blacklistEntries.value);
    bkg.setItem("checkType", requestType.children[requestType.selectedIndex].value);

    if(document.getElementById("cache").checked){bkg.setItem("cache", 'true');}else{bkg.setItem("cache", 'false');}
    if(document.getElementById("noFollow").checked){bkg.setItem("noFollow", 'true');}else{bkg.setItem("noFollow", 'false');}
    if(document.getElementById("parseDOM").checked){bkg.setItem("parseDOM", 'true');}else{bkg.setItem("parseDOM", 'false');}
    if(document.getElementById("trailingHash").checked){bkg.setItem("trailingHash", 'true');}else{bkg.setItem("trailingHash", 'false');}
    if(document.getElementById("emptyLink").checked){bkg.setItem("emptyLink", 'true');}else{bkg.setItem("emptyLink", 'false');}
    if(document.getElementById("noHrefAttr").checked){bkg.setItem("noHrefAttr", 'true');}else{bkg.setItem("noHrefAttr", 'false');}
    if(document.getElementById("autoCheck").checked){bkg.setItem("autoCheck", 'true');}else{bkg.setItem("autoCheck", 'false');}

    document.getElementById("msg").style.visibility = "visible";
    setTimeout(function() {
      document.getElementById("msg").style.visibility = "hidden";
    }, 2000);
  });
}

function deleteObjectStore(){
  indexedDBHelper.deleteObjectStore();
  console.log("Cleared IndexedDB Datastore");
  document.getElementById("msgCache").style.visibility = "visible";
  setTimeout(function() {
    document.getElementById("msgCache").style.visibility = "hidden";
  }, 2000);
}

document.getElementById('save').addEventListener('click', saveOptions);
document.getElementById('clearCache').addEventListener('click', deleteObjectStore);

loadOptions();
