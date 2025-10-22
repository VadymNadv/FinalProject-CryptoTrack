// src/screens/portfolio/PortfolioPage.tsx

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Header from '@/components/common/Header';
import LoadingSpinner from '@/components/loadingSpiner/LoadingSpinner';
import { useCryptoListQuery } from '@/hooks/useCryptoQueries';
import { getPortfolio, removeCoinFromPortfolio, updateNoteForCoin, type PortfolioItem } from '@/utils/portfolioStorage';
import { useTranslation } from 'react-i18next';
import { Trash2 } from 'lucide-react';
import type {CoinMarket} from '@/services/coingecko.service';
import SparklineChart from '@/components/crypto/SparklineChart';
import { useNavigate } from 'react-router-dom';
import AnimatedBackground from "@/components/common/AnimatedBackground.tsx";

const formatCurrency = (value: number | undefined | null): string => {
    if (typeof value !== 'number') return 'N/A';
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: value < 1 ? 6 : 2, minimumFractionDigits: 2 });
};

const formatPercentage = (value?: number | undefined | null): React.ReactNode => {
    if (typeof value !== 'number') return <span className="text-text-secondary">N/A</span>;
    const isPositive = value > 0;
    const colorClass = isPositive ? 'text-success-green' : 'text-danger-red';
    const arrow = isPositive ? '▲' : '▼';
    return (
        <span className={`${colorClass} font-semibold whitespace-nowrap text-xs sm:text-sm`}>
            {arrow} {value.toFixed(1)}%
        </span>
    );
};


interface PortfolioCardProps {
    item: PortfolioItem;
    liveData?: Pick<CoinMarket, 'current_price' | 'price_change_percentage_24h_in_currency' | 'sparkline_in_7d'>;
    onRemove: (id: string, name: string) => void;
    onNoteChange: (id: string, note: string) => void;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({ item, liveData, onRemove, onNoteChange }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [note, setNote] = useState(item.note || '');
    const [showSavedMsg, setShowSavedMsg] = useState(false);

    const handleSaveNote = (e: React.MouseEvent) => {
        e.stopPropagation();
        onNoteChange(item.id, note);
        setShowSavedMsg(true);
        setTimeout(() => setShowSavedMsg(false), 2000);
    };

    const handleRemoveClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (window.confirm(t('confirm_remove', { coinName: item.name }))) {
            onRemove(item.id, item.name);
        }
    };

    const handleCardClick = () => {
        navigate(`/coin/${item.id}`);
    };

    const sparklinePrices = liveData?.sparkline_in_7d?.price;

