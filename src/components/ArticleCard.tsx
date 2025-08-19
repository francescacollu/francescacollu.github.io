import React from 'react';
import { Link } from 'react-router-dom';

export interface Article {
  id: number;
  title: string;
  category: string;
  image: string;
  slug: string;
  excerpt?: string;
  url?: string;
  platform?: string;
  date?: string; // Date when the article was added/published
  language?: string; // Language of the article (e.g., "English", "Italian")
  content?: React.ComponentType; // React component to render for hosted articles
}

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const { title, category, image, slug, excerpt, url, platform, language } = article;
  
  // If URL exists, use an anchor tag to external site, otherwise use Link to internal page
  const CardWrapper = url ? 
    ({ children }: { children: React.ReactNode }) => (
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="group relative aspect-[4/3] block rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
      >
        {children}
      </a>
    ) : 
    ({ children }: { children: React.ReactNode }) => (
      <Link 
        to={`/articles/${slug}`}
        className="group relative aspect-[4/3] block rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
      >
        {children}
      </Link>
    );
  
  return (
    <CardWrapper>
      {/* Image - now colored by default */}
      <div className="absolute inset-0 bg-gray-100">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full transition-all duration-500 group-hover:scale-110"
        />
      </div>
      
      {/* Default overlay - always visible with title and summary */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 group-hover:via-black/40 transition-all duration-300 p-4 sm:p-6 flex flex-col justify-end">
        {/* Tags/Filters - only visible on hover */}
        <div className="flex flex-wrap gap-2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span 
            className="inline-block px-2 py-1 text-xs font-medium rounded transition-all duration-200"
            style={{ 
              backgroundColor: '#92140c', 
              color: '#fff8f0',
              border: `1px solid #92140c`
            }}
          >
            {category}
          </span>
          {platform && (
            <span 
              className="inline-block px-2 py-1 text-xs font-medium rounded transition-all duration-200"
              style={{ 
                backgroundColor: '#fff8f0', 
                color: '#1e1e24',
                border: `1px solid #1e1e24`
              }}
            >
              {platform}
            </span>
          )}
          {language && (
            <span 
              className="inline-block px-2 py-1 text-xs font-medium rounded transition-all duration-200"
              style={{ 
                backgroundColor: '#fff8f0', 
                color: '#1e1e24',
                border: `1px solid #1e1e24`
              }}
            >
              {language}
            </span>
          )}
        </div>
        
        {/* Title - always visible */}
        <h2 className="text-lg sm:text-xl font-playfair font-bold mb-2 text-white line-clamp-2">
          {title}
        </h2>
        
        {/* Excerpt - always visible */}
        <p className="text-gray-200 text-xs sm:text-sm overflow-hidden text-ellipsis line-clamp-3">
          {excerpt || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
        </p>
      </div>
    </CardWrapper>
  );
} 