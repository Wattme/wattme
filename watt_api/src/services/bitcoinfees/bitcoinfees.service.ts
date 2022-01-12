import { HttpService } from "nestjs-http-promise";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "src/config/config.service";
import { Result } from "src/shared/concrete/Result";
import { IGetFeeData } from "./interfaces/getFeeData.interface";
import { RequestLogService } from '../../requestLog/requestLog.service';
import { AxiosError } from "axios";

@Injectable()
export class BitcoinfeesService {
    constructor(
        private configService: ConfigService,
        private httpService: HttpService,
        private requestLogService: RequestLogService
    ) {}

    public async getFee(): Promise<Result<IGetFeeData | undefined, Error | undefined>> {
        const url = this.makeUrl(`/fees/recommended`);
        const log = await this.requestLogService.create('get', url);
        const before = new Date().getTime();

        try {
            const response = await this.httpService.get(url);
            
            const after = new Date().getTime();

            const responseTime = after - before;
            await this.requestLogService.setResponse(log, response.status, responseTime, JSON.stringify(response.data));

            const { data } = response;

            const getFeeData: IGetFeeData = {
                fastestFee: data.fastestFee || 0,
                halfHourFee: data.halfHourFee || 0,
                hourFee: data.hourFee | 0
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
        return `${this.configService.props.bitcoinfees.url}${url}`;
    }
}