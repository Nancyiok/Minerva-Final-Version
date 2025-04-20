import serverURL from "../web/js/global/server-url.js";
import { createSwapy } from 'swapy'
sessionStorage.setItem("firstVisit", "yes");
const year = document.querySelector('.content-today__year');
const month = document.querySelector('.content-today__month');
const day = document.querySelector('.content-today__day');
const userMeetings = document.querySelector('.user-meetings');
year.innerHTML = new Date().getFullYear();
month.innerHTML = new Date().toLocaleString('uk', { month: 'long' });
day.innerHTML = new Date().getDate();
!sessionStorage.getItem("id") ? userMeetings.innerHTML = `<p class="date-user-events-none"> У вас немає запланованих зустрічей</p>` : "";
try {
    const response = await fetch(`${serverURL}/api/Calendar/${sessionStorage.getItem("id")}/AllEvents`, {
        method: "GET",
        headers: {
            "ngrok-skip-browser-warning": "true"
        }
    });

    const userEvents = await response.json();
    if (userEvents.length === 0 ) {
        userMeetings.innerHTML = `<p class="date-user-events"> У вас немає запланованих зустрічей</p>`;
    }
    for (let i = 0; i < userEvents.length; i++) {
        console.log(i);
        let date = new Date(userEvents[i]);
        let day = date.getDate();
        let dayNull = day.toString().padStart(2, '0');
        let month = date.getMonth() + 1;
        let monthNull = month.toString().padStart(2, '0');
        let year = date.getFullYear();
        let time = date.getHours() + ":" + date.getMinutes() + "0";
        userMeetings.innerHTML += `<p class="date-user-events"> Дата: <span class="date-user-events__date">${dayNull}-${monthNull}-${year}</span> Час: <span class="date-user-events__time">${time}</span></p>`;
    }
    console.log(userEvents);
}

catch (error) {
    console.log(error);
}

const container = document.querySelector('.container-dashboard')
const swapy = createSwapy(container, {
    // Your config options
})

// const toggleBtn = document.getElementById('theme-toggle');
// const html = document.documentElement;

// toggleBtn.addEventListener('click', () => {
//     console.log('click')
//     html.classList.toggle('dark-theme');
// });





