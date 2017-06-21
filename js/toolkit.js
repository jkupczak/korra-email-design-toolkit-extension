
// Create toolkit button

var toolkit = document.createElement("div");
    toolkit.innerHTML = "+";
    toolkit.id = "jk-toolkit";
    toolkit.className = "jk-toolkit";
    toolkit.style = "font-weight:bold; cursor:pointer; font-size:26px; position:fixed; bottom:0; left:0; width:30px; height:30px; background:rgb(67, 147, 240); color:#fff; line-height:30px; text-align:center; z-index:9999;"
    toolkit.addEventListener("click", unfollow, false);

document.body.appendChild(toolkit);


////


function unfollow() {

var elementsToMatch = ".following button.follow-button";

let elements = document.querySelectorAll(elementsToMatch);
for (let el of elements) {
  el.click();
}

}
