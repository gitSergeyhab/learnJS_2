function tabsF(selectorContent, selectorItem, classActive) {
    const contents = document.querySelectorAll(selectorContent);
    const tabItems = document.querySelectorAll(selectorItem);

    function deactivateAll() {
        contents.forEach((cont, i) => {
            cont.style.display = 'none';
            tabItems[i].classList.remove(classActive);
        })
    }

    function activateOne(c = 0) {
        for (let i = 0; i < contents.length; i++) {
            if (i == c) {
                contents[i].style.display = 'block';
                tabItems[i].classList.add(classActive);
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

export default tabsF;