import { Module } from "@nestjs/common";
import { ConfigModule } from "src/config/config.module";
import { RequestLogModule } from "src/requestLog/requestLog.module";
import { BinanceService } from "./binance.service";

@Module({
    imports: [
        ConfigModule,
        RequestLogModule
    ],
    providers: [
        BinanceService
    ],
    exports: [
        BinanceService
    ]
})
export class BinanceModule {

}