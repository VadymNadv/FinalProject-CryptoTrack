// src/components/common/Footer.tsx

import React from 'react';
import { Github, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-surface border-t border-border mt-12 py-6">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center text-sm">
                <p className="text-text-secondary mb-4 sm:mb-0">
                    &copy; {currentYear} CryptoTrack. Всі права захищено.
                </p>
                <div className="flex space-x-4">
                    <a
                        href="https://github.com/VadymNadv"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-secondary hover:text-primary-accent transition-colors"
                        aria-label="GitHub Профіль VadymNadv"
                    >
                        <Github size={20} />
                    </a>
                    <a
                        href="#"
                        onClick={(e) => e.preventDefault()} // Заглушка
                        className="text-text-secondary hover:text-primary-accent transition-colors"
                        aria-label="LinkedIn (заглушка)"
                    >
                        <Linkedin size={20} />
                    </a>
                    <a
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        className="text-text-secondary hover:text-primary-accent transition-colors"
                    >
                        Політика
                    </a>
                    <a
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        className="text-text-secondary hover:text-primary-accent transition-colors"
                    >
                        Умови
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;