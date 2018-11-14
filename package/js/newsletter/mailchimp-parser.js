// MailChimp Conditions Parser
// Conditional parsing is off by default
if ( getParameterByName("conditions") === "1" ) {
  var conditionsParser = true;
} else {
  var conditionsParser = false;
}

function processMcConditionals(document) {

  console.groupCollapsed("Conditionals Parser");

  var cleanedDesktopHtml = document;

  //////////////////////////////////////////////
  //////////////////////////////////////////////
  //////////////////////////////////////////////
  //////////////////////////////////////////////
  //////////////////////////////////////////////
  ////                                     /////
  ////                                     /////
  ////    MAILCHIMP CONDITIONALS PARSER    /////
  ////                                     /////
  ////                                     /////
  //////////////////////////////////////////////
  //////////////////////////////////////////////
  //////////////////////////////////////////////
  //////////////////////////////////////////////

  // Conditionals Reference
  // http://kb.mailchimp.com/merge-tags/use-conditional-merge-tag-blocks

  // Only parse the conditionals if we see that they are in the plain text HTML
  // if ( conditionsParser && cleanedDesktopHtml.match(/\*\|IF:/gi) && cleanedDesktopHtml.match(/\*\|END:IF\|\*/gi)  ) {


  // Remove all linebreaks/newlines from HTML plain text so that we can REGEX more easily.
  cleanedDesktopHtml = cleanedDesktopHtml.trim();
  cleanedDesktopHtml = cleanedDesktopHtml.replace(/(\r\n|\n|\r)/gm,"");

  // Count the total ifs so that we can mark our <condition> tag.
  var totalConditions = 0;

  ////////////////////
  ////////////////////
  ////     IF    /////
  ////////////////////
  ////////////////////
  matchIfs();
  function matchIfs() {

    totalConditions++;

    var ifMatch = cleanedDesktopHtml.match(/\*\|IF:.+?\|\*.+?\*\|/i);
    // ifMatch = ifMatch[0].replace(/\*\|$/, "");
    // console.log(ifMatch);
    // var ifMatch = ifMatch[0].replace(/p=/gi,"");

    // cleanedDesktopHtml = cleanedDesktopHtml.replace(ifMatch, "<if>" + ifMatch[0] + "</if>" );

    var conditionType = getConditionText(ifMatch[0]);
    console.log(conditionType);

    var modifiedMatch = ifMatch[0].replace(/\*\|$/, "");
    var ifData = ifMatch[0].match(/^\*\|.+?\|\*/);

    var fullIfStatement = ifData[0].replace(/\*/g, "&midast;");
    console.log(fullIfStatement);

    // console.log(ifData[0]);
    modifiedMatch = modifiedMatch.replace(ifData[0], "");

    ifData = ifData[0].replace(/\*\|IF:/gi, "");
    ifData = ifData.replace(/\|\*/gi, "");

    var ifTag = "<if data-step='if' data-type='merge' data-conditions='" + conditionType + "'><condition-text>" + fullIfStatement + "</condition-text>";

    console.log(fullIfStatement);

    cleanedDesktopHtml = cleanedDesktopHtml.replace(ifMatch[0], "<condition data-step='condition' data-condition-count='" + totalConditions + "'>" + ifTag + modifiedMatch + "</if>*|");

    if ( cleanedDesktopHtml.match(/\*\|IF:.+?\|\*.+?\*\|/i) ) {
      // console.log("true");
      matchIfs();
    } else {
      // console.log("false");
    }
  }


  ////////////////////
  ////////////////////
  ///   END IF   /////
  ////////////////////
  ////////////////////
  // Close <condition> tags
  cleanedDesktopHtml = cleanedDesktopHtml.replace(/\*\|END:IF\|\*/gi, "<condition-text>&midast;|END:IF|&midast;</condition-text></condition>");


  ////////////////////
  ////////////////////
  ////  ELSE IF  /////
  ////////////////////
  ////////////////////
  matchElseIfs();
  function matchElseIfs() {

    // Look for instances of *|ELSEIF in the string.
    var ifMatch = cleanedDesktopHtml.match(/\*\|ELSEIF:.+?\|\*.+?(<\/condition>|\*\|ELSE)/i);

    // elseifs aren't required in a condition. If the .match above did not find any, skip this section
    if ( ifMatch !== null ) {

        var conditionType = getConditionText(ifMatch[0]);

        if ( ifMatch[0].endsWith("</condition>") ) {

          var modifiedMatch = ifMatch[0].replace(/^\*\|ELSEIF:/, "");

          var elseifTag = "<elseif data-step='elseif' data-conditions='" + conditionType + "'>";

          var cleanedMatch = modifiedMatch.replace(/.+\|\*/, "");

          cleanedDesktopHtml = cleanedDesktopHtml.replace(ifMatch[0], elseifTag + cleanedMatch + "</elseif>");

        } else {

          var modifiedMatch = ifMatch[0].replace(/^\*\|ELSEIF:/, "");

          var elseifTag = "<elseif data-step='elseif' data-conditions='" + conditionType + "'>";

          var cleanedMatch = modifiedMatch.replace(/.+\|\*/, "");
              cleanedMatch = cleanedMatch.replace(/\*\|ELSE/, "");

          cleanedDesktopHtml = cleanedDesktopHtml.replace(ifMatch[0], elseifTag + cleanedMatch + "</elseif>*|ELSE");

        }

        if ( cleanedDesktopHtml.match(/\*\|ELSEIF:.+?\|\*.+?(<\/condition>|\*\|ELSE)/i) ) {
          matchElseIfs();
        }

    }
  }

  ////////////////////
  ////////////////////
  ////    ELSE   /////
  ////////////////////
  ////////////////////
              // matchElse();
              // function matchElse() {
              //   var ifMatch = cleanedDesktopHtml.match(/\*\|ELSE:\|\*.+?<\/condition>/i);
              //
              //   var modifiedMatch = ifMatch[0].replace(/^\*\|ELSE:\|\*/, "");
              //
              //   var cleanedMatch = modifiedMatch.replace(/<\/condition>/, "");
              //
              //   cleanedDesktopHtml = cleanedDesktopHtml.replace(ifMatch[0], "<else data-step='else'>" + cleanedMatch + "</else></condition>");
              //
              //
              //   if ( cleanedDesktopHtml.match(/\*\|ELSE:\|\*.+?<\/condition>/i) ) {
              //     matchElse();
              //   }
              // }

  /////////////////
  /////////////////
  /////////////////
  function getConditionText(string) {

    var conditionText = string.replace(/^\*\|.+?:/, "");
        conditionText = conditionText.replace(/\|\*.+/, "");

    return conditionText;
  }

  // console.log(cleanedDesktopHtml);

  console.groupEnd();

  return cleanedDesktopHtml;
}


