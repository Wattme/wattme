import { ConsoleLogger, Inject, Injectable } from "@nestjs/common";
import { RequestLogService } from "src/requestLog/requestLog.service";
import { Result } from "src/shared/concrete/Result";
import Web3 from 'web3';
import { IGetBalanceData } from "./interfaces/getBalanceData.interface";
import { IGetNonceData } from "./interfaces/getNonceData.interface";
import { ICreateTransactionData } from "./interfaces/createTransactionData.interface";
import { IPushRawTransactionData } from "./interfaces/pushRawTransactionData.interface";
import { evaluate } from 'mathjs';
import erc20ABI from './constants/erc20ABI.json';
import { IGetBalanceERC20Data } from "./interfaces/getBalanceERC20Data.interface";
import { ICreateTransactionERC20Data } from "./interfaces/createTransactionERC20Data.interface";
import { IGetDecimalsERC20Data } from "./interfaces/getDecimalsERC20Data.interface";
import { ISignTransactionData } from "./interfaces/signTransactionData.interface";
import { IConvertTokenValueData } from "./interfaces/convertTokenValueData.interface";

@Injectable()
export class Web3Service {
    private web3: Web3;

    constructor(
        @Inject('RPC_PROVIDER') rpcProvider: string,
        @Inject('CHAIN_ID') private chainID: number,
        @Inject('GAS_LIMIT') private gasLimit: string,
        @Inject('GAS_LIMIT_ERC20') private gasLimitERC20: string,
        private requestLogService: RequestLogService
    ) {
        this.web3 = new Web3(rpcProvider);
    }

    public async getBalance(address: string): Promise<Result<IGetBalanceData | undefined, Error | undefined>> {
        const log = await this.requestLogService.create('get', this.makeUrl(`eth.getBalance()`), address);
        const before = new Date().getTime();

        try {
            const result = await this.web3.eth.getBalance(address);
            const after = new Date().getTime();

            const responseTime = after - before;
            await this.requestLogService.setResponse(log, 0, responseTime, result)

            const getBalanceData: IGetBalanceData = {
                balance: result
            };

            return Result.ok(getBalanceData);
        } catch (ex: any) {
            const after = new Date().getTime();
            const responseTime = after - before;
            await this.requestLogService.setResponse(log, 0, responseTime, ex.message?.toString() || ex.toString());

            return Result.fail(ex);
        }
    }

    public async getBalanceERC20(address: string, contractAddress: string): Promise<Result<IGetBalanceData | undefined, Error | undefined>> {
        const log = await this.requestLogService.create('get', this.makeUrl(`contract.methods.balanceOf()`), JSON.stringify({ address, contractAddress }));
        const before = new Date().getTime();

        try {
            const contract = new this.web3.eth.Contract(erc20ABI as any, contractAddress);
            const result = await contract.methods.balanceOf(address).call();

            const decimalsGotten = await this.getDecimalsERC20(contractAddress);
            if (decimalsGotten.isFailure) {
                throw decimalsGotten.getError();
            }

            const { decimals } = decimalsGotten.getValue()!;
            const multiplier = 10 ** (18 - decimals);

            const after = new Date().getTime();

            const responseTime = after - before;
            await this.requestLogService.setResponse(log, 0, responseTime, result)

            const getBalanceERC20Data: IGetBalanceERC20Data = {
                balance: evaluate(`${result} * ${multiplier}`).toString()
            };

            return Result.ok(getBalanceERC20Data);
        } catch (ex: any) {
            const after = new Date().getTime();
            const responseTime = after - before;
            await this.requestLogService.setResponse(log, 0, responseTime, ex.message?.toString() || ex.toString());

            return Result.fail(ex);
        }
    }

