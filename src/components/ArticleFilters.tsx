import React from 'react';
import { getUniqueCategories, getUniqueLanguages, getUniquePlatforms } from '../lib/articleData';

interface ArticleFiltersProps {
  selectedLanguage: string;
  setSelectedLanguage: (language: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedPlatform: string;
  setSelectedPlatform: (platform: string) => void;
}

export default function ArticleFilters({
  selectedLanguage,
  setSelectedLanguage,
  selectedCategory,
  setSelectedCategory,
  selectedPlatform,
  setSelectedPlatform
}: ArticleFiltersProps) {
  const languages = getUniqueLanguages();
  const categories = getUniqueCategories();
  const platforms = getUniquePlatforms();
  
  // Handle language toggle
  const handleLanguageToggle = (language: string) => {
    if (language === selectedLanguage) {
      // If clicking on the currently selected language, deactivate it
      setSelectedLanguage('');
    } else {
      setSelectedLanguage(language);
    }
  };
  
  return (
    <div className="flex flex-wrap items-center w-full">
      <div className="flex flex-wrap items-center gap-6 md:gap-8">
        {/* Language Filter */}
        <div className="flex items-center">
          <span className="text-xs font-montserrat uppercase tracking-wider text-gray-500 mr-3">Language</span>
          <div className="flex gap-2">
            {/* All Languages option */}
            <button
              onClick={() => setSelectedLanguage('')}
              className={`px-3 py-1.5 text-xs font-montserrat tracking-wide rounded-md transition-all duration-300 ${
                selectedLanguage === '' 
                  ? 'bg-gray-200 text-gray-800 font-medium shadow-sm' 
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              All
            </button>
            {languages.map(language => (
              <button
                key={language}
                onClick={() => handleLanguageToggle(language)}
                className={`px-3 py-1.5 text-xs font-montserrat tracking-wide rounded-md transition-all duration-300 ${
                  selectedLanguage === language 
                    ? 'bg-purple-50 text-purple-700 font-medium shadow-sm' 
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {language}
              </button>
            ))}
          </div>
        </div>
        
        {/* Category Filter */}
        <div className="flex items-center">
          <span className="text-xs font-montserrat uppercase tracking-wider text-gray-500 mr-3">Category</span>
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none text-xs font-montserrat py-1.5 pl-3 pr-8 bg-gray-50 border border-gray-100 rounded-md focus:ring-1 focus:ring-purple-300 focus:outline-none shadow-sm min-w-[140px]"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </div>
        
        {/* Platform Filter */}
        <div className="flex items-center">
          <span className="text-xs font-montserrat uppercase tracking-wider text-gray-500 mr-3">Platform</span>
          <div className="relative">
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="appearance-none text-xs font-montserrat py-1.5 pl-3 pr-8 bg-gray-50 border border-gray-100 rounded-md focus:ring-1 focus:ring-purple-300 focus:outline-none shadow-sm min-w-[140px]"
            >
              <option value="">All Platforms</option>
              {platforms.map(platform => (
                <option key={platform} value={platform}>
                  {platform}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 