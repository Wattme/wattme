import { Module } from "@nestjs/common";
import { Web3Module } from "src/services/web3/web3.module";
import { Web3ScanModule } from "src/services/web3Scan/web3Scan.module";
import { ETHController } from "./eth.controller";
import { ETHService } from "./eth.service";
import { Web3GasModule } from "src/services/web3Gas/web3Gas.module";

@Module({
    imports: [
        Web3GasModule.forFeature('eth'),
        Web3Module.forFeature(
            process.env['ETH_WEB3_PROVIDER'] || "", 
            Number(process.env['ETH_CHAIN_ID']),
            "21000",
            "100000"
        ),
        Web3ScanModule.forFeature('eth')
    ],
    providers: [
        ETHService
    ],
    controllers: [
        ETHController
    ]
})
export class ETHModule { }