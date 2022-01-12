import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Web3BaseController } from "../web3Base/web3Base.controller";
import { ETHService } from "./eth.service";

@Controller('eth')
@ApiTags('ETH')
export class ETHController extends Web3BaseController {
    constructor(
        ethService: ETHService
    ) {
        super(ethService);
    }
}