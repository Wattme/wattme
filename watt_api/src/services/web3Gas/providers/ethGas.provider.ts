import { Injectable } from "@nestjs/common";
import { HttpService } from "nestjs-http-promise";
import { ConfigService } from "src/config/config.service";
import { RequestLogService } from "src/requestLog/requestLog.service";
import { Result } from "src/shared/concrete/Result";
import { IGetGasPriceData } from "../interfaces/getGasPriceData.interface";
import { evaluate } from 'mathjs';
import { IProvider } from "../interfaces/provider.interface";

export class ETHGasProvider implements IProvider {
    constructor(
        private configService: ConfigService,
        private httpService: HttpService,
        private requestLogService: RequestLogService
    ) {}
    
    public async getGasPrice(): Promise<Result<IGetGasPriceData | undefined, Error | undefined>> {
        const url = this.makeUrl(`ethgasAPI.json?api-key=${this.configService.props.ethgasstation.key}`);
        const log = await this.requestLogService.create('get', url)
        const before = new Date().getTime();

        try {
            const response = await this.httpService.get(url);
            const after = new Date().getTime();

            const responseTime = after - before;
            await this.requestLogService.setResponse(log, response.status, responseTime, JSON.stringify(response.data));

            const { data } = response;
            const getGasPriceData: IGetGasPriceData = {
                average: evaluate(`${data.average} * 100000000`).toString(),
                fast: evaluate(`${data.fast} * 100000000`).toString(),
                low: evaluate(`${data.safeLow} * 100000000`).toString()
            };

            return Result.ok(getGasPriceData);
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
        return `${this.configService.props.ethgasstation.url}${url}`;
    }
}