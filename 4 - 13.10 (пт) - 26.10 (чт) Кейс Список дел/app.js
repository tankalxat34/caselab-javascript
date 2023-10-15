
const selectorUserTodo       = document.querySelector("#user-todo");
const inputNewTodo           = document.querySelector("#new-todo");
const ulTodoList             = document.querySelector("#todo-list");
const divInformator          = document.querySelector("#informator");
const divInformatorShadow    = document.querySelector("#informatorShadow");

const spanPageNumber         = document.querySelector("#pageNumber");
const aPrevPage              = document.querySelector("#prevPage");
const aNextPage              = document.querySelector("#nextPage");


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

    todos: [],

    /**
     * Выводит уведомление указанного типа с текстом в специальном блоке для уведомлений. Уведомление можно закрыть кликом по нему
     * @param {String} type Один из: `error`, `warning`, `info`
     * @param {String} text Любой текст, который должен вывестись в уведомлении
     */
    showAlert: function (type, text) {
        divInformatorShadow.classList.toggle("closed");
        divInformator.innerHTML = '';

        let msgDiv = document.createElement("div");
        msgDiv.classList = `msg ${type}`;
        msgDiv.title = "Click to close";

        let msgP = document.createElement("p");
        msgP.innerText = text;
        msgDiv.appendChild(msgP);

        msgDiv.addEventListener("click", () => {
            msgDiv.remove();
            divInformatorShadow.classList.toggle("closed");
        });

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
            return { isError: true, ...error };
        }
    },

    /**
     * Заполняет выпадающий список пользователями, а также создает свойство `users`, в котором хранятся все юзеры, сгруппированные по id. В случае ошибки ничего не заполняет.
     * 
     * Возвращает `false`, если произошла ошибка. Иначе `true`
     */
    fillUsers: async function () {
        let response = await this.fetchData("GET", ApiEndpoints.users);
        if (response?.isError) return false;
        // сохраняем в текущий объект, сгруппированный по id, ответ от сервера
        this.users = response.groupBy("id");
        selectorUserTodo.innerHTML = '';

        for(let i = 0; i < response.length; i++) {
            let option = document.createElement("option");
            option.innerText = response[i]?.name;
            option.value = response[i]["id"];

            selectorUserTodo.appendChild(option);
        }

        return false;
    },

    /**
     * Отрисовывает задачи на странице
     * 
     * Возвращает `false`, если произошла ошибка. Иначе `true`
     * @param {Number} pageNumber номер страницы (для пагинации)
     */
    fillTodos: async function (pageNumber) {
        if (pageNumber <= 0) return false;
        let response = await this.fetchData("GET", ApiEndpoints.todos.concat(`?_page=${pageNumber}`));
        if (response?.isError) return false;
        ulTodoList.innerHTML = '';
        spanPageNumber.innerText = pageNumber;
        this.todos = response.groupBy("id");

        for (let i = 0; i < response.length; i++) {
            const task = response[i];

            let li = document.createElement("li");
            li.classList = "liTask";

            let input = document.createElement("input");
            input.type = "checkbox";
            input.id = `todoid-${task.id}`;
            input.setAttribute("data-id", task.id);
            input.setAttribute("data-userid", task.userId);

            let label = document.createElement("label");
            label.setAttribute("for", input.id);
            label.innerHTML = `<span>${task.title} <span class="italic">by</span> <span class="bold">${this.users[task.userId].name}</span></span>`

            let btnRemove = document.createElement("button");
            btnRemove.innerText = "❌";
            btnRemove.classList = "btnRemove";
            
            li.appendChild(input);
            li.appendChild(label);
            li.appendChild(btnRemove);
            
            ulTodoList.appendChild(li);
        }

        return false;
    }
}


aPrevPage.addEventListener("click", () => {
    let newPageNumber = new Number(spanPageNumber.innerText) - 1;
    ToDo.fillTodos(newPageNumber);
});
aNextPage.addEventListener("click", () => {
    let newPageNumber = new Number(spanPageNumber.innerText) + 1;
    ToDo.fillTodos(newPageNumber);
});


ToDo.fillUsers()
    .then(r => ToDo.fillTodos(Number(new URL(window.location.href).searchParams.get("page")) || 1))
    .catch(error => ToDo.showAlert("error", error.message));