window.addEventListener('DOMContentLoaded', () => {
    
    const contents = document.querySelectorAll('.tabcontent');
    const tabItems = document.querySelectorAll('.tabheader__item');

    function deactivateAll() {
        contents.forEach((cont, i) => {
            cont.style.display = 'none';
            tabItems[i].classList.remove('tabheader__item_active');
        })
    }

    function activateOne(c=0) {
        for (let i=0; i<contents.length; i++) {
            if (i == c) {
                contents[i].style.display = 'block';
                tabItems[i].classList.add('tabheader__item_active');
            }
        }
    }

    deactivateAll();
    activateOne();

    tabItems.forEach((tab, i) => {
        tab.addEventListener('click', (evt) => {
            deactivateAll();
            activateOne(i);
        })
    });

    //dateTimer

    const timeX = '2021-01-18';

    function lostTime() {
        const diffTime = Date.parse(timeX) - Date.parse(new Date());

        return {
            'msAll': diffTime,
            'days': Math.floor(diffTime/1000/60/60/24),
            'hours': Math.floor(diffTime/(1000*60*60))%24,
            'minutes': Math.floor(diffTime/(1000*60))%60,
            'seconds': Math.floor(diffTime/1000)%60
        }
    }

    function makeFirstZero(number) {
        if (number < 10 ) return `0${number}`;
        return number;
    }
    
    function inputTime() {
        
        const nowlostTime = lostTime();
        const timer = document.querySelector('.timer');
        days = timer.querySelector('#days');
        hours = timer.querySelector('#hours');
        minutes = timer.querySelector('#minutes');
        seconds = timer.querySelector('#seconds');
        if (nowlostTime.msAll > 0) {
            days.textContent = makeFirstZero(nowlostTime.days);
            hours.textContent = makeFirstZero(nowlostTime.hours);
            minutes.textContent = makeFirstZero(nowlostTime.minutes);
            seconds.textContent = makeFirstZero(nowlostTime.seconds);
        }
    }

    inputTime();
    setInterval(inputTime, 1000);

    // modal

    const modal = document.querySelector('.modal');
    const btnModals = document.querySelectorAll('[data-modal]');

    function closeModal() {
        // modal.style.display = 'none';
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = ''; // прокрутка по умолчанию
    }

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        // modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // бирает прокрутку
        clearInterval(modalTimer);

    }

    btnModals.forEach(btn => {
            btn.addEventListener('click', openModal);
    });


    modal.addEventListener('click', (evt) => {
        if (evt.target == modal || evt.target.classList.contains('modal__close')) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (evt) => {
        if (evt.code == 'Escape') {
            closeModal();
        }
    });

    // открывает модальное окно, когда страница дошла (почти) до конца
    function showModalByScroll(){
        // сколько уже пролистано + высота клиентскоо окна >= полная область прокрутки документа по высоте
        if ((window.pageYOffset + document.documentElement.clientHeight)*1.02 >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll); // отменяет саму себя после 1-го выполнения
         }
    }
    window.addEventListener('scroll', showModalByScroll);

    const modalTimer = setTimeout(openModal, 50000);

    class Menu {
        constructor(src, alt, subtitle, descr, price, selector) {
            this.src = src;
            this.alt = alt;
            this.subtitle = subtitle;
            this.descr = descr;
            this.price = price;
            this.selector = selector;
        }

        elementAdder() {
           const div = document.createElement('div');
           div.innerHTML = `
            <div class="menu__item">
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.subtitle}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            </div>
           `
           document.querySelector(this.selector).append(div); 
        }
    }

    const getResourses = async (url) => {
        const res = await fetch(url);
        
        if (!res.ok) {
            throw new Error(`getResourses: very bad: status = ${res.status}`);
        }

        return await res.json();
    };

    getResourses('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new Menu(img, altimg, title, descr, price*40, '.menu__field .container').elementAdder();
            });
        });


    // axios - вместо getResourses
    // axios.get('http://localhost:3000/menu')
    //     .then(data => {
    //         data.data.forEach(({img, altimg, title, descr, price}) => {
    //             new Menu(img, altimg, title, descr, price*40, '.menu__field .container').elementAdder();
    //         });
    //     });

    // forms

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/forms/sp.svg',
        success: 'все хорошо',
        failure: 'все плохо'
    };

    forms.forEach(item => {
        postDataBind(item);
    });

    async function postData(url, data){
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            // body: JSON.stringify(data)
            body: data
        });
        return await res.json();
    }

    function postDataBind(form) {
        form.addEventListener('submit', (evt) => {
            evt.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.alt = 'loading';
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form); //объект, представляющий данные HTML формы. Если передать в конструктор элемент HTML-формы form, то создаваемый объект автоматически прочитает из неё поля.

            const json = JSON.stringify(Object.fromEntries(formData.entries()));
  
            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset(); // очищает форму
            });
        });
    }
    function showThanksModal(messege) {
        const prewModalWindow = document.querySelector('.modal__dialog');

        prewModalWindow.classList.add('hide');
        openModal();

        const insertWindow = document.createElement('div');
        insertWindow.classList.add('modal__dialog');
        insertWindow.innerHTML = `
            <div class='modal__content'>
                <div class="modal__close">&times;</div>
                <div class="modal__title">${messege}</div>
            </div>
        `;
        document.querySelector('.modal').append(insertWindow);
        setTimeout(() => {
            insertWindow.remove();
            prewModalWindow.classList.remove('hide');
            closeModal();
        }, 2500);
    }

    // slider

    const sliders = document.querySelectorAll('.offer__slide');
    const slidePrev = document.querySelector('.offer__slider-prev');
    const slideNext = document.querySelector('.offer__slider-next');
    let numberSlider = 0;
    let offset = 0;

    const currentSlideNum = document.querySelector('#current');
    const totalSlideNum = document.querySelector('#total');
    const sliderWrapper = document.querySelector('.offer__slider-wrapper'); // контейнер для контейнера, чтобы прятать все что не влезло
    const sliderInner = document.querySelector('.offer__slider-inner'); // контейнер со всеми слайдерами
    const width = window.getComputedStyle(sliderWrapper).width;

    totalSlideNum.textContent = makeFirstZero(sliders.length);

    sliderInner.style.width = sliders.length * 100 + '%'; // делаем sliderInner шириной со все слайды в нем 
    sliderInner.style.display = 'flex'; // контейнер со  слайдерами в один ряд
    sliderInner.style.transition = '0.5s all' // время трансформации
    sliderWrapper.style.overflow = 'hidden' // прячем все что не влезло (sliderInner)  за границами sliderWrapper
    sliders.forEach(slide => {slide.style.width = width}); // каждфй слайд - шириной в sliderWrapper

    slideNext.addEventListener('click', () => {
        if (offset == parseFloat(width) * (sliders.length-1)) {
            offset = 0;
            numberSlider = 0;
        } else {
            offset += parseFloat(width);
            numberSlider += 1;
        }
        currentSlideNum.textContent = makeFirstZero(numberSlider+1);
        sliderInner.style.transform = `translateX(-${offset}px)`;
    })

    slidePrev.addEventListener('click', () => {
        if (offset == 0) {
            offset = (sliders.length-1) * parseFloat(width);
            numberSlider = sliders.length-1;
        } else {
            offset -= parseFloat(width);
            numberSlider -= 1;
        }
        currentSlideNum.textContent = makeFirstZero(numberSlider+1);
        sliderInner.style.transform = `translateX(-${offset}px)`
    })

    // function hideAllSliders() {
    //     sliders.forEach( slide => {
    //         slide.classList.add('hide');
    //     })
    // }

    // function showOneSlide(num=0) {
    //     sliders.forEach((slide, i) => {
    //         if(i == num) {
    //             sliders[i].classList.remove('hide')
    //         }
    //     })
    // }

    // function ShowRightSlide(num) {     
    //     hideAllSliders();
    //     showOneSlide(num);
    //     currentSlideNum.textContent = makeFirstZero(num+1);
    // }

    // slidePrev.addEventListener('click', () => {
    //     if (numberSlider > 0) {
    //         numberSlider -= 1;
    //     } else {
    //         numberSlider = sliders.length-1;
    //     }

    //     ShowRightSlide(numberSlider)
    // })

    // slideNext.addEventListener('click', () => {
    //     if (numberSlider < sliders.length-1) {
    //         numberSlider += 1;
    //     } else {
    //         numberSlider = 0;
    //     }

    //     ShowRightSlide(numberSlider)
    // })

    // hideAllSliders();
    // showOneSlide();

    

    /*
    npx json-server --watch db.json
    */
});

