import serverURL from "../../js/global/server-url.js";
const signInFormForgotPasswordLink = document.querySelector(".sign-in-form__forgot-password-link");
const formContantInitual = document.querySelector(".sign-in__content");
const formContantRecreatePassword = document.querySelector(".sign-in__content-forgot-password");
const formCodeSent = document.querySelector(".sign-in__content-restore-password-code-sent");
const newPasswordForm = document.querySelector(".sign-in__content-new-password");
const messageSuccess = document.querySelector(".sign-in__content-change-success");
const signInFormBackButton1 = document.querySelector(".sign-in-form__back-button1");
const signInFormBackButton2 = document.querySelector(".sign-in-form__back-button2");
const signInFormBackButton3 = document.querySelector(".sign-in-form__back-button3");
const signInFormBackButton4 = document.querySelector(".sign-in-form__back-button4");
const buttonForgotPassword = document.querySelector(".sign-in-form__submit-button-forgot-password");
const codeSentInput = document.querySelector(".sign-in-form__submit-button-code-sent");
const changePasswordButton = document.querySelector(".sign-in-form__submit-button-change-password");
const messageForUser = document.querySelector(".sign-in-form__message");
const resetPasswordEmail = document.querySelector(".sign-in-form__input--reset-password-email");
const resetPasswordEmailMessage = document.querySelector(".sign-in-form__message-reset-password");
const resetPasswordButton = document.querySelector(".sign-in-form__submit-button-forgot-password");
const codeInput = document.querySelector(".sign-up-form__code-input");
const submitPassword = document.querySelector(".sign-up-form__input--submit-password");
const newPassword = document.querySelector(".sign-in-form__input--new-password");
const changePasswordMessage = document.querySelector(".sign-in-form__message-change-password");
const formMessageCode = document.querySelector(".sign-in-form__message-code");


const steps = [
    formContantInitual,
    formContantRecreatePassword,
    formCodeSent,
    newPasswordForm,
    messageSuccess
];

let currentStepIndex = 0;


function showStep(index) {
    if (index < 0 || index >= steps.length) return;
    steps.forEach((step, i) => {
        step.classList.remove("active");
        if (i === index) {
            step.classList.add("active");
        }
    });
    currentStepIndex = index;
}


signInFormForgotPasswordLink.addEventListener("click", (event) => {
    event.preventDefault();
    showStep(1);
});

// buttonForgotPassword.addEventListener("click", async (event) => {
//     event.preventDefault();
//     showStep(2);
// });

// codeSentInput.addEventListener("click", (event) => {
//     event.preventDefault();
//     showStep(3);
// });

// changePasswordButton.addEventListener("click", (event) => {
//     event.preventDefault();
//     showStep(4);
// });

buttonForgotPassword.addEventListener("click", async (event) => {
    event.preventDefault();
    if (resetPasswordEmail.value === "") {
        resetPasswordEmailMessage.innerHTML = `<p class="sumbit-step-problem">Поле не може бути пустим!</p>`;
        setTimeout(() => { resetPasswordEmailMessage.innerText = "" }, 1500);
        return;
    }
    else {
        try {
            // const response3 = await fetch(url + "/api/EditProfile/DropPasswordCode", {
            //     method: "POST",
            //     headers: { 'Content-Type': 'application/json', },
            //     body: JSON.stringify({
            //         ID: ID,
            //     }),
            // });
            const checkEmail = await fetch(`${serverURL}/api/EditProfile/DropPasswordCode`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ Email: resetPasswordEmail.value })
            });

            if (checkEmail.ok) {
                showStep(2);
                const checkingEmail = await checkEmail.json();
                const code = checkingEmail.code;
                console.log('Code:', code);
                if (code) {
                    codeSentInput.addEventListener("click", (event) => {
                        event.preventDefault();
                        if (code === Number(codeInput.value)) {
                            showStep(3);
                        }
                        else {
                            formMessageCode.innerHTML = `<p class="sumbit-step-problem">Неправильний код!</p>`;
                            setTimeout(() => { formMessageCode.innerText = "" }, 1500);
                        }
                    });
                }
            }
            else {
                const error = await checkEmail.json();
                const errorMessage = error;
                if (errorMessage == "ID is not valid") {
                    formMessageCode.innerHTML = `<p class="sumbit-step-problem">Такого користувача не існує!</p>`;
                    setTimeout(() => { formMessageCode.innerText = "" }, 1500);
                }
                else if (errorMessage == "Code not sent") {
                    formMessageCode.innerHTML = `<p class="sumbit-step-problem">Проблеми з відправкою повідомлення!</p>`;
                    setTimeout(() => { formMessageCode.innerText = "" }, 1500);
                    console.error("EROR:", errorMessage);
                }
                else
                    console.error("EROR:", errorMessage);
            }
        } catch (error) {
            console.log(error);
            resetPasswordEmailMessage.innerHTML = `<p class="sumbit-step-problem">Щось пішло не так! Спробуйте ще раз!</p>`;
            setTimeout(() => { resetPasswordEmailMessage.innerText = "" }, 1500);
        }
    }
});

