import { Link, useLocation } from 'react-router-dom';

interface NavLinkProps {
  to: string;
  label: string;
  isActive: boolean;
}

function NavLink({ to, label, isActive }: NavLinkProps) {
  return (
    <Link 
      to={to} 
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
  
  const navLinks = [
    { to: '/articles', label: 'Articles' },
    { to: '/about', label: 'About' }
  ];
  
  return (
    <nav className="w-full text-center py-4 mb-12">
      <div className="flex justify-center w-full max-w-md mx-auto">
        {navLinks.map(link => (
          <NavLink 
            key={link.to}
            to={link.to}
            label={link.label}
            isActive={location.pathname === link.to}
          />
        ))}
      </div>
    </nav>
  );
} 