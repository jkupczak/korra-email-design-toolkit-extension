/**
 * Save the current file location to chrome.storage.local
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
 var saveFileHistory = function() {



}



/**
 * Build and open the file history UI
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
var viewFileHistory = function() {

  console.log("opening file history window");

  var fileHistoryWindow = document.createElement("iframe");
  fileHistoryWindow.src = chrome.extension.getURL('file-history/file-history.html');
  fileHistoryWindow.style = "border:0;position:fixed; top:0; left:0; width:100vw; height:100vh; display:block; z-index:99999;";
  document.body.appendChild(fileHistoryWindow);

}




/**
 * Using an array of file locations, build the UI to display them
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
var buildHistoryList = function(files) {

  var savedFiles = document.getElementById("saved-files");

  files.forEach(function (file, index) {

    var filePreview = document.createElement("div");

    // Build the iframe
    var iframe = document.createElement("iframe");
    iframe.src = file.url;
    filePreview.appendChild(iframe);

    // Append the filename
    //

    // Append the last viewed date
    //

    // Process the filename and its path to determine what tags we should apply.
    processTags(filePreview, file);

    savedFiles.appendChild(filePreview);

  });


}



/**
 * Using an array of file locations, build the UI to display them
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */
var allTags = [];
var processTags = function(el, file) {

 var tags = [];

 // push the tag name to our arrays
 tags.push();
 allTags.push();

 // dedupe allTags
 allTags = dedupe(allTags);

}

/**
 * Remove duplicate items from an array
 * (c) 2019 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {Array} arr The array
 * @return {Array}     A new array with duplicates removed
 */
var dedupe = function (arr) {
	return arr.filter(function (item, index) {
		return arr.indexOf(item) === index;
	});
};


// {
//   "fileHistory": [
//     {
//       "url": "...",
//       "lastViewed": "..."
//     },
//     {
//       "url": "...",
//       "lastViewed": "..."
//     }
//   ]
// }
