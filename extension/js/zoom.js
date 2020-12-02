// @TODO --- Possibly switch to keybuddy to support iframes.
// --- Remember zoom settings on page refresh

function fitToViewport() {

  if ( dFrameHTMLEle.dataset.fitToViewport === "true" ) {

    console.log("turning off fit to viewport");
    resetZoom();

  }
  else {

    resetZoom();

    dFrameHTMLEle.dataset.fitToViewport = "true";

    let scale = desktopIframe.contentWindow.innerHeight / desktopIframe.contentDocument.documentElement.scrollHeight;

    console.log("fitting to viewport, viewport height is", desktopIframe.contentWindow.innerHeight, ", document height is", desktopIframe.contentDocument.documentElement.scrollHeight, " and we're scaling to", scale);

    dFrameHTMLEle.style.transform = "scale(" + scale + ")";
    dFrameHTMLEle.style.transformOrigin = "top";
    dFrameHTMLEle.style.overflowY = "hidden";
    desktopIframe.contentDocument.documentElement.scrollTop = 0;

  }



}

key('ctrl+9, ⌘+9', function() {
  fitToViewport();
  return false;
});



// Zoom the desktop view only.
var dFrameZoomStatus = document.getElementById("desktop-zoom-status");
var currentZoomLevel = "1";
var zoomLevels     = ["0.25", "0.33", "0.5", "0.67", "0.75", "0.8", "0.9", "1", "1.1", "1.25", "1.5", "1.75", "2"];
var zoomLevelsText = ["Browser Zoom 25%", "Browser Zoom 33%", "Browser Zoom 50%", "Browser Zoom 67%", "Browser Zoom 75%", "Browser Zoom 80%", "Browser Zoom 90%", "Browser Zoom 100%", "Browser Zoom 110%", "Browser Zoom 125%", "Browser Zoom 150%", "Browser Zoom 175%", "Browser Zoom 200%"];

var zoom = function (direction) {

  turnOffFitToViewport();

  // console.log("zoom() function inititated");
  // console.log("zoom(direction): " + direction);
  // console.log("currentZoomLevel: " + currentZoomLevel);

  currentZoomLevel = dFrameHTMLEle.style.zoom || "1";

  // Zoom-out
  if ( direction === "-" && currentZoomLevel !== "0.25" ) {
    dFrameHTMLEle.style.zoom   = zoomLevels[zoomLevels.indexOf(currentZoomLevel)-1]; // Go DOWN 1 level in the array.
    dFrameZoomStatus.innerHTML = zoomLevelsText[zoomLevels.indexOf(currentZoomLevel)-1]; // Go DOWN 1 level in the array.
    dFrameZoomStatus.classList.add("show");

    console.log( "Zoom: " + zoomLevelsText[zoomLevels.indexOf(currentZoomLevel)-1] );
  }
  // Zoom-in
  if ( direction === "+" && currentZoomLevel !== "2" ) {
    dFrameHTMLEle.style.zoom   = zoomLevels[zoomLevels.indexOf(currentZoomLevel)+1]; // Go UP 1 level in the array.
    dFrameZoomStatus.innerHTML = zoomLevelsText[zoomLevels.indexOf(currentZoomLevel)+1]; // Go UP 1 level in the array.
    dFrameZoomStatus.classList.add("show");

    console.log( "Zoom: " + zoomLevelsText[zoomLevels.indexOf(currentZoomLevel)+1] );
  }
  // Reset Zoom
  if ( direction === "0" ) {
    resetZoom();
    // dFrameHTMLEle.style.zoom   = zoomLevels[7];
    // dFrameZoomStatus.innerHTML = zoomLevelsText[7];
  }
  // Reset Zoom
  if ( dFrameHTMLEle.style.zoom === "1") {
    dFrameZoomStatus.classList.remove("show");
  }
};

function resetZoom() {
  console.log("reseting zoom level");
  dFrameHTMLEle.style.zoom = "";
  dFrameZoomStatus.innerHTML = zoomLevelsText[7];
  dFrameHTMLEle.style.transform = "";
  dFrameHTMLEle.style.overflowY = "scroll";
  dFrameHTMLEle.dataset.fitToViewport = "false";
}

function turnoffBrowserZoom() {
  dFrameHTMLEle.style.zoom = "";
  dFrameHTMLEle.dataset.browserZoom = "false";
}

function turnOffFitToViewport() {
  dFrameHTMLEle.style.transform = "";
  dFrameHTMLEle.style.overflowY = "scroll";
  dFrameHTMLEle.dataset.fitToViewport = "false";
}

// Zoom the desktop view only.
key('ctrl+-, ⌘+-', function() {
  zoom("-");
  return false;
});
key('ctrl+=, ⌘+=', function() {
  zoom("+");
  return false;
});
key('ctrl+0, ⌘+0', function() {
  zoom("0");
  return false;
});
