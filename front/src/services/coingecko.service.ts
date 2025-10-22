import { coingeckoApi } from "./api/interceptors.ts";


export interface CoinMarket {
    id: string;
    symbol: string;
    name: string;
    image: string;
    current_price: number;
    market_cap: number;
    market_cap_rank: number;
    total_volume: number;
    price_change_percentage_1h_in_currency?: number;
    price_change_percentage_24h_in_currency?: number;
    price_change_percentage_7d_in_currency?: number;
    sparkline_in_7d: {
        price: number[];
    };
}

interface ListParams {
    vs_currency: string;
    order: string;
    per_page: number;
    page: number;
}

export const getCryptoList = async (params: ListParams): Promise<CoinMarket[]> => {
    const response = await coingeckoApi.get('/coins/markets', {
        params: {
            ...params,
            sparkline: true, //  дані для міні-графіків
            price_change_percentage: '1h,24h,7d', // Запитуємо   за різні періоди
        },
    });
    return response.data;
};

export const getCoinDetails = async (coinId: string) => {
    const response = await coingeckoApi.get(`/coins/${coinId}`);
    return response.data;
};

export const getHistoricalData = async (coinId: string, days: number): Promise<number[][]> => {
    const response = await coingeckoApi.get(`/coins/${coinId}/market_chart`, {
        params: { vs_currency: 'usd', days: days },
    });
    return response.data.prices;
};

export interface GlobalMarketData {
    data: {
        total_market_cap: { [currency: string]: number };
        total_volume: { [currency: string]: number };
        market_cap_percentage: { [currency: string]: number };
    };
}

// Функція для отримання глобальних даних
export const getGlobalMarketData = async (): Promise<GlobalMarketData> => {
    const response = await coingeckoApi.get('/global');
    return response.data;
};

export interface TrendingCoinItem {
    item: {
        id: string;
        coin_id: number;
        name: string;
        symbol: string;
        market_cap_rank: number;
        thumb: string; // Маленьке зображення
        small: string; // Трохи більше зображення
        large: string; // Велике зображення
        score: number;
    };
}

// Інтерфейс для відповіді API
interface TrendingResponse {
    coins: TrendingCoinItem[];
    exchanges: any[]; // Ми біржі ігноруємо
}

// Функція для отримання трендових монет
export const getTrendingCoins = async (): Promise<TrendingResponse> => {
    const response = await coingeckoApi.get('/search/trending');
    return response.data;
};