import React from 'react';
import ReactDOM from 'react-dom/client';
import ArticleJob from "./job-article-component/JobPosting.jsx"; ;

const root = document.getElementById('root');
if (root) {
    const rootElement = ReactDOM.createRoot(root);
    rootElement.render(<ArticleJob />);
}
