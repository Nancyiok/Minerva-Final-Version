// UserWelcomeNewsHeader.js
function UserWelcomeNewsHeader() {
    return (
        <div className="user-welcome-news-header">
            <div className="user-welcome-news-header__title">
                <h2>
                    Останні <br />
                    новини
                </h2>
                <img
                    className="user-welcome-news-header__title-img"
                    src="./img/news-icon.svg"
                    alt="Новини"
                />
            </div>
            <div className="user-welcome-news-header__description">
                <p>
                    Не пропустіть новини, поради з побудови кар’єри та історії успіху
                    студентів, які вже знайшли роботу мрії з нашою допомогою. Ми
                    постійно оновлюємо інформацію, щоб допомогти вам зробити перший
                    крок до професійного успіху.
                </p>
            </div>
        </div>
    );
}

export default UserWelcomeNewsHeader;
