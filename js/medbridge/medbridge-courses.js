console.warn("[sonic-toolkit-extension] loaded /js/medbridge/medbridge-courses.js - v2");
////////////////////////////////////////////////////////////////////////////////////////

if ( /courses\/details/gi.test(document.URL) ) {
  var courseDetail = true;
} else {
  var courseDetail = false;
}



// HTML Tidy for HTML5 - Fork compiled from C
// The original project is NOT written in javascript.
// https://www.npmjs.com/package/tidy-html5
// !!! - http://lovasoa.github.io/tidy-html5/quickref.html
// http://lovasoa.github.io/tidy-html5/
// https://github.com/lovasoa/tidy-html5
// https://stackoverflow.com/questions/12843252/html-tidy-new-empty-line-after-closing-tags
options = {
  "clean":false,
  "indent":true,
  "indent-spaces":2,
  "wrap":0,
  "markup":true,
  "output-xml":false,
  "output-html":true,
  "numeric-entities":true,
  "quote-marks":true,
  "quote-nbsp":false,
  "preserve-entities":true,
  "show-body-only":true,
  "quote-ampersand":false,
  "break-before-br":true,
  "drop-font-tags":false, // Actually drops <b> tags too.
  "drop-empty-elements":false
}

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////                                ////////////////////////
///////////////////////      MEDBRIDGE-COURSES.JS      ////////////////////////
///////////////////////                                ////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//
//  TO-DO LIST
//  ==========
//
//  ## Use localStorage to persist selections through page loads.
//
//  ## Load a modal on course addition if that course isn't approved. Ask for confirmation before adding it.
//
//  ## Figure out why the CSS isn't immediately applying to courses that aren't approved.
//
//  ##
//
//  ##
//
//  ##
//
//  ##
//
//  ##
//
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////



// Export Single Module
////
////
function exportSingleModule() {

  // GA
  if ( trackingModNumberInput.value !== "" ) {
    if ( audienceInput.value === "non-subscribers" ) {
      var gaTracking = "&utm_content=mod" + trackingModNumberInput.value;
    } else {
      var gaTracking = "?utm_content=mod" + trackingModNumberInput.value;
    }
  } else {
    var gaTracking = "";
  }

  // CTA Text
  if ( audienceInput.value === "non-subscribers" ) {
    var ctaText = "Start for Free"
  } else {
    var ctaText = "Start Now"
  }


  if ( courseDetail ) {

    var courseTitle = document.querySelector(".course-details__section h1").textContent;
    console.log(courseTitle);

    var courseImgSrc = document.querySelectorAll("#video_location .jw-preview")[0].style.backgroundImage;
    courseImg = courseImgSrc;
    courseImg = courseImg.replace(/(^.+?"|"\))/gi, "");
    console.log(courseImg);

    var courseLinkPath = window.location.pathname.replace(/^\//,"");
    // var courseShortLink = document.URL.replace(/^.+?\.com\//gi,"");
    // var courseShortLink = "courses/details/" + courseImgSrc.match(/\/\d+?\//g)[0].replace(/\//g,"");
    console.log(courseLinkPath);

    var courseInstructor = "";
    let instructors = document.querySelectorAll(".media-item--instructor h3 a");
    for (let instructor of instructors) {
      courseInstructor += instructor.textContent + " & ";
    }
    courseInstructor = courseInstructor.replace(/ & $/gi, "");
    console.log(courseInstructor);

  } else {

    var parentCourse = this.closest(".course-parent");
    var courseTitle = parentCourse.dataset.title;
    var courseImg = parentCourse.dataset.img;
    var courseInstructor = parentCourse.dataset.instructor;
    var courseLinkPath = parentCourse.dataset.link;

  }

  // Course Link

  // MedBridge Subscribers && Outside Organization
  if ( whitelabelingInput.value !== 'www' || audienceInput.value === "subscribers" ) {

    // var courseLink = "https://" + whitelabelingInput.value + ".medbridgeeducation.com/sign-in?after_signin_url=" + courseLinkPath + gaTracking;
    var courseLink = "https://" + whitelabelingInput.value + ".medbridgeeducation.com/" + courseLinkPath + gaTracking;

  // MedBridge Non-Subscribers
  } else if ( audienceInput.value === "non-subscribers" ) {

    var courseLink = "https://www.medbridgeeducation.com/" + trackingURLInput.value + "/?after_affiliate_url=" + courseLinkPath + gaTracking;

  }


  var apos = "'";
  if ( selectLayout.value === "col" ) {
    // Columns
    var singleModule = '<table role="presentation" cellpadding="0" cellspacing="0" align="left" class="fullWidth course-module-wrapper" width="174" style="width: 174px; min-width: 174px"><tr><td class="pt-2"><table role="presentation" cellpadding="0" cellspacing="0" width="100%" align="center"><tr><td><a href="' + courseLink + '" style="text-decoration: none; color: #FFFFFF"><img src="' + courseImg + '" alt="" class="respImg box-shadow" width="174" height="98" style="width: 174px; min-width: 174px; background-color: #CCCCCC"></a></td></tr></table></td></tr><tr><td class="course-title text-center" style="padding-top:10px; font-size: 14px; line-height: 20px; color: #434343"><b>' + courseTitle + '</b></td></tr><tr><td class="course-instructor text-center" style="padding-top: 2px; font-size: 13px; line-height: 20px; color: #434343">' + courseInstructor + '</td></tr><tr><td class="course-cta text-center" style="padding-top: 10px; font-size: 16px; line-height: 20px; color: #2f76bb"><a href="' + courseLink + '" style="text-decoration: none; color: #2f76bb"><b>' + ctaText + '</b></a></td></tr></table>'
  } else {
    // Rows
    var singleModule = '<table role="presentation" cellpadding="0" cellspacing="0" width="100%"><tr><td align="left" style="border-top: 1px solid #EAEAEA; padding: 15px 0px 10px 0px"><table role="presentation" cellpadding="0" cellspacing="0" class="fullWidth" width="560" style="width: 560px; min-width: 560px"><tr><td align="left"><table role="presentation" cellpadding="0" cellspacing="0" align="left" class="fullWidth" width="125" style="width: 125px; min-width: 125px"><tr><td align="center"><table role="presentation" cellpadding="0" cellspacing="0" width="100%"><tr><td align="center" style="padding-bottom: 10px"><a href="' + courseLink + '" style="text-decoration: none; color: #434343"><img src="' + courseImg + '" class="respImg75" alt="" width="125" height="72" style="width: 125px; min-width: 125px"></a></td></tr></table></td></tr></table><!--[if gte mso 9]></td><td align="left" width="320"><![endif]--><table role="presentation" cellpadding="0" cellspacing="0" align="left" class="fullWidth" width="320" style="width: 320px; min-width: 320px"><tr><td align="center"><table role="presentation" cellpadding="0" cellspacing="0" width="100%"><tr><td class="text-center" align="left" style="padding-left: 10px; padding-right: 10px; font-size: 18px;line-height: 23px;color: #434343"><a href="' + courseLink + '" style="text-decoration: none; color: #434343"><b>' + courseTitle + '</b></a></td></tr><tr><td class="text-center" align="left" style="padding-left: 10px; padding-right: 10px; font-size: 15px; line-height: 25px;color: #777777"><a href="' + courseLink + '" style="text-decoration: none; color: #777777">presented by ' + courseInstructor + '</a></td></tr></table></td></tr></table><!--[if gte mso 9]></td><td align="right" width="115"><![endif]--><table role="presentation" cellpadding="0" cellspacing="0" align="right" class="fullWidth" width="115" style="width: 115px; min-width: 115px"><tr><td align="right" style="padding-top: 10px"><table role="presentation" cellpadding="0" cellspacing="0" width="100%"><tr><td class="text-center" align="right" style="padding-top: 2px; padding-bottom: 15px; font-size: 16px; line-height: 21px"><a href="' + courseLink + '" style="text-decoration: none; color: #076AD2"><b>' + ctaText + '&nbsp;&rarr;</b></a></td></tr></table></td></tr></table></td></tr></table></td></tr></table>';
  }

  console.groupCollapsed("tidy");
  // console.log(singleModule);
  singleModule = tidy_html5(singleModule, options);
  singleModule = singleModule.replace(/&#39;/gi,"'");
  console.log(singleModule);
  console.groupEnd();

  copyToClipboard(singleModule);

}




// var todaysYear = currentTime.getFullYear().toString().replace("20","");

if ( localStorage.getItem("setTrackingUrl") || localStorage.getItem("setTrackingUrl") === "" ) {
  var todaysLink = localStorage.getItem("setTrackingUrl");
} else {
  // Return today's date and time
  var currentTime = new Date();
  var todaysLink = "trk-disc-" + getMonthAbbr(currentTime) + "-" + currentTime.getFullYear().toString().replace("20","") + "-";
}

if ( localStorage.getItem("setModuleNumber") || localStorage.getItem("setModuleNumber") === "" ) {
  var defaultModuleNumber = localStorage.getItem("setModuleNumber");
} else {
  var defaultModuleNumber = "2";
}

// if ( sessionStorage.getItem("setTrackingUrl") || sessionStorage.getItem("setTrackingUrl") === "" ) {
//   var todaysLink = sessionStorage.getItem("setTrackingUrl");
// } else {
//   // Return today's date and time
//   var currentTime = new Date();
//   var todaysLink = "trk-" + getMonthAbbr(currentTime) + "-" + currentTime.getFullYear().toString().replace("20","") + "-";
// }


var settingsBar = document.createElement("div");
    settingsBar.className = "course-settings";
    settingsBar.innerHTML = '<div class="settings-group settings-whitelabel"><div class="settings-label">Whitelabeling</div><div class="settings-controls"><select id="select-whitelabel"><option value="www">MedBridge</option><option value="foxrehab">Fox</option><option value="drayerpt">Drayer</option><option value="healthsouth">HealthSouth</option></select></div></div><div class="settings-group settings-audience"><div class="settings-label">Audience</div><div class="settings-controls"><select id="select-audience"><option value="non-subscribers">Non-Subscribers</option><option value="subscribers">Subscribers</option></select></div></div><div class="settings-group settings-layout"><div class="settings-label">Layout</div><div class="settings-controls"><select id="select-layout"><option value="col">Columns</option><option value="row">Rows</option></select></div></div><div class="settings-group settings-tracking"><div class="settings-label">Marketing URL</div><div class="settings-controls"><input id="set-tracking-url" type="text" value="' + todaysLink + '"></div></div><div class="settings-group settings-module-number"><div class="settings-label">Mod #</div><div class="settings-controls"><input id="tracking-mod-number" type="text" value="' + defaultModuleNumber + '"></div></div>'

document.body.appendChild(settingsBar);


// If we're on a course details page, make an export button and append it to the settings bar we just created.
if ( courseDetail ) {
  settingsBar.innerHTML += '<div class="settings-group export-btn"><div style="width:120px; padding:12px 0" class="btn btn-primary btn-block smtm">Export Course</div></div>';
  // Export Course btn
  var exportCoursebtn = document.querySelector(".export-btn");
  exportCoursebtn.addEventListener("click", exportSingleModule, false);
}

var whitelabelingInput     = document.getElementById("select-whitelabel");
var audienceInput          = document.getElementById("select-audience");
var trackingURLInput       = document.getElementById("set-tracking-url");
var trackingModNumberInput = document.getElementById("tracking-mod-number");






//////////////////////////////////////
////////////////////
////////////////////   SAVE SETTINGS
////////////////////
//////////////////////////////////////

// Save settings to sessionStorage
trackingURLInput.addEventListener("blur", saveURLtoSession, false);
function saveURLtoSession() {
  if ( !this.value ) {
    var savedVal = "";
  } else {
    var savedVal = this.value;
  }
  // sessionStorage.setItem("setTrackingUrl", savedVal);
  localStorage.setItem("setTrackingUrl", savedVal);
}

function toggleMarketingURLInput() {
  console.log("toggleMarketingURLInput()");
  if ( whitelabelingInput.value === "www" && audienceInput.value === "non-subscribers" ) {
    console.log("re-enable");
    document.querySelectorAll('.settings-tracking')[0].style.opacity = "";
    trackingURLInput.disabled = false;
    trackingURLInput.style.background = "";
    trackingURLInput.style.pointerEvents = "";
    trackingURLInput.style.userSelect = "";
  } else {
    console.log("disable");
    document.querySelectorAll('.settings-tracking')[0].style.opacity = "0.5";
    trackingURLInput.disabled = true;
    trackingURLInput.style.background = "#CCCCCC";
    trackingURLInput.style.pointerEvents = "none";
    trackingURLInput.style.userSelect = "none";
  }

}

///// Audience
function logAudienceValue() {
  switch (this.value) {
    case 'non-subscribers':
      whitelabelingInput.getElementsByTagName('option')[0].selected = 'selected';
      toggleMarketingURLInput();
      break;
    case 'subscribers':
      toggleMarketingURLInput();
      break;
  }
}
audienceInput.addEventListener('change', logAudienceValue, false);

///// Whitelabel
function logWhitelabelValue() {
  if ( this.value !== "www" ) {
    audienceInput.getElementsByTagName('option')[1].selected = 'selected';
    document.getElementById('select-layout').getElementsByTagName('option')[1].selected = 'selected';
    toggleMarketingURLInput();
    trackingModNumberInput.value = '';
  } else {
    audienceInput.getElementsByTagName('option')[0].selected = 'selected';
    toggleMarketingURLInput();
    document.getElementById('select-layout').getElementsByTagName('option')[0].selected = 'selected';
  }
}
whitelabelingInput.addEventListener('change', logWhitelabelValue, false);

///// Module #
trackingModNumberInput.addEventListener("blur", saveModuletoStorage, false);
function saveModuletoStorage() {
  if ( !this.value ) {
    var savedVal = "";
  } else {
    var savedVal = this.value;
  }
  // sessionStorage.setItem("setTrackingUrl", savedVal);
  localStorage.setItem("setModuleNumber", savedVal);
}

///// Layout
var selectLayout = document.getElementById('select-layout');
selectLayout.addEventListener("change", saveLayoutToStorage, false);
function saveLayoutToStorage() {
  console.log(this, this.value);
  if ( !this.value ) {
    var savedVal = "";
  } else {
    var savedVal = this.value;
  }
  // sessionStorage.setItem("setTrackingUrl", savedVal);
  localStorage.setItem("setLayout", savedVal);
}





// function cancelClick() {
//   return false;
// };

//
// Apply check tool to each course as it loads in
//
// https://hacks.mozilla.org/2012/05/dom-mutationobserver-reacting-to-dom-changes-without-killing-browser-performance/
//

    // // select the target node to watch
    // var targetNew = document.querySelector('div.ng-scope > div.row:nth-child(3)');
    //
    // // create an observer instance
    // var observerNew = new MutationObserver(function(mutations) {
    //
    //     console.log("observer activated");
    //
    //     mutations.forEach(function(mutation) {
    //         console.log(mutation.type);
    //     });
    // });
    //
    // // configuration of the observer:
    // var configNew = { attributes: true, childList: true, characterData: true }
    // // pass in the target node, as well as the observer options
    // observerNew.observe(targetNew, configNew);


//////
//////
////// Search for the courses being loaded in.
if ( !courseDetail ) {

    // configuration of the observer:
    var config = { attributes: true, childList: true, characterData: true }


    // select the target node to watch
    var targetLoad = document.querySelector('div.ng-scope > div.row:nth-child(3)');
    // create an observer instance
    var observerLoad = new MutationObserver(function(mutations) {
        console.log("observerLoad activated");
        applyCourseTool();

        console.groupCollapsed("Observer Findings");
        mutations.forEach(function(mutation) { console.log("observer found this: " + mutation.type); });
        console.groupEnd();
    });
    // pass in the target node, as well as the observer options
    observerLoad.observe(targetLoad, config);


    // When the discipline is changed using the left menu, a parent element is changed too. So we need to listen for that. Then when it happens, find the child element that is the new parent of the course list, apply it to a variable, and restart observing it.
    var targetDiscChange = document.querySelector('div.catalogue-main > div.ng-scope:first-child');
    var observerChange = new MutationObserver(function(mutations) {
        console.log("observerChange activated");

        observerLoad.disconnect(); // Seems like this would be the right thing to do and it doesn't seem to break anything.

        var targetNewLoad = document.querySelector('div.ng-scope > div.row:nth-child(3)'); // Find the newly loaded course parent.
        observerLoad.observe(targetNewLoad, config); // Start observing it.

        mutations.forEach(function(mutation) { console.log(mutation.type); });
    });
    observerChange.observe(targetDiscChange, config);
}
/////
/////






    // Run this function to check each relevant div in the code and then add the proper html to it
    ////
    ////
    function applyCourseTool() {


      let courseWrapperList = document.querySelectorAll('.row > .ng-scope > .ng-scope > .course-listing__wrapper');
      for (let courseWrapper of courseWrapperList) {

        if ( !elExists(courseWrapper.querySelector(".quick-info")) ) {

          // wrapper
          var quickInfo = document.createElement("div");
          quickInfo.className = "quick-info";

          // Find URL
          if ( elExists(courseWrapper.querySelector(".course-listing__text > a")) ) {

            var ngHref = courseWrapper.querySelector(".course-listing__text > a").getAttribute("ng-href");
            if ( ngHref ) {

              var smallCourseImg = courseWrapper.querySelector(".course-listing__img").src;
              var thisCourseId = smallCourseImg.match(/\/\d+?\//g)[0].replace(/\//g,"");

              // var thisCourseImg = courseWrapper.querySelector(".course-listing__img").src;
              var thisCourseImg = "https://medbridgeuploads.s3.amazonaws.com/Course/" + thisCourseId + "/title_hero.jpg"

              // copy ID
              var copyId = document.createElement("a");
              copyId.innerHTML = thisCourseId;
              copyId.className = "quick-copy course-id";
              createCopyBtn(copyId, thisCourseId);
              quickInfo.appendChild(copyId);

              // Copy Link
              var quickCourseLink = document.createElement("div");
              quickCourseLink.innerHTML = "URL";
              quickCourseLink.className = "quick-copy course-link";
              createCopyBtn(quickCourseLink, window.location.pathname);
              quickInfo.appendChild(quickCourseLink);

            }

          } else { console.log("link not found") }

          // img
          var quickImgLink = document.createElement("div");
          quickImgLink.innerHTML = "Image";
          quickImgLink.className = "quick-copy img-link";
          createCopyBtn(quickImgLink, courseWrapper.querySelector(".course-listing__img").src);
          quickInfo.appendChild(quickImgLink);

          // instructor
          if ( elExists(courseWrapper.querySelector(".course-listing__instructors span")) ) {

            var instructorQuickLink = document.createElement("div");
            instructorQuickLink.innerHTML = "Instructor";
            instructorQuickLink.className = "quick-copy instructor-link";
            createCopyBtn(instructorQuickLink, courseWrapper.querySelector(".course-listing__instructors span").textContent);
            quickInfo.appendChild(instructorQuickLink);

          } else { console.log("instructor not found") }


          // title
          var titleQuickLink = document.createElement("div");
          titleQuickLink.innerHTML = "Title";
          titleQuickLink.className = "quick-copy title-link";
          createCopyBtn(titleQuickLink, courseWrapper.querySelector(".course-listing__title").textContent);
          quickInfo.appendChild(titleQuickLink);

          // export module
          var exportModule = document.createElement("a");
          exportModule.className = "export-course-btn jk-hover-pointer";
          exportModule.innerHTML = "<span class='icomoon icomoon-embed jk-hover-pointer jk-flex-right'></span>Export";
          exportModule.onclick = exportSingleModule;
          quickInfo.appendChild(exportModule);

          //
          courseWrapper.appendChild(quickInfo);

        }

      }


      console.groupCollapsed("applyCourseTool() function");


      let courseParents = document.querySelectorAll('.row[infinite-scroll-container] > .ng-scope');
      for (let courseParent of courseParents) {

        var dataSetLink = courseParent.querySelector(".course-listing__media a").getAttribute("ng-href");

        if ( dataSetLink ) {

          var thisCourseImg = courseParent.querySelector(".course-listing__media a img").src;
          var thisCourseId = thisCourseImg.match(/\/\d+?\//g)[0].replace(/\//g,"");

          // Update course image to be the large version
          // Only required for the Courses page, not courses/details page.
          thisCourseImg = thisCourseImg.replace(/\.com\/Course\/\d+?\//gi, ".com/Course/" + thisCourseId + "/").replace(/_catalog\./gi, "_hero.");

          courseParent.classList.add("course-parent");
          courseParent.dataset.title = courseParent.querySelector(".course-listing__title").textContent;
          courseParent.dataset.img = thisCourseImg;
          courseParent.dataset.id = thisCourseId;
          courseParent.dataset.link = window.location.pathname.replace(/^\//,"");

          // Author may be more than one and exist in two separate spans. Grab all of them and then loop through them.
          let authorList = courseParent.querySelectorAll(".course-listing__instructors span");
          var author = "";

            if ( typeof(authorList) != 'undefined' && authorList != null ) {
              for (let value of authorList) {
                author += value.innerText;
              }
            } else {
              author = "";
            }
          courseParent.dataset.instructor = author;
        }
      }



      let courseList = document.querySelectorAll('.row > .ng-scope > .ng-scope > .ng-scope .course-listing');
      for (let course of courseList) {

        if ( course.classList.contains("course-wrapper") ) {
          // Course has already been styled, do nothing.
          console.log("applyCourseTool() skipped course");
        } else {

        }

        setTimeout(function() {
          var unapprovedElem = course.querySelector('[ng-include*="catalog_display_accreditation"] [ng-if*="unapproved"]');
          var pendingElem = course.querySelector('[ng-include*="catalog_display_accreditation"] [ng-if*="pending"]');
          var complianceElem = course.querySelector('[ng-include*="catalog_display_accreditation"] [ng-if*="compliance"]');
          if ( (typeof(unapprovedElem) != 'undefined' && unapprovedElem != null) || (typeof(pendingElem) != 'undefined' && pendingElem != null) || (typeof(complianceElem) != 'undefined' && complianceElem != null) ) {
            course.classList.add("unapproved");
          }
        }, 500);


      }
      console.groupEnd();
    };


//startSimulation and pauseSimulation defined elsewhere
function handleVisibilityChange() {
  if (document.hidden) {
    console.log("page hidden");
  } else  {
    console.log("page visible");
    checkStorage();
  }
}

function checkStorage() {

  console.log("checking storage...");

  if ( localStorage.getItem("setTrackingUrl") || localStorage.getItem("setTrackingUrl") === "" ) {
    trackingURLInput.value = localStorage.getItem("setTrackingUrl")
    console.log("setTrackingUrl")
  };

  if ( localStorage.getItem("setModuleNumber") || localStorage.getItem("setModuleNumber") === "" ) {
    trackingModNumberInput.value = localStorage.getItem("setModuleNumber")
    console.log("setModuleNumber")
  };

  if ( localStorage.getItem("setLayout") === "row" ) {

    document.getElementById('select-layout').getElementsByTagName('option')[1].selected = 'selected';
    console.log("setLayout");

  } else {

    document.getElementById('select-layout').getElementsByTagName('option')[0].selected = 'selected';
    console.log("setLayout");

  }

}


document.addEventListener("visibilitychange", handleVisibilityChange, false);
