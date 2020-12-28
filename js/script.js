import tabsF from './modules/tabs';
import timerF from './modules/timer';
import cardsF from './modules/cards';
import modalF from './modules/modal';
import formsF from './modules/forms';
import slidersF from './modules/sliders';
import calcF from './modules/calc';
import {openModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {

    const modalTimer = setTimeout(() => openModal('.modal', modalTimer), 50000);


    tabsF('.tabcontent', '.tabheader__item', 'tabheader__item_active');
    timerF('.timer', '2021-01-18');
    cardsF();
    modalF('.modal', '[data-modal]', modalTimer);
    formsF('form', modalTimer);
    slidersF();
    calcF();
});