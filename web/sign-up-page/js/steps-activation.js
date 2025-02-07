import serverURL from "../../js/global/server-url.js";
const nextButton = document.querySelector(".sign-up-form__next-button");
const step1 = document.querySelector(".sign-up-form__step--first");
const step2 = document.querySelector(".sign-up-form__step--second");
const step3 = document.querySelector(".sign-up-form__step--third");
const indicator1 = document.querySelector(".sign-up-form__steps-indicator1");
const indicator2 = document.querySelector(".sign-up-form__steps-indicator2");
const indicator3 = document.querySelector(".sign-up-form__steps-indicator3");
const backButton = document.querySelector(".sign-up-form__back-button");
const formTitle = document.querySelector(".sign-up-form__title");
const formSubtitle = document.querySelector(".sign-up-form__step-title");
const formSubmit = document.querySelector(".sign-up-form__submit-button");
const formMessage = document.querySelector(".sign-up-form__message");
const formInputVerificationCode = document.querySelector(".sign-up-form__code-input");
const submitPassword = document.querySelector(".sign-up-form__input--submit-password");
const spinnerLoading = document.querySelector(".window-loading__spinner");
indicator1.classList.add("current");
function checkStep1() {
    const name = document.querySelector(".sign-up-form__input--name").value;
    const surname = document.querySelector(".sign-up-form__input--surname").value;
    const phoneNumber = document.querySelector(".sign-up-form__input--phone").value;
    if (!name || !isValidUkrainianName(name)) {
        formMessage.innerText = "Введіть коректне ім'я";
        setTimeout(() => { formMessage.innerText = "" }, 1500);
        return false;
    }

    if (!surname || !isValidUkrainianSurname(surname)) {
        formMessage.innerText = "Введіть коректне прізвище";
        setTimeout(() => { formMessage.innerText = "" }, 1500);
        return false;
    }

    if (!phoneNumber || !isValidUkrainianPhoneNumber(phoneNumber)) {
        formMessage.innerText = "Введіть коректний номер телефону";
        setTimeout(() => { formMessage.innerText = "" }, 1500);
        return false;
    }
    return true;
}

function checkStep2() {
    const email = document.querySelector(".sign-up-form__input--email").value;
    const login = document.querySelector(".sign-up-form__input--login").value;
    const password = document.querySelector(".sign-up-form__input--password").value;

    if (!email || !isValidEmail(email)) {
        formMessage.innerText = "Введіть коректну електронну адресу";
        setTimeout(() => { formMessage.innerText = "" }, 1500);
        return false;
    }

    if (!login || !isValidLogin(login)) {
        formMessage.innerText = "Введіть коректний логін";
        setTimeout(() => { formMessage.innerText = "" }, 1500);
        return false;
    }

    if (!password || !isValidPassword(password)) {
        formMessage.innerText = "Пароль повинен містити не менше 8 символів, одну велику літеру, одну малу літеру, одну цифру та один спеціальний символ (наприклад, !, @, #).";
        setTimeout(() => { formMessage.innerText = "" }, 1500);
        return false;
    }

    if (password !== submitPassword.value) {
        formMessage.innerText = "Паролі не співпадають";
        setTimeout(() => { formMessage.innerText = "" }, 1500);
        return false;
    }

    return true;

}


