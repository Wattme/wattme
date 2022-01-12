import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/services/auth/auth.module";
import { BinanceModule } from "src/services/binance/binance.module";
import { BinanceService } from "src/services/binance/binance.service";
import { EncryptionModule } from "src/services/encryption/encryption.module";
import { UserEntity } from "../users/user.entity";
import { KeysEntity } from "./keys.entity";
import { OrderRecordEntity } from "./orderRecord.entity";
import { TradingController } from "./trading.controller";
import { TradingService } from "./trading.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        TypeOrmModule.forFeature([KeysEntity]),
        TypeOrmModule.forFeature([OrderRecordEntity]),
        BinanceModule,
        EncryptionModule,
        AuthModule
    ],
    providers: [
        TradingService
    ],
    controllers: [
        TradingController
    ]
})
export class TradingModule {

}