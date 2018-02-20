console.warn("[sonic-toolkit-extension] loaded /js/newsletter/newsletter-functions.js");
////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
/////
/////
/////    Global Variables
/////
/////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////


// Used to determine if the resizable dFrame is currently being resized.
let resizeActive = false;


///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
/////
/////
/////    KeyPress Capture
/////
/////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////


// Watch for keypresses and react accordingly.
// Load in ASAP so that we can catch everything as the page is loading.
window.onkeydown = KeyPress;

function KeyPress(e) {

  // Get the event keycodes
  var evtobj = window.event? event : e

  // Zoom Detection
  // Watch for Chrome zoom shortcuts, cmd/ctrl plus +/-/0
  // Block their function and let zoom.js handle the rest.
  if ( (e.ctrlKey || e.metaKey) && (evtobj.keyCode == 48 || evtobj.keyCode == 187 || evtobj.keyCode == 189) ) {
    e.preventDefault();
    checkZoomLevel();
  }
}



///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
/////
/////
/////    Pinning and unpinning link markers
/////
/////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////


function pinLinkMarker(e) {
  // http://stackoverflow.com/a/8454104/556079
  this.classList.toggle("pinned");
  this.nextSibling.style.display = this.nextSibling.style.display === 'block' ? '' : 'block';
}

function unpinLinkMarker(e) {

  var linkNum = this.dataset.number;

  dFrameContents.querySelectorAll("#link-marker-" + linkNum)[0].classList.toggle("pinned");

  // http://stackoverflow.com/a/6042235/556079
  var flag = 0;

  this.addEventListener("mousemove", function(){
    flag = 1;
  }, false);

  this.addEventListener("mouseup", function(){
    if(flag === 0){
      this.style.display = "";
    }
  }, false);
}


///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
/////
/////
/////    Change mobile viewport width
/////
/////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////

// Future Upgrade:
// https://stackoverflow.com/a/39312522/556079

function changeMobileSize(width) {

  if ( typeof width === 'string' || width instanceof String ) {
    console.error(width);
    var widthToSet = width + "px";
    console.log("if");

    document.querySelector(".mobile-iframe-settings .active").classList.remove("active");
    document.querySelector(".mobile-iframe-settings [data-mobile-width='"+ width + "']").classList.add("active");

  } else {

    if (typeof(event) !== "undefined") {
      if (event.target.dataset.mobileWidth !== undefined) {
        var clickedSize = event.target;
        var selectedSize = event.target.dataset.mobileWidth;

        if ( selectedSize !== "320" ) {
          history.replaceState(null,null, updateQueryString("mobilewidth", selectedSize) );
        } else {
          history.replaceState(null,null, updateQueryString("mobilewidth", null) );
        }

        document.querySelector(".mobile-iframe-settings .active").classList.remove("active");
        clickedSize.classList.add("active");
      }
    }

  }
  if ( mobileDeviceWrapper.offsetWidth !== parseInt(selectedSize) ) {
    // console.log("resizing mobile container", mobileDeviceWrapper.offsetWidth, parseInt(selectedSize));
    mobileDeviceWrapper.style.width = selectedSize + "px";
    showdFrameWidthStatus();
    if ( resizeActive ) {
      resetDesktopResize();
    }
  }

}




///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
/////
/////
/////    Search all relevant links for commonalities.
/////    Return the most common matching substring and use it to warn/error links in the main validation loop.
/////
/////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////

function mostCommonString(searchTerm, linkList) {

  if ( !/utm_/.test(searchTerm) ) {
    var searchTerm = new RegExp(/\.com\/.+?\?/i);
  } else {
    var searchTerm = new RegExp(escapeRegExp(searchTerm) + ".+?(&|$)","i");
  }

  ///////////
  // STEP 1 - Add all of the tracking url strings to an array while we're looping through each link.
  ///////////
  var matchingNames = [];

  for (var i = 0, len = linkList.length; i < len; i++) {
    var matchingName = linkList[i].match(searchTerm);
    if ( matchingName ) {
      if ( /utm_/gi.test(searchTerm) ) {
        matchingName = matchingName[0].replace(/&$/gi,"");
      } else {
        matchingName = matchingName[0].replace(/(\.com\/|\/?\?)/gi,"");
      }

      matchingNames.push(matchingName);
    }
  }

  ///////////
  // STEP 2 - Finish determining which tracking URL is the most common and apply it to a variable.
  // Code Source: https://stackoverflow.com/a/32799486/556079
  ///////////
  var distribution = {},
      max = 0,
      result = [];

  matchingNames.forEach(function (a) {
      distribution[a] = (distribution[a] || 0) + 1;
      if (distribution[a] > max) {
          max = distribution[a];
          result = [a];
          return;
      }
      if (distribution[a] === max) {
          result.push(a);
      }
  });

  // Create a regex with the most common url + the optional ending / and the mandatory ?
  // console.error(result[0]);
  return result[0];

}
