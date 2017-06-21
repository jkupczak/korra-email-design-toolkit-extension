console.warn("js/twitter.js loaded");
console.warn("counter: 7");

// Check Tweets
function loopLinks() {

  // Check the first tweet.
  var tweetRow = document.querySelectorAll(".js-stream-item.stream-item")[0];
  console.log(tweetRow);
  var isRetweet = elExists(tweetRow.querySelector(".js-retweet-text"), "set");
  console.log(isRetweet);

  // If it's a retweet, lets check the second tweet.
  if ( isRetweet ) {
    var tweetRow = document.querySelectorAll(".js-stream-item.stream-item")[1];
    console.log(tweetRow);
    var isRetweet = elExists(tweetRow.querySelector(".js-retweet-text"), "set");
    console.log(isRetweet);
  }

  // If the first or second tweets are NOT retweet, loop through the links it contains
  if ( !isRetweet ) {

    let links = tweetRow.querySelectorAll(".js-tweet-text-container a");
    for (let link of links) {

      // Only act on the link if the href goes to a different domain (begins with http)
      if ( /http/gi.test(link.getAttribute("href")) ) {
        console.warn(link);
        console.warn("This link (" + link.getAttribute("href") + ") is DEFINITELY what we're looking for.")
        link.click();
      } else {
        console.warn(link);
        console.warn("This link (" + link.getAttribute("href") + ") is NOT what we're looking for.")
      }
    }

  }

}


// // Check AJAX Loaded Tweets
// document.arrive(".js-new-items-bar-container .new-tweets-bar", function() {
//
//   // When a new tweet appears, click the div that loads it.
//   document.querySelector(".new-tweets-bar").click();
//
//   // Now that the new tweet is loaded, run our function to check its contents.
//   loopLinks();
//
//   console.warn("arrived!");
//
// });


// loopLinks();
