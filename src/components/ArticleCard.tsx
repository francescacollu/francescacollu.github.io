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
      {/* Image */}
      <div className="absolute inset-0 bg-gray-100">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full transition-all duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
        />
      </div>
      
      {/* Text overlay that appears on hover */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 sm:p-6 flex flex-col justify-end">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-2">
          <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-800 text-white rounded">
            {category}
          </span>
          {platform && (
            <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-700 text-white rounded">
              {platform}
            </span>
          )}
          {language && (
            <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-600 text-white rounded">
              {language}
            </span>
          )}
        </div>
        
        {/* Title */}
        <h2 className="text-lg sm:text-xl font-playfair font-bold mb-2 text-white line-clamp-2">
          {title}
        </h2>
        
        {/* Excerpt */}
        <p className="text-gray-200 text-xs sm:text-sm overflow-hidden text-ellipsis line-clamp-3">
          {excerpt || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
        </p>
      </div>
    </CardWrapper>
  );
} 