console.log("medbridge_injected_contentScript.js loaded");

// function cancelClick() {
//   return false;
// };

//
// Apply check tool to each course as it loads in
//
// https://hacks.mozilla.org/2012/05/dom-mutationobserver-reacting-to-dom-changes-without-killing-browser-performance/
//

    // select the target node to watch
    var target = document.querySelector('div.ng-scope > div.row:nth-child(3)');

    // create an observer instance
    var observer = new MutationObserver(function(mutations) {

        console.log("observer activated");

        applyCourseTool();

        mutations.forEach(function(mutation) {
            console.log(mutation.type);
        });
    });

    // configuration of the observer:
    var config = { attributes: true, childList: true, characterData: true }
    // pass in the target node, as well as the observer options
    observer.observe(target, config);

    // Run this function to check each relevant div in the code and then add the proper html to it
    function applyCourseTool() {

      let courseList = document.querySelectorAll('.row > .ng-scope > .ng-scope > .ng-scope');
      for (let course of courseList) {

        if ( course.classList.contains("course-wrapper") ) {
          console.log("skip");
        } else {
          // course.onclick = cancelClick;

          console.log("! " + course.classList);
          var sibling = course.firstElementChild;

          var selectCourseBtn = document.createElement("div");
          selectCourseBtn.className = "select-course mb-plus";
          course.insertBefore(selectCourseBtn, sibling);
          // selectCourseBtn.onclick = courseToggle;
          selectCourseBtn.addEventListener("click", courseToggle, false);

          course.classList.add("course-wrapper");
        }
      }
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
/// REMOVE A COPIED COURSE & UNCHECK THE MATCHIG ORIGINAL COURSE
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
  originalCourse.classList.remove("mb-check");
  originalCourse.classList.add("mb-plus");

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


//
///
//
function generateJSON() {

  console.log("function generateJSON()");

}

//
///
//
function generateYAML() {

  console.log("function generateYAML()");

}

//
///
//
function generateHTML() {

  console.log("function generateHTML()");

  var exportedHtml = "";

  let selectedCourses = document.querySelectorAll(".course-copy");
  for (let exportCourse of selectedCourses) {
    var courseLink = exportCourse.dataset.href;
    var courseTitle = exportCourse.dataset.title;
    var courseAuthor = exportCourse.dataset.author;
    var courseThumbnail = exportCourse.dataset.courseThumbnail;

    exportedHtml += '<tr>\n  <td valign="top" align="left" style="border-bottom: 1px solid #eaeaea; padding: 15px 0px 10px 0px;">\n    <table data-sub-mod="course" border="0" cellpadding="0" cellspacing="0" width="590" class="fullWidth" style="border-collapse: separate; width: 590px; min-width: 590px;">\n      <tr>\n        <td valign="top" align="left">\n          <table border="0" cellpadding="0" cellspacing="0" width="125" class="fullWidth" align="left" style="border-collapse: separate; width: 125px; min-width: 125px;">\n            <tr>\n              <td valign="top" align="center">\n                <table border="0" cellpadding="0" cellspacing="0" width="100%">\n                  <tr>\n                    <td valign="top" align="center" style="padding-bottom: 10px;"><a href="' + courseLink + '" style="text-decoration: none; color: #000001;" target="_blank"><img src="' + courseThumbnail + '" class="img218" alt="" title="" width="125" height="72" hspace="0" vspace="0" style="width: 125px; min-width: 125px; -ms-interpolation-mode: bicubic; border:0; outline: none; display: block;" /></a></td>\n                  </tr>\n                </table>\n              </td>\n            </tr>\n          </table>\n          <!--[if gte mso 9]>\n          </td><td valign="top" align="left" width="330" style="width: 330px; min-width: 330px;">\n          <![endif]-->\n          <table border="0" cellpadding="0" cellspacing="0" width="330" class="fullWidth" align="left" style="border-collapse: separate; width: 330px; min-width: 330px;">\n            <tr>\n              <td class="courseDescCell" valign="top" align="center">\n                <table border="0" cellpadding="0" cellspacing="0" width="100%">\n                  <tr>\n                    <td data-sub-mod="course-title" class="textCenter" valign="top" align="left" style="padding-left: 10px; padding-right: 10px; font-family: Helvetica, Arial, sans-serif;font-weight: 400;font-size: 18px;line-height: 23px;color: #434343;"><a href="' + courseLink + '" style="text-decoration: none; color: #434343; font-family: Roboto,Helvetica,Arial,sans-serif !important;" target="_blank">' + courseTitle + '</a></td>\n                  </tr>\n                  <tr>\n                    <td data-sub-mod="author" class="textCenter" valign="top" align="left" style="padding-left: 10px; padding-right: 10px; font-family: Helvetica, Arial, sans-serif;font-weight: 300;font-size: 16px;line-height: 21px;color: #777777;"><a href="' + courseLink + '" style="text-decoration: none; color: #777777; font-family: Roboto,Helvetica, Arial, sans-serif !important;" target="_blank">' + courseAuthor + '</a></td>\n                  </tr>\n                </table>\n              </td>\n            </tr>\n          </table>\n          <!--[if gte mso 9]>\n          </td><td valign="top" align="left" width="135" style="width: 135px; min-width: 135px;">\n          <![endif]-->\n          <table border="0" cellpadding="0" cellspacing="0" width="135" class="fullWidth" align="left" style="border-collapse: separate; width: 135px; min-width: 135px;">\n            <tr>\n              <td valign="top" align="center" style="padding-top: 10px;">\n                <table border="0" cellpadding="0" cellspacing="0" width="100%">\n                  <tr>\n                    <td data-sub-mod="cta" valign="top" align="center" style="padding-left: 5px; padding-right: 5px; padding-top: 2px; padding-bottom: 15px; font-family: Helvetica, Arial, sans-serif;font-weight: 300;font-size: 16px;line-height: 21px;color: #2b2b2b;"><a href="' + courseLink + '" style="text-decoration: none; color: #076ad2; font-family: Roboto,Helvetica, Arial, sans-serif !important;" target="_blank">Start for Free &rarr;</a></td>\n                  </tr>\n                </table>\n              </td>\n            </tr>\n          </table>\n        </td>\n      </tr>\n    </table>\n  </td>\n</tr>'

  }

  // Create Plain-Text Modal
  var generatedHtml = document.createElement("code");
  generatedHtml.className = "plain-text-modal";
  var generatedHtmlText = document.createTextNode(exportedHtml);
  generatedHtml.appendChild(generatedHtmlText);

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

  createHtmlModal.setContent(generatedHtml);
  createHtmlModal.open();

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

function courseToggle() {

  if ( this.classList.contains("mb-plus") ) {
    this.classList.remove("mb-plus");
    this.classList.add("mb-check");

    var link = "https://" + window.location.hostname + this.nextSibling.querySelector("a").getAttribute("href");
    var title = this.nextSibling.querySelector(".course-listing__title").innerText;
    var author = this.nextSibling.querySelector(".course-listing__instructors span").innerText;
    var courseThumbnail = this.nextSibling.querySelector(".course-listing__img").getAttribute("src");;

    this.closest(".select-course").dataset.href = link;

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

    console.log(JSON.stringify(course));
    console.log(JSON.stringify(courses));

    var jsonSource = JSON.stringify({course:{link:link,title:title,author:author,courseThumbnail,courseThumbnail}});
    console.log(jsonSource);

    console.log(link);
    console.log(title);
    console.log(author);
    console.log(courseThumbnail);


    // Add course collection wrapper
    if ( !document.querySelector(".course-collection-wrapper") ) {
      // console.log("add course collection wrapper");
      var courseCollectionWrapper = document.createElement("div");
      courseCollectionWrapper.className = "course-collection-wrapper";
      document.body.appendChild(courseCollectionWrapper);

      var courseMenu = document.createElement("div");
      courseMenu.className = "course-menu";


      // Generate HTML
      var elemGenerateHTML = document.createElement("div");
      elemGenerateHTML.className = "generate-html";
      elemGenerateHTML.addEventListener("click", generateHTML, false);
      var elemGenerateHTMLText = document.createTextNode("Get HTML");
      elemGenerateHTML.appendChild(elemGenerateHTMLText);
      courseMenu.appendChild(elemGenerateHTML);

      // Generate JSON
      var elemGenerateJSON = document.createElement("div");
      elemGenerateJSON.className = "generate-json";
      elemGenerateJSON.addEventListener("click", generateJSON, false);
      var elemGenerateJSONText = document.createTextNode("Get JSON");
      elemGenerateJSON.appendChild(elemGenerateJSONText);
      courseMenu.appendChild(elemGenerateJSON);

      // Generate YAML
      var elemGenerateYAML = document.createElement("div");
      elemGenerateYAML.className = "generate-json";
      elemGenerateYAML.addEventListener("click", generateYAML, false);
      var elemGenerateYAMLText = document.createTextNode("Get YAML");
      elemGenerateYAML.appendChild(elemGenerateYAMLText);
      courseMenu.appendChild(elemGenerateYAML);

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

    var courseTitle = document.createTextNode(title);

    var courseImg = document.createElement("img");
    courseImg.src = courseThumbnail;

    courseCopy.appendChild(courseTitle);
    courseCopy.appendChild(courseImg);
    courseCopy.appendChild(courseClose);
    courseCopy.appendChild(courseNumber);

    document.querySelector(".course-collection").appendChild(courseCopy);

  } else {

    console.log("courseToggle - this = " + this);
    removeCourse(this);

  }



}
