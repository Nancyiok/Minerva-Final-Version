import React from "react";
import serverURL from "../../../web/js/global/server-url.js";

async function readArticle(id) {
    sessionStorage.setItem("newsArticleId", JSON.stringify(id));
    console.log("Saved article ID to session:", id); 
    window.location.href = `../article-page/article.html`; 
}


function UserWelcomeNewsCard({ id, imgSrc, title, description }) {
    return (
        <div className="user-welcome-news-card" id={`card-${id}`}>
            <img
                className="user-welcome-news-card__img"
                src={imgSrc || "/default-image.jpg"}
                alt={`Зображення для статті`}
            />
            <h3 className="user-welcome-news-card__title">{title.length > 30 ? title.slice(0, 30) + "..." : title}</h3>
            <p className="user-welcome-news-card__description">{description.length > 60 ? description.slice(0, 60) + "..." : description}</p>
            <button
                onClick={() => readArticle(id)}
                className="user-welcome-news-card__button" >
                Читати
            </button>
        </div>
    ); 
}

async function loadImage(url) {
    try {
        const response = await fetch(url, {
            headers: { "ngrok-skip-browser-warning": "true" },
        });
        if (!response.ok) throw new Error("Помилка завантаження зображення");
        const blob = await response.blob();
        return URL.createObjectURL(blob);
    } catch (error) {
        console.error("Помилка завантаження:", error);
    }
}

export default UserWelcomeNewsCard;
