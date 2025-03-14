import React from "react";
const JobApplyButton = () => (
    <div className="job-posting__apply">
        <button onClick={reply} className="job-posting__button">Відгукнутися</button>
    </div>
);


function reply() {
    const container = document.querySelector(".job-posting");
    const arrows = document.querySelector(".load-arrows");
    container.innerHTML = `<div class="job-posting__apply">
    <p>Перенаправляємо вас до оригінального оголошення про вакансію...</p>
    <img src="./img/navigate-icon-loading.svg" alt="Loading..." />
    </div>
    `;
    arrows.classList.add("active");
    
    setTimeout(() => {
        window.location.href = "https://www.work.ua/jobs/4187385/";
    }, 3000);
}

export default JobApplyButton;
