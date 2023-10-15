
const selectorUserTodo  = document.querySelector("#user-todo");
const inputNewTodo      = document.querySelector("#new-todo");
const ulTodoList        = document.querySelector("#todo-list");
const divInformator     = document.querySelector("#informator");


/**
 * **Константа.** Объект для хранения точек API. Не должен меняться внутри программы.
 */
const ApiEndpoints = {
    users: "https://jsonplaceholder.typicode.com/users",
    todos: "https://jsonplaceholder.typicode.com/todos"
}


Array.prototype.groupBy = function (key) {
    let result = {};
    for (let i = 0; i < this.length; i++) {
        result[this[i][key]] = { ...this[i] };
    }
    return result;
}


var ToDo = {

    /**
     * Выводит уведомление указанного типа с текстом в специальном блоке для уведомлений. Уведомление можно закрыть кликом по нему
     * @param {String} type Один из: `error`, `warning`, `info`
     * @param {String} text Любой текст, который должен вывестись в уведомлении
     */
    showAlert: function (type, text) {
        divInformator.innerHTML = '';

        let msgDiv = document.createElement("div");
        msgDiv.classList = `msg ${type}`;
        msgDiv.title = "Кликните, чтобы закрыть";

        let msgP = document.createElement("p");
        msgP.innerText = text;
        msgDiv.appendChild(msgP);

        msgDiv.addEventListener("click", msgDiv.remove);

        divInformator.appendChild(msgDiv);
    },

    /**
     * Асинхронная функция. Делает запрос на ApiEndpoint с помощью fetch с указанным телом запроса.
     * 
     * В случае успеха возвращает распарсенный JSON. В случае неудачи - возвращает ошибку и показывает уведомление об ошибке.
     * @param {String} method метод запроса
     * @param {String} url url запроса
     * @param {any} args любые арументы, которые необходимо передать вместе с запросом
     */
    fetchData: async function (method, url, ...args) {
        const request = new Request(url, {
            method: method,
            ...args
        });

        try {
            let response = await fetch(request);
            return await response.json();
        } catch (error) {
            this.showAlert("error", error.message);
            return error;
        }
    },

    /**
     * Заполняет выпадающий список пользователями
     */
    fillUsers: async function () {
        let response = await this.fetchData("GET", ApiEndpoints.users);
        console.log(response);
        return response;
    }
}
