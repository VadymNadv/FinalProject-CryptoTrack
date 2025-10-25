// src/screens/crypto/CryptoPage.tsx

import { useState, useEffect, useCallback } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useCoinDetailsQuery } from "@/hooks/useCryptoQueries.ts";
import Header from "../../components/common/Header.tsx";
import LoadingSpinner from "../../components/loadingSpiner/LoadingSpinner.tsx";
import CryptoChart from "../../components/crypto/CryptoChart.tsx";
import CommentForm from "./components/CommentForm.tsx";
import CommentList from "./components/CommentList.tsx";
import { useTranslation } from 'react-i18next';
import DetailRow from "@/screens/crypto/components/DetailRow.tsx";
import type {CommentType} from "@/types/comments.ts";



// Для великих  сум
const formatMarketValue = (value: number | undefined | null): string => {
    if (typeof value !== 'number') return 'N/A';
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
};

// Для звичайних цін
const formatSimpleCurrency = (value: number | undefined | null): string => {
    if (typeof value !== 'number') return 'N/A';
    const maximumFractionDigits = value < 1 ? 6 : 2;
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: maximumFractionDigits, minimumFractionDigits: 2 });
};

// Для великих чисел (пропозиція монет) - з комами, або '∞'/'N/A'
const formatLargeNumber = (value: number | undefined | null): string => {
    if (typeof value !== 'number') return '∞'; // Позначення для нескінченної або невідомої макс. пропозиції
    return value.toLocaleString('en-US', { maximumFractionDigits: 0 });
};




export default function CryptoPage() {
    const { t } = useTranslation();
    const { id } = useParams<{ id: string }>();

    const { data: coin, isLoading, isError, error } = useCoinDetailsQuery(id || '');

    const [comments, setComments] = useState<CommentType[]>([]);


    const loadComments = useCallback(() => {
        if (!id) return;
        try {
            const storageKey = `comments_${id}`;
            const existingCommentsRaw = localStorage.getItem(storageKey);
            const existingComments: CommentType[] = existingCommentsRaw ? JSON.parse(existingCommentsRaw) : [];
            setComments(existingComments);
        } catch (error) {
            console.error("Помилка завантаження коментарів з localStorage:", error);
            setComments([]);
        }
    }, [id]);


    useEffect(() => {
        loadComments();
    }, [loadComments]);

    if (!id) return <Navigate to="/404" />;

    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col bg-background">
                <Header />
                <div className="flex flex-grow items-center justify-center"><LoadingSpinner /></div>
            </div>
        );
    }

    if (isError || !coin) {
        return (
            <div className="min-h-screen flex flex-col bg-background">
                <Header />
                <div className="p-10 text-center text-red-500 text-2xl mt-10">
                    {t('loading_coin_error')} {id}: {error?.message || t('coin_not_found')}
                </div>
            </div>
        );
    }


    const marketData = coin.market_data;
    const isPositiveChange = marketData.price_change_percentage_24h > 0;
    const priceColor = isPositiveChange ? 'text-success-green' : 'text-danger-red';

    return (
        <div className="min-h-screen font-sans bg-background text-text">
            <Header />
            <main className="container mx-auto p-4 md:p-8">


                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 mb-8 border-b border-border gap-4 sm:gap-0">
                    <div className="flex items-center space-x-3">
                        <img src={coin.image.large} alt={coin.name} className="w-10 h-10 sm:w-8 sm:h-8 rounded-full" />
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-text">{coin.name}</h1>
                        <span className="text-lg sm:text-xl uppercase px-3 py-1 rounded-lg bg-surface-secondary text-text-secondary">
                            {coin.symbol}
                        </span>
                    </div>
                    <div className="text-left sm:text-right w-full sm:w-auto">
                        <p className="text-3xl sm:text-4xl font-bold">{formatSimpleCurrency(marketData.current_price.usd)}</p>
                        <p className={`text-base sm:text-lg font-semibold ${priceColor}`}>
                            {marketData.price_change_percentage_24h.toFixed(2)}% (24h)
                        </p>
                    </div>
                </div>


                <CryptoChart coinId={id!} />


                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">

                    <div className="lg:col-span-2 p-6 rounded-lg shadow-xl bg-surface border border-border space-y-3">
                        <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-border">
                            {t('market_data')}
                        </h2>
                        <DetailRow label={t('market_cap_full')} value={formatMarketValue(marketData.market_cap.usd)} />
                        <DetailRow label={t('volume_24h_full')} value={formatMarketValue(marketData.total_volume.usd)} />
                        <DetailRow label={t('fdv')} value={formatMarketValue(marketData.fully_diluted_valuation?.usd)} />
                        <DetailRow label={t('circulating_supply')} value={`${formatLargeNumber(marketData.circulating_supply)} ${coin.symbol.toUpperCase()}`} />
                        <DetailRow label={t('total_supply')} value={`${formatLargeNumber(marketData.total_supply)} ${coin.symbol.toUpperCase()}`} />
                        <DetailRow label={t('max_supply')} value={`${formatLargeNumber(marketData.max_supply)} ${coin.symbol.toUpperCase()}`} />
                        <DetailRow label={t('24h_high')} value={formatSimpleCurrency(marketData.high_24h?.usd)} />
                        <DetailRow label={t('24h_low')} value={formatSimpleCurrency(marketData.low_24h?.usd)} />
                    </div>


                    <CommentForm coinId={id!} onCommentAdded={loadComments} />
                </div>


                <div className="mt-12 p-6 rounded-lg shadow-xl bg-surface border border-border">
                    <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-border">
                        {t('comment', { count: comments.length || 0 })}
                    </h2>
                    <CommentList comments={comments} />
                </div>


                <div className="mt-12 p-6 rounded-lg shadow-xl bg-surface border border-border">
                    <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-border">
                        {t('description')}
                    </h2>
                    <div
                        className="leading-relaxed max-h-96 overflow-y-auto text-text-secondary"
                        dangerouslySetInnerHTML={{ __html: coin.description?.en || t('description_missing') }}
                    />
                </div>

            </main>
        </div>
    );
}

