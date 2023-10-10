/*
В этом файле я тренируюусь решать задачи, которые не входят в рамки курса на Leetcode
*/


/**
 * Простой тестировщик. Проверка на ===, !==, <=, >=, <, >
 */
var UnitTester = {
    count: 0,

    _convertSign: {
        "===":  (a, b) => a === b,
        "!==":  (a, b) => a !== b,
        "<=":   (a, b) => a <= b,
        ">=":   (a, b) => a >= b,
        "<":    (a, b) => a < b,
        ">":    (a, b) => a > b
    },

    case: function (fn, sign, answer, args) {
        let timer = Date.now();
        let res = fn(...args);
        let lastTime = Date.now() - timer;
        let verdict = this._convertSign[sign](res, answer) ? "OK" : "ERROR";
        this.count++;
        return {
            verdict: verdict,
            result: res,
            datails: {
                number: this.count,
                time: lastTime,
                awaitedAnswer: answer,
                args: args,
                comparsionSign: sign
            }
        }
    },

}



/**
 * Превращает строку в camelCase notation
 * @param {String} s Строка
 * @returns {String} Строка
 */
function camelCase(s) {
    let rex = /\w+/gm;
    let matching = s.replaceAll("_", " ").match(rex);
    return matching.map((element, index) => {
        if (index) return element.charAt(0).toUpperCase() + element.substring(1);
        return element;
    }).join("");
}

// console.log(camelCase("font-family"));
// console.log(camelCase("font_size"));
// console.log(camelCase("camelCase"));
// console.log(camelCase("must be as camel case"));

console.log(UnitTester.case(camelCase, "===", "fontFamily", ["font-family"]).verdict);
console.log(UnitTester.case(camelCase, "===", "fontSize", ["font_size"]).verdict);
console.log(UnitTester.case(camelCase, "===", "camelCase", ["camelCase"]).verdict);
console.log(UnitTester.case(camelCase, "===", "mustBeAsCamelCase", ["must be as camel_case"]).verdict);