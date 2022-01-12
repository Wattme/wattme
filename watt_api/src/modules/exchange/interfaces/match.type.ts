import { ExchangeOrderEntity } from "../exchangeOrder.entity";

export type Match = {
    seller: ExchangeOrderEntity;
    buyers: {
        order: ExchangeOrderEntity;
        amountFilled: number;
    }[];
};