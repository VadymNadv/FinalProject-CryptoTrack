// src/components/common/ThemeManager.tsx
import { useEffect } from 'react';
import { useThemeStore } from '@/store/useThemeStore';

const ThemeManager = () => {
    const { theme } = useThemeStore();

    useEffect(() => {
        const root = document.documentElement;

        if (theme === 'light') {
            root.classList.add('light');
            root.classList.remove('dark');
        } else {
            root.classList.add('dark');
            root.classList.remove('light');
        }
    }, [theme]);

    return null;
};

export default ThemeManager;