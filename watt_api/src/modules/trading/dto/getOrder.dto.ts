import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDefined, IsInt, IsOptional, IsString } from "class-validator";
import { Order } from "src/services/binance/interfaces/order.type";

export namespace GetOrderDTO {
    export class GetOrderRequest {
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

        @IsOptional({
            message: 'Order id is optional'
        })
        @Type(() => Number)
        @IsInt({
            message: 'Order id must be an int'
        })
        @ApiPropertyOptional()
        orderId?: number;

        fill(userId: number, symbol: string, orderId?: number) {
            this.userId = userId;
            this.symbol = symbol;
            this.orderId = orderId;
        }
    }

    export class GetOrderResponse {
        @IsDefined({
            message: 'Order is required'
        })
        @ApiProperty()
        order!: Order;

        fill(order: Order) {
            this.order = order;
        }
    }
};