changePasswordButton.addEventListener("click", async (event) => {
    event.preventDefault();
    if (newPassword.value !== submitPassword.value) {
        changePasswordMessage.innerHTML = `<p class="sumbit-step-problem">Паролі не співпадають!</p>`;
        return;
    }
    else if (!newPassword.value || !submitPassword.value) {

        changePasswordMessage.innerHTML = `<p class="sumbit-step-problem"Поля не можуть бути пустими!</p>`;
        return;
    }
    else if (!isValidPassword(newPassword.value)) {
        changePasswordMessage.innerHTML = `<p class="sumbit-step-problem"Пароль повинен містити великі літери, цифри та символи!</p>`;;
        return;
    }
    try {
        const checkEmail = await fetch(`${serverURL}/api/EditProfile/DropPassword`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ NewPassword: newPassword.value, Email: resetPasswordEmail.value })
        })
        if (checkEmail.ok) {
            showStep(4);
        }
        else {
            changePasswordMessage.innerHTML = `<p class="sumbit-step-problem">Щось пішло не так! Спробуйте ще раз!</p>`;;
            setTimeout(() => { changePasswordMessage.innerText = "" }, 1500);
        }
    }
    catch (error) {
        console.log(error);
        return;
    }
})


signInFormBackButton1.addEventListener("click", (event) => {
    event.preventDefault()
    if (currentStepIndex > 0) showStep(currentStepIndex - 1);
});
signInFormBackButton2.addEventListener("click", (event) => {
    event.preventDefault()
    if (currentStepIndex > 0) showStep(currentStepIndex - 1);
});
signInFormBackButton3.addEventListener("click", (event) => {
    event.preventDefault()
    if (currentStepIndex > 0) showStep(currentStepIndex - 1);
});
signInFormBackButton4.addEventListener("click", (event) => {
    event.preventDefault()
    if (currentStepIndex > 0) showStep(currentStepIndex - 1);
});

showStep(currentStepIndex);

document.querySelector(".sign-in-form__toggle-password-button").addEventListener('click', function () {
    const passwordInput = document.querySelector(".sign-in-form__input--new-password");
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    const svgVisible = `
        <svg width="30" height="20" viewBox="0 0 96 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M47.5 1.5002C27.9443 2.00795 3 24.5002 3 24.5002C3 24.5002 28.1144 46.6364 47.5 46.5002C67.6806 46.3584 93 22.0002 93 22.0002C93 22.0002 66.9825 0.994356 47.5 1.5002Z" stroke="#1F545B" stroke-width="3"/>
            <path d="M32.0603 22C33.1251 12.0545 48 4.5 48 4.5C48 4.5 62.7076 12.1554 63.5603 22C64.5652 33.6021 47.5 42.5 47.5 42.5C47.5 42.5 30.8768 33.0548 32.0603 22Z" fill="#1F545B"/>
            <ellipse cx="41.5" cy="23" rx="2.5" ry="4" fill="white"/>
        </svg>`;
    const svgHidden = `
        <svg width="30" height="20" viewBox="0 0 93 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 4.5C1 4.5 26.1144 26.6362 45.5 26.5C65.6806 26.3582 91 2 91 2" stroke="#1F545B" stroke-width="3" />
        </svg>`;

    this.innerHTML = type === 'password' ? svgVisible : svgHidden;
});


function isValidPassword(password) {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    return passwordRegex.test(password.trim());
}