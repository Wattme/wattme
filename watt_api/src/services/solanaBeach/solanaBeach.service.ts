import { Injectable } from "@nestjs/common";
import { HttpService } from "nestjs-http-promise";
import { ConfigService } from "src/config/config.service";
import { RequestLogService } from "src/requestLog/requestLog.service";
import { Result } from "src/shared/concrete/Result";
import { IGetTransactionListData, Transaction, TransactionAccount } from "./interfaces/getTransactionListData.interface";

@Injectable()
export class SolanaBeachService {
    constructor(
        private configService: ConfigService,
        private httpService: HttpService,
        private requestLogService: RequestLogService
    ) {}

    // Not working idk
    public async getAddressTransactionList(address: string, limit: number, page: number): Promise<Result<IGetTransactionListData | undefined, Error | undefined>> {
        const offset = (page - 1) * limit;
        const url = this.makeUrl(`/account/${address}/transactions?limit=${limit}&offset=${offset}`);
        
        const log = await this.requestLogService.create('get', url);
        const before = new Date().getTime();

        try {
            const response = await this.httpService.get(url, {
                headers: {
                    'Authorization': `Bearer ${this.configService.props.solanaBeach.key}`
                }
            });

            const after = new Date().getTime();

            const responseTime = after - before;
            await this.requestLogService.setResponse(log, response.status, responseTime, JSON.stringify(response.data));

            const { data } = response;

            const getTransactionListData: IGetTransactionListData = {
                transactions: data.map((t: any) => {
                    return <Transaction>{
                        accounts: t.accounts.map((a: any) => {
                            return <TransactionAccount>{
                                account: a.account,
                                program: a.program
                            };
                        }),
                        blockNumber: t.blockNumber,
                        blocktime: t.blocktime,
                        index: t.index,
                        meta: {
                            fee: t.meta.fee,
                            postBalances: t.meta.postBalances,
                            preBalances: t.meta.preBalances
                        },
                        transactionHash: t.transactionHash,
                        valid: t.valid
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

    private makeUrl(url: string): string {
        return `${this.configService.props.solanaBeach.url}${url}`;
    }
}