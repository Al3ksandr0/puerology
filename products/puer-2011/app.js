document.addEventListener('DOMContentLoaded', () => {

    const productNameElement = document.getElementById('productName');
    const productDescriptionElement = document.getElementById('productDescription');

    const availabilityElement = document.getElementById('availability');
    const sliderContainerElement = document.getElementById('sliderContainer');

    const radioOptionsElement = document.querySelector('.radio-options');
    const priceValueElement = document.getElementById('priceValue');

    const buyBtn = document.getElementById('buyBtn');
    const orderFormElement = document.querySelector('.order-form');

    const finishOrderBtn = document.getElementById('finishOrder');
    const notificationElement = document.querySelector('.notification');

    // подставляе данные из даты
    productNameElement.textContent = speciaTeaData.name;
    productDescriptionElement.textContent = speciaTeaData.description;

    //проверка налачия 
    if (speciaTeaData.availability === 'in-stock') {
        availabilityElement.textContent = 'в наличии';
        availabilityElement.classList.add('in-stock');
    } else if (speciaTeaData.availability === 'awaiting') {
        availabilityElement.textContent = 'ожидается';
        availabilityElement.classList.add('awaiting');
    } else {
        availabilityElement.textContent = 'нет в наличии';
        availabilityElement.classList.add('out-of-stock');
    }

    // слайдер 
    if (speciaTeaData.images && speciaTeaData.images.length > 0) {
        const sliderElement = createSlider(speciaTeaData.images, {
            showButtons: true,
            showIndicators: true,
            darkOverlay: false,
            interactivity: true
        });
        sliderContainerElement.appendChild(sliderElement);
    }

    // создаем радио кнопки 
    speciaTeaData.prices.forEach(priceObj => {
        const labelElement = document.createElement('label');
        labelElement.innerHTML = `
            <input type="radio" name="teaWeight" value="${priceObj.grams}">
            ${priceObj.grams} г (${priceObj.price} грн)
        `;
        radioOptionsElement.appendChild(labelElement);
    });

    // после выбора радио показываем цену и активируем кнопку
    let selectedGrams = null;
    let selectedPrice = null;

    radioOptionsElement.addEventListener('change', event => {

        if (event.target.name === 'teaWeight') { // проверяем какие изменение произошли в радио с именем teaWeight

            const gramsValue = parseInt(event.target.value); // получаем вес из выбранной кнопки
            const foundPrice = speciaTeaData.prices.find(p => p.grams === gramsValue); // ищем объект в массиве цен(speciaTeaData.prices), где grams совпадает с выбранным весом

            // ищем цену на основе веса
            if (foundPrice) {
                priceValueElement.textContent = foundPrice.price; // текст с ценой
                selectedGrams = foundPrice.grams; // сохраняем вес
                selectedPrice = foundPrice.price; // сохраняем цену
                buyBtn.disabled = false; // кнопка активирована
            }
        }
    });


    // при нажатии убираем класс и появляется форма ввода инфы
    buyBtn.addEventListener('click', () => {
        orderFormElement.classList.remove('hidden');
    });


    finishOrderBtn.addEventListener('click', () => {
        const clientName = document.forms.order.name.value.trim();
        const clientCity = document.forms.order.city.value.trim();

        if (!clientName || !clientCity) {
            alert('заполните все поля');
            return;
        }

        notificationElement.textContent = `спасибо, ${clientName}! ваш заказ принят:
        «${speciaTeaData.name}», ${selectedGrams} г, на сумму ${selectedPrice} грн.
        мы свяжемся с вами для уточнения деталей.`;

        notificationElement.classList.remove('hidden');

        setTimeout(() => {
            notificationElement.classList.add('hidden');
            orderFormElement.classList.add('hidden');
        }, 10000);
    });
});
