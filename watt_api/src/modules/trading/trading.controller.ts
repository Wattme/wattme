import { Body, Controller, Delete, Get, Post, Put, Query, Req, UseFilters, UseGuards, UsePipes } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { query } from "express";
import { WalletException } from "src/exceptions/wallet.exception";
import { WalletExceptionFilter } from "src/filters/WalletException.filter";
import { ValidationPipe } from "src/pipes/ValidationPipe";
import { JWTAuthGuard } from "../auth/guards/jwtAuth.guard";
import { CancelOrderDTO } from "./dto/cancelOrder.dto";
import { CreateKeysDTO } from "./dto/createKeys.dto";
import { CreateLimitOrderDTO } from "./dto/createLimitOrder.dto";
import { CreateMarketOrderDTO } from "./dto/createMarketOrder.dto";
import { DeleteKeysDTO } from "./dto/deleteKeys.dto";
import { GetAccountDTO } from "./dto/getAccount.dto";
import { GetAllOrdersDTO } from "./dto/getAllOrders.dto";
import { GetKeysDTO } from "./dto/getKeys.dto";
import { GetOpenOrdersDTO } from "./dto/getOpenOrders.dto";
import { GetOrderDTO } from "./dto/getOrder.dto";
import { GetSymbolPriceDTO } from "./dto/getSymbolPrice.dto";
import { GetSymbolsDTO } from "./dto/getSymbols.dto";
import { SetKeysDefaultDTO } from "./dto/setKeysDefault.dto";
import { TradingService } from "./trading.service";

@Controller('trading')
@ApiTags('Trading')
export class TradingController {
    constructor(
        private tradingService: TradingService
    ) {}

