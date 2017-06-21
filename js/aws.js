console.warn("js/aws.js loaded");


document.arrive("tbody[ng-hide] > tr:first-child", function() {

  console.log("arrived!!");

  if ( !document.body.classList.contains("powered-up") ) {

      let imgLinks = document.querySelectorAll("td.truncate a.list-view-item-name");
      for (let imgLink of imgLinks) {

        // console.log(imgLink);
        // console.log(imgLink.textContent);


        var currUrl = document.URL.replace(/^.+?\/s3\/buckets\//i,"");
            currUrl = currUrl.replace(/\?.+/i,"");

        var imgUrl = "https://s3.amazonaws.com/" + currUrl + imgLink.textContent.trim();

        var copyIcon = document.createElement("span");
        copyIcon.className = "icomoon icomoon-copy";
        createCopyBtn(copyIcon, imgUrl);

        insertBefore(copyIcon, imgLink);

        var inlineImg = document.createElement("img");
        inlineImg.src = imgUrl;
        createCopyBtn(inlineImg, imgUrl);
        inlineImg.style.width = "100px";
        inlineImg.style.height = "auto";
        inlineImg.style.maxHeight = "50px";
        inlineImg.style.marginLeft = "10px";

        insertBefore(inlineImg, imgLink);

        // setTimeout(function(){ imgIcon.nextSibling.textContent }, 3000);

      }

      document.body.classList.add("powered-up");
  }

});
