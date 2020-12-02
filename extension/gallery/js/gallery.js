console.warn("gallery/js/gallery.js loaded");
/*

  @TODO
  - Right-click context menu to handle interacting with frames
      - Open in new Korra tab
      - Open in new tab without Korra
      - Open in editor
      - Copy local link
      - Share with Dropbox
  - Queue ajax requests.
  - Save url, html, and metadata to indexeddb to avoid making future calls
  - build page async so that iframes load in as we get the html
  - even if we have 200 sets of html saved localy, make sure we load the iframes with a low threshhold.
    the html is still going to request images, we dont want to request images for 200 emails at once
  - create data structure to accept pasted in URLs with and without metadata
  - add filters based on available metadata

*/

const galleryContainer = document.getElementById("gallery");
const galleryWrapper = document.getElementById("gallery-wrapper");
const emailDefaultWidth = 720;

///////
///////
///////
// On initial load, request email URLs from the indexeddb via the background page
chrome.runtime.sendMessage({queryEmailTable: "oh hai mark"});


///////
///////
///////
const emailUrls = [

  "file:///Users/jameskupczak/Dropbox%20(MedBridge)/Channels/Email/Email%20Campaigns/Pardot/Webinars/Healthcare%20Delivery%20by%20Wager/Pre-Event/Series%201/Webinar_Campaign=Healthcare-Delivery-by-Wager_Timing=Pre-Event_Series=1_Group=A_List=Private-Practice;Hospital;Other-Group;Unknown_Sub=A.html",
  "file:///Users/jameskupczak/Dropbox%20(MedBridge)/Channels/Email/Email%20Campaigns/Pardot/Drips/Private%20Practice%20(Winter%202020)/Series%202/Drip-Series_Campaign=Private-Practice-(Winter-2020)_Audience=PP_Series=2_Sub=A.html",
  "file:///Users/jameskupczak/Dropbox%20(MedBridge)/Channels/Email/Email%20Campaigns/Pardot/Product%20Launch/Digital%20Care%20Delivery%20(2020-08)/Series%201/Product-Launch_Campaign=Digital-Care-Delivery_Audience=Engaged-Prospects-in-Hospital_Series=1_Group=A_Sub=N.html",
  "file:///Users/jameskupczak/Dropbox%20(MedBridge)/Channels/Email/Email%20Campaigns/Pardot/Webinars/Care%20Transitions%20by%20Falvey/Post-Event/Series%201/Care-Transitions-Webinar_Timing=Post-Event_Series=1_Group=A_Audience=Registrants-and-Attendees_Sub=S.html",
  "file:///Users/jameskupczak/Dropbox%20(MedBridge)/Channels/Email/Email%20Campaigns/Pardot/Product%20Launch/Patient%20Adherence%20Tracking/Non-Subscribers/PD_19-04-30_Type-Newsletter_Desc-Patient-Adherence-Product-Launch_ns.html",
  "file:///Users/jameskupczak/Dropbox%20(MedBridge)/Channels/Email/Email%20Campaigns/Pardot/Product%20Launch/Redox%20Partnership/Series%201/Product-Launch_Campaign=Redox-Partnership_Series=1_Group=A_Setting=All_Sub=A.html",
  "file:///Users/jameskupczak/Dropbox%20(MedBridge)/Channels/Email/Email%20Campaigns/Pardot/Product%20Launch/Telehealth%20Virtual%20Visits/Series%201/Product-Launch_Campaign=Telehealth-Virtual-Visits_Series=1_Group=A_Setting=All_Role=Executives_Sub=N.html",
  "file:///Users/jameskupczak/Dropbox%20(MedBridge)/Channels/Email/Email%20Campaigns/Pardot/Product%20Launch/Knowledge%20Track%20Library%20Version%202.0/PD_19-02-14_Type-Newsletter_Desc-Knowledge-Track-Library-Product-Launch_ns.html",
  "file:///Users/jameskupczak/Dropbox%20(MedBridge)/Channels/Email/Email%20Campaigns/Pardot/Autoresponders/Autoresponder%20-%20Webinar%20-%20Gawenda%20-%20E-Visits%20and%20Telehealth%20Series.html",
  "file:///Users/jameskupczak/Dropbox%20(MedBridge)/Channels/Email/Email%20Campaigns/Pardot/Conferences/NATA%202020/Pre-Event/Series%201/Conference_Campaign=NATA-2020-Virtual-Conference_Timing=Pre-Event_Series=1_Group=A_Split=A_List=Previous-Attendees;Athletics-Setting;ATs_Sub=N.html",
  "file:///Users/jameskupczak/Dropbox%20(MedBridge)/Channels/Email/Email%20Campaigns/Pardot/Product%20Launch/Business%20Recovery%20(2020-05)/Series%201/Solution_Campaign=Business-Recovery-Solution_Series=1_Group=A_Split=A_List=Private-Practice_Sub=N.html",
  "file:///Users/jameskupczak/Dropbox%20(MedBridge)/Channels/Email/Email%20Campaigns/Pardot/Webinars/Building%20Better%20Care%20by%20LaRaus/Post-Event/Series%201/Webinar_Building-Better-Care-by-LaRaus_Timing=Post-Event_Series=1_Group=A_List=Registered_Sub=S.html",
  "file:///Users/jameskupczak/Dropbox%20(MedBridge)/Channels/Email/Email%20Campaigns/Pardot/Other%20Campaigns/CMS%20Telehealth%20Announcement%20for%20Rehab%20Therapy/Email_CMS-Telehealth-Announcement-for-Rehab-Therapy_Series=1_Group=A_List=Hospital;PP;Other;Unknown;Athletics_Sub=A.html",
  "file:///Users/jameskupczak/Dropbox%20(MedBridge)/Channels/Email/Email%20Campaigns/Pardot/Other%20Campaigns/Telehealth%20Sale/Series%201/Sale_Campaign=Telehealth-Sale_Series=1_Group=A_List=Registered-for-Telehealth-Product-Webinar-and-No-Demo-Request_Sub=A.html",
  "file:///Users/jameskupczak/Dropbox%20(MedBridge)/Channels/Email/Email%20Campaigns/Pardot/Drips/Linda%20Shell%20Leadership/Series%201/Drip-Series_Campaign=Linda-Shell-Leadership_Series=1_Sub=N.html",
  "file:///Users/jameskupczak/Dropbox%20(MedBridge)/Channels/Email/Email%20Campaigns/Pardot/Drips/Private%20Practice%20(Winter%202020)/Series%201/Drip-Series_Campaign=Private-Practice-(Winter-2020)_Audience=PP_Series=1_Sub=A.html",
  "file:///Users/jameskupczak/Dropbox%20(MedBridge)/Channels/Email/Email%20Campaigns/Pardot/Drips/Fall%20Prevention%20Solution/Series%201/Drip-Series_Campaign=Fall-Prevention-Solution_Series=1_Audience=All_Sub=N.html",
  "file:///Users/jameskupczak/Dropbox%20(MedBridge)/Channels/Email/Email%20Campaigns/Pardot/Drips/Business%20Recovery%20Patient%20Marketing%20for%20Private%20Practice%20(Summer%202020)/Series%201/Drip_Campaign=Business-Recovery-Patient-Marketing-for-Private-Practice_Series=1_Sub=N.html",
  "file:///Users/jameskupczak/Dropbox%20(MedBridge)/Channels/Email/Email%20Campaigns/Pardot/Drips/Amy%20Lafko%20Leadership/Series%201/Drip_Campaign=Amy-Lafko-Leadership_Series=1_Sub=A.html",
  "file:///Users/jameskupczak/Dropbox%20(MedBridge)/Channels/Email/Email%20Campaigns/Pardot/Third-Party%20Emails/2020-06%20-%20HHCN/HTML-Version__MedBridge-Email-for-HHCN__Product-Launch_Campaign=Home-Health-Free-Trial-via-HHCN.html",
  "file:///Users/jameskupczak/Dropbox%20(MedBridge)/Channels/Email/Email%20Campaigns/Pardot/Product%20Launch/Redox%20Partnership/Series%201/Product-Launch_Campaign=Redox-Partnership_Series=1_Group=A_Setting=All_Sub=A.html",
  "file:///Users/jameskupczak/Dropbox%20(MedBridge)/Channels/Email/Email%20Campaigns/Pardot/Product%20Launch/MedBridge%20GO%20in%20Telehealth/Series%201/Product-Launch_Campaign=Telehealth-in-MedBridge-GO_Timing=Pre-Event_Series=1_Group=A_List=Current-Telehealth-Users_Sub=S.html",
  "file:///Users/jameskupczak/Dropbox%20(MedBridge)/Channels/Email/Email%20Campaigns/Pardot/Other%20Campaigns/COVID-19%20Education%20Resources/Series%201/Email_Campaign=COVID-19-Education-Resources_Series=1_Group=A_Audience=All_Sub=S.html",
  "file:///Users/jameskupczak/Dropbox%20(MedBridge)/Channels/Email/Email%20Campaigns/Pardot/Newsletter/2020-04-19%20-%20Weekly%20Promo/Series%201/Newsletter_Campaign=2020-04-19-Weekly-Promo_Series=1_Group=A_Setting=HH_Sub=A.html"
];

