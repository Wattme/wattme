import { Module } from "@nestjs/common";
import { ExchangeModule } from "src/modules/exchange/exchange.module";
import { CronService } from "./cron.service";

@Module({
    imports: [
        ExchangeModule
    ],
    exports: [
        CronService
    ],
    providers: [
        CronService
    ]
})
export class CronModule {}