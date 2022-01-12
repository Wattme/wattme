import { HttpService } from "nestjs-http-promise";
import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "src/config/config.service";
import { Result } from "src/shared/concrete/Result";
import { ICreateTransactionData } from "./interfaces/createTransactionData.interface";
import { TransactionInput, TransactionOutput } from "./interfaces/transaction.interface";
import { IPushRawTransactionData } from "./interfaces/pushRawTransactionData.interface";
import { RequestLogService } from "src/requestLog/requestLog.service";
import { IGetFeeData } from "./interfaces/getFeeData.interface";

@Injectable()
export class BlockcypherService {
    constructor(
        @Inject('BLOCKCHAIN') private blockchain: string,
        private configService: ConfigService,
        private httpService: HttpService,
        private requestLogService: RequestLogService
    ) {}

    public async createTransaction(senderAddress: string, recipientAddress: string, amount: number, fee?: number): Promise<Result<ICreateTransactionData | undefined, Error | undefined>> {
        const url = this.makeUrl(`/txs/new?token=${this.configService.props.blockcypher.key}`);
        const body: Record<string, any> = {
            inputs: [{addresses: [senderAddress]}],
            outputs: [{addresses: [recipientAddress], value: amount}],
        };
        if (fee != undefined) {
            body.fees = fee;
        }

        const log = await this.requestLogService.create('post', url, JSON.stringify(body));
        const before = new Date().getTime();
        
        try {
            const response = await this.httpService.post(url, body);

            const after = new Date().getTime();

            const responseTime = after - before;
            await this.requestLogService.setResponse(log, response.status, responseTime, JSON.stringify(response.data));

            const { data } = response;
            const { tx } = data;

            const createTransactionData: ICreateTransactionData = {
                toSign: data.tosign,
                transaction: {
                    blockHeight: tx.block_height,
                    blockIndex: tx.block_index,
                    doubleSpend: tx.double_spend,
                    fees: tx.fees,
                    addresses: tx.addresses,
                    confirmations: tx.confirmations,
                    hash: tx.hash,
                    preference: tx.preference,
                    received: new Date(tx.received),
                    relayedBy: tx.relayed_by,
                    size: tx.size,
                    total: tx.total,
                    ver: tx.ver,
                    vinSz: tx.vin_sz,
                    voutSz: tx.vout_sz,
                    vsize: tx.vsize,
                    inputs: tx.inputs.map((i: any) => {
                        return <TransactionInput>{
                            addresses: i.addresses,
                            age: i.age,
                            outputIndex: i.output_index,
                            outputValue: i.output_value,
                            prevHash: i.prev_hash,
                            scriptType: i.script_type,
                            sequence: i.sequence
                        };
                    }),
                    outputs: tx.outputs.map((o: any) => {
                        return <TransactionOutput>{
                            addresses: o.addresses,
                            script: o.script,
                            scriptType: o.script_type,
                            value: o.value
                        };
                    })
                },
            };

            return Result.ok(createTransactionData);
        } catch (ex: any) {
            if (ex.response != undefined) {
                const after = new Date().getTime();
                const responseTime = after - before;
                await this.requestLogService.setResponse(log, ex.response.status, responseTime, JSON.stringify(ex.response.data));
            }

            return Result.fail(ex);
        }
    }

    public async pushRawTransaction(rawData: string): Promise<Result<IPushRawTransactionData | undefined, Error | undefined>> {
        const url = this.makeUrl(`/txs/push?token=${this.configService.props.blockcypher.key}`);
        const body = {
            tx: rawData
        };
        const log = await this.requestLogService.create('post', url, JSON.stringify(body));
        const before = new Date().getTime();

        try {
            const response = await this.httpService.post(url, body);

            const after = new Date().getTime();

            const responseTime = after - before;
            await this.requestLogService.setResponse(log, response.status, responseTime, JSON.stringify(response.data));

            const { data } = response;
            const { tx } = data;

            const pushRawTransactionData: IPushRawTransactionData = {
                transaction: {
                    blockHeight: tx.block_height,
                    blockIndex: tx.block_index,
                    doubleSpend: tx.double_spend,
                    fees: tx.fees,
                    addresses: tx.addresses,
                    confirmations: tx.confirmations,
                    hash: tx.hash,
                    preference: tx.preference,
                    received: new Date(tx.received),
                    relayedBy: tx.relayed_by,
                    size: tx.size,
                    total: tx.total,
                    ver: tx.ver,
                    vinSz: tx.vin_sz,
                    voutSz: tx.vout_sz,
                    vsize: tx.vsize,
                    inputs: tx.inputs.map((i: any) => {
                        return <TransactionInput>{
                            addresses: i.addresses,
                            age: i.age,
                            outputIndex: i.output_index,
                            outputValue: i.output_value,
                            prevHash: i.prev_hash,
                            scriptType: i.script_type,
                            sequence: i.sequence
                        };
                    }),
                    outputs: tx.outputs.map((o: any) => {
                        return <TransactionOutput>{
                            addresses: o.addresses,
                            script: o.script,
                            scriptType: o.script_type,
                            value: o.value
                        };
                    })
                },
            };

            return Result.ok(pushRawTransactionData);
        } catch (ex: any) {
            if (ex.response != undefined) {
                const after = new Date().getTime();
                const responseTime = after - before;
                await this.requestLogService.setResponse(log, ex.response.status, responseTime, JSON.stringify(ex.response.data));
            }
            
            return Result.fail(ex);
        }
    }

    public async getFee(): Promise<Result<IGetFeeData | undefined, Error | undefined>> {
        const url = this.makeUrl(`?token=${this.configService.props.blockcypher.key}`);

        const log = await this.requestLogService.create('get', url);
        const before = new Date().getTime();
        
        try {
            const response = await this.httpService.get(url);
            const after = new Date().getTime();

            const responseTime = after - before;
            await this.requestLogService.setResponse(log, response.status, responseTime, JSON.stringify(response.data));

            const { data } = response;

            const getFeeData: IGetFeeData = {
                fastestFee: data.high_fee_per_kb,
                halfHourFee: data.medium_fee_per_kb,
                hourFee: data.low_fee_per_kb
            };

            return Result.ok(getFeeData);
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
        return `${this.configService.props.blockcypher.url}/${this.blockchain}/main${url}`;
    }
}