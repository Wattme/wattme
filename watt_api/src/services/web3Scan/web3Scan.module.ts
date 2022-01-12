import { DynamicModule, Module } from "@nestjs/common";
import { HttpModule } from "nestjs-http-promise";
import { ConfigModule } from "src/config/config.module";
import { RequestLogModule } from "src/requestLog/requestLog.module";
import { Blockchain } from "./constants/blockchain.type";
import { Web3ScanService } from "./web3Scan.service";

@Module({})
export class Web3ScanModule {
    public static forFeature(blockchain: Blockchain): DynamicModule {
        return {
            module: Web3ScanModule,
            imports: [
                ConfigModule,
                HttpModule,
                RequestLogModule
            ],
            providers: [
                {
                    provide: 'BLOCKCHAIN',
                    useValue: blockchain
                },
                Web3ScanService
            ],
            exports: [
                Web3ScanService
            ]
        };
    }
}