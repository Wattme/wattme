import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/services/auth/auth.module";
import { WisewinModule } from "src/services/wisewin/wisewin.module";
import { UserEntity } from "../users/user.entity";
import { VerificationService } from "./verfication.service";
import { VerificationController } from "./verification.controller";
import { VerificationEntity } from "./verification.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([VerificationEntity]),
        TypeOrmModule.forFeature([UserEntity]),
        AuthModule,
        WisewinModule
    ],
    controllers: [
        VerificationController
    ],
    providers: [
        VerificationService
    ],
    exports: [
        VerificationService
    ]
})
export class VerificationModule {}