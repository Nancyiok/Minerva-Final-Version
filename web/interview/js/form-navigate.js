import serverURL from "../../js/global/server-url.js";
const interviewPlanning = document.querySelector(".interview-planning");
const emailInput = interviewPlanning.querySelector(".interview-planning__input--email");
const emailErrorHandle = interviewPlanning.querySelector(".error-handle-email");
const surnameInput = interviewPlanning.querySelector(".interview-planning__input--surname");
const surnameErrorHandle = interviewPlanning.querySelector(".error-handle-surname");
const nameInput = interviewPlanning.querySelector(".interview-planning__input--name");
const nameErrorHandle = interviewPlanning.querySelector(".error-handle-name");
const submitFormButton = interviewPlanning.querySelector(".interview-planning__button");
const textArea = interviewPlanning.querySelector(".interview-planning__input--textarea");

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
    }
    else {
        nameErrorHandle.innerHTML = "";
        nameInput.classList.remove("error-input");
    }
})

console.log(parseInt(sessionStorage.getItem("id")));
submitFormButton.addEventListener("click", async (e) => {
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
            }, 3000);
        }
    } catch (error) {
        console.error("Ошибка при добавлении события:", error);
    }

    console.log(new Date(`${y}-${m}-${d}T${selectedTime}:00`));
});
