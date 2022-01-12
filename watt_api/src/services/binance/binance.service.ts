import { Injectable } from "@nestjs/common";
import { ConfigService } from "src/config/config.service";
import { RequestLogService } from "src/requestLog/requestLog.service";
import { Result } from "src/shared/concrete/Result";
import { Access } from "./interfaces/access.type";
import { ICancelOrderData } from "./interfaces/cancelOrderData.interface";
import { ICreateLimitOrderData } from "./interfaces/createLimitOrderData.interface";
import { ICreateLimitStopLossData } from "./interfaces/createLimitStopLossData.interface";
import { ICreateMarketOrderData } from "./interfaces/createMarketOrderData.interface";
import { ICreateLimitTakeProfitOrder } from "./interfaces/createLimitTakeProfitOrder.interface";
import { IGetAccountData } from "./interfaces/getAccountData.interface";
import { IGetAllOrdersData } from "./interfaces/getAllOrdersData.interface";
import { IGetOpenOrdersData } from "./interfaces/getOpenOrdersData.interface";
import { IGetOrderData } from "./interfaces/getOrderData.interface";
import { IGetSymbolPriceData } from "./interfaces/getSymbolPriceData.interface";
import { IGetSymbolsData, Symbol } from "./interfaces/getSymbolsData.interface";
import { Order, OrderFill, OrderSide } from "./interfaces/order.type";
const { Spot } = require('@binance/connector');

@Injectable()
export class BinanceService {
    public symbols: Record<string, Symbol> = {};

    constructor(
        private configService: ConfigService,
        private requestLogService: RequestLogService
    ) { }

    public async getAccount(access: Access): Promise<Result<IGetAccountData | undefined, Error | undefined>> {
        const before = new Date().getTime();

        try {
            const client = this.buildClient(access);

            const response = await client.account();

            const after = new Date().getTime();
            const responseTime = after - before;
            const log = await this.requestLogService.create(response.config.method, response.config.baseURL + response.config.url, JSON.stringify(response.config.data));
            await this.requestLogService.setResponse(log, response.status, responseTime, JSON.stringify(response.data));

            const { data } = response;

            const getAccountData: IGetAccountData = {
                accountType: data.accountType,
                balances: data.balances,
                canTrade: data.canTrade,
                canWithdraw: data.canWithdraw
            };

            return Result.ok(getAccountData);
        } catch (ex: any) {
            if (ex.response != undefined) {
                const log = await this.requestLogService.create(ex.config.method, ex.config.baseURL + ex.config.url, JSON.stringify(ex.config.data));

                const after = new Date().getTime();
                const responseTime = after - before;
                await this.requestLogService.setResponse(log, ex.response.status, responseTime, JSON.stringify(ex.response.data));
            }

            return Result.fail(ex.response?.data || ex);
        }
    }

    public async getOrder(access: Access, symbol: string, orderId?: number): Promise<Result<IGetOrderData | undefined, Error | undefined>> {
        const before = new Date().getTime();

        try {
            const client = this.buildClient(access);

            const response = await client.getOrder(symbol, {
                orderId: orderId
            });

            const after = new Date().getTime();
            const responseTime = after - before;
            const log = await this.requestLogService.create(response.config.method, response.config.baseURL + response.config.url, JSON.stringify(response.config.data));
            await this.requestLogService.setResponse(log, response.status, responseTime, JSON.stringify(response.data));

            const { data } = response;

            if (!this.symbols[data.symbol]) {
                await this.getSymbols(access);
            }

            const getOrderData: IGetOrderData = {
                order: {
                    baseAsset: this.symbols[data.symbol].baseAsset,
                    quoteAsset: this.symbols[data.symbol].quoteAsset,
                    executedQty: data.executedQty,
                    icebergQty: data.icebergQty,
                    isWorking: data.isWorking,
                    orderId: data.orderId,
                    orderListId: data.orderListId,
                    origQty: data.origQty,
                    origQuoteOrderQty: data.origQuoteOrderQty,
                    price: data.price,
                    side: data.side,
                    status: data.status,
                    stopPrice: data.stopPrice,
                    symbol: data.symbol,

                    time: new Date(data.time),
                    timeInForce: data.timeInForce,
                    type: data.type,
                    updateTime: new Date(data.updateTime),
                    clientOrderId: data.clientOrderId
                }
            };

            return Result.ok(getOrderData);
        } catch (ex: any) {
            if (ex.response != undefined) {
                const log = await this.requestLogService.create(ex.config.method, ex.config.baseURL + ex.config.url, JSON.stringify(ex.config.data));

                const after = new Date().getTime();
                const responseTime = after - before;
                await this.requestLogService.setResponse(log, ex.response.status, responseTime, JSON.stringify(ex.response.data));
            }

            return Result.fail(ex.response?.data || ex);
        }
    }

