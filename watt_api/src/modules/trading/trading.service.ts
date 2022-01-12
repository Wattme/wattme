import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { WalletException } from "src/exceptions/wallet.exception";
import { BinanceService } from "src/services/binance/binance.service";
import { Access } from "src/services/binance/interfaces/access.type";
import { CreatedOrder, Order, OrderSide } from "src/services/binance/interfaces/order.type";
import { EncryptionService } from "src/services/encryption/encryption.service";
import { Result } from "src/shared/concrete/Result";
import { Repository } from "typeorm";
import { UserEntity } from "../users/user.entity";
import { CancelOrderDTO } from "./dto/cancelOrder.dto";
import { CreateKeysDTO } from "./dto/createKeys.dto";
import { CreateLimitOrderDTO } from "./dto/createLimitOrder.dto";
import { CreateMarketOrderDTO } from "./dto/createMarketOrder.dto";
import { DeleteKeysDTO } from "./dto/deleteKeys.dto";
import { GetAccountDTO } from "./dto/getAccount.dto";
import { GetAllOrdersDTO } from "./dto/getAllOrders.dto";
import { GetKeysDTO } from "./dto/getKeys.dto";
import { GetOpenOrdersDTO } from "./dto/getOpenOrders.dto";
import { GetOrderDTO } from "./dto/getOrder.dto";
import { GetSymbolPriceDTO } from "./dto/getSymbolPrice.dto";
import { GetSymbolsDTO } from "./dto/getSymbols.dto";
import { SetKeysDefaultDTO } from "./dto/setKeysDefault.dto";
import { KeysEntity } from "./keys.entity";
import { OrderRecordEntity } from "./orderRecord.entity";

