import { Filter } from "./filter.type";
import { OrderType } from "./order.type";

export type Symbol = {
    symbol: string;
    baseAsset: string;
    quoteAsset: string;
    trading: boolean;

    orderTypes: OrderType[];
    filters: Filter[];
};

export interface IGetSymbolsData {
    symbols: Symbol[];
};