// src/components/common/Header.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AreaChart, Sun, Moon, Globe, Menu, X } from 'lucide-react';
import { useThemeStore } from '@/store/useThemeStore';
import { useTranslation } from 'react-i18next';

const Header = () => {
    const { theme, toggleTheme } = useThemeStore();
    const { t, i18n } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleLanguage = () => {
        const newLang = i18n.language === 'uk' ? 'en' : 'uk';
        i18n.changeLanguage(newLang);
        setIsMenuOpen(false);
    };

    const handleToggleTheme = () => {
        toggleTheme();
    };

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <header className="relative bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">

                <Link
                    to="/"
                    className="flex items-center gap-2 text-2xl font-extrabold tracking-tight"
                    onClick={closeMenu}
                >
                    <AreaChart className="h-7 w-7 text-primary-accent" />
                    <span className="text-gray-900 dark:text-white">
                        Crypto<span className="text-primary-accent">Track</span>
                    </span>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    <nav className="flex items-center gap-4">
                        <Link to="/portfolio" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white font-medium transition-colors">
                            {t('portfolio_link')}
                        </Link>
                        <Link to="/faq" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white font-medium transition-colors">
                            {t('faq_link')}
                        </Link>
                    </nav>
                    <button onClick={toggleLanguage} title={t('lang_toggle')} className="p-2 rounded-full transition-colors text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700">
                        <Globe size={20} />
                    </button>
                    <button onClick={handleToggleTheme} title={theme === 'dark' ? t('theme_light') : t('theme_dark')} className="p-2 rounded-full transition-colors text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700">
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </div>

                <div className="md:hidden">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-accent text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                        aria-label="Toggle menu"
                        aria-expanded={isMenuOpen}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

            </div>

            {isMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 right-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-lg py-2">
                    <nav className="flex flex-col px-4 space-y-1 pb-3 mb-3 border-b border-gray-200 dark:border-gray-700">
                        <Link to="/portfolio" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white" onClick={closeMenu}>
                            {t('portfolio_link')}
                        </Link>
                        <Link to="/faq" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white" onClick={closeMenu}>
                            {t('faq_link')}
                        </Link>
                    </nav>
                    <div className="flex justify-between items-center px-4 pt-1">
                        <button onClick={toggleLanguage} title={t('lang_toggle')} className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-1/2 justify-center">
                            <Globe size={20} /> <span>{i18n.language === 'uk' ? 'English' : 'Українська'}</span>
                        </button>
                        <button onClick={handleToggleTheme} title={theme === 'dark' ? t('theme_light') : t('theme_dark')} className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-1/2 justify-center">
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />} <span>{theme === 'dark' ? 'Світла' : 'Темна'}</span>
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;