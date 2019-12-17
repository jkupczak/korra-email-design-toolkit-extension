////////////////
////////////////
//
////////////////
////////////////
autosize(document.querySelectorAll('textarea'));


////////////////
////////////////
//
////////////////
////////////////

var loadingFinished = function() {

  console.log("function called loadingFinished()");

  setTimeout(function() {
    document.querySelector("#loading").classList.add("zoom-out");
  }, 650);

  setTimeout(function() {
    document.body.style.overflow = "";
    document.querySelector(".loading-status").remove();
  }, 1000);

  console.log("loading finished");
};


////////////////
////////////////
//
////////////////
////////////////

document.addEventListener("keydown", function(e) {
  if ( e.srcElement.type === "textarea" && e.srcElement.dataset.preventBreaks === "true" ) {

    // Enter was pressed without shift key
    if (e.keyCode == 13 )
    {
      // prevent default behavior
      e.preventDefault();
    }

  }
});

////////////////
////////////////
// buildRow_espMergeTag
////////////////
////////////////

document.getElementById("add-espmergetag-row").addEventListener("click", buildRow_espMergeTag, false);

function buildRow_espMergeTag(values) {

  console.log(values);

  if ( !Array.isArray(values) ) {
    values = [
      {
        'n': "",
        'o': "",
        'c': ""
      }
    ];
  }
  console.log(values);

  Object.keys(values).forEach(function (item) {
  	console.log(values[item]); // value

    let row = `
      <div class="columns input-table-row p-b-1">
        <input data-name="n" data-autosave="true" data-group="true" data-group-type="object" type="text" name="espMergeTags" class="md m-r-1" value="` + values[item].n + `">
        <input data-name="o" data-autosave="true" data-group="true" data-group-type="object" type="text" name="espMergeTags" class="center xxs m-r-1" value="` + values[item].o + `">
        <input data-name="c" data-autosave="true" data-group="true" data-group-type="object" type="text" name="espMergeTags" class="center xxs m-r-1" value="` + values[item].c + `">
      </div>
    `;

    document.getElementById("espMergeTags").insertAdjacentHTML("beforeend", row);
  });


}

////////////////
////////////////
// Load options from storage into the HTML.
////////////////
////////////////

var applyOptions = function (options) {
  console.log("loading options from storage and applying to page");

  // Begin looping through each key/value pair
  Object.keys(options).forEach(function (key) {

    // Process specific keys
    if ( key === "savedEmailAddresses" ) {
      listValues(options[key], document.getElementById("saved-email-addresses"));
    }

    if ( key === "espMergeTags" ) {

      buildRow_espMergeTag(options[key]);

    }

    // Process all other keys.
    else {

      // var inputs = document.getElementsByName(key);
      var inputs = document.querySelectorAll('[name="' + key + '"]:not([data-autofill="false"])');

      console.log(inputs.length, inputs, "key:", key, "/ value:", options[key]); // The object key

      // If the key matched any inputs
      if ( inputs ) {

          // process the key/value if we found only 1 matching input
          if ( inputs.length === 1 ) {

            // Assign the first and only node from the nodelist to a variable
            var input = inputs[0];

            // Look for <input> tags first
            if ( input.tagName === 'INPUT' ) {

              if ( input.type === 'checkbox' ) {
                if ( options[key] === '1' ) {
                  input.checked = true;
                } else {
                  input.checked = false;
                }
              }
              else if ( input.type === "text" || input.type === "number" ) {
                input.value = options[key];
              }

            }

            // look for <select> boxes
            else if ( input.tagName === 'SELECT' ) {

              for (var i = 0; i < input.length; i++) {
                // console.log(options[key], input.options[i], [i], input.options[i].value);
                if ( options[key] === input.options[i].value ) {
                  input.selectedIndex = i;
                  break;
                }
              }

            }

            // look for <textarea> boxes
            else if ( input.tagName === 'TEXTAREA' ) {
              input.value = options[key];
            }

          }

          // More than one input exists with this name
          else if ( inputs.length > 1 ) {

            // Verify that it's an array
            if ( options[key].constructor === Array ) {
              console.info("this is an array", key, options[key]);

              // Loop through all of the matching inputs on the page
              inputs.forEach(function (input, index) {

                // uncheck it first, then see if we need to re-check it by looking at the saved value
                input.checked = false;

                options[key].find(function (option) {
                  if ( option === input.value) {
                    input.checked = true;
                  }
                });

              });

            }

            else {
              console.warn("this is NOT an array", key, options[key]);
            }

          }

          else {
            console.error("could not find any inputs matching this option key:", "\"" + key + "\"", ", value:", options[key]);
          }

      }
    }

  });

  autosize.update(document.querySelectorAll('textarea'));
};


