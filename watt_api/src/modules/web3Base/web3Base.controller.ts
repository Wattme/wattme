import { Body, Get, Post, Query, UseFilters, UsePipes } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";
import { WalletException } from "src/exceptions/wallet.exception";
import { WalletExceptionFilter } from "src/filters/WalletException.filter";
import { ValidationPipe } from "src/pipes/ValidationPipe";
import { CreateTransactionDTO, GetBalanceDTO, GetFeeDTO, GetMaxAmountDTO, GetTransactionListDTO, PushTransactionDTO } from "./dto";
import { GetTransactionStatusDTO } from "./dto/getTransactionStatus.dto";
import { Web3BaseService } from "./web3Base.service";

export class Web3BaseController {
    constructor(
        private web3BaseService: Web3BaseService
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
        const result = await this.web3BaseService.getFee(dto);
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
        const result = await this.web3BaseService.getBalance(dto);
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
        description: 'Returns the maximum amount of wei that can be sent from the specified address.',
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
        const result = await this.web3BaseService.getMaxAmount(dto);
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
        const result = await this.web3BaseService.getTransactionList(dto);
        if (result.isFailure) {
            throw result.getError();
        }

        return result.getValue()
    }

    @Get('/transaction-status')
    @UsePipes(ValidationPipe)
    @UseFilters(WalletExceptionFilter)
    @ApiResponse({
        status: 200,
        description: 'Returns a status of transaction.',
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
    async getTransactionStatus(@Query() dto: GetTransactionStatusDTO.GetTransactionStatusRequest) {
        const result = await this.web3BaseService.getTransactionStatus(dto);
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
        description: 'Returns a created transaction\'s data necessary to sign with a private key.',
        type: CreateTransactionDTO.CreateTransactionResponse
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
        const result = await this.web3BaseService.createTransaction(dto);
        if (result.isFailure) {
            throw result.getError();
        }

        return result.getValue()
    }

    @Post('/push-transaction')
    @UsePipes(ValidationPipe)
    @UseFilters(WalletExceptionFilter)
    @ApiResponse({
        status: 201,
        description: 'Pushes signed raw transaction data to the blockchain and returns its hash.',
        type: PushTransactionDTO.PushTransactionResponse
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
    async pushTransaction(@Body() dto: PushTransactionDTO.PushTransactionRequest) {
        const result = await this.web3BaseService.pushTransaction(dto);
        if (result.isFailure) {
            throw result.getError();
        }

        return result.getValue()
    }
}