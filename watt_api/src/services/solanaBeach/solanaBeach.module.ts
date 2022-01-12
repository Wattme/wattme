import { Module } from "@nestjs/common";
import { HttpModule } from "nestjs-http-promise";
import { ConfigModule } from "src/config/config.module";
import { RequestLogModule } from "src/requestLog/requestLog.module";
import { SolanaBeachService } from "./solanaBeach.service";

@Module({
    imports: [
        ConfigModule,
        HttpModule,
        RequestLogModule
    ],
    providers: [
        SolanaBeachService
    ],
    exports: [
        SolanaBeachService
    ]
})
export class SolanaBeachModule {}