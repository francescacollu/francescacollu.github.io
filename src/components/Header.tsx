import React from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  firstName?: string;
  lastName?: string;
}

export default function Header({ 
  firstName = "FRANCESCA",
  lastName = "COLLU"
}: HeaderProps) {
  return (
    <header className="w-full text-center py-6">
      <div className="w-full max-w-3xl mx-auto">
        <Link to="/articles" className="no-underline">
          <h1 className="global_header_website">
            <span className="header_firstname">{firstName}</span>
            <span className="header_lastname"> {lastName}</span>
          </h1>
        </Link>
      </div>
    </header>
  );
} 