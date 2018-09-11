// https://blog.mariusschulz.com/2016/07/16/removing-elements-from-javascript-arrays
function removeFromArray(array, element) {
    const index = array.indexOf(element);

    if (index !== -1) {
        array.splice(index, 1);
    }
}
