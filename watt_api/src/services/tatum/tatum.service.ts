import { HttpService } from "nestjs-http-promise";
import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "src/config/config.service";
import { Result } from "src/shared/concrete/Result";
import { IGetBalanceData } from "./interfaces/getBalanceData.interface";
import { IGetTransactionListData } from "./interfaces/getTransactionListData.interface";
import { RequestLogService } from "src/requestLog/requestLog.service";

@Injectable()
export class TatumService {
    constructor(
        @Inject('BLOCKCHAIN') private blockchain: string,
        private configService: ConfigService,
        private httpService: HttpService,
        private requestLogService: RequestLogService
    ) {}

    public async getBalance(address: string): Promise<Result<IGetBalanceData | undefined, Error | undefined>> {
        const url = this.makeUrl(`/address/balance/${address}`);
        const log = await this.requestLogService.create('get', url);
        const before = new Date().getTime();

        try {
            const response = await this.httpService.get(url, {
                headers: {
                    'x-api-key': this.configService.props.tatum.key
                }
            });

            const after = new Date().getTime();

            const responseTime = after - before;
            await this.requestLogService.setResponse(log, response.status, responseTime, JSON.stringify(response.data));

            const { data } = response;
            const getBalanceData: IGetBalanceData = {
                incoming: parseFloat(data.incoming || '0') * 100000000,
                outgoing: parseFloat(data.outgoing || '0') * 100000000
            };

            return Result.ok(getBalanceData);
        } catch (ex: any) {
            if (ex.response != undefined) {
                const after = new Date().getTime();
                const responseTime = after - before;
                await this.requestLogService.setResponse(log, ex.response.status, responseTime, JSON.stringify(ex.response.data));
            }

            return Result.fail(ex);
        }
    }

    public async getAddressTransactionList(address: string, page: number, limit: number): Promise<Result<IGetTransactionListData | undefined, Error | undefined>> {
        const offset = (page - 1) * limit;
        const url = this.makeUrl(`/transaction/address/${address}?pageSize=${limit}&offset=${offset}`);
        const log = await this.requestLogService.create('get', url);
        const before = new Date().getTime();

        try {
            const response = await this.httpService.get(url, {
                headers: {
                    'x-api-key': this.configService.props.tatum.key
                }
            });

            const after = new Date().getTime();

            const responseTime = after - before;
            await this.requestLogService.setResponse(log, response.status, responseTime, JSON.stringify(response.data));

            const { data } = response;
            const getTransactionListData: IGetTransactionListData = {
                transactions: data
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

    private makeUrl(url: string): string {
        return `${this.configService.props.tatum.url}/${this.blockchain}${url}`;
    }
}