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

module.exports = slidersF;