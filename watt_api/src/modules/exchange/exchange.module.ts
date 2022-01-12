import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "src/config/config.module";
import { AuthModule } from "src/services/auth/auth.module";
import { Web3Module } from "src/services/web3/web3.module";
import { Web3ScanModule } from "src/services/web3Scan/web3Scan.module";
import { WisewinModule } from "src/services/wisewin/wisewin.module";
import { BSCModule } from "../bsc/bsc.module";
import { UserEntity } from "../users/user.entity";
import { ExchangeController } from "./exchange.controller";
import { ExchangeService } from "./exchange.service";
import { ExchangeFillEntity } from "./exchangeFill.entity";
// import { ExchangeFillEntity } from "./exchangeFill.entity";
import { ExchangeOrderEntity } from "./exchangeOrder.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([ExchangeOrderEntity]),
        TypeOrmModule.forFeature([ExchangeFillEntity]),
        TypeOrmModule.forFeature([UserEntity]),
        WisewinModule,
        ConfigModule,
        BSCModule,
        Web3Module.forFeature(
            process.env['BSC_WEB3_PROVIDER'] || "", 
            Number(process.env['BSC_CHAIN_ID']), 
            "30000",
            "90000"
        ),
        AuthModule
    ],
    controllers: [
        ExchangeController
    ],
    providers: [
        ExchangeService
    ],
    exports: [
        ExchangeService
    ]
})
export class ExchangeModule {}