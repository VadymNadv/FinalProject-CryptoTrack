// src/components/common/Header.tsx
import { Link } from 'react-router-dom';
import { AreaChart, Sun, Moon, Globe } from 'lucide-react';
import { useThemeStore } from '@/store/useThemeStore';
import { useTranslation } from 'react-i18next';

const Header = () => {
    const { theme, toggleTheme } = useThemeStore();
    const { t, i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'uk' ? 'en' : 'uk';
        i18n.changeLanguage(newLang);
    };

    return (
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">

                <Link to="/" className="flex items-center gap-2 text-2xl font-extrabold tracking-tight">
                    <AreaChart className="h-7 w-7 text-primary-accent" />
                    <span className="text-gray-900 dark:text-white">
                        Crypto<span className="text-primary-accent">Track</span>
                    </span>
                </Link>

                <div className="flex items-center gap-8">
                    <nav className="flex items-center gap-4">
                        <Link to="/portfolio" className=" text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white font-medium transition-colors">
                            {t('portfolio_link')}
                        </Link>

                        <Link
                            to="/faq"
                            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white font-medium transition-colors"
                        >
                            {t('faq_link')}
                        </Link>
                    </nav>

                    <button
                        onClick={toggleLanguage}
                        title={t('lang_toggle')}
                        className="p-2 rounded-full transition-colors
                                   text-gray-600 hover:bg-gray-100
                                   dark:text-gray-400 dark:hover:bg-gray-700"
                    >
                        <Globe size={20} />
                    </button>

                    <button
                        onClick={toggleTheme}
                        title={theme === 'dark' ? t('theme_light') : t('theme_dark')}
                        className="p-2 rounded-full transition-colors
                                    text-gray-600 hover:bg-gray-100     /* Стилі для світлої (за замовчуванням) */
                                    dark:text-gray-400 dark:hover:bg-gray-700"
                    >
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;