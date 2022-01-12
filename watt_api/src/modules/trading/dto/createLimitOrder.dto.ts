import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDefined, IsInt, IsNumber, IsOptional, IsString } from "class-validator";
import { CreatedOrder } from "src/services/binance/interfaces/order.type";

export namespace CreateLimitOrderDTO {
    export type TakeProfit = {
        price: string;
    }

    export type StopLoss = {
        price: string;
    }
    
    export class CreateLimitOrderRequest {
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
            message: 'Price is required'
        })
        @IsString({
            message: 'Price must be a string'
        })
        @ApiProperty()
        price!: string;

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

        fill(userId: number, symbol: string, side: string, price: string, quantity: number, takeProfit?: TakeProfit, stopLoss?: StopLoss) {
            this.userId = userId;
            this.symbol = symbol;
            this.side = side;
            this.price = price;
            this.quantity = quantity;
            this.takeProfit = takeProfit;
            this.stopLoss = stopLoss;
        }
    }

    export class CreateLimitOrderResponse {
        @IsDefined({
            message: 'Order is required'
        })
        @ApiProperty()
        orderList!: CreatedOrder[];

        fill(orderList: CreatedOrder[]) {
            this.orderList = orderList;
        }
    }
};