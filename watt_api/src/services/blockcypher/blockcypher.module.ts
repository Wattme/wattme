import { HttpModule } from "nestjs-http-promise";
import { DynamicModule, Module } from "@nestjs/common";
import { ConfigModule } from "src/config/config.module";
import { BlockcypherService } from "./blockcypher.service";
import { RequestLogModule } from "src/requestLog/requestLog.module";
import { Blockchain } from "./constants/blockchain.type";

@Module({})
export class BlockcypherModule {
    static forFeature(blockchain: Blockchain): DynamicModule {
        return {
            module: BlockcypherModule,
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
                BlockcypherService
            ],
            exports: [
                BlockcypherService
            ]
        }
    }
}