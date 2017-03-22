///////////////////
///////////////////
////  NOTES
///////////////////
///////////////////

// double click to toggle through modes
// Copy URL of img to clipboard
// Add ratio info. eg 1:1, 16:9, 4:3. Reduce to the lowest whole number
// Scroll wheel changes the input numbers when you are focused on them
// How do I stop that Chrome zoom on big images?


///////////////////


// [COMPLETE] highlight dims input on focus
// [COMPLETE] Add drag to resize functionality
// [COMPLETE] listen to changes in width/height of the img itself, and change the visual dims. solves the issue of resizing the browser window causing image size to change
// [COMPLETE] blur and activate scripts when hitting enter instead of only when they click away
// [COMPLETE] extra div above current dims to show percentage of current size relative to natural size "33% of Natural Size"
// [COMPLETE] % should also be a field that you can edit


///////////////////
///////////////////
////  VARIABLES & LISTENERS
///////////////////
///////////////////

var img = document.querySelector("img");
beforeResize();

var naturalWidth = img.naturalWidth;
var naturalHeight = img.naturalHeight;

if ( naturalWidth > 999 || naturalHeight > 999 ) {
  document.body.classList.add("thousand");
}

window.addEventListener("resize", imgWasResized, false);

var cleanUrl =  document.URL.match(/^.+\.(jpg|jpeg|png|apng|gif|webp|svg|bmp)/i)[0];


///////////////////
///////////////////
////  HTML
///////////////////
///////////////////

var el = document.createElement("div");
el.className = "container";
document.body.appendChild(el);

el.innerHTML = '<div class="background action"></div><div class="ext text"></div><div class="size text"></div><div class="sizer-container wrapper"><div class="fit-to-screen text action sizer">Fit to Screen</div><div class="half-size text action sizer">0.5x</div><div class="full-size text action sizer active">1.0x</div></div><div class="percentage"><div class="minus perc-control">&ndash;</div><div class="percentage-number input" contenteditable>100</div><div class="plus perc-control">+</div></div><div class="dims"><div class="width input" contenteditable>' + img.width + '</div> x <div class="height input" contenteditable>' + img.height + '</div><div class="reset-to-natural disabled"><svg enable-background="new 0 0 41 34" height="34px" viewBox="0 0 41 34" width="41px"><path d="M33.949,16C33.429,7.08,26.051,0,17,0C7.611,0,0,7.611,0,17s7.611,17,17,17v-6c-6.075,0-11-4.925-11-11  S10.925,6,17,6c5.737,0,10.443,4.394,10.949,10h-6.849L31,25.899L40.899,16H33.949z" fill="#fff"/></svg></div></div>'

var widthInput = document.querySelector(".width");
var heightInput = document.querySelector(".height");
var percentageInput = document.querySelector(".percentage-number");

///////////////////
///////////////////
////
///////////////////
///////////////////

// Check image size on page load
if ( naturalWidth > img.width ) {
  imgWasResized();
}


///
widthInput.addEventListener("focus", inputOnFocus, false);
heightInput.addEventListener("focus", inputOnFocus, false);
percentageInput.addEventListener("focus", inputOnFocus, false);

widthInput.addEventListener("keydown", inputOnEnter, false);
heightInput.addEventListener("keydown", inputOnEnter, false);
percentageInput.addEventListener("keydown", inputOnEnter, false);

widthInput.addEventListener("blur", inputOnBlur, false);
heightInput.addEventListener("blur", inputOnBlur, false);
percentageInput.addEventListener("blur", inputOnBlur, false);

document.querySelector(".minus.perc-control").addEventListener("click", percentagePlusMinus, false);
document.querySelector(".plus.perc-control").addEventListener("click", percentagePlusMinus, false);


function inputOnFocus() {

  if ( this.classList.contains("width") || this.classList.contains("height") ) {
    originalWidth = widthInput.textContent.trim();
    originalHeight = heightInput.textContent.trim();
    document.querySelector(".dims").classList.add("focused");
  } else {
    document.querySelector(".percentage").classList.add("focused");
  }

  selectElementContents(this);

}

function inputOnBlur() {

  if ( this.classList.contains("width") || this.classList.contains("height") ) {

    document.querySelector(".dims").classList.remove("focused");

    if ( this.textContent.trim() === "" ) {
      this.innerHTML = originalWidth;
    }

    if ( this.classList.contains('width') ) {
      var newWidth = this.textContent.trim();

      if ( /\D/.test(newWidth) || newWidth === "0" ) {
        this.innerHTML = originalWidth;
      } else {
        // var sizeDiff = newWidth / originalWidth;
        // img.height = sizeDiff * originalHeight;
        beforeResize();
        img.width = newWidth;
        heightInput.textContent = img.height;
        imgWasResized();
      }

    } else {
      var newHeight = this.textContent.trim();

      if ( /\D/.test(newHeight) || newHeight === "0" ) {
        this.innerHTML = originalHeight;
      } else {
        beforeResize();
        var sizeDiff = newHeight / originalHeight;
        img.width = sizeDiff * originalWidth;
        widthInput.textContent = img.width;
        imgWasResized();
      }
    }

  } else {

    beforeResize();

    document.querySelector(".percentage").classList.remove("focused");

    var enteredValue = this.innerHTML.trim().replace(/[^0-9\.]/gi, "");
    this.dataset.value = enteredValue;
    this.innerHTML = enteredValue;

    img.width = (naturalWidth / 100) * enteredValue;

    imgWasResized();

  }




  toggleReset();
}



