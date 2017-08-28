console.warn("[sonic-toolkit-extension] loaded /js/newsletter/allFrames.js");
////////////////////////////////////////////////////////////////////////////

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
  // Block their function and then report to the parent window which zoom level we intended to intitiate
  if ( (e.ctrlKey || e.metaKey) && (evtobj.keyCode == 48 || evtobj.keyCode == 187 || evtobj.keyCode == 189) ) {
    e.preventDefault();

    // Zoom-out
    if ( (e.ctrlKey || e.metaKey) && evtobj.keyCode == 189 ) {
      parent.zoom("-");
    }
    // Zoom-in
    else if ( (e.ctrlKey || e.metaKey) && evtobj.keyCode == 187 ) {
      parent.zoom("+");
    }
    // Reset Zoom
    else if ( (e.ctrlKey || e.metaKey) && evtobj.keyCode == 48 ) {
      parent.zoom("0");
    }
  }


}




// window.onkeydown = parent.weird();


//
// function KeyPress(e) {
//
//   // console.log("begin function");
//   // console.log(evtobj.keyCode);
//
//   var evtobj = window.event? event : e
//
//   if ( (e.ctrlKey || e.metaKey) && (evtobj.keyCode == 187 || evtobj.keyCode == 189) ) {
//     setTimeout(function(){ checkZoomLevel(); }, 100);
//   }
//
// }
//
// window.onkeydown = KeyPress;
//
//
// function checkZoomLevel() {
//
//   var screenCssPixelRatio = (window.outerWidth - 8) / window.innerWidth;
//   var zoomLevel;
//   if (screenCssPixelRatio <= .34) {
//     zoomLevel = "-6+";
//   } else if (screenCssPixelRatio <= .44) {
//     zoomLevel = "-5";
//   } else if (screenCssPixelRatio <= .54) {
//     zoomLevel = "-4";
//   } else if (screenCssPixelRatio <= .64) {
//     zoomLevel = "-3";
//   } else if (screenCssPixelRatio <= .76) {
//     zoomLevel = "-2";
//   } else if (screenCssPixelRatio <= .92) {
//     zoomLevel = "-1";
//   } else if (screenCssPixelRatio <= 1.05 && screenCssPixelRatio >= .98) {
//     zoomLevel = "0";
//   } else if (screenCssPixelRatio <= 1.10) {
//     zoomLevel = "1";
//   } else if (screenCssPixelRatio <= 1.32) {
//     zoomLevel = "2";
//   } else if (screenCssPixelRatio <= 1.58) {
//     zoomLevel = "3";
//   } else if (screenCssPixelRatio <= 1.90) {
//     zoomLevel = "4";
//   } else if (screenCssPixelRatio <= 2.28) {
//     zoomLevel = "5";
//   } else if (screenCssPixelRatio >= 2.29) {
//     zoomLevel = "6+";
//   } else {
//     zoomLevel = "unknown";
//   }
//
//   console.log("Zoom Level: " + zoomLevel + " (" + screenCssPixelRatio + ")");
//
// }
