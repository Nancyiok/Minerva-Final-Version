import React from "react";

const JobHeader = ({ data, imageSrc }) => (
    <div className="job-posting__header">
        <div className="job-posting__logo-container">
            <img className="job-posting__logo" src={imageSrc || ""} alt="C#" />
        </div>
        <div className="job-posting__info">
            <h2 className="job-posting__title">{data.vacancy_title}</h2>
            {/* <ul className="job-posting__details">
                <li className="job-posting__item"><span className="title-higlight">Компанія:</span> TechNova Solutions</li>
                <li className="job-posting__item"><span className="title-higlight">Локація:</span> Віддалено / Офіс у Дніпрі</li>
                <li className="job-posting__item"><span  className="title-higlight">Тип зайнятості:</span> Повна зайнятість</li>
            </ul>
            <div className="job-posting__description">
                <p>Шукаємо талановитого C# розробника для роботи над сучасними<br /> веб-додатками та корпоративними рішеннями.</p>
            </div> */}
        </div>
        {console.log(imageSrc)}
    </div>
);


export default JobHeader;


