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
            <div className="header_subtitle">Data Stories by</div>
            <div className="header_name uppercase">{firstName} {lastName}</div>
          </h1>
        </Link>
      </div>
    </header>
  );
} 