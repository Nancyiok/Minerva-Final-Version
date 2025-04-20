import serverURL from "../../js/global/server-url.js";
const buttonContactUs = document.querySelector(".faq__another-questions-button");
const faqSection = document.querySelector(".faq");
const body = document.querySelector("body");
const formMessage = document.querySelector(".message-for-user");
const emailInput = faqSection.querySelector("#email-question");
const titleInput = faqSection.querySelector(".input-field-title");
const textareaInput = faqSection.querySelector(".textarea-field");
document.querySelectorAll(".accordion__button").forEach((button) => {
    button.addEventListener("click", () => {
        const content = button.nextElementSibling;
        document.querySelectorAll(".accordion__button.active").forEach((activeButton) => {
            if (activeButton !== button) {
                activeButton.classList.remove("active");
                const activeContent = activeButton.nextElementSibling;
                activeContent.style.maxHeight = null;
            }
        });

        button.classList.toggle("active");
        content.style.maxHeight = button.classList.contains("active")
            ? `${content.scrollHeight}px`
            : null;
    });
});


function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return emailRegex.test(email.trim());
}

function validateEmail(email) {
    if (!email || !isValidEmail(email)) {
        formMessage.innerText = "Введіть коректну електронну адресу";
        const emailInput = faqSection.querySelector(".input-field-email");
        emailInput.classList.add("incorrect");
        faqSection.querySelector(".submit-button").removeEventListener("click", function (event) { sendToServer(event) });
    }
    else {
        faqSection.querySelector(".submit-button").addEventListener("click", function (event) { sendToServer(event) });
        formMessage.innerText = "";
        emailInput.classList.remove("incorrect");
    }
}



emailInput.addEventListener("input", function () {
    validateEmail(emailInput.value);
});

titleInput.addEventListener("input", function () {
    if (titleInput.value.length < 5) {
        formMessage.innerText = "Тема звернення повинна містити не менше 5 символів";
        const titleInput = faqSection.querySelector(".input-field-title");
        faqSection.querySelector(".submit-button").removeEventListener("click", function (event) { sendToServer(event) });;
        titleInput.classList.add("incorrect");
    }
    else {
        faqSection.querySelector(".submit-button").addEventListener("click", function (event) { sendToServer(event) });
        formMessage.innerText = "";
        titleInput.classList.remove("incorrect");
    }
}
);

textareaInput.addEventListener("input", function () {
    if (textareaInput.value.length < 10) {
        formMessage.innerText = "Ваше звернення повинно містити не менше 10 символів";
        const textareaInput = faqSection.querySelector(".textarea-field");
        faqSection.querySelector(".submit-button").removeEventListener("click", function (event) { sendToServer(event) });;
        textareaInput.classList.add("incorrect");
    }
    else {
        faqSection.querySelector(".submit-button").addEventListener("click", function (event) { sendToServer(event) });;
        formMessage.innerText = "";
        textareaInput.classList.remove("incorrect");
    }
}
);

faqSection.querySelector(".submit-button").addEventListener("click", function (event) { sendToServer(event) });

buttonContactUs.addEventListener("click", function () {
    faqSection.querySelector(".faq-overlay").classList.add("active");
    faqSection.querySelector(".complaint-form_1").classList.add("active");
    body.classList.add("active");

});

function closeBodyManual(event) {
    if (event.target.classList.contains("faq-overlay")) {
        faqSection.querySelector(".faq-overlay").classList.remove("active");
        faqSection.querySelector(".complaint-form_1").classList.remove("active");
        body.classList.remove("active");
    }
}

function closeBody() {
    faqSection.querySelector(".faq-overlay").classList.remove("active");
    faqSection.querySelector(".complaint-form_1").classList.remove("active");
    body.classList.remove("active");
}

body.addEventListener("click", function (event) {
    closeBodyManual(event);
});

faqSection.querySelector(".exit").addEventListener("click", function (event) {
    closeBody();
});


