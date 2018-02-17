console.warn("[sonic-toolkit-extension] loaded /js/youtube/youtube.js");
////////////////////////////////////////////////////////////////////////

console.warn("use processVideos()");
////////////////////////////////////////////////////////////////////////

function begin() {
  var myWindow;
  myWindow = window.open("https://www.youtube.com/feed/history?run=1", "", "width=600, height=400");
}


if ( getParameterByName('run') === "1" ) {
  console.log("run found")
  processVideos();
} else {
  console.log("wtf")
}


// Looper, Screen Junkies, Omnislash, Netflix, HBO, Dane HearthStone, Binging with Babish, Savjz, Thijs Hearthstone, Brian Kibler, Day9TV, videogamedunkey, GameXplain, Dorkly, Trolden,

//
// document.arrive("ytd-video-renderer", {existing: true}, function() {
//
//
//
//
// });
//
//


channelsArray = ["Looper", "Screen Junkies", "Omnislash", "Netflix", "HBO", "Dane HearthStone", "Binging with Babish", "Savjz", "Thijs Hearthstone", "Brian Kibler", "Day9TV", "videogamedunkey", "GameXplain", "Dorkly", "Trolden", "Gamespot", "GameSpot", "IGN", "Marvel Entertainment", "Disney", "Marvel UK", "REACT", "Ubisoft US", "Nintendo", "Super Bunnyhop", "Mark Brown", "DidYouKnowGaming?", "Marques Brownlee", "CNN", "ABC", "NBC", "FOX", "CBS", "FX", "Star Wars", "Escapist", "Garbage", "Smosh Games", "HysteriA", "Street Fighter", "World of Warcraft", "Easy Allies", "GermanShu", "mantisisrael", "Universal Pictures", "FBE", "CaptainDisillusion", "PlayOverwatch", "wowhobbs", "Google", "Microsoft", "SEGA", "Capcom", "Konami", "Square-Enix", "Polygon", "Movieclips Trailers", "reynad", "Firebat"];


function processVideos() {

  var toggleBool = true;
  var intervalCount = 0;
  var deleteCount = 0;
  var hideCount = 0;
  hiddenVideos = [];

  var refreshIntervalId = setInterval(loopWithInterval, 5000);

  function loopWithInterval() {

    window.scroll(0, 0)

    intervalCount++;
    console.error("intervalCount: ", intervalCount, "deleteCount: ", deleteCount, "hideCount: ", hideCount);

    let rows = document.querySelectorAll("ytd-video-renderer[is-history]");
    var rowsLength = rows.length;

    // for (let row of rows) {
    for (var i = 0; i < rowsLength; i++) {

      var channelName = elExists(rows[i].querySelectorAll("yt-formatted-string > a.yt-simple-endpoint:only-child")[0], "text");
      var videoName   = rows[i].querySelectorAll("h3 > a#video-title")[0].innerText;
      var clearBtn    = rows[i].querySelectorAll("button#button[aria-label='Remove from Watch history']")[0];

      if ( clearBtn && channelName ) {
        if ( arrayContains(channelName, channelsArray) || channelName.match(/(20th ?Century ?Fox|Netflix|Nintendo|Playstation|Xbox|VEVO)/gi) || videoName.match(/(Pokemon|Nintendo Switch|DBZ|Dragon Ball|4XM|World of Warcraft|Super Smash|Smash Brothers|SSBM|Project M|Zelda|Overwatch|Super Mario|Hearthstone)/gi) ) {
          clearBtn.click();
          deleteCount++;
        } else if ( i + 1 < rowsLength ) {
          hideCount++;
          hiddenVideos.push(channelName);
          destroy(rows[i]);
        }
      }

    }


    if ( toggleBool ) {
      window.resizeTo(1000, (window.screen.availHeight/2) + 100);
      console.log(toggleBool);
    } else {
      window.resizeTo(1000, (window.screen.availHeight/2) - 100);
      console.log(toggleBool);
    }
    toggleBool = !toggleBool;
    window.scroll(0, 50);

  }
}

function getHiddenVideos() {
  copy(JSON.stringify(hiddenVideos));
}
