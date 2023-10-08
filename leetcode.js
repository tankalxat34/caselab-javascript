
var TimeLimitedCache = function() {
    return new Object();
};

/** 
 * @param {number} key
 * @param {number} value
 * @param {number} duration time until expiration in ms
 * @return {boolean} if un-expired key already existed
 */
TimeLimitedCache.prototype.set = function(key, value, duration) {
    this[key] = value;
    return new Promise((resolve, reject) => {
        resolve(setTimeout(() => this.splice(key, 1), duration));
    })
};

/** 
 * @param {number} key
 * @return {number} value associated with key
 */
TimeLimitedCache.prototype.get = function(key) {
    
};

/** 
 * @return {number} count of non-expired keys
 */
TimeLimitedCache.prototype.count = function() {
    
};


const timeLimitedCache = new TimeLimitedCache()
timeLimitedCache.set(1, 42, 1000); // false
console.log(timeLimitedCache);
setTimeout(() => console.log(timeLimitedCache.get(1)), 1001);
// timeLimitedCache.get(1) // 42
// timeLimitedCache.count() // 1



