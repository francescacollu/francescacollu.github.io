import React, { useState, useEffect } from 'react';
import PageLayout from '../components/PageLayout';
import ArticleCard from '../components/ArticleCard';
import ArticleFilters from '../components/ArticleFilters';
import { getAllArticles } from '../lib/articleData';
import { Article } from '../components/ArticleCard';

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [isFiltering, setIsFiltering] = useState(false);
  
  // Load articles
  useEffect(() => {
    const allArticles = getAllArticles();
    setArticles(allArticles);
    
    // Apply initial English filter
    const englishArticles = allArticles.filter(article => article.language === 'English');
    setFilteredArticles(englishArticles);
  }, []);
  
  // Filter articles when filter criteria or articles change
  useEffect(() => {
    // Set filtering state to true to trigger animation
    setIsFiltering(true);
    
    // Small delay to allow animation to work
    const filterTimeout = setTimeout(() => {
      let result = [...articles];
      
      if (selectedLanguage) {
        result = result.filter(article => article.language === selectedLanguage);
      }
      // When no language is selected, show all articles regardless of language
      
      if (selectedCategory) {
        result = result.filter(article => article.category === selectedCategory);
      }
      
      if (selectedPlatform) {
        result = result.filter(article => article.platform === selectedPlatform);
      }
      
      setFilteredArticles(result);
      setIsFiltering(false);
    }, 300);
    
    return () => clearTimeout(filterTimeout);
  }, [articles, selectedLanguage, selectedCategory, selectedPlatform]);
  
  // Determine if any filters are active
  const hasActiveFilters = selectedLanguage || selectedCategory || selectedPlatform;
  
  return (
    <PageLayout>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div className="w-full">
          <ArticleFilters
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedPlatform={selectedPlatform}
            setSelectedPlatform={setSelectedPlatform}
          />
        </div>
        
        {/* Results count - very subtle */}
        {hasActiveFilters && (
          <div className="text-xs font-montserrat text-gray-500 mt-2 md:mt-0 md:ml-4 whitespace-nowrap">
            {filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'} found
          </div>
        )}
      </div>
      
      {/* Articles grid with transition */}
      <div className={`transition-all duration-300 ${isFiltering ? 'opacity-50 blur-sm' : 'opacity-100 blur-0'}`}>
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {filteredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-100">
            <p className="text-sm font-montserrat text-gray-600 mb-3">No articles found matching your filters.</p>
            <button 
              onClick={() => {
                setSelectedLanguage('English'); // Reset to English instead of empty
                setSelectedCategory('');
                setSelectedPlatform('');
              }}
              className="text-xs font-montserrat text-purple-600 hover:text-purple-800 transition-colors duration-300 flex items-center mx-auto"
            >
              <span>Reset filters</span>
              <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        )}
      </div>
    </PageLayout>
  );
} 