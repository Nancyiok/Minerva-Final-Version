import serverURL from "../../js/global/server-url.js";
let dataPlanMeeting = [];
const MonthName = [
    "Січ",
    "Лют",
    "Бер",
    "Кві",
    "Тра",
    "Чер",
    "Лип",
    "Сер",
    "Вер",
    "Жов",
    "Лис",
    "Гру"
];
function CalendarControl() {
    const calendar = new Date();
    const calendarControl = {
        localDate: new Date(),
        prevMonthLastDate: null,
        calWeekDays: ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
        calMonthName: [
            "Січ",
            "Лют",
            "Бер",
            "Кві",
            "Тра",
            "Чер",
            "Лип",
            "Сер",
            "Вер",
            "Жов",
            "Лис",
            "Гру"
        ],
        daysInMonth: function (month, year) {
            return new Date(year, month, 0).getDate();
        },
        firstDay: function () {
            return new Date(calendar.getFullYear(), calendar.getMonth(), 1);
        },
        lastDay: function () {
            return new Date(calendar.getFullYear(), calendar.getMonth() + 1, 0);
        },
        firstDayNumber: function () {
            return calendarControl.firstDay().getDay() + 1;
        },
        lastDayNumber: function () {
            return calendarControl.lastDay().getDay() + 1;
        },
        getPreviousMonthLastDate: function () {
            let lastDate = new Date(
                calendar.getFullYear(),
                calendar.getMonth(),
                0
            ).getDate();
            return lastDate;
        },
        navigateToPreviousMonth: function () {
            calendar.setMonth(calendar.getMonth() - 1);
            calendarControl.attachEventsOnNextPrev();
        },
        navigateToNextMonth: function () {
            calendar.setMonth(calendar.getMonth() + 1);
            calendarControl.attachEventsOnNextPrev();
        },
        navigateToCurrentMonth: function (e) {
            e.preventDefault();
            let currentMonth = calendarControl.localDate.getMonth();
            let currentYear = calendarControl.localDate.getFullYear();
            calendar.setMonth(currentMonth);
            calendar.setYear(currentYear);
            calendarControl.attachEventsOnNextPrev();
            getFillMeetings();
        },
        displayYear: function () {
            let yearLabel = document.querySelector(".calendar .calendar-year-label");
            yearLabel.innerHTML = calendar.getFullYear();
        },
        displayMonth: function () {
            let monthLabel = document.querySelector(
                ".calendar .calendar-month-label"
            );
            monthLabel.innerHTML = calendarControl.calMonthName[calendar.getMonth()];
        },
        selectDate: function (e) {

            console.log(
                `${e.target.textContent} ${calendarControl.calMonthName[calendar.getMonth()]
                } ${calendar.getFullYear()}`
            );
            e.preventDefault();
            let selectedDate = null;

            document.querySelector(".calendar-body").addEventListener("click", (e) => {
                if (!e.target.classList.contains("dateNumber")) return;

                console.log(
                    `${e.target.textContent} ${calendarControl.calMonthName[calendar.getMonth()]
                    } ${calendar.getFullYear()}`
                );

                e.preventDefault();
                selectedDate = document.querySelector(".calendar-selected-date");

                if (selectedDate) {
                    selectedDate.classList.remove("calendar-selected-date");
                    getFillMeetingsTime();
                }

                e.target.classList.add("calendar-selected-date");

                selectedDate = e.target.textContent.trim();
                getFillMeetingsTime(selectedDate);


            });
        },
        plotSelectors: function () {
            document.querySelector(
                ".calendar"
            ).innerHTML += `<div class="calendar-inner"><div class="calendar-controls">
          <div class="calendar-prev"><a><svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><path fill="#666" d="M88.2 3.8L35.8 56.23 28 64l7.8 7.78 52.4 52.4 9.78-7.76L45.58 64l52.4-52.4z"/></svg></a></div>
          <div class="calendar-year-month">
          <div class="calendar-month-label"></div>
          <div>-</div>
          <div class="calendar-year-label"></div>
          </div>
          <div class="calendar-next"><a><svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><path fill="#666" d="M38.8 124.2l52.4-52.42L99 64l-7.77-7.78-52.4-52.4-9.8 7.77L81.44 64 29 116.42z"/></svg></a></div>
          </div>
          <div class="calendar-today-date">Сьогодні: 
            ${calendarControl.calWeekDays[calendarControl.localDate.getDay()]}, 
            ${calendarControl.localDate.getDate()}, 
            ${calendarControl.calMonthName[calendarControl.localDate.getMonth()]} 
            ${calendarControl.localDate.getFullYear()}
          </div>
          <div class="calendar-body"></div></div>`;
        },
        plotDayNames: function () {
            for (let i = 0; i < calendarControl.calWeekDays.length; i++) {
                document.querySelector(
                    ".calendar .calendar-body"
                ).innerHTML += `<div>${calendarControl.calWeekDays[i]}</div>`;
            }
        },
        plotDates: function () {
            document.querySelector(".calendar .calendar-body").innerHTML = "";
            calendarControl.plotDayNames();
            calendarControl.displayMonth();
            calendarControl.displayYear();
            let count = 1;
            let prevDateCount = 0;

            calendarControl.prevMonthLastDate = calendarControl.getPreviousMonthLastDate();
            let prevMonthDatesArray = [];
            let calendarDays = calendarControl.daysInMonth(
                calendar.getMonth() + 1,
                calendar.getFullYear()
            );

            for (let i = 1; i < calendarDays; i++) {
                if (i < calendarControl.firstDayNumber()) {
                    prevDateCount += 1;
                    document.querySelector(
                        ".calendar .calendar-body"
                    ).innerHTML += `<div class="prev-dates"></div>`;
                    prevMonthDatesArray.push(calendarControl.prevMonthLastDate--);
                } else {
                    document.querySelector(
                        ".calendar .calendar-body"
                    ).innerHTML += `<div class="number-item" data-num=${count}><a class="dateNumber" href="#">${count++}</a></div>`;
                }
            }

            for (let j = 0; j < prevDateCount + 1; j++) {
                document.querySelector(
                    ".calendar .calendar-body"
                ).innerHTML += `<div class="number-item" data-num=${count}><a class="dateNumber" href="#">${count++}</a></div>`;
            }
            calendarControl.highlightToday();
            calendarControl.plotPrevMonthDates(prevMonthDatesArray);
            calendarControl.plotNextMonthDates();
        },
        attachEvents: function () {
            let prevBtn = document.querySelector(".calendar .calendar-prev a");
            let nextBtn = document.querySelector(".calendar .calendar-next a");
            let todayDate = document.querySelector(".calendar .calendar-today-date");
            let dateNumber = document.querySelectorAll(".calendar .dateNumber");
            prevBtn.addEventListener(
                "click",
                calendarControl.navigateToPreviousMonth
            );
            nextBtn.addEventListener("click", calendarControl.navigateToNextMonth);
            todayDate.addEventListener(
                "click",
                calendarControl.navigateToCurrentMonth
            );
            for (var i = 0; i < dateNumber.length; i++) {
                dateNumber[i].addEventListener(
                    "click",
                    calendarControl.selectDate,
                    false
                );
            }
            getFillMeetings();
        },
        highlightToday: function () {
            let currentMonth = calendarControl.localDate.getMonth() + 1;
            let changedMonth = calendar.getMonth() + 1;
            let currentYear = calendarControl.localDate.getFullYear();
            let changedYear = calendar.getFullYear();
            if (
                currentYear === changedYear &&
                currentMonth === changedMonth &&
                document.querySelectorAll(".number-item")
            ) {
                document
                    .querySelectorAll(".number-item")
                [calendar.getDate() - 1].classList.add("calendar-today");
            }
        },
        plotPrevMonthDates: function (dates) {
            dates.reverse();
            for (let i = 0; i < dates.length; i++) {
                if (document.querySelectorAll(".prev-dates")) {
                    document.querySelectorAll(".prev-dates")[i].textContent = dates[i];
                }
            }
        },
        plotNextMonthDates: function () {
            let childElemCount = document.querySelector('.calendar-body').childElementCount;
            if (childElemCount > 42) {
                let diff = 49 - childElemCount;
                calendarControl.loopThroughNextDays(diff);
            }

            if (childElemCount > 35 && childElemCount <= 42) {
                let diff = 42 - childElemCount;
                calendarControl.loopThroughNextDays(42 - childElemCount);
            }

        },
        loopThroughNextDays: function (count) {
            if (count > 0) {
                for (let i = 1; i <= count; i++) {
                    document.querySelector('.calendar-body').innerHTML += `<div class="next-dates">${i}</div>`;
                }
            }
        },
        attachEventsOnNextPrev: function () {
            calendarControl.plotDates();
            calendarControl.attachEvents();
        },
        init: function () {
            calendarControl.plotSelectors();
            calendarControl.plotDates();
            calendarControl.attachEvents();
        }
    };
    calendarControl.init();
}

