import { evaluate } from "mathjs";
import { WalletException } from "src/exceptions/wallet.exception";
import { ICreateTransactionData } from "src/services/web3/interfaces/createTransactionData.interface";
import { ICreateTransactionERC20Data } from "src/services/web3/interfaces/createTransactionERC20Data.interface";
import { Web3Service } from "src/services/web3/web3.service";
import { Web3GasService } from "src/services/web3Gas/web3Gas.service";
import { IGetTransactionListData } from "src/services/web3Scan/interfaces/getTransactionListData.interface";
import { Web3ScanService } from "src/services/web3Scan/web3Scan.service";
import { Result } from "src/shared/concrete/Result";
import { CreateTransactionDTO, GetBalanceDTO, GetFeeDTO, GetMaxAmountDTO, GetTransactionListDTO, PushTransactionDTO } from "./dto";
import { GetTransactionStatusDTO } from "./dto/getTransactionStatus.dto";

export class Web3BaseService {
    constructor(
        private web3GasService: Web3GasService,
        private web3ScanService: Web3ScanService,
        private web3Service: Web3Service
    ) {}

    public async getFee(request: GetFeeDTO.GetFeeRequest): Promise<Result<GetFeeDTO.GetFeeResponse | undefined, WalletException | undefined>> {
        const feeGotten = await this.web3GasService.getGasPrice();
        if (feeGotten.isFailure) {
            return Result.fail(WalletException.internalError('Error upon getting fee'));
        }

        const fee = feeGotten.getValue()!;

        const getFeeResponse = new GetFeeDTO.GetFeeResponse();
        getFeeResponse.fill(fee.fast, fee.average, fee.low);

        return Result.ok(getFeeResponse);
    }

    public async getBalance(request: GetBalanceDTO.GetBalanceRequest): Promise<Result<GetBalanceDTO.GetBalanceResponse | undefined, WalletException | undefined>> {
        let balance = '0';

        if (request.contract == request.address) {
            return Result.fail(WalletException.invalidData('Contract and account addresses are the same'));
        }

        if (request.contract == undefined) {
            const balanceGotten = await this.web3Service.getBalance(request.address);
            if (balanceGotten.isFailure) {
                return Result.fail(WalletException.internalError('Error upon getting balance'));
            }

            balance = balanceGotten.getValue()!.balance;
        } else {
            const tokenBalanceGotten = await this.web3Service.getBalanceERC20(request.address, request.contract);
            if (tokenBalanceGotten.isFailure) {
                return Result.fail(WalletException.internalError('Error upon getting token balance'));
            }

            balance = tokenBalanceGotten.getValue()!.balance;
        }

        const getBalanceResponse = new GetBalanceDTO.GetBalanceResponse();
        getBalanceResponse.fill(balance);

        return Result.ok(getBalanceResponse);
    }

