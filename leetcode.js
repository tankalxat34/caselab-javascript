/**
 * @param {Array<Function>} functions
 * @return {Promise<any>}
 */
var promiseAll = async function(functions) {
    return new Promise((resolve, reject) => {
        // functions.forEach(func => resolve(func()));
        let result = [];
        functions.forEach(async f => {
            f()
            .then(resp => result.push(resp))
            .catch(rej => result.push(rej))
        })
        resolve(result);
    })
};


// const promise = promiseAll([() => new Promise(res => res(42))])
// const promise = promiseAll([() => new Promise(resolve => setTimeout(() => resolve(1), 200)), () => new Promise((resolve, reject) => setTimeout(() => reject("Error"), 100))])
const promise = promiseAll([() => new Promise(resolve => setTimeout(() => resolve(4), 50)), () => new Promise(resolve => setTimeout(() => resolve(10), 150)), () => new Promise(resolve => setTimeout(() => resolve(16), 100))])
promise.then(console.log); // [42]
