console.warn("[sonic-toolkit-extension] loaded /js/mailchimp/mailchimp-import-history.js");
///////////////////////////////////////////////////////////////////////////////////////////

console.log( document.getElementById("imports-list") );

document.arrive("#imports-list > li:first-child", function(e) {

  console.log("import list arrived!");
  processHistoryList()

});

function processHistoryList() {

  let rows = document.querySelectorAll("#imports-list > li");
  for (let row of rows) {

    var icon = row.querySelector("div.line > div > span:first-child");

    if ( icon.classList.contains("undo-large") ) {
      row.classList.add("row-undo", "row-dim");
    }
    else if ( icon.classList.contains("tick-circle-large-color") ) {
      row.classList.add("row-tick");
    }
    else if ( icon.classList.contains("warn-circle-large-color") ) {
      row.classList.add("row-warn", "row-dim");
    } else {
      console.log("No match.")
    }

  }

}
