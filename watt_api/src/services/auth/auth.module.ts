import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "src/config/config.module";
import { UserEntity } from "src/modules/users/user.entity";
import { AuthService } from "./auth.service";

@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forFeature([UserEntity])
    ],
    providers: [
        AuthService
    ],
    exports: [
        AuthService
    ]
})
export class AuthModule { }