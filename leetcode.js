/**
 * @param {number[]} arr
 * @param {Function} fn
 * @return {number[]}
 */
var filter = function (arr, fn) {
    for (let i = 0; i < arr.length; i++) {
        console.log(i, arr[i], fn(arr[i], i));
        if (!fn(arr[i], i)) {
            arr.splice(i, 2);
        }
    }
    return arr;
};

arr = [-2, -1, 0, 1, 2]
fn = function plusOne(n) { return n + 1 }


const newArray = filter(arr, fn);

console.log(newArray);