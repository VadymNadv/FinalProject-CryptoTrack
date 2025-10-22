// src/components/crypto/CryptoList.tsx

import React, { useState, useEffect } from 'react';
import { useCryptoListQuery } from "@/hooks/useCryptoQueries";
import { useCryptoFilterStore } from "@/store/useCryptoFilterStore";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "@/components/loadingSpiner/LoadingSpinner.tsx";
import SparklineChart from "./SparklineChart";
import { getPortfolio, addCoinToPortfolio, removeCoinFromPortfolio } from '@/utils/portfolioStorage';
import { Star } from 'lucide-react';
import type {CoinMarket} from '@/services/coingecko.service';

const formatCurrency = (value: number) => {
    return value.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: value < 1 ? 6 : 2,
    });
};

const formatMarketCap = (value: number | undefined | null) => {
    if (typeof value !== 'number') return 'N/A';
    if (value >= 1_000_000_000) {
        return '$' + (value / 1_000_000_000).toFixed(2) + 'B';
    } else if (value >= 1_000_000) {
        return '$' + (value / 1_000_000).toFixed(2) + 'M';
    } else {
        return '$' + value.toLocaleString();
    }
};

const formatPercentage = (value?: number) => {
    if (typeof value !== 'number') return 'N/A';
    const isPositive = value > 0;
    const colorClass = isPositive ? 'text-success-green' : 'text-danger-red';
    const arrow = isPositive ? '▲' : '▼';
    return (
        <span className={`${colorClass} font-semibold whitespace-nowrap text-xs sm:text-sm`}>
            {arrow} {value.toFixed(1)}%
        </span>
    );
};
// ---

