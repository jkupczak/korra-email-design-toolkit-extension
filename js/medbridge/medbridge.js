console.warn("[sonic-toolkit-extension] loaded /js/medbridge/medbridge.js");
////////////////////////////////////////////////////////////////////////////


// Autofill inputs for 'Number of clinicians' with a value of 0.
// Allows sales to ignore my test submissions.

var numClinicians = document.querySelector("input#request_clinicians") || document.querySelector("input[name='lead_gen[num_clinicians]']") || document.querySelector("input#orgsize") || document.querySelector("input[name='demo[org_size]']");

if ( numClinicians ) {
  numClinicians.value = "0";
}
