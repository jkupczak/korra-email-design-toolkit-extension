console.warn("[sonic-toolkit-extension] loaded /js/newsletter/zoom.js");
///////////////////////////////////////////////////////////////////////

//////////
/////
///// Zoom Shortcuts
/////
//////////

var dFrameContents = document.getElementById("desktop-view").contentDocument;
var dFrameZoomStatus = document.getElementById("desktop-zoom-status");
var dFrameHTMLEle = dFrameContents.documentElement;
var currentZoomLevel = "1";

var zoomLevels     = ["0.25", "0.33", "0.5", "0.67", "0.75", "0.8", "0.9", "1", "1.1", "1.25", "1.5", "1.75", "2"];
var zoomLevelsText = ["25%", "33%", "50%", "67%", "75%", "80%", "90%", "100%", "110%", "125%", "150%", "175%", "200%"];

// Keypres Capturing
// Capture keypresses when focused on the desktop or mobile iframes and then run a function to deal with them.
// http://keycode.info/
// http://jsfiddle.net/29sVC/
// Consider using https://github.com/madrobby/keymaster
window.onkeydown = KeyPress;

function KeyPress(e) {

  // Get the event keycodes
  var evtobj = window.event? event : e

  // Zoom Detection
  // Watch for Chrome zoom shortcuts, cmd/ctrl plus +/-/0
  // Block their function and then run the zoom() function to handle zooming our way.
  if ( (e.ctrlKey || e.metaKey) && (evtobj.keyCode == 48 || evtobj.keyCode == 187 || evtobj.keyCode == 189) ) {
    e.preventDefault();

    // Zoom-out
    if ( (e.ctrlKey || e.metaKey) && evtobj.keyCode == 189 ) {
      zoom("-");
    }
    // Zoom-in
    if ( (e.ctrlKey || e.metaKey) && evtobj.keyCode == 187 ) {
      zoom("+");
    }
    // Reset Zoom
    if ( (e.ctrlKey || e.metaKey) && evtobj.keyCode == 48 ) {
      zoom("0");
    }
  }

}


////////////////
//
// Zoom Function
//
////////////////

function zoom(direction) {

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
    dFrameHTMLEle.style.zoom   = zoomLevels[zoomLevels.indexOf(currentZoomLevel)+1] // Go UP 1 level in the array.
    dFrameZoomStatus.innerHTML = zoomLevelsText[zoomLevels.indexOf(currentZoomLevel)+1] // Go UP 1 level in the array.
    dFrameZoomStatus.classList.add("show");

    console.log( "Zoom: " + zoomLevelsText[zoomLevels.indexOf(currentZoomLevel)+1] );
  }
  // Reset Zoom
  if ( direction === "0" ) {
    dFrameHTMLEle.style.zoom   = zoomLevels[7] // Go UP 1 level in the array.
    dFrameZoomStatus.innerHTML = zoomLevelsText[7] // Go UP 1 level in the array.
  }
  // Reset Zoom
  if ( dFrameHTMLEle.style.zoom === "1") {
    dFrameZoomStatus.classList.remove("show");
  }
}
