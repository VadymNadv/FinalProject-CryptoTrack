// src/components/crypto/CryptoChart.tsx

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useState, useMemo } from 'react';
import { useHistoricalDataQuery } from "@/hooks/useCryptoQueries.ts";
import { useThemeStore } from '@/store/useThemeStore';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const chartRanges = [
    { label: '24г', days: 1 }, { label: '7д', days: 7 }, { label: '30д', days: 30 }, { label: '1р', days: 365 },
];

interface CryptoChartProps { coinId: string; }

const CryptoChart: React.FC<CryptoChartProps> = ({ coinId }) => {
    const [days, setDays] = useState(7);
    const { data: historicalPrices, isLoading } = useHistoricalDataQuery(coinId, days);
    const { theme } = useThemeStore();

    const chartData = useMemo(() => {
        if (!historicalPrices) return null;

        const labels = historicalPrices.map(p => new Date(p[0]).toLocaleDateString('uk-UA'));
        const prices = historicalPrices.map(p => p[1]);
        const lastPrice = prices[prices.length - 1];
        const firstPrice = prices[0];
        const color = lastPrice >= firstPrice ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)';

        return {
            labels,
            datasets: [
                {
                    label: 'Ціна (USD)', data: prices, borderColor: color,
                    backgroundColor: color.replace(')', ', 0.1)'),
                    tension: 0.2, pointRadius: 0, fill: true,
                },
            ],
        };
    }, [historicalPrices]);

    const options = useMemo(() => {
        const isLightTheme = theme === 'light';
        const gridColor = isLightTheme ? '#e5e7eb' : '#353945';
        const tickColor = isLightTheme ? '#111827' : '#EAECEF';

        return {
            responsive: true, maintainAspectRatio: false,
            plugins: {
                legend: { display: false }, title: { display: false },
                tooltip: {
                    mode: 'index' as const,
                    intersect: false,
                    backgroundColor: isLightTheme ? 'rgba(255, 255, 255, 0.9)' : 'rgba(43, 49, 57, 0.9)',
                    titleColor: tickColor,
                    bodyColor: tickColor,
                }
            },
            scales: {
                x: {
                    grid: { color: gridColor },
                    ticks: { color: tickColor }
                },
                y: {
                    grid: { color: gridColor },
                    ticks: {
                        color: tickColor,
                        callback: (value: string | number) => value.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })
                    },
                },
            },
        };
    }, [theme]);

    if (!chartData) return null;

    return (
        <div className="p-6 rounded-lg shadow-xl
                    bg-surface border border-border"
        >
            <div className="flex justify-start space-x-2 mb-4">
                {chartRanges.map(range => {
                    const isSelected = days === range.days;
                    const inactiveStyles = "bg-surface-secondary text-text-secondary hover:bg-border";
                    return (
                        <button
                            key={range.days}
                            onClick={() => setDays(range.days)}
                            className={`px-3 py-1 text-sm rounded transition-colors ${isSelected ? 'bg-blue-600 text-white font-bold' : inactiveStyles
                            }`}
                            disabled={isLoading}
                        >
                            {range.label}
                        </button>
                    )
                })}
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center h-96 text-blue-400">
                    Завантаження графіка...
                </div>
            ) : (
                <div className="h-96">
                    <Line options={options} data={chartData} />
                </div>
            )}
        </div>
    );
};

export default CryptoChart;