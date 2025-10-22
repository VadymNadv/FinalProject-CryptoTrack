
import { useGlobalMarketDataQuery } from '@/hooks/useCryptoQueries.ts';
import LoadingSpinner from '../../../components/loadingSpiner/LoadingSpinner.tsx';
import {useTranslation} from "react-i18next";

const formatMarketValue = (value: number) => {
    if (value > 1_000_000_000_000) {
        return `$${(value / 1_000_000_000_000).toFixed(2)}T`;
    }
    return `$${(value / 1_000_000_000).toFixed(2)}B`;
};

const MarketOverview = () => {
    const { t } = useTranslation();
    const { data, isLoading, isError } = useGlobalMarketDataQuery();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center p-4 bg-surface rounded-xl mb-6 h-20">
                <LoadingSpinner />
                <span className="ml-2 text-text-secondary">
                    Завантаження даних ринку...
                </span>
            </div>
        );
    }

    if (isError || !data) {
        return null;
    }

    const { total_market_cap, total_volume, market_cap_percentage } = data.data;

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center p-4 rounded-xl shadow-xl mb-6
                    bg-surface border border-border"
        >
            <InfoBox
                label={t('market_cap')}
                value={formatMarketValue(total_market_cap.usd)}
            />
            <InfoBox
                label={t('volume_24h')}
                value={formatMarketValue(total_volume.usd)}
            />
            <InfoBox
                label={t('btc_dominance')}
                value={`${market_cap_percentage.btc.toFixed(1)}%`}
            />
            <InfoBox
                label={t('eth_dominance')}
                value={`${market_cap_percentage.eth.toFixed(1)}%`}
            />
        </div>
    );
};


const InfoBox = ({ label, value }: { label: string, value: string }) => (
    <div>
        <p className="text-sm text-text-secondary uppercase">{label}</p>
        <p className="text-lg font-bold text-primary-accent">{value}</p>
    </div>
);

export default MarketOverview;