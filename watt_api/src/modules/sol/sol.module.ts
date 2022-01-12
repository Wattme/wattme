import { Module } from "@nestjs/common";
import { SolanaBeachModule } from "src/services/solanaBeach/solanaBeach.module";
import { SolWeb3Module } from "src/services/solWeb3/solWeb3.module";
import { SolController } from "./sol.controller";
import { SolService } from "./sol.service";

@Module({
    imports: [
        SolWeb3Module,
        SolanaBeachModule
    ],
    controllers: [
        SolController
    ],
    providers: [
        SolService
    ],
    exports: [
        SolService
    ]
})
export class SolModule {}