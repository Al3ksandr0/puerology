// категоию и детали получаем по айди
const teaCategories = document.getElementById('teaCategories');
const teaDetails = document.getElementById('teaDetails');

// проходимся по teaData создаем элементы для категорий чая
teaData.forEach(tea => {
    const listItem = document.createElement('div'); // div для катгорри чая
    listItem.textContent = tea.name; // и засовываем название


    listItem.addEventListener('click', () => {
        showDetails(tea); // показ деталей выбранного чая

        // убираем класс актив у всех элементов категорий
        document.querySelectorAll('.tea-categories div').forEach(div => div.classList.remove('active'));
        listItem.classList.add('active'); // тут добавляем к текущему элементу
    });

    teaCategories.appendChild(listItem); // добавляем созданный div в блок с категориями
});

// тут идет отображение того чая который выбрали при клике 
function showDetails(tea) {

    teaDetails.innerHTML =
        `<h2>${tea.name}</h2>
        <p>${tea.description}</p>`;

    // проверка на подкатегории, то создаем их
    if (tea.subcategories) {
        const subcategories = document.createElement('div'); // блок для подкатегорий
        subcategories.classList.add('subcategories'); // класс
        subcategories.innerHTML = '<h3>категории пуэрчика:</h3>';

        // ссылки для каждой подкатегории 
        tea.subcategories.forEach(sub => {
            const link = document.createElement('a'); // создали ссылку
            link.textContent = sub.name; // название
            link.href = sub.link; // тут ссылку добавляем на подкатегорию
            subcategories.appendChild(link); // добавляем ссылку в блок под.
        });
        teaDetails.appendChild(subcategories); // добавляем блок подкатегорий в блок деталей
    }

    // если id чая соответствует 'pu-erh', добавляем карточки каталога

    if (tea.id === 'pu-erh') {
        const cardsContainer = document.createElement('div');
        cardsContainer.classList.add('tea-cards-container');

        catalog.forEach(item => {
            const card = document.createElement('div'); // карта чая
            card.classList.add('tea-card');

            // через js создаем и заполняем 
            card.innerHTML = `
            <a href="${item.link}">
              <img src="${item.img}" alt="${item.name}" />
              <h3>${item.name}</h3>
            </a>
          `;
            cardsContainer.appendChild(card); // добавляем карточку в контейнер
        });

        teaDetails.appendChild(cardsContainer); // добавляем контейнер карточек в блок деталей
    }


    // if (tea.images && tea.images.length > 0) {
    //     const sliderEl = createSlider(tea.images, {
    //         darkOverlay: false,
    //         interactivity: true,
    //         showButtons: true,
    //         showIndicators: true
    //     });
    //     teaDetails.appendChild(sliderEl); 
    // } 
}


const normalSlider = createSlider(normalImages, {
    darkOverlay: true,
    interactivity: false,
    showButtons: false,
    showIndicators: false
});


document.querySelector('.content-section').appendChild(normalSlider); 
