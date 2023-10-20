
const selectorUserTodo = document.querySelector("#user-todo");
const inputNewTodo = document.querySelector("#new-todo");
const ulTodoList = document.querySelector("#todo-list");
const divInformator = document.querySelector("#informator");
const divInformatorShadow = document.querySelector("#informatorShadow");

const aPrevPage = document.querySelector("#prevPage");
const aNextPage = document.querySelector("#nextPage");
const form = document.querySelector("form#addTodo");



/**
 * **Константа.** Объект для хранения точек API. Не должен меняться внутри программы.
 */
const ApiEndpoints = {
    users: "https://jsonplaceholder.typicode.com/users",
    todos: "https://jsonplaceholder.typicode.com/todos"
}

/**
 * Возвращает значение параметра по его ключу в URL. Сделано исключительно для удобства работы с параметрами
 * @param {String} s Наименование параметра
 * @returns any Значение параметра
 */
URL.prototype.getParam = function (s) {
    return this.searchParams.get(s);
}


Array.prototype.groupBy = function (key) {
    let result = {};
    for (let i = 0; i < this.length; i++) result[this[i][key]] = { ...this[i] };
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
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
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
     * Фукнция, вызывающаяся при клике на checkbox
     * 
     * @param {Event} event Событие при клике на checkbox
     * @returns Object ответ от сервера
     */
    _changeCompleteListener: async function (event) {
        event.preventDefault();
        let targetElement = event.target;
        let targetId = event.target.getAttribute("data-id");

        let newState = targetElement.checked;
        try {
            let response = await fetch(ApiEndpoints.todos.concat(`/${targetId}`), {
                method: 'PATCH',
                body: JSON.stringify({
                    completed: newState
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });

            if (response.ok) targetElement.checked = newState;
            else this.showAlert("error", "Server is unavailable. Check your internet connection and try again later");

            return await response.json();
        } catch (error) {
            this.showAlert("error", "Server is unavailable. Check your internet connection and try again later");
            return { isError: true, ...error };
        }
    },

    /**
     * Удаляет задачу из перечня только после запроса на сервер
     * 
     * @param {Element} taskNode Элемент на странице, в котором отображена задача
     * @param {Number} taskId Идентификатор задачи
     * @returns Object
     */
    _deleteTaskListener: async function (taskNode) {
        try {
            let taskId = taskNode.id;
            let response = await fetch(ApiEndpoints.todos.concat(`/${taskId}`), {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });

            if (response.ok) taskNode.remove();
            else this.showAlert("error", "Server is unavailable. Check your internet connection and try again later");

            return await response.json();
        } catch (error) {
            this.showAlert("error", "Server is unavailable. Check your internet connection and try again later");
            return { isError: true, ...error };
        }
    },

    /**
     * Заполняет выпадающий список пользователями, а также создает свойство `ToDo.users`, в котором хранятся все юзеры, сгруппированные по id. В случае ошибки ничего не заполняет.
     * 
     * Возвращает `false`, если произошла ошибка. Иначе `true`
     */
    fillUsers: async function () {
        let response = await this.fetchData("GET", ApiEndpoints.users);
        if (response?.isError) return false;
        // сохраняем в текущий объект, сгруппированный по id, ответ от сервера
        this.users = response.groupBy("id");
        selectorUserTodo.innerHTML = '';

        for (let i = 0; i < response.length; i++) {
            let option = document.createElement("option");
            option.innerText = response[i]?.name;
            option.value = response[i]["id"];

            selectorUserTodo.appendChild(option);
        }

        return false;
    },

    /**
     * Отрисовывает в DOM задачу
     * @param {Object} taskObj Объект задачи, содержащий поля `userId`, `id`, `title` и `completed`
     */
    drawNewTask: async function (taskObj) {
        let li = document.createElement("li");
        li.classList = "liTask";
        li.id = taskObj.id;

        let input = document.createElement("input");
        input.type = "checkbox";

        // предотвращаем некорректное срабатывание нажатия по label в случае, если id задач совпадает
        input.id = `todoid-${taskObj.id}-${Date.now()}`;
        input.setAttribute("data-id", taskObj.id);
        input.setAttribute("data-userid", taskObj.userId);
        input.checked = !!taskObj.completed;

        input.addEventListener("click", async (event) => await this._changeCompleteListener(event));

        let label = document.createElement("label");
        label.setAttribute("for", input.id);
        label.innerHTML = `<span>${taskObj.title} <span class="italic">by</span> <span class="bold">${this.users[taskObj.userId].name}</span></span>`

        let btnRemove = document.createElement("button");
        btnRemove.innerText = "❌";
        btnRemove.classList = "btnRemove";

        btnRemove.addEventListener("click", async (event) => await this._deleteTaskListener(li));

        li.appendChild(input);
        li.appendChild(label);
        li.appendChild(btnRemove);

        if (taskObj?.isNew) {
            ulTodoList.insertBefore(li, ulTodoList.firstElementChild);
        } else { 
            ulTodoList.appendChild(li);
        }
    },

    /**
     * Делает запрос на сервер и отрисовывает полученные в ответе задачи (через пагинацию по страницам)
     * 
     * Возвращает `false`, если произошла ошибка. Иначе `true`
     */
    fillTodos: async function () {
        let response = await this.fetchData("GET", ApiEndpoints.todos);
        if (response?.isError || !response.length) return false;
        ulTodoList.innerHTML = '';
        this.todos = response.groupBy("id");

        for (let i = 0; i < response.length; i++) {
            this.drawNewTask(response[i]);
        }

        return false;
    },

    /**
     * Добавить новую задачу для выбранного пользователя
     * @param {String} title Текст новой задачи
     * @param {Number} userId Идентификатор пользователя
     */
    makeTodo: async function (title, userId) {
        try {
            let response = await fetch(ApiEndpoints.todos, {
                method: 'POST',
                body: JSON.stringify({
                    userId: userId,
                    title: title,
                    completed: false
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });

            if (response.ok) {
                let parsedResponse = await response.json();
                this.drawNewTask({isNew: true, ...parsedResponse});
                return parsedResponse;
            } else {
                this.showAlert("error", "Server is unavailable. Check your internet connection and try again later");
            }

        } catch (error) {
            this.showAlert("error", "Server is unavailable. Check your internet connection and try again later");
            return { isError: true, ...error };
        }
    }
}


// Привязываем слушатель к форме
form.addEventListener("submit", function (event) {
    event.preventDefault();
    
    let responseForm = {};

    const formData = new FormData(form);
    for (let entry of formData.entries()) {
        if (!(entry[0] && entry[1])) {
            ToDo.showAlert("error", "You can not add new task without text and selected user!");
            return false;
        }
        responseForm[entry[0]] = entry[1];
    }

    form.reset();

    // ToDo.fillTodos(10)
    // .then(response => ToDo.makeTodo(responseForm.todo, responseForm.user));

    ToDo.makeTodo(responseForm.todo, responseForm.user);
})



ToDo.fillUsers()
    .then(r => ToDo.fillTodos(Number(new URL(window.location.href).getParam("page")) || 1))
    .catch(error => ToDo.showAlert("error", error.message));

