import React, { useState, useEffect } from "react";
import serverURL from "../../web/js/global/server-url.js";

function ArticleHeader({ data }) {
    const [authorName, setAuthorName] = useState("Невідомий автор");

    useEffect(() => {
        async function fetchAuthorName() {
            const name = await getAuthorName(data.article_author_id);
            setAuthorName(name);
        }

        fetchAuthorName();
    }, [data.article_author_id]); 

    return (
        <header className="article__header">
            <div className="article__decoration-circles">
                <img src="./img/circles.svg" alt="Декоративні кола" />
            </div>
            <div className="article__user-info">
                <img className="article__avatar" src="./img/profile-photo.svg" alt="Аватар користувача" />
                <div className="article__details">
                    <p className="article__nickname">Автор: {authorName}</p>
                    <p className="article__date">
                        Дата публікації статті: &nbsp;
                         <span className="article__date--data">
                            {formatDate(data.article_publishDate) || "Не вказано"}
                        </span>
                    </p>
                    <h2 className="article__title">{data.article_title}</h2>
                </div>
            </div>
        </header>
    );
}

function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("uk-UA", options);
}

async function getAuthorName(authorId) {
    try {
        const response = await fetch(`${serverURL}/api/Users/${authorId}/BaseInfo`, {
            method: "GET",
            headers: {
                "ngrok-skip-browser-warning": "true",
            },
        });
        if (response.ok) {
            const author = await response.json();
            return `${author.name || "Невідомий"} ${author.surname || "автор"}`;
        } else {
            return "Невідомий автор";
        }
    } catch (error) {
        console.error("Помилка запиту:", error);
        return "Невідомий автор";
    }
}

export default ArticleHeader;
