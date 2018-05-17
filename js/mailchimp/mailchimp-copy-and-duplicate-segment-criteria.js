let conditionRows = document.body.querySelectorAll(".condition-row");

for (let conditionRow of conditionRows) {

  let conditionBlocks = conditionRow.querySelectorAll(".condition-block");
  for (let conditionBlock of conditionBlocks) {
    console.log(conditionBlock);
  }

}
