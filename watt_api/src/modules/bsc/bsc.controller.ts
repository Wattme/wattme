import { Body, Controller, Get, Post, Query, UseFilters, UsePipes } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Web3BaseController } from "../web3Base/web3Base.controller";
import { BSCService } from "./bsc.service";

@Controller('bsc')
@ApiTags('BSC')
export class BSCController extends Web3BaseController {
    constructor(
        bscService: BSCService
    ) { 
        super(bscService);
     }
}
