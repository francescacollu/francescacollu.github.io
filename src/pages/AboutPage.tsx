import React from 'react';
import PageLayout from '../components/PageLayout';

export default function AboutPage() {
  return (
    <PageLayout>
      <div className="max-w-2xl mx-auto">
        <div className="prose prose-lg">
          <h1 className="font-playfair text-3xl font-bold mb-6">About Me</h1>
          
          <p>
            I am a data journalist specializing in telling stories through data visualization
            and analysis. With a background in both journalism and data science, I work to
            uncover meaningful insights from complex datasets and present them in accessible,
            engaging ways.
          </p>
          
          <p>
            My work focuses on environmental issues, political analysis, and social justice,
            using data-driven approaches to illuminate important stories that might otherwise
            remain hidden in the numbers.
          </p>
          
          <h2 className="font-playfair text-2xl font-bold mt-8 mb-4">Experience</h2>
          
          <p>
            [You can add your professional experience here]
          </p>
          
          <h2 className="font-playfair text-2xl font-bold mt-8 mb-4">Education</h2>
          
          <p>
            [You can add your educational background here]
          </p>
          
          <h2 className="font-playfair text-2xl font-bold mt-8 mb-4">Contact</h2>
          
          <p>
            Feel free to reach out to me at [your email] or connect with me on 
            [social media platforms].
          </p>
        </div>
      </div>
    </PageLayout>
  );
} 