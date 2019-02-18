console.warn("localhost.js loaded");

var foo = "bar";
console.log( document.body);
document.body.style = "overflow:hidden;";

console.log("begin function");
// setTimeout(function(){

    document.body.style = "overflow:hidden;";

    var container = document.createElement("div");
    container.style = "background:#1d1d25; width:100vw; height:100vh; position:absolute; top:0; left:0; margin:auto; z-index:9999999";

    var korra = document.createElement("iframe");
    korra.src = chrome.extension.getURL("preview.html") + "?file=" + document.URL;
    korra.style = "width:100vw; height:100vh; border:0;";

    container.appendChild(korra);
    document.body.appendChild(container);

// }, 5000);
console.log("end function");

console.warn("end of localhost.js");
