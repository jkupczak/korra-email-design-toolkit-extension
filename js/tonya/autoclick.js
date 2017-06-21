let links = document.querySelectorAll("a");
for (let link of links) {
  setTimeout(function() {
    link.click();
  }, 5000);

}


var i = 1;                     //  set your counter to 1

function myLoop () {           //  create a loop function
   setTimeout(function () {    //  call a 3s setTimeout when the loop is called
      alert('hello');          //  your code here
      i++;                     //  increment the counter
      if (i < 10) {            //  if the counter < 10, call the loop function
         myLoop();             //  ..  again which will trigger another
      }                        //  ..  setTimeout()
   }, 3000)
}

myLoop();                      //  start the loop



(function myLoop (i) {
   setTimeout(function () {
      console.log('hello - ' + i + ' - ' + document.querySelectorAll("a")[i]);          //  your code here
      document.querySelectorAll("a")[i].click();
      if (--i) myLoop(i);      //  decrement i and call myLoop again if i > 0
   }, 3500)
})(document.querySelectorAll("a").length-1);





(function myLoop (i) {
   setTimeout(function () {
      document.querySelector("a")[i].click();
      if (--i) myLoop(i);      //  decrement i and call myLoop again if i > 0
   }, 1000)
})(document.querySelectorAll("a").length);


javascript:let links = document.querySelectorAll("a");for (let link of links) {  setTimeout(function() {    link.click();  }, 5000); }
