console.warn(" 💎💎💎 [korra-email-design-tooklit] loaded /js/dropbox/dropbox-file-viewer.js");
//////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////
//*** /////////////////////////
//*** //// "View with Korra"
//*** /////////////////////////
//*** /////////////////////////
//*** ////
//*** //// Code that adds a button that lets you immediately open the local version of the file you're viewing.
//*** ////
////////////////////////////


// Create the full local URL once the iframe preview loads
// We need to wait for the iframe because its src includes the full path to the local file.
// Without it all we have is the filename and the beginning path to the local Dropbox folder.
////////
////////
document.arrive("iframe.previewhtml", function() {

  console.log("iframe.previewhtml arrived");

  // Get the Dropbox Parent Folder
  ////////
  ////////
  // if we've already grabbed the fullPathToDropboxFolder from storage, then all we need to do is create the link bar.
  if ( typeof fullPathToDropboxFolder !== 'undefined' ) {

    // Build the HTML for the link
    buildKorraBar();

  } else {

    // we haven't grabbed fullPathToDropboxFolder from storage yet, lets do that.

    chrome.storage.promise.sync.get('fullPathToDropboxFolder').then(function(items) {
      console.log("retrieved fullPathToDropboxFolder from chrome.storage.sync");
      fullPathToDropboxFolder = items.fullPathToDropboxFolder;
      // Build the HTML for the link
      buildKorraBar();

    }, function(error) {
      console.error("Could not retrieve item from chrome.storage.sync.");
    });

  }

});

////////
////////
// This create the full width bar at the top of the page that links to the local file
function buildKorraBar() {

  // Only build if this is an *.html? file
  // Only build the korrabar if we have a useable URL in the iframe source
  // If you aren't logged into a Dropbox account that has permission to view the rendered HTML, this check will see that.
  if ( !/content_link_htmlify/i.test(document.querySelectorAll("iframe.previewhtml")[0].src) && /\.htm/i.test(document.URL) ) {


    localUrl = "file:///" + fullPathToDropboxFolder + "/" +  document.querySelectorAll("iframe.previewhtml")[0].src.replace(/(^.+?\/get\/|\?_subject_uid.+)/gi,"");

    // Listen for arrival of the file viewer header
    ////////
    ////////
    document.arrive(".react-file-viewer", {existing: true}, function() {

      if ( getParameterByName("noredirect") !== "1" ) {
        viewLocalFile();
      }

      destroyIfExists(document.getElementById("korrabar"));

      console.log("it's arrived!");
      console.log(this);

      var korraBar = document.createElement("a");
      korraBar.id = "korrabar";
      korraBar.addEventListener('click', viewLocalFile, false);
      korraBar.style = "color:#fff; font-weight:bold; font-size:14px; height:40px; line-height:40px; background: linear-gradient(to right, #8f15ff 0%,#3fd1ff 100%);"
      korraBar.innerHTML = '<div style="background:rgba(0,0,0,0.2); padding:0 15px 0 10px; display:inline-flex; align-items:center;"><svg style="margin-right:8px;" width="24" height="24" viewBox="0 0 334.5 334.5"><path fill="#FFFFFF" d="M332.8 13.7c-1.5-1.3-3.6-1.6-5.4-0.8L2.9 163.7c-1.7 0.8-2.9 2.6-2.9 4.5s1.1 3.7 2.8 4.5l91.8 45.1c1.7 0.8 3.7 0.6 5.2-0.5l89.3-66.7L119 222.7c-1 1-1.5 2.4-1.4 3.9l7 90.9c0.2 2 1.5 3.7 3.4 4.4 0.5 0.2 1 0.2 1.6 0.2 1.4 0 2.8-0.6 3.8-1.7l48.7-56.5 60.3 28.8c1.3 0.6 2.8 0.7 4.2 0.1 1.3-0.6 2.3-1.7 2.8-3.1l85-270.6C334.9 17.1 334.3 15 332.8 13.7z"/></svg>View with Korra</div>';

      this.prepend(korraBar);

    });

  }
}

////////
////////
// This is the function that runs when you click the link to view the local file.
// content scripts can't navigate to local files.
// So instead we send a message with the local url that we constructed to the extensions background page.
// The background page receives the message and has the permission to redirect the active tab to a local file url.
function viewLocalFile() {

	chrome.runtime.sendMessage({greeting: localUrl}, function(response) {
	  console.log(response.farewell);
	});

}
