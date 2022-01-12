import { Injectable } from "@nestjs/common";
import { CreateTransactionDTO, GetBalanceDTO, GetFeeDTO, GetMaxAmountDTO, GetTransactionListDTO, PushTransactionDTO } from "./dto";
import { Result } from "src/shared/concrete/Result";
import { WalletException } from "src/exceptions/wallet.exception";
import { TatumService } from "src/services/tatum/tatum.service";
import { BlockcypherService } from "src/services/blockcypher/blockcypher.service";
import { BitcoinfeesService } from "src/services/bitcoinfees/bitcoinfees.service";

@Injectable()
export class BTCService {
    constructor(
        private tatumService: TatumService,
        private blockcypherService: BlockcypherService,
        private bitcoinfeesService: BitcoinfeesService
    ) {}

    public async getFee(request: GetFeeDTO.GetFeeRequest): Promise<Result<GetFeeDTO.GetFeeResponse | undefined, WalletException | undefined>> {       
        const feeGotten = await this.bitcoinfeesService.getFee();
        if (feeGotten.isFailure) {
            return Result.fail(WalletException.internalError('Error upon getting network fee'));
        }

        const fee = feeGotten.getValue()!;
        
        const getFeeResponse = new GetFeeDTO.GetFeeResponse();
        getFeeResponse.fill(fee.fastestFee, fee.halfHourFee, fee.hourFee);

        return Result.ok(getFeeResponse);
    }

    public async getBalance(request: GetBalanceDTO.GetBalanceRequest): Promise<Result<GetBalanceDTO.GetBalanceResponse | undefined, WalletException | undefined>> {
        const balanceGotten = await this.tatumService.getBalance(request.address);
        if (balanceGotten.isFailure) {
            return Result.fail(WalletException.internalError('Error upon getting balance'));
        }

        const balance = balanceGotten.getValue()!;
        const finalBalance = Math.round((balance.incoming - balance.outgoing));

        const getBalanceResponse = new GetBalanceDTO.GetBalanceResponse();
        getBalanceResponse.fill(finalBalance);

        return Result.ok(getBalanceResponse);
    }

    public async getMaxAmount(request: GetMaxAmountDTO.GetMaxAmountRequest): Promise<Result<GetMaxAmountDTO.GetMaxAmountResponse | undefined, WalletException | undefined>> {        
        let transactionSizeCalculated = await this.blockcypherService.createTransaction(request.address, request.address, -1);
        if (transactionSizeCalculated.isFailure) {
            return Result.fail(WalletException.internalError('Error upon calculating transaction size by creating a dummy transaction'));
        }

        let transactionSize = transactionSizeCalculated.getValue()!.transaction.size;

        const transactionFee = request.fee != undefined ? Number(request.fee) * transactionSize : undefined;

        let dummyTransactionCreated = await this.blockcypherService.createTransaction(request.address, request.address, -1, transactionFee);
        if (dummyTransactionCreated.isFailure) {
            return Result.fail(WalletException.internalError('Error upon calculating transaction size by creating a dummy transaction'));
        }

        let dummyTransaction = dummyTransactionCreated.getValue()!.transaction;

        const getMaxAmountResponse = new GetMaxAmountDTO.GetMaxAmountResponse();
        getMaxAmountResponse.fill(dummyTransaction.total, dummyTransaction.fees, dummyTransaction.size);

        return Result.ok(getMaxAmountResponse);
    }