////////////////////////////
////////////////////////////
////////////////////////////
//
//    List Array Values
//
////////////////////////////
////////////////////////////
////////////////////////////

var listValues = function(values, location) {

  if (typeof values === 'string' || values instanceof String) {
    values = values.split();
  }

  values.forEach(function (item) {
    location.insertAdjacentHTML('beforeend', '<div>' + item + '</div>');
  });

};


////////////////////////////
////////////////////////////
////////////////////////////
//
//    Load Options
//
////////////////////////////
////////////////////////////
////////////////////////////

var options = {};
var loadOptions = function() {

  // async call to get the contents of chrome.storage.sync
  chrome.storage.sync.get(function(syncOptions) {
    console.warn("options successfully loaded from storage.sync", syncOptions);
    options.sync = syncOptions;
    applyOptions(syncOptions);
  });

  chrome.storage.local.get(function(localOptions) {
    console.warn("options successfully loaded from storage.local", localOptions);
    options.local = localOptions;
    applyOptions(localOptions);
    loadingFinished();
  });


  // Resolve Discrepencies
  // ############ @TODO ############
  // It's possible for the saved options to be erased.
  // If this happens, there will be a discrepency with the options page because
  // many options have a default setting coded into the HTML.
  // I need to write some code to account for this.

};
loadOptions();


/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
//
//   Color Picker
//   https://github.com/Simonwep/pickr
//
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////

// Simple example, see optional options for more configuration.
const tagBackgroundColorPickr = Pickr.create({
    el: '.tag-color.background-color.color-picker',
    default: '#6d45e3',
    comparison: false,

    components: {

        // Main components
        preview: false,
        hue: true,

        // Input / output Options
        interaction: {
            hex: true,
            input: true
        }
    },

    // User has changed the color
    onChange(hsva, instance) {
        hsva;     // HSVa color object, if cleared null
        instance; // Current Pickr instance
    },

    // User has clicked the save button
    onSave(hsva, instance) {
        // same as onChange
    }
});

const tagTextColorPickr = Pickr.create({
    el: '.tag-color.text-color.color-picker',
    default: '#6d45e3',
    comparison: false,

    components: {

        // Main components
        preview: false,
        hue: true,

        // Input / output Options
        interaction: {
            hex: true,
            input: true
        }
    },

    // User has changed the color
    onChange(hsva, instance) {
        hsva;     // HSVa color object, if cleared null
        instance; // Current Pickr instance
    },

    // User has clicked the save button
    onSave(hsva, instance) {
        // same as onChange
    }
});

/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
//
//   Listen for Condition Clicks
//
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////

document.getElementById("edit-tag").addEventListener("click", function() {

  console.log(this);
  var e = event.target;
  // console.log(e, event);

  // add condition
  if ( e.matches(".add-condition") ) {
    addCondition(e.previousElementSibling, "tag");
  }

  // remove condition
  if ( e.matches(".remove-condition") ) {
    e.closest('.condition-rows').removeChild(e.parentElement);
  }

  // add condition group
  if ( e.matches(".add-condition-group") ) {
    addConditionGroup(e.closest('.condition-group'), "tag");
  }

  // remove condition group
  if ( e.matches(".remove-condition-group") ) {
    e.closest('.conditions-sub-group').removeChild(e.parentElement);
  }

  // save tag
  if ( e.matches('[data-save-tag]') ) {

    // save values specific to tags
    var tagName = document.getElementById("tag-name").value;
    var color = { "bg": "ffbe12", "text": "fff"};
    var conditions = {"conditions": saveConditions(this.querySelectorAll("#condition-groups")[0]) };
    // var conditions = ["ffbe12", "fff"];

    var tag = {[tagName]: {color, conditions}};

    console.log(tag);

    // Save to storage
    saveToStorage("add", "tag", tag);

  }

}, false);

