// console.warn(" 💎💎💎 [korra-email-design-tooklit] loaded /js/newsletter/dFrame.js");
/////////////////////////////////////////////////////////////////////////


////////
//////// Remember scroll position after reloads
////////

// Session Storage - https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
// Sessions storage works on a per tab basis. Better than localStorage for this because all of my tabs running something from file:// would share the same data.
// Detect scrolling - https://developer.mozilla.org/en-US/docs/Web/Events/scroll
// Set Scroll Position - http://stackoverflow.com/a/4192861/556079

window.scrollTo(0, sessionStorage.getItem('scrollPosDframe'));

window.addEventListener('scroll', function(e) {

  sessionStorage.setItem('scrollPosDframe', window.scrollY);

});
