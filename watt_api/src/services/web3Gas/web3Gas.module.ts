import { DynamicModule, Module } from "@nestjs/common";
import { HttpModule, HttpService } from "nestjs-http-promise";
import { ConfigModule } from "src/config/config.module";
import { RequestLogModule } from "src/requestLog/requestLog.module";
import { Blockchain } from "./constants/blockchain.type";
import { Web3GasService } from "./web3Gas.service";

@Module({})
export class Web3GasModule {
    public static forFeature(blockchain: Blockchain): DynamicModule {
        return {
            module: Web3GasModule,
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
                Web3GasService
            ],
            exports: [
                Web3GasService
            ]
        };
    }
}