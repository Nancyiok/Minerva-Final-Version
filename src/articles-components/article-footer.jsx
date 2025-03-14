// function ArticleFooter({ data }) {
//     return (
//         <footer className="article-footer">
//             <div className="article-footer__icon">
//                 <EyeIcon />
//             </div>
//             <span className="article-footer__views">
//                 {data.article_views? data.article_views : "0"}
//             </span>
//             <div className="article-footer__repost">
//                 <RepostIcon />
//             </div>
//         </footer>
//     );
// }

// function EyeIcon() {
//     return (
//         <svg width="82" height="48" viewBox="0 0 82 48" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path d="M40.5133 1.31278C23.602 1.82463 2.03076 24.4988 2.03076 24.4988C2.03076 24.4988 23.7491 46.8141 40.5133 46.6768C57.9649 46.5338 79.8605 21.9786 79.8605 21.9786C79.8605 21.9786 57.3612 0.802839 40.5133 1.31278Z" stroke="#1F545B" strokeWidth="2" />
//             <path d="M26.8485 21.7351C27.802 10.1237 41.1231 1.30371 41.1231 1.30371C41.1231 1.30371 54.2943 10.2415 55.0579 21.7351C55.9579 35.2807 40.6753 45.6691 40.6753 45.6691C40.6753 45.6691 25.7886 34.6417 26.8485 21.7351Z" fill="#1F545B" />
//             <path d="M35.1964 27.5191C36.4176 27.5191 37.4075 25.9391 37.4075 23.99C37.4075 22.041 36.4176 20.4609 35.1964 20.4609C33.9753 20.4609 32.9854 22.041 32.9854 23.99C32.9854 25.9391 33.9753 27.5191 35.1964 27.5191Z" fill="white" />
//         </svg>
//     );
// }

// function RepostIcon() {
//     return (
//         <img src="./img/arrow-share.svg" alt="Стрілка поділитися" />
//     );
// }

// export default ArticleFooter;

import React, { useState } from 'react';
function ArticleFooter({ data }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    console.log(data);
    const [linkToShare, setLinkToShare] = useState(`../article-page/article.html?id=${data.id}`);
    const handleShareClick = () => {
        if (navigator.share) {
            navigator.share({
                title: 'Поділитися статею',
                url: linkToShare,
            })
                .then(() => {
                    console.log('Дякуємо що поділились!');
                })

                .catch(console.error);
        } else {
            setIsDialogOpen(true);
        }
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    return (
        <footer className="article-footer">
            <div className="article-footer__icon">
                <EyeIcon />
            </div>
            <span className="article-footer__views">
                {data.article_views ? data.article_views : "0"}
            </span>
            <div className="article-footer__repost" onClick={handleShareClick}>
                <RepostIcon />
            </div>
            {isDialogOpen && (
                <div className="share-dialog">
                    <h2>Поділитися статею</h2>
                    <div className='share-dialog__input'>
                        <input
                            type="text"
                            value={linkToShare}
                            readOnly
                            id="share-link"
                        />
                        <button className="close-button" onClick={handleCloseDialog}>
                            Закрити
                        </button>
                    </div>
                </div>
            )}
        </footer>
    );
}

function EyeIcon() {
    return (
        <svg width="82" height="48" viewBox="0 0 82 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M40.5133 1.31278C23.602 1.82463 2.03076 24.4988 2.03076 24.4988C2.03076 24.4988 23.7491 46.8141 40.5133 46.6768C57.9649 46.5338 79.8605 21.9786 79.8605 21.9786C79.8605 21.9786 57.3612 0.802839 40.5133 1.31278Z" stroke="#1F545B" strokeWidth="2" />
            <path d="M26.8485 21.7351C27.802 10.1237 41.1231 1.30371 41.1231 1.30371C41.1231 1.30371 54.2943 10.2415 55.0579 21.7351C55.9579 35.2807 40.6753 45.6691 40.6753 45.6691C40.6753 45.6691 25.7886 34.6417 26.8485 21.7351Z" fill="#1F545B" />
            <path d="M35.1964 27.5191C36.4176 27.5191 37.4075 25.9391 37.4075 23.99C37.4075 22.041 36.4176 20.4609 35.1964 20.4609C33.9753 20.4609 32.9854 22.041 32.9854 23.99C32.9854 25.9391 33.9753 27.5191 35.1964 27.5191Z" fill="white" />
        </svg>
    );
}

function RepostIcon() {
    return (
        <img src="./img/arrow-share.svg" alt="Стрілка поділитися" />
    );
}

export default ArticleFooter;
