import React from 'react';
import { FaLinkedin, FaGithub, FaFileDownload } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="w-full py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col items-center">
          {/* Social Icons */}
          <div className="flex justify-center gap-8 mb-4">
            <a 
              href="https://www.linkedin.com/in/francesca-collu-866610109/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-[#2A9D8F] transition-colors duration-300"
              title="LinkedIn Profile"
            >
              <FaLinkedin className="text-3xl" />
            </a>
            
            <a 
              href="https://github.com/francescacollu" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-orange-500 transition-colors duration-300"
              title="GitHub Profile"
            >
              <FaGithub className="text-3xl" />
            </a>
            
            <a 
              href="/resume.pdf" 
              download
              className="text-gray-600 hover:text-[#2A9D8F] transition-colors duration-300"
              title="Download Resume"
            >
              <FaFileDownload className="text-3xl" />
            </a>
          </div>
          
          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} Francesca Collu. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
} 