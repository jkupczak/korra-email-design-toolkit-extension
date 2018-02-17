console.warn("[sonic-toolkit-extension] loaded /js/mailchimp/mailchimp-reports.js");
///////////////////////////////////////////////////////////////////////////////////


var reportPage = document.querySelector("h1").innerText;

if ( /\| Combo /i.test(reportPage) ) {
  reportPage = "individual";
} else {
  reportPage = "both"
}

//// UNFINISHED!!!!!
//
// var iframeToolWrapper = document.createElement("div");
// iframeToolWrapper.className = "iframe-tools-wrapper";
//
// let iframes = document.querySelectorAll("iframe");
// for (let iframe of iframes) {
//
//   console.log(iframe);
//
//   var fullScreenLink = document.createElement("a");
//   fullScreenLink.onclick = fullscreenIframe;
//   fullScreenLink.className = "iframe-tool-fullscreen";
//   fullScreenLink.innerText = "F";
//
//   var newWindowLink = document.createElement("a");
//   newWindowLink.className = "iframe-tool-new-window";
//   newWindowLink.innerText = "N";
//
//   ////
//
//   iframeToolWrapper.appendChild(fullScreenLink);
//   iframeToolWrapper.appendChild(newWindowLink);
//
//   insertBefore(iframeToolWrapper, iframe);
//
//   newWindowLink.href = newWindowLink.parentElement.nextElementSibling.src;
//
// }
//
// function fullscreenIframe() {
//   console.log(this);
//   var dupNode = this.parentElement.nextElementSibling.cloneNode(false);
//   dupNode.style = "border-radius:4px; background:#fff; position:fixed; top:20px; left:20px; z-index:99999999; width: calc(100vw - 40px) !important; height: calc(100vh - 40px); box-shadow:0 0 0 4px rgba(0,0,0,0.3), 0 0 0 40px rgba(0,0,0,0.7)"
//   document.body.appendChild(dupNode);
// }



///////////////////////////
///////////////////////////
///////////////////////////

// Get the date

var listedDate = elExists(document.querySelector(".sub-section p > span.description"), "text");

if ( listedDate ) {
  // console.log(listedDate);
  var day = listedDate;
      day = day.replace(/^.+?, .+? /gi, "");
      day = day.substring(0, 2);

      // console.log(day);

  var month;
       if ( /Jan/gi.test(listedDate) ) { month = "1"; }
  else if ( /Feb/gi.test(listedDate) ) { month = "2"; }
  else if ( /Mar/gi.test(listedDate) ) { month = "3"; }
  else if ( /Apr/gi.test(listedDate) ) { month = "4"; }
  else if ( /May/gi.test(listedDate) ) { month = "5"; }
  else if ( /Jun/gi.test(listedDate) ) { month = "6"; }
  else if ( /Jul/gi.test(listedDate) ) { month = "7"; }
  else if ( /Aug/gi.test(listedDate) ) { month = "8"; }
  else if ( /Sep/gi.test(listedDate) ) { month = "9"; }
  else if ( /Oct/gi.test(listedDate) ) { month = "10"; }
  else if ( /Nov/gi.test(listedDate) ) { month = "11"; }
     else { month = "12"; }

      // console.log(month);

  var year = listedDate;
      year = year.replace(/^.+?20/gi, "");
      year = "20" + year.substring(0, 2);

      // console.log(year);



  var startDate = moment(year+"/"+month+"/"+day).subtract(7, 'days').format('YYYYMMDD');
  var endDate = moment(year+"/"+month+"/"+day).add(30, 'days').format('YYYYMMDD');

  // console.log(startDate);
  // console.log(endDate);
}



function maximizeIframes() {
  console.log("Running maximizeIframes() function.");
  document.getElementById("side-by-side-view").classList.toggle("fullscreen");

}

///////////////////////////
///////////////////////////
///////////////////////////
//////
//////   ONLY A/B TEST REPORT PAGES
//////
///////////////////////////
///////////////////////////
///////////////////////////

