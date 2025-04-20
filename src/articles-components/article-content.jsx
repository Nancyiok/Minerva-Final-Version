import React, { useEffect, useState } from 'react';
import serverURL from "../../web/js/global/server-url.js";

function ArticleContent({ data }) {
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (data.article_file) {
            const decodedContent = decodeBase64(data.article_file);
            setContent(decodedContent);
        }
    }, [data.article_file]);

    return (
        <div className="article__content">
            <div className="article__image-text">
                {data.article_photos?.length > 0 && (
                    <img className="article__image" src={data.article_photos[0]} alt="Article" />
                )}
                <p className="article-first-paragraph">{data.article_first_paragraph}</p>
            </div>
            <div className="article__text article__text--long">
                <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
        </div>
    );
}

function decodeBase64(base64String) {
    try {
        const binaryString = atob(base64String);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        const decoder = new TextDecoder('utf-8');
        return decoder.decode(bytes);
    } catch (e) {
        console.error('Помилка декодування Base64:', e);
        return '';
    }
}

// const allArticlesImages = document.querySelectorAll('.PhotoArticle');

// async function loadImage(url) {
//     try {
//         const response = await fetch(url);
//         if (!response.ok) throw new Error("Помилка завантаження зображення");
//         const blob = await response.blob();
//         return URL.createObjectURL(blob);
//     } catch (error) {
//         console.error("Помилка завантаження:", error);
//     }
// }

// function replaceImagesUrl() {
//     allArticlesImages.forEach(async (img) => {
//         const imgSrc = img.getAttribute('src');
//         if (imgSrc) {
//             const newImgSrc = await loadImage(`${serverURL}${imgSrc}`);
//             img.setAttribute('src', newImgSrc);
//         }
//     });
// }

// async function replaceImageSourcesInHtml(htmlString) {
//     const updatedHtml = htmlString
//         .replace(/\$\{serverURL\}/g, serverURL) 
//         .replace(/\\/g, '/');                  

//     const tempDiv = document.createElement('div');
//     tempDiv.innerHTML = updatedHtml;

//     return tempDiv.innerHTML;
// }

export default ArticleContent;