    public async getAllOrders(access: Access, symbol: string, limit: number = 500): Promise<Result<IGetAllOrdersData | undefined, Error | undefined>> {
        const before = new Date().getTime();

        try {
            const client = this.buildClient(access);

            const response = await client.allOrders(symbol, {
                limit: limit
            });

            const after = new Date().getTime();
            const responseTime = after - before;
            const log = await this.requestLogService.create(response.config.method, response.config.baseURL + response.config.url, JSON.stringify(response.config.data));
            await this.requestLogService.setResponse(log, response.status, responseTime, JSON.stringify(response.data));

            const { data } = response;

            if (!Object.keys(this.symbols).length) {
                await this.getSymbols(access);
            }

            const getAllOrdersData: IGetAllOrdersData = {
                orders: data.map((o: any) => {
                    return <Order>{
                        baseAsset: this.symbols[o.symbol].baseAsset,
                        quoteAsset: this.symbols[o.symbol].quoteAsset,
                        executedQty: o.executedQty,
                        icebergQty: o.icebergQty,
                        isWorking: o.isWorking,
                        orderId: o.orderId,
                        orderListId: o.orderListId,
                        origQty: o.origQty,
                        origQuoteOrderQty: o.origQuoteOrderQty,
                        price: o.price,
                        side: o.side,
                        status: o.status,
                        stopPrice: o.stopPrice,
                        symbol: o.symbol,
                        time: new Date(o.time),
                        timeInForce: o.timeInForce,
                        type: o.type,
                        updateTime: new Date(o.updateTime),
                        clientOrderId: o.clientOrderId
                    };
                })
            };

            return Result.ok(getAllOrdersData);
        } catch (ex: any) {
            if (ex.response != undefined) {
                const log = await this.requestLogService.create(ex.config.method, ex.config.baseURL + ex.config.url, JSON.stringify(ex.config.data));

                const after = new Date().getTime();
                const responseTime = after - before;
                await this.requestLogService.setResponse(log, ex.response.status, responseTime, JSON.stringify(ex.response.data));
            }

            return Result.fail(ex.response?.data || ex);
        }
    }

    public async getOpenOrders(access: Access, symbol?: string): Promise<Result<IGetOpenOrdersData | undefined, Error | undefined>> {
        const before = new Date().getTime();

        try {
            const client = this.buildClient(access);

            const response = await client.openOrders(symbol ? { symbol } : {});

            const after = new Date().getTime();
            const responseTime = after - before;
            const log = await this.requestLogService.create(response.config.method, response.config.baseURL + response.config.url, JSON.stringify(response.config.data));
            await this.requestLogService.setResponse(log, response.status, responseTime, JSON.stringify(response.data));

            const { data } = response;

            if (!Object.keys(this.symbols).length) {
                await this.getSymbols(access);
            }

            const getOpenOrdersData: IGetOpenOrdersData = {
                orders: data.map((o: any) => {
                    return <Order>{
                        baseAsset: this.symbols[o.symbol].baseAsset,
                        quoteAsset: this.symbols[o.symbol].quoteAsset,
                        executedQty: o.executedQty,
                        icebergQty: o.icebergQty,
                        isWorking: o.isWorking,
                        orderId: o.orderId,
                        orderListId: o.orderListId,
                        origQty: o.origQty,
                        origQuoteOrderQty: o.origQuoteOrderQty,
                        price: o.price,
                        side: o.side,
                        status: o.status,
                        stopPrice: o.stopPrice,
                        symbol: o.symbol,
                        time: new Date(o.time),
                        timeInForce: o.timeInForce,
                        type: o.type,
                        updateTime: new Date(o.updateTime),
                        clientOrderId: o.clientOrderId
                    };
                })
            };

            return Result.ok(getOpenOrdersData);
        } catch (ex: any) {
            if (ex.response != undefined) {
                const log = await this.requestLogService.create(ex.config.method, ex.config.baseURL + ex.config.url, JSON.stringify(ex.config.data));

                const after = new Date().getTime();
                const responseTime = after - before;
                await this.requestLogService.setResponse(log, ex.response.status, responseTime, JSON.stringify(ex.response.data));
            }

            return Result.fail(ex.response?.data || ex);
        }
    }

