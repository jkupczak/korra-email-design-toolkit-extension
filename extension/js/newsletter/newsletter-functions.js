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



///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//////////////////////////// == xxxxxxxxxxxxxxxx == ///////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
/////
/////
/////    Observe Resizing
/////
/////    https://developers.google.com/web/updates/2016/10/resizeobserver
/////
/////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////


// Observe one or multiple elements
// https://developers.google.com/web/updates/2016/10/resizeobserver

var ro = new ResizeObserver( entries => {

  showdFrameWidthStatus(desktopIframe.offsetWidth, false, "resizeObserver");

});



///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
/////
/////
/////    Breakdown a Querystring
/////
/////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
function breakdownQuerystring(url, linkObj) {

  // We'll create an object with keys and values
  var qsObject = {};

  // Grab the querystring using the .search property.
  // Pulling it from the search property excludes ending # hashes for us
  // Remove leading '?'s and trailing /'s.'
  var querystring = linkObj.search.replace(/(^\?+?|\/+?$)/gi,"");

  // Using Map to iterate through the remaining Querystring
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
  querystring.split("&").map(function(qs) {

    var key = qs.split("=")[0];
    var val = qs.split("=")[1];

    qsObject[key] = val;

  });

  // Check for querystrings after the hash. This is specifically for MedBridge.
  var querystringAfterHash = linkObj.hash.replace(/^#+?/i,"");

  if ( /\?.+?=/.test(querystringAfterHash) ) {

    // Remove all characters from the beginning of the string up until we get to the first ?
    querystringAfterHash = querystringAfterHash.replace(/^(\?|[^?]+\?)/gi,"");

    querystringAfterHash.split("&").map(function(qs) {

      var key = qs.split("=")[0];
      var val = qs.split("=")[1];

      qsObject[key] = val;

    });
  }

  return qsObject;

}

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

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
function KeyPress(e) {

  // Get the event keycodes
  var evtobj = window.event? event : e;

  // Zoom Detection
  // Watch for Chrome zoom shortcuts, cmd/ctrl plus +/-/0
  // Block their function and let shortcuts.js handle the rest.
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
/////    Spellcheck
/////
/////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////

// var activateSpellcheck = function(frame) {
//
//   console.log("activating spellcheck");
//   frame.designMode = 'on';
//   frame.body.focus();
//   setTimeout(function(){
//     frame.designMode = 'off';
//   }, 500);
//
// };

///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
/////
/////
/////    Design Mode Toggle
/////
/////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////

var toggleDesignMode = function(frame) {

  if ( frame.designMode === "off" ) {
    frame.designMode = "on"
  }
  else {
    frame.designMode = "off"
  }

};

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
// TODO https://stackoverflow.com/a/39312522/556079

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
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

        // @TODO
        // Save the currently set mobilewidth to session (?) storage so that it persists after a page refresh

        document.querySelector(".mobile-iframe-settings .active").classList.remove("active");
        clickedSize.classList.add("active");
      }
    }

  }
  if ( mobileDeviceWrapper.offsetWidth !== parseInt(selectedSize) ) {
    // console.log("resizing mobile container", mobileDeviceWrapper.offsetWidth, parseInt(selectedSize));
    mobileDeviceWrapper.style.width = selectedSize + "px";

    if ( resizeActive ) {
      resetDesktopResize();
    } else {
      showdFrameWidthStatus(desktopIframe.offsetWidth, false, "changeMobileSize");
    }

  }

}




///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
/////
/////
/////    Allow multiple onload events for desktopIframe
/////
/////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////

// https://www.htmlgoodies.com/beyond/javascript/article.php/3724571/Using-Multiple-JavaScript-Onload-Functions.htm

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
function addLoadEvent(window, func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      if (oldonload) {
        oldonload();
      }
      func();
    };
  }
}

///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
/////
/////
/////   Check if Element is in Viewport /
/////   Check if Element is Visibility
/////
/////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */

