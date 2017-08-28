console.warn("[sonic-toolkit-extension] loaded /js/mailchimp/mailchimp-lists.js");
console.log("v1.2");
//////////////////////////////////////////////////////////////////////////////////


////////////////////
////////////////////
/*

Generate Segment Link
---------------------

When you create a segment and click the "Preview Segment" button, we loop through all of the parameters that were selected.
From the values we find we piece together a URL.

This URL can be shared with anyone that has access to view the segment without needing to save the segment in MailChimp. This allows us to create many,
many segments and save the links locally without cluttering up our account with a long list of segments.

Currently this only works with one parameter. To use more I'd have to crack the querystring code that they use.

*/
////////////////////
////////////////////


var previewBtn = document.querySelector("a[data-mc-el='previewSegmentBtn']");

previewBtn.addEventListener("click", generateLink, false);


var mailchimpDomain = document.URL.replace(/\?.+/gi,"");
var listId = "?" + document.URL.match(/id=.+?\b/i)[0] + "&";
var listType = "type=active&";
var listSegment = "segment=";

console.log(mailchimpDomain);
console.log(listId);
console.log(listType);
console.log(listSegment);

var shareLinkBtn = document.createElement("div");
shareLinkBtn.className = "!margin-bottom--lv1 download-excel button download";
shareLinkBtn.innerText = "Copy Link";
createCopyBtn(shareLinkBtn, document.URL);
insertAfter(shareLinkBtn, document.querySelector("a[data-mc-group='exportLink']"));


function generateLink() {

  console.log("running generateLink");
  var listSegmentValues = "";

  // let rows = document.querySelectorAll(".segment-conditions > li");
  // for (let row of rows) {
  //
  //   let segments = row.querySelectorAll("div.segment-block select");
  //   for (let segment of segments) {
  //     console.log( segment.querySelector("option:checked").value );
  //     listSegmentValues += segment.querySelector("option:checked").value + ",";
  //   }
  //
  // }

  var row = document.querySelectorAll(".segment-conditions > li")[0]

  let segments = row.querySelectorAll("div.segment-block select, div.segment-block input");
  for (let segment of segments) {
    if (segment.tagName === "SELECT") {
      console.log( segment.querySelector("option:checked").value );
      listSegmentValues += segment.querySelector("option:checked").value + ",";
    } else {
      console.log( segment.value );
      listSegmentValues += segment.value + ",";
    }

  }

  listSegmentValues = listSegmentValues.replace(/,$/,"");

  var shareableLink = mailchimpDomain + listId + listType + listSegment + listSegmentValues;
  console.log(shareableLink);
  shareLinkBtn.dataset.copy = shareableLink;
}
