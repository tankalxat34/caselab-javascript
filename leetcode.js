/**
 * @param {Function} fn
 * @return {Function}
 */
function memoize(fn) {
    let cache = new Object();
    return function (...args) {
        const sargs = JSON.stringify(args);
        if (!(sargs in cache)) {
            cache[sargs] = fn(...args);
        }
        return cache[sargs];
    }
}



let callCount = 0;
const memoizedFn = memoize(function (a, b) {
    callCount += 1;
    return a + b;
})
memoizedFn(2, 3) // 5
memoizedFn(2, 3) // 5
console.log(callCount) // 1 
