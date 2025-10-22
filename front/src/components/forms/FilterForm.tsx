// src/components/forms/FilterForm.tsx

import { useEffect, useState } from 'react';
import { useCryptoFilterStore } from '@/store/useCryptoFilterStore';
import { useDebounce } from '@/hooks/useDebounce';
import { useTranslation } from 'react-i18next';

const FilterForm = () => {
    const { t } = useTranslation();
    const { search, sort_by, setFilter, resetFilters } = useCryptoFilterStore();
    const [localSearch, setLocalSearch] = useState(search);
    const debouncedSearch = useDebounce(localSearch, 500);

    useEffect(() => {
        setFilter('search', debouncedSearch);
    }, [debouncedSearch, setFilter]);

    const baseButtonStyles = "px-4 py-2 text-sm font-bold rounded-lg transition-colors";
    const activeButtonStyles = "bg-primary-accent text-binance-dark";
    const inactiveButtonStyles = "bg-surface-secondary text-text-secondary hover:bg-border";

    const inputStyles = "w-full p-3 rounded-lg placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary-accent " +
        "bg-surface-secondary text-text border border-border";

    return (
        <div className="flex flex-col gap-4 mb-6 p-4 rounded-xl shadow-xl
                    bg-surface border border-border"
        >
            <input
                type="text"
                placeholder={t('search_placeholder')}
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className={inputStyles}
            />
            <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex items-center gap-2">
                    <span className="text-text-secondary text-sm">{t('sort_by')}</span>
                    <button
                        onClick={() => setFilter('sort_by', 'market_cap_desc')}
                        className={`${baseButtonStyles} ${sort_by === 'market_cap_desc' ? activeButtonStyles : inactiveButtonStyles}`}
                    >
                        {t('sort_market_cap')}
                    </button>
                    <button
                        onClick={() => setFilter('sort_by', 'volume_desc')}
                        className={`${baseButtonStyles} ${sort_by === 'volume_desc' ? activeButtonStyles : inactiveButtonStyles}`}
                    >
                        {t('sort_volume')}
                    </button>
                </div>

                <button
                    onClick={() => {
                        resetFilters();
                        setLocalSearch('');
                    }}
                    className="p-3 mt-2 sm:mt-0 sm:ml-auto rounded-lg font-bold transition-colors shadow-md
                                bg-gray-700 text-primary-accent hover:bg-gray-600"
                >
                    {t('reset')}
                </button>
            </div>
        </div>
    );
};

export default FilterForm;