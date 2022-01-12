import { Inject, Injectable, Provider } from "@nestjs/common";
import { HttpService } from "nestjs-http-promise";
import { ConfigService } from "src/config/config.service";
import { RequestLogService } from "src/requestLog/requestLog.service";
import { PolygonscanProvider } from "./providers/polygonscan.provider";
import { Blockchain } from "./constants/blockchain.type";
import { IProvider } from "./interfaces/provider.interface";
import { BSCScanProvider } from "./providers/bscscan.provider";
import { EtherscanProvider } from "./providers/etherscan.provider";
import { Result } from "src/shared/concrete/Result";
import { IGetTransactionListData } from "./interfaces/getTransactionListData.interface";
import { IGetTransactionStatusData } from "./interfaces/getTransactionStatusData.interface";

@Injectable()
export class Web3ScanService {
    private provider: IProvider;

    constructor(
        @Inject('BLOCKCHAIN') private blockchain: Blockchain,
        private configService: ConfigService,
        private httpService: HttpService,
        private requestLogService: RequestLogService
    ) { 
        this.provider = this.makeProvider();
    }

    public async getAddressTransactionList(address: string, page: number, limit: number): Promise<Result<IGetTransactionListData | undefined, Error | undefined>> {
        return this.provider.getAddressTransactionList(address, page, limit);
    }

    public async getAddressTransactionListERC20(address: string, contract: string, page: number, limit: number): Promise<Result<IGetTransactionListData | undefined, Error | undefined>> {
        return this.provider.getAddressTransactionListERC20(address, contract, page, limit);
    }

    public async getTransactionStatus(hash: string): Promise<Result<IGetTransactionStatusData | undefined, Error | undefined>> {
        return this.provider.getTransactionStatus(hash);
    }


    private makeProvider(): IProvider | never {
        if (this.blockchain == 'bsc') {
            return new BSCScanProvider(this.configService, this.httpService, this.requestLogService);
        }

        if (this.blockchain == 'eth') {
            return new EtherscanProvider(this.configService, this.httpService, this.requestLogService);
        }

        if (this.blockchain == 'polygon') {
            return new PolygonscanProvider(this.configService, this.httpService, this.requestLogService);
        }

        throw new Error('Provider does not exist');
    }
}