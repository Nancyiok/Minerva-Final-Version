// src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import NewsSection from './pages/news-cards-components/userWelcomeNews.jsx';

const root = document.getElementById('root');
if (root) {
    const rootElement = ReactDOM.createRoot(root);
    rootElement.render(<NewsSection />);
}