// https://stackoverflow.com/a/7557433/556079
function isElementInViewport (el) {

    var rect = el.getBoundingClientRect();

    return rect.bottom > 0 &&
        rect.right > 0 &&
        rect.left < (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */ &&
        rect.top < (window.innerHeight || document.documentElement.clientHeight) /* or $(window).height() */;
}

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */

// A modification of isElementInViewport(el) from => https://stackoverflow.com/a/7557433/556079
function isElementVisible (el) {

    var rect = el.getBoundingClientRect();

    return (
        rect.top === 0 &&
        rect.left === 0 &&
        rect.x === 0 &&
        rect.y === 0
    );
}



///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
/////
/////
/////    Create image info array
/////
/////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////



///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
/////
/////
/////    Create image info array
/////
/////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////

//
// // W3C Validator
  // // https://github.com/validator/validator/wiki/Service-%C2%BB-HTTP-interface

// var formData = new FormData();
// formData.append('out', 'json');
// formData.append('content', cleanedOriginalHtml);
//
// var xhr = new XMLHttpRequest();
// xhr.withCredentials = true;
//
// xhr.addEventListener("readystatechange", function () {
//   if (this.readyState === 4) {
//     console.log(this.responseText);
//   }
// });
//
// xhr.open("POST", "http://html5.validator.nu/");
//
// xhr.setRequestHeader("dataType", "json");
// xhr.setRequestHeader("processData", false);
// xhr.setRequestHeader("contentType", false);
//
// xhr.send(formData);


///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
/////
/////
/////    Create image info array
/////
/////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
function createImgInfoArray(imgList) {


  // Create object to hold all of our image data
  imgInfoArray = [];

  // Add all <img> images to array
  for (let img of imgList) {

    var singleImgInfoArray = {};

    singleImgInfoArray.object = img; //img object
    singleImgInfoArray.url = img.src; //img url
    singleImgInfoArray.presentation = "img"; //kind (img)

    imgInfoArray.push(singleImgInfoArray);
  }


  ///////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////
  ////
  ////    IMG CHECK - UNFINISHED
  ////
  ///////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////

  ////
  //////
  // Iterate through ALL IMAGES - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of

  // I can only use .onload once per document. So instead we use an eventlistner.
  // After we're done, we need to remove the eventlistner.
  // Resource: https://stackoverflow.com/a/27032611/556079


  if ( navigator.onLine ) {

    var totalBrokenImages = 0;
    var totalStretchedImages = 0;

    desktopIframe.addEventListener("load", function checkImages(e) {

      var i = 0;

      // console.log(imgList);
      // console.log(imgInfoArray);
      for (let img of imgList) {

        // console.log(imgInfoArray[i]);

        // Check if image is broken
        if ( img.naturalWidth === 0 && img.naturalHeight === 0 ) {
          totalBrokenImages++;
          imgInfoArray[i].broken = true;
        } else {
          imgInfoArray[i].broken = false;

          // Natural dimensions
          imgInfoArray[i].naturalWidth = img.naturalWidth;
          imgInfoArray[i].naturalHeight = img.naturalHeight;

          // GCF
          var naturalRatioGcf = gcd_rec(imgInfoArray[i].naturalWidth, imgInfoArray[i].naturalHeight);
          imgInfoArray[i].naturalRatio = (img.naturalWidth / naturalRatioGcf) + ":" + (img.naturalHeight / naturalRatioGcf);

          // Desktop
          //////////
          var desktop = [];
          desktop.hidden = isHidden(img);

          if ( !desktop.hidden ) {

            // Displayed dimensions - desktop
            desktop.displayedWidth = img.width;
            desktop.displayedHeight = img.height;

            // Scaled dimensions - desktop
            desktop.scaledWidth  =  img.width/imgInfoArray[i].naturalWidth;
            desktop.scaledHeight =  img.height/imgInfoArray[i].naturalHeight;

            var desktopRatioGcf = gcd_rec(desktop.displayedWidth, desktop.displayedHeight);
            desktop.desktopRatio = (desktop.displayedWidth / desktopRatioGcf) + ":" + (desktop.displayedHeight / desktopRatioGcf);

            desktop.ratioDifference = desktop.scaledWidth - desktop.scaledHeight;

            // Testing Ratio/Scaling Data
            //////////
            // console.error( { resizeRatio: resizeRatio, expectedheight: expectedHeight, actualHeight: img.height } );
            // if ( expectedHeight - img.height <= 1 && expectedHeight - img.height >= -1 ) {
            //   console.log("scaled properly", expectedHeight - img.height, 1)
            // } else {
            //   console.log("scaled incorrectly", expectedHeight - img.height, 1)
            // }
            // var expectedHeight = calculateAspectRatioFit(img.naturalWidth, img.naturalHeight, img.width, img.height);
            // var resizeRatio = Math.round(img.naturalWidth / img.width*10) / 10;

            desktop.resizeRatio = img.naturalWidth / img.width;
            var expectedHeight = img.naturalHeight / desktop.resizeRatio;

            // Check if image is stretched
            if ( expectedHeight - img.height <= 1 && expectedHeight - img.height >= -1 ) {
              desktop.stretched = false;
            } else {
              totalStretchedImages++;
              desktop.stretched = true;
            }

          } else {
            desktop.stretched       = null;
            desktop.displayedWidth  = null;
            desktop.displayedHeight = null;
            desktop.scaledWidth     = null;
            desktop.scaledHeight    = null;
            desktop.desktopRatio    = null;
          }
          // End Desktop

          // Add desktop results to object
          imgInfoArray[i].desktop = desktop;

        }

        i++;

      }
      // console.log("totalStretchedImages", totalStretchedImages);

      desktopIframe.removeEventListener("load", checkImages, false);

      if ( totalBrokenImages === 1 ) {
        applyQaResults(imagesQaBar, "error", totalBrokenImages + " Broken Image");
      } else if ( totalBrokenImages > 0 ) {
        applyQaResults(imagesQaBar, "error", totalBrokenImages + " Broken Images");
      } else {
        applyQaResults(imagesQaBar, "success", "All Images Loaded");
      }

      if ( totalStretchedImages === 1 ) {
        applyQaResults(imgRatioQaBar, "error", totalStretchedImages + " Stretched Image");
      } else if ( totalStretchedImages > 0) {
        applyQaResults(imgRatioQaBar, "error", totalStretchedImages + " Stretched Images");
      } else {
        applyQaResults(imgRatioQaBar, "success", "All Images are to Scale");
      }


    }, false);

  }

  // Add all background-images to the same array, label them with ['presentation'] to tell them apart
  // This loops through every node and finds nodes that have a computed style that shows a background image
  // Unlike with <img>s, we can't get width, height, naturalwidth, or naturalheight here though.
  // Later on when the page is finished loading another function will run that will get that data.
  // Code taken from: https://blog.crimx.com/2017/03/09/get-all-images-in-dom-including-background-en/

  const srcChecker = /url\(\s*?['"]?\s*?(\S+?)\s*?["']?\s*?\)/i;

  Array.from(
    Array.from(dFrameContents.querySelectorAll('*'))
      .reduce((collection, node) => {
        // https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle
        let prop = window.getComputedStyle(node, null)
          .getPropertyValue('background-image');
        // match `url(...)`
        let match = srcChecker.exec(prop);
        if (match) {
          // collection.add(match[1])
          var singleBkgImgInfoArray = {}; // object that we will use to hold data about this specific image
          singleBkgImgInfoArray.object = node; //img object
          singleBkgImgInfoArray.url = match[1]; //img url
          singleBkgImgInfoArray.presentation = "background-img"; //kind (background-image)
          imgInfoArray.push(singleBkgImgInfoArray); // add it to the master img array
        }
        return collection;
      }, new Set())
  );

  // We're done creating our image array. More data will be added later once the page is finished loading.
  // For now lets log it since it's been created successfully.
  console.log("imgInfoArray", imgInfoArray);

}


///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
/////
/////
/////    Get img file sizes with fetch API
/////     - Works with both <img> and background-image
/////
/////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////

// Source: https://stackoverflow.com/a/43839304/556079

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */

// This function gets run only once dFrame is finished loading. See newsletter.js
function getImgSizes(imgInfoArray) {

  // Loop through all images (<img> and background) in our array and use the fetch API to get their HTTP headers.
  // This will get us their file size and file format (type)

  var i = 0; // count our synchronous loops
  var k = 0; // count our ASYNC loops
  for (let img of imgInfoArray) {

    // sync
    imgInfoArray[i].dimensions = { "width": imgInfoArray[i].object.width, "height": imgInfoArray[i].object.height, "naturalWidth": imgInfoArray[i].object.naturalWidth, "naturalHeight": imgInfoArray[i].object.naturalHeight, "displayratio": roundTo(imgInfoArray[i].object.naturalWidth / imgInfoArray[i].object.width, 2) };
    i++;

    //async
    fetch(img.url).then(
      // console.log("wow"),
      resp => resp.blob())
    .then(blob => {
      imgInfoArray[k].size = { "size": blob.size, "prettysize": prettyFileSize(blob.size, 1) };
      imgInfoArray[k].type = blob.type;
      k++;
    });

  }

  // While we're fetching <img> image data, lets load the background images into the DOM so that we can get their width and height.
  // I don't think I need to wait for page load to be doing this, but I experienced trouble adding this earlier.
  // Try again at a later date I guess.
  var j = 0;
  for (let img of imgInfoArray) {

    if ( imgInfoArray[j].presentation === "background-img" ) {
      loadImgNow(j, img.url);
    } else {
      // console.error('not bg!')
    }
    j++;
  }

}

///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
/////
/////
/////    Get background-image naturalWidth and height
/////
/////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////

// Find the width and height of background images
// They aren't in the DOM like normal <img> tags.
// So we need to take the URL and load them as an image. Once loaded we can grab their natural width and height.
// UNFINISHED: I can probably use info from background-size to determine the rendered width and height

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */

// Code below taken and modified from here:
// https://blog.crimx.com/2017/03/09/get-all-images-in-dom-including-background-en/
function loadImgNow (i, src, timeout = 500) {
  var imgPromise = new Promise((resolve, reject) => {
    let img = new Image();
    img.onload = () => {
      resolve({
        src: src,
        width: img.naturalWidth,
        height: img.naturalHeight
      });
    };
    img.onerror = reject;
    img.src = src;
  });
  var timer = new Promise((resolve, reject) => {
    setTimeout(reject, timeout);
  });
  // This code wasn't return data that I could use. This code was added on to make it work for me
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve
  imgPromise.then(function(value) {
    imgInfoArray[i].dimensions = { "naturalWidth": value.width, "naturalHeight": value.height };
  });
  return Promise.race([imgPromise, timer]);

}


///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
/////
/////
/////    Get Pretty Filesize
/////
/////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////

// https://stackoverflow.com/a/18650828/556079

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
function prettyFileSize(bytes, decimals) {
   if(bytes == 0) return '0 Bytes';
   var k = 1000, // https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript#comment77017916_29127320
       dm = decimals || 2,
       sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
       i = Math.floor(Math.log(bytes) / Math.log(k));
   return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}


///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
/////
/////
/////    Load iFrame
/////
/////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
function loadIframe(iframe, html, base, name) {

  // I should consider cloning the iframe instead of loading 2 more like this.
  // Figure out if its better for performance.
  // Apparently I should use importnode instead of clonenode for iframes
    // https://developer.mozilla.org/en-US/docs/Web/API/Document/importNode
    // https://www.w3schools.com/jsref/met_document_importnode.asp
    // https://stackoverflow.com/questions/10418644/creating-an-iframe-with-given-html-dynamically

  iframe.contentWindow.document.open();
  iframe.contentWindow.document.write(html);
  iframe.contentWindow.document.close();

}



///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
/////
/////
/////    Check if object already exists in array
/////
/////     https://stackoverflow.com/a/4587130/556079
/////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i] === obj) {
            return true;
        }
    }

    return false;
}



