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

export default modalF;
export {openModal, closeModal};