function timerF(selectorTimer, timeX) {

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
        const timer = document.querySelector(selectorTimer);
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

export default timerF;