import React, { useEffect, useState } from "react";
import UserWelcomeNewsCard from "./newsCard";
import UserWelcomeNewsHeader from "./welcomeNewsHeader";
import serverURL from "../../../web/js/global/server-url.js";
import ArticleComponent from "../../articles-components/article-component.jsx";

function UserWelcomeNews() {
    const [newsData, setNewsData] = useState([]);

    useEffect(() => {
        async function getArticleInfo() {
            try {
                const response = await fetch(`${serverURL}/api/Articles/MostPopularArticles`, {
                    method: "GET",
                    headers: {
                        "ngrok-skip-browser-warning": "true",
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log("Отримані статті:", data);

                    if (data) {
                        const latestNews = Object.keys(data).map(key => (
                            {
                                id: data[key].id,
                                imgSrc: data[key].src || "/default-image.jpg",
                                title: data[key].title || "Без назви",
                                description: data[key].first_paragraph || "Опис відсутній",
                                views: data[key].views || 0,
                                theme: data[key].theme || "Без теми"
                            }));

                        console.log("Оброблені новини:", latestNews);
                        setNewsData(latestNews);
                    } else {
                        console.warn("Дані API порожні або некоректні.");
                    }
                } else {
                    const error = await response.text();
                    console.error(`Помилка: ${error}`);
                }
            } catch (err) {
                console.error("Помилка запиту:", err);
            }
        }
        getArticleInfo();
    }, []);

    const handleArticleClick = (id) => {
        setSelectedArticleId(id);
    };

    return (
        <section className="user-welcome-news-section">
            <div className="user-welcome-news">
                <UserWelcomeNewsHeader />
                <div className="user-welcome-news-card-container">
                    {newsData.length > 0 ? (
                        <>
                            {newsData.map((news) => (
                                <UserWelcomeNewsCard
                                    key={news.id}
                                    id={news.id}
                                    imgSrc={news.imgSrc}
                                    title={news.title}
                                    description={news.description}
                                    onClick={() => handleArticleClick(news.id)}
                                />
                            ))}
                        </>
                    ) : (
                        <div className="window-loading__spinner"></div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default UserWelcomeNews;