function chooseTime() {

    let myDate1 = new Date();
    myDate1.setHours(12);
    let myDate2 = new Date();
    myDate2.setHours(14);
    let myDate3 = new Date();
    myDate3.setHours(16);
    let myDate4 = new Date();
    myDate4.setHours(18);
    document.body.querySelector(".interview-planning__time").innerHTML = `
    <div class="calendar-time">
    <div class="calendar-time-inner">
    <div class="calendar-time-header">
    <div class="calendar-time-header-inner">
    <div class="calendar-time-header-title">Оберіть час</div>
    <div class="times-container">
    <div class="time time1"><a href="#" class="calendar-time">${myDate1.getHours()}:00</a></div>
    <div class="time time2"><a href="#" class="calendar-time">${myDate2.getHours()}:00</a></div>
    <div class="time time3"><a href="#" class="calendar-time">${myDate3.getHours()}:00</a></div>
    <div class="time time4"><a href="#" class="calendar-time">${myDate4.getHours()}:00</a></div>
    </a></div>
    </div>`;
}

const calendarControl = new CalendarControl();
async function getFillMeetings() {
    try {
        const getFillDays = await fetch(`${serverURL}/api/Calendar/GlobalCanendar`,
            {
                method: "GET",
                headers: {
                    "ngrok-skip-browser-warning": "true"
                },
            });

        if (getFillDays.ok) {
            const data = await getFillDays.json();
            console.log(data);
            const calendarMonthlabel = document.querySelector(".calendar-month-label");
            const calenderYearlabel = document.querySelector(".calendar-year-label");
            const calendarBody = document.querySelector(".calendar-body");
            const timesContainer = document.querySelector(".times-container");
            for (let date of data) {
                let dataNow = new Date(date);
                dataPlanMeeting.push(dataNow);
                let selectedDate = dataNow.getDate();
                let selectedMounth = MonthName[dataNow.getMonth()];
                let selectedYear = dataNow.getFullYear();
                if (calendarMonthlabel.textContent == selectedMounth && calenderYearlabel.textContent == selectedYear) {
                    const dateElement = document.querySelector(`.number-item[data-num="${selectedDate}"]`);
                    if (dateElement) {
                        dateElement.classList.add("calendar-meeting-planed");

                    }
                }

            }
        }
    }

    catch (error) {
        console.error("Помилка при отриманні заповнених днів:", error);
    }

}

