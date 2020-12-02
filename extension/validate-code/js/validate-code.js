///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
////
////
////    HTML/CSS BUG CHECK
////
////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
function validateCode() {

  ////////////
  ////////////
  ////////////
  //
  //
      totalCodingBugs = 0;
      totalCodingWarnings = 0;
  //
  //
  ////////////
  ////////////
  ////////////

  // Outlook Bug
  // No padding on <a>, <p>, or <div>
  // Documentation:
  (function(){

    console.groupCollapsed("[Bug Check] Outlook: Lack of Padding Support");

    for (let el of dummyFrameContents.querySelectorAll("p, div, a")) {

      if ( window.getComputedStyle(el, null).getPropertyValue("padding") !== "0px" ) {

        logCodeBug(el, "outlook-bug", "no-padding-support", "warning");

      }

    }

    console.info("Total bugs so far:", totalCodingBugs);
    console.groupEnd();
  })();



  // Outlook Bug
  // <a> cannot link <table> elements
  // Documentation:

  (function(){

    console.groupCollapsed("[Bug Check] Outlook: <a> tags cannot link <table> elements");

    let els = dFrameContents.querySelectorAll("a table");
    for (let el of els) {

      logCodeBug(el, "outlook-bug", "<table>s cannot be linked with <a> tags in Outlook");

    }

    console.info("Total bugs so far:", totalCodingBugs);
    console.groupEnd();
  })();



  // Outlook Bug
  // <td> vertical padding
  // Documentation:

  (function(){

    // Consider running this test on a version of the email that has @media
    // queries stripped out so that there's no question whether it will be relevant in Outlook.
    // If this test runs while a mobile based media query is active, it could skew results

    console.groupCollapsed("[Bug Check] Outlook: <td> Vertical Padding");
    log.info("Outlook 2007/2010/2013 do not allow sibling <td>s to have differing vertical padding (top and/or bottom). It will automatically set all sibling <td>s to have the same vertical padding as the first <td>. Documentation: Pending");

    var firstTdTop, firstTdBottom;

    //
    let tableRows = dFrameContents.querySelectorAll("tr");
    for (let tableRow of tableRows) {
      // console.log("row begin");
      // Check how many table cells are in this row. We only want to address rows with 2 or more.
      if ( tableRow.cells.length >= 2 ) {

        // console.log(tableRow);

        firstTdTop = window.getComputedStyle(tableRow.cells[0], null).getPropertyValue("padding-top");
        firstTdBottom = window.getComputedStyle(tableRow.cells[0], null).getPropertyValue("padding-bottom");
        console.log("padding in the first <td> in this row –", "padding-top:", firstTdTop, "padding-bottom:", firstTdBottom);
        console.log("code for this <td>", tableRow.cells[0]);

        // Loop through all <td>'s in this table row.
        for (var i = 0; i < tableRow.cells.length; i++) {

          console.log("Current cell:", i+1);

          // We need to ignore cells that are empty.
          // An empty table cell doesn't care if it gets different vertical padding.
          // So although this is still bugged, no one will ever know.

          // console.log("Begin check: " + i);
          if ( !isElementEmpty(tableRow.cells[i]) ) {
          // console.groupEnd();

            console.log( "<td> cell number in this row:", i+1 );
            console.log( tableRow.cells[i] );
            console.log( "padding:", window.getComputedStyle(tableRow.cells[i], null).getPropertyValue("padding") );
            console.log( "padding-top:", window.getComputedStyle(tableRow.cells[i], null).getPropertyValue("padding-top") );
            console.log( "padding-bottom:", window.getComputedStyle(tableRow.cells[i], null).getPropertyValue("padding-bottom") );

            // Log the top and bottom padding of our first <td>
            if ( i === 0 ) {
              firstTdTop = window.getComputedStyle(tableRow.cells[i], null).getPropertyValue("padding-top");
              firstTdBottom = window.getComputedStyle(tableRow.cells[i], null).getPropertyValue("padding-bottom");
              console.log("padding in this <td> (which is the first) in this row –", "padding-top:", firstTdTop, "padding-bottom:", firstTdBottom);
            }
            // if this isn't the first <td>, check its top and bottom padding against the first <td>
            // Throw an error if they don't match.
            else if ( window.getComputedStyle(tableRow.cells[i], null).getPropertyValue("padding-top") !== firstTdTop || window.getComputedStyle(tableRow.cells[i], null).getPropertyValue("padding-bottom") !== firstTdBottom ) {
              // Error
              logCodeBug(tableRow.cells[i], "outlook", "vertical-cell-padding");
              console.log( "first cell:", firstTdTop, firstTdBottom, "|", "cell", i+1, ":", window.getComputedStyle(tableRow.cells[i], null).getPropertyValue("padding-top"), window.getComputedStyle(tableRow.cells[i], null).getPropertyValue("padding-bottom") );
            }

          }

        }

      }
    }

    console.info("Total bugs so far:", totalCodingBugs);
    console.groupEnd();
  })();



  // Outlook 120dpi height Bug
  //
  // Documentation:
  // The only attributes that accept a height in Outlook are img, td, and th.
  (function(){

    console.groupCollapsed("[Bug Check] Outlook 120dpi height bug");
    console.info("Height must be declared in pixels using CSS to be compatible with Outlook 120dpi's scaling feature. This bug only affects tags that support the HTML height='' attribute in the Word rendingering engine present in Microsoft Outlook 2007+ on Windows. Those tags are `tr`, `th`, `td`, and `img`. The following tags in your code were identified as having a height='' attribute set without using px.");

    let elWithHeight = dFrameContents.querySelectorAll("img[height], td[height], th[height], tr[height]");
    console.log(elWithHeight.length, "possible matches");

    elWithHeight.forEach(function (el, index) {

      let heightAttr  = el.getAttribute("height");
      let heightStyle = el.style.height;

      if ( !heightStyle || !/px/.test(heightStyle) ) {
        logCodeBug(el, "[outlook 120dpi height bug]", "Missing a matching pixel value in the height style property on " + el.tagName);
      }
    });

    console.info("Total bugs so far:", totalCodingBugs);
    console.groupEnd();
  })();


  // Yahoo min-height Bug
  //
  // Documentation:
  (function(){

    console.groupCollapsed("[Bug Check] Yahoo! min-height bug");
    console.info("Yahoo! will convert the css height property into the css min-height property. Use the HTML height='' attribute on supported tags to compensate for this. Tags that support the HTML height='' attribute include table, thead, tbody, tfoot, tr, th, td, marquee, img, image, input[type='image'], object, embed, video, iframe, and canvas.");

    let elWithHeight = dFrameContents.querySelectorAll("table[style*='height'], tbody[style*='height'], thead[style*='height'], tfoot[style*='height'], tr[style*='height'], th[style*='height'], td[style*='height'], canvas[style*='height'], iframe[style*='height'], img[style*='height'], image[style*='height'], marquee[style*='height'], object[style*='height'], input[type='image'][style*='height'], video[style*='height']");
    console.log(elWithHeight.length, "possible matches");

    elWithHeight.forEach(function (el, index) {

      let heightAttr  = el.getAttribute("height");
      let heightStyle = el.style.height;

      if ( !heightAttr && heightStyle ) {
        logCodeBug(el, "[yahoo! min-height bug]", "missing a matching height='' attribute on " + el.tagName);
      }
    });

    console.info("Total bugs so far:", totalCodingBugs);
    console.groupEnd();
  })();


  // Outlook Bug
  // !important inline css parsing
  // Documentation:

  (function(){

    console.groupCollapsed("[Bug Check] Outlook: !important parsing");
    console.info("Microsoft Outlook 2007+ on Windows does not support the use of the `!important` declaration in inline styles. It will always invalidate the style that is attached to. Remove it to ensure proper rendering in those clients. Documentation: https://github.com/hteumeuleu/email-bugs/issues/31");

    let firstTdTop, firstTdBottom;

    //
    let els = dFrameContents.querySelectorAll("*[style]");
    for (let el of els) {

      for (var i = 0; i < el.style.length; i++) {

        if ( el.style.getPropertyPriority(el.style[i]) === "important" ) {
          // console.log( el.style[i] );
          logCodeBug(el, "outlook", "important-parsing on " + el.style[i]);
        }

      }

    }

    console.info("Total bugs so far:", totalCodingBugs);
    console.groupEnd();
  })();



  // Report on total bugs to the QA Bar.
  // Combine HTML and CSS Linting errors with custom Korra errors.
  applyQaResults(htmlhintQaBar, totalCodingBugs, totalCodingBugs + " Code Errors Detected");
  applyQaResults(lintQaBar, myCodeMirror.state.lint.marked.length, myCodeMirror.state.lint.marked.length + " Linting Errors Detected");

} // end validateCode function