//
document.querySelector(".sizer-container").addEventListener('click', presetSizes, false);

function presetSizes() {

  if ( !event.target.classList.contains("active") ) {

    beforeResize();

    if ( event.target.classList.contains("half-size") ) {
      img.width = naturalWidth / 2;
    } else if ( event.target.classList.contains("full-size") ) {
      img.width = naturalWidth;
    } else {
      // Resize to fit viewport
      if ( (document.body.clientWidth - naturalWidth) < (document.body.clientHeight - naturalHeight) ) {
        // img.width = document.body.clientWidth;
        img.style.width = "100vw";
        img.style.height = "auto";
      } else {
        // var widthBasedOnHeight = document.body.clientHeight / naturalHeight;
        // img.width = naturalWidth * widthBasedOnHeight;
        img.style.height = "100vh";
        img.style.width = "auto";
      }

    }

    imgWasResized();
    event.target.classList.add("active");

  }
}



//
document.querySelector(".reset-to-natural").addEventListener('click', makeImgNatural, false);

function makeImgNatural() {

  if ( !this.classList.contains("disabled") ) {

    beforeResize();

    img.width = naturalWidth

    imgWasResized();
  }

}


///
document.querySelector(".background").addEventListener('click', toggleBg, false);

function toggleBg() {
  document.body.classList.toggle("dark");
}


