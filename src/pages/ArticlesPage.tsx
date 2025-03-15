import React from 'react';
import PageLayout from '../components/PageLayout';
import ArticleCard from '../components/ArticleCard';
import { getAllArticles } from '../lib/articleData';

export default function ArticlesPage() {
  const articles = getAllArticles();
  
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