///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
/////
/////
/////
/////
/////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////


/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
var errorLog = function(type, string) {

  console.log(string);
  console.log(escapeXml(string));
  // errorLogRows.insertAdjacentHTML("beforeend", "<div class='error-log-row log-type-" + type + "'>" + escapeXml(string) + "");

};


///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
/////
/////
/////    Update preflight error total
/////
/////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////


/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
function preflightError() {

  var currentValue = parseInt(preflightTotal.innerHTML);

  currentValue++;

  preflightStatus.classList.add("error");
  preflightTotal.innerHTML = currentValue;
}



function preflightNotifierSuccess() {
  preflightStatus.classList.remove("error");
  preflightTotal.textContent = "";
  preflightStatus.classList.add("success");
  preflightTotal.classList.add("icomoon", "icomoon-checkmark");
}


function updatePreflightErrorTotal(type, i) {

  console.groupCollapsed("updatePreflightErrorTotal function initiated.");

  var currentValue = parseInt(preflightTotal.innerHTML);

  // Increment total by 1, reduce by 1, or increase by a given integer
  if ( type === "error" ) {
    console.log("Adding " + i + " to total error value.");
    currentValue = currentValue + i;
    preflightTotal.innerHTML = currentValue;
  } else if ( type === "success" ) {
    console.log("Subtracting " + i + " from total error value.");
    currentValue = currentValue - i;
    preflightTotal.innerHTML = currentValue;
  }
  console.log("currentValue: " + currentValue);
  // if ( type === "zoom" ) {
  //   if ( status = true ) {
  //
  //   }
  // }

  // Update Class
  if ( currentValue <= 0 ) {
    preflightNotifierSuccess();
  } else if ( currentValue > 0 ) {
    preflightStatus.classList.add("error");
    preflightStatus.classList.remove("success");
  }

  console.groupEnd();
}




