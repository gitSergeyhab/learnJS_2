/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function calcF() {

    const genderId = document.querySelector('#gender');
    const genders = genderId.querySelectorAll('.calculating__choose-item');
    const activityBig = document.querySelector('.calculating__choose_big');
    const activities = activityBig.querySelectorAll('.calculating__choose-item');
    const weightFild = document.querySelector('#weight');
    const heightFild = document.querySelector('#height');
    const ageFild = document.querySelector('#age');
    const resultCalc = document.querySelector('.calculating__result span');
    let sex, act;

    if (localStorage.getItem('sex')) {
        sex = +localStorage.getItem('sex');
        genderRemove(genders);
        genders.forEach(gender => {
            if (gender.getAttribute('data-sex') == localStorage.getItem('sexAtr')) {
                gender.classList.add('calculating__choose-item_active');
            }
        })
    } else {
        sex = -161;
    }

    if (localStorage.getItem('act')) {
        act = +localStorage.getItem('act');
        genderRemove(activities);
        activities.forEach(activity => {
            if (+activity.getAttribute('data-act') == localStorage.getItem('act')) {
                activity.classList.add('calculating__choose-item_active');
            }
        })
    } else {
        act = 1.375;
    }

    let weightVal = 0;
    let heightVal = 0;
    let ageVal = 0;

    function noDigitMakeRed(field) {
        if (field.value.match(/\D/g)) {
            field.style.border = '1px solid red';
        }
    }

    weightFild.addEventListener('input', () => {
        noDigitMakeRed(weightFild);
        weightVal = +weightFild.value;
        showCallories();
    })

    heightFild.addEventListener('input', () => {
        noDigitMakeRed(heightFild);
        heightVal = +heightFild.value;
        showCallories();
    })

    ageFild.addEventListener('input', () => {
        noDigitMakeRed(ageFild);
        ageVal = +ageFild.value;
        showCallories();
    })

    function genderRemove(block) {
        block.forEach(gender => {
            gender.classList.remove('calculating__choose-item_active');
        })
    }

    genders.forEach(gender => {
        gender.addEventListener('click', () => {
            genderRemove(genders);
            gender.classList.add('calculating__choose-item_active');
            if (gender.getAttribute('data-sex') == 'f') {
                localStorage.setItem('sex', -161);
                localStorage.setItem('sexAtr', 'f');
                sex = -161;
            } else {
                localStorage.setItem('sex', 5);
                localStorage.setItem('sexAtr', 'm');
                sex = 5;
            }
            showCallories();
        })
    });

    activities.forEach(activity => {
        activity.addEventListener('click', () => {
            genderRemove(activities);
            activity.classList.add('calculating__choose-item_active');
            act = +activity.getAttribute('data-act');
            localStorage.setItem('act', act);
            showCallories();
        })
    })

    function calloriesCalculat() {
        if (sex && heightVal && weightVal && ageVal && act) {
            return Math.round(((weightVal * 10) + (heightVal * 6.25) - (ageVal * 5) + sex) * act);
        }
        return '-----';
    }

    function showCallories() {
        resultCalc.textContent = calloriesCalculat();
    }

    showCallories()
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calcF);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function cardsF() {
    
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
                new Menu(img, altimg, title, descr, price * 40, '.menu__field .container').elementAdder();
            });
        });

    // axios - вместо getResourses
    // axios.get('http://localhost:3000/menu')
    //     .then(data => {
    //         data.data.forEach(({img, altimg, title, descr, price}) => {
    //             new Menu(img, altimg, title, descr, price*40, '.menu__field .container').elementAdder();
    //         });
    //     });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cardsF);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");


function formsF(modalTimer) {
    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/forms/sp.svg',
        success: 'все хорошо',
        failure: 'все плохо'
    };

    forms.forEach(item => {
        postDataBind(item);
    });

    async function postData(url, data) {
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
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimer);

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
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
        }, 2500);
    }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (formsF);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__,
/* harmony export */   "openModal": () => /* binding */ openModal,
/* harmony export */   "closeModal": () => /* binding */ closeModal
/* harmony export */ });
function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = ''; // прокрутка по умолчанию
}

function openModal(modalSelector, modalTimer) {
    const modal = document.querySelector(modalSelector);
    console.log(modal);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden'; // бирает прокрутку
    if (modalTimer) clearInterval(modalTimer);
}


function modalF(modalSelector, triggerSelector, modalTimer) {
    const modal = document.querySelector(modalSelector);
    const btnModals = document.querySelectorAll(triggerSelector);

    btnModals.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSelector, modalTimer));
    });


    modal.addEventListener('click', (evt) => {
        if (evt.target == modal || evt.target.classList.contains('modal__close')) {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (evt) => {
        if (evt.code == 'Escape') {
            closeModal(modalSelector);
        }
    });

    // открывает модальное окно, когда страница дошла (почти) до конца
    function showModalByScroll() {
        // сколько уже пролистано + высота клиентскоо окна >= полная область прокрутки документа по высоте
        if ((window.pageYOffset + document.documentElement.clientHeight) * 1.02 >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimer);
            window.removeEventListener('scroll', showModalByScroll); // отменяет саму себя после 1-го выполнения
        }
    }
    window.addEventListener('scroll', showModalByScroll);

    // const modalTimer = setTimeout(openModal, 50000);

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modalF);