// function to create an iframe with supplied plaintext html code
// wraps a div around an iframe, injects it into the page, then uses document.write top load in code
var createFrame = function(payload) {

  const wrapper = document.createElement("div");
  wrapper.classList.add("wrapper");

  const iframe = document.createElement("iframe");

  iframe.sandbox = "allow-same-origin allow-scripts allow-popups allow-popups-to-escape-sandbox allow-modals allow-pointer-lock allow-top-navigation";
  iframe.src = "about:blank";
  iframe.dataset.localSrc = payload.url;
  iframe.localSrc = payload.url;

  wrapper.appendChild(iframe);
  galleryWrapper.appendChild(wrapper);

  iframe.contentWindow.document.open();
  iframe.contentWindow.document.write(payload.html);
  iframe.contentWindow.document.close();

};


// calculate width, height, and scaling values for iframes
const scaleFrame = function() {

  // galleryContainer.clientHeight

}


// function to retrieve the source code from a given html local file or web resource
const getHtml = function(url) {

  return new Promise(function (resolve, reject) {

    var xhr = new XMLHttpRequest();

    // The encoded
    xhr.open("GET", url, false); // true = async, false = sync

    // When xhring a local file, the response.status is 0
    xhr.onload = function (e) {

      if (this.response.length > 0) {

        // take the response we received (which will be html code) and pass it to the createFrame function
        createFrame({url: url, html: this.response});
        resolve(this.response);

      } else {

        console.log("missing");

        reject({
          status: this.status,
          statusText: xhr.statusText,
        });
      }
    };

    xhr.onerror = function () {

      reject({
        status: this.status,
        statusText: xhr.statusText,
      });
    };


    try {
      xhr.send();
    }
    catch(error) {
      displayErrorMsg("fileaccess");
      console.error(error);
      console.error(error.name);
      console.error(error.message);
      console.error(error.stack);
    }

  });

};