///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
/////
/////
/////
/////
/////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */

  var changeStage = function() {
    console.log(event);
    console.log(event.target);
    console.log(event.target.data);
    console.log(event.target.dataset);
    console.log(event.target.dataset.stage);
    console.log(this);

    var btn = event.target;
    var stage = event.target.dataset.stage;

    btn.classList.toggle("active");

    if ( stage === "code" ) {
      codeStage.style.display = "flex";
      htmlStage.style.display = "none";

      viewCodeBtn.classList.add("active");
      viewHtmlBtn.classList.remove("active");

      // toggle tracking of visibility
      visibleStages.code = true;
      visibleStages.desktop = false;
      visibleStages.mobile = false;

      // activateCodeStage();
    }
    else {
      htmlStage.style.display = "flex";
      codeStage.style.display = "none";

      viewHtmlBtn.classList.add("active");
      viewCodeBtn.classList.remove("active");

      // toggle tracking of visibility
      visibleStages.code = false;
      visibleStages.desktop = true;
      visibleStages.mobile = true;
    }


  };


/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
var updateQaBar = function(bar, errors, string) {
  bar.querySelectorAll(".qa-text")[0].innerHTML = errors + string;
  bar.dataset.errors = errors;
};



///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
/////
/////
/////    Log Coding Bugs
/////
/////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////


