import { ApiProperty, ApiPropertyOptional, ApiResponse } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsOptional } from "class-validator";
import { ExchangeOrderEntity } from "../exchangeOrder.entity";

export namespace GetCurrentOrdersDTO {
    export class GetCurrentOrderRequest {
        @IsOptional({
            message: 'User id is optional'
        })
        @IsInt({
            message: 'User id must be an int'
        })
        public userId: number;

        @IsOptional({
            message: 'Page is optional'
        })
        @Type(() => Number)
        @IsInt({
            message: 'Page must be an int'
        })
        @ApiPropertyOptional()
        public page?: number;

        @IsOptional({
            message: 'Limit is optional'
        })
        @Type(() => Number)
        @IsInt({
            message: 'Limit must be an int'
        })
        @ApiPropertyOptional()
        public limit?: number;
        
        constructor(userId: number, page?: number, limit?: number) {
            this.userId = userId;
            this.page = page;
            this.limit = limit;
        }
    }

    export class GetCurrentOrderResponse {
        @ApiProperty()
        public orders: ExchangeOrderEntity[];

        constructor(orders: ExchangeOrderEntity[]) {
            this.orders = orders;
        }
    }
};