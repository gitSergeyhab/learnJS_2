function modalF() {
    const modal = document.querySelector('.modal');
    const btnModals = document.querySelectorAll('[data-modal]');

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = ''; // прокрутка по умолчанию
    }

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
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
    function showModalByScroll() {
        // сколько уже пролистано + высота клиентскоо окна >= полная область прокрутки документа по высоте
        if ((window.pageYOffset + document.documentElement.clientHeight) * 1.02 >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll); // отменяет саму себя после 1-го выполнения
        }
    }
    window.addEventListener('scroll', showModalByScroll);

    const modalTimer = setTimeout(openModal, 50000);

}

export default modalF;