const modal = document.querySelector('.welcome-window');
// window.addEventListener("load", () => {
//     const modal = document.querySelector('.welcome-window');
//     if (!modal) {
//         console.error('Элемент .welcome-window не найден!');
//         return;
//     }

//     const loginValue = localStorage.getItem('login');
//     console.log('Значение login из localStorage:', loginValue);

//     if (loginValue) {
//         console.log('Пользователь авторизован');
//         document.querySelector(".welcome-window__title").innerText = loginValue;
//     } else {
//         console.log('Пользователь не авторизован');
//         document.querySelector(".welcome-window__title").innerText = "Привіт!";
//         localStorage.removeItem('login');
//     }
//     console.log('Модальное окно найдено');
//     document.querySelector(".welcome-window__title").innerText = "Привіт!";
//     localStorage.removeItem('login');
    setTimeout(() => {
        console.log('Скрываем окно...');
        modal.classList.add('hidden');
        console.log('Класс hidden добавлен:', modal.classList.contains('hidden'));
        modal.style.display = 'none';
    }, 1000);
// });

// window.addEventListener("load", () => {
//     setTimeout(() => {
//         document.body.classList.remove("hidden");
//         document.body.classList.add("visible");
//     }, 500);
// });

// document.addEventListener("DOMContentLoaded", () => {
//     // Проверяем, что устройство мобильное
//     const isMobile = window.matchMedia("(max-width: 768px)").matches;

//     if (isMobile) {
//         console.log("Это мобильное устройство");
//         const modal = document.querySelector('.welcome-window');
//         if (!modal) {
//             console.error('Элемент .welcome-window не найден!');
//             return;
//         }

//         const loginValue = localStorage.getItem('login');
//         console.log('Значение login из localStorage:', loginValue);

//         if (loginValue) {
//             console.log('Пользователь авторизован');
//             document.querySelector(".welcome-window__title").innerText = loginValue;
//         } else {
//             console.log('Пользователь не авторизован');
//             document.querySelector(".welcome-window__title").innerText = "Привіт!";
//             localStorage.removeItem('login');
//         }

//         console.log('Модальное окно найдено');
//         setTimeout(() => {
//             console.log('Скрываем окно...');
//             modal.classList.add('hidden');
//             console.log('Класс hidden добавлен:', modal.classList.contains('hidden'));
//             if (modal.classList.contains('hidden')) {
//                 console.log('Класс hidden успешно добавлен');
//             } else {
//                 console.log('Не удалось добавить класс hidden');
//             }
//             modal.style.display = 'none';
//             console.log('Окно скрыто');
//         }, 1000);
//     } else {
//         console.log("Это не мобильное устройство, код не выполняется");
//     }
// });
