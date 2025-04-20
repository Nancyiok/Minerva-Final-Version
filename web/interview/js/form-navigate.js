import serverURL from "../../js/global/server-url.js";
import getFillMeetings from "./calendar.js";
const interviewPlanning = document.querySelector(".interview-planning");
const emailInput = interviewPlanning.querySelector(".interview-planning__input--email");
const emailErrorHandle = interviewPlanning.querySelector(".error-handle-email");
const surnameInput = interviewPlanning.querySelector(".interview-planning__input--surname");
const surnameErrorHandle = interviewPlanning.querySelector(".error-handle-surname");
const nameInput = interviewPlanning.querySelector(".interview-planning__input--name");
const nameErrorHandle = interviewPlanning.querySelector(".error-handle-name");
const submitFormButton = interviewPlanning.querySelector(".interview-planning__button");
const textArea = interviewPlanning.querySelector(".interview-planning__input--textarea");
const errorCalendarLabel = interviewPlanning.querySelector(".error-label-for-calendar");
const uaToEnMonthMap = {
    "Січ": "01",
    "Лют": "02",
    "Бер": "03",
    "Кві": "04",
    "Тра": "05",
    "Чер": "06",
    "Лип": "07",
    "Сер": "08",
    "Вер": "09",
    "Жов": "10",
    "Лис": "11",
    "Гру": "12"
};

function isValidUkrainianName(name) {
    const ukrainianNameRegex = /^[А-ЩЬЮЯІЇЄҐа-щьюяіїєґ'ʼ\-]+$/;
    return ukrainianNameRegex.test(name.trim());
}

function isValidUkrainianSurname(surname) {
    const ukrainianSurnameRegex = /^[А-ЩЬЮЯІЇЄҐа-щьюяіїєґ'ʼ\-]+$/;
    return ukrainianSurnameRegex.test(surname.trim());
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return emailRegex.test(email.trim());
}

emailInput.addEventListener("input", (e) => {
    if (!isValidEmail(e.target.value)) {
        emailErrorHandle.innerHTML = "Некоректна електронна адреса";
        emailInput.classList.add("error-input");
        submitFormButton.removeEventListener("click", sentToServer);
    }

    else {
        emailErrorHandle.innerHTML = "";
        emailInput.classList.remove("error-input");
    }

})

surnameInput.addEventListener("input", (e) => {
    if (!isValidUkrainianSurname(e.target.value)) {
        surnameErrorHandle.innerHTML = "Некоректне прізвище";
        surnameInput.classList.add("error-input");
        submitFormButton.removeEventListener("click", sentToServer);
    }

    else {
        surnameErrorHandle.innerHTML = "";
        surnameInput.classList.remove("error-input");
    }
})

nameInput.addEventListener("input", (e) => {
    if (!isValidUkrainianName(e.target.value)) {
        nameErrorHandle.innerHTML = "Некоректне ім'я";
        nameInput.classList.add("error-input");
        submitFormButton.removeEventListener("click", sentToServer);
    }
    else {
        nameErrorHandle.innerHTML = "";
        nameInput.classList.remove("error-input");
    }
})

function checkDateTime() {
    const regex = /^Ви обрали дату:\s\d{1,2} (Січ|Лют|Бер|Кві|Тра|Чер|Лип|Сер|Вер|Жов|Лис|Гру) \d{4} \d{1,2}:\d{2}$/;
    const plannedDateTime = interviewPlanning.querySelector(".label-for-calendar");
    console.log(plannedDateTime.textContent);
    return regex.test(plannedDateTime.textContent);
}


submitFormButton.addEventListener("click", sentToServer);

async function sentToServer() {
    if (!checkDateTime()) {
        errorCalendarLabel.style.display = "block";
        setTimeout(() => {
            errorCalendarLabel.style.display = "none";
        }, 2000);
        return;
    }
    const selectedDate = interviewPlanning.querySelector(".date-span-selected").innerText;
    const selectedTime = interviewPlanning.querySelector(".time-span-selected").innerText;
    let [d, m, y] = selectedDate.split(" ");
    m = uaToEnMonthMap[m];
    console.log(m);

    d = d.padStart(2, "0");

    try {
        const response = await fetch(`${serverURL}/api/Calendar/AddEvent`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "true",
            },
            body: JSON.stringify({
                id: +sessionStorage.getItem("id"),
                date: new Date(`${y}-${m}-${d}T${selectedTime}:00Z`),
                message: textArea.value
            })
        });
        if (response.ok) {
            interviewPlanning.querySelector(".thanks-for-record-metting").classList.add("active");
            interviewPlanning.querySelector(".interview-planning__container").classList.add("active");
            interviewPlanning.querySelector(".interview-planning__calendar-container").classList.add("active");
            setTimeout(() => {
                interviewPlanning.querySelector(".thanks-for-record-metting").classList.remove("active");
                interviewPlanning.querySelector(".interview-planning__container").classList.remove("active");
                interviewPlanning.querySelector(".interview-planning__calendar-container").classList.remove("active");
                document.querySelector(".calendar-selected-date").classList.remove("calendar-selected-date");
            }, 3000);
            getFillMeetings();
            interviewPlanning.querySelector(".label-for-calendar").textContent = "Оберіть коректну дату та час для співбесіди.";
        }
    } catch (error) {
        console.error("Помилка додавання події", error);
    }
}
