const hrNav = document.querySelector(".interview-description-hr");
const programmerNav = document.querySelector(".interview-description-programmer");
const hrDescription = document.querySelector(".interview-description-container-hr");
const programmerDescription = document.querySelector(
    ".interview-description-container-programmer"
); 

hrNav.addEventListener("click", () => {
    hrDescription.style.display = "block";
    hrNav.style.backgroundColor = "#1F545B";
    programmerNav.style.backgroundColor = "#4AA4B0";
    programmerDescription.style.display = "none";
});

programmerNav.addEventListener("click", () => {
    hrNav.style.backgroundColor = "#4AA4B0";
    programmerNav.style.backgroundColor = "#1F545B";
    hrDescription.style.display = "none";
    programmerDescription.style.display = "block";
});


hrDescription.style.display = "block";
programmerDescription.style.display = "none";



const countdownDaysContainer = document.querySelector(".countdown__time-days");
const countdownHoursContainer = document.querySelector(
    ".countdown__time-hours"
);
const countdownMinutesContainer = document.querySelector(
    ".countdown__time-minutes"
);
const countdownSecondsContainer = document.querySelector(
    ".countdown__time-seconds"
);
function countdown() {
    const currentDate = new Date();
    const endDate = new Date("2025-09-31T23:59:59");
    const periodDeal = endDate - currentDate;
    countdownDaysContainer.innerText = Math.floor(
        periodDeal / (1000 * 60 * 60 * 24)
    );
    countdownHoursContainer.innerText = Math.floor(
        (periodDeal / (1000 * 60 * 60)) % 24
    );
    countdownMinutesContainer.innerText = Math.floor(
        (periodDeal / (1000 * 60)) % 60
    );
    countdownSecondsContainer.innerText = Math.floor((periodDeal / 1000) % 60);
}
countdown(); 
setInterval(countdown, 1000);