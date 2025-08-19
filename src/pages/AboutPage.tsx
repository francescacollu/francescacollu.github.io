import React from 'react';
import PageLayout from '../components/PageLayout';

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
              <p className="font-playfair text-base text-gray-700 leading-relaxed">
                I'm a data scientist with a strong interest in human stories, currently aspiring to become a data journalist. With experience in software development and marketing analytics, I love uncovering stories hidden in data. My work explores political trends, gender representation, and social issues, using data to reveal patterns.
              </p>

              <p className="font-playfair text-base text-gray-700 leading-relaxed">
                Whether it's analyzing voting behavior, mapping social dynamics, or applying machine learning to narratives, I'm always looking for ways to turn data into meaningful insights. 
              </p>

              <p className="font-playfair text-base text-gray-700 leading-relaxed">
                If you're looking for a data-driven perspective on current issues or need help making sense of complex information, I'd love to collaborate on projects that bring data to life through human stories and compelling storytelling.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
} 