    public async createTransaction(senderAddress: string, recipientAddress: string, amount: string, fee: string) {
        const log = await this.requestLogService.create('get', this.makeUrl(`new ethereumjs-tx.Transaction()`), JSON.stringify({ senderAddress, recipientAddress, amount, fee }));
        const before = new Date().getTime();

        try {
            const nonceGotten = await this.getNonce(senderAddress);
            if (nonceGotten.isFailure) {
                throw nonceGotten.getError();
            }

            const nonce = nonceGotten.getValue()!.nonce;

            const txObject = {
                nonce: this.web3.utils.toHex(nonce),
                from: senderAddress,
                to: recipientAddress,
                value: this.web3.utils.toHex(amount),
                chainID: this.chainID,
                gasLimit: this.web3.utils.toHex(this.gasLimit),
                gasPrice: this.web3.utils.toHex(fee)
            };

            const after = new Date().getTime();

            const responseTime = after - before;
            await this.requestLogService.setResponse(log, 0, responseTime, JSON.stringify(txObject));

            const createTransactionData: ICreateTransactionData = {
                transaction: {
                    ...txObject,
                    maxGas: evaluate(`${this.gasLimit} * ${fee}`).toString()
                }
            };

            return Result.ok(createTransactionData);
        } catch (ex: any) {
            const after = new Date().getTime();
            const responseTime = after - before;
            await this.requestLogService.setResponse(log, 0, responseTime, ex.message?.toString() || ex.toString());

            return Result.fail(ex);
        }
    }

    public async convertTokenValue(value: string, contractAddress: string): Promise<Result<IConvertTokenValueData | undefined, Error | undefined>> {
        const decimalsGotten = await this.getDecimalsERC20(contractAddress);
        if (decimalsGotten.isFailure) {
            throw decimalsGotten.getError();
        }

        const { decimals } = decimalsGotten.getValue()!;
        const multiplier = 10 ** (18 - decimals);
        
        const convertTokenValueData: IConvertTokenValueData = {
            value: evaluate(`round(${value} * (10^${decimals}))`).toString()
        };

        return Result.ok(convertTokenValueData);
    }

    public async createTransactionERC20(senderAddress: string, recipientAddress: string, amount: string, contractAddress: string, fee: string) {
        const log = await this.requestLogService.create('get', this.makeUrl(`contract.methods.transfer()`), JSON.stringify({ senderAddress, recipientAddress, amount, contractAddress, fee }));
        const before = new Date().getTime();

        try {
            const contract = new this.web3.eth.Contract(erc20ABI as any, contractAddress);

            const decimalsGotten = await this.getDecimalsERC20(contractAddress);
            if (decimalsGotten.isFailure) {
                throw decimalsGotten.getError();
            }

            const { decimals } = decimalsGotten.getValue()!;

            const value = evaluate(`round(${amount} * (10^${decimals}))`).toString();

            const data = await contract.methods.transfer(recipientAddress, this.web3.utils.toHex(value)).encodeABI();

            const nonceGotten = await this.getNonce(senderAddress);
            if (nonceGotten.isFailure) {
                throw nonceGotten.getError();
            }

            const nonce = nonceGotten.getValue()!.nonce;

            const txObject = {
                nonce: nonce,
                from: senderAddress,
                to: contractAddress,
                value: this.web3.utils.toHex(0), //
                chainID: this.chainID,
                gasLimit: this.web3.utils.toHex(this.gasLimitERC20),
                gasPrice: this.web3.utils.toHex(fee),
                data: data
            };

            const after = new Date().getTime();

            const responseTime = after - before;
            await this.requestLogService.setResponse(log, 0, responseTime, JSON.stringify(txObject));

            const createTransactionData: ICreateTransactionERC20Data = {
                transaction: {
                    ...txObject as any,
                    maxGas: evaluate(`${this.gasLimitERC20} * ${fee}`).toString()
                }
            };

            return Result.ok(createTransactionData);
        } catch (ex: any) {
            const after = new Date().getTime();
            const responseTime = after - before;
            await this.requestLogService.setResponse(log, 0, responseTime, ex.message?.toString() || ex.toString());

            return Result.fail(ex);
        }
    }