    public async getSymbols(access: Access, symbol?: string): Promise<Result<IGetSymbolsData | undefined, Error | undefined>> {
        const before = new Date().getTime();

        try {
            const client = this.buildClient(access);

            const response = await client.exchangeInfo(symbol ? { symbol } : {});

            const after = new Date().getTime();
            const responseTime = after - before;
            const log = await this.requestLogService.create(response.config.method, response.config.baseURL + response.config.url, JSON.stringify(response.config.data));
            await this.requestLogService.setResponse(log, response.status, responseTime, JSON.stringify(response.data));

            const { data } = response;

            const getSymbolsData: IGetSymbolsData = {
                symbols: data.symbols.map((s: any) => {
                    const symbol: Symbol = {
                        orderTypes: s.orderTypes,
                        symbol: s.symbol,
                        filters: s.filters,
                        baseAsset: s.baseAsset,
                        quoteAsset: s.quoteAsset,
                        trading: s.status.toLowerCase() == 'trading'
                    };

                    this.symbols[symbol.symbol] = symbol;
                    return symbol;
                })
            };

            return Result.ok(getSymbolsData);
        } catch (ex: any) {
            if (ex.response != undefined) {
                const log = await this.requestLogService.create(ex.config.method, ex.config.baseURL + ex.config.url, JSON.stringify(ex.config.data));

                const after = new Date().getTime();
                const responseTime = after - before;
                await this.requestLogService.setResponse(log, ex.response.status, responseTime, JSON.stringify(ex.response.data));
            }

            return Result.fail(ex.response?.data || ex);
        }
    }

    public async getSymbolPrice(access: Access, symbol: string): Promise<Result<IGetSymbolPriceData | undefined, Error | undefined>> {
        const before = new Date().getTime();

        try {
            const client = this.buildClient(access);

            const response = await client.tickerPrice(symbol);

            const after = new Date().getTime();
            const responseTime = after - before;
            const log = await this.requestLogService.create(response.config.method, response.config.baseURL + response.config.url, JSON.stringify(response.config.data));
            await this.requestLogService.setResponse(log, response.status, responseTime, JSON.stringify(response.data));

            const { data } = response;

            const getSymbolPriceData: IGetSymbolPriceData = {
                price: data.price,
                symbol: data.symbol
            };

            return Result.ok(getSymbolPriceData);
        } catch (ex: any) {
            if (ex.response != undefined) {
                const log = await this.requestLogService.create(ex.config.method, ex.config.baseURL + ex.config.url, JSON.stringify(ex.config.data));

                const after = new Date().getTime();
                const responseTime = after - before;
                await this.requestLogService.setResponse(log, ex.response.status, responseTime, JSON.stringify(ex.response.data));
            }

            return Result.fail(ex.response?.data || ex);
        }
    }

    public async createLimitOrder(
        access: Access,
        symbol: string,
        side: OrderSide,
        price: string,
        quantity: number
    ): Promise<Result<ICreateLimitOrderData | undefined, Error | undefined>> {
        const before = new Date().getTime();

        try {
            const client = this.buildClient(access);

            const response = await client.newOrder(symbol, side, 'LIMIT', {
                price: price,
                quantity: quantity,
                timeInForce: 'GTC'
            });

            const after = new Date().getTime();
            const responseTime = after - before;
            const log = await this.requestLogService.create(response.config.method, response.config.baseURL + response.config.url, JSON.stringify(response.config.data));
            await this.requestLogService.setResponse(log, response.status, responseTime, JSON.stringify(response.data));

            const { data } = response;

            if (!this.symbols[data.symbol]) {
                await this.getSymbols(access);
            }

            const createLimitOrderData: ICreateLimitOrderData = {
                order: {
                    baseAsset: this.symbols[data.symbol].baseAsset,
                    quoteAsset: this.symbols[data.symbol].quoteAsset,
                    clientOrderId: data.symbol,
                    cummulativeQuoteQty: data.cummulativeQuoteQty,
                    executedQty: data.executedQty,
                    orderId: data.orderId,
                    orderListId: data.orderListId,
                    origQty: data.origQty,
                    price: data.price,
                    side: data.side,
                    status: data.status,
                    symbol: data.symbol,
                    timeInForce: data.timeInForce,
                    transactTime: new Date(data.transactTime),
                    type: data.type,
                    fills: data.fills ? data.fills.map((f: any) => {
                        return <OrderFill>{
                            commission: f.commission,
                            commissionAsset: f.commissionAsset,
                            price: f.price,
                            qty: f.qty
                        }
                    }) : undefined
                }
            };

            return Result.ok(createLimitOrderData);
        } catch (ex: any) {
            if (ex.response != undefined) {
                const log = await this.requestLogService.create(ex.config.method, ex.config.baseURL + ex.config.url, JSON.stringify(ex.config.data));

                const after = new Date().getTime();
                const responseTime = after - before;
                await this.requestLogService.setResponse(log, ex.response.status, responseTime, JSON.stringify(ex.response.data));
            }

            return Result.fail(ex.response?.data || ex);
        }
    }

