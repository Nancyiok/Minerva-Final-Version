// function ArticleContent({ data }) {
//     return (
//         <div className="article__content">
//             <div className="article__image-text">
//                 <img className="article__image" src={data.src} alt={data.src} />
//                 <p className="article__text">
//                     <span className="article__subtext-wrap">
//                         {/* {data.article_title}<span className="article__subtext-wrap-span-concept">data.article_titledata.article_titleВказівники у мові програмування C </span> — це змінні, що зберігають адресу іншої змінної в пам'яті комп'ютера. Вони дозволяють ефективно працювати з великими об'єктами, передавати їх у функції без копіювання даних і навіть створювати динамічні структури даних, такі як списки та дерева. */}
//                         <span className="article__subtext-wrap-span-concept">{data}</span>
//                     </span>
//                 </p>
//             </div>
            // <p className="article__text article__text--long">
            //     {/* Кожен вказівник має тип, який вказує на тип даних, що зберігаються за цією адресою (наприклад, int* для вказівника на ціле число). Операції з вказівниками включають використання оператора & для отримання адреси змінної та оператора * для доступу до значення за адресою. Вказівники дають можливість ефективно передавати великі об'єкти в функції, створювати динамічні структури, але потребують обережності, щоб уникнути помилок, таких як доступ до неприпустимих областей пам'яті або помилкове розіменування. */}
            //     {data.article_first_paragraph}
            // </p>
//         </div>
//     )
// }

// export default ArticleContent;

// function ArticleContent({ data }) {
//     return (
//         <div className="article__content">
//             <div className="article__image-text">
//                 {data.article_photos?.length > 0 && (
//                     <img className="article__image" src={data.article_photos[0]} alt="Article" />
//                 )}
//                 <p className="article__text">
//                     Тема:
//                         <span className="article__subtext-wrap-span-concept">
//                             {data.article_theme}
//                         </span>
//                 </p>
//             </div>
//             <p className="article__text article__text--long">
//                 {data.article_first_paragraph}
//                 Файл: {data.article_file}
//             </p>
//         </div>
//     );
// }

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

