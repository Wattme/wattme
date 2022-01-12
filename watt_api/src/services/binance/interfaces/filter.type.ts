export type FilterType = 'PRICE_FILTER' | 'PERCENT_PRICE' | 'LOT_SIZE' | 'MIN_NOTIONAL' | 'ICEBERG_PARTS' | 'MARKET_LOT_SIZE' | 'MAX_POSITION' | 'MAX_NUM_ORDERS' | 'MAX_ALGO_ORDERS' | 'MAX_NUM_ICEBERG_ORDERS' | 'EXCHANGE_MAX_NUM_ORDERS' | 'EXCHANGE_MAX_ALGO_ORDERS';

export type Filter = {
    filterType: FilterType;
    [key: string]: string | number;
};