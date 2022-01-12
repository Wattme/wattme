import { HttpModule } from "nestjs-http-promise";
import { DynamicModule, Module } from "@nestjs/common";
import { ConfigModule } from "src/config/config.module";
import { TatumService } from "./tatum.service";
import { RequestLogModule } from "src/requestLog/requestLog.module";
import { Blockchain } from "./constants/blockchain.type";

@Module({})
export class TatumModule {
    static forFeature(blockchain: Blockchain): DynamicModule {
        return {
            module: TatumModule,
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
                TatumService
            ],
            exports: [
                TatumService
            ]
        };
    }
}