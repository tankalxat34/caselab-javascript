/*
    Подстречный Александр
    ДЗ #1 "Цензор"
*/

function censor() {
    let pares = new Map();

    return function (arg1, arg2 = "") {
        if (!arg2) {
            let replacedString = arg1;
            for (const pare of pares) {
                replacedString = replacedString.replace(...pare);
            }
            return replacedString;
        } else {
            pares.set(arg1, arg2);
        }
    }
}



const changeScene = censor();
changeScene("PHP", "JS");
changeScene("backend", "frontend");

console.log(changeScene('PHP is the most popular programming language for backend web-development'));
// JS is the most popular programming language for frontend web-development