// loop through all file urls and fetch them
emailUrls.forEach(function (url, index) {
	getHtml(url);
});



//
document.getElementById("controls").addEventListener("click", function() {
  console.log(event);

  if ( event.target.dataset.control ) {
    if ( event.target.dataset.control === "zoom" ) {
      console.log("zoom");
      galleryContainer.dataset.zoom = event.target.dataset.controlZoom;
    }
    if ( event.target.dataset.control === "direction" ) {
      console.log("direction");
      galleryContainer.dataset.direction = event.target.dataset.controlDirection;
    }
    if ( event.target.dataset.control === "format" ) {
      console.log("format");
      galleryContainer.dataset.format = event.target.dataset.controlFormat;
    }
    if ( event.target.dataset.control === "grid" ) {
      console.log("grid");
      galleryContainer.dataset.grid = event.target.dataset.controlGrid;
    }
    if ( event.target.dataset.control === "scroll" ) {
      console.log("scroll");
      scrollPosition(event.target.dataset.controlScroll);
    }
  }

}, false);


//
const scrollPosition = function(value) {

  let frames = document.querySelectorAll("iframe");

  frames.forEach(function (frame, index) {
    if ( value === "b" ) {
      frame.contentWindow.scrollTo(0,frame.contentDocument.body.scrollHeight);
    }
    else {
      frame.contentWindow.scrollTo(0,0);
    }

  });

}
