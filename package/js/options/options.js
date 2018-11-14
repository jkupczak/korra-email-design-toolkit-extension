// console.warn(" 💎💎💎 [korra-email-design-tooklit] loaded /js/options.js");
//////////////////////////////////////////////////////////////////////////

// Icons

var svgToggleOff = '<svg class="tool-toggle-off" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M17 7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h10c2.76 0 5-2.24 5-5s-2.24-5-5-5zM7 15c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/><path fill="none" d="M0 0h24v24H0z"/></svg>';
var svgToggleOn = '<svg class="tool-toggle-on" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M17 7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h10c2.76 0 5-2.24 5-5s-2.24-5-5-5zm0 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/><path fill="none" d="M0 0h24v24H0z"/></svg>';
var svgDupe = '<svg class="tool-dupe" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M16 8h-2v3h-3v2h3v3h2v-3h3v-2h-3zM2 12c0-2.79 1.64-5.2 4.01-6.32V3.52C2.52 4.76 0 8.09 0 12s2.52 7.24 6.01 8.48v-2.16C3.64 17.2 2 14.79 2 12zm13-9c-4.96 0-9 4.04-9 9s4.04 9 9 9 9-4.04 9-9-4.04-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7z"/></svg>';
var svgDelete = '<svg class="tool-delete" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/><path d="M0 0h24v24H0z" fill="none"/></svg>';

/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
//
//
//   Add new link match block
//
//
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////

// Button for adding new rules
document.getElementById("add-new-rule").addEventListener("click", createNewRule, false);

// Parent container
var allRulesContainer = document.getElementById("custom-rules-wrapper");
allRulesContainer.addEventListener("click", ruleFunctions, false);

// ID Array
var ruleIds = [];

///////////////////////////
// Creates a new rule block
// Appends it to the end of the rules container
// Alternatively, it inserts it after a rule that we want to duplicate
// and the data is populated from the original rule using a separate function
function createNewRule() {

  console.log("creating new rule");

  // Determine rule #
  if ( ruleIds.length === 0 ) {
    var ruleId = 1;
  } else {
    var ruleId = Math.max.apply(null, ruleIds) + 1;
  }
  ruleIds.push(ruleId);

  // Rule Wrapper
  var newRuleRow = document.createElement("div");
  newRuleRow.className = "link-match-custom-rule expanded creating";
  newRuleRow.id = "link-match-custom-rule-" + ruleId;
  newRuleRow.dataset.rule = ruleId;

  // Expanded View
  var expandedView = document.createElement("div");
  expandedView.className = "expanded-view";
  newRuleRow.appendChild(expandedView);

  // Expand/Collapse
  var toolsExpand = document.createElement("div");
  toolsExpand.className = "toggle-expand material-icons";
  toolsExpand.innerText = "keyboard_arrow_right";
  newRuleRow.appendChild(toolsExpand);

  // Tools
  var toolsWrapper = document.createElement("div");
  toolsWrapper.className = "tools-for-rules";

    // Delete
    var deleteRule = document.createElement("div");
    deleteRule.className = "tool tool-delete";
    deleteRule.innerHTML = svgDelete;
    toolsWrapper.appendChild(deleteRule);
    // Duplicate
    var dupeRule = document.createElement("div");
    dupeRule.className = "tool tool-dupe";
    dupeRule.innerHTML = svgDupe;
    toolsWrapper.appendChild(dupeRule);
    // On/Off
    var toggleRule = document.createElement("div");
    toggleRule.className = "tool tool-toggle tool-toggle-off";
    toggleRule.innerHTML = svgToggleOff
    toolsWrapper.appendChild(toggleRule);

  newRuleRow.appendChild(toolsWrapper);

  // Title and Description
  var ruleTitleAndDec = document.createElement("div");
  ruleTitleAndDec.className = "rule-title-and-desc";

    // Title
    var ruleTitle = document.createElement("div");
    ruleTitle.className = "link-condition-title";
    ruleTitle.innerHTML = '<label for="field-rule-title-' + ruleId + '">Rule Title</label><div><input type="text" id="field-rule-title-' + ruleId + '" maxlength="250" value="Rule #' + ruleId + '"></input></div>';
    ruleTitleAndDec.appendChild(ruleTitle);

    // Description
    var ruleDesc = document.createElement("div");
    ruleDesc.className = "link-condition-description";
    ruleDesc.innerHTML = '<label for="field-rule-desc-' + ruleId + '">Rule Description</label><div><textarea id="field-rule-desc-' + ruleId + '" maxlength="250" rows="2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse id purus ornare, consectetur dolor in, laoreet enim. Mauris neque magna, ullamcorper non egestas ac, fermentum a ex. Maecenas et nunc risus. Morbi ac ante nisi.</textarea></div>';
    ruleTitleAndDec.appendChild(ruleDesc);

  newRuleRow.appendChild(ruleTitleAndDec);

  // Append new row
  allRulesContainer.appendChild(newRuleRow);

  // Focus and select the first input
  var fieldRuleTitle = newRuleRow.querySelectorAll(".link-condition-title input")[0];
  fieldRuleTitle.focus();
  fieldRuleTitle.select();
}


///////////////////////////
// Creates a new group of rule conditions
// Each grouping can be set as "any" or "all" which mimics then and/or (&& ||) operators
function newConditionGroup() {

}


///////////////////////////
// Loop through the values of an existing rule and save the data to a JSON object
// This object is then saved to a master array of json rules
// It can then be saved to storage or used to fill in the values of a blank rule
function createRuleInJson(rule) {

}


///////////////////////////
// A blank rule needs its data filled in via a JSON object
// Used on page load to display all saved rules from chrome.storage.sync
// Or when an existing rule is duplicated
function fillRuleFromJson(rule, json) {

}



///////////////////////////
// Each rule has some tools associated with it.
// This function is run when the click event listener fires on the rule
function ruleFunctions(e) {

  var evt = event.target;
  var rule = evt.closest(".link-match-custom-rule")

  console.log(this, event.target, e.target.closest(".tool-delete"));

  // Delete
  if ( evt.closest(".tool-delete") ) {

    // Delete the rule ID from the array
    removeFromArray(ruleIds, parseInt(rule.dataset.rule));
    // var i = ruleIds.indexOf(parseInt(rule.dataset.rule));
    // if( i != -1) { ruleIds.splice(i, 1) }

    // Delete the rule from the DOM
    rule.remove();
  }

  // Dupe
  if ( evt.closest(".tool-dupe") ) {
    dupedRuleNode = rule.cloneNode(true);
    rule.insertAdjacentElement("afterend", dupedRuleNode);

    rule.nextElementSibling.id = "link-match-custom-rule-" + (allRulesContainer.children.length);
    rule.nextElementSibling.dataset.rule = allRulesContainer.children.length;

    rule.nextElementSibling.querySelectorAll(".link-condition-title input")[0].value = rule.nextElementSibling.querySelectorAll(".link-condition-title input")[0].value + " (copy)";

    dupedRuleNode.querySelectorAll(".link-condition-title input")[0].focus();
    dupedRuleNode.querySelectorAll(".link-condition-title input")[0].select();
  }

  // Expand
  if ( evt.classList.contains("toggle-expand") ) {
    rule.classList.toggle("expanded");
  }

}



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
