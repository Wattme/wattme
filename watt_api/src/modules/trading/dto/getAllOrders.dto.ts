import { ApiProperty, ApiPropertyOptional, ApiQuery } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDefined, IsInt, IsOptional, IsString } from "class-validator";
import { Order } from "src/services/binance/interfaces/order.type";

export namespace GetAllOrdersDTO {
    export class GetAllOrdersRequest {
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
            message: 'Limit is optional'
        })
        @Type(() => Number)
        @IsInt({
            message: 'Limit must be an int'
        })
        @ApiPropertyOptional()
        limit?: number;

        fill(userId: number, symbol: string, limit?: number) {
            this.userId = userId;
            this.symbol = symbol;
            this.limit = limit;
        }
    }

    export class GetAllOrdersResponse {
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