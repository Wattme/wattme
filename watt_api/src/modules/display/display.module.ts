import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/services/auth/auth.module";
import { UserEntity } from "../users/user.entity";
import { DisplayController } from "./display.controller";
import { DisplayService } from "./display.service";

@Module({
    imports: [
        AuthModule,
        TypeOrmModule.forFeature([UserEntity])
    ],
    controllers: [
        DisplayController
    ],
    exports: [
        DisplayService
    ],
    providers: [
        DisplayService
    ]
})
export class DisplayModule {}