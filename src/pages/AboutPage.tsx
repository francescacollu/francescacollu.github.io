import React from 'react';
import PageLayout from '../components/PageLayout';

export default function AboutPage() {
  return (
    <PageLayout>
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 mb-10">
          {/* Profile Image */}
          <div className="w-full md:w-1/3 flex justify-center">
            <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-purple-200 shadow-lg">
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
          
          {/* Bio Section */}
          <div className="w-full md:w-2/3">
            <div className="font-montserrat text-gray-800 space-y-4">
              <p className="leading-relaxed">
                Hi! I'm <span className="font-medium text-purple-800">Francesca Collu</span>, a data analyst with a strong interest in data journalism. With experience in software development, marketing analytics, 
                and investigative data storytelling, I love uncovering stories hidden in data. My work explores political trends, gender representation, and social issues, 
                using data to reveal patterns and spark conversations.
              </p>

              <p className="leading-relaxed">  
                I'm currently building my portfolio in data journalism, combining my analytical skills with storytelling to make complex information accessible and engaging. 
                Whether it's analyzing voting behavior, mapping social dynamics, or applying machine learning to narratives, I'm always looking for ways to turn data into 
                meaningful insights. 
              </p>  

              <p className="leading-relaxed">
                If you're looking for a data-driven perspective on current issues or need help making sense of complex information, I'd love to collaborate on projects that bring data to life through compelling narratives.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
} 