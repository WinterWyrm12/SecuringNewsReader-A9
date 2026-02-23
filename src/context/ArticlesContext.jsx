import React, { createContext, useContext, useState } from 'react';

// ⚠️ SECURITY ISSUE: This context is shared globally with no user authentication
// All users see the same saved articles!
const ArticlesContext = createContext();

export function ArticlesProvider({ children }) {
  const [savedArticles, setSavedArticles] = useState([]);

  const saveArticle = (article) => {
    setSavedArticles(prev => {
      // Check if article is already saved
      if (prev.find(a => a.url === article.url)) {
        return prev;
      }
      return [...prev, article];
    });
  };

  const removeArticle = (url) => {
    setSavedArticles(prev => prev.filter(a => a.url !== url));
  };

  const isArticleSaved = (url) => {
    return savedArticles.some(a => a.url === url);
  };

  return (
    <ArticlesContext.Provider 
      value={{ 
        savedArticles, 
        saveArticle, 
        removeArticle, 
        isArticleSaved 
      }}
    >
      {children}
    </ArticlesContext.Provider>
  );
};

export const useArticles = () => {
  const context = useContext(ArticlesContext);
  if (!context) {
    throw new Error('useArticles must be used within ArticlesProvider');
  }
  return context;
};