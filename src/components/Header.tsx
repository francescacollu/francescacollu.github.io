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
          <h1 className="font-montserrat text-3xl md:text-4xl lg:text-5xl font-black tracking-tight inline-block relative">
            <span className="text-black transform hover:scale-105 transition-transform duration-300 uppercase tracking-wider">{firstName}</span>
            <span className="text-black transform hover:scale-105 transition-transform duration-300 uppercase tracking-wider"> {lastName}</span>
          </h1>
        </Link>
      </div>
    </header>
  );
} 