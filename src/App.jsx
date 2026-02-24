import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ArticlesProvider } from './context/ArticlesContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import SavedArticlesPage from './pages/SavedArticlesPage';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <AuthProvider>
      <ArticlesProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/saved" element={
                <ProtectedRoute>
                  <SavedArticlesPage />
                </ProtectedRoute>
              } />
              <Route path="/admin" element={
                <ProtectedRoute>
                  <AdminPage />
                </ProtectedRoute>
              } />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ArticlesProvider>
    </AuthProvider>
  );
}

export default App;