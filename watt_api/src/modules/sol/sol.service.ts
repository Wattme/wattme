import { Injectable } from "@nestjs/common";
import { evaluate, re } from "mathjs";
import { WalletException } from "src/exceptions/wallet.exception";
import { SolanaBeachService } from "src/services/solanaBeach/solanaBeach.service";
import { SolWeb3Service } from "src/services/solWeb3/solWeb3.service";
import { Result } from "src/shared/concrete/Result";
import { text } from "stream/consumers";
import { CreateTransactionDTO } from "./dto/createTransaction.dto";
import { GetBalanceDTO } from "./dto/getBalance.dto";
import { GetFeeDTO } from "./dto/getFee.dto";
import { GetMaxAmountDTO } from "./dto/getMaxAmount.dto";
import { GetTransactionListDTO } from "./dto/getTransactionList.dto";

@Injectable()
export class SolService {
    constructor(
        private solWeb3Service: SolWeb3Service,
        private solanaBeachService: SolanaBeachService
    ) {}

    public async getFee(request: GetFeeDTO.GetFeeRequest): Promise<Result<GetFeeDTO.GetFeeResponse | undefined, WalletException | undefined>> {
        const feeGotten = await this.solWeb3Service.getFee();
        if (feeGotten.isFailure) {
            return Result.fail(WalletException.internalError('Error upon getting fee'));
        }

        const { fee } = feeGotten.getValue()!;

        const getFeeResponse = new GetFeeDTO.GetFeeResponse();
        getFeeResponse.fill(fee, fee, fee);

        return Result.ok(getFeeResponse);
    }

    public async getBalance(request: GetBalanceDTO.GetBalanceRequest): Promise<Result<GetBalanceDTO.GetBalanceResponse | undefined, WalletException | undefined>> {
        const balanceGotten = await this.solWeb3Service.getBalance(request.address);
        if (balanceGotten.isFailure) {
            return Result.fail(WalletException.internalError('Error upon getting balance'));
        }

        const { balance } = balanceGotten.getValue()!;

        const getBalanceResponse = new GetBalanceDTO.GetBalanceResponse();
        getBalanceResponse.fill(balance);

        return Result.ok(getBalanceResponse);
    }

    public async getMaxAmount(request: GetMaxAmountDTO.GetMaxAmountRequest): Promise<Result<GetMaxAmountDTO.GetMaxAmountResponse | undefined, WalletException | undefined>> {
        const getFeeRequest = new GetFeeDTO.GetFeeRequest();
        const feeGotten = await this.getFee(getFeeRequest);
        if (feeGotten.isFailure) {
            return Result.fail(feeGotten.getError()!);
        }

        const fee = feeGotten.getValue()!.mediumFee;

        const getBalanceRequest = new GetBalanceDTO.GetBalanceRequest();
        getBalanceRequest.fill(request.address);
        const balanceGotten = await this.getBalance(getBalanceRequest);
        if (balanceGotten.isFailure) {
            return Result.fail(balanceGotten.getError()!);
        }

        const { balance } = balanceGotten.getValue()!;

        let maxAmount: string = evaluate(`${balance} - ${fee}`).toString();
        if (evaluate(`${maxAmount} < 0`)) {
            maxAmount = '0';
        }

        const getMaxAmountResponse = new GetMaxAmountDTO.GetMaxAmountResponse();
        getMaxAmountResponse.fill(maxAmount, fee);

        return Result.ok(getMaxAmountResponse);
    }

    public async getTransactionList(request: GetTransactionListDTO.GetTransactionListRequest): Promise<Result<GetTransactionListDTO.GetTransactionListResponse | undefined, WalletException | undefined>> {
        const transactionListGotten = await this.solanaBeachService.getAddressTransactionList(request.address, request.limit || 10, request.page || 1);
        if (transactionListGotten.isFailure) {
            return Result.fail(WalletException.internalError('Error upon getting transaction list'));
        }

        const { transactions } = transactionListGotten.getValue()!;
        
        const formattedTransactions: GetTransactionListDTO.Transaction[] = transactions.map(t => {
            const incoming = t.accounts[0]?.account?.address != request.address;
            const transactionValue = Math.abs(t.meta.preBalances[1] - t.meta.postBalances[1]);

            const recipients: GetTransactionListDTO.Transaction['recipients'] = [];
            for (const index in t.accounts) {
                const account = t.accounts[index];
                const value = Math.abs(t.meta.preBalances[index] - t.meta.postBalances[index]) || 0

                recipients.push({
                    address: account.account.address,
                    amount: value.toString()
                });
            }

            return {
                hash: t.transactionHash,
                amount: transactionValue.toString(),
                confirmed: t.valid,
                fee: t.meta.fee.toString(),
                incoming: incoming,
                recipients: recipients,
                senderAddress: t.accounts[0].account.address,
                timestamp: t.blocktime.absolute
            };
        });

        const getTransactionListResponse = new GetTransactionListDTO.GetTransactionListResponse();
        getTransactionListResponse.fill(formattedTransactions);

        return Result.ok(getTransactionListResponse);
    }

    public async createTransaction(request: CreateTransactionDTO.CreateTransactionRequest): Promise<Result<CreateTransactionDTO.CreateTransactionResponse | undefined, WalletException | undefined>> {
        const getMaxAmountRequest = new GetMaxAmountDTO.GetMaxAmountRequest();
        getMaxAmountRequest.fill(request.senderAddress);
        const maxAmountGotten = await this.getMaxAmount(getMaxAmountRequest);
        if (maxAmountGotten.isFailure) {
            return Result.fail(maxAmountGotten.getError()!);
        }

        const maxAmount = maxAmountGotten.getValue()!;

        if (evaluate(`${maxAmount.amount} < ${request.amount}`)) {
            return Result.fail(WalletException.insufficientBalance({
                transactionAmount: request.amount,
                allowedAmount: maxAmount.amount,
                address: request.senderAddress
            }));
        }

        const transactionCreated = await this.solWeb3Service.createTransaction(request.senderAddress, request.recipientAddress, request.amount);
        if (transactionCreated.isFailure) {
            return Result.fail(WalletException.internalError('Error upon creating transaction'));
        }

        const { transaction } = transactionCreated.getValue()!;

        const createTransactionResponse = new CreateTransactionDTO.CreateTransactionResponse();
        createTransactionResponse.transaction = transaction;

        return Result.ok(createTransactionResponse);
    }
}