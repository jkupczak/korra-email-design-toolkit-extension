// alert("hi");

// console.log("begin");
//

var go = document.createElement("div");

go.style.backgroundColor = "#000000";
go.style.color = "#ffffff";
go.style.position = "absolute";
go.style.top = "0";
go.style.left = "0";
go.style.padding = "20px";


var goText = document.createTextNode("Go");
go.appendChild(goText);

go.addEventListener("click", runScript, false);
document.body.appendChild(go);


function runScript() {

  let linkList = document.querySelectorAll("h5 > a");

  for (let link of linkList) {

    console.log(link);
    window.open(link.href);

  }

}
