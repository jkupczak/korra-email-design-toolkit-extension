console.log("mailchimp.js loaded");

//
// Apply check tool to each campaign as it loads in
//
// https://hacks.mozilla.org/2012/05/dom-mutationobserver-reacting-to-dom-changes-without-killing-browser-performance/
//


var campaignListExists = document.querySelector('#campaigns-list');

if ( typeof(campaignListExists) != 'undefined' && campaignListExists != null ) {

    // select the target node to watch
    var target = campaignListExists;

    // create an observer instance
    var observer = new MutationObserver(function(mutations) {

        console.log("observer activated");

        processCampaignList();

        mutations.forEach(function(mutation) {
            console.log(mutation.type);
        });
    });

    // configuration of the observer:
    var config = { attributes: true, childList: true, characterData: true }
    // pass in the target node, as well as the observer options
    observer.observe(target, config);

}

//
// Move Google Tracking input
//
var googleTagDisclose = document.getElementById('google-tag-disclose');

if ( typeof(googleTagDisclose) != 'undefined' && googleTagDisclose != null ) {

  var gaHelp = document.querySelector("#google-tag-disclose .field-help");
  if ( typeof(gaHelp) != 'undefined' && gaHelp != null ) {
    gaHelp.parentNode.removeChild(gaHelp);
  }


  var cpTitleInput = document.getElementById("title");
  cpTitleInput.parentNode.appendChild(googleTagDisclose);
  // document.querySelector('#main > div > div > div > div.lastUnit.size1of2.readable-max-width:first-child').appendChild(googleTagDisclose);
}


/////
// Mirror Text
/////

