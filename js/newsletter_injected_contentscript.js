console.log("newsletter_injected_contentScript.js loaded");


// Create Newsletter QA Control Bar Wrapper
var controlBar = document.createElement("div");
controlBar.className = "control-bar";
document.body.appendChild(controlBar);

// Create QA Control
var qaControl = document.createElement("div");
qaControl.className = "qa-control orb";
qaControl.addEventListener("click", qaToggle, false);
controlBar.appendChild(qaControl);

function qaToggle() {
  // console.log("hi!");
  qaControl.classList.toggle('off');
  document.body.classList.toggle('qa-control-off');
}



// Create Newsletter QA Info Bar Wrapper
var infoBar = document.createElement("div");
infoBar.className = "info-bar";
document.body.appendChild(infoBar);

// Create Preheader Module
var preheaderWapper = document.createElement("div");
preheaderWapper.className = "preheader-wrapper";
infoBar.appendChild(preheaderWapper);

var preheader = document.body.textContent;
preheader = preheader.replace(/(\&nbsp\;|\n|\t|\r|\u00a0)/gi, " ")
preheader = preheader.replace(/   +/gi, " ");
preheader = preheader.replace(/(^ +?| +?$)/gi, "");
preheader = preheader.substring(0, 149);

preheader = "<div class='mod mod-preheader'><div class='title'>Preheader</div><div class='mod-body'>" + [preheader.slice(0, 89), "<span class='preheader-back'>", preheader.slice(89)].join('') + "</span></div></div>";

preheaderWapper.innerHTML = preheader;


// Create
