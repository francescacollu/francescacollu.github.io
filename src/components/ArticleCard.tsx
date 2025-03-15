import { Link } from 'react-router-dom';

export interface Article {
  id: number;
  title: string;
  category: string;
  image: string;
  slug: string;
  excerpt?: string;
}

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const { title, category, image, slug, excerpt } = article;
  
  return (
    <Link 
      to={`/articles/${slug}`}
      className="group flex flex-col h-full border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 no-underline text-inherit"
    >
      <div className="h-48 bg-gray-100 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      
      <div className="p-5 flex-grow flex flex-col">
        <span className="text-sm text-gray-500 mb-2">{category}</span>
        <h2 className="text-xl font-playfair font-bold mb-3 group-hover:text-gray-700 transition-colors duration-300">
          {title}
        </h2>
        <p className="text-gray-700 mt-auto">
          {excerpt || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
        </p>
      </div>
    </Link>
  );
} 