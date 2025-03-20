import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

interface NavLinkProps {
  to: string;
  label: string;
  isActive: boolean;
  onClick?: () => void;
}

function NavLink({ to, label, isActive, onClick }: NavLinkProps) {
  return (
    <Link 
      to={to} 
      onClick={onClick}
      className={`
        font-playfair text-lg uppercase tracking-widest px-2 py-1 mx-6
        transition-all duration-200 hover:text-teal-600 no-underline text-gray-800
        ${isActive ? 'border-b-2 border-orange-500 font-semibold text-orange-600' : ''}
      `}
    >
      {label}
    </Link>
  );
}

export default function Navigation() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navLinks = [
    { to: '/articles', label: 'Articles' },
    { to: '/about', label: 'About' }
  ];
  
  return (
    <nav className="w-full text-center py-4 mb-12">
      {/* Mobile menu button */}
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden fixed top-4 right-4 z-50 text-gray-600 hover:text-teal-600"
      >
        {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Navigation links */}
      <div className={`
        fixed md:relative inset-0 md:inset-auto bg-white md:bg-transparent
        transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
        transition-transform duration-300 ease-in-out z-40
      `}>
        <div className="flex flex-col md:flex-row justify-center items-center h-full md:h-auto w-full max-w-md mx-auto">
          {navLinks.map(link => (
            <NavLink 
              key={link.to}
              to={link.to}
              label={link.label}
              isActive={location.pathname === link.to}
              onClick={() => setIsMenuOpen(false)}
            />
          ))}
        </div>
      </div>
    </nav>
  );
} 