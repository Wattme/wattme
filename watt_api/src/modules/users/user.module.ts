import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "src/config/config.module";
import { AuthModule } from "src/services/auth/auth.module";
import { EncryptionModule } from "src/services/encryption/encryption.module";
import { MailgunModule } from "src/services/mailgun/mailgun.module";
import { MediaModule } from "src/services/media/media.module";
import { WisewinModule } from "src/services/wisewin/wisewin.module";
import { RestorationModule } from "../restoration/restoration.module";
import { VerificationModule } from "../verification/verification.module";
import { UserController } from "./user.controller";
import { UserEntity } from "./user.entity";
import { UserService } from "./user.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        VerificationModule,
        RestorationModule,
        MailgunModule,
        AuthModule,
        WisewinModule,
        MediaModule
    ],
    providers: [
        UserService
    ],
    controllers: [
        UserController
    ]
})
export class UserModule {}