    return (
        <div
            className="bg-surface border border-border rounded-lg shadow-md p-4 flex flex-col h-full cursor-pointer hover:border-primary-accent/50 transition-colors"
            onClick={handleCardClick}
        >
            <div className="flex-grow flex flex-col">
                <div className="flex items-start justify-between mb-3 gap-2">
                    <div className="flex items-center space-x-2 overflow-hidden mr-1 flex-shrink min-w-0">
                        <img src={item.image} alt={item.name} className="w-8 h-8 rounded-full flex-shrink-0" />
                        <div className="overflow-hidden">
                            <p className="font-bold text-text truncate">{item.name}</p>
                            <p className="text-xs text-text-secondary">{item.symbol.toUpperCase()}</p>
                        </div>
                    </div>
                    <div className="text-right flex-shrink-0 w-[110px]">
                        {liveData ? (
                            <>
                                <p className="font-semibold text-text text-sm">{formatCurrency(liveData.current_price)}</p>
                                <div className="text-xs mb-1">{formatPercentage(liveData.price_change_percentage_24h_in_currency)}</div>
                                {sparklinePrices && sparklinePrices.length > 0 ? (
                                    <div className="h-8 w-full">
                                        <SparklineChart data={sparklinePrices} />
                                    </div>
                                ) : (
                                    <div className="h-8 w-full flex items-center justify-end">
                                        <span className="text-xs text-text-secondary">N/A</span>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="flex justify-end pt-2"><LoadingSpinner /></div>
                        )}
                    </div>
                </div>

                {item.note && (
                    <div className="mb-2 mt-1 border-t border-border pt-2">
                        <p className="text-xs text-text-secondary italic px-1 break-words">{item.note}</p>
                    </div>
                )}
            </div>

            <div className="mt-auto">
                <div className="pt-2">
                    <label htmlFor={`note-${item.id}`} className="block text-xs font-medium text-text-secondary mb-1">
                        {t('notes')}
                    </label>
                    <textarea
                        id={`note-${item.id}`}
                        rows={2}
                        value={note}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Додайте нотатку..."
                        className="w-full p-2 text-sm rounded-md bg-surface-secondary text-text border border-border focus:outline-none focus:ring-1 focus:ring-primary-accent resize-none"
                    />
                </div>
                <div className="mt-3 flex justify-between items-center">
                    <button
                        onClick={handleSaveNote}
                        className="text-xs bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-3 rounded transition-colors disabled:opacity-50"
                        disabled={note === (item.note || '')}
                    >
                        {t('save_note')}
                    </button>
                    {showSavedMsg && <span className="text-xs text-success-green ml-2">{t('note_updated')}!</span>}
                    <button
                        onClick={handleRemoveClick}
                        className="text-text-secondary hover:text-danger-red p-1 rounded-full transition-colors ml-auto"
                        aria-label={t('remove_coin')}
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

const PortfolioPage: React.FC = () => {
    const { t } = useTranslation();
    const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
    const { data: cryptoListData, isLoading: isLoadingList, isError, error } = useCryptoListQuery();

    const loadPortfolio = useCallback(() => {
        setPortfolioItems(getPortfolio());
    }, []);

    useEffect(() => {
        loadPortfolio();
    }, [loadPortfolio]);

    const portfolioWithLiveData = useMemo(() => {
        if (!cryptoListData || portfolioItems.length === 0) return [];
        const listDataMap = new Map<string, CoinMarket>(cryptoListData.map(coin => [coin.id, coin]));
        return portfolioItems
            .map(item => {
                const live = listDataMap.get(item.id);
                return {
                    ...item,
                    liveData: live ? {
                        current_price: live.current_price,
                        price_change_percentage_24h_in_currency: live.price_change_percentage_24h_in_currency,
                        sparkline_in_7d: live.sparkline_in_7d
                    } : undefined
                };
            })
            .filter(item => item.liveData);

    }, [portfolioItems, cryptoListData]);

    const handleRemove = (id: string) => {
        removeCoinFromPortfolio(id);
        loadPortfolio();
    };

    const handleNoteUpdate = (id: string, note: string) => {
        updateNoteForCoin(id, note);
        setPortfolioItems(prevItems =>
            prevItems.map(item => item.id === id ? { ...item, note } : item)
        );
    };


    return (
        <div className="min-h-screen font-sans bg-background text-text">
            <Header />
            <AnimatedBackground />
            <main className="container mx-auto p-4 md:p-8 relative z-10 flex-grow">
                <h1 className="text-3xl md:text-4xl font-extrabold text-center my-8 text-text">
                    {t('portfolio_title')}
                </h1>

                {isLoadingList && portfolioItems.length > 0 && (
                    <div className="flex justify-center items-center h-64"> <LoadingSpinner /> </div>
                )}

                {isError && (
                    <div className="text-center text-danger-red p-10 bg-surface rounded-xl border border-border shadow-md">
                        <p className="font-semibold">Помилка завантаження ринкових даних:</p>
                        <p className="text-sm">{error instanceof Error ? error.message : 'Unknown error'}</p>
                    </div>
                )}

                {!isLoadingList && portfolioItems.length === 0 && !isError && (
                    <div className="text-center text-text-secondary p-10 bg-surface rounded-xl border border-border shadow-md">
                        <p>{t('portfolio_empty')}</p>
                    </div>
                )}

                {!isLoadingList && portfolioWithLiveData.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {portfolioWithLiveData.map(mergedItem => (
                            <PortfolioCard
                                key={mergedItem.id}
                                item={mergedItem}
                                liveData={mergedItem.liveData as PortfolioCardProps['liveData']}
                                onRemove={handleRemove}
                                onNoteChange={handleNoteUpdate}
                            />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default PortfolioPage;