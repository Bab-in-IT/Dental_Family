// Соглашение об использовании cookie — показывается всегда, скрывается по кнопке «Принять»
document.addEventListener("DOMContentLoaded", () => {
    const popup = document.getElementById("cookiePopup");
    const acceptBtn = document.getElementById("cookieAcceptBtn");
    if (popup && acceptBtn) {
        popup.classList.add("cookie-popup_visible");
        acceptBtn.addEventListener("click", () => popup.classList.remove("cookie-popup_visible"));
    }
});

function menu() {
    const menuHeader = document.querySelector('.menu_mob');
    if (!menuHeader) return;

    if (menuHeader.style.display === 'none' || menuHeader.style.display === '' ) {
        menuHeader.style.display = 'flex';
    } else {
        menuHeader.style.display = 'none';
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const sliderDoc = document.querySelector('.doctors__people');
    const prevDoc = document.getElementById("doc-prev");
    const nextDoc = document.getElementById("doc-next");
    let slides = Array.from(sliderDoc.querySelectorAll('.doctors__case')); // Массив всех карточек
    const visibleSlidesCount = 4; // Количество видимых карточек
    let currentStartIndex = 0; // Текущий индекс начала просмотра

    function reorderSlides(startIndex) {
        const newOrder = [];
            
        for (let i = 0; i < slides.length; i++) {
            const index = (i + startIndex) % slides.length; newOrder.push(index);
        }
                
        // Перестраиваем порядок карточек в слайдере
        newOrder.forEach((index, pos) => {
            if (!sliderDoc.contains(slides[index])) { // Если карточка удалялась ранее, добавляем её снова
                sliderDoc.appendChild(slides[index]);
                }
                    
                slides[index].style.order = pos.toString(); // Устанавливаем CSS order
                });
            }

            function updateSlider() {
                reorderSlides(currentStartIndex); // Перемещаем карточки согласно новому порядку
                slides.forEach(slide => slide.style.display = 'block'); // Все карточки теперь видны
            }

            if (prevDoc && nextDoc) {
                prevDoc.addEventListener('click', () => {
                    currentStartIndex = (currentStartIndex - 1 + slides.length) % slides.length;
                    updateSlider();
                });

                nextDoc.addEventListener('click', () => {
                    currentStartIndex = (currentStartIndex + 1) % slides.length;
                    updateSlider();
                });
            }

            // Инициализация
            updateSlider();
        });

    document.addEventListener("DOMContentLoaded", () => {
        const sliderRev = document.querySelector('.reviews__clients');
        const prevRev = document.getElementById("rev-prev");
        const nextRev = document.getElementById("rev-next");
        let slides = Array.from(sliderRev.querySelectorAll('.reviews__case'));
        const visibleSlidesCount = 2; // Количество видимых карточек
        let currentStartIndex = 0; // Текущий индекс начала просмотра

        function reorderSlides(startIndex) {
            const newOrder = [];
            for (let i = 0; i < slides.length; i++) {
                const index = (i + startIndex) % slides.length;
                    newOrder.push(index);
            }

                // Переставляем карточки в новом порядке
            newOrder.forEach((index, pos) => {
                if (!sliderRev.contains(slides[index])) {
                        sliderRev.appendChild(slides[index]); // Возвращаем карточку в контейнер
                }
                slides[index].style.order = pos.toString(); // Правильный порядок
            });
        }

        function updateSlider() {
            reorderSlides(currentStartIndex); // Обновляем порядок карточек

            // Отображаем только текущие две карточки
            slides.forEach((slide, idx) => {
                slide.style.display = (
                     idx === currentStartIndex || idx === (currentStartIndex + 1) % slides.length
                    ) ? 'block' : 'none'; // Проверяем только текущие две карточки
            });
        }

        if (prevRev && nextRev) {
             prevRev.addEventListener('click', () => {
                currentStartIndex = (currentStartIndex - 1 + slides.length) % slides.length;
                    updateSlider();
            });

            nextRev.addEventListener('click', () => {
                 currentStartIndex = (currentStartIndex + 1) % slides.length;
                    updateSlider();
            });
        }

        // Первоначальное отображение
        updateSlider();
    }); 

    document.addEventListener("DOMContentLoaded", () => {
    // Проверка ширины экрана
        const isMobile = window.matchMedia("(max-width: 700px)").matches;

        if (!isMobile) return; // Выходим, если не мобильное устройство

        const azotMenu = document.querySelector('.differences__content_left');
        const sonMenu = document.querySelector('.differences__content_right');
        const azotOn = document.querySelector('.differences__azot-on');
        const azotOff = document.querySelector('.differences__azot-off');
        const sonOn = document.querySelector('.differences__son-on');
        const sonOff = document.querySelector('.differences__son-off');

        // Инициализация по умолчанию
        toggleSection('azot');

        // Обработчики событий
        document.querySelectorAll('.js-azot').forEach(btn => {
            btn.addEventListener('click', () => toggleSection('azot'));
        });

        document.querySelectorAll('.js-son').forEach(btn => {
            btn.addEventListener('click', () => toggleSection('son'));
        });

        // Функция переключения разделов
        function toggleSection(activeSection) {
            [azotMenu, sonMenu].forEach(el => el.style.display = 'none');
            [azotOn, azotOff, sonOn, sonOff].forEach(el => el.style.display = 'none');

            if (activeSection === 'azot') {
                azotMenu.style.display = 'flex';
                azotOn.style.display = 'flex';
                sonOff.style.display = 'flex';
            } else if (activeSection === 'son') {
                sonMenu.style.display = 'flex';
                sonOn.style.display = 'flex';
                azotOff.style.display = 'flex';
            }
        }
    });