/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
//
//   Save Conditions
//
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////

var saveConditions = function(conditions) {

  // loop through elements in a condition row
  var saveCondition = function(row) {

    var condition = [];

    var criteria = row.querySelectorAll(".criterion");
    criteria.forEach(function (criterion, index) {
      condition.push(criterion.value);
    });

    return condition;
  };


  // main object where we'll put all of our conditions
  var savedConditions = [];

  // main operator: all|any
  savedConditions.operator = conditions.querySelectorAll(".conditions-main-group .group-operator select")[0].value;

  // loop through main condition rows
  var mainConditionRows = conditions.querySelectorAll(".conditions-main-group .condition-row");
  mainConditionRows.forEach(function (row, index) {
    savedConditions.push(saveCondition(row));
  });


  return savedConditions;

};



/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
//
//   Add Conditions
//
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////

var addCondition = function(target, type) {
  console.log(target, type);
};

var addConditionGroup = function(target, type) {
  console.log(target, type);
};

/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
//
//   Save a Tag
//
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////

var saveTag = function() {


  var sandwiches = document.querySelectorAll('.edit-tag .tag-edit-row');

  sandwiches.forEach(function (sandwich, index) {
  	console.log(sandwich); // The element
  	console.log(index); // The index in the NodeList
  });

  if ( group ) {

  }
  else if ( condition ) {
    saveCondition(row);
  }

  var saveCondition = function(conditionRow) {

    var condition = [];

    condition.push("pathname");
    condition.push("contains");
    condition.push("-pt-");

    return condition;
  };


};


/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
//
//   Icons
//
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////

var svgToggleOff = '<svg class="tool-toggle-off" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M17 7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h10c2.76 0 5-2.24 5-5s-2.24-5-5-5zM7 15c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/><path fill="none" d="M0 0h24v24H0z"/></svg>';
var svgToggleOn = '<svg class="tool-toggle-on" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M17 7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h10c2.76 0 5-2.24 5-5s-2.24-5-5-5zm0 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/><path fill="none" d="M0 0h24v24H0z"/></svg>';
var svgDupe = '<svg class="tool-dupe" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M16 8h-2v3h-3v2h3v3h2v-3h3v-2h-3zM2 12c0-2.79 1.64-5.2 4.01-6.32V3.52C2.52 4.76 0 8.09 0 12s2.52 7.24 6.01 8.48v-2.16C3.64 17.2 2 14.79 2 12zm13-9c-4.96 0-9 4.04-9 9s4.04 9 9 9 9-4.04 9-9-4.04-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7z"/></svg>';
var svgDelete = '<svg class="tool-delete" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/><path d="M0 0h24v24H0z" fill="none"/></svg>';



/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
//
//   Add new link match block
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
    toggleRule.innerHTML = svgToggleOff;
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
  var rule = evt.closest(".link-match-custom-rule");

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



////////////////////////////
////////////////////////////
//
//    Clearing IndexDB
//
////////////////////////////
////////////////////////////

// function deleteObjectStore(){
//   indexedDBHelper.deleteObjectStore();
//   console.log("Cleared IndexedDB Datastore");
//   document.getElementById("msgCache").style.visibility = "visible";
//   setTimeout(function() {
//     document.getElementById("msgCache").style.visibility = "hidden";
//   }, 2000);
// }
//
// document.getElementById('clearCache').addEventListener('click', deleteObjectStore);




