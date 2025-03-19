import React from 'react';
import Header from './Header';
import Navigation from './Navigation';
import Footer from './Footer';

interface PageLayoutProps {
  children: React.ReactNode;
  firstName?: string;
  lastName?: string;
}

export default function PageLayout({ children, firstName, lastName }: PageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col items-center">
      <Header firstName={firstName} lastName={lastName} />
      <Navigation />
      <main className="w-full max-w-6xl mx-auto px-4 flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
} 