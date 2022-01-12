import { Module } from "@nestjs/common";
import { Web3Module } from "src/services/web3/web3.module";
import { Web3GasModule } from "src/services/web3Gas/web3Gas.module";
import { Web3ScanModule } from "src/services/web3Scan/web3Scan.module";
import { PolygonController } from "./polygon.controller";
import { PolygonService } from "./polygon.service";

@Module({
    imports: [
        Web3GasModule.forFeature('polygon'),
        Web3Module.forFeature(
            process.env['POLYGON_WEB3_PROVIDER'] || "",
            Number(process.env['POLYGON_CHAIN_ID']),
            "21000",
            "100000"
        ),
        Web3ScanModule.forFeature('polygon')
    ],
    providers: [
        PolygonService
    ],
    controllers: [
        PolygonController
    ]
})
export class PolygonModule {}