import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/services/auth/auth.module";
import { WisewinModule } from "src/services/wisewin/wisewin.module";
import { UserEntity } from "../users/user.entity";
import { RestorationController } from "./restoration.controller";
import { RestorationEntity } from "./restoration.entity";
import { RestorationService } from "./restoration.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([RestorationEntity]),
        TypeOrmModule.forFeature([UserEntity]),
        AuthModule,
        WisewinModule
    ],
    providers: [
        RestorationService
    ],
    controllers: [
        RestorationController
    ],
    exports: [
        RestorationService
    ]
})
export class RestorationModule {}