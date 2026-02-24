import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

// ⚠️ SECURITY ISSUE: This context is shared globally with no user authentication
// All users see the same saved articles!

const ArticlesContext = createContext();

export function ArticlesProvider({ children }) {
  const [savedArticles, setSavedArticles] = useState([]);

  // get user
  const {user} = useAuth();

  // get only users saved articles
  useEffect(() => {
    if (!user) {
      setSavedArticles([]);
      return;
    }
  

    // load saved
    const allSaved = JSON.parse(localStorage.getItem('savedArticlesByUser')) || {};
    // get only current users saved
    const userSaved = allSaved[user.username] || [];
    setSavedArticles(userSaved);
}, [user]);

const saveArticle = (article) => {
    if (!user) return;
    const allSaved = JSON.parse(localStorage.getItem('savedArticlesByUser')) || {};
    const userArticles = allSaved[user.username] || [];
    // prevent duplicates
    if (userArticles.some(a => a.url === article.url)) {
      return;
    }

    const updatedArticles = [...userArticles, article];
    // update storage
    allSaved[user.username] = updatedArticles;

    localStorage.setItem('savedArticlesByUser', JSON.stringify(allSaved));
    setSavedArticles(updatedArticles);
};

  const removeArticle = (url) => {
    if (!user) return;
    const allSaved = JSON.parse(localStorage.getItem('savedArticlesByUser')) || {};
    const userArticles = allSaved[user.username] || [];
    const updatedArticles = userArticles.filter(a => a.url !== url);
    allSaved[user.username] = updatedArticles;
    localStorage.setItem('savedArticlesByUser', JSON.stringify(allSaved));
    setSavedArticles(updatedArticles);
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