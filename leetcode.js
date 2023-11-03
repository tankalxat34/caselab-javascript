/**
 * @param {Array} arr
 * @param {Number} depth
 * @return {Array}
 */
var flat = function (arr, n) {
    if (!n) return arr;

    arr.
};


/*
The maximum recursion depth

Returns a new array with all sub-array elements concatenated into it recursively up to the specified depth.
*/

// arr = [1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]]
arr = [1, 2, 3, [4, 5, 6], [13, 14, 15]]
n = 1


console.log(flat(arr, n));