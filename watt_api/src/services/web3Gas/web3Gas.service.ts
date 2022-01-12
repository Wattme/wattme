import { Inject, Injectable } from "@nestjs/common";
import { HttpService } from "nestjs-http-promise";
import { ConfigService } from "src/config/config.service";
import { RequestLogService } from "src/requestLog/requestLog.service";
import { Result } from "src/shared/concrete/Result";
import { Blockchain } from "./constants/blockchain.type";
import { IGetGasPriceData } from "./interfaces/getGasPriceData.interface";
import { IProvider } from "./interfaces/provider.interface";
import { BSCGasProvider } from "./providers/bscGas.provider";
import { ETHGasProvider } from "./providers/ethGas.provider";
import { PolygonGasProvider } from "./providers/polygonGas.provider";

@Injectable()
export class Web3GasService {
    private provider: IProvider;

    constructor(
        @Inject('BLOCKCHAIN') private blockchain: Blockchain,
        private configService: ConfigService,
        private httpService: HttpService,
        private requestLogService: RequestLogService
    ) {
        this.provider = this.makeProvider();
    }

    public async getGasPrice(): Promise<Result<IGetGasPriceData | undefined, Error | undefined>> {
        return this.provider.getGasPrice();
    }

    private makeProvider(): IProvider | never {
        if (this.blockchain == 'bsc') {
            return new BSCGasProvider(this.configService, this.httpService, this.requestLogService);
        }

        if (this.blockchain == 'eth') {
            return new ETHGasProvider(this.configService, this.httpService, this.requestLogService);
        }

        if (this.blockchain == 'polygon') {
            return new PolygonGasProvider(this.configService, this.httpService, this.requestLogService);
        }

        throw new Error('Provider does not exist');
    }
}