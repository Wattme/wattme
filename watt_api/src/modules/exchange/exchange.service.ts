import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { timeStamp } from "console";
import { evaluate } from "mathjs";
import { ConfigService } from "src/config/config.service";
import { WalletException } from "src/exceptions/wallet.exception";
import { Web3Service } from "src/services/web3/web3.service";
import { WisewinService } from "src/services/wisewin/wisewin.service";
import { Result } from "src/shared/concrete/Result";
import { ExchangeOrderSide } from "src/static/exchangeOrderSide";
import { Repository } from "typeorm";
import { BSCService } from "../bsc/bsc.service";
import { CreateTransactionDTO, GetBalanceDTO, GetTransactionListDTO, PushTransactionDTO } from "../web3Base/dto";
import { CreateExchangeOrderDTO } from "./dto/createExchangeOrder.dto";
import { GetAccountDTO } from "./dto/getAccount.dto";
import { GetCurrentOrdersDTO } from "./dto/getCurrentOrders.dto";
import { GetSystemInfoDTO } from "./dto/getSystemInfo.dto";
import { GetValueDTO } from "./dto/getValue.dto";
import { ExchangeFillEntity } from "./exchangeFill.entity";
// import { ExchangeFillEntity } from "./exchangeFill.entity";
import { ExchangeOrderEntity } from "./exchangeOrder.entity";
import { Match } from "./interfaces/match.type";

@Injectable()
export class ExchangeService {
    constructor(
        @InjectRepository(ExchangeOrderEntity)
        private exchangeOrderRepo: Repository<ExchangeOrderEntity>,
        @InjectRepository(ExchangeFillEntity)
        private exchangeFillRepo: Repository<ExchangeFillEntity>,
        private wisewinService: WisewinService,
        private configService: ConfigService,
        private bscService: BSCService,
        private web3Service: Web3Service
    ) {
        // this.createAndSend(this.configService.props.exchange.bscAddress, '0.001', this.configService.props.exchange.wattContract);
        // this.confirmOrders();
        // this.matchOrders();
        setInterval(async () => {

        }, 60000);
    }

    public async createOrder(request: CreateExchangeOrderDTO.CreateExchangeOrderRequest): Promise<Result<CreateExchangeOrderDTO.CreateExchangeOrderResponse | undefined, WalletException | undefined>> {
        const rateGotten = await this.getWattRate();
        if (rateGotten.isFailure) {
            return Result.fail(rateGotten.getError());
        }

        const rate = rateGotten.getValue()!;

        const order = this.exchangeOrderRepo.create({
            side: request.side,
            price: rate,
            confirmed: false,
            symbol: request.symbol,
            systemAddress: this.configService.props.exchange.bscAddress,
            address: request.address,
            value: request.value,
            userId: request.userId
        });

        const createTransactionRequest = new CreateTransactionDTO.CreateTransactionRequest();
        createTransactionRequest.fill(
            order.address,
            order.systemAddress,
            order.side == 'BUY' ? String(this.format(order.value * rate)) : String(this.format(order.value)),
            undefined,
            order.side == 'BUY' ? this.configService.props.exchange.busdContract : this.configService.props.exchange.wattContract
        );

        const transactionCreated = await this.bscService.createTransaction(createTransactionRequest);
        if (transactionCreated.isFailure) {
            return Result.fail(transactionCreated.getError());
        }

        const transaction = transactionCreated.getValue()!;

        const savedOrder = await this.exchangeOrderRepo.save(order);
        if (!savedOrder) {
            return Result.fail(WalletException.internalError());
        }

        const createExchangeOrderResponse = new CreateExchangeOrderDTO.CreateExchangeOrderResponse(savedOrder, transaction);

        return Result.ok(createExchangeOrderResponse);
    }

    public async matchOrders() {
        const orders = await this.exchangeOrderRepo.find({
            where: {
                confirmed: true,
                complete: false
            }, order: {
                id: 'DESC'
            }
        });

        const buyStack = orders.filter(o => o.side == 'BUY');
        const sellStack = orders.filter(o => o.side == 'SELL');
        const matches: Match[] = [];

        for (const sellOrder of sellStack) {
            const sellOrderFills = await this.exchangeFillRepo.find({ where: {
                sellOrderId: sellOrder.id
            } });
            
            const sellOrderValue = sellOrder.value - sellOrderFills.reduce((sum, cur) => sum += Number(cur.value), 0);

            let remainingAmount = sellOrderValue;
            for (const buyOrder of buyStack) {
                if (remainingAmount <= 0) {
                    break;
                }

                const buyOrdersFills = await this.exchangeFillRepo.find({ where: {
                    buyOrderId: buyOrder.id
                } });
                
                let buyOrderValue = buyOrder.value - buyOrdersFills.reduce((sum, cur) => sum += Number(cur.value), 0);

                if (remainingAmount <= buyOrderValue) {
                    remainingAmount = 0;
                    buyOrderValue -= remainingAmount;                    
                } else {
                    remainingAmount -= buyOrderValue;
                    buyOrderValue = 0;
                }

                let match = matches.find(o => o.seller == sellOrder);
                if (match) {
                    match.buyers.push({
                        order: buyOrder,
                        amountFilled: buyOrderValue
                    });
                } else {
                    matches.push({
                        seller: sellOrder,
                        buyers: [{
                            order: buyOrder,
                            amountFilled: buyOrderValue
                        }]
                    });
                }
            }
        }

        await this.executeMatches(matches);
    }