function getFillMeetingsTime(selectedDate) {
    const timeLabels = document.querySelectorAll(".calendar-time");
    for (let date of dataPlanMeeting) {
        let dataNow = new Date(date);
        let selectedDateNum = dataNow.getDate().toString();
        let selectedMonth = MonthName[dataNow.getMonth()];
        let selectedYear = dataNow.getFullYear();

        if (
            selectedMonth === MonthName[dataNow.getMonth()] &&
            selectedYear === new Date().getFullYear() &&
            selectedDate === selectedDateNum
        ) {
            timeLabels.forEach((time) => {
                if (time.textContent === `${dataNow.getHours()}:00`) {
                    time.classList.add("calendar-meeting-planed");
                    time.style.backgroundColor = "#f6bbbb";
                }
                else {
                    time.classList.remove("calendar-meeting-planed");
                    time.style.backgroundColor = "";
                }
            });
        }
    }
}

getFillMeetings();
chooseTime();



const nameInput = document.querySelector(".interview-planning__input--name");
const surnameInput = document.querySelector(".interview-planning__input--surname");

const emailInput = document.querySelector(".interview-planning__input--email");


const response = await fetch(`${serverURL}/api/users/${sessionStorage.getItem("id")}/FullInfo`, {
    method: 'GET',
    headers: {
        "ngrok-skip-browser-warning": "true"
    }
});

if (response.ok) {
    const data = await response.json();
    console.log(data)
    nameInput.value = data.name;
    surnameInput.value = data.surname;
    emailInput.value = data.email;

} else {
    const error = await response.text();
    alert(`Помилка: ${error}`);
}