//////////////////////
//////////////////////
function createConditionalsUI() {

  // console.log("begin creating conditionals ui");

  // Conditionals Pane - Main Wrapper
  var conPane = document.createElement("div");
  conPane.id = "conditionals-pane";
  conPane.classList.add("pane", "conditionals-pane");
  panes.appendChild(conPane);

  // Button to go back
  var hideConditionalsPaneBtn = document.createElement("div");
  hideConditionalsPaneBtn.addEventListener("click", toggleConditionalsPane, false);
  hideConditionalsPaneBtn.innerText = "Go Back";
  hideConditionalsPaneBtn.className = "close-conditionals";
  conPane.appendChild(hideConditionalsPaneBtn);

  // Toggle <conditional-text>
  var toggleConditionalTextBtn = document.createElement("div");
  toggleConditionalTextBtn.addEventListener("click", toggleAllConditionalTextFunc, false);
  toggleConditionalTextBtn.innerText = "Toggle Conditional Text";
  toggleConditionalTextBtn.className = "toggle-all-conditonal-text-btn";
  conPane.appendChild(toggleConditionalTextBtn);


  // Loop through all conditions
  var conditionCounter = 1;

  let conditions = dFrameContents.querySelectorAll("condition");

  for (let condition of conditions) {

    var conditionWrapper = document.createElement("div");
    conditionWrapper.classList.add("condition");
    conditionWrapper.dataset.condition = conditionCounter;

    conPane.appendChild(conditionWrapper);


    // Simple label for UX purposes
    var conditionLabel = document.createElement("div");
    conditionLabel.className = "condition-label";
    conditionWrapper.appendChild(conditionLabel);

    // The condition text
    var conditionText = document.createElement("div");
    conditionText.innerText = condition.querySelectorAll("if")[0].dataset.conditions;
    conditionText.className = "condition-text";
    conditionWrapper.appendChild(conditionText);

    // Eye icon to toggle conditions
    var toggleCondition = document.createElement("div");
    toggleCondition.className = "toggle-condition";
    toggleCondition.addEventListener("click", toggleThisCondition, false);
    toggleCondition.innerHTML = svgIconEye;
    conditionWrapper.appendChild(toggleCondition);

    conditionCounter++;

  }

  // Conditionals Button to active pane
  var showConditionalsPane = document.createElement("a");
  showConditionalsPane.id = "show-conditionals-btn";
  showConditionalsPane.classList.add("main-pane-extra-btn", "toggle-conditionals-btn");
  showConditionalsPane.innerHTML = "Toggle Conditionals";
  showConditionalsPane.addEventListener("click", toggleConditionalsPane, false);

  stagePreviewBtns.insertAdjacentElement('afterend', showConditionalsPane);


}

function toggleThisCondition() {
  console.log(event);
  console.log(event.target);
  console.log(this);

  var condition = this.closest(".condition");
  condition.classList.toggle("off");

  console.log(condition);

  var conditionNumber = this.closest(".condition").dataset.condition;

  var conditionInIframe = dFrameContents.querySelectorAll("[data-condition-count='" + conditionNumber + "']")[0];
  console.log(conditionInIframe);

  if ( condition.classList.contains("off") ) {
    console.log("a");
    conditionInIframe.style.display = "none";
  } else {
    console.log("b");
    conditionInIframe.style.display = "block";
  }

}


function toggleConditionalsPane() {

  var conPane = document.getElementById("conditionals-pane");
  conPane.style.zIndex = conPane.style.zIndex === '10' ? '' : '10';

}



function toggleAllConditionalTextFunc() {

  this.classList.toggle("off");

  let conditionTexts = dFrameContents.querySelectorAll("condition-text");

  for (let conditionText of conditionTexts) {
    if ( this.classList.contains("off") ) {
      conditionText.style.display = "none";
    } else {
      conditionText.style.display = "";
    }
  }

}
