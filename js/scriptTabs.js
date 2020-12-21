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

    const timeX = '01-18-2021';

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
        if (nowlostTime.minutes > 0) {
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

    new Menu(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        229,
        '.menu__field .container'
    ).elementAdder();

    new Menu(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        550,
        '.menu__field .container'
    ).elementAdder();

    new Menu(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        430,
        '.menu__field .container'
    ).elementAdder();


    // forms

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/forms/sp.svg',
        success: 'все хорошо',
        failure: 'все плохо'
    };

    forms.forEach(item => {
        postData(item);
    });

    function postData(form) {
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

            //
            // для отправке в формате JSON
            const obj = {};
            formData.forEach(function(value, key) {
                obj[key] = value;
            });

            
            fetch('server.php', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(obj)
            })
            .then(data => data.text())
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
});

