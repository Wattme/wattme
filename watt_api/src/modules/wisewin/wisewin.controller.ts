import { Controller, Get, Post, Query, Req, UseFilters, UseGuards, UsePipes } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { WalletException } from "src/exceptions/wallet.exception";
import { WalletExceptionFilter } from "src/filters/WalletException.filter";
import { ValidationPipe } from "src/pipes/ValidationPipe";
import { JWTAuthGuard } from "../auth/guards/jwtAuth.guard";
import { CreateInvoiceDTO } from "./dto/createInvoice.dto";
import { WisewinService } from "./wisewin.service";

@Controller('wisewin')
@ApiTags('Wisewin')
export class WisewinController {
    constructor(
        private wisewinService: WisewinService
    ) {}

    @Get('/invoice')
    @UsePipes(ValidationPipe)
    @UseFilters(WalletExceptionFilter)
    @UseGuards(JWTAuthGuard)
    @ApiResponse({
        status: 200,
        description: 'Creates invoice',
        type: CreateInvoiceDTO.Response
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
    async confirmVerification(@Query() dto: CreateInvoiceDTO.Request, @Req() req: any) {
        dto.userId = req.payload.userId;
        const result = await this.wisewinService.createInvoice(dto);
        if (result.isFailure) {
            throw result.getError();
        }

        return result.getValue();
    }
}