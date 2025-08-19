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
      <span className="font-montserrat text-sm uppercase tracking-wider font-medium mb-3 sm:mb-0 sm:mr-6 border-b pb-1 sm:pb-0 sm:border-b-0 sm:border-r sm:pr-6" style={{ color: '#1e1e24', borderColor: '#1e1e24' }}>
        Language
      </span>
      <div className="flex flex-wrap gap-2 sm:gap-3">
        {/* All Languages option */}
        <button
          onClick={() => setSelectedLanguage('')}
          className={`px-2 sm:px-3 py-1.5 text-xs font-montserrat uppercase tracking-wide rounded-md transition-all duration-300 border ${
            selectedLanguage === '' 
              ? 'font-medium shadow-sm' 
              : 'hover:shadow-sm'
          }`}
          style={selectedLanguage === '' 
            ? { backgroundColor: '#92140c', color: '#fff8f0', borderColor: '#92140c' }
            : { backgroundColor: '#fff8f0', color: '#1e1e24', borderColor: '#1e1e24' }
          }
          onMouseEnter={(e) => {
            if (selectedLanguage !== '') {
              e.currentTarget.style.backgroundColor = '#92140c';
              e.currentTarget.style.color = '#fff8f0';
              e.currentTarget.style.borderColor = '#92140c';
            }
          }}
          onMouseLeave={(e) => {
            if (selectedLanguage !== '') {
              e.currentTarget.style.backgroundColor = '#fff8f0';
              e.currentTarget.style.color = '#1e1e24';
              e.currentTarget.style.borderColor = '#1e1e24';
            }
          }}
        >
          All
        </button>
        {languages.map(language => (
          <button
            key={language}
            onClick={() => handleLanguageToggle(language)}
            className={`px-2 sm:px-3 py-1.5 text-xs font-montserrat uppercase tracking-wide rounded-md transition-all duration-300 border ${
              selectedLanguage === language 
                ? 'font-medium shadow-sm' 
                : 'hover:shadow-sm'
            }`}
            style={selectedLanguage === language 
              ? { backgroundColor: '#92140c', color: '#fff8f0', borderColor: '#92140c' }
              : { backgroundColor: '#fff8f0', color: '#1e1e24', borderColor: '#1e1e24' }
            }
            onMouseEnter={(e) => {
              if (selectedLanguage !== language) {
                e.currentTarget.style.backgroundColor = '#92140c';
                e.currentTarget.style.color = '#fff8f0';
                e.currentTarget.style.borderColor = '#92140c';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedLanguage !== language) {
                e.currentTarget.style.backgroundColor = '#fff8f0';
                e.currentTarget.style.color = '#1e1e24';
                e.currentTarget.style.borderColor = '#1e1e24';
              }
            }}
          >
            {language}
          </button>
        ))}
      </div>
    </div>
  );
} 