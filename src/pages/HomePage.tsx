import React, { useState, useEffect } from 'react';
import PageLayout from '../components/PageLayout';
import ArticleCard from '../components/ArticleCard';
import { getAllArticles } from '../lib/articleData';
import { Article } from '../components/ArticleCard';

export default function HomePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  
  // Load all articles (All flag selected by default)
  useEffect(() => {
    const allArticles = getAllArticles();
    setArticles(allArticles);
  }, []);
  
  return (
    <PageLayout>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 lg:gap-8">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </PageLayout>
  );
} 