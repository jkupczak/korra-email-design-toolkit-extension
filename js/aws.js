console.warn("[sonic-toolkit-extension] loaded /js/aws.js");
////////////////////////////////////////////////////////////
//
// var moreBtn = document.querySelector(".action-strip > action-dropdown");
// var dupedMoreBtn = moreBtn.cloneNode(true);




var gridPref = localStorage.getItem('grid');

if ( gridPref === null ) {
  document.body.classList.add("korra");
  document.body.classList.add("grid-sm");
}
else if ( gridPref !== 'off' ) {
  document.body.classList.add("korra");
  document.body.classList.add(gridPref);
} else {
  // do nothing
}


var gridView = document.createElement("div");
gridView.classList.add("material-btn");
gridView.style.float = "right";
gridView.innerHTML = '<i class="material-icons md-light">view_module</i>';
gridView.addEventListener("click", showGridView, false);

// Wait for dropdown to show up then append our grid button after it.
document.arrive("action-dropdown.moredropdown.ng-isolate-scope", function() {
  insertAfter(gridView, document.querySelectorAll("action-dropdown.moredropdown.ng-isolate-scope")[0]);
});


function showGridView() {

  if ( document.body.classList.contains("grid-xlg") ) {
    document.body.classList.remove("grid-xlg");
    document.body.classList.add("grid-lg");
    localStorage.setItem('grid', 'grid-lg');
  }
  else if ( document.body.classList.contains("grid-lg") ) {
    document.body.classList.remove("grid-lg");
    document.body.classList.add("grid-md");
    localStorage.setItem('grid', 'grid-md');
  }
  else if ( document.body.classList.contains("grid-md") ) {
    document.body.classList.remove("grid-md");
    document.body.classList.add("grid-sm");
    window.localStorage.setItem('grid', 'grid-sm');
  }
  else if ( document.body.classList.contains("grid-sm") ) {
    document.body.classList.remove("grid-sm");
    document.body.classList.remove("korra");
    localStorage.setItem('grid', 'off');
  }
  else {
    document.body.classList.add("korra", "grid-xlg");
    localStorage.setItem('grid', 'grid-xlg');
  }

}


///// HIDE BY FILETYPE!
///// destroyAll( document.querySelectorAll("td[data-img-type='jpg']") );

document.arrive("tbody[ng-hide] > tr:first-child", function() {

  // Auto click the sort field for "data modified" on page load
  if ( !document.querySelectorAll(".columbia-table th:nth-child(3) span.sorting-icon")[0].classList.contains("sorting-descending") ) {
    document.querySelectorAll(".columbia-table th:nth-child(3)")[0].click();
  }

  // Loop through all tr's
  // let imgLinks = document.querySelectorAll("tr[ng-repeat*='obj'] td.truncate a.list-view-item-name");
  let rows = document.querySelectorAll("table.table > thead + tbody[ng-hide] > tr");
  for (let row of rows) {

    row.querySelectorAll("td.truncate")[0].classList.add("wrapping-cell");

    var imgLink = row.querySelectorAll("td.truncate a.list-view-item-name")[0];

    // Only process tr's that haven't had our special class applied to them yet.
    //////////////////////////////////////

    if ( !row.classList.contains("powered-up") ) {

      var currUrl = document.URL.replace(/^.+?\/s3\/buckets\//i,"");
          currUrl = currUrl.replace(/\?.+/i,"");

      var imgTextUrl = row.querySelectorAll("td.truncate > a.list-view-item-name")[0].textContent.trim();

      // These steps only apply to rows that are images. Not folders.
      ///////////////////////////////
      if ( !imgTextUrl.match(/\.(bmp|svg|gif|jpe?g|a?png|mp4|mov|mpe?g|ogg)$/gi) ) {
        row.classList.add("folder-row");
      } else {
        row.classList.add("img-row");
        var imgUrl = "https://s3.amazonaws.com/" + currUrl + imgTextUrl;

        // Show the File Type
        /////////////////////////////////

        var type = document.createElement("div");
            type.classList.add("image-ext");

        if ( imgUrl.match(/\.png/gi) ) {
          type.innerText = "PNG";
          row.dataset.imgType = "png";
        } else if ( imgUrl.match(/\.jpe?g/gi) ) {
          type.innerText = "JPG";
          row.dataset.imgType = "jpg";
        } else if ( imgUrl.match(/\.svg/gi) ) {
          type.innerText = "SVG";
          row.dataset.imgType = "svg";
        } else if ( imgUrl.match(/\.gif/gi) ) {
          type.innerText = "GIF";
          row.dataset.imgType = "gif";
        } else if ( imgUrl.match(/\.(mov|mp4|mpeg)/gi) ) {
          type.innerText = "VID";
          row.dataset.imgType = "vid";
        }
        row.querySelectorAll("td:first-child")[0].appendChild(type);


        // Insert the image
        ////////////////////////////////////

        var inlineImgWrapper = document.createElement("div");
        inlineImgWrapper.classList.add("inline-image-wrapper");

        var inlineImg = document.createElement("img");
        inlineImg.src = imgUrl;
        createCopyBtn(inlineImg, imgUrl);
        inlineImg.classList.add("inline-image");

        inlineImgWrapper.appendChild(inlineImg);
        insertBefore(inlineImgWrapper, imgLink);

      }

      // Apply a class to the imgLink to show we've processed it.
      row.classList.add("powered-up");

    }

  }

});



//////

/////
///// Open image in a new tab on middle click.
/////

// open new tab = https://stackoverflow.com/a/7924248/556079
// event.target = https://stackoverflow.com/a/1250567/556079
// detect middle click (mousedown/up) = https://stackoverflow.com/a/21224428/556079

document.arrive("tbody[ng-hide] > tr:first-child", {onceOnly: true, existing: true}, function() {

  var imgTable = document.querySelectorAll(".object-table table.table > tbody")[0];

  imgTable.onmouseup = function (e) {

    console.log(e);
    console.log(e.target);

    if (e && ( e.which == 2 || e.button == 4 ) && e.target.src) {
      console.log('middleclicked')
      window.open(e.target.src, '_blank');
    } else {
      console.log('no middleclick')
    }
  }

});
