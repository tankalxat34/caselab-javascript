/*
В этом файле я тренируюусь решать задачи, которые не входят в рамки курса на Leetcode, но могут быть уточнены на протяжении Case Lab
*/


/**
 * Простой тестировщик. Проверка на ===, !==, <=, >=, <, >
 */
var UnitTester = {
    count: 0,

    _convertSign: {
        "===": (a, b) => a === b,
        "!==": (a, b) => a !== b,
        "<=": (a, b) => a <= b,
        ">=": (a, b) => a >= b,
        "<": (a, b) => a < b,
        ">": (a, b) => a > b
    },

    /**
     * Проводит тестирование переданной функции. Результаты тестирования возвращает в виде объекта. 
     * @param {Function} fn Функция, которую надо протестировать
     * @param {String} sign Бинарный оператор для сравнения (один из: `===`, `!==`, `<=`, `>=`, `<`, `>`)
     * @param {any} answer Ожидаемый ответ тестируемой функции
     * @param {Array} args Массив аргументов, передаваемых в функцию
     * @returns {Object} Объект
     */
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
                comparsionSign: sign,
                fnName: fn.name
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


console.log(UnitTester.case(camelCase, "===", "fontFamily", ["font-family"]).verdict);
console.log(UnitTester.case(camelCase, "===", "fontSize", ["font_size"]).verdict);
console.log(UnitTester.case(camelCase, "===", "camelCase", ["camelCase"]).verdict);
console.log(UnitTester.case(camelCase, "===", "mustBeAsCamelCase", ["must be as camel_case"]).verdict);



/**
 * Получить среднее значение в массиве
 */
mean = function (arr) {
    let amount = 0;
    for (let i = 0; i < arr.length; i++) amount += arr[i];
    return amount / arr.length;
}


console.log(UnitTester.case(mean, "===", 2.5, [[1, 2, 3, 4]]).verdict);