// http://stackoverflow.com/a/1310399/556079
var xhr = new XMLHttpRequest();
xhr.open('HEAD', document.URL, true);
xhr.onreadystatechange = function(){
  if ( xhr.readyState == 4 ) {
    if ( xhr.status == 200 ) {

      var size = humanFileSize(xhr.getResponseHeader('Content-Length'), true);
      var extension = "." + xhr.getResponseHeader('Content-Type').replace(/image\//, "").toUpperCase();

      document.querySelector(".size").innerHTML = size;

      console.log( xhr.getResponseHeader('Content-Length') );
      console.log( xhr.getResponseHeader('Content-Type') );

      // alert('Size in bytes: ' + humanFileSize(xhr.getResponseHeader('Content-Length'), true) +  humanFileSize(xhr.getResponseHeader('Content-Length'), false));
    } else {
      var size = "N/A";
      document.querySelector(".size").style.display = "none";

      var extension = "." + cleanUrl.replace(/^.+\./i, "").toUpperCase();
      // alert('ERROR');
    }

    document.querySelector(".ext").innerHTML = extension;
  }
};
xhr.send(null);

// http://stackoverflow.com/a/14919494/556079
function humanFileSize(bytes, si) {
    var thresh = si ? 1000 : 1024;
    if(Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }
    var units = si
        ? ['kB','MB','GB','TB','PB','EB','ZB','YB']
        : ['KiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB'];
    var u = -1;
    do {
        bytes /= thresh;
        ++u;
    } while(Math.abs(bytes) >= thresh && u < units.length - 1);
    return bytes.toFixed(1)+' '+units[u];
}



///////////////////
///////////////////
////  FUNCTIONS
///////////////////
///////////////////

function deactivate() {
  if ( elExists(document.querySelector(".sizer.active")) ) {
    document.querySelector(".sizer.active").classList.remove("active");
  }
}

function elExists(el) {
  if ( typeof(el) != 'undefined' && el != null ) {
    return true;
  } else {
    return false;
  }
}

function toggleReset() {

  deactivate();

  if ( img.width !== naturalWidth && img.height !== naturalHeight ) {
    document.querySelector(".reset-to-natural").classList.remove("disabled");
    var halfSize = Math.floor(naturalWidth / 2);
    if ( img.width === halfSize ) {
      document.querySelector(".half-size").classList.add("active");
    }
  } else {
    document.querySelector(".reset-to-natural").classList.add("disabled");
    document.querySelector(".full-size").classList.add("active");

  }
}

function imgWasResized() {

  console.log("imgWasResized - img.width: " + img.width);

  // Set New Dimensions
  widthInput.innerHTML = img.width;
  heightInput.innerHTML = img.height;

  // Set New Percentage
  percentageInput.innerHTML = Math.round((img.width / naturalWidth) * 100);

  // Resets
  img.removeAttribute("height");
  toggleReset();
}

function inputOnEnter() {

  var key = event.charCode ? event.charCode : event.keyCode ? event.keyCode : 0;
  if (key === 13) {
    event.preventDefault();
    this.blur();
    window.getSelection().removeAllRanges(); //http://stackoverflow.com/a/26890080/556079
  }

}







///////////////////
///////////////////
///////////////////
///////////////////




function addDragListener({ media, atShiftKey, onStart, onMove }) {
  let isActive, hasMoved, lastX, lastY;

  const handleMove = (function (e) {
    const movementX = e.clientX - lastX;
    const movementY = e.clientY - lastY;

    if (!movementX && !movementY) {
      // Mousemove may be triggered even without movement
      return;
    } else if (atShiftKey !== e.shiftKey) {
      isActive = false;
      lastX = e.clientX;
      lastY = e.clientY;

      return;
    }

    if (!isActive) {
      if (onStart) onStart(lastX, lastY);
      isActive = true;
      hasMoved = true;
      document.body.classList.add('res-media-dragging');
    }

    onMove(e.clientX, e.clientY, movementX, movementY);
    lastX = e.clientX;
    lastY = e.clientY;
  });

  function handleClick(e) {
    if (hasMoved) e.preventDefault();
  }

  function stop() {
    document.body.classList.remove('res-media-dragging');

    document.removeEventListener('mousemove', handleMove);
    document.removeEventListener('mouseup', stop);

    // `handleClick` is only invoked if the mouse target is `media`
    // `setTimeout` is necessary since `mouseup` is emitted before `click`
    setTimeout(function () {
      return document.removeEventListener('click', handleClick);
    });
  }

  function initiate(e) {
    if (e.button !== 0) return;

    lastX = e.clientX;
    lastY = e.clientY;


    hasMoved = false;
    isActive = false;

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', stop);
    document.addEventListener('click', handleClick);

    e.preventDefault();
  }

  media.addEventListener('mousedown', initiate);
}


////
////
////
////

makeMediaZoomable(img);

function makeMediaZoomable(media, dragInitiater = media, absoluteSizing = false) {
	// if (!_module.options.imageZoom.value) return;

	media.classList.add('res-media-zoomable');

	let initialWidth, initialDiagonal, left, top;

	function getDiagonal(x, y) {
		const w = Math.max(1, x - left);
		const h = Math.max(1, y - top);
		return Math.round(Math.hypot(w, h));
	}

	addDragListener({
		media: dragInitiater,
		atShiftKey: false,
		onStart(x, y) {
			var _media$getBoundingCli2 = media.getBoundingClientRect();

			left = _media$getBoundingCli2.left;
			top = _media$getBoundingCli2.top;
			initialWidth = _media$getBoundingCli2.width;

			initialDiagonal = getDiagonal(x, y);
		},
		onMove(x, y, deltaX, deltaY) {
			if (absoluteSizing) {
				var _media$getBoundingCli3 = media.getBoundingClientRect();

				const width = _media$getBoundingCli3.width,
				      height = _media$getBoundingCli3.height;

				resizeMedia(media, width + deltaX, height + deltaY);
			} else {
				const newWidth = getDiagonal(x, y) / initialDiagonal * initialWidth;
				resizeMedia(media, newWidth);
			}
		}
	});
}

	function resizeMedia(ele, newWidth, newHeight) {
		// ele should always be grippable, so ignore resizes that are too tiny
		if (newWidth < 20) return;

		if (typeof newHeight === 'number') {
			ele.style.height = `${newHeight}px`;
		} else if (ele.style.height) {
			// If height is previously set, keep the ratio
			var _ele$getBoundingClien2 = ele.getBoundingClientRect();

			const width = _ele$getBoundingClien2.width,
			      height = _ele$getBoundingClien2.height;

			ele.style.height = `${(height / width * newWidth).toFixed(2)}px`;
		}

    beforeResize();

		ele.width = `${newWidth}`;
		// ele.height = `${newHeight}`;

    // console.error(`${newWidth}px`);
    // console.error(`${newHeight}px`);

		// ele.style.maxWidth = ele.style.maxHeight = 'none';

		ele.dispatchEvent(new CustomEvent('mediaResize', { bubbles: true }));

    imgWasResized();
	}

// http://stackoverflow.com/a/6150060/556079
function selectElementContents(el) {
  var range = document.createRange();
  range.selectNodeContents(el);
  var sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
}

function beforeResize() {
  img.removeAttribute("style");
}

function percentagePlusMinus() {

  var currentWidth = img.clientWidth;

  beforeResize();

  if (this.classList.contains("minus")) {
    img.width = currentWidth * 0.8;
  } else {
    img.width = currentWidth / 0.8;
  }

  imgWasResized();
}
