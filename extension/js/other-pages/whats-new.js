fetch('changelog.html')
  .then(response => response.text())
  .then(data => {
    // Here's a list of repos!
    document.getElementById("change-log").insertAdjacentHTML('beforeend', data);
  });