if ( typeof(cpTitleInput) != 'undefined' && cpTitleInput != null ) {

  cpTitleInput.setAttribute("maxlength", "50");

  var cpWrapper = document.getElementById("google-tag-disclose");
  var gaTitleInput = document.getElementById("analytics-tag");

  var mirrorInput = true;
  // gaTitleInput.classList.add()

  var mirrorBtn = document.createElement("div");
  mirrorBtn.className = "mirror";
  var mirrorBtnText = document.createTextNode("Mirroring Text");
  mirrorBtn.appendChild(mirrorBtnText);
  mirrorBtn.addEventListener("click", mirrorToggle, false);
  cpWrapper.appendChild(mirrorBtn);

  cpTitleInput.onkeyup = function() {
    if ( mirrorInput ) {
      gaTitleInput.value = cpTitleInput.value;
    }
  }

        // Clean Fields Button
        var cleanFieldsEle = document.createElement("div");

        var cleanFieldsEleText = document.createTextNode("Clean Field");
        cleanFieldsEle.appendChild(cleanFieldsEleText);

        cleanFieldsEle.className = "clean-fields chr-btn";
        cleanFieldsEle.addEventListener("click", cleanMcTitleField, false);


        var campaignNameFieldLabel = document.querySelector("div > label[for='title']:first-child") || document.querySelector("div > label[for='title']:nth-child(2)");
        campaignNameFieldLabel.appendChild(cleanFieldsEle);

        function cleanMcTitleField() {
          var campaignNameField = document.querySelector("#title").value.replace(/ \(copy.+/gi, "");
          document.querySelector("#title").value = campaignNameField;
        }

}
function mirrorToggle() {
  mirrorInput = !mirrorInput;
  console.log("toggle: " + mirrorInput);
  mirrorBtn.classList.toggle("off");
  gaTitleInput.classList.toggle("off");
}


//
// Move Subject Line
//
// var subjectLineEntry = document.querySelector('div.lastGroup.size1of1.border-below:nth-child(3)');
//
// if ( typeof(subjectLineEntry) != 'undefined' && subjectLineEntry != null ) {
//
//   var subjectParent = document.querySelector("#main > div > div.lastUnit.size1of1:first-child");
//   var subjectSibling = document.querySelector("#main > div > div.lastUnit.size1of1:first-child > div:first-child");
//
//   subjectParent.insertBefore(subjectLineEntry, subjectSibling);
// }


/////
// Set body class to a found discipline
/////

var mcCampaignName = document.querySelector("#builder-header") || document.querySelector("h1");

if ( mcCampaignName ) {

  mcCampaignName = mcCampaignName.innerText;

  applyMcTheme();

  if ( typeof(cpTitleInput) != 'undefined' && cpTitleInput != null ) {
    cpTitleInput.addEventListener("blur", function( event ) {
      mcCampaignName = event.target.value;

      // Remove classes with a specific prefix
      // http://stackoverflow.com/a/10835425/556079
      var prefix = "discipline";
      var classes = document.body.className.split(" ").filter(function(c) {
          return c.lastIndexOf(prefix, 0) !== 0;
      });
      document.body.className = classes.join(" ").trim();
      //

      applyMcTheme();
    }, true);

  }
}

function applyMcTheme() {
  if ( getDisciplineId(mcCampaignName) ) {
    document.body.classList.add("discipline-ready");
  }
  document.body.classList.add("discipline-" + getDisciplineId(mcCampaignName));
}



// document.documentElement.scrollHeight;

// document.body.onload = addElement;
//
// function addElement () {
//   // create a new div element
//   // and give it some content
//   var newDiv = document.createElement("div");
//   var newContent = document.createTextNode("Hi there and greetings!");
//   newDiv.appendChild(newContent); //add the text node to the newly created div.
//
//   // add the newly created element and its content into the DOM
//   // var currentDiv = document.querySelector("body");
//   // document.body.insertBefore(newDiv, currentDiv);
//   document.getElementsByTagName('body')[0].appendChild(newDiv);
//
//   console.log("success?");
// }


// var mcFilterBtn = document.querySelector(".filter-btn");
//
// if ( mcFilterBtn ) {
//
//   var newFilter = document.createElement("li");
//
//   document.querySelector('.filter-btn').appendChild(newFilter);
//
// } else {
//   console.log("not found");
// }


function processCampaignList() {

  // MailChimp updates #campaigns-list twice on load, the first time it's empty. So we search for a child and then start our script if one exists.
  var campaignCheck = document.querySelector("#campaigns-list > li:first-child")
  if (elExists(campaignCheck)) {



      var totalDraftsOnPage = 0;

      // Iterate through DOM nodes - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of
      let campaignStatusList = document.querySelectorAll("span.freddicon[title='draft']");
      for (let pendingCampaign of campaignStatusList) {

        pendingCampaign.closest("li").classList.add("draft");
        totalDraftsOnPage++

      }

      // Iterate through DOM nodes - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of
      let campaignsList = document.querySelectorAll("#campaigns-list li.selfclear");
      for (let campaign of campaignsList) {

        var campaignName = campaign.querySelector('a[title="Campaign Name" i]').innerText;
        campaign.classList.add("discipline-" + getDisciplineId(campaignName) );
        console.log(getDisciplineId(campaignName) + " - " + campaignName);

      }


      destroyIfExists( document.querySelector(".total-drafts") );

      // if ( elExists(document.querySelector(".total-drafts")) ) {
      //
      //   document.querySelector(".total-drafts-number").innerHTML = totalDraftsOnPage;
      //
      // } else {

        // Create menu item to show total drafts
        var draftsEle = document.createElement("li");
        draftsEle.className = "total-drafts nav-link small-meta fwb hide-mobile";

        var draftTotalWrapper = document.createElement("div");
        draftTotalWrapper.className = "total-drafts-number";
        var draftTotalWrapperText = document.createTextNode(totalDraftsOnPage);
        draftTotalWrapper.appendChild(draftTotalWrapperText);
        draftsEle.appendChild(draftTotalWrapper);

        if (totalDraftsOnPage === 1) {
          var draftPlural = "Draft"
        } else {
          var draftPlural = "Drafts"
        }

        var draftTotalTextWrapper = document.createElement("div");
        var draftTotalTextWrapperText = document.createTextNode(draftPlural);
        draftTotalTextWrapper.appendChild(draftTotalTextWrapperText);
        draftsEle.appendChild(draftTotalTextWrapper);

        var lastMenuItem = document.querySelector("li.nav-link:last-child");
        insertAfter(draftsEle, lastMenuItem);

      // }







  }
}




window.onbeforeunload = function (e) {

  if ( totalDraftsOnPage > 0 ) {
    return 'There are unsent drafts on this page! Are you sure you want to leave?';
  }

};



// alertify.success("Saved to clipboard");


// setTimeout(function() {
//   var p = document.querySelector("div.slats + div.sub-section");
//   var p_prime = p.cloneNode(true);
//   var secondPageNav = document.querySelector(".line.action-bar");
//   insertAfter(p_prime, secondPageNav);
// },1000);
