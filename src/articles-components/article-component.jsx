import ArticleHeader from "./article-header.jsx";
import ArticleContent from "./article-content.jsx";
import ArticleFooter from "./article-footer.jsx";

function ArticleComponent() {
    return (
        <article className="article-component">
            <div className="article-component-container">
                <ArticleHeader />
                <ArticleContent />
                <ArticleFooter />
            </div>
        </article>
    );
}


export default ArticleComponent;
