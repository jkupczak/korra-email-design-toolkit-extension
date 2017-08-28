console.warn("[sonic-toolkit-extension] loaded /js/google-calendar.js");
////////////////////////////////////////////////////////////////////////


var mainCal = document.querySelector(".calList .calListRow:first-child div.calLabelListText");
console.error(mainCal.textContent);

if ( mainCal.textContent === "James Kupczak" ) {
  var mainCalColor = mainCal.previousElementSibling.style.background;
  console.error(mainCalColor);
}


calendarStyler();




// watch for element creation in the whole HTML document
document.arrive(".bubble .gcalOptionList", function() {

  console.log("bubble arrived!");

  // Make "Work Schedule" the default calendar selected when creating a new event through the popup.
  document.querySelector(".bubble .gcalOptionList .gcalOption[aria-label='Work Schedule']").classList.toggle("gcalSelected");
  document.querySelector(".bubble .gcalOptionList .gcalOption[aria-label='James Kupczak']").classList.toggle("gcalSelected");

});


// watch for element creation in the whole HTML document
document.arrive("#tgTable", function() {

  calendarStyler();

  console.log("arrived!");

});



function calendarStyler() {

  // Mark my primary calendar
  let meetings = document.querySelectorAll("#tgTable .tg-gutter > div.chip > dl:first-child");
  for (let meeting of meetings) {

    console.log(meeting);

    if ( meeting.style.backgroundColor === mainCalColor || meeting.style.backgroundColor === "rgb(203, 191, 193)" ) {
      meeting.closest("div.chip").classList.add("mod-meeting");
    } else {
      meeting.closest("div.chip").classList.add("mod-work");
    }

    if ( /OOO Traveling/i.test(meeting.textContent.trim())  ) {
      meeting.style.display = "none";
    }

  }


  let calendarItems = document.querySelectorAll("#tgTable dl > dd > div.cpchip .evt-lk");

  for (let calendarItem of calendarItems) {

    console.log(calendarItem);

    var itemText = calendarItem.textContent.trim();

    colorizer(calendarItem, itemText);

  }


  let calendarItems2 = document.querySelectorAll("#tgTable dl > dt > span.chip-caption > span");

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
      el.closest("div.chip").classList.remove("mod-meeting");
  }

  if ( /Lists?\:/i.test(string) ) {
    el.closest("div.chip").classList.add("mod-list");
      el.closest("div.chip").classList.remove("mod-meeting");
  }

  else if ( /Schedul(e|ing)\:/i.test(string) ) {
    el.closest("div.chip").classList.add("mod-schedule");
      el.closest("div.chip").classList.remove("mod-meeting");
  }

  else if ( /Build\:/i.test(string) ) {
    el.closest("div.chip").classList.add("mod-build");
      el.closest("div.chip").classList.remove("mod-meeting");
  }

  else if ( /Edits?\:/i.test(string) ) {
    el.closest("div.chip").classList.add("mod-edits");
      el.closest("div.chip").classList.remove("mod-meeting");
  }

  else if ( /Special\:/i.test(string) ) {
    el.closest("div.chip").classList.add("mod-special");
      el.closest("div.chip").classList.remove("mod-meeting");
  }

  else if ( /QA\:/i.test(string) ) {
    el.closest("div.chip").classList.add("mod-qa");
      el.closest("div.chip").classList.remove("mod-meeting");
  }

  else if ( /Report(s|ing)?\:/i.test(string) ) {
    el.closest("div.chip").classList.add("mod-reporting");
      el.closest("div.chip").classList.remove("mod-meeting");
  }

  else if ( /Planning\:/i.test(string) ) {
    el.closest("div.chip").classList.add("mod-planning");
      el.closest("div.chip").classList.remove("mod-meeting");
  }

  else if ( /Reminder\:/i.test(string) ) {
    el.closest("div.chip").classList.add("mod-reminder");
      el.closest("div.chip").classList.remove("mod-meeting");
  }

}






console.info("google-calendar.js ended");
