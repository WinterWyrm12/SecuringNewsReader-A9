function AdminPage() {
  // Check if a user is an admin and return all users' saved articles if they are. Redirect them to home if not.

  return (
    <div>
      <h2 className="page-heading">Admin Dashboard</h2>
      
      <div style={{ 
        background: '#fff3cd', 
        border: '1px solid #ffc107', 
        borderRadius: '6px', 
        padding: '16px', 
        marginBottom: '24px' 
      }}>
        <p style={{ margin: 0, color: '#856404' }}>
          Admin View: You can see all users' saved articles
        </p>
      </div>

      {Object.keys(allUserArticles).length === 0 ? (
        <div className="message">
          No users have saved any articles yet.
        </div>
      ) : (
        <div>
          {Object.entries(allUserArticles).map(([username, articles]) => (
            <div key={username} style={{ marginBottom: '32px' }}>
              <h3 style={{ 
                color: '#333', 
                borderBottom: '2px solid #e0e0e0', 
                paddingBottom: '8px',
                marginBottom: '16px'
              }}>
                {username}'s Saved Articles ({articles.length})
              </h3>
              
              {articles.length === 0 ? (
                <p style={{ color: '#666', marginLeft: '16px' }}>No saved articles</p>
              ) : (
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
                  gap: '16px',
                  marginLeft: '16px'
                }}>
                  {articles.map((article, index) => (
                    <div 
                      key={index}
                      style={{
                        background: 'white',
                        border: '1px solid #e0e0e0',
                        borderRadius: '8px',
                        padding: '16px'
                      }}
                    >
                      <h4 style={{ margin: '0 0 8px 0', fontSize: '0.95rem' }}>
                        <a href={article.url} target="_blank" rel="noopener noreferrer" style={{ color: '#1976d2', textDecoration: 'none' }}>
                          {article.title}
                        </a>
                      </h4>
                      <p style={{ fontSize: '0.85rem', color: '#666', margin: 0 }}>
                        {article.section} • {new Date(article.published_date).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPage;
