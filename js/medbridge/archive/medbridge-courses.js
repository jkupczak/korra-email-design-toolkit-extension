console.warn(">>> medbridge-courses.js loaded");

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
  "indent":true,
  "indent-spaces":2,
  "wrap":0,
  "markup":true,
  "output-xml":false,
  "numeric-entities":true,
  "quote-marks":true,
  "quote-nbsp":false,
  "preserve-entities":true,
  "show-body-only":true,
  "quote-ampersand":false,
  "break-before-br":true,
  "drop-font-tags":true,
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
//  ## Warn if an instructor is selected twice.
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
  if ( document.querySelector("#tracking-mod-number").value !== "" && selectWhitelabel.value === "www" ) {
    var gaTracking = "utm_content=mod" + document.querySelector("#tracking-mod-number").value + "-conted-course";
  } else {
    var gaTracking = "";
  }

  // CTA Text
  if ( selectAudience.value === "non-subscribers" ) {
    var ctaText = "Start for Free"
  } else {
    var ctaText = "Start Now"
  }


  if ( courseDetail ) {

  var courseTitle = document.querySelector(".course-details__section h1").textContent;
    console.log(courseTitle);

    var courseImg = document.querySelector("#video_player_1").style.backgroundImage;
    courseImg = courseImg.replace(/_hero\./gi, "_catalog.");
    courseImg = courseImg.replace(/(^.+?"|"\))/gi, "");
    console.log(courseImg);

    var courseShortLink = document.URL.replace(/^.+?\.com\//gi,"");

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
    var courseShortLink = parentCourse.dataset.link;

  }

  // Course Link
  if ( document.querySelector("#set-tracking-url").value !== "" ) {
    gaTracking = "&" + gaTracking;
    var courseLink = "https://" + selectWhitelabel.value + ".medbridgeeducation.com/" + document.querySelector("#set-tracking-url").value + "/?after_affiliate_url=" + courseShortLink + gaTracking;
  } else {
    if ( gaTracking !== "" ) {
      gaTracking = "?" + gaTracking;
    }
    var courseLink = "https://" + selectWhitelabel.value + ".medbridgeeducation.com/" + courseShortLink + gaTracking;
  }


  if ( selectLayout.value === "col" ) {
    var singleModule = '<table border="0" cellpadding="0" cellspacing="0" width="174" class="fullWidth course-module-wrapper" align="left" style="width: 174px; min-width: 174px;"><tr><td align="center" valign="top" class="fullWidth course-module-inner"><!-- // Content Wrap --><table border="0" cellpadding="0" cellspacing="0" align="center"><tr><td valign="top" align="center"><a href="' + courseLink + '" style="text-decoration: none; color: #ffffff;" target="_blank"><img src="' + courseImg + '" alt="" class="respImg" width="174" height="98" hspace="0" vspace="0" style="width: 174px; min-width: 174px; -ms-interpolation-mode: bicubic; border:0; outline: none; background-color: #cccccc; display: block;"></a></td></tr></table></td></tr><tr><td data-sub-mod="title" valign="top" class="course-title textCenter" align="left" style="padding-top:10px; font-size: 14px; line-height: 20px; color: #434343;"><span style="font-family: Roboto, Helvetica, Arial, sans-serif !important; font-weight:500;">' + courseTitle + '</span></td></tr><tr><td data-sub-mod="instructor" valign="top" class="course-instructor textCenter" align="left" style="padding-top: 2px; font-size: 13px; line-height: 20px; color: #434343;"><span style="font-family: Roboto, Helvetica, Arial, sans-serif !important; font-weight:300;">' + courseInstructor + '</span></td></tr><tr><td data-sub-mod="cta" valign="top" class="course-cta textCenter" align="left" style="padding-top: 10px; font-size: 16px; line-height: 20px; font-family: Roboto, Helvetica, Arial, sans-serif; color: #2f76bb; font-weight: 500;"><a href="' + courseLink + '" style="text-decoration: none; color: #2f76bb;" target="_blank"><span style="font-family: Roboto, Helvetica, Arial, sans-serif !important;">' + ctaText + '</span></a></td></tr></table>'
  } else {
    var singleModule = '<table cellpadding="0" cellspacing="0" border="0" width="100%" class="fullWidth"><tr><td valign="top" align="left" style="border-top: 1px solid #eaeaea; padding: 15px 0px 10px 0px;"><table data-sub-mod="course" border="0" cellpadding="0" cellspacing="0" width="590" class="fullWidth" style="border-collapse: separate; width: 590px; min-width: 590px;"><tr><td valign="top" align="left"><table border="0" cellpadding="0" cellspacing="0" width="125" class="fullWidth" align="left" style="border-collapse: separate; width: 125px; min-width: 125px;"><tr><td valign="top" align="center"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td valign="top" align="center" style="padding-bottom: 10px;"><a href="' + courseLink + '" style="text-decoration: none; color: #000001;" target="_blank"><img src="' + courseImg + '" class="img218" alt="" title="" width="125" height="72" hspace="0" vspace="0" style="width: 125px; min-width: 125px; -ms-interpolation-mode: bicubic; border:0; outline: none; display: block;" /></a></td></tr></table></td></tr></table><!--[if gte mso 9]></td><td valign="top" align="left" width="330" style="width: 330px; min-width: 330px;"><![endif]--><table border="0" cellpadding="0" cellspacing="0" width="330" class="fullWidth" align="left" style="border-collapse: separate; width: 330px; min-width: 330px;"><tr><td class="courseDescCell" valign="top" align="center"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td data-sub-mod="course-title" class="textCenter" valign="top" align="left" style="padding-left: 10px; padding-right: 10px; font-family: Helvetica, Arial, sans-serif;font-weight: 400;font-size: 18px;line-height: 23px;color: #434343;"><a href="' + courseLink + '" style="text-decoration: none; color: #434343; font-family: Roboto, Helvetica, Arial, sans-serif !important;" target="_blank">' + courseTitle + '</a></td></tr><tr><td data-sub-mod="author" class="textCenter" valign="top" align="left" style="padding-left: 10px; padding-right: 10px; font-family: Helvetica, Arial, sans-serif;font-weight: 300;font-size: 16px;line-height: 21px;color: #777777;"><a href="' + courseLink + '" style="text-decoration: none; color: #777777; font-family: Roboto, Helvetica, Arial, sans-serif !important;" target="_blank">presented by ' + courseInstructor + '</a></td></tr></table></td></tr></table><!--[if gte mso 9]></td><td valign="top" align="left" width="135" style="width: 135px; min-width: 135px;"><![endif]--><table border="0" cellpadding="0" cellspacing="0" width="135" class="fullWidth" align="left" style="border-collapse: separate; width: 135px; min-width: 135px;"><tr><td valign="top" align="center" style="padding-top: 10px;"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td data-sub-mod="cta" valign="top" align="center" style="padding-left: 5px; padding-right: 5px; padding-top: 2px; padding-bottom: 15px; font-family: Helvetica, Arial, sans-serif;font-weight: 300;font-size: 16px;line-height: 21px;color: #2b2b2b;"><a href="' + courseLink + '" style="text-decoration: none; color: #076ad2; font-family: Roboto, Helvetica, Arial, sans-serif !important;" target="_blank">' + ctaText + '&nbsp;&rarr;</a></td></tr></table></td></tr></table></td></tr></table></td></tr></table>';
  }

  console.groupCollapsed("tidy");
  // console.log(singleModule);
  singleModule = tidy_html5(singleModule, options);
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
    settingsBar.innerHTML = '<div class="settings-group settings-whitelabel"><div class="settings-label">Whitelabeling</div><div class="settings-controls"><select id="select-whitelabel"><option value="www">MedBridge</option><option value="foxrehab">Fox</option><option value="drayerpt">Drayer</option><option value="healthsouth">HealthSouth</option></select></div></div><div class="settings-group settings-audience"><div class="settings-label">Audience</div><div class="settings-controls"><select id="select-audience"><option value="non-subscribers">Non-Subscribers</option><option value="subscribers">Subscribers</option></select></div></div><div class="settings-group settings-layout"><div class="settings-label">Layout</div><div class="settings-controls"><select id="select-layout"><option value="col">Columns</option><option value="row">Rows</option></select></div></div><div class="settings-group settings-tracking"><div class="settings-label">Marketing URL</div><div class="settings-controls"><input id="set-tracking-url" type="text" value="' + todaysLink + '"></div></div><div class="settings-group settings-module-number"><div class="settings-label">Module #</div><div class="settings-controls"><input id="tracking-mod-number" type="text" value="' + defaultModuleNumber + '"></div></div>'

