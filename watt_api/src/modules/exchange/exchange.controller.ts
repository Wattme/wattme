import { Body, Controller, Get, Post, Query, Req, UseFilters, UseGuards, UsePipes } from "@nestjs/common";
import { ApiProperty, ApiResponse, ApiTags } from "@nestjs/swagger";
import { WalletException } from "src/exceptions/wallet.exception";
import { WalletExceptionFilter } from "src/filters/WalletException.filter";
import { ValidationPipe } from "src/pipes/ValidationPipe";
import { JWTAuthGuard } from "../auth/guards/jwtAuth.guard";
// import { JWTAuthGuard } from "../auth/guards/jwtAuth.guard";
import { CreateExchangeOrderDTO } from "./dto/createExchangeOrder.dto";
import { GetAccountDTO } from "./dto/getAccount.dto";
import { GetCurrentOrdersDTO } from "./dto/getCurrentOrders.dto";
import { GetSystemInfoDTO } from "./dto/getSystemInfo.dto";
import { GetValueDTO } from "./dto/getValue.dto";
import { ExchangeService } from "./exchange.service";

@Controller('exchange')
@ApiTags('Exchange')
export class ExchangeController {
    constructor(
        private exchangeService: ExchangeService
    ) {}

    @Post('/create-order')
    @UsePipes(ValidationPipe)
    @UseFilters(WalletExceptionFilter)
    @UseGuards(JWTAuthGuard)
    @ApiResponse({
        status: 201,
        description: 'Creates an exchange order.',
        type: CreateExchangeOrderDTO.CreateExchangeOrderResponse
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
    async createOrder(@Body() body: CreateExchangeOrderDTO.CreateExchangeOrderRequest, @Req() req: any) {
        body.userId = 1 || req.payload.userId;
        const result = await this.exchangeService.createOrder(body);
        if (result.isFailure) {
            throw result.getError();
        }

        return result.getValue()
    }

    @Get('/system-info')
    @UsePipes(ValidationPipe)
    @UseFilters(WalletExceptionFilter)
    @UseGuards(JWTAuthGuard)
    @ApiResponse({
        status: 200,
        description: 'Returns system info.',
        type: GetSystemInfoDTO.GetSystemInfoResponse
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
    async getSystemInfo() {
        const result = await this.exchangeService.getSystemInfo();
        if (result.isFailure) {
            throw result.getError();
        }

        return result.getValue()
    }

    @Get('/current-orders')
    @UsePipes(ValidationPipe)
    @UseFilters(WalletExceptionFilter)
    @UseGuards(JWTAuthGuard)
    @ApiResponse({
        status: 200,
        description: 'Returns user\'s current orders.',
        type: GetCurrentOrdersDTO.GetCurrentOrderResponse
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
    async getCurrentOrders(@Query() query: GetCurrentOrdersDTO.GetCurrentOrderRequest, @Req() req: any) {
        query.userId = req.payload?.userId;
        const result = await this.exchangeService.getCurrentOrders(query);
        if (result.isFailure) {
            throw result.getError();
        }

        return result.getValue()
    }

    @Get('/account')
    @UsePipes(ValidationPipe)
    @UseFilters(WalletExceptionFilter)
    @UseGuards(JWTAuthGuard)
    @ApiResponse({
        status: 200,
        description: 'Returns user\'s account.',
        type: GetAccountDTO.GetAccountResponse
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
    async getAccount(@Req() req: any) {
        const request = new GetAccountDTO.GetAccountRequest(req.payload?.userId);
        const result = await this.exchangeService.getAccount(request);
        if (result.isFailure) {
            throw result.getError();
        }

        return result.getValue()
    }

    @Get('/value')
    @UsePipes(ValidationPipe)
    @UseFilters(WalletExceptionFilter)
    @UseGuards(JWTAuthGuard)
    @ApiResponse({
        status: 200,
        description: 'Returns converted value.',
        type: GetValueDTO.GetValueResponse
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
    async getValue(@Query() query: GetValueDTO.GetValueRequest) {
        const result = await this.exchangeService.getValue(query);
        if (result.isFailure) {
            throw result.getError();
        }

        return result.getValue()
    }
}