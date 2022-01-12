import { Module } from "@nestjs/common";
import { ConfigModule } from "src/config/config.module";
import { EncryptionService } from "./encryption.service";

@Module({
    imports: [
        ConfigModule
    ],
    providers: [
        EncryptionService
    ],
    exports: [
        EncryptionService
    ]
})
export class EncryptionModule {}