    private async createFill(value: number, sellOrder: ExchangeOrderEntity, buyOrder: ExchangeOrderEntity, sellerHash?: string, buyerHash?: string): Promise<Result<ExchangeFillEntity | undefined, WalletException | undefined>> {
        const fill = this.exchangeFillRepo.create({
            sellOrder: sellOrder,
            buyOrder: buyOrder,
            value: value,
            sellerHash: sellerHash,
            buyerHash: buyerHash
        });

        const savedFill = await this.exchangeFillRepo.save(fill);
        if (!savedFill) {
            return Result.fail(WalletException.internalError('Error upon saving fill'));
        }

        const sellOrderFills = await this.exchangeFillRepo.find({ where: {
            sellOrderId: sellOrder.id
        } });

        const sellOrderAmountFilled = sellOrderFills.reduce((sum, cur) => sum += Number(cur.value), 0);
        if (sellOrderAmountFilled >= sellOrder.value) {
            sellOrder.complete = true;
        }

        const buyOrderFills = await this.exchangeFillRepo.find({ where: {
            buyOrderId: buyOrder.id
        } });

        const buyOrderAmountFilled = buyOrderFills.reduce((sum, cur) => sum += Number(cur.value), 0);
        if (buyOrderAmountFilled >= buyOrder.value) {
            buyOrder.complete = true;
        }

        await this.exchangeOrderRepo.save(buyOrder);
        await this.exchangeOrderRepo.save(sellOrder);

        return Result.ok(savedFill);
    }

    public async getSystemInfo(): Promise<Result<GetSystemInfoDTO.GetSystemInfoRequest | undefined, WalletException | undefined>> {
        const address = this.configService.props.exchange.bscAddress;
        const wattContract = this.configService.props.exchange.wattContract;
        const busdContract = this.configService.props.exchange.busdContract;

        const getBalanceRequest = new GetBalanceDTO.GetBalanceRequest();
        getBalanceRequest.fill(address);
        
        const addressBalanceGotten = await this.bscService.getBalance(getBalanceRequest);
        if (addressBalanceGotten.isFailure) {
            return Result.fail(addressBalanceGotten.getError()!);
        }

        const addressBalance = addressBalanceGotten.getValue()!.balance;

        getBalanceRequest.contract = busdContract;

        const busdBalanceGotten = await this.bscService.getBalance(getBalanceRequest);
        if (busdBalanceGotten.isFailure) {
            return Result.fail(busdBalanceGotten.getError()!);
        }

        const busdBalance = busdBalanceGotten.getValue()!.balance;

        getBalanceRequest.contract = wattContract;

        const wattBalanceGotten = await this.bscService.getBalance(getBalanceRequest);
        if (wattBalanceGotten.isFailure) {
            return Result.fail(wattBalanceGotten.getError()!);
        }

        const wattBalance = wattBalanceGotten.getValue()!.balance;

        const wattRateGotten = await this.getWattRate();
        if (wattRateGotten.isFailure) {
            return Result.fail(wattRateGotten.getError()!);
        }

        const wattRate = wattRateGotten.getValue()!;

        const getSystemInfoResponse = new GetSystemInfoDTO.GetSystemInfoResponse(address, wattContract, busdContract, wattRate, addressBalance, busdBalance, wattBalance);
        
        return Result.ok(getSystemInfoResponse);
    }

    public async getCurrentOrders(request: GetCurrentOrdersDTO.GetCurrentOrderRequest): Promise<Result<GetCurrentOrdersDTO.GetCurrentOrderResponse | undefined, WalletException | undefined>> {
        const page = request.page || 1;
        const limit = request.limit || 10;

        const skip = (page - 1) * limit;
        
        const orders = await this.exchangeOrderRepo.find({ where: {
            confirmed: true,
            complete: false,
            userId: request.userId
        }, order: {
            id: "DESC"
        }, skip: skip, take: limit});

        const getCurrentOrdersResponse = new GetCurrentOrdersDTO.GetCurrentOrderResponse(orders);
        
        return Result.ok(getCurrentOrdersResponse);
    }

    public async getAccount(request: GetAccountDTO.GetAccountRequest): Promise<Result<GetAccountDTO.GetAccountResponse | undefined, WalletException | undefined>> {
        const [orders, count] = await this.exchangeOrderRepo.findAndCount({
            confirmed: true,
            complete: false,
            userId: request.userId
        });

        const wattOrders = orders.filter(o => o.side == 'SELL');
        const busdOrders = orders.filter(o => o.side == 'BUY');

        const wattOrderSum = wattOrders.reduce((sum, cur) => sum += cur.value, 0);
        const busdOrderSum = busdOrders.reduce((sum, cur) => sum += cur.value * cur.price, 0);

        const getAccountResponse = new GetAccountDTO.GetAccountResponse(this.format(wattOrderSum), this.format(busdOrderSum), count, wattOrders.length, busdOrders.length);

        return Result.ok(getAccountResponse);
    }

