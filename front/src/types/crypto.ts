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

export interface GlobalMarketData {
    data: {
        total_market_cap: { [currency: string]: number };
        total_volume: { [currency: string]: number };
        market_cap_percentage: { [currency: string]: number };
    };
}

export interface SimpleCoin {
    id: string;
    symbol: string;
    name: string;
}

export interface SimplePriceResponse {
    [coinId: string]: {
        [currency: string]: number;
    };
}

export interface TrendingCoinItem {
    item: {
        id: string;
        coin_id: number;
        name: string;
        symbol: string;
        market_cap_rank: number;
        thumb: string;
        small: string;
        large: string;
        score: number;
    };
}

export interface TrendingExchange {
    id: string;
    name: string;
    market_type: string;
    thumb: string;
    large: string;
}

export interface TrendingResponse {
    coins: TrendingCoinItem[];
    exchanges: TrendingExchange[];
}