///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
//////
//////
//////      Saving
//////
//////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////


  ////////////////////////////////
  //
  //   Append to key if value is new
  //
  ////////////////////////////////

  var saveByAppending = function(event) {

    // console.log(event, event.target);

    var input;
    if ( event.target.tagName === "BUTTON" ) {

      input = event.target.previousElementSibling;

    } else {

      input = event.target;

    }

    var field = input.name;
    var value = input.value.trim();

    // Only continue if there's a value
    if ( value.length < 1 ) {
      console.warn("no value was entered");
      return;
    }

    // Check if the primary field already exists in options
    if ( options.local[field] ) {

      // if it does, check that the new value isn't already stored in it.
      if ( options.local[field].includes(value) ) {
        console.warn("this value already exists");
      } else {
        console.log("this value is new");
        options.local[field].push(value);
        listValues(value, document.getElementById("saved-email-addresses"));
        // erase input
        input.value = "";
      }

    }
    // if it doesn't, create it and add it
    else {
      var inputArray = [];
      inputArray.push(value);
      options.local[field] = inputArray;
      listValues(value, document.getElementById("saved-email-addresses"));
      // erase input
      input.value = "";
    }

    // Push the final array to storage, replacing the old one
    var bkg = chrome.runtime.getBackgroundPage(function(bkg){

      bkg.setItem(field, options.local[field], "local");

    });


    console.log("field:", input, "value:", value, "all saved values:", options.local[field]);

  };

  document.getElementById("add-email-address-confirm").addEventListener("click", saveByAppending, false);


  ////////////////////////////////
  //
  //   Auto-save on Change
  //
  ////////////////////////////////

  var save = function() {

    var field = event.target;

    console.error( "autosave:", field.dataset.autosave, "autofill:", field.dataset.autofill );

    if ( field.dataset.autosave === "true" ) {

      console.warn("change detected on field:", field.name, "| type:", field.type, "| location:", field.dataset.saveLocation, "| group:", field.dataset.group);
      console.warn(field);

      var savedValue;

      // If this field specified an autosave location, use it, otherwise keep it blank.
      var saveLocation = field.dataset.saveLocation || "";

      // Is this a checkbox field?
      if ( field.type === 'checkbox' ) {

        // Grouped checkboxes
        if ( field.dataset.group === 'true' ) {

          // Get all checkboxes in the group that are checked
          // Add them to an array and then save it storage, replacing the old value
          savedValue = [];
          let fieldGroup = document.getElementsByName(field.name);
          for (let field of fieldGroup) {
            if ( field.checked ) {
              savedValue.push(field.value);
            }
          }

        }
        // Non-grouped checkboxes
        else {

          if ( field.checked === true ) {
            savedValue = "1";
          } else {
            savedValue = "0";
          }

        }

      }

      else if ( field.type === 'text' || field.type === 'number' || field.type === 'select-one' || field.type === 'textarea' ) {

        if ( field.dataset.group === 'true' ) {

          if ( field.dataset.type === 'keyvalue' ) {

            savedValue = {};
            let fieldGroup = document.getElementsByName(field.name);
            for (let field of fieldGroup) {
              if ( field.dataset.order === 'key' ) {
                savedValue.key = field.value;
              }
              else {
                savedValue.value = field.value;
              }
            }

          }

        }
        else {

          savedValue = field.value.trim();

        }
      }

      savedValueObject = [];
      savedValueObject.push(
        {
          "action": "replace", "key": field.name, "value": savedValue, "location": saveLocation
        }
      );


      //////////////////
      // Save again if we want an encoded version
      if ( field.dataset.encodePath ) {

        let savedValueEncoded = savedValue;

        // Only convert the original value to an array if its not empty
        if ( savedValueEncoded.length > 0 ) {

            // Convert \ to / if we are on Windows
            if ( /win/gi.test(navigator.platform) ) {
              savedValueEncoded = savedValueEncoded.replace(/\\/gmi,"/");
            }

            // if the value is multiline...
            if ( field.dataset.array === "multiline" ) {
              savedValueEncoded = savedValueEncoded.split("\n");

              savedValueEncoded.forEach(function (line, index) {
                // clean up the path by removing all leading and trailing whitespace and forward slashes
                // then tack on the * wildcard and the file extensions
                line = line.trim().replace(/(^\/+|\/+$)/,"");
                // Decode then encode the values
                savedValueEncoded[index] = encodeURI(decodeURI(line));
              });

            } else {
              // its only a single line.
              // trim white space and \ /'s
              savedValueEncoded = encodeURI(decodeURI(savedValueEncoded.trim().replace(/(^\/+|\/+$)/,"")));
            }

        }

        savedValueObject.push(
          {
            "action": "replace", "key": field.dataset.encodePath, "value": savedValueEncoded, "location": saveLocation
          }
        );
      }


      // Set value to storage
      // TODO: This doesn't report back if the save was unsuccessful.
      saveToStorage(savedValueObject);
      console.log("value(s) saved:", savedValueObject);

      saveSuccessful();

      // TODO:
      // Have the background page message any open previews so that they can save a new copy of
      // the chrome.storage options to it local.storage for faster loading.
    }

  };


  // Listen for clicks on the save button
  // 12/27 - I removed the save button. We're just going to rely on auto-save now.
  // document.getElementById('serialize').addEventListener('click', serializeArray);

  // Detect changes to inputs
  document.addEventListener('change', save, false);

  document.addEventListener('keyup', function(event) {
    if (event.key === "Enter") {
      // console.log(event);
      // console.log(event.target);
      if ( event.target.dataset.confirm === "true" ) {
        if ( event.target.dataset.save === "unique-append" ) {
          saveByAppending(event);
        }
      }
    }
  });

  // CMD/CTRL+S Keyboard shortcut
  window.onkeydown = KeyPress;

  function KeyPress(e) {

    // Get the event keycodes
    var evtobj = window.event? event : e;

    // Save
    if ( (e.ctrlKey || e.metaKey) && evtobj.keyCode == 83 ) {
      e.preventDefault();
      save();
    }

  }


  ///////////////////////
  //
  //   Save Setting(s)
  //
  ///////////////////////

  var saveToStorage = function(data) {

    console.log("saveToStorage", data);

    // Open a connection to the background page
    var bkg = chrome.runtime.getBackgroundPage(function(bkg) {

      for (let item of data) {
        bkg.setItem(item.key, item.value, item.location);
      }

      // if ( action === "replace" ) {
      //   bkg.setItem(key, value, location);
      // }
      // else if ( action === "add" ) {
      //
      // }

      // Now that a new value has been saved to storage,
      // reload the options in the background page so that they're available.
      bkg.getOptions();

    });

  };

  ///////////////////////
  //
  //   Save Notification
  //
  ///////////////////////

  var saveSuccessful = function () {

    var notificationIcon = document.getElementById("saved-notification");

    // Stop any animations currently in progress.
    if ( typeof hideSaveAnim !== 'undefined' ) {
      clearTimeout(hideSaveAnim);
    }

    notificationIcon.classList.remove("hide");
    notificationIcon.classList.remove("pop");
    void notificationIcon.offsetWidth;

    notificationIcon.classList.add("pop");

    hideSaveAnim = setTimeout(function() {
      notificationIcon.classList.remove("pop");
      notificationIcon.classList.add("hide");
    }, 1500);

  };



