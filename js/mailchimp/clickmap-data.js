console.warn("js/mailchimp/clickmap-data.js loaded");

// Add the total clicks to the heatbar.

let heatBars = document.querySelectorAll(".heat-element");

for (let heatBar of heatBars) {
  if ( elExists(heatBar.querySelector(".heat-text")) ) {
    var totalClicks = heatBar.title.replace(/\s.+/gi,"");
    heatBar.querySelector(".heat-text").innerHTML = "<b style='font-weight:bold;'>" + totalClicks + "</b> <span style='color:rgba(0,0,0,0.5)'>(" + heatBar.querySelector(".heat-text").textContent + ")</span>";
  }
}