    public async getTransactionList(request: GetTransactionListDTO.GetTransactionListRequest): Promise<Result<GetTransactionListDTO.GetTransactionListResponse | undefined, WalletException | undefined>> {
        
        const transactionsGotten = await this.tatumService.getAddressTransactionList(request.address, request.page || 1, request.limit || 10);
        if (transactionsGotten.isFailure) {
            return Result.fail(WalletException.internalError('Error upon getting transactions'));
        }

        const { transactions } = transactionsGotten.getValue()!;

        const formattedTransactions: GetTransactionListDTO.Transaction[] = transactions.map(t => {
            const senderAddress = t.inputs[0].coin.address;
            const amount = t.inputs[0].coin.value;
            const utxoIndex = t.outputs.reverse().findIndex(o => o.address == senderAddress);
            const senderAddressOutputs = t.outputs.filter(o => o.address == senderAddress);

            if (utxoIndex != -1 && senderAddressOutputs.length > 1) {
                t.outputs.splice(utxoIndex, 1);
            }

            t.outputs = [t.outputs[0]];

            return {
                hash: t.hash,
                incoming: senderAddress != request.address,
                fee: t.fee,
                timestamp: t.time,
                amount: amount,
                senderAddress: senderAddress,
                recipients: t.outputs.map(o => {
                    return {
                        address: o.address,
                        amount: o.value
                    }
                }),
                confirmed: true
            };
        })

        const getTransactionListResponse = new GetTransactionListDTO.GetTransactionListResponse();
        getTransactionListResponse.fill(formattedTransactions);

        return Result.ok(getTransactionListResponse);
    }

    public async createTransaction(request: CreateTransactionDTO.CreateTransactionRequest): Promise<Result<CreateTransactionDTO.CreateTransactionResponse | undefined, WalletException | undefined>> {
        const getMaxAmountRequest = new GetMaxAmountDTO.GetMaxAmountRequest();
        getMaxAmountRequest.address = request.senderAddress;
        getMaxAmountRequest.fee = request.fee;
        
        const maxAmountGotten = await this.getMaxAmount(getMaxAmountRequest);
        if (maxAmountGotten.isFailure) {
            return Result.fail(maxAmountGotten.getError()!);
        }

        const maxAmount = maxAmountGotten.getValue()!;
        
        if (maxAmount.amount < request.amount) {
            return Result.fail(WalletException.insufficientBalance({
                transactionAmount: request.amount,
                allowedAmount: maxAmount.amount,
                address: request.senderAddress
            }));
        }

        let transactionFee: number | undefined;
        if (maxAmount.amount != request.amount && request.fee != undefined) {
            let transactionSizeCalculated = await this.blockcypherService.createTransaction(request.senderAddress, request.recipientAddress, request.amount);
            if (transactionSizeCalculated.isFailure) {
                return Result.fail(WalletException.internalError('Error upon calculating transaction size by creating a dummy transaction'));
            }

            let transactionSize = transactionSizeCalculated.getValue()!.transaction.size;

            transactionFee = Number(request.fee) * transactionSize;
        } else if (maxAmount.amount == request.amount) {
            transactionFee = maxAmount.fee;
        }

        const transactionCreated = await this.blockcypherService.createTransaction(request.senderAddress, request.recipientAddress, request.amount, transactionFee);
        if (transactionCreated.isFailure) {
            return Result.fail(WalletException.internalError('Error upon creating transaction'));
        }

        const transaction = transactionCreated.getValue()!.transaction;
        const inputs = transaction.inputs.map(i => {
            return {
                outputIndex: i.outputIndex,
                prevHash: i.prevHash
            };
        });
        const outputs = transaction.outputs.map(o => {
            return {
                address: o.addresses[0],
                value: o.value
            };
        });

        const createTransactionResponse = new CreateTransactionDTO.CreateTransactionResponse();
        createTransactionResponse.fill(transaction.fees, transaction.size, inputs, outputs);

        return Result.ok(createTransactionResponse);
    }

    public async pushTransaction(request: PushTransactionDTO.PushTransactionRequest): Promise<Result<PushTransactionDTO.PushTransactionResponse | undefined, WalletException | undefined>> {        
        const rawTransactionPushed = await this.blockcypherService.pushRawTransaction(request.rawData);
        if (rawTransactionPushed.isFailure) {
            return Result.fail(WalletException.internalError('Error upon pushing raw transaction'));
        }

        const { transaction } = rawTransactionPushed.getValue()!;

        const pushTransactionResponse = new PushTransactionDTO.PushTransactionResponse();
        pushTransactionResponse.fill(transaction.hash);
        
        return Result.ok(pushTransactionResponse);
    }
}