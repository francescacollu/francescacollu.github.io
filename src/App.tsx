import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AboutPage from './pages/AboutPage';
import ArticlesPage from './pages/ArticlesPage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import './styles/globals.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/articles" replace />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/articles/:slug" element={<ArticleDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App; 