/**
 * 
 * @param {String} a 
 * @param {String} b 
 */
function add(a, b) {
    let s1 = a;
    let s2 = b;
    let result = "";

    if (a.length > b.length) s2 = "0".repeat(a.length - b.length) + b;
    else s1 = "0".repeat(b.length - a.length) + a;


    let localSum = "";
    let cache = 0;
    for (let i = s1.length - 1; i >= 0; i--) {
        const n1 = Number(s1[i]);
        const n2 = Number(s2[i]);

        localSum = n1 + n2 + cache;
        if (localSum >= 10) {
            result += String(localSum % 10);
            cache = 1;
        } else {
            result += String(localSum);
            cache = 0;
        }
        
    }
    result += cache ? String(cache) : "";
    return [...result].reverse().join("");
}


// console.log(add('63829983432984289347293874', '90938498237058927340892374089'));
console.log(add('123', '456'));
console.log(add('1372', '69'));
console.log(add('888', '222'));