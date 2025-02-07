const updateForm = document.querySelector(".form-update__form");
const inputFormUpdate = document.querySelector(".form-update__input");
const formUpdateMessage = document.querySelector(".form-update__message");
const updateFormPattern = /^\S+@\S+\.\S+$/;
function checkPatternValidation(input, pattern) {
    return pattern.test(input);
}

updateForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const inputValue = inputFormUpdate.value;
    const isPatternValid = checkPatternValidation(inputValue, updateFormPattern);
    if (!isPatternValid) {
        formUpdateMessage.innerText = "Будь ласка введіть дійсну адресу електронної пошти";
        updateForm.reset();
        setTimeout(() => {
            formUpdateMessage.innerText = "";
        }, 3000);
    }
    else if (inputValue === "") {
        formUpdateMessage.innerText = "Будь ласка введіть адресу електронної пошти";
        updateForm.reset();
        setTimeout(() => {
            formUpdateMessage.innerText = "";
        }, 3000);
    }
    else {
        try {
            const response = await fetch(updateForm.action, {
                method: updateForm.method,
                body: new FormData(updateForm),
                headers: {
                    Accept: "application/json",
                },
            });
            if (response.ok) {
                formUpdateMessage.innerHTML = `<p class="form-update__message-success">Дякуємо за підписку!</p>`;
                updateForm.reset();
                setTimeout(() => {
                    formUpdateMessage.innerText = "";
                }, 3000);
            }
            else {
                formUpdateMessage.innerText = `<p class="form-update__message-warning">Щось пішло не так. Спробуйте ще раз!</p>`;
                updateForm.reset();
                setTimeout(() => {
                    formUpdateMessage.innerText = "";
                }, 3000);
            }
        }
        catch (error) {
            formUpdateMessage.innerHTML = `<p class="form-update__message-error">Помилка під час відправлення форми. Спробуйте ще раз!</p>`;
            console.error("Error during form submission:", error);
            setTimeout(() => {
                formUpdateMessage.innerText = "";
            }, 3000);
        }
    }
});