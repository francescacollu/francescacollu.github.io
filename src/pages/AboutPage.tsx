import React from 'react';
import PageLayout from '../components/PageLayout';
import aboutContent from '../content/about.json';

export default function AboutPage() {
  return (
    <PageLayout>
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 mb-10">
          {/* Profile Image */}
          <div className="w-full md:w-1/3 flex justify-center">
            <div className="relative w-64 h-64 p-1 rounded-full shadow-lg bg-gray-200">
              <div className="absolute inset-0 rounded-full bg-gray-300/20 opacity-40 blur-md"></div>
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-gray-300">
                <img 
                  src="/images/profile.jpg" 
                  alt="Francesca Collu" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://via.placeholder.com/400x400?text=Profile+Photo";
                  }}
                />
              </div>
            </div>
          </div>
          
          {/* Bio Section */}
          <div className="w-full md:w-2/3">
            <div className="space-y-4">
              {aboutContent.paragraphs.map((text, index) => (
                <p
                  key={index}
                  className="font-playfair text-base text-gray-700 leading-relaxed"
                >
                  {text}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
} 