// If we're on a course details page, make an export button and append it to the settings bar we just created.
if ( courseDetail ) {
  settingsBar.innerHTML = settingsBar.innerHTML + '<div class="settings-group export-btn"><div style="width:120px; padding:12px 0;" class="btn btn-primary btn-block smtm">Export Course</div></div>';
  // Export Course btn
  var exportCoursebtn = document.querySelector(".export-btn");
  exportCoursebtn.addEventListener("click", exportSingleModule, false);
}

document.body.appendChild(settingsBar);






//////////////////////////////////////
////////////////////
////////////////////   SAVE SETTINGS
////////////////////
//////////////////////////////////////

// Save settings to sessionStorage
document.querySelector("#set-tracking-url").addEventListener("blur", saveURLtoSession, false);
function saveURLtoSession() {
  if ( !this.value ) {
    var savedVal = "";
  } else {
    var savedVal = this.value;
  }
  // sessionStorage.setItem("setTrackingUrl", savedVal);
  localStorage.setItem("setTrackingUrl", savedVal);
}

///// Audience
var selectAudience = document.getElementById('select-audience');
function logAudienceValue() {
  switch (this.value) {
    case 'non-subscribers':
      document.getElementById('select-whitelabel').getElementsByTagName('option')[0].selected = 'selected';
      break;
  }
}
selectAudience.addEventListener('change', logAudienceValue, false);

