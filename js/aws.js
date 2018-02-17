console.warn("[sonic-toolkit-extension] loaded /js/aws.js");
////////////////////////////////////////////////////////////
//
// var moreBtn = document.querySelector(".action-strip > action-dropdown");
// var dupedMoreBtn = moreBtn.cloneNode(true);


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

    row.querySelectorAll("td.truncate")[0].style = "display:flex; align-items:center; height:auto;";

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
        type.style = "font-weight: bold; height: 22px; left: 18px; top: 0; position: absolute; line-height: 22px; padding: 0 6px 0 6px; background: #ccc;";

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
        inlineImgWrapper.style = "display:inline-flex; justify-content:center; align-items:center; align-content:center; margin-left:10px; margin-right:5px; min-width:120px; width:120px; max-width:120px; min-height:80px; height:80px; max-height:80px; background:#f5f7f7; overflow:hidden;";

        var inlineImg = document.createElement("img");
        inlineImg.src = imgUrl;
        createCopyBtn(inlineImg, imgUrl);
        inlineImg.style = "width:auto; height:80px; max-height:80px;";

        inlineImgWrapper.appendChild(inlineImg);
        insertBefore(inlineImgWrapper, imgLink);

      }

      // Apply a class to the imgLink to show we've processed it.
      row.classList.add("powered-up");

    }

  }

});



//////

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
