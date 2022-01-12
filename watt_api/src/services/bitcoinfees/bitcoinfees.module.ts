import { HttpModule } from "nestjs-http-promise";
import { Module } from "@nestjs/common";
import { ConfigModule } from "src/config/config.module";
import { BitcoinfeesService } from "./bitcoinfees.service";
import { RequestLogModule } from "../../requestLog/requestLog.module";

@Module({
    imports: [
        ConfigModule,
        HttpModule,
        RequestLogModule
    ],
    providers: [
        BitcoinfeesService
    ],
    exports: [
        BitcoinfeesService
    ]
})
export class BitcoinfeesModule {}