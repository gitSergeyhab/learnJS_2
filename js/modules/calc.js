function calcF() {

    const genderId = document.querySelector('#gender');
    const genders = genderId.querySelectorAll('.calculating__choose-item');
    const activityBig = document.querySelector('.calculating__choose_big');
    const activities = activityBig.querySelectorAll('.calculating__choose-item');
    const weightFild = document.querySelector('#weight');
    const heightFild = document.querySelector('#height');
    const ageFild = document.querySelector('#age');
    const resultCalc = document.querySelector('.calculating__result span');
    let sex, act;

    if (localStorage.getItem('sex')) {
        sex = +localStorage.getItem('sex');
        genderRemove(genders);
        genders.forEach(gender => {
            if (gender.getAttribute('data-sex') == localStorage.getItem('sexAtr')) {
                gender.classList.add('calculating__choose-item_active');
            }
        })
    } else {
        sex = -161;
    }

    if (localStorage.getItem('act')) {
        act = +localStorage.getItem('act');
        genderRemove(activities);
        activities.forEach(activity => {
            if (+activity.getAttribute('data-act') == localStorage.getItem('act')) {
                activity.classList.add('calculating__choose-item_active');
            }
        })
    } else {
        act = 1.375;
    }

    let weightVal = 0;
    let heightVal = 0;
    let ageVal = 0;

    function noDigitMakeRed(field) {
        if (field.value.match(/\D/g)) {
            field.style.border = '1px solid red';
        }
    }

    weightFild.addEventListener('input', () => {
        noDigitMakeRed(weightFild);
        weightVal = +weightFild.value;
        showCallories();
    })

    heightFild.addEventListener('input', () => {
        noDigitMakeRed(heightFild);
        heightVal = +heightFild.value;
        showCallories();
    })

    ageFild.addEventListener('input', () => {
        noDigitMakeRed(ageFild);
        ageVal = +ageFild.value;
        showCallories();
    })

    function genderRemove(block) {
        block.forEach(gender => {
            gender.classList.remove('calculating__choose-item_active');
        })
    }

    genders.forEach(gender => {
        gender.addEventListener('click', () => {
            genderRemove(genders);
            gender.classList.add('calculating__choose-item_active');
            if (gender.getAttribute('data-sex') == 'f') {
                localStorage.setItem('sex', -161);
                localStorage.setItem('sexAtr', 'f');
                sex = -161;
            } else {
                localStorage.setItem('sex', 5);
                localStorage.setItem('sexAtr', 'm');
                sex = 5;
            }
            showCallories();
        })
    });

    activities.forEach(activity => {
        activity.addEventListener('click', () => {
            genderRemove(activities);
            activity.classList.add('calculating__choose-item_active');
            act = +activity.getAttribute('data-act');
            localStorage.setItem('act', act);
            showCallories();
        })
    })

    function calloriesCalculat() {
        if (sex && heightVal && weightVal && ageVal && act) {
            return Math.round(((weightVal * 10) + (heightVal * 6.25) - (ageVal * 5) + sex) * act);
        }
        return '-----';
    }

    function showCallories() {
        resultCalc.textContent = calloriesCalculat();
    }

    showCallories()
};

export default calcF;