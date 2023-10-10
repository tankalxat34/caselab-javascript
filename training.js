/*
В этом файле я тренируюусь решать задачи, которые не входят в рамки курса на Leetcode
*/

function camelCase(s) {
    let rex = /\w+/gm;
    let matching = s.match(rex);
    return matching.map((element, index) => {
        if (index) return element.charAt(0).toUpperCase() + element.substring(1);
        return element;
    }).join("");
}


console.log(camelCase("font-family"));
console.log(camelCase("font_size")); // надо пофиксить
console.log(camelCase("camelCase"));
console.log(camelCase("must be as camel case"));