@Injectable()
export class TradingService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepo: Repository<UserEntity>,
        @InjectRepository(KeysEntity)
        private keysRepo: Repository<KeysEntity>,
        @InjectRepository(OrderRecordEntity)
        private orderRecordRepo: Repository<OrderRecordEntity>,
        private binanceService: BinanceService,
        private encryptionService: EncryptionService
    ) { }

    // Change wallet exceptions to trading exceptions
    public async getAccount(request: GetAccountDTO.GetAccountRequest): Promise<Result<GetAccountDTO.GetAccountResponse | undefined, WalletException | undefined>> {
        const accessRetrieved = await this.retrieveAccess(request.userId);
        if (accessRetrieved.isFailure) {
            return Result.fail(accessRetrieved.getError());
        }

        const access = accessRetrieved.getValue()!;

        const accountGotten = await this.binanceService.getAccount(access);

        if (accountGotten.isFailure) {
            return Result.fail(WalletException.internalError(accountGotten.getError()));
        }

        const account = accountGotten.getValue()!;

        const getAccountResponse = new GetAccountDTO.GetAccountResponse();
        getAccountResponse.fill(account.canTrade, account.canWithdraw, account.accountType, account.balances);

        return Result.ok(getAccountResponse);
    }

    public async getOrder(request: GetOrderDTO.GetOrderRequest): Promise<Result<GetOrderDTO.GetOrderResponse | undefined, WalletException | undefined>> {
        const accessRetrieved = await this.retrieveAccess(request.userId);
        if (accessRetrieved.isFailure) {
            return Result.fail(accessRetrieved.getError());
        }

        const access = accessRetrieved.getValue()!;

        const orderGotten = await this.binanceService.getOrder(access, request.symbol, request.orderId);

        if (orderGotten.isFailure) {
            return Result.fail(WalletException.internalError(orderGotten.getError()));
        }

        const { order } = orderGotten.getValue()!;

        const getOrderResponse = new GetOrderDTO.GetOrderResponse();
        getOrderResponse.fill(order);

        return Result.ok(getOrderResponse);
    }

    public async getAllOrders(request: GetAllOrdersDTO.GetAllOrdersRequest): Promise<Result<GetAllOrdersDTO.GetAllOrdersResponse | undefined, WalletException | undefined>> {
        const accessRetrieved = await this.retrieveAccess(request.userId);
        if (accessRetrieved.isFailure) {
            return Result.fail(accessRetrieved.getError());
        }

        const access = accessRetrieved.getValue()!;

        const ordersGotten = await this.binanceService.getAllOrders(access, request.symbol, request.limit);

        if (ordersGotten.isFailure) {
            return Result.fail(WalletException.internalError(ordersGotten.getError()));
        }

        const { orders } = ordersGotten.getValue()!;

        const getAllOrdersResponse = new GetAllOrdersDTO.GetAllOrdersResponse();
        getAllOrdersResponse.fill(orders);

        return Result.ok(getAllOrdersResponse);
    }

    public async getOpenOrders(request: GetOpenOrdersDTO.GetOpenOrdersRequest): Promise<Result<GetOpenOrdersDTO.GetOpenOrdersResponse | undefined, WalletException | undefined>> {
        const accessRetrieved = await this.retrieveAccess(request.userId);
        if (accessRetrieved.isFailure) {
            return Result.fail(accessRetrieved.getError());
        }

        const access = accessRetrieved.getValue()!;

        const ordersGotten = await this.binanceService.getOpenOrders(access, request.symbol);

        if (ordersGotten.isFailure) {
            return Result.fail(WalletException.internalError(ordersGotten.getError()));
        }

        const { orders } = ordersGotten.getValue()!;

        const getOpenOrdersResponse = new GetOpenOrdersDTO.GetOpenOrdersResponse();
        getOpenOrdersResponse.fill(orders);

        return Result.ok(getOpenOrdersResponse);
    }

    public async getSymbols(request: GetSymbolsDTO.GetSymbolsRequest): Promise<Result<GetSymbolsDTO.GetSymbolsResponse | undefined, WalletException | undefined>> {
        const accessRetrieved = await this.retrieveAccess(request.userId);
        if (accessRetrieved.isFailure) {
            return Result.fail(accessRetrieved.getError());
        }

        const access = accessRetrieved.getValue()!;

        const symbolsGotten = await this.binanceService.getSymbols(access, request.symbol);
        if (symbolsGotten.isFailure) {
            return Result.fail(WalletException.internalError(symbolsGotten.getError()));
        }

        const { symbols } = symbolsGotten.getValue()!;

        const getSymbolsResponse = new GetSymbolsDTO.GetSymbolsResponse();
        getSymbolsResponse.fill(symbols);

        return Result.ok(getSymbolsResponse);
    }

    public async getSymbolPrice(request: GetSymbolPriceDTO.GetSymbolPriceRequest): Promise<Result<GetSymbolPriceDTO.GetSymbolPriceResponse | undefined, WalletException | undefined>> {
        const accessRetrieved = await this.retrieveAccess(request.userId);
        if (accessRetrieved.isFailure) {
            return Result.fail(accessRetrieved.getError());
        }

        const access = accessRetrieved.getValue()!;

        const symbolPriceGotten = await this.binanceService.getSymbolPrice(access, request.symbol);
        if (symbolPriceGotten.isFailure) {
            return Result.fail(WalletException.internalError(symbolPriceGotten.getError()));
        }

        const { price, symbol } = symbolPriceGotten.getValue()!;

        const getSymbolPriceResponse = new GetSymbolPriceDTO.GetSymbolPriceResponse();
        getSymbolPriceResponse.fill(symbol, price);

        return Result.ok(getSymbolPriceResponse);
    }

    public async createLimitOrder(request: CreateLimitOrderDTO.CreateLimitOrderRequest): Promise<Result<CreateLimitOrderDTO.CreateLimitOrderResponse | undefined, WalletException | undefined>> {
        const accessRetrieved = await this.retrieveAccess(request.userId);
        if (accessRetrieved.isFailure) {
            return Result.fail(accessRetrieved.getError());
        }

        const access = accessRetrieved.getValue()!;

        const orderCreated = await this.binanceService.createLimitOrder(access, request.symbol, request.side as OrderSide, request.price, request.quantity);
        if (orderCreated.isFailure) {
            return Result.fail(WalletException.internalError(orderCreated.getError()));
        }

        const orderList: CreatedOrder[] = [];

        const { order } = orderCreated.getValue()!;

        await this.createOrderRecord(order, request.userId);
        orderList.push(order);

        if (request.takeProfit) {
            const orderCreated = await this.binanceService.createLimitTakeProfitOrder(access, request.symbol, 'SELL', request.quantity, request.takeProfit.price, request.takeProfit.price );
            if (orderCreated.isFailure) {
                return Result.fail(WalletException.internalError('Error upon creating take profit order'));
            }

            const { order } = orderCreated.getValue()!;

            await this.createOrderRecord(order, request.userId);
            orderList.push(order);
        }

        if (request.stopLoss) {
            const orderCreated = await this. binanceService.createLimitStopLossOrder(access, request.symbol, 'SELL', request.quantity, request.stopLoss.price, request.stopLoss.price);
            if (orderCreated.isFailure) {
                return Result.fail(WalletException.internalError('Error upon creating stop loss order'));
            }

            const { order } = orderCreated.getValue()!;

            await this.createOrderRecord(order, request.userId);
            orderList.push(order);
        }

        const createLimitOrderResponse = new CreateLimitOrderDTO.CreateLimitOrderResponse();
        createLimitOrderResponse.fill(orderList);

        return Result.ok(createLimitOrderResponse);
    }

    public async createMarketOrder(request: CreateMarketOrderDTO.CreateMarketOrderRequest): Promise<Result<CreateMarketOrderDTO.CreateMarketOrderResponse | undefined, WalletException | undefined>> {
        const accessRetrieved = await this.retrieveAccess(request.userId);
        if (accessRetrieved.isFailure) {
            return Result.fail(accessRetrieved.getError());
        }

        const access = accessRetrieved.getValue()!;

        const orderCreated = await this.binanceService.createMarketOrder(access, request.symbol, request.side as OrderSide, request.quantity);
        if (orderCreated.isFailure) {
            return Result.fail(WalletException.internalError(orderCreated.getError()));
        }

        const orderList: CreatedOrder[] = [];

        const { order } = orderCreated.getValue()!;
        
        await this.createOrderRecord(order, request.userId);
        orderList.push(order);

        if (request.takeProfit) {
            const orderCreated = await this.binanceService.createLimitTakeProfitOrder(access, request.symbol, 'SELL', request.quantity, request.takeProfit.price, request.takeProfit.price );
            if (orderCreated.isFailure) {
                return Result.fail(WalletException.internalError('Error upon creating take profit order'));
            }

            const { order } = orderCreated.getValue()!;
            
            await this.createOrderRecord(order, request.userId);
            orderList.push(order);
        }

        if (request.stopLoss) {
            const orderCreated = await this. binanceService.createLimitStopLossOrder(access, request.symbol, 'SELL', request.quantity, request.stopLoss.price, request.stopLoss.price);
            if (orderCreated.isFailure) {
                return Result.fail(WalletException.internalError('Error upon creating stop loss order'));
            }

            const { order } = orderCreated.getValue()!;

            await this.createOrderRecord(order, request.userId);
            orderList.push(order);
        }

        const createMarketOrderResponse = new CreateMarketOrderDTO.CreateMarketOrderResponse();
        createMarketOrderResponse.fill(orderList);

        return Result.ok(createMarketOrderResponse);
    }

    public async cancelOrder(request: CancelOrderDTO.CancelOrderRequest): Promise<Result<CancelOrderDTO.CancelOrderResponse | undefined, WalletException | undefined>> {
        const accessRetrieved = await this.retrieveAccess(request.userId);
        if (accessRetrieved.isFailure) {
            return Result.fail(accessRetrieved.getError());
        }

        const access = accessRetrieved.getValue()!;

        const orderCanceled = await this.binanceService.cancelOrder(access, request.symbol, request.orderId);
        if (orderCanceled.isFailure) {
            return Result.fail(WalletException.internalError(orderCanceled.getError()));
        }

        const { order } = orderCanceled.getValue()!;

        const cancelOrderResponse = new CancelOrderDTO.CancelOrderResponse();
        cancelOrderResponse.fill(order);

        return Result.ok(cancelOrderResponse);
    }

    public async createKeys(request: CreateKeysDTO.CreateKeysRequest): Promise<Result<CreateKeysDTO.CreateKeysResponse | undefined, WalletException | undefined>> {
        const user = await this.userRepo.findOne({
            where: {
                id: request.userId
            }
        });

        if (!user) {
            return Result.fail(WalletException.notFound('User with id does not exist'));
        }

        const publicKey = this.encryptionService.encrypt(request.publicKey);
        const secretKey = this.encryptionService.encrypt(request.secretKey);

        const keys = this.keysRepo.create({
            name: request.name,
            public: publicKey,
            secret: secretKey,
            user: user
        });

        const savedKeys = await this.keysRepo.save(keys);
        if (!savedKeys) {
            return Result.fail(WalletException.internalError('Error upon saving keys'));
        }

        const setKeysDefaultRequest = new SetKeysDefaultDTO.SetKeysDefaultRequest();
        setKeysDefaultRequest.fill(user.id, keys.id);
        const keysSetDefault = await this.setKeysDefault(setKeysDefaultRequest);
        if (keysSetDefault.isSuccess) {
            savedKeys.default = true;
        }

        user.binance = true;

        await this.userRepo.save(user);

        const createKeysResponse = new CreateKeysDTO.CreateKeysResponse();
        createKeysResponse.fill(savedKeys.sanitize());

        return Result.ok(createKeysResponse);
    }

    public async deleteKeys(request: DeleteKeysDTO.DeleteKeysRequest): Promise<Result<DeleteKeysDTO.DeleteKeysResponse | undefined, WalletException | undefined>> {
        const user = await this.userRepo.findOne({
            where: {
                id: request.userId
            }
        });

        if (!user) {
            return Result.fail(WalletException.notFound('User with id does not exist'));
        }

        const keys = await this.keysRepo.findOne({
            where: {
                id: request.id
            }
        });

        if (!keys) {
            return Result.fail(WalletException.notFound('Keys with id do not exist'));
        }

        if (keys.userId != user.id) {
            return Result.fail(WalletException.forbidden('Keys do not belong to user'));
        }

        const keysDeleted = await this.keysRepo.remove(keys);
        if (!keysDeleted) {
            return Result.fail(WalletException.internalError('Error upon deleting keys'));
        }

        if (keys.default) {
            const keys = await this.keysRepo.findOne({where: {
                userId: user.id
            }, order: {
                id: 'DESC'
            }})

            if (!keys) {
                user.binance = false;
                await this.userRepo.save(user);
            } else {
                const setKeysDefaultRequest = new SetKeysDefaultDTO.SetKeysDefaultRequest();
                setKeysDefaultRequest.fill(user.id, keys.id);
                await this.setKeysDefault(setKeysDefaultRequest);
            }
        }

        const deleteKeysResponse = new DeleteKeysDTO.DeleteKeysResponse();
        deleteKeysResponse.fill(true);

        return Result.ok(deleteKeysResponse);
    }

    public async getKeys(request: GetKeysDTO.GetKeysRequest): Promise<Result<GetKeysDTO.GetKeysResponse | undefined, WalletException | undefined>> {
        const user = await this.userRepo.findOne({
            where: {
                id: request.userId
            }
        });

        if (!user) {
            return Result.fail(WalletException.notFound('User with id does not exist'));
        }

        const keys = await this.keysRepo.find({
            where: {
                userId: user.id
            }
        });

        const getKeysResponse = new GetKeysDTO.GetKeysResponse();
        getKeysResponse.fill(keys.map(k => k.sanitize()));

        return Result.ok(getKeysResponse);
    }

    public async setKeysDefault(request: SetKeysDefaultDTO.SetKeysDefaultRequest): Promise<Result<SetKeysDefaultDTO.SetKeysDefaultResponse | undefined, WalletException | undefined>> {
        const user = await this.userRepo.findOne({
            where: {
                id: request.userId
            }
        });

        if (!user) {
            return Result.fail(WalletException.notFound('User with id does not exist'));
        }

        const keys = await this.keysRepo.findOne({
            where: {
                id: request.id
            }
        });

        if (!keys) {
            return Result.fail(WalletException.notFound('Keys with id do not exist'));
        }

        if (keys.userId != user.id) {
            return Result.fail(WalletException.forbidden('Keys do not belong to user'));
        }

        const defaultKeys = await this.keysRepo.findOne({
            where: {
                userId: user.id,
                default: true
            }
        });

        if (defaultKeys) {
            defaultKeys.default = false;
            await this.keysRepo.save(defaultKeys);
        }

        keys.default = true;

        const savedKeys = await this.keysRepo.save(keys);
        if (!savedKeys) {
            return Result.fail(WalletException.internalError('Error upon saving keys'));
        }

        const setKeysDefaultResponse = new SetKeysDefaultDTO.SetKeysDefaultResponse();
        setKeysDefaultResponse.fill(true);

        return Result.ok(setKeysDefaultResponse);
    }

    // private async getOrderRecords()

    private async createOrderRecord(createdOrder: CreatedOrder, userId: number): Promise<Result<OrderRecordEntity | undefined, WalletException | undefined>> {
        const keys = await this.keysRepo.findOne({
            where: {
                userId: userId,
                default: true
            }
        });

        if (!keys) {
            return Result.fail(WalletException.notFound('Keys with id do not exist'));
        }
        
        const orderRecord = await this.orderRecordRepo.create({
            baseAsset: createdOrder.baseAsset,
            quoteAsset: createdOrder.quoteAsset,
            symbol: createdOrder.symbol,
            keys: keys
        });

        const savedOrderRecord = await this.orderRecordRepo.save(orderRecord);
        if (!savedOrderRecord) {
            return Result.fail(WalletException.internalError('Error upon saving order record'));
        }

        return Result.ok(savedOrderRecord);
    }

    private async retrieveAccess(userId: number): Promise<Result<Access | undefined, WalletException | undefined>> {
        const user = await this.userRepo.findOne({
            where: {
                id: userId
            }
        });

        if (!user) {
            return Result.fail(WalletException.notFound('User with id does not exist'));
        }

        const keys = await this.keysRepo.findOne({
            where: {
                userId: user.id,
                default: true
            }
        });

        if (!keys) {
            return Result.fail(WalletException.notFound('Keys with id do not exist'));
        }

        const publicKey = this.encryptionService.decrypt(keys.public);
        const secretKey = this.encryptionService.decrypt(keys.secret);

        return Result.ok({ publicKey, secretKey });
    }
}