    public async getMaxAmount(request: GetMaxAmountDTO.GetMaxAmountRequest): Promise<Result<GetMaxAmountDTO.GetMaxAmountResponse | undefined, WalletException | undefined>> {
        if (request.contract == request.address) {
            return Result.fail(WalletException.invalidData('Contract and account addresses are the same'));
        }
        
        if (request.fee == undefined) {
            const getFeeRequest = new GetFeeDTO.GetFeeRequest();
            const feeGotten = await this.getFee(getFeeRequest);
            if (feeGotten.isFailure) {
                return Result.fail(WalletException.internalError('Error upon getting fee'));
            }

            const fee = feeGotten.getValue()!;
            request.fee = fee.mediumFee;
        }

        let transactionData: ICreateTransactionData | ICreateTransactionERC20Data;
        let tokenBalance: string | undefined;

        if (request.contract == undefined) {
            const transactionCreated = await this.web3Service.createTransaction(request.address, request.address, "10", request.fee);
            if (transactionCreated.isFailure) {
                return Result.fail(WalletException.internalError('Error upon creating transaction'));
            }

            transactionData = transactionCreated.getValue()!;
        } else {
            const transactionCreated = await this.web3Service.createTransactionERC20(request.address, request.address, "1", request.contract, request.fee);
            if (transactionCreated.isFailure) {
                return Result.fail(WalletException.internalError('Error upon creating transaction'));
            }

            transactionData = transactionCreated.getValue()!;

            const getTokenBalanceRequest = new GetBalanceDTO.GetBalanceRequest();
            getTokenBalanceRequest.fill(request.address, request.contract);
            const tokenBalanceGotten = await this.getBalance(getTokenBalanceRequest);
            if (tokenBalanceGotten.isFailure) {
                return Result.fail(WalletException.internalError('Error upon getting token balance'));
            }

            tokenBalance = tokenBalanceGotten.getValue()!.balance;
        }

        const getBalanceRequest = new GetBalanceDTO.GetBalanceRequest();
        getBalanceRequest.fill(request.address);
        const balanceGotten = await this.getBalance(getBalanceRequest);
        if (balanceGotten.isFailure) {
            return Result.fail(WalletException.internalError('Error upon getting balance'));
        }

        const { balance } = balanceGotten.getValue()!;

        let maxAmount = evaluate(`${balance} - ${transactionData.transaction.maxGas}`).toString();
        if (evaluate(`${maxAmount} <= 0`)) {
            maxAmount = '0';
        }

        const balanceSlice = Number(balance.split('').reverse().slice(0, 8).reverse().join(''));
        const presumedBalanceSlice = Number(evaluate(`${maxAmount} + ${transactionData.transaction.maxGas}`).toString().split('').reverse().slice(0, 8).reverse().join(''));

        const diff = (presumedBalanceSlice - balanceSlice);

        if (presumedBalanceSlice > 0) {
            maxAmount = evaluate(`${maxAmount} - ${diff}`).toString();
        }

        const getMaxAmountResponse = new GetMaxAmountDTO.GetMaxAmountResponse();
        getMaxAmountResponse.fill(request.contract == undefined ? maxAmount : tokenBalance, transactionData.transaction.maxGas);

        return Result.ok(getMaxAmountResponse);
    }

    public async getTransactionList(request: GetTransactionListDTO.GetTransactionListRequest): Promise<Result<GetTransactionListDTO.GetTransactionListResponse | undefined, WalletException | undefined>> {
        if (request.contract == request.address) {
            return Result.fail(WalletException.invalidData('Contract and account addresses are the same'));
        }
        
        let transactionsData: IGetTransactionListData;

        if (request.contract == undefined) {
            const transactionsGotten = await this.web3ScanService.getAddressTransactionList(request.address, request.page || 1, request.limit || 10);
            if (transactionsGotten.isFailure) {
                return Result.fail(WalletException.internalError('Error upon getting transactions'));
            }

            transactionsData = transactionsGotten.getValue()!;
        } else {
            const transactionsGotten = await this.web3ScanService.getAddressTransactionListERC20(request.address, request.contract, request.page || 1, request.limit || 10);
            if (transactionsGotten.isFailure) {
                return Result.fail(WalletException.internalError('Error upon getting transactions'));
            }

            transactionsData = transactionsGotten.getValue()!;
        }

        const formattedTransactions: GetTransactionListDTO.Transaction[] = transactionsData.transactions.map(t => {
            return {
                hash: t.hash,
                incoming: t.from != request.address,
                fee: t.fee,
                timestamp: t.timestamp,
                amount: t.value,
                senderAddress: t.from,
                recipients: [{ address: t.to, amount: t.value }],
                confirmed: t.confirmations > 10,
                actualAmount: t.actualValue || t.value
            };
        })

        const getTransactionListResponse = new GetTransactionListDTO.GetTransactionListResponse();
        getTransactionListResponse.fill(formattedTransactions);

        return Result.ok(getTransactionListResponse);
    }

