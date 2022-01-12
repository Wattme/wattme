export type OrderStatus = 'NEW' | 'PARTIALLY_FILLED' | 'FILLED' | 'CANCELED' | 'PENDING_CANCEL' | 'REJECTED' | 'EXPIRED';

export type OrderListOrderStatus = 'EXECUTING' | 'ALL_DONE' | 'REJECT';

export type OrderTimeInForce = 'IOC' | 'GTC' | 'FOK';

export type OrderType = 'LIMIT' | 'MARKET' | 'STOP_LOSS' | 'STOP_LOSS_LIMIT' | 'TAKE_PROFIT' | 'TAKE PROFIT_LIMIT' | 'LIMIT_MAKER';

export type OrderSide = 'BUY' | 'SELL';

export type OrderFill = {
    price: string;
    qty: string;
    commission: string;
    commissionAsset: string;
};

export type Order = {
    symbol: string;
    baseAsset: string;
    quoteAsset: string;

    orderId: number;
    orderListId: number;
    price: string;
    origQty: string;
    executedQty: string;
    status: string;
    timeInForce: OrderTimeInForce;
    type: OrderType;
    side: OrderSide;
    stopPrice: number;
    icebergQty: number;
    time: Date;
    clientOrderId: string;
    updateTime: Date;
    isWorking: boolean;
    origQuoteOrderQty: number;
};

export type CreatedOrder = {
    symbol: string;
    baseAsset: string;
    quoteAsset: string;

    orderId: number;
    orderListId: number;
    clientOrderId: string;
    transactTime: Date;
    price: string;
    origQty: string;
    executedQty: string;
    cummulativeQuoteQty: string;
    status: OrderStatus;
    timeInForce: OrderTimeInForce;
    type: OrderType;
    side: OrderSide;
    fills?: OrderFill[];
};

export type CanceledOrder = {
    symbol: string;
    baseAsset: string;
    quoteAsset: string;

    origClientOrderId: string;
    orderId: number;
    orderListId: number;
    clientOrderId: string;
    origQty: string;
    executedQty: string;
    cummulativeQuoteQty: string;
    status: OrderStatus;
    timeInForce: OrderTimeInForce;
    type: OrderType;
    side: OrderSide;
};