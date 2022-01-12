import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsInt, IsOptional, IsString } from "class-validator";

export namespace GetSymbolPriceDTO {
    export class GetSymbolPriceRequest {
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

        fill(userId: number, symbol: string) {
            this.userId = userId;
            this.symbol = symbol;
        }
    }

    export class GetSymbolPriceResponse {
        @IsDefined({
            message: 'Symbol is required'
        })
        @IsString({
            message: 'Symbol must be a string'
        })
        @ApiProperty()
        symbol!: string;

        @IsDefined({
            message: 'Price is required'
        })
        @IsString({
            message: 'Price must be a string'
        })
        @ApiProperty()
        price!: string;

        fill(symbol: string, price: string) {
            this.symbol = symbol;
            this.price = price;
        }
    }
};