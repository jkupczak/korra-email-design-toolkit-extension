console.warn("[sonic-toolkit-extension] loaded /js/blog-check.js");
///////////////////////////////////////////////////////////////////


///////////
//
//  Variables needed for checking the blog.
//
///////////

var totalProtectedArticles = 0;
var blogStatusSuccessArray = [];
var isBlogLoaded = false;
var totalBlogIframesOpen = 0; // Track the total amount of iframes we open to check the blog.


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////
//
//  Function to check the blog for data on an article.
//
///////////

function checkTheBlog(linkHref, link) {

  // If a URL was passed into this function...
  if ( linkHref ) {

    // Grab the data-number from this link object. We're going to use it with the iframe to track what's going on.
    var blogLinkNumber = link.dataset.number;

    console.groupCollapsed("Checking blog link for data: [" + blogLinkNumber + "]" + linkHref);

    // Check if an iframe already exists with this URL by iterating through all relevant iframes in the DOM.
    console.log("Total iFrames currently open: " + totalBlogIframesOpen + " - Now beginning for...let loop to find iframes that have already been loaded.");

    let blogCheckList = document.querySelectorAll("iframe.blog-check");

    var iframesFoundinDOM = 0;
    for (let blogIframe of blogCheckList) {

      iframesFoundinDOM++;

      console.log("Current iFrame found in the DOM (#" + iframesFoundinDOM + ") during this loop has this src: " + blogIframe.getAttribute("src"));

      if ( blogIframe.getAttribute("src").replace(/[?&]blog\-check\=.+/gi, "") === linkHref ) {
        isBlogLoaded = true;
        console.log("The current link we're checking MATCHES this iFrame that's already in the DOM.");
      } else {
        isBlogLoaded = false;
        console.log("The current link we're checking DOES NOT MATCH this iFrame that's already in the DOM.");
      }

    }
    console.log("All iframes (" + iframesFoundinDOM + ") in the DOM have been checked. End of for...let loop.");

    //
    if ( isBlogLoaded === false ) {

      // Create an iframe for this link
      totalBlogIframesOpen++
      console.log("Creating an iframe for current link: " + totalBlogIframesOpen + " - " + linkHref);

      var blogCheck = document.createElement("iframe");
          blogCheck.src = linkHref + "&blog-check=" + blogLinkNumber;
          blogCheck.className = "blog-check blog-check-" + blogLinkNumber;
          blogCheck.id = "iframe-" + blogLinkNumber;
      document.body.appendChild(blogCheck);

      // Wait X seconds for the blog to send a reply. If it doesn't, throw an error.
      // I thought I needed this, but apparently not! - http://stackoverflow.com/a/9540320/556079
      // (function(link) {
          // setTimeout(function(){console.log(i)}, 1000);

          var blogTimeout = 25000 + (totalBlogIframesOpen*10000);
          var blogTimeoutStr = blogTimeout.toString();
              blogTimeoutStr = blogTimeoutStr.substring(0, blogTimeoutStr.length-3);

          console.log(totalBlogIframesOpen + " iframe(s) are open. Setting the blog check timer to " + blogTimeoutStr + " seconds.");
          setTimeout(function(){
            if ( blogStatusSuccessArray.indexOf(processBlogLinkBeingChecked(linkHref) ) > -1 ) {
              console.log("Blog loaded!");
            } else {
              console.log("Blog didn't load after " + blogTimeoutStr + " seconds. Verify the link.");
              console.log(link);
              createLinkErrorRow(link, "Blog took too long to load. Check the link.");
            }
          }, blogTimeout);
      // })(link);



    } else {
      console.log("This link is already loaded in an iframe. End of check on this link.");
    }

    console.info("Total iFrames now open: " + totalBlogIframesOpen);

    console.groupEnd();

  // *No* URL was passed into this function...
  } else {

    console.log("No linkHref found. Looping through all links.");

    let freshBlogCheck = dFrameContents.querySelectorAll("a");
    for (let link of freshBlogCheck) {

      if ( /(after_affiliate_url=blog|blog\/2|\-article|\-blog\/)/gi.test(link.href) && !/p=2503/gi.test(link.href) ) {
        checkTheBlog(link.href, link);
      }

    }
    console.log("Finished looping through all links.");
  }
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//
// Listen for the MedBridge Blog to message us with data about the article we're checking on.
//

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

      // console.log("request.greeting: " + request.greeting);
      var blogStatusReply = request.greeting.split("|");
      console.log("blogStatusReply: ");
      console.log(blogStatusReply);

      if ( blogStatusReply[1] === "error" ) {

      } else {

        // console.log("blogStatusReply: " + blogStatusReply);
        // console.log("blogStatusReply[4]: " + blogStatusReply[4]);

        var blogUrlChecked = document.querySelector("#iframe-" + blogStatusReply[4]).getAttribute("src").replace(/[?&]blog\-check.+/gi, "");


        console.log("blogStatusReply[4]: ");
        console.log(blogStatusReply[4]);
        console.log("blogUrlChecked (first pass): " + blogUrlChecked);


        blogUrlChecked = processBlogLinkBeingChecked(blogUrlChecked);

        console.log("blogUrlChecked (second pass): " + blogUrlChecked);

        blogStatusSuccessArray.push(blogUrlChecked);


        // if ( /after_affiliate_url/gi.test(blogUrlChecked) ) {
        //   blogUrlChecked = blogUrlChecked.replace(/\&.+/gi, "");
        //   console.log("blogUrlChecked: " + blogUrlChecked);
        // }
        // // New way to link articles in -ns and -sub. Using the p=#### id of the article lets us keep the same link if the URL changes in the future
        // else if ( /p=\d\d\d/gi.test(linkHref) ) {
        //   console.log("This blog link uses p=#### id for linking.")
        //   var blogLinkToCheckArray = linkHref.match(/p=[0-9]*/gi);
        //   var blogLinkToCheck = blogLinkToCheckArray[0].replace(/p=/gi,"");
        // }
        // else {
        //   blogUrlChecked = blogUrlChecked.replace(/\?.+/gi, "");
        //   console.log("blogUrlChecked: " + blogUrlChecked);
        // }

        blogUrlChecked = blogUrlChecked.replace(/^https?\:\/\/.+?\//i, "");
        blogUrlChecked = blogUrlChecked.replace(/\/$/i, "");

        // console.log(blogUrlChecked);
        // console.log(blogStatusReply[1] + "|" + blogUrlChecked);

        ////////////
        //
        // Save Data to storage
        //
        ////////////

        console.log("Saving to sessionStorage: " + blogUrlChecked + " - " + blogStatusReply);
        sessionStorage.setItem(blogUrlChecked, blogStatusReply);

        var blogId = "1234";
        var publishStatus = "published";

        // by passing an object you can define default values e.g.: []
        chrome.storage.local.get({userKeyIds: []}, function (result) {
            // the input argument is ALWAYS an object containing the queried keys
            // so we select the key we need
            var userKeyIds = result.userKeyIds;
            userKeyIds.push({[blogId]: publishStatus});
            // set the new array value to the same key
            chrome.storage.local.set({userKeyIds: userKeyIds}, function () {
                // you can use strings instead of objects
                // if you don't  want to define default values
                chrome.storage.local.get('userKeyIds', function (result) {
                    console.log(result.userKeyIds)
                });
            });
        });


        // chrome.storage.local.get(["storagekey"], function(result) {
        //
        //   if (typeof result === 'undefined') {
        //     console.log("blogArticle object EXISTS in chrome.storage.local");
        //
        //     var array = result[storagekey]?result[storagekey]:[];
        //
        //     var newArrEntry = [];
        //     newArrEntry.push = "keey";
        //     newArrEntry.push = "valuee";
        //
        //     array.unshift(newArrEntry);
        //
        //     var jsonObj = {};
        //     jsonObj[storagekey] = array;
        //     chrome.storage.local.set(jsonObj, function() {
        //         console.log("Saved a new array item");
        //     });
        //
        //   } else {
        //     console.error("blogArticle object DOES NOT EXIST in chrome.storage.local");
        //
        //     var newArrEntry = [];
        //     newArrEntry.push = "keey";
        //     newArrEntry.push = "valuee";
        //
        //     var jsonObj = {};
        //     jsonObj[storagekey] = array;
        //     chrome.storage.local.set(jsonObj, function() {
        //         console.log("Saved a new array item");
        //     });
        //
        //   }
        //
        //
        // });



        ////////////
        //
        // Remove the iframe we used to check this article link
        //
        ////////////

        destroy(document.querySelector("#iframe-" + blogStatusReply[4]));
        // console.log("#iframe-" + blogStatusReply[4] + " destroyed.")

      }


  }
);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function processBlogLinkBeingChecked(link) {

  // This function parses our blog link and returns

  console.log("function is processing the blog link being checked: " + link);

  // First 'if' handles the blog link when we eventually are allowed to use after_affiliate_url for blog links, this is just future proofing (4/14/17)
  // if ( /after_affiliate_url/gi.test(link) ) {
  //   console.log("This blog link uses after_affiliate_url for linking.");
  //   var blogLinkToCheck = link.replace(/\&.+/gi, "");
  //       blogLinkToCheck = blogLinkToCheck.replace(/https?\:\/\/.+?after_affiliate_url\=\/?/gi, "");
  //       console.log("in function we set blogLinkToCheck: " + blogLinkToCheck);
  // }
  // // New way to link articles in -ns and -sub. Using the p=#### id of the article lets us keep the same link if the URL changes in the future
  // else

  if ( /p=\d\d\d/gi.test(link) ) {
    console.log("This blog link uses p=#### id for linking.")
    var blogLinkToCheckArray = link.match(/p=[0-9]*/gi);
    var blogLinkToCheck = blogLinkToCheckArray[0].replace(/p=/gi,"");
        console.log("in function we set blogLinkToCheck: " + blogLinkToCheck);
  }
  else {
    console.log("This blog link uses ??? for linking.");
    var blogLinkToCheck = link.replace(/\/?\?.+/gi, "");
        blogLinkToCheck = blogLinkToCheck.replace(/https?\:\/\/.+?\//gi, "");
        console.log("in function we set blogLinkToCheck: " + blogLinkToCheck);
  }

  return blogLinkToCheck;

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Need to use this during link checking and again once the postMessages come back. Figure that out.
function checkArticleLink(linkObject, blogStatusFromStorage) {

  // console.log(link.href);
  // console.log(blogStatusFromStorage);

  var blogStatusFromStorage = blogStatusFromStorage;
  // Check Protects/Unprotected
  if ( blogStatusFromStorage[2] === "protected" ) {
    createLinkErrorRow(linkObject, "article is protected", "error", "lock");
    totalProtectedArticles++;
  }
  // Check Pearl vs Blog
  if ( linkNeedsGoogleTracking ) {
    if ( blogStatusFromStorage[3] === "blog" && !/utm_content=.+?\-blog/gi.test(linkObject.href) ) {
      createLinkErrorRow(linkObject, "add 'blog' to utm");
    } else if ( blogStatusFromStorage[3] === "pearl" && !/utm_content=.+?\-pearl/gi.test(linkObject.href) ) {
      createLinkErrorRow(linkObject, "add 'pearl' to utm");
    }
  }

  // console.error(totalProtectedArticles);
}

// console.error(totalProtectedArticles);


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

if ( totalProtectedArticles > 0 ) {
  console.error(totalProtectedArticles);
  alertify.error("1 or more articles are protected<div>Remember to unprotect all articles and re-check their status before sending out the newsletter.</div>", 0);
}
