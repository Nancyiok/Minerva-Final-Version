import React, { useEffect, useState } from "react";
import ArticleHeader from "./article-header.jsx";
import ArticleContent from "./article-content.jsx";
import ArticleFooter from "./article-footer.jsx";
import serverURL from "../../web/js/global/server-url.js";

function ArticleComponent() {
    const [articleData, setArticleData] = useState(null);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await fetch(`${serverURL}/api/Articles/${parseInt(sessionStorage.getItem("newsArticleId")) }/Article`, {
                    method: "GET",
                    headers: {
                        "ngrok-skip-browser-warning": "true",
                    },
                });

                if (!response.ok) {
                    const error = await response.text();
                    console.log(error);
                    return;
                }

                const data = await response.json();
                setArticleData(data);
            } catch (err) {
                console.error("Помилка запиту:", err);
            }
        };

        fetchArticle();
    }, []); 

    if (!articleData) {
        return <div className="window-loading__spinner"></div>;
    }

    return (
        <article className="article-component">
            <div className="article-component-container">
                <ArticleHeader data={articleData} />
                <ArticleContent data={articleData} />
                <ArticleFooter data={articleData} />
            </div>
        </article>
    );
}

export default ArticleComponent;
