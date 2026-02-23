import { useState, useEffect } from 'react';
import ArticleCard from '../components/ArticleCard';
import { fetchTopStories } from '../services/api';

function HomePage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTopStories = async () => {
      try {
        setLoading(true);
        const data = await fetchTopStories();
        setArticles(data);
        setError(null);
      } catch (err) {
        setError('Failed to load articles. Please check your API key and try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadTopStories();
  }, []);

  if (loading) {
    return <div className="loading">Loading top stories...</div>;
  }

  if (error) {
    return <div className="message error">{error}</div>;
  }

  return (
    <div>
      <h2 className="page-heading">Top Stories</h2>
      <div className="articles-grid">
        {articles.map((article, index) => (
          <ArticleCard key={index} article={article} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;