    public async getDecimalsERC20(contractAddress: string): Promise<Result<IGetDecimalsERC20Data | undefined, Error | undefined>> {
        const log = await this.requestLogService.create('get', this.makeUrl(`contract.methods.decimals()`), contractAddress);
        const before = new Date().getTime();

        try {
            const contract = new this.web3.eth.Contract(erc20ABI as any, contractAddress);

            const decimals = await contract.methods.decimals().call();

            const after = new Date().getTime();
            const responseTime = after - before;
            await this.requestLogService.setResponse(log, 0, responseTime, decimals);

            const getDecimalsERC20Data: IGetDecimalsERC20Data = {
                decimals
            };

            return Result.ok(getDecimalsERC20Data);
        } catch (ex: any) {
            const after = new Date().getTime();
            const responseTime = after - before;
            await this.requestLogService.setResponse(log, 0, responseTime, ex.message?.toString() || ex.toString());

            return Result.fail(ex);
        }
    }

    public async getNonce(address: string): Promise<Result<IGetNonceData | undefined, Error | undefined>> {
        const log = await this.requestLogService.create('get', this.makeUrl(`eth.getTransactionCount()`), address);
        const before = new Date().getTime();

        try {
            const nonce = await this.web3.eth.getTransactionCount(address);
            const after = new Date().getTime();

            const responseTime = after - before;
            await this.requestLogService.setResponse(log, 0, responseTime, String(nonce));

            const getNonceData: IGetNonceData = {
                nonce: nonce
            };

            return Result.ok(getNonceData);
        } catch (ex: any) {
            const after = new Date().getTime();
            const responseTime = after - before;
            await this.requestLogService.setResponse(log, 0, responseTime, ex.message?.toString() || ex.toString());

            return Result.fail(ex);
        }
    }

    public async pushRawTransaction(rawData: string): Promise<Result<IPushRawTransactionData | undefined, Error | undefined>> {
        const log = await this.requestLogService.create('get', this.makeUrl(`eth.sendSignedTransaction()`), rawData);
        const before = new Date().getTime();

        try {
            const transaction = await this.web3.eth.sendSignedTransaction(rawData);
            const after = new Date().getTime();

            const responseTime = after - before;
            await this.requestLogService.setResponse(log, 0, responseTime, JSON.stringify(transaction));

            const pushRawTransactionData: IPushRawTransactionData = {
                transaction: {
                    blockHash: transaction.blockHash,
                    blockNumber: transaction.blockNumber,
                    cumulativeGasUsed: String(transaction.cumulativeGasUsed),
                    from: transaction.from,
                    to: transaction.to,
                    gasUsed: String(transaction.gasUsed),
                    status: transaction.status,
                    transactionHash: transaction.transactionHash,
                    transactionIndex: transaction.transactionIndex,
                    contractAddress: transaction.contractAddress
                }
            };

            return Result.ok(pushRawTransactionData);
        } catch (ex: any) {
            const after = new Date().getTime();
            const responseTime = after - before;
            await this.requestLogService.setResponse(log, 0, responseTime, ex.message?.toString() || ex.toString());

            return Result.fail(ex);
        }
    }

    public async sign(tx: any, privateKey: string): Promise<Result<ISignTransactionData | undefined, Error | undefined>> {
        tx.nonce = this.web3.utils.toHex(tx.nonce);
        tx.chainID = this.web3.utils.toHex(tx.chainID);

        const data = await this.web3.eth.accounts.signTransaction({
            ...tx
        }, privateKey);

        const signTransactionData: ISignTransactionData = {
            raw: data.rawTransaction!
        };

        return Result.ok(signTransactionData);
    }

    private makeUrl(method: string): string {
        const currentProvider = (<any>this.web3.currentProvider)?.host || '';
        return `${currentProvider}->${method}`;
    }
}