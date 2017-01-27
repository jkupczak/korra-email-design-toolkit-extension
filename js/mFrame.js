
////////
//////// Remember scroll position after reloads
////////

// Session Storage - https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
// Sessions storage works on a per tab basis. Better than localStorage for this because all of my tabs running something from file:// would share the same data.
// Detect scrolling - https://developer.mozilla.org/en-US/docs/Web/Events/scroll
// Set Scroll Position - http://stackoverflow.com/a/4192861/556079

window.scrollTo(0, sessionStorage.getItem('scrollPosMframe'));

window.addEventListener('scroll', function(e) {

  sessionStorage.setItem('scrollPosMframe', window.scrollY);

});


// Add drag scrolling
// https://codepen.io/JTParrett/pen/rkofB

var curYPos = 0,
curXPos = 0,
curDown = !1;

window.addEventListener("mousemove", function(a) {
    curDown === !0 && window.scrollTo(document.body.scrollLeft + (curXPos - a.pageX), document.body.scrollTop + (curYPos - a.pageY))
}), window.addEventListener("mousedown", function(a) {
    curDown = !0, curYPos = a.pageY, curXPos = a.pageX
}), window.addEventListener("mouseup", function(a) {
    curDown = !1
});
