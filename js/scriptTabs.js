window.addEventListener('DOMContentLoaded', () => {
    
    const contents = document.querySelectorAll('.tabcontent');
    const tabItems = document.querySelectorAll('.tabheader__item');
    console.log(tabItems);

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
})