import { Module } from "@nestjs/common";
import { Web3Module } from "src/services/web3/web3.module";
import { Web3GasModule } from "src/services/web3Gas/web3Gas.module";
import { Web3ScanModule } from "src/services/web3Scan/web3Scan.module";
import { BSCController } from "./bsc.controller";
import { BSCService } from "./bsc.service";

@Module({
    imports: [
        Web3GasModule.forFeature('bsc'),
        Web3Module.forFeature(
            process.env['BSC_WEB3_PROVIDER'] || "", 
            Number(process.env['BSC_CHAIN_ID']), 
            "30000",
            "90000"
        ),
        Web3ScanModule.forFeature('bsc')
    ],
    providers: [
        BSCService
    ],
    exports: [
        BSCService
    ],
    controllers: [
        BSCController
    ]
})
export class BSCModule { }