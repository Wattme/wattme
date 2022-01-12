import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BitcoinfeesModule } from "src/services/bitcoinfees/bitcoinfees.module";
import { BlockcypherModule } from "src/services/blockcypher/blockcypher.module";
import { TatumModule } from "src/services/tatum/tatum.module";
import { UserEntity } from "../users/user.entity";
import { BTCController } from "./btc.controller";
import { BTCService } from "./btc.service";

@Module({
    imports: [
        TatumModule.forFeature('bitcoin'),
        BlockcypherModule.forFeature('btc'),
        BitcoinfeesModule,
        TypeOrmModule.forFeature([UserEntity])
    ],
    providers: [
        BTCService
    ],
    controllers: [
        BTCController
    ]
})
export class BTCModule {}