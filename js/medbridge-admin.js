console.warn(">>> medbridge-admin.js loaded");

if ( /landing_pages/gi.test(document.URL) ) {

  // Access window variable from Content Script
  // http://stackoverflow.com/a/20513730/556079
  injectScript( chrome.extension.getURL('/js/medbridge-admin_injected_landing-page-editor.js'), 'body');

}

else {

  var affiliatePage = document.querySelector(".breadcrumbs span:last-child span").textContent;

  console.log(affiliatePage);

  if ( affiliatePage === "Edit Affiliate" ) {

    var cleanFieldsEle = document.createElement("div");

    var cleanFieldsEleText = document.createTextNode("Clean Fields");
    cleanFieldsEle.appendChild(cleanFieldsEleText);

    cleanFieldsEle.className = "chr-btn clean-fields btn btn-primary";
    cleanFieldsEle.addEventListener("click", cleanFields, false);


    var submitBtn = document.querySelector("style + .title");
    submitBtn.appendChild(cleanFieldsEle);

    function cleanFields() {
      console.log("hi");

      var inputAffiliateName = document.querySelector("#affiliate-name").value.replace(/ Copy/gi, "");
      document.querySelector("#affiliate-name").value = inputAffiliateName;

      var inputAffiliateUrl = document.querySelector("#affiliate-url").value.replace(/-copy/gi, "");
      document.querySelector("#affiliate-url").value = inputAffiliateUrl;

    }
  }
}