function isValidUkrainianName(name) {
    const ukrainianNameRegex = /^[А-ЩЬЮЯІЇЄҐа-щьюяіїєґ'ʼ\-]+$/;
    return ukrainianNameRegex.test(name.trim());
}

function isValidUkrainianSurname(surname) {
    const ukrainianSurnameRegex = /^[А-ЩЬЮЯІЇЄҐа-щьюяіїєґ'ʼ\-]+$/;
    return ukrainianSurnameRegex.test(surname.trim());
}


function isValidUkrainianPhoneNumber(phoneNumber) {
    const ukrainianPhoneRegex = /^(?:\+?380|0)\d{9}$/;
    return ukrainianPhoneRegex.test(phoneNumber.trim());
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return emailRegex.test(email.trim());
}


function isValidLogin(login) {
    const loginRegex = /^[a-zA-Zа-яА-ЯїЇєЄіІґҐ0-9._]{3,20}$/;
    return loginRegex.test(login.trim()) && !/[_\.]$/.test(login.trim());
}

function isValidPassword(password) {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    return passwordRegex.test(password.trim());
}

nextButton.addEventListener("click", async (event) => {
    event.preventDefault();
    if (step1.classList.contains("active")) {
        const checkStepOne = checkStep1();
        if (checkStepOne) {
            indicator1.classList.remove("current");
            indicator1.classList.add("done");
            indicator2.classList.add("current");
            step1.classList.remove("active");
            step2.classList.add("active");
            formSubtitle.innerHTML = `<p class="sign-up-form__step-title">Крок <span>2</span> з 3</p>`;
        }
        else {
            return;
        }
    } else if (step2.classList.contains("active")) {
        const checkStepTwo = checkStep2();
        if (checkStepTwo) {
            const name = document.querySelector(".sign-up-form__input--name").value.trim();
            const surname = document.querySelector(".sign-up-form__input--surname").value.trim();
            const phone = document.querySelector(".sign-up-form__input--phone").value.trim();
            const email = document.querySelector(".sign-up-form__input--email").value.trim();
            const login = document.querySelector(".sign-up-form__input--login").value.trim();
            const password = document.querySelector(".sign-up-form__input--password").value.trim();
            // https://31a2-212-115-232-243.ngrok-free.app
            step2.classList.remove("active");
            spinnerLoading.classList.add("active");
            try {
                console.log(this);
                const verificationCode = await fetch(`${serverURL}/api/regist/CheckData`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ Username: login, Email: email })
                });

                if (!verificationCode.ok) {
                    step2.classList.add("active");
                    spinnerLoading.classList.remove("active");
                    const errorMessage = await verificationCode.text();
                    if (errorMessage == "Username and Email are already taken") {
                        formMessage.innerText = "Такий логін та пошта вже існують";
                        setTimeout(() => { formMessage.innerText = "" }, 1500);
                    } else if (errorMessage == "Email is already taken") {
                        formMessage.innerText = "Така пошта вже використовується";
                        setTimeout(() => { formMessage.innerText = "" }, 1500);
                    } else if (errorMessage == "Username is already taken") {
                        formMessage.innerText = "Такий логін вже використовується";
                        setTimeout(() => { formMessage.innerText = "" }, 1500);
                    } else if (errorMessage == "Problem with Email") {
                        formMessage.innerText = "Відправити код на пошту не вдається, спробуйте ще раз!";
                        setTimeout(() => { formMessage.innerText = "" }, 1500);
                    } else {
                        alert(errorMessage);
                    }
                } else {
                    const result = await verificationCode.json();
                    const code = result.code;
                    console.log("Code:", code);
                    spinnerLoading.classList.remove("active");
                    indicator2.classList.remove("current");
                    indicator2.classList.add("done");
                    indicator3.classList.add("current");
                    step3.classList.add("active");
                    formTitle.textContent = "Підтвердіть вашу електронну адресу";
                    formSubtitle.innerHTML = `<p class="sign-up-form__step-title">Вам на пошту було надіслано код підтвердження. Введіть його для завершення реєстрації</p>`;
                    nextButton.classList.add("active");
                    formSubmit.classList.add("active");
                    formSubmit.addEventListener("click", async function (event) {
                        event.preventDefault();
                        const codeInput = Number(formInputVerificationCode.value.trim());
                        if (!codeInput) {
                            formMessage.innerText = "Введіть код!";
                            setTimeout(() => { formMessage.innerText = "" }, 1500);
                            return;
                        }

                        const email = document.querySelector(".sign-up-form__input--email").value.trim();
                        const login = document.querySelector(".sign-up-form__input--login").value.trim();
                        const password = document.querySelector(".sign-up-form__input--password").value.trim();
                        console.log("Code:", code, "Input Code:" );

                        if (code === codeInput) {
                            formMessage.innerHTML = '<p class="sign-up-form__message-success">Дякуємо, пошта підтверджена!</p>';
                            setTimeout(() => { formMessage.innerText = "" }, 1500);

                            try {
                                const response = await fetch(`${serverURL}/api/regist/register`, {
                                    method: "POST",
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({
                                        Username: login,
                                        Email: email,
                                        Password: password,
                                        Name: "Sigma",
                                        Surname: "Software",
                                        Testmode: true,
                                    }),
                                });
                                
                                if (response.ok) {
                                    formMessage.innerHTML = '<p class="sign-up-form__message-success">Реєстрація успішна!</p>';
                                    setTimeout(() => {
                                        localStorage.setItem("login", login);
                                        window.location.href = "./web/user-welcome-page/welcome-user-page.html";
                                    }, 1500);
                                } else {
                                    const error = await response.text();
                                    console.error("Ошибка на сервере:", error);
                                    formMessage.innerText = "Помилка реєстрації: " + error;
                                    setTimeout(() => { formMessage.innerText = "" }, 1500);
                                }
                            } catch (error) {
                                console.error("Ошибка подключения:", error.message);
                                formMessage.innerText = "Помилка з'єднання з сервером. Спробуйте ще раз!";
                                setTimeout(() => { formMessage.innerText = "" }, 1500);
                            }
                        } else {
                            formMessage.innerText = "Неправильний код!";
                            setTimeout(() => { formMessage.innerText = "" }, 1500);
                        }
                    });
                }
             
                
            } catch (error) {
                step2.classList.add("active");
                spinnerLoading.classList.remove("active");
                console.log("Error:", error.message);
            }
        } else {
            step2.classList.add("active");
            spinnerLoading.classList.remove("active");
            return;
        }
    }
});



    

