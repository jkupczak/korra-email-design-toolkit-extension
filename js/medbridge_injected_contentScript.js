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
      courseMenu.innerHTML = "<div class='gen-yaml'>Generate YAML</div>";

      // Generate JSON
      var elemGenerateJSON = document.createElement("div");
      elemGenerateJSON.className = "generate-json";
      elemGenerateJSON.addEventListener("click", generateJSON, false);
      var elemGenerateJSONText = document.createTextNode("Generate JSON");
      elemGenerateJSON.appendChild(elemGenerateJSONText);
      courseMenu.appendChild(elemGenerateJSON);

      // Generate YAML
      var elemGenerateYAML = document.createElement("div");
      elemGenerateYAML.className = "generate-json";
      elemGenerateYAML.addEventListener("click", generateYAML, false);
      var elemGenerateYAMLText = document.createTextNode("Generate JSON");
      elemGenerateYAML.appendChild(elemGenerateYAMLText);
      courseMenu.appendChild(elemGenerateYAML);

      // Reset Courses
      var resetCourses = document.createElement("div");
      resetCourses.className = "reset-courses";
      resetCourses.addEventListener("click", resetAllCourses, false);
      var resetCoursesText = document.createTextNode("Reset Courses");
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
