import { Body, Controller, Get, Post, Query, UseFilters, UsePipes } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { WalletException } from "src/exceptions/wallet.exception";
import { WalletExceptionFilter } from "src/filters/WalletException.filter";
import { ValidationPipe } from "src/pipes/ValidationPipe";
import { CreateTransactionDTO } from "./dto/createTransaction.dto";
import { GetBalanceDTO } from "./dto/getBalance.dto";
import { GetFeeDTO } from "./dto/getFee.dto";
import { GetMaxAmountDTO } from "./dto/getMaxAmount.dto";
import { GetTransactionListDTO } from "./dto/getTransactionList.dto";
import { SolService } from "./sol.service";

@Controller('sol')
@ApiTags('SOL')
export class SolController {
    constructor(
        private solService: SolService
    ) {}

    @Get('/fee')
    @UsePipes(ValidationPipe)
    @UseFilters(WalletExceptionFilter)
    @ApiResponse({
        status: 200,
        description: 'Returns (high, medium and low) price per byte.',
        type: GetFeeDTO.GetFeeResponse
    })
    @ApiResponse({
        status: 500,
        description: 'Internal error occurred (while internal HTTP requests, etc).',
        type: WalletException

    })
    async getFee() {
        const dto = new GetFeeDTO.GetFeeRequest();
        const result = await this.solService.getFee(dto);
        if (result.isFailure) {
            throw result.getError();
        }

        return result.getValue()
    }

    @Get('/balance')
    @UsePipes(ValidationPipe)
    @UseFilters(WalletExceptionFilter)
    @ApiResponse({
        status: 200,
        description: 'Returns the balance of the specified address.',
        type: GetBalanceDTO.GetBalanceResponse
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
    async getBalance(@Query() dto: GetBalanceDTO.GetBalanceRequest) {
        const result = await this.solService.getBalance(dto);
        if (result.isFailure) {
            throw result.getError();
        }

        return result.getValue()
    }

    @Get('/transaction-list')
    @UsePipes(ValidationPipe)
    @UseFilters(WalletExceptionFilter)
    @ApiResponse({
        status: 200,
        description: 'Returns a list of transactions associated with the address.',
        type: GetTransactionListDTO.GetTransactionListResponse
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
    async getTransactionList(@Query() dto: GetTransactionListDTO.GetTransactionListRequest) {
        const result = await this.solService.getTransactionList(dto);
        if (result.isFailure) {
            throw result.getError();
        }

        return result.getValue()
    }

    @Get('/max-amount')
    @UsePipes(ValidationPipe)
    @UseFilters(WalletExceptionFilter)
    @ApiResponse({
        status: 200,
        description: 'Returns the maximum amount that can be sent from the specified address.',
        type: GetMaxAmountDTO.GetMaxAmountResponse
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
    async getMaxAmount(@Query() dto: GetMaxAmountDTO.GetMaxAmountRequest) {
        const result = await this.solService.getMaxAmount(dto);
        if (result.isFailure) {
            throw result.getError();
        }

        return result.getValue()
    }

    @Post('/create-transaction')
    @UsePipes(ValidationPipe)
    @UseFilters(WalletExceptionFilter)
    @ApiResponse({
        status: 201,
        description: 'Returns the maximum amount that can be sent from the specified address.',
        type: GetMaxAmountDTO.GetMaxAmountResponse
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
    async createTransaction(@Body() dto: CreateTransactionDTO.CreateTransactionRequest) {
        const result = await this.solService.createTransaction(dto);
        if (result.isFailure) {
            throw result.getError();
        }

        return result.getValue()
    }
}