async function sendToServer(e) {
    if (titleInput.value === "" || textareaInput.value == "" || emailInput.value == "") {
        formMessage.innerText = "Заповніть всі поля";
        return;

    }
    e.preventDefault();
    const response = await fetch(`${serverURL}/api/Users/AskQuestion`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: "9",
            email: faqSection.querySelector(".input-field-email").value,
            topic: faqSection.querySelector(".input-field-title").value,
            appeal: faqSection.querySelector(".complaint-form_1 textarea").value,
        }),
    })
    if (response.ok) {
        faqSection.querySelector(".thanks-for-message").innerHTML =  `
<div class="complaint-form__title-thanks">
    <p>Дякуємо за ваше звернення!</p>
    <div><svg width="60" height="50" viewBox="0 0 60 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M54.3 24.0836C54.3 24.0836 53.734 24.7773 52.6141 25.8972C51.4941 27.0172 30.902 47.6084 30.902 47.6084C30.5404 47.97 30.0678 48.1503 29.5943 48.1503C29.1208 48.1503 28.6482 47.97 28.2866 47.6084C28.2866 47.6084 7.69449 27.0163 6.57453 25.8963C5.45457 24.7763 4.88858 24.0827 4.88858 24.0827C3.00101 21.8345 1.84961 18.9481 1.84961 15.7815C1.84961 8.63078 7.6464 2.83398 14.7971 2.83398C18.3725 2.83398 21.6094 4.28226 23.952 6.62668L23.9603 6.61836L28.2866 10.9438C29.0089 11.666 30.1797 11.666 30.902 10.9438L35.2283 6.61836L35.2366 6.62668C37.5792 4.28226 40.8161 2.83398 44.3915 2.83398C51.5422 2.83398 57.339 8.63078 57.339 15.7815C57.339 18.9481 56.1876 21.8345 54.3 24.0836Z"
            fill="#CDEEEB" />
        <path
            d="M54.3 24.0836C54.3 24.0836 53.734 24.7773 52.6141 25.8972C51.4941 27.0172 30.902 47.6084 30.902 47.6084C30.5404 47.97 30.0678 48.1503 29.5943 48.1503C29.1208 48.1503 28.6482 47.97 28.2866 47.6084C28.2866 47.6084 7.69449 27.0163 6.57453 25.8963C5.45457 24.7763 4.88858 24.0827 4.88858 24.0827C3.00101 21.8345 1.84961 18.9481 1.84961 15.7815C1.84961 8.63078 7.6464 2.83398 14.7971 2.83398C18.3725 2.83398 21.6094 4.28226 23.952 6.62668L23.9603 6.61836L28.2866 10.9438C29.0089 11.666 30.1797 11.666 30.902 10.9438L35.2283 6.61836L35.2366 6.62668C37.5792 4.28226 40.8161 2.83398 44.3915 2.83398C51.5422 2.83398 57.339 8.63078 57.339 15.7815C57.339 18.9481 56.1876 21.8345 54.3 24.0836Z"
            fill="#CDEEEB" />
        <path
            d="M44.3915 0.984375C40.3056 0.984375 36.6063 2.64073 33.929 5.31902L30.2491 8.98224C29.8875 9.34385 29.303 9.34385 28.9414 8.98224C28.9414 8.98224 25.2689 5.3107 25.2615 5.31902C22.5823 2.64073 18.883 0.984375 14.7972 0.984375C6.62451 0.984375 0 7.60888 0 15.7815C0 18.8686 0.947019 21.7337 2.56453 24.105C2.56453 24.105 3.24335 25.1814 4.0461 25.9833C4.84885 26.7851 26.9789 48.9161 26.9789 48.9161C27.7012 49.6384 28.6482 50 29.5943 50C30.5404 50 31.4875 49.6384 32.2097 48.9161C32.2097 48.9161 54.3408 26.7851 55.1426 25.9833C55.9444 25.1814 56.6241 24.105 56.6241 24.105C58.2417 21.7337 59.1887 18.8686 59.1887 15.7815C59.1887 7.60888 52.5642 0.984375 44.3915 0.984375ZM54.3001 24.0837C54.3001 24.0837 53.7341 24.7773 52.6141 25.8973C51.4941 27.0172 30.902 47.6084 30.902 47.6084C30.5404 47.97 30.0678 48.1504 29.5943 48.1504C29.1208 48.1504 28.6482 47.97 28.2866 47.6084C28.2866 47.6084 7.69453 27.0163 6.57457 25.8963C5.45461 24.7764 4.88861 24.0828 4.88861 24.0828C3.00105 21.8345 1.84965 18.9481 1.84965 15.7815C1.84965 8.63081 7.64644 2.83402 14.7972 2.83402C18.3725 2.83402 21.6094 4.28229 23.952 6.62672L23.9603 6.6184L28.2866 10.9438C29.0089 11.6661 30.1798 11.6661 30.902 10.9438L35.2284 6.6184L35.2367 6.62672C37.5793 4.28229 40.8161 2.83402 44.3915 2.83402C51.5422 2.83402 57.339 8.63081 57.339 15.7815C57.339 18.9481 56.1876 21.8345 54.3001 24.0837Z"
            fill="black" />
        <path
            d="M44.3916 6.5332C43.8802 6.5332 43.4668 6.9466 43.4668 7.45803C43.4668 7.96945 43.8802 8.38285 44.3916 8.38285C48.4775 8.38285 51.7902 11.6956 51.7902 15.7814C51.7902 16.2929 52.2036 16.7063 52.715 16.7063C53.2265 16.7063 53.6399 16.2929 53.6399 15.7814C53.6399 10.6746 49.4985 6.5332 44.3916 6.5332Z"
            fill="black" />
    </svg>
    </div>
</div>`
        setTimeout((e) => {
            closeBody(e);
            faqSection.querySelector(".thanks-for-message").innerHTML = "";
        }, 1500);
    }
    else {
        const error = await response.text();
        console.log(error);
        return;
    }
}
