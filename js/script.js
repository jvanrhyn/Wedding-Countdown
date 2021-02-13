'use strict';

const countdownForm = document.querySelector('.form');
const countdownContainer = document.querySelector('.countdown-container');
const name1El = document.getElementById('name1');
const name2El = document.getElementById('name2');

const error = document.querySelector('.form__error');

const dateEl = document.getElementById('date');
const timeElements = document.querySelectorAll('.countdown__number');

let countdownDate = '';
let countdownValue = Date;
let countdownActive;


// SET DATE INPUT MIN WITH TODAY'S DATE
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);


function setCountdown() {
    // GET NUMBER VERSION OF CURRENT DATE
    countdownDate = dateEl.value;
    countdownValue = new Date(countdownDate).getTime();

    const now = new Date().getTime();
    const distance = countdownValue - now;
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const week = day * 7;
    const weeks = Math.floor(distance / week);
    const days = Math.floor((distance % week) / day);
    const hours = Math.floor((distance % day) / hour)
    const minutes = Math.floor((distance % hour) / minute)
    const seconds = Math.floor((distance % minute) / second)
    // CHECK DATE
    if (distance < 0) {
        // countdownContainer.style.display = 'none';
        alert("Congratulations on reaching your wedding day! We wish you all the best for today and hope you have a fantastic day to remember. Good luck and we hope you enjoyed counting down!");
        clearInterval(countdownActive);
        const countdownEl = document.querySelector('.countdown');
        countdown.style.display = 'none';
    } else {
        // POPULATE COUNTDOWN
        timeElements[0].textContent = weeks;
        timeElements[1].textContent = days;
        timeElements[2].textContent = hours;
        timeElements[3].textContent = minutes;
        timeElements[4].textContent = seconds;
    }
}

function setNames() {
    // POPULATE NAMES
    const name1 = document.querySelector('.names__name--1');
    const name2 = document.querySelector('.names__name--2');
    name1.textContent = name1El.value;
    name2.textContent = name2El.value;
}

function setDateString() {
    // CHANGE DATE TO TEXT
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const newDate = new Date(countdownDate);
    const weekday = newDate.getDay();
    const dateValue = newDate.getDate();
    const monthValue = newDate.getMonth();
    const yearValue = newDate.getFullYear();

    // 1st 2nd and 3rd OF MONTH
    const toString = dateValue.toString();
    const lastChar = toString.slice(-1);
    const lastDigit = +(lastChar);

    let suffix;
    if (lastDigit === 1) {
        suffix = "st";
    } else if (lastDigit === 2) {
        suffix = "nd";
    } else if (lastDigit === 3) {
        suffix = "rd";
    }
    else {
        suffix = "th";
    }

    // POPULATE DATE PARAGRAPH
    const dateString = document.querySelector('.date-text__inner');
    dateString.textContent = `${weekdays[weekday]} ${dateValue}${suffix} ${months[monthValue]} ${yearValue}`;
}

// COMPLETE UI
function updateDOM() {
    countdownActive = setInterval(() => {
        setCountdown();
        setNames();
        setDateString();
        // HIDE INPUT
        const formSection = document.querySelector('.section-form');
        formSection.style.display = 'none';

        // HIDE HERO IMAGE
        const logoImg = document.querySelector('.intro-title__img');
        logoImg.style.display = 'none';

        // SHOW PARAGRAPH
        const title = document.querySelector('.heading-secondary');
        title.hidden = false;

        // SHOW NAMES
        const namesEl = document.querySelector('.names');
        namesEl.hidden = false;

        // SHOW COUNTDOWN
        countdownContainer.hidden = false;
    }, 1000);
}

// SHOW ERROR MESSAGE
function errMsg() {
    error.hidden = true;
}

// TAKE VALUES FROM FORM INPUT
function checkInput(e) {
    e.preventDefault();
    const inputFields = document.querySelectorAll('.input__field');
    let i = 0;
    let empty = true;
    while (i < 3) {
        if (inputFields[i].value === '') {
            empty = true;
            break;
        } else {
            empty = false;
        }
        i++;
    }

    if (empty === true) {
        error.hidden = false;
        setTimeout(errMsg, 2000);
    } else {
        updateDOM();
    }
}

// EVENT LISTENER
countdownForm.addEventListener('submit', checkInput);