backButton.addEventListener("click", (event) => {
    event.preventDefault();
    formSubmit.classList.remove("active");
    nextButton.classList.remove("active");
    if (step3.classList.contains("active")) {
        indicator3.classList.remove("current");
        indicator2.classList.remove("done");
        step3.classList.remove("active");
        step2.classList.add("active");
        indicator2.classList.add("current");
        formTitle.textContent = "Реєстрація";
        formSubtitle.innerHTML = `<p class="sign-up-form__step-title">Крок <span>2</span> з 3</p>`;
    } else if (step2.classList.contains("active")) {
        indicator2.classList.remove("current");
        indicator1.classList.remove("done");
        step2.classList.remove("active");
        step1.classList.add("active");
        indicator1.classList.add("current");
        formTitle.textContent = "Реєстрація";
        formSubtitle.innerHTML = `<p class="sign-up-form__step-title">Крок <span>1</span> з 3</p>`;
    }
});

document.querySelector(".sign-up-form__toggle-password-button").addEventListener('click', function () {
    const passwordInput = document.querySelector(".sign-up-form__input--password");
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    this.innerHTML = type === 'password' ? `<svg width="30" height="20" viewBox="0 0 96 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M47.5 1.5002C27.9443 2.00795 3 24.5002 3 24.5002C3 24.5002 28.1144 46.6364 47.5 46.5002C67.6806 46.3584 93 22.0002 93 22.0002C93 22.0002 66.9825 0.994356 47.5 1.5002Z" stroke="#1F545B" stroke-width="3"/>
<path d="M32.0603 22C33.1251 12.0545 48 4.5 48 4.5C48 4.5 62.7076 12.1554 63.5603 22C64.5652 33.6021 47.5 42.5 47.5 42.5C47.5 42.5 30.8768 33.0548 32.0603 22Z" fill="#1F545B"/>
<ellipse cx="41.5" cy="23" rx="2.5" ry="4" fill="white"/>
</svg>
` : ` <svg width="30" height="20" viewBox="0 0 93 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 4.5C1 4.5 26.1144 26.6362 45.5 26.5C65.6806 26.3582 91 2 91 2" stroke="#1F545B" stroke-width="3"/>
</svg>
`;
});






