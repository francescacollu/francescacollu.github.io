import React from 'react';

export default function SampleArticle() {
  return (
    <div>
      <p>
        This is a sample article hosted directly on the website. It demonstrates how custom article components
        can be rendered within the article detail page.
      </p>
      
      <h2 className="font-playfair text-xl sm:text-2xl font-bold mt-6 sm:mt-8 mb-3 sm:mb-4">
        Introduction
      </h2>
      
      <p>
        This implementation allows you to create rich, interactive articles with custom React components.
        You can include charts, interactive elements, and custom styling specific to each article.
      </p>
      
      <h2 className="font-playfair text-xl sm:text-2xl font-bold mt-6 sm:mt-8 mb-3 sm:mb-4">
        Key Features
      </h2>
      
      <ul className="list-disc pl-6 mb-4">
        <li>Custom React components for each article</li>
        <li>Full control over layout and styling</li>
        <li>Ability to include interactive elements</li>
        <li>Seamless integration with the existing article system</li>
      </ul>
    </div>
  );
} 