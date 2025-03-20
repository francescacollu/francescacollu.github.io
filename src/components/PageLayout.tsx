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
    <div className="min-h-screen flex flex-col">
      <Header firstName={firstName} lastName={lastName} />
      <Navigation />
      <main className="w-full px-4 sm:px-6 lg:px-8 flex-grow">
        <div className="max-w-[1920px] mx-auto w-full">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
} 