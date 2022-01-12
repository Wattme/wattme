import { Module } from "@nestjs/common";
import { HttpModule } from "nestjs-http-promise";
import { ConfigModule } from "src/config/config.module";
import { RequestLogModule } from "src/requestLog/requestLog.module";
import { WisewinService } from "./wisewin.service";

@Module({
    imports: [
        ConfigModule,
        HttpModule,
        RequestLogModule
    ],
    providers: [
        WisewinService
    ],
    exports: [
        WisewinService
    ]
})
export class WisewinModule {}