///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
//
//
//      Import, Export, Restore, Clear
//
//
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////

// Export settings as .json
/////////////////////////////
document.getElementById("export-settings").addEventListener("click", function() {

  // open modal that allows you to select which block of settings you want to export
  exportSettings();

}, false);

var exportSettings = function() {

  chrome.storage.sync.get(function(options) {

    var exportedSettings = {};
    exportedSettings.sync = options;
    console.log(exportedSettings);

    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportedSettings)));
    // TODO: add yyyy-mm-dd to the filename
    element.setAttribute('download', 'korra-settings.json');

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);

  });

};

// Imports settings from .json
/////////////////////////////
document.getElementById("import-settings").addEventListener("click", function() {

});


// drag and drop a .json settings file
/////////////////////////////

// ref: https://www.html5rocks.com/en/tutorials/file/dndfiles/
// ref: https://stackoverflow.com/a/26580724

/* lastTarget is set first on dragenter, then
   compared with during dragleave. */
var dropzone = document.getElementById('dropzone');
var lastTarget = null;

window.addEventListener("dragenter", function(e) {
  lastTarget = e.target; // cache the last target here
  // unhide our dropzone overlay
  dropzone.style.visibility = "";
  dropzone.style.opacity = 1;
});

window.addEventListener("dragleave", function(e) {
  // this is the magic part. when leaving the window,
  // e.target happens to be exactly what we want: what we cached
  // at the start, the dropzone we dragged into.
  // so..if dragleave target matches our cache, we hide the dropzone.
  if (e.target === lastTarget || e.target === document) {
    hideDropzone();
  }
});

