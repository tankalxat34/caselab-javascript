
var TimeLimitedCache = function () {
    return this;
};

/** 
 * @param {number} key
 * @param {number} value
 * @param {number} duration time until expiration in ms
 * @return {boolean} if un-expired key already existed
 */
TimeLimitedCache.prototype.set = function (key, value, duration) {
    let response = false;
    if (this.hasOwnProperty(key)) {
        response = true;
        clearTimeout(this[key].to);
    }

    let linkToThis = this;
    this[key] = {
        value: value,
        to: setTimeout(function (obj = linkToThis) { delete obj[key] }, duration)
    };
    return response;
};

/** 
 * @param {number} key
 * @return {number} value associated with key
 */
TimeLimitedCache.prototype.get = function (key) {
    return this[key]?.value ?? -1;
};

/** 
 * @return {number} count of non-expired keys
 */
TimeLimitedCache.prototype.count = function () {
    return Object.keys(this).length;
};




const timeLimitedCache = new TimeLimitedCache();
console.log(timeLimitedCache.set(1, 21, 250))
console.log(timeLimitedCache.set(1, 20, 100))

setTimeout(() => console.log(timeLimitedCache.count(), 50), 50)
setTimeout(() => console.log(timeLimitedCache.count(), 150),150)
setTimeout(() => console.log(timeLimitedCache.count(), 300),300)



// const timeLimitedCache = new TimeLimitedCache();
// console.log(timeLimitedCache.set(1, 42, 50))
// console.log(timeLimitedCache.set(1, 50, 100))

// setTimeout(() => console.log(timeLimitedCache.get(1), 50), 50)
// setTimeout(() => console.log(timeLimitedCache.get(1), 120), 120)
// setTimeout(() => console.log(timeLimitedCache.get(1), 200), 200)
// setTimeout(() => console.log(timeLimitedCache.count(), 250), 250)



// const timeLimitedCache = new TimeLimitedCache();
// console.log(timeLimitedCache.set(1, 42, 100));


// setTimeout(() => console.log(timeLimitedCache.get(1), 50), 50)
// setTimeout(() => console.log(timeLimitedCache.count(), 50), 50)
// setTimeout(() => console.log(timeLimitedCache.get(1), 150), 150)

