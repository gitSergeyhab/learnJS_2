import {closeModal, openModal} from './modal';
import {postData} from '../services/servises';

function formsF( formSelector, modalTimer) {
    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'img/forms/sp.svg',
        success: 'все хорошо',
        failure: 'все плохо'
    };

    forms.forEach(item => {
        postDataBind(item);
    });

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
        openModal('.modal', modalTimer);

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
            closeModal('.modal');
        }, 2500);
    }
};

export default formsF;