import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsInt, IsOptional, IsString } from "class-validator";
import { Order } from "src/services/binance/interfaces/order.type";

export namespace GetOpenOrdersDTO {
    export class GetOpenOrdersRequest {
        @IsOptional({
            message: 'User id is required'
        })
        @IsInt({
            message: 'User id must be an int'
        })
        userId!: number;

        @IsOptional({
            message: 'Symbol is optional'
        })
        @IsString({
            message: 'Symbol must be a string'
        })
        @ApiProperty()
        symbol?: string;

        fill(userId: number, symbol?: string) {
            this.userId = userId;
            this.symbol = symbol;
        }
    }

    export class GetOpenOrdersResponse {
        @IsDefined({
            message: 'Orders is required'
        })
        @ApiProperty()
        orders!: Order[];

        fill(orders: Order[]) {
            this.orders = orders;
        }
    }
};