/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
var logCodeBug = function(object, client, errorText, type) {
  console.error("Coding Bug:", client, errorText, object);
  errorLog("warning", errorText );
  totalCodingBugs++;
  // updateQaBar(codingBugsQaBar, totalCodingBugs, " Bugs Found");
};



///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
/////
/////
/////    Log Accessibility Warnings
/////
/////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
var logAccessibilityWarning = function(object, id) {
  console.error(id, object);
  totalAccessibilityWarnings++;
  updateQaBar(accessibilityWarningsQaBar, totalAccessibilityWarnings, " Accessibility Warnings");
};



///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
/////
/////
/////
/////
/////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
var fileNotFound = function() {

};

///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
/////
/////
///// Get background image URLS
/////
/////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////

// https://blog.crimx.com/2017/03/09/get-all-images-in-dom-including-background-en/

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */

function loadImg (src, timeout = 500) {
  var imgPromise = new Promise((resolve, reject) => {
    let img = new Image();
    img.onload = () => {
      resolve({
        src: src,
        width: img.naturalWidth,
        height: img.naturalHeight
      });
    };
    img.onerror = reject;
    img.src = src;
  });
  var timer = new Promise((resolve, reject) => {
    setTimeout(reject, timeout);
  });
  return Promise.race([imgPromise, timer]);
}

