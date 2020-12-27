window.addEventListener('DOMContentLoaded', () => {

            const tabsF = require('./modules/tabs'),
                timerF = require('./modules/timer'),
                cardsF = require('./modules/cards'),
                modalF = require('./modules/modal'),
                formsF = require('./modules/forms'),
                slidersF = require('./modules/sliders'),
                calcF = require('./modules/calc');


            tabsF();
            timerF();
            cardsF();
            modalF();
            formsF();
            slidersF();
            calcF();
        });