    public async getValue(request: GetValueDTO.GetValueRequest): Promise<Result<GetValueDTO.GetValueResponse | undefined, WalletException | undefined>> {
        const wattRateGotten = await this.getWattRate();
        if (wattRateGotten.isFailure) {
            return Result.fail(wattRateGotten.getError()!);
        }

        const rate = wattRateGotten.getValue()!;
        
        const valueInBusd = request.value / rate;
        const valueInWatt = request.value;
        
        const value = request.side == 'BUY' ? valueInBusd : valueInWatt;

        const getValueResponse = new GetValueDTO.GetValueResponse(this.format(value));

        return Result.ok(getValueResponse);
    }

    private async executeMatches(matches: Match[]) {
        for (const match of matches) {
            for (const buyer of match.buyers) {
                const sellerTransactionSent = await this.createAndSend(match.seller.address, String(buyer.amountFilled), this.configService.props.exchange.busdContract);
                if (sellerTransactionSent.isFailure) {
                    return Result.fail(sellerTransactionSent.getError()!);
                }

                const sellerHash = sellerTransactionSent.getValue()!;

                const buyerTransactionSent = await this.createAndSend(buyer.order.address, String(buyer.amountFilled), this.configService.props.exchange.wattContract);
                if (buyerTransactionSent.isFailure) {
                    return Result.fail(buyerTransactionSent.getError()!);
                }

                const buyerHash = buyerTransactionSent.getValue()!;

                await this.createFill(buyer.amountFilled, match.seller, buyer.order, sellerHash, buyerHash);
                await this.exchangeOrderRepo.save(buyer.order);
            }
        }
    }

    private async createAndSend(address: string, value: string, contract: string) {
        const createTransactionRequest = new CreateTransactionDTO.CreateTransactionRequest();
        createTransactionRequest.fill(
            this.configService.props.exchange.bscAddress,
            address,
            value,
            undefined,
            contract
        );

        const transactionCreated = await this.bscService.createTransaction(createTransactionRequest);
        if (transactionCreated.isFailure) {
            return Result.fail(transactionCreated.getError());
        }

        const transaction = transactionCreated.getValue()!;

        const transactionSigned = await this.web3Service.sign(transaction, this.configService.props.exchange.bscPrivateKey);
        if (transactionSigned.isFailure) {
            return Result.fail(WalletException.internalError('Error upon signing transaction'));
        }

        const { raw } = transactionSigned.getValue()!;

        const pushTransactionRequest = new PushTransactionDTO.PushTransactionRequest();
        pushTransactionRequest.rawData = raw;

        const transactionPushed = await this.bscService.pushTransaction(pushTransactionRequest);
        if (transactionPushed.isFailure) {
            return Result.fail(transactionPushed.getError()!);
        }

        const { hash } = transactionPushed.getValue()!;

        return Result.ok(hash);
    }

    public async confirmOrders() {
        const unconfirmedOrders = await this.exchangeOrderRepo.find({
            where: {
                confirmed: false
            }, take: 20
        });

        const wattRateGotten = await this.getWattRate();
        if (wattRateGotten.isFailure) {
            return Result.fail(wattRateGotten.getError()!);
        }

        const wattRate = wattRateGotten.getValue()!;

        for (const order of unconfirmedOrders) {
            const orderActualValue = order.side == 'BUY' ? this.format(order.value * wattRate) : this.format(order.value);
            const contract = order.side == 'BUY' ? this.configService.props.exchange.busdContract : this.configService.props.exchange.wattContract;
            const getTransactionListRequest = new GetTransactionListDTO.GetTransactionListRequest();
            getTransactionListRequest.fill(order.address, 1, 90, contract);

            const transactionListGotten = await this.bscService.getTransactionList(getTransactionListRequest);
            if (transactionListGotten.isFailure) {
                continue;
            }

            const { transactions } = transactionListGotten.getValue()!;

            const transaction = transactions.find(t => t.recipients[0].address.toLowerCase() == order.systemAddress.toLowerCase());
            if (!transaction || this.format(Number(transaction.actualAmount)) < orderActualValue) {
                continue;
            }

            order.confirmed = true;
            order.hash = transaction.hash;
            const savedOrder = await this.exchangeOrderRepo.save(order);
            if (!savedOrder) {
                continue;
            }
        }
    }

    private async getWattRate(): Promise<Result<number | undefined, WalletException | undefined>> {
        const wattRateGotten = await this.wisewinService.getWattRate();
        if (wattRateGotten.isFailure) {
            return Result.fail(WalletException.internalError('Error upon getting watt rate'));
        }

        const { rate } = wattRateGotten.getValue()!;

        return Result.ok(rate);
    }

    private format(value: number) {
        return Math.round(value * 10000) / 10000;
    }
}