// This is an A/B test page. The one that shows all A/B tests, but no iframe previews.
// Let's add iFrame previews!
if ( reportPage === "both" ) {


      // Create container for the iframes.
      ////////////
      var iframePreviewWrap = document.createElement("div");
      iframePreviewWrap.id = "side-by-side-view";
      iframePreviewWrap.className = "side-by-side-view";

      // Iframe Toolbar
      //////////
      var iframeToolbar = document.createElement("div");
      iframeToolbar.className = "iframe-toolbar";

      var iframeMaximize = document.createElement("div");
      iframeMaximize.className = "iframe-maximize icomoon icomoon-enlarge";
      iframeMaximize.addEventListener("click", maximizeIframes, false);

      var iframeMaximizeText = document.createElement("span");
      iframeMaximizeText.innerText = "Maximize";
      iframeMaximize.appendChild(iframeMaximizeText);

      iframeToolbar.appendChild(iframeMaximize);
      iframePreviewWrap.appendChild(iframeToolbar);

      var iframeABContainer = document.createElement("div");
      iframeABContainer.className = "iframe-ab-container";



      // Identify where the listing of campaigns are.
      ///////////
      var abCampaignsList = document.querySelector("h3 + ol");


      // Is this a "Content" test? We only want to show multiple iframes if it is.
      var abTestType = document.querySelector("#content .sub-section > p:first-child").innerText;
      if ( /Content/gi.test(abTestType) ) {
        // Yes, this is a content A/B test.

      } else {
        // No, this is NOT a content A/B test.

      }


      // Loop through all of the A/B test rows to gather data.
      let rows = abCampaignsList.querySelectorAll("ol.media-list > li");
      for (let row of rows) {

        row.dataset.sendDate = getMailChimpSendDate(row.querySelector("div.media-body > div > p + p.small-meta:not(.font-weight--bold)").innerText);

        var extraData = document.createElement("div");
        extraData.style = "display:inline-block; font-size:12px; color:#434343; font-weight:bold;";

        // console.log(row);

        var mediaBody = row.querySelector(".media-body");
        var mediaBodyLink = row.querySelector(".media-body h4 a");
        var mediaImage = row.querySelector(".media-image");

        // console.log(mediaBody);
        // console.log(mediaBodyLink);
        // console.log(mediaImage);



        var reportId =   mediaBodyLink.href.replace(/(^.+?id=|&.+)/gi,"");
        var analyticsId = mediaImage.style.background.replace(/(^.+?cid=|"\).+)/gi,"");
        var comboName = mediaBodyLink.innerText;

        var gaLink = "https://analytics.google.com/analytics/web/?authuser=1#savedreport/KcDCsdCOSoi-HxyUFgwU2Q/a25581184w49699059p123150809/%3F_u.date00%3D" + startDate + "%26_u.date01%3D" + endDate + "%26_r.dsa%3D1%26_r.drilldown%3Danalytics.eventCategory%3AConversion%26explorer-table.plotKeys%3D%5B%5D%26explorer-table.rowCount%3D500%26explorer-table.secSegmentId%3Danalytics.campaign%26explorer-table.advFilter%3D%5B%5B0%2C%22analytics.campaign%22%2C%22PT%22%2C%22" + analyticsId + "%22%2C0%5D%5D%26explorer-segmentExplorer.segmentId%3Danalytics.eventAction%26_.advseg%3D%26_.useg%3D%26_.sectionId%3D/";

        var combo =   "<div style='display:inline-block; background:#b3d0dd; border-radius:4px; overflow:hidden; margin-right:6px;'><div style='padding:2px 6px; display:inline-block; user-select:none !important;'>Report ID</div><div style='display:inline-block; padding:2px 6px; background:#cce5f0; '>" + reportId + "</div></div>"
        var comboid = "<div style='display:inline-block; background:#b3d0dd; border-radius:4px; overflow:hidden;'><div style='padding:2px 6px; display:inline-block; user-select:none !important;'>Analytics ID</div><a href='" + gaLink + "' target='blank' style='display:inline-block; padding:2px 6px; background:#cce5f0; '>" + analyticsId + "</a></div>"

        extraData.innerHTML = combo + comboid;
        mediaBody.prepend(extraData);

        // console.log(extraData);

        ////
        //// IFRAMES
        //// Create iframe and its wrapper. Then add them to the DOM.
        ////

        var iframeTitle = document.createElement("div");
        iframeTitle.style = "background:#434343; color:#fff; font-size:18px; font-weight:bold;  text-align:left; padding:10px;";
        iframeTitle.innerText = comboName;

        var iframeSingle = document.createElement("iframe");
        iframeSingle.src = "https://us2.admin.mailchimp.com/campaigns/preview-content-html?id=" + reportId;
        // iframeSingle.src = "https://us2.admin.mailchimp.com/reports/clickmap-data?id=" + reportId; /////// CLICK MAP DATA

        var iframeSingleWrapper = document.createElement("div");
            iframeSingleWrapper.className = "iframe-single-wrapper";

        iframeSingleWrapper.appendChild(iframeTitle);
        iframeSingleWrapper.appendChild(iframeSingle);
        iframeABContainer.appendChild(iframeSingleWrapper);

      }


      // We're done creating iframes and their wrappers! Insert it all after the campaign list.

      iframePreviewWrap.appendChild(iframeABContainer);

      insertAfter(iframePreviewWrap, abCampaignsList);

}






// document.querySelector("#wrap").prepend(iframePreviewWrap);

///////// Iframes previews!



document.arrive("#campaign-overview-stats", function(e) {

  console.error("element arrived");
  // console.log(this);

});

var previewWrapper = document.createElement("div");
previewWrapper.className = "stitched-preview";
previewWrapper.style = "display:flex; flex-direction:columns;";

var campaignIframePreview = document.querySelector("#campaign-overview-html");
var campaignDetails = document.querySelector("#campaign-overview-stats").cloneNode(true);

wrap(campaignIframePreview, previewWrapper)

previewWrapper.prepend(campaignDetails);




insertBefore(campaignDetails, campaignIframePreview);

// var campaignDetails = document.getElementById("#campaign-overview-stats");
// console.log(campaignDetails);





///
