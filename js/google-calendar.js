console.info("google-calendar.js loaded");

calendarStyler();



// watch for element creation in the whole HTML document
document.arrive("#tgTable", function() {

  calendarStyler();

  console.log("arrived!");

});



function calendarStyler() {

  let calendarItems = document.querySelectorAll("dl > dd > div.cpchip > span");

  for (let calendarItem of calendarItems) {

    console.log(calendarItem);

    var itemText = calendarItem.textContent.trim();

    colorizer(calendarItem, itemText);

  }


  let calendarItems2 = document.querySelectorAll("dl > dt > span.chip-caption > span");

  for (let calendarItem2 of calendarItems2) {

    console.log(calendarItem2);

    var itemText = calendarItem2.textContent.trim();

    colorizer(calendarItem2, itemText);

  }


  console.log("styled");

}


function colorizer(el, string) {

  if ( /Test(ing)?\:/i.test(string) ) {
    el.closest("div.chip").classList.add("mod-testing");
  }

  if ( /List\:/i.test(string) ) {
    el.closest("div.chip").classList.add("mod-list");
  }

  else if ( /Schedule\:/i.test(string) ) {
    el.closest("div.chip").classList.add("mod-schedule");
  }

  else if ( /Build\:/i.test(string) ) {
    el.closest("div.chip").classList.add("mod-build");
  }

  else if ( /Edits\:/i.test(string) ) {
    el.closest("div.chip").classList.add("mod-edits");
  }

  else if ( /Special\:/i.test(string) ) {
    el.closest("div.chip").classList.add("mod-special");
  }

  else if ( /Reporting\:/i.test(string) ) {
    el.closest("div.chip").classList.add("mod-reporting");
  }

  else if ( /Planning\:/i.test(string) ) {
    el.closest("div.chip").classList.add("mod-planning");
  }

}






console.info("google-calendar.js ended");