///// Whitelabel
var selectWhitelabel = document.getElementById('select-whitelabel');
function logWhitelabelValue() {
  if ( this.value !== "www" ) {
    document.getElementById('select-audience').getElementsByTagName('option')[1].selected = 'selected';
  }
}
selectWhitelabel.addEventListener('change', logWhitelabelValue, false);

///// Module #
var inputModule = document.getElementById('tracking-mod-number');
inputModule.addEventListener("blur", saveModuletoStorage, false);
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
// selectLayout.addEventListener("blur", saveLayoutToStorage, false);
// function saveLayoutToStorage() {
//   if ( !this.value ) {
//     var savedVal = "";
//   } else {
//     var savedVal = this.value;
//   }
//   // sessionStorage.setItem("setTrackingUrl", savedVal);
//   localStorage.setItem("setLayout", savedVal);
// }





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

              // open in new window
              var openCourse = document.createElement("a");
              openCourse.className = "icomoon icomoon-new-tab";
              openCourse.target = "_blank";
              openCourse.href = courseWrapper.querySelector(".course-listing__text > a").getAttribute("href");
              quickInfo.appendChild(openCourse);

              // Copy Link
              var quickCourseLink = document.createElement("div");
              quickCourseLink.innerHTML = "URL";
              quickCourseLink.className = "quick-copy course-link";
              createCopyBtn(quickCourseLink, courseWrapper.querySelector(".course-listing__text > a").getAttribute("href"));
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
          exportModule.className = "icomoon icomoon-embed jk-hover-pointer jk-flex-right";
          exportModule.onclick = exportSingleModule;
          quickInfo.appendChild(exportModule);

          //
          courseWrapper.appendChild(quickInfo);

        }

      }


      console.groupCollapsed("applyCourseTool() function");


      let courseParents = document.querySelectorAll('.row[infinite-scroll-container] > .ng-scope');
      for (let courseParent of courseParents) {
        courseParent.classList.add("course-parent");
        courseParent.dataset.title = courseParent.querySelector(".course-listing__title").textContent;
        courseParent.dataset.img = courseParent.querySelector(".course-listing__media a img").src;

        courseParent.dataset.link = courseParent.querySelector(".course-listing__media a").getAttribute("ng-href").replace(/^\//,"");

        // var ngHref = courseParent.dataset.link = courseParent.querySelector(".course-listing__media a").getAttribute("ng-href");
        // console.error(ngHref);
        // console.error(courseParent.dataset.link);
        // if ( ngHref ) {
        //   ngHref.slice(1);
        // }


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



      let courseList = document.querySelectorAll('.row > .ng-scope > .ng-scope > .ng-scope .course-listing');
      for (let course of courseList) {

        if ( course.classList.contains("course-wrapper") ) {
          // Course has already been styled, do nothing.
          console.log("applyCourseTool() skipped course");
        } else {

          if ( elExists(course.querySelector(".course-listing__media > a")) ) {

            console.log("applyCourseTool() found fresh course");
            // This course has not been styled yet and it has a link. Apply styling by adding new elements to the DOM.
            var sibling = course.firstElementChild;
            var selectCourseBtn = document.createElement("div");
            selectCourseBtn.className = "select-course mb-plus";
            course.insertBefore(selectCourseBtn, sibling);
            selectCourseBtn.addEventListener("click", courseToggle, false);
            course.classList.add("course-wrapper");

            // Check this course against the already saved courses. Because the courses reload everytime, previously selected courses will 'refresh' and no longer show as being selected. Determine if they were selected and then apply styles and data-attributes as normal.
            var courseHref = course.querySelector("a").href;
            if ( arrayContains(courseHref, courseLinks) ) {
              console.log("applyCourseTool() found a previously selected course")
              selectCourseBtn.classList.remove("mb-plus");
              selectCourseBtn.classList.add("mb-check");
              selectCourseBtn.closest(".select-course").dataset.href = courseHref;
            }

          } else {
            console.log("applyCourseTool() found fresh course that didn't have a link, skipping it")
          }

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




//
/// REMOVE _ALL_ COPIED COURSES
//
function resetAllCourses() {
  console.log("resetAllCourses");

  let courseList = document.querySelectorAll(".mb-x");
  for (let course of courseList) {

    console.log(course);

    var courseId = course.parentNode.getAttribute("data-href");

    removeCourse(courseId);

  }
}


//
/// REMOVE A COPIED COURSE & UNCHECK THE MATCHING ORIGINAL COURSE
//
function removeCourse(courseId) {

  console.log("removeCourse - this = " + this);
  console.log("removeCourse - courseId = " + courseId);

  if (typeof courseId === 'string' || courseId instanceof String) {
    clickedCourse = courseId;
  } else {
    var clickedCourse = courseId.getAttribute("data-href");
  }

  if ( !clickedCourse ) {
    clickedCourse = courseId.parentNode.getAttribute("data-href")
  }

  // console.log("removeCourse - courseId.getAttribute('data-href') = " + courseId.getAttribute("data-href"));
  // console.log("removeCourse - courseId.parentNode.getAttribute('data-href') = " + courseId.parentNode.getAttribute("data-href"));

  // var fixedCourseId = courseId.getAttribute("data-href");
  //
  // if (typeof fixedCourseId === 'string' || fixedCourseId instanceof String) {
  //   courseId = courseId.getAttribute("data-href");
  // } else {
  //   courseId = this.getAttribute("data-href");
  // }




  console.log("removeCourse - courseId = " + courseId)
  console.log("removeCourse - this = " + this)

  var copiedCourse = document.querySelector('.course-copy[data-href="' + clickedCourse + '"]');
  var originalCourse = document.querySelector('.select-course[data-href="' + clickedCourse + '"]');

  console.log("- " + originalCourse)

  if ( typeof(originalCourse) != 'undefined' && originalCourse != null ) {
    originalCourse.classList.remove("mb-check");
    originalCourse.classList.add("mb-plus");
  }

  copiedCourse.parentNode.removeChild(copiedCourse);

  renumberCourses();
}



//
/// RENUMBER COPIED COURSES
//
function renumberCourses() {
  var courseNumber = 1;
  let courseList = document.querySelectorAll(".course-collection-wrapper .course-number");
  for (let course of courseList) {
    course.innerText = courseNumber++;
  }
}


function courseOptions() {

  // Create Options Modal
  var courseOptionsElem = document.createElement("div");
  courseOptionsElem.className = "course-options";
  courseOptionsElem.innerHTML = '<div class="course-options"> <div class="option-wrapper"> <div class="option-title">Target Audience</div><div class="options-columns"><div class="label-wrapper"> <label for="course-opt-ns"><input name="audience" value="ns" id="course-opt-ns" type="radio" checked> Non-Subscribers</label> </div><div class="label-wrapper"> <label for="course-opt-sub"><input name="audience" value="sub" id="course-opt-sub" type="radio"> Subscribers</label> </div></div></div><div class="option-wrapper"> <div class="option-title">Whitelabeling</div><div class="label-wrapper"> <label for="course-opt-medbridge"><input name="whitelabel" value="www" id="course-opt-medbridge" type="radio" checked> MedBridge <span>(www.)</span></label> </div><div class="label-wrapper"> <label for="course-opt-healthsouth"><input name="whitelabel" value="healthsouth" id="course-opt-healthsouth" type="radio"> HealthSouth <span>(healthsouth.)</span></label> </div><div class="label-wrapper"> <label for="course-opt-fox"><input name="whitelabel" value="foxrehab" id="course-opt-fox" type="radio"> Fox <span>(foxrehab.)</span></label> </div><div class="label-wrapper"> <label for="course-opt-drayer"><input name="whitelabel" value="drayerpt" id="course-opt-drayer" type="radio"> Drayer <span>(drayerpt.)</span></label> </div><div class="label-wrapper"> <label name="whitelabel" value="" for="course-opt-other"><input name="whitelabel" value="other" id="course-opt-other" type="radio"> Other</label> <input id="course-opt-other-text" type="text"> </div></div>  <div class="option-wrapper"> <div class="option-title">Tracking URL</div><div class="options-columns"><div class="label-wrapper"> <label for="course-opt-affiliate"><input name="tracking-url-type" value="affiliate" id="course-opt-affiliate" type="radio" checked> Affiliate Linkback</label> </div><div class="label-wrapper"> <label for="course-opt-legacy"><input name="tracking-url-type" value="legacy" id="course-opt-legacy" type="radio"> Legacy</label> </div></div><div class="options-columns"><div class="label-wrapper"> <input name="tracking-url-value" value="" type="text" placeholder="trk-feb-17..."> </div></div></div>  <div class="option-wrapper"> <div class="option-title">Google Analytics Module #</div><div class="label-wrapper"> <input name="tracking-mod" value="" id="course-opt-tracking-mod" type="text" placeholder="Module # (?utm_content=mod2-conted-course)"> </div></div><div class="option-wrapper"> <div class="option-title">Exported Code</div><div class="options-columns"><div class="label-wrapper"> <label for="course-opt-html"><input name="code" value="html" id="course-opt-html" type="radio" checked> HTML</label> </div><div class="label-wrapper"> <label for="course-opt-json"><input name="code" value="json" id="course-opt-json" type="radio"> JSON</label> </div><div class="label-wrapper"> <label for="course-opt-yaml"><input name="code" value="yaml" id="course-opt-yaml" type="radio"> YAML</label> </div></div></div><div class="course-confirm"> <button id="course-options-cancel" class="btn-cancel">Cancel</button> <button id="course-options-confirm" class="btn-confirm">Confirm</button> </div></div>';

  // instanciate new modal
  var createOptionsModal = new tingle.modal({
      footer: false,
      stickyFooter: false,
      cssClass: ['course-options-wrapper'],

      onOpen: function() {
          console.log('modal open');
      },
      onClose: function() {
          console.log('modal closed');
          createOptionsModal.destroy();
      }
  });

  createOptionsModal.setContent(courseOptionsElem);
  createOptionsModal.open();

  var optionsSubmitBtn = document.getElementById("course-options-confirm");
  optionsSubmitBtn.onclick = saveOptions;

  var optionsSubmitBtn = document.getElementById("course-options-cancel");
  optionsSubmitBtn.onclick = cancelOptions;

  // Set the sub/non-sub option if they pick an organization
  // http://stackoverflow.com/a/8997289/556079
  var rad = document.querySelectorAll('[name="whitelabel"]');
  for(var i = 0; i < rad.length; i++) {
    rad[i].onclick = function() {
        if(this.value === "healthsouth" || this.value === "foxrehab" || this.value === "drayerpt") {
            document.querySelector('#course-opt-sub').checked = true;
        }
    };
  }

  function saveOptions() {
    var whiteLabel = document.querySelector('input[name="whitelabel"]:checked').value;
    if (whiteLabel === "other") {
      whiteLabel = document.querySelector('#course-opt-other-text').value;
    }
    var audience = document.querySelector('input[name="audience"]:checked').value;
    var codeType = document.querySelector('input[name="code"]:checked').value;

    var trackingUrlType = document.querySelector('input[name="tracking-url-type"]:checked').value;
    var trackingUrlValue = document.querySelector('input[name="tracking-url-value"]').value;

    var trackingMod = document.querySelector('input[name="tracking-mod"]').value;
    if ( trackingMod === "" && whiteLabel === "www" ) {
      trackingMod = "2"
    }
    if ( trackingMod !== "" ) {
      trackingMod = "utm_content=mod" + trackingMod + "-conted-course"
    }

    generateCode(codeType, audience, whiteLabel, trackingMod, trackingUrlType, trackingUrlValue);
    createOptionsModal.close();
  }

  function cancelOptions() {
    createOptionsModal.close();
  }

}



//
///
//

function generateCode(codeType, audience, whiteLabel, trackingMod, trackingUrlType, trackingUrlValue) {

  console.log("function generateCode()");
  console.log("codeType = " + codeType);
  console.log("audience = " + audience);
  console.log("whiteLabel = " + whiteLabel);
  console.log("trackingMod = " + trackingMod);
  console.log("trackingUrlType = " + trackingUrlType);
  console.log("trackingUrlValue = " + trackingUrlValue);

  var exportedHtml = "";

  let selectedCourses = document.querySelectorAll(".course-copy");
  var lastCourse = selectedCourses[selectedCourses.length-1];

  // for (let exportCourse of selectedCourses) {
  // http://stackoverflow.com/a/41189297/556079
  for (let i = 0; i < selectedCourses.length; i++) {

    var exportCourse = selectedCourses[i];
    var exportCourseNumber = i + 1;

    if ( exportCourse == lastCourse ) {
      var tdPadding = "padding: 15px 0px 0px 0px;"
    } else {
      var tdPadding = "border-bottom: 1px solid #eaeaea; padding: 15px 0px 10px 0px;"
    }

    console.log(exportCourse);
    console.log(selectedCourses);

    var courseLink = exportCourse.dataset.href.trim();
        courseLink = courseLink.replace(/www/gi, whiteLabel);

    // Modify course link if this is for ns.
    if ( audience === "ns" ) {
      if ( trackingUrlType === "affiliate" ) {
        courseLink = courseLink.replace(/\.com\//gi, ".com/" + trackingUrlValue + "/?after_affiliate_url=");
        courseLink = courseLink + "&" + trackingMod;
      } else if ( trackingUrlType === "legacy" ) {
        courseLink = courseLink.replace(/\/courses\/.+/gi, "/" + trackingUrlValue + "-" + exportCourseNumber + "/?" + trackingMod);
      } else {
        courseLink += "?" + trackingMod;
      }
    } else {
      if ( trackingMod !== "" ) {
        courseLink += "?" + trackingMod;
      }
    }

    var courseTitle = exportCourse.dataset.title;
    var courseAuthor = exportCourse.dataset.author;
    var courseThumbnail = exportCourse.dataset.courseThumbnail;
    if (audience === "ns") {
      ctaText = "Start for Free"
    } else {
      ctaText = "Start Now"
    }

    var htmlPreviewTop = '<table data-module="featured-courses" border="0" cellpadding="0" cellspacing="0" width="620" class="fullWidth" style="width: 620px; min-width: 620px; border-collapse: separate;"><tr><td valign="top" bgcolor="#cccccc"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td data-sub-mod="category-title" valign="top" align="center" style="padding: 10px 15px; font-size: 18px; line-height: 23px; font-family: Roboto, Helvetica, Arial, sans-serif; color: #434343; font-weight: 400; color: #666666; text-transform: uppercase;"><span style="font-family: Roboto, Helvetica, Arial, sans-serif !important;">Continuing Education</span></td></tr></table></td></tr><tr><td valign="top" align="center" bgcolor="#ffffff" style="border-bottom: 2px solid #cccccc; padding: 25px 15px 20px 15px;"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td valign="top" align="left" style="padding-top: 0px;"><table border="0" cellpadding="0" cellspacing="0" width="100%" align="center">'

    var htmlPreviewBottom = '</table></td></tr></table></td></tr><tr><td valign="top" height="30" style="font-size: 1px; line-height: 1px;">&nbsp;</td></tr></table>'

    exportedHtml += '<!-- Course -->\n<tr>\n  <td valign="top" align="left" style="' + tdPadding + '">\n    <table data-sub-mod="course" border="0" cellpadding="0" cellspacing="0" width="590" class="fullWidth" style="border-collapse: separate; width: 590px; min-width: 590px;">\n      <tr>\n        <td valign="top" align="left">\n          <table border="0" cellpadding="0" cellspacing="0" width="125" class="fullWidth" align="left" style="border-collapse: separate; width: 125px; min-width: 125px;">\n            <tr>\n              <td valign="top" align="center">\n                <table border="0" cellpadding="0" cellspacing="0" width="100%">\n                  <tr>\n                    <td valign="top" align="center" style="padding-bottom: 10px;"><a href="' + courseLink + '" style="text-decoration: none; color: #000001;" target="_blank"><img src="' + courseThumbnail + '" class="img218" alt="" title="" width="125" height="72" hspace="0" vspace="0" style="width: 125px; min-width: 125px; -ms-interpolation-mode: bicubic; border:0; outline: none; display: block;" /></a></td>\n                  </tr>\n                </table>\n              </td>\n            </tr>\n          </table>\n          <!--[if gte mso 9]>\n          </td><td valign="top" align="left" width="330" style="width: 330px; min-width: 330px;">\n          <![endif]-->\n          <table border="0" cellpadding="0" cellspacing="0" width="330" class="fullWidth" align="left" style="border-collapse: separate; width: 330px; min-width: 330px;">\n            <tr>\n              <td class="courseDescCell" valign="top" align="center">\n                <table border="0" cellpadding="0" cellspacing="0" width="100%">\n                  <tr>\n                    <td data-sub-mod="course-title" class="textCenter" valign="top" align="left" style="padding-left: 10px; padding-right: 10px; font-family: Helvetica, Arial, sans-serif;font-weight: 400;font-size: 18px;line-height: 23px;color: #434343;"><a href="' + courseLink + '" style="text-decoration: none; color: #434343; font-family: Roboto, Helvetica, Arial, sans-serif !important;" target="_blank">' + courseTitle + '</a></td>\n                  </tr>\n                  <tr>\n                    <td data-sub-mod="author" class="textCenter" valign="top" align="left" style="padding-left: 10px; padding-right: 10px; font-family: Helvetica, Arial, sans-serif;font-weight: 300;font-size: 16px;line-height: 21px;color: #777777;"><a href="' + courseLink + '" style="text-decoration: none; color: #777777; font-family: Roboto, Helvetica, Arial, sans-serif !important;" target="_blank">presented by ' + courseAuthor + '</a></td>\n                  </tr>\n                </table>\n              </td>\n            </tr>\n          </table>\n          <!--[if gte mso 9]>\n          </td><td valign="top" align="left" width="135" style="width: 135px; min-width: 135px;">\n          <![endif]-->\n          <table border="0" cellpadding="0" cellspacing="0" width="135" class="fullWidth" align="left" style="border-collapse: separate; width: 135px; min-width: 135px;">\n            <tr>\n              <td valign="top" align="center" style="padding-top: 10px;">\n                <table border="0" cellpadding="0" cellspacing="0" width="100%">\n                  <tr>\n                    <td data-sub-mod="cta" valign="top" align="center" style="padding-left: 5px; padding-right: 5px; padding-top: 2px; padding-bottom: 15px; font-family: Helvetica, Arial, sans-serif;font-weight: 300;font-size: 16px;line-height: 21px;color: #2b2b2b;"><a href="' + courseLink + '" style="text-decoration: none; color: #076ad2; font-family: Roboto, Helvetica, Arial, sans-serif !important;" target="_blank">' + ctaText + '&nbsp;&rarr;</a></td>\n                  </tr>\n                </table>\n              </td>\n            </tr>\n          </table>\n        </td>\n      </tr>\n    </table>\n  </td>\n</tr>\n'

  }

  // Create wrapper for these two
  var codeWrapper = document.createElement("div");
  codeWrapper.className = "exported-code-wrapper";

  // Create Textarea
  var generatedHtml = document.createElement("textarea");
  generatedHtml.className = "plain-text-modal";
  var generatedHtmlText = document.createTextNode(exportedHtml);
  generatedHtml.appendChild(generatedHtmlText);
  codeWrapper.appendChild(generatedHtml);

  // Create preview div
  var previewiFrame = document.createElement("iframe");
  previewiFrame.className = "exported-code-preview";
  var previewHtml = "<style>body { display:flex;justify-content:center;align-items:center;margin:0;padding:0; }</style>" + htmlPreviewTop + exportedHtml + htmlPreviewBottom
  codeWrapper.appendChild(previewiFrame);

  // instanciate new modal
  var createHtmlModal = new tingle.modal({
      footer: false,
      stickyFooter: false,
      cssClass: ['fill'],

      onOpen: function() {
          console.log('modal open');
      },
      onClose: function() {
          console.log('modal closed');
          createHtmlModal.destroy();
      }
  });

  createHtmlModal.setContent(codeWrapper);
  createHtmlModal.open();

  previewiFrame.contentWindow.document.open();
  previewiFrame.contentWindow.document.write(previewHtml);
  previewiFrame.contentWindow.document.close();

}


function generateHTML() {

  courseOptions();

}


//
///
//
function getCourseNumber() {

  var totalCourses = 1 + document.querySelectorAll(".course-copy").length;

  return totalCourses;
}


//
// When a course is selected, add its info to an array and then format it as JSON.
//

var courses = [];
var course = {};

var courseLinks = [];

function courseToggle() {

  if ( this.classList.contains("mb-plus") ) {

    this.classList.remove("mb-plus");
    this.classList.add("mb-check");

    //
    // Get all data for the course.
    //

    var link = "https://" + window.location.hostname + this.nextSibling.querySelector("a").getAttribute("href") || "";
    var title = this.parentNode.querySelector(".course-listing__title").innerText;
    var courseThumbnail = this.nextSibling.querySelector(".course-listing__img").getAttribute("src");;

    // Author may be more than one and exist in two separate spans. Grab all of them and then loop through them.
    let authorList = this.parentNode.querySelectorAll(".course-listing__instructors span");
    var author = "";

      if ( typeof(authorList) != 'undefined' && authorList != null ) {
        for (let value of authorList) {
          author += value.innerText;
        }
      } else {
        author = "";
      }



    this.closest(".select-course").dataset.href = link;

    courseLinks.push(link);
    console.log(courseLinks)

    var courseArray = [];
    courseArray.push(link);
    courseArray.push(title);
    courseArray.push(author);
    courseArray.push(courseThumbnail);

    for(var i in courseArray) {

      var item = courseArray[i];

       courses.push({
            "link" : item.link,
            "title"  : item.title,
            "author"       : item.author,
            "courseThumbnail"       : item.courseThumbnail
        });
    }
    course.courses = courses;

    // console.log(JSON.stringify(course));
    // console.log(JSON.stringify(courses));

    var jsonSource = JSON.stringify({course:{link:link,title:title,author:author,courseThumbnail,courseThumbnail}});
    console.log(jsonSource);

    // console.log(link);
    // console.log(title);
    // console.log(author);
    // console.log(courseThumbnail);


    // Add course collection wrapper
    if ( !document.querySelector(".course-collection-wrapper") ) {
      // console.log("add course collection wrapper");
      var courseCollectionWrapper = document.createElement("div");
      courseCollectionWrapper.className = "course-collection-wrapper";
      document.body.appendChild(courseCollectionWrapper);

      var courseMenu = document.createElement("div");
      courseMenu.className = "course-menu";


      // Generate Code
      var elemGenerateHTML = document.createElement("div");
      elemGenerateHTML.className = "generate-code";
      elemGenerateHTML.addEventListener("click", courseOptions, false);
      var elemGenerateHTMLText = document.createTextNode("Generate Code");
      elemGenerateHTML.appendChild(elemGenerateHTMLText);
      courseMenu.appendChild(elemGenerateHTML);

      // Reset Courses
      var resetCourses = document.createElement("div");
      resetCourses.className = "reset-courses";
      resetCourses.addEventListener("click", resetAllCourses, false);
      var resetCoursesText = document.createTextNode("Reset");
      resetCourses.appendChild(resetCoursesText);
      courseMenu.appendChild(resetCourses);

      courseCollectionWrapper.appendChild(courseMenu);

      var courseCollection = document.createElement("div");
      courseCollection.className = "course-collection";
      courseCollectionWrapper.appendChild(courseCollection);
    }

    // Add Course Copy to Course Collection
    var courseCopy = document.createElement("div");
    courseCopy.className = "course-copy";
    courseCopy.dataset.href = link;
    courseCopy.dataset.title = title;
    courseCopy.dataset.author = author;
    courseCopy.dataset.courseThumbnail = courseThumbnail;

    var courseNumber = document.createElement("div");
    courseNumber.className = "course-number bubble";
    var courseNumberText = document.createTextNode(getCourseNumber());
    courseNumber.appendChild(courseNumberText);

    var courseClose = document.createElement("div");
    courseClose.className = "mb-x bubble";
    courseClose.addEventListener("click", courseToggle, false);

    // var courseTitle = document.createTextNode(title + "<span>" + author + "</span>");

    var courseImg = document.createElement("img");
    courseImg.src = courseThumbnail;

    // courseCopy.appendChild(courseTitle);
    courseCopy.innerHTML = title + "<span>" + author + "</span>"
    courseCopy.appendChild(courseImg);
    courseCopy.appendChild(courseClose);
    courseCopy.appendChild(courseNumber);

    document.querySelector(".course-collection").appendChild(courseCopy);

  } else {

    console.log("courseToggle - this = " + this);
    removeCourse(this);

  }



}


//////////////////
/////////////////
// FUNCTIONS
///////////////
//////////////