    public async createMarketOrder(
        access: Access,
        symbol: string,
        side: OrderSide,
        quantity: number
    ): Promise<Result<ICreateMarketOrderData | undefined, Error | undefined>> {
        const before = new Date().getTime();

        try {
            const client = this.buildClient(access);

            const response = await client.newOrder(symbol, side, 'MARKET', {
                quantity: quantity,
            });

            const after = new Date().getTime();
            const responseTime = after - before;
            const log = await this.requestLogService.create(response.config.method, response.config.baseURL + response.config.url, JSON.stringify(response.config.data));
            await this.requestLogService.setResponse(log, response.status, responseTime, JSON.stringify(response.data));

            const { data } = response;

            if (!this.symbols[data.symbol]) {
                await this.getSymbols(access);
            }

            const createLimitOrderData: ICreateLimitOrderData = {
                order: {
                    baseAsset: this.symbols[data.symbol].baseAsset,
                    quoteAsset: this.symbols[data.symbol].quoteAsset,
                    clientOrderId: data.symbol,
                    cummulativeQuoteQty: data.cummulativeQuoteQty,
                    executedQty: data.executedQty,
                    orderId: data.orderId,
                    orderListId: data.orderListId,
                    origQty: data.origQty,
                    price: data.price,
                    side: data.side,
                    status: data.status,
                    symbol: data.symbol,
                    timeInForce: data.timeInForce,
                    transactTime: new Date(data.transactTime),
                    type: data.type,
                    fills: data.fills ? data.fills.map((f: any) => {
                        return <OrderFill>{
                            commission: f.commission,
                            commissionAsset: f.commissionAsset,
                            price: f.price,
                            qty: f.qty
                        }
                    }) : undefined
                }
            };

            return Result.ok(createLimitOrderData);
        } catch (ex: any) {
            if (ex.response != undefined) {
                const log = await this.requestLogService.create(ex.config.method, ex.config.baseURL + ex.config.url, JSON.stringify(ex.config.data));

                const after = new Date().getTime();
                const responseTime = after - before;
                await this.requestLogService.setResponse(log, ex.response.status, responseTime, JSON.stringify(ex.response.data));
            }

            return Result.fail(ex.response?.data || ex);
        }
    }

    public async cancelOrder(access: Access, symbol: string, orderId?: number): Promise<Result<ICancelOrderData | undefined, Error | undefined>> {
        const before = new Date().getTime();

        try {
            const client = this.buildClient(access);

            const response = await client.cancelOrder(symbol, {
                orderId
            });

            const after = new Date().getTime();
            const responseTime = after - before;
            const log = await this.requestLogService.create(response.config.method, response.config.baseURL + response.config.url, JSON.stringify(response.config.data));
            await this.requestLogService.setResponse(log, response.status, responseTime, JSON.stringify(response.data));

            const { data } = response;

            if (!this.symbols[data.symbol]) {
                await this.getSymbols(access);
            }

            const cancelOrderData: ICancelOrderData = {
                order: {
                    baseAsset: this.symbols[data.symbol].baseAsset,
                    quoteAsset: this.symbols[data.symbol].quoteAsset,
                    clientOrderId: data.clientOrderId,
                    cummulativeQuoteQty: data.cummulativeQuoteQty,
                    executedQty: data.executedQty,
                    orderId: data.orderId,
                    orderListId: data.orderListId,
                    origClientOrderId: data.origClientOrderId,
                    origQty: data.origQty,
                    side: data.side,
                    status: data.status,
                    symbol: data.symbol,
                    timeInForce: data.timeInForce,
                    type: data.type
                }
            };

            return Result.ok(cancelOrderData);
        } catch (ex: any) {
            if (ex.response != undefined) {
                const log = await this.requestLogService.create(ex.config.method, ex.config.baseURL + ex.config.url, JSON.stringify(ex.config.data));

                const after = new Date().getTime();
                const responseTime = after - before;
                await this.requestLogService.setResponse(log, ex.response.status, responseTime, JSON.stringify(ex.response.data));
            }

            return Result.fail(ex.response?.data || ex);
        }
    }