    @Get('/account')
    @UsePipes(ValidationPipe)
    @UseFilters(WalletExceptionFilter)
    @UseGuards(JWTAuthGuard)
    @ApiResponse({
        status: 200,
        description: 'Returns binance account info.',
        type: GetAccountDTO.GetAccountRequest
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
        const getAccountRequest = new GetAccountDTO.GetAccountRequest();
        getAccountRequest.fill(req.payload.userId);
        const result = await this.tradingService.getAccount(getAccountRequest);
        if (result.isFailure) {
            throw result.getError();
        }

        return result.getValue()
    }

    @Get('/order')
    @UsePipes(ValidationPipe)
    @UseFilters(WalletExceptionFilter)
    @UseGuards(JWTAuthGuard)
    @ApiResponse({
        status: 200,
        description: 'Returns binance order.',
        type: GetOrderDTO.GetOrderResponse
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
    async getOrder(@Req() req: any, @Query() query: GetOrderDTO.GetOrderRequest) {
        const getOrderRequest = new GetOrderDTO.GetOrderRequest();
        getOrderRequest.fill(
            req.payload.userId,
            query.symbol, 
            Number(query.orderId) || undefined
        );

        const result = await this.tradingService.getOrder(getOrderRequest);
        if (result.isFailure) {
            throw result.getError();
        }

        return result.getValue();
    }

    @Get('/all-orders')
    @UsePipes(ValidationPipe)
    @UseFilters(WalletExceptionFilter)
    @UseGuards(JWTAuthGuard)
    @ApiResponse({
        status: 200,
        description: 'Returns all binance orders.',
        type: GetAllOrdersDTO.GetAllOrdersRequest
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
    async getAllOrders(@Req() req: any, @Query() query: GetAllOrdersDTO.GetAllOrdersRequest) {
        const getAllOrdersRequest = new GetAllOrdersDTO.GetAllOrdersRequest();
        getAllOrdersRequest.fill(
            req.payload.userId,
            query.symbol,
            query.limit
        );

        const result = await this.tradingService.getAllOrders(getAllOrdersRequest);
        if (result.isFailure) {
            throw result.getError();
        }

        return result.getValue();
    }

    @Get('/open-orders')
    @UsePipes(ValidationPipe)
    @UseFilters(WalletExceptionFilter)
    @UseGuards(JWTAuthGuard)
    @ApiResponse({
        status: 200,
        description: 'Returns binance open orders.',
        type: GetOrderDTO.GetOrderResponse
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
    async getOpenOrders(@Req() req: any, @Query() query: GetOpenOrdersDTO.GetOpenOrdersRequest) {
        const getOpenOrdersRequest = new GetOpenOrdersDTO.GetOpenOrdersRequest();
        getOpenOrdersRequest.fill(
            req.payload.userId,
            query.symbol
        );

        const result = await this.tradingService.getOpenOrders(getOpenOrdersRequest);
        if (result.isFailure) {
            throw result.getError();
        }

        return result.getValue();
    }

    @Get('/symbols')
    @UsePipes(ValidationPipe)
    @UseFilters(WalletExceptionFilter)
    @UseGuards(JWTAuthGuard)
    @ApiResponse({
        status: 200,
        description: 'Returns binance symbols.',
        type: GetOrderDTO.GetOrderResponse
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
    async getSymbols(@Req() req: any, @Query() query: GetSymbolsDTO.GetSymbolsRequest) {
        const getSymbolsRequest = new GetSymbolsDTO.GetSymbolsRequest();
        getSymbolsRequest.fill(
            req.payload.userId,
            query.symbol
        );

        const result = await this.tradingService.getSymbols(getSymbolsRequest);
        if (result.isFailure) {
            throw result.getError();
        }

        return result.getValue();
    }

    @Get('/symbol-price')
    @UsePipes(ValidationPipe)
    @UseFilters(WalletExceptionFilter)
    @UseGuards(JWTAuthGuard)
    @ApiResponse({
        status: 200,
        description: 'Returns binance symbol price.',
        type: GetOrderDTO.GetOrderResponse
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
    async getSymbolPrice(@Req() req: any, @Query() query: GetSymbolPriceDTO.GetSymbolPriceRequest) {
        const getSymbolPriceRequest = new GetSymbolPriceDTO.GetSymbolPriceRequest();
        getSymbolPriceRequest.fill(
            req.payload.userId,
            query.symbol
        );
        
        const result = await this.tradingService.getSymbolPrice(getSymbolPriceRequest);
        if (result.isFailure) {
            throw result.getError();
        }

        return result.getValue();
    }

    @Post('/limit-order')
    @UsePipes(ValidationPipe)
    @UseFilters(WalletExceptionFilter)
    @UseGuards(JWTAuthGuard)
    @ApiResponse({
        status: 200,
        description: 'Creates a limit order.',
        type: CreateLimitOrderDTO.CreateLimitOrderResponse
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
    async createLimitOrder(@Req() req: any, @Body() body: CreateLimitOrderDTO.CreateLimitOrderRequest) {
        const createLimitOrderRequest = new CreateLimitOrderDTO.CreateLimitOrderRequest();
        createLimitOrderRequest.fill(
            req.payload.userId,
            body.symbol,
            body.side,
            body.price,
            body.quantity,
            body.takeProfit,
            body.stopLoss
        );
        
        const result = await this.tradingService.createLimitOrder(createLimitOrderRequest);
        if (result.isFailure) {
            throw result.getError();
        }

        return result.getValue();
    }

    @Post('/market-order')
    @UsePipes(ValidationPipe)
    @UseFilters(WalletExceptionFilter)
    @UseGuards(JWTAuthGuard)
    @ApiResponse({
        status: 200,
        description: 'Creates a market order.',
        type: CreateMarketOrderDTO.CreateMarketOrderResponse
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
    async createMarketOrder(@Req() req: any, @Body() body: CreateMarketOrderDTO.CreateMarketOrderRequest) {
        const createMarketOrderRequest = new CreateMarketOrderDTO.CreateMarketOrderRequest();
        createMarketOrderRequest.fill(
            req.payload.userId,
            body.symbol,
            body.side,
            body.quantity,
            body.takeProfit,
            body.stopLoss
        );
        
        const result = await this.tradingService.createMarketOrder(createMarketOrderRequest);
        if (result.isFailure) {
            throw result.getError();
        }

        return result.getValue();
    }

    @Put('/cancel-order')
    @UsePipes(ValidationPipe)
    @UseFilters(WalletExceptionFilter)
    @UseGuards(JWTAuthGuard)
    @ApiResponse({
        status: 200,
        description: 'Cancels an order.',
        type: CancelOrderDTO.CancelOrderResponse
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
    async cancelOrder(@Req() req: any, @Query() query: CancelOrderDTO.CancelOrderRequest) {
        const cancelOrderRequest = new CancelOrderDTO.CancelOrderRequest();
        cancelOrderRequest.fill(
            req.payload.userId,
            query.symbol,
            query.orderId
        );
        
        const result = await this.tradingService.cancelOrder(cancelOrderRequest);
        if (result.isFailure) {
            throw result.getError();
        }

        return result.getValue();
    }

    @Post('/keys/create')
    @UsePipes(ValidationPipe)
    @UseFilters(WalletExceptionFilter)
    @UseGuards(JWTAuthGuard)
    @ApiResponse({
        status: 200,
        description: 'Creates a key pair.',
        type: CreateKeysDTO.CreateKeysResponse
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
    async createKeys(@Req() req: any, @Body() body: CreateKeysDTO.CreateKeysRequest) {
        const createKeysRequest = new CreateKeysDTO.CreateKeysRequest();
        createKeysRequest.fill(
            req.payload.userId,
            body.name,
            body.publicKey,
            body.secretKey
        );
        
        const result = await this.tradingService.createKeys(createKeysRequest);
        if (result.isFailure) {
            throw result.getError();
        }

        return result.getValue();
    }

    @Delete('/keys/delete')
    @UsePipes(ValidationPipe)
    @UseFilters(WalletExceptionFilter)
    @UseGuards(JWTAuthGuard)
    @ApiResponse({
        status: 200,
        description: 'Deletes a key pair.',
        type: DeleteKeysDTO.DeleteKeysResponse
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
    async deleteKeys(@Req() req: any, @Query() query: DeleteKeysDTO.DeleteKeysRequest) {
        const deleteKeysRequest = new DeleteKeysDTO.DeleteKeysRequest();
        deleteKeysRequest.fill(
            req.payload.userId,
            query.id
        );
        
        const result = await this.tradingService.deleteKeys(deleteKeysRequest);
        if (result.isFailure) {
            throw result.getError();
        }

        return result.getValue();
    }

    @Get('/keys')
    @UsePipes(ValidationPipe)
    @UseFilters(WalletExceptionFilter)
    @UseGuards(JWTAuthGuard)
    @ApiResponse({
        status: 200,
        description: 'Returns user\'s key pairs.',
        type: GetKeysDTO.GetKeysResponse
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
    async getKeys(@Req() req: any) {
        const getKeysRequest = new GetKeysDTO.GetKeysRequest();
        getKeysRequest.fill(
            req.payload.userId
        );
        
        const result = await this.tradingService.getKeys(getKeysRequest);
        if (result.isFailure) {
            throw result.getError();
        }

        return result.getValue();
    }

    @Put('/keys/default')
    @UsePipes(ValidationPipe)
    @UseFilters(WalletExceptionFilter)
    @UseGuards(JWTAuthGuard)
    @ApiResponse({
        status: 200,
        description: 'Sets a key pair as default.',
        type: SetKeysDefaultDTO.SetKeysDefaultResponse
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
    async setKeysDefault(@Req() req: any, query: SetKeysDefaultDTO.SetKeysDefaultRequest) {
        const setKeysDefaultRequest = new SetKeysDefaultDTO.SetKeysDefaultRequest();
        setKeysDefaultRequest.fill(
            req.payload.userId,
            query.id
        );
        
        const result = await this.tradingService.setKeysDefault(setKeysDefaultRequest);
        if (result.isFailure) {
            throw result.getError();
        }

        return result.getValue();
    }
}