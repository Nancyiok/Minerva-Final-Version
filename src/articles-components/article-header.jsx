function ArticleHeader() {
    return (
        <header className="article__header">
            <div className="article__decoration-circles">
                <img src="./img/circles.svg" />
            </div>
            <div className="article__user-info">
                <img className="article__avatar" src="./img/profile-photo.jpg" alt="Аватар пользователя" />
                <div className="article__details">
                    <p className="article__nickname">@Sonetko10</p>
                    <p className="article__date">Дата публікації статті: <span className="article__date--data">07.02.2025</span></p>
                    <h2 className="article__title">Вказівники у мові C </h2>
                </div>
            </div>
        </header>
    )
}
export default ArticleHeader;