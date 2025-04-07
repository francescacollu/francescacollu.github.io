import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import { getArticleBySlug } from '../lib/articleData';

export default function ArticleDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;
  
  if (!article) {
    return <Navigate to="/articles" />;
  }
  
  if (article.content) {
    return <article.content />;
  }

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Image Section */}
          <div className="order-2 lg:order-1">
            <div className="rounded-lg overflow-hidden aspect-[16/9] lg:aspect-[4/3]">
              <img 
                src={article.image} 
                alt={article.title} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Content Section */}
          <div className="order-1 lg:order-2">
            <div className="mb-6 lg:mb-8">
              <span className="text-sm text-gray-500 mb-2 block">{article.category}</span>
              <h1 className="font-playfair text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4">{article.title}</h1>
            </div>
            
            <div className="prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl max-w-none">
              {(
                <>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  
                  <p>
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                  
                  <h2 className="font-playfair text-xl sm:text-2xl font-bold mt-6 sm:mt-8 mb-3 sm:mb-4">Key Findings</h2>
                  
                  <p>
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, 
                    totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                  </p>
                  
                  <p>
                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores 
                    eos qui ratione voluptatem sequi nesciunt.
                  </p>
                </>
              )}
              
              {article.url && (
                <div className="mt-8 sm:mt-10 pt-4 sm:pt-6 border-t border-gray-200">
                  <a 
                    href={article.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-300"
                  >
                    Read Original Article
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
} 