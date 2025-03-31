function decodeBase64(base64String) {
    try {
        const binaryString = atob(base64String);
        const bytes = new Uint8Array([...binaryString].map(char => char.charCodeAt(0)));
        return new TextDecoder("utf-8").decode(bytes);
    } catch (e) {
        console.error("Ошибка декодирования Base64:", e);
        return "Помилка при декодуванні файлу.";
    }
}

function ArticleContent({ data }) {
    return (
        <div className="article__content">
            <div className="article__image-text">
                {data.article_photos?.length > 0 && (
                    <img className="article__image" src={data.article_photos[0]} alt="Article" />
                )}
                <p className="article__text">
                    Тема:
                    <span className="article__subtext-wrap-span-concept">
                        {data.article_theme}
                    </span>
                </p>
                <p>{data.article_first_paragraph}</p>
            </div>
            <div className="article__text article__text--long">
                <h3>Файл:</h3>
                <div dangerouslySetInnerHTML={{ __html: decodeBase64(data.article_file) }} />
            </div>
        </div>
    );
}

export default ArticleContent;

