// var i = 0;
// var totalInputs = 0
// var totalValidInputs = 0
// var totalInputsFilled = 0;
// var totalInputsPrefilled = 0;
//
// var words = ["monitor", "program", "application", "keyboard", "javascript", "gaming", "network"];
//
//
// let formInputs = document.querySelectorAll("#gform_11 input");
// for (let input of formInputs) {
//
//   var word = words[Math.floor(Math.random() * words.length)];
//
//   totalInputs++
//
//   if ( input.hidden === false && input.type !== "submit" && input.type !== "hidden" && ( (input.type === "radio" || input.type === "checkbox") || (( input.type === "text" || input.type === "tel" || input.type === "email" ) && input.value === "" ))) {
//
//     i++;
//
//     totalValidInputs++
//
//     // Text Inputs
//     if ( ( input.type === "text" || input.type === "tel" || input.type === "email" ) && input.value === "" ) {
//
//       if ( input.type === "email" || /email/.test(input.parentElement.className) || /email/.test(input.className) || /email/.test(input.name) ) {
//         input.value = "demo@demo.com"
//       }
//       else if ( input.type === "tel" || /phone/.test(input.parentElement.className) || /phone/.test(input.className) || /phone/.test(input.name) ) {
//         input.value = "9542539607"
//       }
//       else if ( /zip/.test(input.parentElement.className) || /zip/.test(input.className) || /zip/.test(input.name) ) {
//         input.value = "98370"
//       }
//       else if ( /state/.test(input.parentElement.className) || /state/.test(input.className) || /state/.test(input.name) ) {
//         input.value = "WA"
//       }
//       else if ( input.type === "number" ) {
//         input.value = "12345"
//       }
//       else if ( input.type === "text" ) {
//         input.value = i + " " + word;
//       }
//       // Increment success/filled value
//       totalInputsFilled++
//     }
//
//     // Radio/Checkbox Inputs
//     if ( (input.type === "radio" || input.type === "checkbox") && ( input.checked !== "true" || input.checked !== "false") ) {
//       input.checked = "true";
//       totalInputsFilled++
//     }
//
//   }
//
// }
// //
// //
// // let formTextareas = document.querySelectorAll("#gform_11 textarea");
// // for (let textarea of formTextareas) {
// //
// //   totalInputs++
// //   totalValidInputs++
// //
// //   if ( textarea.value !== "" ) {
// //     totalInputsPrefilled++
// //   }
// //
// //   textarea.innerHTML = "Lorem ipsum."
// //
// //   if ( textarea.innerHTML !== "" ) {
// //     totalInputsFilled++
// //   }
// //
// // }
//
// console.log("Total Inputs: " + totalInputs);
// console.log("Total Valid Inputs: " + totalValidInputs);
// console.log("Total Inputs Prefilled: " + totalInputsPrefilled);
// console.log("Total Inputs Filled: " + totalInputsFilled);
