import { Controller, Get, Query, Req, UseFilters, UseGuards, UsePipes } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { WalletException } from "src/exceptions/wallet.exception";
import { WalletExceptionFilter } from "src/filters/WalletException.filter";
import { ValidationPipe } from "src/pipes/ValidationPipe";
import { JWTAuthGuard } from "../auth/guards/jwtAuth.guard";
import { RoleGuard } from "../auth/guards/role.guard";
import { DisplayService } from "./display.service";
import { DisplayTableDTO } from "./dto/displayTable.dto";

@Controller('display')
@ApiTags('Display')
export class DisplayController {
    constructor(
        private displayService: DisplayService
    ) {}

    @Get('/')
    @UsePipes(ValidationPipe)
    @UseFilters(WalletExceptionFilter)
    @UseGuards(RoleGuard('admin'))
    @ApiResponse({
        status: 200,
        description: 'Returns tables.',
        type: DisplayTableDTO.DisplayTableResponse
    })
    @ApiResponse({
        status: 500,
        description: 'Internal error occurred (while internal HTTP requests, etc).',
        type: WalletException
    })
    @ApiResponse({
        status: 400,
        description: 'Validation error (provided data is not valid).',
        type: WalletException
    })
    async getTables() {        
        const result = await this.displayService.getTables({});
        if (result.isFailure) {
            throw result.getError();
        }

        return result.getValue();
    }

    @Get('/table')
    @UsePipes(ValidationPipe)
    @UseFilters(WalletExceptionFilter)
    @UseGuards(RoleGuard('admin'))
    @ApiResponse({
        status: 200,
        description: 'Returns db rows as json.',
        type: DisplayTableDTO.DisplayTableResponse
    })
    @ApiResponse({
        status: 500,
        description: 'Internal error occurred (while internal HTTP requests, etc).',
        type: WalletException
    })
    @ApiResponse({
        status: 400,
        description: 'Validation error (provided data is not valid).',
        type: WalletException
    })
    async displayTable(@Query() query: DisplayTableDTO.DisplayTableRequest) {        
        const result = await this.displayService.displayTable(query);
        if (result.isFailure) {
            throw result.getError();
        }

        return result.getValue();
    }
}