document.addEventListener("DOMContentLoaded", () => {
    // Функция для инициализации карусели
    function initCarousel(carouselContainer) {
        const images = carouselContainer.querySelectorAll('.about-us__img');
        const dotsContainer = carouselContainer.querySelector('.about-us__carousel-dots');
        const dots = dotsContainer ? dotsContainer.querySelectorAll('.about-us__dot') : [];

        if (images.length === 0 || dots.length === 0) return;

        let currentImage = 0;

        function showImage(index) {
            index = Math.max(0, Math.min(index, images.length - 1));
            images.forEach(img => img.style.display = 'none');
            if (images[index]) {
                images[index].style.display = 'block';
            }

            dots.forEach(dot => dot.classList.remove('activedot'));
            if (dots[index]) {
                dots[index].classList.add('activedot');
            }
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentImage = index;
                showImage(currentImage);
            });
        });

        showImage(currentImage);
    }

    // Определяем активную карусель
    const desktopCarousel = document.querySelector('.about-us__img-box.about-us__carousel');
    const mobileCarousel = document.querySelector('.about-us__img-mob.about-us__carousel');

    function checkActiveCarousel() {
        const isMobile = window.innerWidth <= 700;

        // Скрываем все карусели
        if (desktopCarousel) desktopCarousel.style.display = 'none';
        if (mobileCarousel) mobileCarousel.style.display = 'none';

        // Показываем нужную
        if (isMobile && mobileCarousel) {
            mobileCarousel.style.display = 'flex';
            initCarousel(mobileCarousel);
        } else if (desktopCarousel) {
            desktopCarousel.style.display = 'flex';
            initCarousel(desktopCarousel);
        }
    }

    // Инициализация при загрузке и изменении размера экрана
    checkActiveCarousel();
    window.addEventListener('resize', checkActiveCarousel);
});

document.addEventListener("DOMContentLoaded", () => {
    const sliderSale = document.querySelector('.sale__content-box');
    const nextBtn = document.querySelector('.sale__svg');
    let slides = Array.from(sliderSale.querySelectorAll('.sale__content')); // Массив всех слайдов
    const visibleSlidesCount = 1; // Количество видимых слайдов
    let currentStartIndex = 0; // Текущий индекс начала просмотра

    function reorderSlides(startIndex) {
        const newOrder = [];
        
        // Создаем новый порядок слайдов, начиная с startIndex
        for (let i = 0; i < slides.length; i++) {
            const index = (i + startIndex) % slides.length;
            newOrder.push(index);
        }
        
        // Перестраиваем порядок слайдов в контейнере
        newOrder.forEach((index, pos) => {
            if (!sliderSale.contains(slides[index])) {
                sliderSale.appendChild(slides[index]);
            }
            slides[index].style.order = pos.toString(); // Устанавливаем CSS order
        });
    }

    function updateSlider() {
        reorderSlides(currentStartIndex); // Перемещаем слайды согласно новому порядку
        slides.forEach(slide => slide.style.display = 'block'); // Все слайды теперь видны
    }

    // Обработчик для кнопки "вперед"
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentStartIndex = (currentStartIndex + 1) % slides.length;
            updateSlider();
        });
    }

    // Инициализация
    updateSlider();
});

