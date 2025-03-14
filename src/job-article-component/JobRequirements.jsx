import React from "react";

const JobRequirements = () => (
    <div className="job-posting__requirements-responsibilities">
        <div className="job-posting__requirements">
            <h3 className="job-posting__subtitle">Вимоги:</h3>
            <ul className="job-posting__list">
                <li>Досвід роботи з C# від 1 року (для Junior) або 3+ років (для Middle)</li>
                <li>Знання .NET Core / .NET Framework</li>
                <li>Вміння працювати з базами даних та SQL-запитами</li>
                <li>Розуміння принципів ООП, SOLID</li>
                <li>Досвід роботи з Git</li>
                <li>Базові знання JavaScript, HTML, CSS будуть плюсом</li>
            </ul>
        </div>
        <div className="job-posting__responsibilities">
            <h3>Основні обов’язки:</h3>
            <ul className="job-posting__list">
                <li>Розробка та підтримка веб-додатків на C# та .NET</li>
                <li>Робота з базами даних (MS SQL, PostgreSQL)</li>
                <li>Використання Entity Framework та LINQ</li>
                <li>Інтеграція сторонніх API та сервісів</li>
                <li>Оптимізація коду та підвищення продуктивності додатків</li>
                <li>Робота в команді за методологією Agile</li>
            </ul>
        </div>
    </div>
);

export default JobRequirements;
