import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDefined, IsInt, IsOptional, IsString } from "class-validator";
import { CanceledOrder } from "src/services/binance/interfaces/order.type";

export namespace CancelOrderDTO {
    export class CancelOrderRequest {
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
        @ApiProperty()
        orderId?: number;

        fill(userId: number, symbol: string, orderId?: number) {
            this.userId = userId;
            this.symbol = symbol;
            this.orderId = orderId;
        }
    }

    export class CancelOrderResponse {
        @IsDefined({
            message: 'Order is required'
        })
        @ApiProperty()
        order!: CanceledOrder;

        fill(order: CanceledOrder) {
            this.order = order;
        }
    }
};