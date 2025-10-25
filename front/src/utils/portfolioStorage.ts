import type {PortfolioItem} from "@/types/portfolio.ts";


const STORAGE_KEY = 'crypto_portfolio';

// Функція для отримання портфоліо з localStorage
export const getPortfolio = (): PortfolioItem[] => {
    try {
        const rawData = localStorage.getItem(STORAGE_KEY);
        return rawData ? JSON.parse(rawData) : [];
    } catch (error) {
        console.error("Error reading portfolio from localStorage:", error);
        return [];
    }
};

// Функція для збереження портфоліо в localStorage
export const savePortfolio = (portfolio: PortfolioItem[]): void => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolio));
    } catch (error) {
        console.error("Error saving portfolio to localStorage:", error);
    }
};

// Функція для додавання монети
export const addCoinToPortfolio = (coin: Omit<PortfolioItem, 'note'>): void => {
    const portfolio = getPortfolio();
    // Перевіряємо, чи монета вже є
    if (!portfolio.some(item => item.id === coin.id)) {
        const newItem: PortfolioItem = { ...coin, note: '' };
        savePortfolio([newItem, ...portfolio]);
    }
};

// Функція для видалення монети
export const removeCoinFromPortfolio = (coinId: string): void => {
    const portfolio = getPortfolio();
    const updatedPortfolio = portfolio.filter(item => item.id !== coinId);
    savePortfolio(updatedPortfolio);
};

// Функція для оновлення нотатки
export const updateNoteForCoin = (coinId: string, note: string): void => {
    const portfolio = getPortfolio();
    const updatedPortfolio = portfolio.map(item =>
        item.id === coinId ? { ...item, note: note } : item
    );
    savePortfolio(updatedPortfolio);
};