
var runEmailGrabberBtn = document.createElement("div");
runEmailGrabberBtn.onclick = runEmailGrabber;
runEmailGrabberBtn.innerText = "Extract Emails";
runEmailGrabberBtn.style = "display:inline-block; padding:10px 14px; background:rgb(106, 205, 52); color:#fff; font-weight:bold; border-radius:4px; margin:5px 0 0 5px; cursor:pointer; font-size:14px;"


  var theIframe = document.querySelector(".bodyStatisticsSubscribersForm");
  insertBefore(runEmailGrabberBtn, theIframe);




function runEmailGrabber() {

  let emails = document.querySelectorAll("#statTable td small");

  for (let email of emails) {
    console.log( email.innerText );
  }

  var nextBtn = document.querySelector("a[title='Next']");

  nextBtn.href = nextBtn.href + "&sonic=grab";

  nextBtn.click();

}


if ( /sonic=grab/.test(document.URL) ) {
  runEmailGrabber();
}
