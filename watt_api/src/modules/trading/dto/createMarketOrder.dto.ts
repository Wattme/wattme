import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDefined, IsInt, IsNumber, IsOptional, IsString } from "class-validator";
import { CreatedOrder } from "src/services/binance/interfaces/order.type";

export namespace CreateMarketOrderDTO {
    export type TakeProfit = {
        price: string;
    }

    export type StopLoss = {
        price: string;
    }

    export class CreateMarketOrderRequest {
        @IsOptional({
            message: 'User id is required'
        })
        @IsInt({
            message: 'User id must be an int'
        })
        userId!: number;

        @IsDefined({
            message: 'Symbol is required'
        })
        @IsString({
            message: 'Symbol must be a string'
        })
        @ApiProperty()
        symbol!: string;

        @IsDefined({
            message: 'Side is required'
        })
        @IsString({
            message: 'Side must be a string'
        })
        @ApiProperty()
        side!: string;

        @IsDefined({
            message: 'Quantity is required'
        })
        @IsNumber({}, {
            message: 'Quantity must be a Number'
        })
        @ApiProperty()
        quantity!: number;

        @IsOptional({
            message: 'Take profit is optional'
        })
        @ApiPropertyOptional()
        takeProfit?: TakeProfit;

        @IsOptional({
            message: 'Stop loss is optional'
        })
        @ApiPropertyOptional()
        stopLoss?: StopLoss;

        fill(userId: number, symbol: string, side: string, quantity: number, takeProfit?: TakeProfit, stopLoss?: StopLoss) {
            this.userId = userId;
            this.symbol = symbol;
            this.side = side;
            this.quantity = quantity;
            this.takeProfit = takeProfit;
            this.stopLoss = stopLoss;
        }
    }

    export class CreateMarketOrderResponse {
        @IsDefined({
            message: 'Order list is required'
        })
        @ApiProperty()
        orderList!: CreatedOrder[];

        fill(orderList: CreatedOrder[]) {
            this.orderList = orderList;
        }
    }
};