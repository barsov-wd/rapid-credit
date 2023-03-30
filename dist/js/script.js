document.addEventListener('DOMContentLoaded', () => {

    const sumInput = document.querySelector('.calc__input--sum'),
        timeInput = document.querySelector('.calc__input--time'),
        payt = document.querySelector('.calc__pt'),
        rangeTimeInput = document.querySelector('.range__input--time'),
        rangeSumInput = document.querySelector('.range__input--sum'),
        dateText = document.querySelector('.calc__input-text-right--date'),
        sumInputModal = document.querySelector('.modal__input--sum'),
        timeInputModal = document.querySelector('.modal__input--time'),
        paytModal = document.querySelector('.modal__pt'),
        rangeTimeInputModal = document.querySelector('.modal-range__input--time'),
        rangeSumInputModal = document.querySelector('.modal-range__input--sum'),
        dateTextModal = document.querySelector('.modal__input-text-right--date');



    // range + calc

    // маска
    function prettify(num) {
        var n = num.toString();
        return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ');
    }

    function getPayment(sum, period, rate) {
        // *
        // * sum - сумма кредита
        // * period - срок в годах
        // * rate - годовая ставка в процентах
        // * payt - поле, куда будет вывобиться платеж
        let i,
            koef;

        // ставка в месяц
        i = (rate / 12) / 100;

        // коэффициент аннуитета
        koef = (i * (Math.pow(1 + i, period * 12))) / (Math.pow(1 + i, period * 12) - 1);

        // итог
        // payt.textContent = (sum * koef).toFixed().replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ');
    }

    function range(input, progress, content) {
        const input$ = document.querySelector(input);
        const progress$ = document.querySelector(progress);
        if (input$) {
            const val = input$.value;
            const min = input$.getAttribute('min');
            const max = input$.getAttribute('max');
            const step = input$.getAttribute('step');
            const position = 100 / (max - step) * (val - step);
            updateRangePosition(progress$, position);

            input$.addEventListener('input', () => {
                const val = input$.value;
                const min = input$.getAttribute('min');
                const max = input$.getAttribute('max');
                const step = input$.getAttribute('step');
                const position = 100 / (max - step) * (val - step);
                updateRangePosition(progress$, position);
                content.value = prettify(val);
            });
        }
    }

    function updateRangePosition(progress$, position) {
        if (progress$) {
            progress$.style.width = `${position}%`;
        }
    }

    function calc() {
        let sum = +sumInput.value.replace(/\D/g, ''),
            period = +timeInput.value.replace(/\D/g, '');

        getPayment(sum, period, 6.5);
    }



    function checkSymbols(input, event, maxValue) {
        input.addEventListener(event, () => {
            if (maxValue) {
                if (input.value[0] == 0) {
                    input.value = input.value.replace(/./g, '');
                }

                input.value = input.value.replace(/\D/g, '');

                input.value = prettify(input.value);

                if (+input.value.replace(/\D/g, '') > maxValue) {
                    input.value = prettify(maxValue);
                }
            }
            if ((+sumInput.value.replace(/\D/g, '') >= 12000 && +sumInput.value.replace(/\D/g, '') <= 100000) && (+timeInput.value.replace(/\D/g, '') >= 1 && +timeInput.value.replace(/\D/g, '') <= 6)) {
                calc();
            } else {
                payt.textContent = '0';
            }

            if ((+sumInputModal.value.replace(/\D/g, '') >= 12000 && +sumInputModal.value.replace(/\D/g, '') <= 100000) && (+timeInputModal.value.replace(/\D/g, '') >= 1 && +timeInputModal.value.replace(/\D/g, '') <= 6)) {
                calc();
            } else {
                paytModal.textContent = '0';
            }


            switch (timeInput.value) {
                case '1':
                    dateText.textContent = 'месяц';
                    break;

                case '2':
                case '3':
                case '4':
                    dateText.textContent = 'месяца';
                    break;
                case '5':
                case '6':
                    dateText.textContent = 'месяцев';
                    break;
            }


            switch (timeInputModal.value) {
                case '1':
                    dateTextModal.textContent = 'месяц';
                    break;

                case '2':
                case '3':
                case '4':
                    dateTextModal.textContent = 'месяца';
                    break;
                case '5':
                case '6':
                    dateTextModal.textContent = 'месяцев';
                    break;
            }
        });
    }

    range('.range__input--sum', '.range__track--sum', sumInput);
    range('.range__input--time', '.range__track--time', timeInput);
    checkSymbols(sumInput, 'input', 100000);
    checkSymbols(timeInput, 'input', 6);
    checkSymbols(rangeSumInput, 'change');
    checkSymbols(rangeTimeInput, 'change');


    range('.modal-range__input--sum', '.modal-range__track--sum', sumInputModal);
    range('.modal-range__input--time', '.modal-range__track--time', timeInputModal);
    checkSymbols(sumInputModal, 'input', 100000);
    checkSymbols(timeInputModal, 'input', 6);
    checkSymbols(rangeSumInputModal, 'change');
    checkSymbols(rangeTimeInputModal, 'change');

    // Slider

    const sliders = (slides, dir, prev, next) => {
        let slideIndex = 1;
        const items = document.querySelectorAll(slides);


        function showSlides(n) {
            if (n > items.length) {
                slideIndex = 1;
            }

            if (n < 1) {
                slideIndex = items.length;
            }

            items.forEach(item => {
                item.classList.add('animated');
                item.style.display = 'none';
            });

            // items[slideIndex - 1].style.transition = '0.8s all';
            items[slideIndex - 1].style.display = 'block';
        }

        showSlides(slideIndex);

        function plusSlides(n) {
            showSlides(slideIndex += n);
        }


        try {
            const prevBtn = document.querySelector(prev),
                nextBtn = document.querySelector(next);

            prevBtn.addEventListener('click', () => {
                plusSlides(-1);
                items[slideIndex - 1].classList.remove('fade');
                items[slideIndex - 1].classList.add('fade');
            });

            nextBtn.addEventListener('click', () => {
                plusSlides(1);
                items[slideIndex - 1].classList.remove('fade');
                items[slideIndex - 1].classList.add('fade');
            });

            let initialPoint;
            let finalPoint;
            items.forEach((item) => {
                item.addEventListener('touchstart', (e) => {
                    e.stopPropagation();
                    initialPoint = e.changedTouches[0];
                }, false);
            });
            items.forEach(item => {
                item.addEventListener('touchend', (e) => {
                    e.stopPropagation();
                    finalPoint = e.changedTouches[0];
                    let xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
                    let yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
                    if (xAbs > 20 || yAbs > 20) {
                        if (xAbs > yAbs) {
                            if (finalPoint.pageX < initialPoint.pageX) {
                                plusSlides(-1);
                            } else {
                                plusSlides(1);
                            }
                        }
                    }
                }, false);
            });

        } catch (e) { }
    };

    sliders('.reviews__item', '', '.reviews__arrow-prev', '.reviews__arrow-next');

    // функция для модалки

    function calcScroll() {
        let div = document.createElement('div');

        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        let scarollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scarollWidth;
    }

    let scrollWidth = calcScroll();

    function modal(modal, modalActiveClass, triggers, modalClose) {
        const triggers_ = document.querySelectorAll(triggers),
            modal_ = document.querySelector(modal),
            modalClose_ = document.querySelector(modalClose);

        if (triggers_.length > 0) {
            triggers_.forEach(item => {
                item.addEventListener('click', () => {
                    modal_.classList.add(modalActiveClass);
                    document.body.style.overflow = 'hidden';
                    document.body.style.marginRight = `${scrollWidth}px`;
                });
            });

            modalClose_.addEventListener('click', () => {
                modal_.classList.remove(modalActiveClass);
                document.body.style.overflow = '';
                document.body.style.marginRight = '0px';
            });

            modal_.addEventListener('click', (e) => {
                if (e.target.classList.contains('modal__container')) {
                    modal_.classList.remove(modalActiveClass);
                    document.body.style.overflow = '';
                    document.body.style.marginRight = '0px';
                }
            });
        }
    }

    modal('.modal-main', 'modal--active', '[data-modal]', '.modal-main__close');

});