    public async getTransactionStatus(request: GetTransactionStatusDTO.GetTransactionStatusRequest): Promise<Result<GetTransactionStatusDTO.GetTransactionStatusResponse | undefined, WalletException | undefined>> {
        const transactionStatusGotten = await this.web3ScanService.getTransactionStatus(request.hash);
        if (transactionStatusGotten.isFailure) {
            return Result.fail(WalletException.internalError('Error upon getting transaction status'));
        }

        const { status } = transactionStatusGotten.getValue()!;

        const getTransactionStatusResponse = new GetTransactionStatusDTO.GetTransactionStatusResponse(status);

        return Result.ok(getTransactionStatusResponse);
    }

    public async createTransaction(request: CreateTransactionDTO.CreateTransactionRequest): Promise<Result<CreateTransactionDTO.CreateTransactionResponse | undefined, WalletException | undefined>> {
        if (request.contract == request.senderAddress) {
            return Result.fail(WalletException.invalidData('Contract and account addresses are the same'));
        }
        
        if (request.fee == undefined) {
            const getFeeRequest = new GetFeeDTO.GetFeeRequest();
            const feeGotten = await this.getFee(getFeeRequest);
            if (feeGotten.isFailure) {
                return Result.fail(WalletException.internalError('Error upon getting fee'));
            }

            const fee = feeGotten.getValue()!;
            request.fee = fee.mediumFee;
        }

        let value = request.amount;
        if (request.contract) {
            const valueConverted = await this.web3Service.convertTokenValue(request.amount, request.contract);
            if (valueConverted.isFailure) {
                return Result.fail(WalletException.internalError('Error upon converting token value'));
            }

            value = valueConverted.getValue()!.value;
        }

        const getMaxAmountRequest = new GetMaxAmountDTO.GetMaxAmountRequest();
        getMaxAmountRequest.fill(request.senderAddress, request.contract, request.fee);
        const maxAmountGotten = await this.getMaxAmount(getMaxAmountRequest);
        if (maxAmountGotten.isFailure) {
            return Result.fail(WalletException.internalError('Error upon getting max amount'));
        }

        const maxAmount = maxAmountGotten.getValue()!;

        if (evaluate(`${maxAmount.amount} < ${value}`)) {
            return Result.fail(WalletException.insufficientBalance({
                transactionAmount: request.amount,
                allowedAmount: maxAmount.amount,
                address: request.senderAddress
            }));
        }

        let transactionData: ICreateTransactionData | ICreateTransactionERC20Data;

        if (request.contract == undefined) {
            const transactionCreated = await this.web3Service.createTransaction(request.senderAddress, request.recipientAddress, request.amount, request.fee);
            if (transactionCreated.isFailure) {
                return Result.fail(WalletException.internalError('Error upon creating transaction'));
            }

            transactionData = transactionCreated.getValue()!;
        } else {
            const transactionCreated = await this.web3Service.createTransactionERC20(request.senderAddress, request.recipientAddress, request.amount, request.contract, request.fee);
            if (transactionCreated.isFailure) {
                return Result.fail(WalletException.internalError('Error upon creating transaction'));
            }

            transactionData = transactionCreated.getValue()!;
        }

        const createTransactionResponse = new CreateTransactionDTO.CreateTransactionResponse();
        createTransactionResponse.fill(transactionData.transaction.from, transactionData.transaction.to, transactionData.transaction.value, transactionData.transaction.chainID, transactionData.transaction.gasLimit, transactionData.transaction.gasPrice, transactionData.transaction.maxGas, transactionData.transaction.nonce, (<any>transactionData).transaction.data);

        return Result.ok(createTransactionResponse);
    }

    public async pushTransaction(request: PushTransactionDTO.PushTransactionRequest): Promise<Result<PushTransactionDTO.PushTransactionResponse | undefined, WalletException | undefined>> {
        const rawTransactionPushed = await this.web3Service.pushRawTransaction(request.rawData);
        if (rawTransactionPushed.isFailure) {
            return Result.fail(WalletException.internalError('Error upon pushing raw transaction'));
        }

        const { transaction } = rawTransactionPushed.getValue()!;

        const pushTransactionResponse = new PushTransactionDTO.PushTransactionResponse();
        pushTransactionResponse.fill(transaction.transactionHash);

        return Result.ok(pushTransactionResponse);
    }
}