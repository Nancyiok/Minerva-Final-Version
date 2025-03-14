import React from "react";

const JobHeader = () => (
    <div className="job-posting__header">
        <div className="job-posting__logo-container">
            <img className="job-posting__logo" src="./img/job-article-photo.jpg" alt="C#" />
        </div>
        <div className="job-posting__info">
            <h2 className="job-posting__title">Вакансія: C# Розробник (Junior/Middle)</h2>
            <ul className="job-posting__details">
                <li className="job-posting__item"><span className="title-higlight">Компанія:</span> TechNova Solutions</li>
                <li className="job-posting__item"><span className="title-higlight">Локація:</span> Віддалено / Офіс у Дніпрі</li>
                <li className="job-posting__item"><span  className="title-higlight">Тип зайнятості:</span> Повна зайнятість</li>
            </ul>
            <div className="job-posting__description">
                <p>Шукаємо талановитого C# розробника для роботи над сучасними<br /> веб-додатками та корпоративними рішеннями.</p>
            </div>
        </div>
    </div>
);


export default JobHeader;
