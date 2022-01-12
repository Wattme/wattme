import { Module } from "@nestjs/common";
import { ConfigModule } from "src/config/config.module";
import { ConfigService } from "src/config/config.service";
import { RequestLogModule } from "src/requestLog/requestLog.module";
import { MediaService } from "./media.service";

@Module({
    imports: [
        ConfigModule,
        RequestLogModule
    ],
    providers: [
        MediaService
    ],
    exports: [
        MediaService
    ]
})
export class MediaModule {}