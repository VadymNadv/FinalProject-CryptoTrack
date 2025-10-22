
import { create } from 'zustand';

type ThemeState = 'dark' | 'light';

interface ThemeStore {
    theme: ThemeState;
    toggleTheme: () => void;
}
const getInitialTheme = (): ThemeState => {
    if (typeof window !== 'undefined') {
        const storedTheme = localStorage.getItem('theme') as ThemeState;
        if (storedTheme) {
            return storedTheme;
        }

        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }
    return 'dark';
};

export const useThemeStore = create<ThemeStore>((set) => ({
    theme: getInitialTheme(),
    toggleTheme: () =>
        set((state) => {
            const newTheme = state.theme === 'dark' ? 'light' : 'dark';
            localStorage.setItem('theme', newTheme);
            return { theme: newTheme };
        }),
}));