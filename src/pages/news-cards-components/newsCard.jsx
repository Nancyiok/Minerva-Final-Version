import React from "react";
import serverURL from "../../../web/js/global/server-url.js";

function readArticle(id) {
    // const idsave = sessionStorage.setItem("newsArticleId", JSON.stringify(id));

    // console.log(idsave);
    window.location.href = `../article-page/article.html?id=${id}`;
    // window.location.href = `${window.location.origin}/../article-page/article.html?id=${id}`;

}


function UserWelcomeNewsCard({ id, imgSrc, title, description }) {
    return (
        <div className="user-welcome-news-card" id={`card-${id}`}>
            <img
                className="user-welcome-news-card__img"
                src={imgSrc || "/default-image.jpg"}
                alt={`Изображение для статьи ${title}`}
            />
            <h3 className="user-welcome-news-card__title">{title}</h3>
            <p className="user-welcome-news-card__description">{description}</p>
            <button
                onClick={() => readArticle(id)}
                className="user-welcome-news-card__button" >
                Читати
            </button>
        </div>
    );
}

export default UserWelcomeNewsCard;
