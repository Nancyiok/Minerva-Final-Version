function ArticleHeader({ data }) {
    return (
        <header className="article__header">
            <div className="article__decoration-circles">
                <img src="./img/circles.svg" alt="Декоративные круги" />
            </div>
            <div className="article__user-info">
                <img className="article__avatar" src="./img/profile-photo.jpg" alt="Аватар користувача" />
                <div className="article__details">
                    <p className="article__nickname">Автор: {data.article_author_id}</p>
                    <p className="article__date">
                        Дата публікації статті:
                        <span className="article__date--data">
                            {data.article_publishDate || " Не вказано"}
                        </span>
                    </p>
                    <h2 className="article__title">{data.article_title}</h2>
                </div>
            </div>
        </header>
    );
}
export default ArticleHeader;
