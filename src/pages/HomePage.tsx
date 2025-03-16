import React, { useState, useEffect } from 'react';
import PageLayout from '../components/PageLayout';
import ArticleCard from '../components/ArticleCard';
import { getAllArticles } from '../lib/articleData';
import { Article } from '../components/ArticleCard';

export default function HomePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  
  // Load articles
  useEffect(() => {
    setArticles(getAllArticles());
  }, []);
  
  return (
    <PageLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </PageLayout>
  );
} 