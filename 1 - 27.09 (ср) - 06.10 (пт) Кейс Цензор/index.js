/*
    Подстречный Александр
    ДЗ #1 "Цензор"
*/

function censor() {
    let pares = new Map();

    return function (arg1, arg2 = "") {
        if (!arg2) {
            let result = arg1;
            pares.forEach((v, k) => {
                result = result.replaceAll(k, v);
            });
            return result;
        } else {
            pares.set(new RegExp(`${arg1}`, "gm"), arg2);
        }
    }
}



const changeScene = censor();
changeScene("PHP", "JS");
changeScene("backend", "frontend");

console.log(changeScene('PHP is the most popular programming language for backend web-development'));
// JS is the most popular programming language for frontend web-development

console.log(changeScene("PHP blabla PHP bla JS backend will be frontend-backend. This Backend will not be replace"));
// JS blabla JS bla JS frontend will be frontend-frontend. This Backend will not be replace
