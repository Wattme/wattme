import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Web3BaseController } from "../web3Base/web3Base.controller";
import { PolygonService } from "./polygon.service";

@Controller('polygon')
@ApiTags('POLYGON')
export class PolygonController extends Web3BaseController {
    constructor(
        polygonService: PolygonService
    ) {
        super(polygonService);
    }
}