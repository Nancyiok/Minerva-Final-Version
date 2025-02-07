import React from 'react';
import ReactDOM from 'react-dom/client';
import Article from "./articles-components/article-component.jsx"; ;

const root = document.getElementById('root');
if (root) {
    const rootElement = ReactDOM.createRoot(root);
    rootElement.render(<Article />);
}
