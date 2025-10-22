
import { useQuery } from '@tanstack/react-query';
import { useCryptoFilterStore } from "../store/useCryptoFilterStore.ts";
import {
    getCoinDetails,
    getCryptoList,
    getGlobalMarketData,
    getHistoricalData,
    getTrendingCoins
} from "../services/coingecko.service.ts";

export const useCryptoListQuery = () => {

    const { sort_by, page } = useCryptoFilterStore();


    const params = {
        vs_currency: 'usd',
        order: sort_by,
        per_page: 30,
        page: page,
    };

    return useQuery({

        queryKey: ['cryptoList', params],
        queryFn: () => getCryptoList(params),
        staleTime: 1000 * 60 * 1, // 1 хв
    });
};


export const useCoinDetailsQuery = (coinId: string) => {
    return useQuery({
        queryKey: ['coinDetails', coinId],
        queryFn: () => getCoinDetails(coinId),
        enabled: !!coinId,
        staleTime: 1000 * 60 * 10,
    });
};

export const useHistoricalDataQuery = (coinId: string, days: number = 7) => {
    return useQuery({
        queryKey: ['historicalData', coinId, days],
        queryFn: () => getHistoricalData(coinId, days),
        enabled: !!coinId && !!days,
        staleTime: 1000 * 60 * 30,
    });
};

export const useGlobalMarketDataQuery = () => {
    return useQuery({
        queryKey: ['globalMarketData'],
        queryFn: getGlobalMarketData,
        staleTime: 1000 * 60 * 5, // Кешуємо на 5 хвилин
    });
};

export const useTrendingCoinsQuery = () => {
    return useQuery({
        queryKey: ['trendingCoins'],
        queryFn: getTrendingCoins,
        staleTime: 1000 * 60 * 5, // Кешуємо на 5 хвилин, бо тренди змінюються
    });
};