const CryptoList = () => {
    const { data, isLoading, isError, error } = useCryptoListQuery();
    const { search } = useCryptoFilterStore();
    const navigate = useNavigate();
    const [portfolioIds, setPortfolioIds] = useState<Set<string>>(new Set());

    const refreshPortfolioIds = () => {
        const portfolio = getPortfolio();
        setPortfolioIds(new Set(portfolio.map(item => item.id)));
    };

    useEffect(() => {
        refreshPortfolioIds();
    }, []);

    const handleTogglePortfolio = (e: React.MouseEvent, coin: CoinMarket) => {
        e.stopPropagation();
        const isInPortfolio = portfolioIds.has(coin.id);
        if (isInPortfolio) {
            removeCoinFromPortfolio(coin.id);
        } else {
            // Додаємо тільки необхідні дані
            addCoinToPortfolio({
                id: coin.id,
                name: coin.name,
                symbol: coin.symbol,
                image: coin.image
                // Нотатка додається порожньою за замовчуванням
            });
        }
        refreshPortfolioIds();
    };


    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64 rounded-xl shadow-2xl bg-surface border border-border">
                <LoadingSpinner />
                <span className="ml-3 text-xl text-primary-accent">Завантаження ринкових даних...</span>
            </div>
        );
    }
    if (isError) {
        return <div className="text-center text-xl text-danger-red p-10 rounded-xl bg-surface border border-border">
            Помилка: {error instanceof Error ? error.message : 'Unknown error'}
        </div>;
    }


    const displayData = data?.filter(coin =>
        !search ||
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    ) ?? [];

    if (displayData.length === 0 && !isLoading) {
        return <div className="text-center text-xl p-10 rounded-xl text-text-secondary bg-surface border border-border">
            Нічого не знайдено.
        </div>;
    }


    return (
        <div className="rounded-xl shadow-2xl overflow-x-auto bg-surface border border-border">
            <table className="w-full text-left text-sm text-text">
                <thead className="text-xs uppercase text-text-secondary border-b border-border">
                <tr>
                    <th className="px-2 py-3 sm:px-4 w-10"></th>
                    <th className="px-2 py-3 sm:px-4">#</th>
                    <th className="px-2 py-3 sm:px-4">Coin</th>
                    <th className="px-1 py-3 sm:px-2"></th>
                    <th className="px-2 py-3 sm:px-4 text-right">Price</th>
                    <th className="px-2 py-3 sm:px-4 text-right hidden sm:table-cell">1h</th>
                    <th className="px-2 py-3 sm:px-4 text-right hidden sm:table-cell">24h</th>
                    <th className="px-2 py-3 sm:px-4 text-right hidden md:table-cell">7d</th>
                    <th className="px-2 py-3 sm:px-4 text-right hidden md:table-cell">24h Volume</th>
                    <th className="px-2 py-3 sm:px-4 text-right hidden lg:table-cell">Market Cap</th>
                    <th className="px-2 py-3 sm:px-4 text-center hidden lg:table-cell">Last 7 Days</th>
                </tr>
                </thead>
                <tbody>
                {displayData.map((coin) => {
                    const isInPortfolio = portfolioIds.has(coin.id);
                    return (
                        <tr
                            key={coin.id}
                            className="transition-colors cursor-pointer border-b border-border hover:bg-surface-secondary"
                            onClick={() => navigate(`/coin/${coin.id}`)}
                        >
                            <td className="px-2 py-3 sm:px-4">
                                <button
                                    onClick={(e) => handleTogglePortfolio(e, coin)}
                                    className={`p-1 rounded-full hover:bg-gray-700/50 transition-colors ${isInPortfolio ? 'text-primary-accent' : 'text-text-secondary'}`}
                                    aria-label={isInPortfolio ? "Remove from portfolio" : "Add to portfolio"}
                                >
                                    <Star size={18} fill={isInPortfolio ? 'currentColor' : 'none'} />
                                </button>
                            </td>
                            <td className="px-2 py-3 sm:px-4 font-medium text-text-secondary">
                                {coin.market_cap_rank}
                            </td>
                            <td className="px-2 py-3 sm:px-4">
                                <div className="flex items-center space-x-2">
                                    <img src={coin.image} alt={coin.name} className="w-5 h-5 sm:w-6 sm:h-6 rounded-full" />
                                    <div>
                                        <p className="font-bold whitespace-nowrap hidden sm:block">{coin.name}</p>
                                        <p className="font-bold whitespace-nowrap sm:hidden text-xs">{coin.symbol.toUpperCase()}</p>
                                        <p className="text-xs text-text-secondary hidden sm:block">{coin.symbol.toUpperCase()}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-1 py-3 sm:px-2">
                                <button
                                    onClick={(e) => { e.stopPropagation(); alert(`Buy ${coin.name} feature not implemented.`); }}
                                    className="bg-success-green/20 text-success-green text-xs font-bold py-1 px-1 sm:px-2 rounded hover:bg-success-green/40 transition-colors"
                                > Buy </button>
                            </td>
                            <td className="px-2 py-3 sm:px-4 text-right font-mono font-semibold text-xs sm:text-sm">{formatCurrency(coin.current_price)}</td>
                            <td className="px-2 py-3 sm:px-4 text-right hidden sm:table-cell">{formatPercentage(coin.price_change_percentage_1h_in_currency)}</td>
                            <td className="px-2 py-3 sm:px-4 text-right hidden sm:table-cell">{formatPercentage(coin.price_change_percentage_24h_in_currency)}</td>
                            <td className="px-2 py-3 sm:px-4 text-right hidden md:table-cell">{formatPercentage(coin.price_change_percentage_7d_in_currency)}</td>
                            <td className="px-2 py-3 sm:px-4 text-right font-mono text-xs sm:text-sm hidden md:table-cell">{formatMarketCap(coin.total_volume)}</td>
                            <td className="px-2 py-3 sm:px-4 text-right font-mono text-xs sm:text-sm hidden lg:table-cell">{formatMarketCap(coin.market_cap)}</td>
                            <td className="px-2 py-3 sm:px-4 hidden lg:table-cell">
                                <div className="flex justify-center items-center h-full">
                                    {coin.sparkline_in_7d?.price && <SparklineChart data={coin.sparkline_in_7d.price} />}
                                </div>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
};

export default CryptoList;