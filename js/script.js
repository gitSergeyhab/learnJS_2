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


    tabsF();
    timerF();
    cardsF();
    modalF('.modal', '[data-modal]', modalTimer);
    formsF();
    slidersF();
    calcF();
});