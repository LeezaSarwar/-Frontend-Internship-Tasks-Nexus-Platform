import React from 'react';
import { Heart, Github, Linkedin, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Left side - Copyright */}
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-600">
              © {currentYear} Nexus Platform. All rights reserved.
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Investor & Entrepreneur Collaboration Platform
            </p>
          </div>

          {/* Center - Developer Credit */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Developed with</span>
            <Heart size={16} className="text-error-500 fill-current" />
            <span>by</span>
            <span className="font-semibold text-primary-600">Leeza Sarwar</span>
          </div>

          {/* Right side - Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/leezasarwar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com/in/leezasarwar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:leeza.sarwar@example.com"
              className="text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>

        {/* Bottom text */}
        <div className="mt-4 pt-4 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-500">
            Advanced Frontend Internship Project • React + TypeScript + Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};
