import { Body, Controller, Post, UseFilters, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { WalletException } from "src/exceptions/wallet.exception";
import { WalletExceptionFilter } from "src/filters/WalletException.filter";
import { ClientLogService } from "./clientLog.service";
import { CreateLogDTO } from "./dto/createLog.dto";

@Controller('/client-logs')
@ApiTags('Client logs')
export class ClientLogController {
    constructor(
        private clientLogService: ClientLogService
    ) {}

    @Post('/create')
    @UsePipes(ValidationPipe)
    @UseFilters(WalletExceptionFilter)
    @ApiResponse({
        status: 201,
        description: 'Returns newly created log.',
        type: CreateLogDTO.CreateLogResponse
    })
    @ApiResponse({
        status: 500,
        description: 'Internal error occurred (while internal HTTP requests, etc).',
        type: WalletException

    })
    async getFee(@Body() dto: CreateLogDTO.CreateLogRequest) {
        const result = await this.clientLogService.createLog(dto);
        if (result.isFailure) {
            throw result.getError();
        }

        return result.getValue()
    }
}