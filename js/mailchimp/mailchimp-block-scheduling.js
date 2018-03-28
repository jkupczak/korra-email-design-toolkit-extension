console.warn(" 💎💎💎 [korra-email-design-tooklit] loaded /js/mailchimp/mailchimp-block-scheduling.js");
/////////////////////////////////////////////////////////////////////////////////////////////

//
// Disable Schedule Buttons
//
///////////////
///////////////
///////////////

let deliveryBtns = document.querySelectorAll("#delivery-options a[role='button']");

console.log(deliveryBtns);

for (let deliveryBtn of deliveryBtns) {
  deliveryBtn.style = "opacity:0.25; pointer-events:none;";
}

//
//
// Article Check Module
//
///////////////
///////////////
///////////////

function confirmBlog() {
  if ( confirm('Are you sure you want to activate the Schedule and Send actions?') ) {

    for (let deliveryBtn of deliveryBtns) {
      deliveryBtn.style = "";
    }

    confirmBlogBtn.innerText = "Congratulations! Get to scheduling!"
    confirmBlogBtn.disabled = true;

  } else {

  }

}

var checkListItem = document.createElement("li");
checkListItem.className = "blog-verification";
var mediaDiv = document.createElement("div");
    mediaDiv.className = "media";

    checkListItem.appendChild(mediaDiv);

var checkListHTML = "<div class='media'><div class='sonic-embed fancy-loader'><svg height='80' width='210'><ellipse cx='25' cy='20' fill='none' rx='10' ry='10'></ellipse></svg><svg height='80' width='210'><ellipse cx='25' cy='20' fill='none' rx='10' ry='10'></ellipse></svg><svg height='80' width='210'><ellipse cx='25' cy='20' fill='none' rx='10' ry='10'></ellipse></svg><svg height='80' width='210'><ellipse cx='25' cy='20' fill='none' rx='10' ry='10'></ellipse></svg><svg height='80' width='210'><ellipse cx='25' cy='20' fill='none' rx='10' ry='10'></ellipse></svg><svg height='80' width='210'><ellipse cx='25' cy='20' fill='none' rx='10' ry='10'></ellipse></svg><svg height='80' width='210'><ellipse cx='25' cy='20' fill='none' rx='10' ry='10'></ellipse></svg><svg height='80' width='210'><ellipse cx='25' cy='20' fill='none' rx='10' ry='10'></ellipse></svg><svg height='80' width='210'><ellipse cx='25' cy='20' fill='none' rx='10' ry='10'></ellipse></svg><svg height='80' width='210'><ellipse cx='25' cy='20' fill='none' rx='10' ry='10'></ellipse></svg></div><div style='text-align:center;'>Checking for unpublished blog articles that have been linked in this campaign...</div>"

mediaDiv.innerHTML = checkListHTML;

var confirmBlogBtn = document.createElement("button");
confirmBlogBtn.onclick = confirmBlog;
confirmBlogBtn.innerText = "I confirm that all of the articles linked in this newsletter are published.";
mediaDiv.appendChild(confirmBlogBtn);

// Add it all to the page.
var checkListContainer = document.getElementById("predelivery-checklist") || document.querySelector(".predelivery-checklist");
checkListContainer.prepend(checkListItem);
