// UserWelcomeNews.js
import React from "react";
import UserWelcomeNewsCard from "./newsCard";
import UserWelcomeNewsHeader from "./welcomeNewsHeader";

function UserWelcomeNews() {
    const newsData = [
        {
            id: 1,
            imgSrc: "./img/photo-for-news-article.svg",
            title: "Нова стаття 1",
            description:
                "Текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст",
        },
        {
            id: 2,
            imgSrc: "./img/photo-for-news-article.svg",
            title: "Нова стаття 2",
            description:
                "Текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст",
        },
        {
            id: 3,
            imgSrc: "./img/photo-for-news-article.svg",
            title: "Нова стаття 3",
            description:
                "Текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст",
        },
    ];

    return (
        <section className="user-welcome-news-section">
            <div className="user-welcome-news">
                <UserWelcomeNewsHeader />
                <div className="user-welcome-news-card-container">
                    {newsData.map((news) => (
                        <UserWelcomeNewsCard
                            key={news.id}
                            imgSrc={news.imgSrc}
                            title={news.title}
                            description={news.description}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default UserWelcomeNews;
