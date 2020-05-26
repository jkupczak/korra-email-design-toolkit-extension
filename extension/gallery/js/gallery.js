/*

  @TODO
  - Queue ajax requests.
  - Save url, html, and metadata to indexeddb to avoid making future calls
  - build page async so that iframes load in as we get the html
  - even if we have 200 sets of html saved localy, make sure we load the iframes with a low threshhold.
    the html is still going to request images, we dont want to request images for 200 emails at once
  - create data structure to accept pasted in URLs with and without metadata
  - add filters based on available metadata

*/

///////
///////
///////
// On initial load, request email URLs from the indexeddb via the background page
chrome.runtime.sendMessage({queryEmailTable: "oh hai mark"});


///////
///////
///////
const emailUrls = [
  // "https://preview.pardot.com/email/showHtmlMessage/id/858041023"
];

var createFrame = function(html) {

  const wrapper = document.createElement("div");
  wrapper.classList.add("wrapper");

  const iframe = document.createElement("iframe");

  iframe.sandbox = "allow-same-origin allow-scripts allow-popups allow-popups-to-escape-sandbox allow-modals allow-pointer-lock allow-top-navigation";
  iframe.src = "about:blank";

  wrapper.appendChild(iframe);
  document.getElementById("collection").appendChild(wrapper);

  iframe.contentWindow.document.open();
  iframe.contentWindow.document.write(html);
  iframe.contentWindow.document.close();

};

const getHtml = function(url) {

  return new Promise(function (resolve, reject) {

    var xhr = new XMLHttpRequest();

    // The encoded
    xhr.open("GET", url, false); // true = async, false = sync

    // When xhring a local file, the response.status is 0
    xhr.onload = function (e) {

      if (this.response.length > 0) {

        // console.log(this.response);
        createFrame(this.response);
        resolve(this.response);

      } else {

        console.log("missing");

        reject({
          status: this.status,
          statusText: xhr.statusText,
        });
      }
    };

    xhr.onerror = function () {

      reject({
        status: this.status,
        statusText: xhr.statusText,
      });
    };


    try {
      xhr.send();
    }
    catch(error) {
      displayErrorMsg("fileaccess");
      console.error(error);
      console.error(error.name);
      console.error(error.message);
      console.error(error.stack);
    }

  });

};




emailUrls.forEach(function (url, index) {
	getHtml(url);
});