    public async createLimitTakeProfitOrder(access: Access, symbol: string, side: OrderSide, quantity: number, stopPrice: string, price: string): Promise<Result<ICreateLimitTakeProfitOrder | undefined, Error | undefined>> {
        const before = new Date().getTime();

        try {
            const client = this.buildClient(access);

            const response = await client.newOrder(symbol, side, 'TAKE_PROFIT_LIMIT', {
                stopPrice: stopPrice,
                price: price,
                quantity: quantity,
                timeInForce: 'GTC'
            });

            const after = new Date().getTime();
            const responseTime = after - before;
            const log = await this.requestLogService.create(response.config.method, response.config.baseURL + response.config.url, JSON.stringify(response.config.data));
            await this.requestLogService.setResponse(log, response.status, responseTime, JSON.stringify(response.data));

            const { data } = response;

            if (!this.symbols[data.symbol]) {
                await this.getSymbols(access);
            }

            const createMarketTakeProfitOrder: ICreateLimitTakeProfitOrder = {
                order: {
                    baseAsset: this.symbols[data.symbol].baseAsset,
                    quoteAsset: this.symbols[data.symbol].quoteAsset,
                    clientOrderId: data.symbol,
                    cummulativeQuoteQty: data.cummulativeQuoteQty,
                    executedQty: data.executedQty,
                    orderId: data.orderId,
                    orderListId: data.orderListId,
                    origQty: data.origQty,
                    price: data.price,
                    side: data.side,
                    status: data.status,
                    symbol: data.symbol,
                    timeInForce: data.timeInForce,
                    transactTime: new Date(data.transactTime),
                    type: data.type,
                    fills: data.fills ? data.fills.map((f: any) => {
                        return <OrderFill>{
                            commission: f.commission,
                            commissionAsset: f.commissionAsset,
                            price: f.price,
                            qty: f.qty
                        }
                    }) : undefined
                }
            };

            return Result.ok(createMarketTakeProfitOrder);
        } catch (ex: any) {
            if (ex.response != undefined) {
                const log = await this.requestLogService.create(ex.config.method, ex.config.baseURL + ex.config.url, JSON.stringify(ex.config.data));

                const after = new Date().getTime();
                const responseTime = after - before;
                await this.requestLogService.setResponse(log, ex.response.status, responseTime, JSON.stringify(ex.response.data));
            }

            return Result.fail(ex.response?.data || ex);
        }
    }

    public async createLimitStopLossOrder(access: Access, symbol: string, side: OrderSide, quantity: number, stopPrice: string, price: string): Promise<Result<ICreateLimitStopLossData | undefined, Error | undefined>> {
        const before = new Date().getTime();

        try {
            const client = this.buildClient(access);

            const response = await client.newOrder(symbol, side, 'STOP_LOSS_LIMIT', {
                stopPrice: stopPrice,
                price: price,
                quantity: quantity,
                timeInForce: 'GTC'
            });

            const after = new Date().getTime();
            const responseTime = after - before;
            const log = await this.requestLogService.create(response.config.method, response.config.baseURL + response.config.url, JSON.stringify(response.config.data));
            await this.requestLogService.setResponse(log, response.status, responseTime, JSON.stringify(response.data));

            const { data } = response;

            if (!this.symbols[data.symbol]) {
                await this.getSymbols(access);
            }

            const createMarketStopLossOrder: ICreateLimitStopLossData = {
                order: {
                    baseAsset: this.symbols[data.symbol].baseAsset,
                    quoteAsset: this.symbols[data.symbol].quoteAsset,
                    clientOrderId: data.symbol,
                    cummulativeQuoteQty: data.cummulativeQuoteQty,
                    executedQty: data.executedQty,
                    orderId: data.orderId,
                    orderListId: data.orderListId,
                    origQty: data.origQty,
                    price: data.price,
                    side: data.side,
                    status: data.status,
                    symbol: data.symbol,
                    timeInForce: data.timeInForce,
                    transactTime: new Date(data.transactTime),
                    type: data.type,
                    fills: data.fills ? data.fills.map((f: any) => {
                        return <OrderFill>{
                            commission: f.commission,
                            commissionAsset: f.commissionAsset,
                            price: f.price,
                            qty: f.qty
                        }
                    }) : undefined
                }
            };

            return Result.ok(createMarketStopLossOrder);
        } catch (ex: any) {
            if (ex.response != undefined) {
                const log = await this.requestLogService.create(ex.config.method, ex.config.baseURL + ex.config.url, JSON.stringify(ex.config.data));

                const after = new Date().getTime();
                const responseTime = after - before;
                await this.requestLogService.setResponse(log, ex.response.status, responseTime, JSON.stringify(ex.response.data));
            }

            return Result.fail(ex.response?.data || ex);
        }
    }

    private buildClient(access: Access): any {
        return new Spot(access.publicKey, access.secretKey, { baseURL: this.configService.props.binance.url })
    }
}