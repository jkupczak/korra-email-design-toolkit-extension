

document.arrive("article.mosaic-asset", {fireOnAttributesModification: true, existing: true}, function() {

  // console.log(this);



  var getImg = document.createElement("a");
  getImg.href = this.querySelectorAll("a.search-result-asset-link img")[0].src;

  getImg.style.position = "absolute";
  getImg.target = "_blank";
  getImg.style.zIndex = "9999";
  getImg.style.display = "flex";
  getImg.style.justifyContent = "center";
  getImg.style.alignItems = "center";
  getImg.innerHTML = '<svg fill="#FFFFFF" height="22" viewBox="0 0 24 24" width="22" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"/><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>';

  getImg.style.bottom = "7px";
  getImg.style.left = "7px";
  getImg.style.width = "36px";
  getImg.style.height = "36px";
  getImg.style.borderRadius = "0 4px 0 0";
  getImg.style.background = "#0a69cd";
  getImg.style.boxShadow = "0 0 0 4px #e5eaea";


  this.prepend(getImg);


});
