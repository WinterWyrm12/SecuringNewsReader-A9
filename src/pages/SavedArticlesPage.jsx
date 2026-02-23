import ArticleCard from '../components/ArticleCard';
import { useArticles } from '../context/ArticlesContext';

function SavedArticlesPage() {
  const { savedArticles } = useArticles();

  return (
    <div>
      <h2 className="page-heading">Saved Articles</h2>
      
      {/* ⚠️ SECURITY ISSUE: This page should require authentication */}
      <div className="warning-banner">
        <p>
          ⚠️ Currently, all saved articles are shared by everyone! 
          This page needs authentication to make articles user-specific.
        </p>
      </div>

      {savedArticles.length === 0 ? (
        <div className="message">
          No saved articles yet. Browse articles and click the bookmark icon to save them!
        </div>
      ) : (
        <div className="articles-grid">
          {savedArticles.map((article, index) => (
            <ArticleCard key={index} article={article} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedArticlesPage;