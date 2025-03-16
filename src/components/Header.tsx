import { Link } from 'react-router-dom';

interface HeaderProps {
  title?: string;
}

export default function Header({ title = "FRANCESCA COLLU" }: HeaderProps) {
  return (
    <header className="w-full text-center py-6">
      <div className="w-full max-w-3xl mx-auto">
        <Link to="/articles" className="no-underline">
          <h1 className="font-montserrat text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-black inline-block relative">
            <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-transparent bg-clip-text transform hover:scale-105 transition-transform duration-300 uppercase tracking-wider">{title}</span>
          </h1>
        </Link>
      </div>
    </header>
  );
} 