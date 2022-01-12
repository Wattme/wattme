import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../users/user.entity";
import { WisewinController } from "./wisewin.controller";
import { WisewinModule as WWModule } from '../../services/wisewin/wisewin.module';
import { WisewinService } from "./wisewin.service";
import { AuthModule } from "src/services/auth/auth.module";

@Module({
    controllers: [
        WisewinController
    ],
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        WWModule,
        AuthModule
    ],
    providers: [
        WisewinService
    ],
    exports: [
        WisewinService
    ]
})
export class WisewinModule {}