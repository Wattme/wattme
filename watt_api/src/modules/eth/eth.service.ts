import { Injectable } from "@nestjs/common";
import { Web3Service } from "src/services/web3/web3.service";
import { Web3ScanService } from "src/services/web3Scan/web3Scan.service";
import { Web3GasService } from "src/services/web3Gas/web3Gas.service";
import { Web3BaseService } from "../web3Base/web3Base.service";

@Injectable()
export class ETHService extends Web3BaseService {
    constructor(
        web3GasService: Web3GasService,
        web3Service: Web3Service,
        web3ScanService: Web3ScanService
    ) {
        super(web3GasService, web3ScanService, web3Service);
    }
}