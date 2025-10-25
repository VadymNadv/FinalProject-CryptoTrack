import { coingeckoApi } from "./api/interceptors.ts";
import type {CoinMarket, GlobalMarketData, TrendingResponse} from "@/types/crypto.ts";




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




export const getGlobalMarketData = async (): Promise<GlobalMarketData> => {
    const response = await coingeckoApi.get('/global');
    return response.data;
};


export const getTrendingCoins = async (): Promise<TrendingResponse> => {
    const response = await coingeckoApi.get('/search/trending');
    return response.data;
};