import serverURL from "../../js/global/server-url.js";
const logInEmailMain = document.querySelector(".sign-in-form__input--email");
const logInPasswordMain = document.querySelector(".sign-in-form__input--password");
const logInButton = document.querySelector(".sign-in-form__submit-button");
const messageForUser = document.querySelector(".sign-in-form__message");
const resetPasswordEmail = document.querySelector(".sign-in-form__input--reset-password-email");
const resetPasswordButton = document.querySelector(".sign-in-form__submit-button-forgot-password");


logInButton.addEventListener("click", async (event) => {
    event.preventDefault();
    if (logInEmailMain.value === "" || logInPasswordMain.value === "") {
        messageForUser.innerHTML = `<p class="sumbit-step-problem">Поля не можуть бути пустими!</p>`;
        logInEmailMain.classList.add("incorrect");
        logInPasswordMain.classList.add("incorrect");
        setTimeout(() => {
            messageForUser.innerText = ""
            logInEmailMain.classList.remove("incorrect");
            logInPasswordMain.classList.remove("incorrect");
        }, 1500);
    }
    else {
        try {
            const checkLoginData = await fetch(`${serverURL}/api/auth/login`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Email: logInEmailMain.value, Password: logInPasswordMain.value })
            });
            if (checkLoginData.ok) {
                const data = await checkLoginData.json();
                console.log(data);
                event.preventDefault();
                sessionStorage.setItem("login", JSON.stringify(data.username));
                sessionStorage.setItem("id", JSON.stringify(data.id));
                window.location.href = ".././user-welcome-page/user-welcome.html";
            }
            else {
                const error = await checkLoginData.text();
                if (error === "User not found") {
                    messageForUser.innerHTML = `<p class="sumbit-step-problem">Такого користувача не існує!</p>`;
                    logInEmailMain.classList.add("incorrect");
                    setTimeout(() => {
                        messageForUser.innerText = ""
                        logInEmailMain.classList.remove("incorrect");
                    }, 1700);
                    return;
                }

                else if (error === "The password is incorrect") {
                    messageForUser.innerHTML = `<p class="sumbit-step-problem">Неправильний пароль</p>`;
                    setTimeout(() => { messageForUser.innerText = "" }, 1500);
                    logInPasswordMain.classList.add("incorrect");
                    setTimeout(() => {
                        messageForUser.innerText = ""
                        logInPasswordMain.classList.remove("incorrect");
                    }, 1500);
                    return;
                }

                else {
                    error("ERROR:", error);
                    messageForUser.innerHTML = `<p class="sumbit-step-problem">Щось пішло не так! Спробуйте ще раз!</p>`;
                    setTimeout(() => { messageForUser.innerText = "" }, 1500);
                    return;
                }
            }
        }
        catch (error) {
            messageForUser.innerHTML = `<p class="sumbit-step-problem">Сервер...</p>`;
            setTimeout(() => { messageForUser.innerText = "" }, 1500);
            console.log(error);
            return;
        }
    }
});






// const response = await fetch(url + `/api/auth/login`, {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//         Email: email,
//         Password: password
//     })
// }); //Возвращается вся информация о пользователе которая есть в БД

// if (response.ok) {
//     const data = await response.json();

//     const photoUrl = data.photo ? `data:image/jpeg;base64,${data.photo}` : '';

//     const resumeUrl = data.resume ? `data:image/jpeg;base64,${data.photo}` : '';

//     // Заполнение информации о пользователе
//     let userId = data.id;
//     let accountType = data.type_name;
//     let Email = data.email;
//     let UserName = data.user_name;
//     let Phone = data.phone || 'отсутствует';
//     let Name = data.name || 'отсутствует';
//     let Surname = data.surname || 'отсутствует';
//     let Fathername = data.fathername || 'отсутствует';

//     // Вывод фото пользователя
//     if (photoUrl) {
//         document.getElementById('userPhoto').src = photoUrl;
//     } else {
//         document.getElementById('userPhoto').style.display = 'none';
//     }

//     //Вывод резюме пользователя...

//     document.getElementById('profileSection').style.display = 'block';
// }
// else {
//     const error = await response.text();
//     if (error = "User not found")
//         error("ERROR:", error); // Такого пользователя нету
//     else if (error = "The password is incorrect")
//         error("ERROR:", error); // Не верный пароль
//     else
//         error("ERROR:", error);
// }
