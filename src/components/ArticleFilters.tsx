import React from 'react';
import { getUniqueLanguages } from '../lib/articleData';

interface ArticleFiltersProps {
  selectedLanguage: string;
  setSelectedLanguage: (language: string) => void;
}

export default function ArticleFilters({
  selectedLanguage,
  setSelectedLanguage
}: ArticleFiltersProps) {
  const languages = getUniqueLanguages();
  
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
    <div className="flex flex-col sm:flex-row sm:items-center mb-6">
      <span className="font-montserrat text-sm uppercase tracking-wider text-[#2A9D8F] font-medium mb-3 sm:mb-0 sm:mr-6 border-b border-[#2A9D8F]/20 pb-1 sm:pb-0 sm:border-b-0 sm:border-r sm:border-[#2A9D8F]/20 sm:pr-6">
        Language
      </span>
      <div className="flex flex-wrap gap-2 sm:gap-3">
        {/* All Languages option */}
        <button
          onClick={() => setSelectedLanguage('')}
          className={`px-2 sm:px-3 py-1.5 text-xs font-montserrat uppercase tracking-wide rounded-md transition-all duration-300 ${
            selectedLanguage === '' 
              ? 'bg-[#2A9D8F]/10 text-[#2A9D8F] font-medium shadow-sm' 
              : 'bg-gray-50 text-gray-600 hover:bg-[#2A9D8F]/5'
          }`}
        >
          All
        </button>
        {languages.map(language => (
          <button
            key={language}
            onClick={() => handleLanguageToggle(language)}
            className={`px-2 sm:px-3 py-1.5 text-xs font-montserrat uppercase tracking-wide rounded-md transition-all duration-300 ${
              selectedLanguage === language 
                ? 'bg-orange-100 text-orange-700 font-medium shadow-sm' 
                : 'bg-gray-50 text-gray-600 hover:bg-orange-50'
            }`}
          >
            {language}
          </button>
        ))}
      </div>
    </div>
  );
} 