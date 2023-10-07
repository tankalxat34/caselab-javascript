const products = [
    {
        id: 1,
        title: 'Lenovo Yoga',
        price: 3000,
    },
    {
        id: 2,
        title: 'Acer Aspire',
        price: 1800,
    },
    {
        id: 3,
        title: 'Dell Vostro',
        price: 3400
    },
];

let order = [];


/**
 * Метод группирует массив одинаковой структуры по какому либо ключу. Возвращает объект.
 * @param {String} key Ключ, по которому надо сгруппировать массив
 * @retuns Объект
 */
Array.prototype.groupBy = function (key) {
    let newProducts = {};
    for (let i = 0; i < this.length; i++) newProducts[this[i][key]] = { ...this[i] };
    return newProducts;
}


const productsRestructured = products.groupBy("id");



function addToBasket(productId) {
    // TODO: добавить проверку наличия товара в заказе (при наличии выдать alert, что товар уже в корзине)
    // TODO: если товар еще не в корзине, добавить его из массива products

    Object.keys(order.groupBy("id")).includes(String(productId)) ? alert("Товар уже в корзине!") : order.push(productsRestructured[productId]);

    // Эти строчки не трогаем, они отвечают за переотрисовку страницы
    renderCart();
    rerenderTotalPrice();
}

function removeFromBasket(productId) {
    // TODO: описать логику удаления товара из корзины

    for (let i = 0; i <= order.length; i++) {
        if (order[i].id == productId) {
            order.splice(i, 1);
            break;
        }
    }

    // Эти строчки не трогаем, они отвечают за переотрисовку страницы
    renderCart();
    rerenderTotalPrice();
}


function rerenderTotalPrice() {
    // √ TODO: опишите функционал подсчета общей стоимости заказа
    let totalPrice = order.reduce((accumulator, item) => {
        return accumulator + item.price;
    }, 0);

    // Не меняйте эту строчку
    document.getElementById('total').innerText = totalPrice;
}

// Этот метод остается без изменений
function renderCart() {
    const cart = document.getElementById('basket-items');

    cart.innerHTML = '';
    order.forEach(item => {
        const el = document.createElement('li');
        el.innerText = item.title;
        el.onclick = () => removeFromBasket(item.id);
        cart.appendChild(el);
    })
}