document.addEventListener("DOMContentLoaded", () => {
    // Функция для инициализации карусели
    function initSaleCarousel(container) {
        const slides = container.querySelectorAll('.sale__content');
        const dotsContainer = container.querySelector('.sale__dots');
        const dots = dotsContainer ? dotsContainer.querySelectorAll('.sale__dot') : [];

        if (slides.length === 0 || dots.length === 0) {
            console.error('Элементы .sale__content или .sale__dot не найдены!');
            return;
        }

        let currentSlide = 0;

        function showSlide(index) {
            // Ограничиваем индекс диапазоном [0, slides.length - 1]
            index = Math.max(0, Math.min(index, slides.length - 1));

            // Скрываем все слайды
            slides.forEach(slide => slide.style.display = 'none');

            // Показываем текущий слайд
            if (slides[index]) {
                slides[index].style.display = 'block';
                console.log(`Показан слайд ${index}`);
            } else {
                console.warn(`Слайд с индексом ${index} не существует!`);
            }

            // Удаляем активный класс у всех точек
            dots.forEach(dot => dot.classList.remove('activedot'));

            // Добавляем активный класс к текущей точке
            if (dots[index]) {
                dots[index].classList.add('activedot');
                console.log(`Активная точка: ${index}`);
            } else {
                console.warn(`Точка с индексом ${index} не существует!`);
            }
        }

        // Обработчики для точек
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
                console.log(`Нажата точка ${index}`); // Лог для диагностики
            });
        });

        // Инициализация: показываем первый слайд
        showSlide(currentSlide);
    }

    // Определяем контейнер карусели
    const saleCarousel = document.querySelector('.sale__box'); // 

    // Функция для активации карусели на мобильных устройствах
    function activateMobileCarousel() {
        if (window.innerWidth <= 700 && saleCarousel) {
            initSaleCarousel(saleCarousel);
        }
    }

    // Инициализация при загрузке и изменении размера экрана
    activateMobileCarousel();
    window.addEventListener('resize', activateMobileCarousel);
});

document.addEventListener("DOMContentLoaded", () => {
    // Функция для инициализации карусели
    function initForWhomCarousel(container) {
        const slides = container.querySelectorAll('.for-whom__content');
        const dotsContainer = container.querySelector('.for-whom__dots');
        const dots = dotsContainer ? dotsContainer.querySelectorAll('.for-whom__dot') : [];

        let currentSlide = 0;

        function showSlide(index) {
            // Ограничиваем индекс диапазоном [0, slides.length - 1]
            index = Math.max(0, Math.min(index, slides.length - 1));

            // Скрываем все слайды
            slides.forEach(slide => slide.style.display = 'none');

            // Показываем текущий слайд
            if (slides[index]) {
                slides[index].style.display = 'block';
                console.log(`Показан слайд ${index}`);
            } else {
                console.warn(`Слайд с индексом ${index} не существует!`);
            }

            // Удаляем активный класс у всех точек
            dots.forEach(dot => dot.classList.remove('activedot'));

            // Добавляем активный класс к текущей точке
            if (dots[index]) {
                dots[index].classList.add('activedot');
                console.log(`Активная точка: ${index}`);
            } else {
                console.warn(`Точка с индексом ${index} не существует!`);
            }
        }

        // Обработчики для точек
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
                console.log(`Нажата точка ${index}`); // Лог для диагностики
            });
        });

        // Инициализация: показываем первый слайд
        showSlide(currentSlide);
    }

    // Определяем контейнер карусели
    const forWhomCarousel = document.querySelector('.for-whom__content-box'); // 

    // Функция для активации карусели на мобильных устройствах
    function activateMobileCarousel() {
        if (window.innerWidth <= 700 && forWhomCarousel) {
            initForWhomCarousel(forWhomCarousel);
        }
    }

    // Инициализация при загрузке и изменении размера экрана
    activateMobileCarousel();
    window.addEventListener('resize', activateMobileCarousel);
});