// Optional. Show the copy icon when dragging over. Seems to only work for chrome.
dropzone.addEventListener('dragover', function(e) {
  e.stopPropagation();
  e.preventDefault();
  e.dataTransfer.dropEffect = 'copy';
});

// Get file data on drop
dropzone.addEventListener('drop', function(e) {
  e.stopPropagation();
  e.preventDefault();
  hideDropzone();
  var files = e.dataTransfer.files; // Array of all files

  for (var i=0, file; file=files[i]; i++) {

    if (file.type.match(/^application\/json$/)) {

      var reader = new FileReader();

      reader.onload = function(json) {
        importSettings(json.target.result);
      };

      reader.readAsText(file); // start reading the file data.

    }
  }
});


//////////////////////////////
// Hide the dropzone visually
var hideDropzone = function() {
  dropzone.style.visibility = "hidden";
  dropzone.style.opacity = 0;
};


// Use the imported json string and add its values to storage.
//////////////////////////////////////
var importSettings = function(json) {

  var settings = JSON.parse(json);
  console.warn("importing settings from provided json", settings);

  // Settings will come as sync and local. Loop through one and then the other.
  var settingsSync = settings.sync;
  // var settingsLocal = settings.local;

  var bkg = chrome.runtime.getBackgroundPage(function(bkg){

    for (var key in settingsSync) {
    	if (settingsSync.hasOwnProperty(key)) {
    		// console.log(key); // key (ex. sandwich)
    		// console.log(settings[key]); // value (ex. turkey)
        bkg.setItem(key, settingsSync[key]);
    	}
    }
    // place this inside the chrome.runtime. block so that it fires when we're done setting items in storage.
    // if its placed outside, it will run before the async functions are done.
    loadOptions();
    saveSuccessful();
  });

};


/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
//
//   Clear All Settings to Blank
//
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////

function confirmClear() {

  if ( confirm("Are you sure you want clear all settings to blank? This will also clear out custom settings you've entered.") ) {
    chrome.runtime.getBackgroundPage(function (backgroundPage) {
      backgroundPage.setDefaultOptions( { clear: { sync: true, local: true }} );
      loadOptions();
      saveSuccessful();
    });
  }

}
document.getElementById("clear-settings").addEventListener("click", confirmClear, false);

/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
//
//   Restore All Settings to Default
//
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
function confirmRestore() {

  if ( confirm("Are you sure you want restore all settings to the default? This will only affect the settings that have defaults.") ) {
    chrome.runtime.getBackgroundPage(function (backgroundPage) {
      backgroundPage.setDefaultOptions( {set: {sync: true, local: true}} );
      loadOptions();
      saveSuccessful();
    });
  }

}
document.getElementById("restore-settings").addEventListener("click", confirmRestore, false);


// Manifest Version in footer
/////////////////////////////
document.getElementById("manifest-version").innerHTML = chrome.runtime.getManifest().version;
