import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useArticles } from '../context/ArticlesContext';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function Navigation() {
  const location = useLocation();
  const { savedArticles } = useArticles();

  // initialize user, isAuthenticated,logout, and nav + hasRole
  const {user, isAuthenticated, logout, hasRole} = useAuth();
  const navigate = useNavigate();

  // handleLogout method
  const handleLogout = () => {
    logout();
    navigate('/');
  };



  return (
    <nav>
      <div className="nav-container">
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <h1 className="nav-brand">NewsReader</h1>
          <div className="nav-links">
            <Link 
              to="/" 
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              Home
            </Link>
            <Link 
              to="/search" 
              className={`nav-link ${location.pathname === '/search' ? 'active' : ''}`}
            >
              Search
            </Link>
            {/* ⚠️ SECURITY ISSUE: No authentication required to access saved articles */}
            {/* Authemtication */}
            {isAuthenticated && (
              <Link 
              to="/saved" 
              className={`nav-link ${location.pathname === '/saved' ? 'active' : ''}`}
            >
              Saved Articles ({savedArticles.length})
            </Link>
            )} {hasRole('admin') && (
              <Link to="/admin" className="nav-link admin-link">Admin</Link>
            )}
            
          </div>
        </div>
        {/* ⚠️ SECURITY ISSUE: No login/logout functionality */}
        <div className="nav-user">
          <div className="auth-section">
            {isAuthenticated ? (
              <div className="user-info">
                <span className="username"> 👤 {user.username} </span>
                {user.role === 'admin' && (
                  <span className="admin-badge">Admin</span>
                )}
                <button onClick={handleLogout} className="logout-button">
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="login-link">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;