import { Injectable } from "@nestjs/common";
import { HttpService } from "nestjs-http-promise";
import { ConfigService } from "src/config/config.service";
import { RequestLogService } from "src/requestLog/requestLog.service";
import { Result } from "src/shared/concrete/Result";
import { IGetTransactionListData } from "../interfaces/getTransactionListData.interface";
import { ITransaction } from "../interfaces/transaction.interface";
import { IProvider } from "../interfaces/provider.interface";
import { evaluate } from "mathjs";
import { IGetTransactionStatusData } from "../interfaces/getTransactionStatusData.interface";

export class EtherscanProvider implements IProvider {
    constructor(
        private configService: ConfigService,
        private httpService: HttpService,
        private requestLogService: RequestLogService
    ) { }

    public async getAddressTransactionList(address: string, page: number, limit: number): Promise<Result<IGetTransactionListData | undefined, Error | undefined>> {
        const url = this.makeUrl(`/?module=account&action=txlist&address=${address}&page=${page}&offset=${limit}&apikey=${this.configService.props.etherscan.key}`);
        const log = await this.requestLogService.create('get', url);
        const before = new Date().getTime();

        try {
            const response = await this.httpService.get(url);

            const after = new Date().getTime();

            const responseTime = after - before;
            await this.requestLogService.setResponse(log, response.status, responseTime, JSON.stringify(response.data));

            const { data } = response;
            const getTransactionListData: IGetTransactionListData = {
                transactions: data.result.map((t: Record<string, string>) => {
                    return <ITransaction>{
                        blockHash: t.blockHash,
                        blockNumber: Number(t.blockNumber),
                        confirmations: Number(t.confirmations),
                        gas: t.gas,
                        contractAddress: t.contractAddress,
                        cumulativeGasUsed: t.cumulativeGasUsed,
                        from: t.from,
                        to: t.to,
                        gasPrice: t.gasPrice,
                        gasUsed: t.gasUsed,
                        hash: t.hash,
                        isError: Number(t.isError),
                        input: t.input,
                        nonce: Number(t.nonce),
                        timestamp: Number(t.timeStamp),
                        transactionIndex: Number(t.transactionIndex),
                        txReceiptStatus: Number(t.txreceipt_status),
                        value: t.value,
                        fee: evaluate(`${t.gasUsed} * ${t.gasPrice}`)
                    };
                })
            };

            return Result.ok(getTransactionListData);
        } catch (ex: any) {
            if (ex.response != undefined) {
                const after = new Date().getTime();
                const responseTime = after - before;
                await this.requestLogService.setResponse(log, ex.response.status, responseTime, JSON.stringify(ex.response.data));
            }

            return Result.fail(ex);
        }
    }

    public async getAddressTransactionListERC20(address: string, contract: string, page: number, limit: number): Promise<Result<IGetTransactionListData | undefined, Error | undefined>> {
        const url = this.makeUrl(`/?module=account&action=tokentx&address=${address}&contractaddress=${contract}&page=${page}&offset=${limit}&apikey=${this.configService.props.etherscan.key}`);
        const log = await this.requestLogService.create('get', url);
        const before = new Date().getTime();

        try {
            const response = await this.httpService.get(url);

            const after = new Date().getTime();

            const responseTime = after - before;
            await this.requestLogService.setResponse(log, response.status, responseTime, JSON.stringify(response.data));

            const { data } = response;
            const getTransactionListData: IGetTransactionListData = {
                transactions: data.result.map((t: Record<string, string>) => {
                    const transaction = <ITransaction>{
                        blockHash: t.blockHash,
                        blockNumber: Number(t.blockNumber),
                        confirmations: Number(t.confirmations),
                        gas: t.gas,
                        contractAddress: t.contractAddress,
                        cumulativeGasUsed: t.cumulativeGasUsed,
                        from: t.from,
                        to: t.to,
                        gasPrice: t.gasPrice,
                        gasUsed: t.gasUsed,
                        hash: t.hash,
                        isError: Number(t.isError),
                        input: t.input,
                        nonce: Number(t.nonce),
                        timestamp: Number(t.timeStamp),
                        transactionIndex: Number(t.transactionIndex),
                        txReceiptStatus: Number(t.txreceipt_status),
                        value: t.value,
                        actualValue: t.value,
                        decimals: Number(t.tokenDecimal),
                        fee: evaluate(`${t.gasUsed} * ${t.gasPrice}`)
                    };

                    const multiplier = 10 ** (18 - transaction.decimals);
                    transaction.value = evaluate(`${transaction.value} * ${multiplier}`).toString();

                    return transaction;
                })
            };

            return Result.ok(getTransactionListData);
        } catch (ex: any) {
            if (ex.response != undefined) {
                const after = new Date().getTime();
                const responseTime = after - before;
                await this.requestLogService.setResponse(log, ex.response.status, responseTime, JSON.stringify(ex.response.data));
            }

            return Result.fail(ex);
        }
    }

    public async getTransactionStatus(hash: string): Promise<Result<IGetTransactionStatusData | undefined, Error | undefined>> {
        const url = this.makeUrl(`/?module=transaction&action=gettxreceiptstatus&txhash=${hash}&apikey=${this.configService.props.etherscan.key}`);
        const log = await this.requestLogService.create('get', url);
        const before = new Date().getTime();

        try {
            const response = await this.httpService.get(url);

            const after = new Date().getTime();

            const responseTime = after - before;
            await this.requestLogService.setResponse(log, response.status, responseTime, JSON.stringify(response.data));

            const { data } = response;
            const getTransactionStatusData: IGetTransactionStatusData = {
                status: data?.result?.status == '1' ? true : false
            };

            return Result.ok(getTransactionStatusData);
        } catch (ex: any) {
            if (ex.response != undefined) {
                const after = new Date().getTime();
                const responseTime = after - before;
                await this.requestLogService.setResponse(log, ex.response.status, responseTime, JSON.stringify(ex.response.data));
            }

            return Result.fail(ex);
        }
    }

    private makeUrl(url: string): string {
        return `${this.configService.props.etherscan.url}${url}`;
    }
}