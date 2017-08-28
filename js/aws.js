console.warn("[sonic-toolkit-extension] loaded /js/aws.js");
////////////////////////////////////////////////////////////
//
// var moreBtn = document.querySelector(".action-strip > action-dropdown");
// var dupedMoreBtn = moreBtn.cloneNode(true);



// Listen for the table rows to appear
document.arrive(".action-strip", function() {

  console.log(".action-strip arrived");
  createMPbutton();

});

// Listen for the table rows to appear
document.arrive("button + div.awsui-button-dropdown", function() {

  console.log("dropdown button menu arrived");

});




function createMPbutton() {

  console.log(makePublicWrapper);

  if ( makePublicWrapper ) {
    console.log("button exists");
  } else {
    console.log("button doesn't exist");
    var makePublicWrapper = document.createElement("awsui-button");
    makePublicWrapper.className = "bucket-action-strip-button action-button-spacing";
    makePublicWrapper.addEventListener("click", makePublic, false);

    var makePublicBtn = document.createElement("button");
    makePublicBtn.className = "awsui-button awsui-button-size-normal awsui-button-variant-primary awsui-hover-child-icons";
    makePublicBtn.innerHTML = "<span>Make Public</span>";

    makePublicWrapper.appendChild(makePublicBtn);
    //
    var uploadBtn = document.querySelector("[text='Upload']");
    //
    // insertAfter(makePublicWrapper, uploadBtn);
    document.querySelector(".action-strip").appendChild(makePublicWrapper);
  }

}


document.arrive("tbody[ng-hide] > tr:first-child", function() {

  // Auto click the sort field for "data modified" on page load
  document.querySelectorAll(".columbia-table th:nth-child(3)")[0].click();

  console.log("arrived!");

  // Loop through all image links
  let imgLinks = document.querySelectorAll("tr[ng-repeat*='obj'] td.truncate a.list-view-item-name");
  for (let imgLink of imgLinks) {

    imgLink.closest("td.truncate").style = "display:flex; align-items:center; height:auto;";

    // Only process imgLinks that haven't had our special class applied to them yet.
    if ( !imgLink.classList.contains("powered-up") ) {

      var currUrl = document.URL.replace(/^.+?\/s3\/buckets\//i,"");
          currUrl = currUrl.replace(/\?.+/i,"");

      var imgUrl = "https://s3.amazonaws.com/" + currUrl + imgLink.textContent.trim();

      // var copyIcon = document.createElement("span");
      // copyIcon.className = "icomoon icomoon-copy";
      // createCopyBtn(copyIcon, imgUrl);
      //
      // insertBefore(copyIcon, imgLink);

      var inlineImgWrapper = document.createElement("div");
      inlineImgWrapper.style = "display:inline-flex; justify-content:center; align-items:center; align-content:center; margin-left:10px; margin-right:5px; min-width:120px; width:120px; max-width:120px; min-height:80px; height:80px; max-height:80px; background:#f5f7f7; overflow:hidden;";

      var inlineImg = document.createElement("img");
      inlineImg.src = imgUrl;
      createCopyBtn(inlineImg, imgUrl);
      inlineImg.style = "width:auto; height:80px; max-height:80px;";

      inlineImgWrapper.appendChild(inlineImg);
      insertBefore(inlineImgWrapper, imgLink);

      // Apply a class to the imgLink to show we've processed it.
      imgLink.classList.add("powered-up");
    }

  }

});



//

function makePublic() {

console.log("!");

// Dropdown button
var dropdownBtn = document.querySelector(".action-strip action-dropdown awsui-button-dropdown");
console.log(dropdownBtn);

dropdownBtn.onmouseup();

// document.getElementById("nav-shortcutMenu").click();

for (const a of document.querySelectorAll("a")) {
  // console.log(a.textContent);
  if (a.textContent.includes("Make public")) {
    console.log(a.textContent);
  }
}

}
