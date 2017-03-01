// On page load

document.body.onload = function() {
  chrome.storage.sync.get("dpToken", function(items) {
    if (!chrome.runtime.error) {
      console.log(items);
      // document.getElementById("data").innerText = items.data;
    }
  });
}

// Saves options to chrome.storage.sync.
function save_options() {
  var valdpToken = document.getElementById('dp-token').value;
  var likesColor = document.getElementById('like').checked;

  chrome.storage.sync.set({
    dpToken: valdpToken,
    dpLocalParentFolder: document.getElementById('dp-parent-folder').value,
    nwLocalUserPath: document.getElementById('nw-local-user-path').value,
    likesColor: likesColor
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}


// // Restores select box and checkbox state using the preferences
// // stored in chrome.storage.
// function restore_options() {
//   // Use default value color = 'red' and likesColor = true.
//   chrome.storage.sync.get({
//     dpToken: 'red',
//     favoriteColor: 'red',
//     likesColor: true
//   }, function(items) {
//     document.getElementById('color').value = items.favoriteColor;
//     document.getElementById('like').checked = items.likesColor;
//   });
// }
// document.addEventListener('DOMContentLoaded', restore_options);


document.getElementById('save').addEventListener('click',
    save_options);
