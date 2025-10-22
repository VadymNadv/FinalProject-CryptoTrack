import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface CryptoFilterState {
    search: string;
    sort_by: 'market_cap_desc' | 'volume_desc';
    page: number;
}
interface CryptoFilterActions {
    setFilter: (key: keyof Omit<CryptoFilterState, 'page'>, value: string) => void;
    setPage: (page: number) => void;
    resetFilters: () => void;
}
type CryptoFilterStore = CryptoFilterState & CryptoFilterActions;
const INITIAL_STATE: CryptoFilterState = { search: '', sort_by: 'market_cap_desc', page: 1 };

export const useCryptoFilterStore = create<CryptoFilterStore>()(
    immer((set) => ({
        ...INITIAL_STATE,
        setFilter: (key, value) =>
            set((state) => {
                (state[key] as string) = value;
                state.page = 1;
            }),
        setPage: (page) => set((state) => { state.page = page; }),
        resetFilters: () => set(INITIAL_STATE),
    }))
);