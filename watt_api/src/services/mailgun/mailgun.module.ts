import { Module } from "@nestjs/common";
import { ConfigModule } from "src/config/config.module";
import { MailgunService } from "./mailgun.service";

@Module({
    imports: [
        ConfigModule
    ],
    providers: [
        MailgunService,
    ],
    exports: [
        MailgunService
    ]
})
export class MailgunModule {}