function loadImgAll (imgList, timeout = 500) {
  return new Promise((resolve, reject) => {
    Promise.all(
      imgList
        .map(src => loadImg(src, timeout))
        .map(p => p.catch(e => false))
    ).then(results => resolve(results.filter(r => r)));
  });
}

// loadImgAll(getBgImgs(dFrameContents)).then(imgs => console.log(imgs));



///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
/////
/////
///// Get background image URLS
/////
/////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */

 function getBgImgs (doc) {
  const srcChecker = /url\(\s*?['"]?\s*?(\S+?)\s*?["']?\s*?\)/i;
  return Array.from(
    Array.from(doc.querySelectorAll('*'))
      .reduce((collection, node) => {
        let prop = window.getComputedStyle(node, null)
          .getPropertyValue('background-image');
        // match `url(...)`
        let match = srcChecker.exec(prop);
        if (match) {
          collection.add(match[1]);
        }
        return collection;
      }, new Set())
  );
}





///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
/////
/////
///// Handle Escapes
/////
/////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////

/**
 * [someFunction description]
 * @param  {[object]} options [description]
 * @return {[type]}      [description]
 */

var handleEscape = function() {

  // if (  ) {
  //
  // }

};

///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
/////
/////
///// Toggle Info Layer
/////
/////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////

/**
 * [someFunction description]
 * @param  {[object]} options [description]
 * @return {[type]}      [description]
 */

var toggleInfoLayer = function(intent) {

  console.log("toggling info layer");

  if (!intent) {
    document.getElementById("info-overlay").style.display = document.getElementById("info-overlay").style.display === 'none' ? '' : 'none';
    console.log("toggled");
  }
  else if ( intent === "hide" ) {
    document.getElementById("info-overlay").style.display = 'none';
    console.log("hidden");
  }
  else {
    document.getElementById("info-overlay").style.display = '';
    console.log("revealed");
  }

};


///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
/////
/////
///// Toggle Link Markers
/////
/////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////

var linkMarkersToggle;
var toggleLinkMarkers = function (source) {

  console.log("Running: toggleLinkMarkers() with source of", source);

  if ( source === "command" ) {
    dFrameContents.getElementById("link-markers").classList.toggle("show-all");
  }

  else {


    if ( this.nodeType !== 1 ) {
      dFrameContents.getElementById("link-markers").classList.add("on-page-load");
    } else if ( dFrameContents.querySelector(".on-page-load") ) {
      dFrameContents.getElementById("link-markers").classList.remove("on-page-load");
    } else {
      dFrameContents.getElementById("link-markers").classList.toggle("hidden");
    }

    linkMarkersToggle = !linkMarkersToggle;

    if ( linkMarkersToggle ) {
      history.replaceState(null,null, updateQueryString("links", "0") );
    } else {
      history.replaceState(null,null, updateQueryString("links") );
    }

  }

};
