import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BlockcypherModule } from "src/services/blockcypher/blockcypher.module";
import { TatumModule } from "src/services/tatum/tatum.module";
import { UserEntity } from "../users/user.entity";
import { LTCController } from "./ltc.controller";
import { LTCService } from "./ltc.service";

@Module({
    imports: [
        TatumModule.forFeature('litecoin'),
        BlockcypherModule.forFeature('ltc'),
    ],
    providers: [
        LTCService
    ],
    controllers: [
        LTCController
    ]
})
export class LTCModule {}