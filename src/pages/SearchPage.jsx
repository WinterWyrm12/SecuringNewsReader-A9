import { useState } from 'react';
import ArticleCard from '../components/ArticleCard';
import { searchArticles } from '../services/api';

function SearchPage() {
  const [query, setQuery] = useState('');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      setLoading(true);
      setHasSearched(true);
      const data = await searchArticles(query);
      setArticles(data);
      setError(null);
    } catch (err) {
      setError('Failed to search articles. Please check your API key and try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="page-heading">Search Articles</h2>
      
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-input-group">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for articles..."
            className="search-input"
          />
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {error && (
        <div className="message error">{error}</div>
      )}

      {!hasSearched && (
        <div className="message">
          Enter a search term to find articles
        </div>
      )}

      {hasSearched && !loading && articles.length === 0 && !error && (
        <div className="message">
          No articles found. Try a different search term.
        </div>
      )}

      {articles.length > 0 && (
        <div className="articles-grid">
          {articles.map((article, index) => (
            <ArticleCard key={index} article={article} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;