/***/ }),

/***/ "./js/modules/sliders.js":
/*!*******************************!*\
  !*** ./js/modules/sliders.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function slidersF() {

    // for del !!!
    function makeFirstZero(number) {
        if (number < 10) return `0${number}`;
        return number;
    }

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

    const offerSlider = document.querySelector('.offer__slider');
    offerSlider.style.position = "relative";
    const sliderDots = document.createElement('ol');
    sliderDots.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    offerSlider.append(sliderDots);

    for (let i = 0; i < sliders.length; i++) {
        const dot = document.createElement('li');
        dot.classList.add('dot')
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        dot.setAttribute('data-slide-to', i);
        sliderDots.append(dot);
        if (i == 0) dot.style.opacity = 1;
    }

    totalSlideNum.textContent = makeFirstZero(sliders.length);
    const dotsList = document.querySelectorAll('.dot');

    sliderInner.style.width = sliders.length * 100 + '%'; // делаем sliderInner шириной со все слайды в нем 
    sliderInner.style.display = 'flex'; // контейнер со  слайдерами в один ряд
    sliderInner.style.transition = '0.5s all' // время трансформации
    sliderWrapper.style.overflow = 'hidden' // прячем все что не влезло (sliderInner)  за границами sliderWrapper
    sliders.forEach(slide => {
        slide.style.width = width
    }); // каждфй слайд - шириной в sliderWrapper

    function dotOpacity(numSl) {
        dotsList.forEach(dotItem => {
            dotItem.style.opacity = 0.5;
            if (dotItem.getAttribute('data-slide-to') == numSl) {
                dotItem.style.opacity = 1;
            } else {
                dotItem.style.opacity = 0.5;
            };
        })
    }

    function slideByNumAndOffset(num, off) {
        currentSlideNum.textContent = makeFirstZero(num + 1);
        sliderInner.style.transform = `translateX(-${off}px)`;
        dotOpacity(num);
    }

    dotsList.forEach(dotItem => {
        dotItem.addEventListener('click', () => {
            offset = parseFloat(width) * (+dotItem.getAttribute('data-slide-to'))
            numberSlider = +dotItem.getAttribute('data-slide-to');

            slideByNumAndOffset(numberSlider, offset);
        });
    })

    slideNext.addEventListener('click', () => {
        if (offset == parseFloat(width) * (sliders.length - 1)) {
            offset = 0;
            numberSlider = 0;
        } else {
            offset += parseFloat(width);
            numberSlider += 1;
        }

        slideByNumAndOffset(numberSlider, offset);
    })

    slidePrev.addEventListener('click', () => {
        if (offset == 0) {
            offset = (sliders.length - 1) * parseFloat(width);
            numberSlider = sliders.length - 1;
        } else {
            offset -= parseFloat(width);
            numberSlider -= 1;
        }

        slideByNumAndOffset(numberSlider, offset);
    })
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slidersF);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function tabsF() {
    const contents = document.querySelectorAll('.tabcontent');
    const tabItems = document.querySelectorAll('.tabheader__item');

    function deactivateAll() {
        contents.forEach((cont, i) => {
            cont.style.display = 'none';
            tabItems[i].classList.remove('tabheader__item_active');
        })
    }

    function activateOne(c = 0) {
        for (let i = 0; i < contents.length; i++) {
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
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabsF);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function timerF() {
    const timeX = '2021-01-18';

    function lostTime() {
        const diffTime = Date.parse(timeX) - Date.parse(new Date());

        return {
            'msAll': diffTime,
            'days': Math.floor(diffTime / 1000 / 60 / 60 / 24),
            'hours': Math.floor(diffTime / (1000 * 60 * 60)) % 24,
            'minutes': Math.floor(diffTime / (1000 * 60)) % 60,
            'seconds': Math.floor(diffTime / 1000) % 60
        }
    }

    function makeFirstZero(number) {
        if (number < 10) return `0${number}`;
        return number;
    }

    function inputTime() {

        const nowlostTime = lostTime();
        const timer = document.querySelector('.timer');
        const days = timer.querySelector('#days');
        const hours = timer.querySelector('#hours');
        const minutes = timer.querySelector('#minutes');
        const seconds = timer.querySelector('#seconds');
        if (nowlostTime.msAll > 0) {
            days.textContent = makeFirstZero(nowlostTime.days);
            hours.textContent = makeFirstZero(nowlostTime.hours);
            minutes.textContent = makeFirstZero(nowlostTime.minutes);
            seconds.textContent = makeFirstZero(nowlostTime.seconds);
        }
    }

    inputTime();
    setInterval(inputTime, 1000);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timerF);

/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_sliders__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/sliders */ "./js/modules/sliders.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");









window.addEventListener('DOMContentLoaded', () => {

    const modalTimer = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__.openModal)('.modal', modalTimer), 50000);


    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__.default)();
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_1__.default)();
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_2__.default)();
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__.default)('.modal', '[data-modal]', modalTimer);
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_4__.default)(modalTimer);
    (0,_modules_sliders__WEBPACK_IMPORTED_MODULE_5__.default)();
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_6__.default)();
});

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./js/script.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=bundle.js.map