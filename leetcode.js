/**
 * @param {number} millis
 * @return {Promise}
 */
async function sleep(millis) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(millis), millis)
    }, millis)
}

/** 
 * let t = Date.now()
 * sleep(100).then(() => console.log(Date.now() - t)) // 100
 */
let t = Date.now()
console.log(sleep(1000).then((e) => console.log(Date.now() - t, e)))