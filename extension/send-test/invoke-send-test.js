
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
/////
/////
/////    Open Email Test Window
/////
/////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////


var openEmailTestWindow = function() {

  console.log("sending test");
  var emailBuilder = document.createElement("iframe");

  emailBuilder.id = "korra-test-email-builder";
  emailBuilder.setAttribute("allowtransparency", "true");
  emailBuilder.setAttribute("frameborder", "0");

  emailBuilder.style = "position:fixed; top:0; right:0; height: 100vh; width:450px; background:#fff; display:block; z-index:999999; outline:0; border:0; border-left:1px solid #e2e3ea; box-shadow:0 0 15px rgba(0,0,0,0.2)";

  console.log( chrome.extension.getURL('send-test/send-test.html') );
  emailBuilder.src = chrome.extension.getURL('send-test/send-test.html');

  console.log(emailBuilder);
  document.body.appendChild(emailBuilder);

  setTimeout(function(){
    emailBuilder.contentWindow.postMessage(cleanedOriginalHtml, "*");
    console.log("message sent");
  }, 2000);

};
