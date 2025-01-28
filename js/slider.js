function createSlider(images, options = {}) {

    const {
        showButtons = true,      // стрелки?
        showIndicators = true,   // точки?
        darkOverlay = false,      // затемнять?
        interactivity = true // тач?

    } = options;

    // создаем div.slider-container в котором будут div.slider-track div.slider-controls div.slider-indicators
    const sliderContainer = document.createElement('div');
    sliderContainer.classList.add('slider-container');


    // если нужно затемнение (darkOverlay), добавим специальный класс
    if (darkOverlay) {
        sliderContainer.classList.add('slider-dark-overlay');
    }


    const slidesTrack = document.createElement('div');
    slidesTrack.classList.add('slider-track');

    const controls = document.createElement('div');
    controls.classList.add('slider-controls');

    const prevButton = document.createElement('button');
    prevButton.textContent = '<';

    const nextButton = document.createElement('button');
    nextButton.textContent = '>';

    // если тру помещаем их внутрь div.slider-controls
    if (showButtons && interactivity) {
        controls.appendChild(prevButton);
        controls.appendChild(nextButton);
    }

    const indicators = document.createElement('div');
    indicators.classList.add('slider-indicators');

    //уже все три помещаем div.slider-container
    sliderContainer.appendChild(slidesTrack);
    sliderContainer.appendChild(controls);

    if (showIndicators && interactivity) {
        sliderContainer.appendChild(indicators);
    }

    //создаем слайды и индикаторы
    images.forEach((imgObj, index) => { //проходимся по imgObj то есть по src и alt нашего images

        //отдельный слайд большого слайдера
        const slide = document.createElement('div');
        slide.classList.add('slide-item');

        // if (index === 0) slide.classList.add('active'); // актив так как первый элемент и будет виден по умолчанию

        const imageEl = document.createElement('img'); // там где хранится путь и альт

        imageEl.src = imgObj.src;
        imageEl.alt = imgObj.alt;

        slide.appendChild(imageEl); // тут картинку помещаем внутрь div.slide-item

        slidesTrack.appendChild(slide);// а тут уже будет div.slide-item > img в сам трек

        // точка для каждого слайда
        if (showIndicators && interactivity) {
            const dot = document.createElement('div');
            dot.classList.add('dot');

            if (index === 0) dot.classList.add('active'); // актив так как первый элемент и будет виден по умолчанию
            dot.dataset.index = index; // чтобы по клику знатть какой индекс и к чему переключиться

            indicators.appendChild(dot); // div.dot добавляем в div.slider-indicators
        }
    });

    //! главная часть работы
    let currentIndex = 0; //индекс слайда 0
    let autoTimer;
    const INTERVAL = 2000; // время   
    let paused = false; // флаг для пробела

    // тут группируем все слайды и точки
    const allSlides = slidesTrack.querySelectorAll('.slide-item');
    const allDots = indicators.querySelectorAll('.dot');

    //переключение на слайд по индексу к которому почти все сводится
    function goToSlide(index) {
        if (allDots && allDots.length > 0) {
            allDots[currentIndex].classList.remove('active');
            allDots[index].classList.add('active');
        }
        // allSlides[currentIndex].classList.remove('active');

        currentIndex = index;
        slidesTrack.style.transform = `translateX(-${currentIndex * 100}%)`;

        // allSlides[currentIndex].classList.add('active');
        // allDots[currentIndex].classList.add('active');
    }

    // переключение на некст слайд
    function nextSlide() {
        let newIndex = currentIndex + 1; // просто + 
        if (newIndex >= images.length) newIndex = 0; // проверка если вышли за пределы то снова начинаем с 0
        goToSlide(newIndex); // вызываем goToSlide передали индекс и переключились
    }

    // переключение на прев слайд (как и выше ток наооборот)
    function prevSlide() {
        let newIndex = currentIndex - 1;
        if (newIndex < 0) newIndex = images.length - 1;
        goToSlide(newIndex);
    }

    // главная автопрокрутка
    function startAutoPlay() {
        autoTimer = setInterval(() => {
            nextSlide();
        }, INTERVAL); // то есть каждый 3.5 секи вызываем nextSlide
    }

    // тут по сути отсанавливаем если нам мешает но потом можем перезапустить через startAutoPlay
    function stopAutoPlay() {
        clearInterval(autoTimer);
    }

    startAutoPlay(); //запускаем при первом взаимодействии по умолчанию


    // перезапустим после клика на некст стрелку

    if (interactivity) {
        if (showButtons) {
            nextButton.addEventListener('click', () => {
                stopAutoPlay();
                nextSlide();
                startAutoPlay();
            });

            // перезапустим после клика на прев стрелку
            prevButton.addEventListener('click', () => {
                stopAutoPlay();
                prevSlide();
                startAutoPlay();
            });
        }
    }

    // клик по нашим точкам дот
    if (showIndicators) {
        indicators.addEventListener('click', (clck) => {

            if (clck.target.classList.contains('dot')) { //проверка если мы кликнули на точку div.dot

                const index = parseInt(clck.target.dataset.index); // получаем индекс слайда

                stopAutoPlay();
                goToSlide(index);
                startAutoPlay();
            }
        });
    }

    //пауза через пробел
    document.addEventListener('keydown', (event) => {

        if (event.code === 'Space') {

            paused = !paused;

            if (paused) {
                stopAutoPlay();
            } else {
                startAutoPlay();
            }
        }
    });

    // тач для тач устройств
    let startX = 0; // сюда запишем корду при первыом касании

    //отслеживаем и запоминаем касанае и сохраняем в startX
    slidesTrack.addEventListener('touchstart', (event) => {
        startX = event.touches[0].clientX;
    });


    slidesTrack.addEventListener('touchend', (event) => {
        const endX = event.changedTouches[0].clientX;

        if (startX > endX) { // свайп влево -> next
            stopAutoPlay();
            nextSlide();
            startAutoPlay();

        } else { // свайп вправо -> prev
            stopAutoPlay();
            prevSlide();
            startAutoPlay();
        }
    });

    // бекаем его назад и получаем уже в app.js
    return sliderContainer;
}
