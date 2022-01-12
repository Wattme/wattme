import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsInt, IsOptional, IsString } from "class-validator";
import { Symbol } from "src/services/binance/interfaces/getSymbolsData.interface";

export namespace GetSymbolsDTO {
    export class GetSymbolsRequest {
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

    export class GetSymbolsResponse {
        @IsDefined({
            message: 'Symbols is required'
        })
        @ApiProperty()
        symbols!: Symbol[];

        fill(symbols: Symbol[]) {
            this.symbols = symbols;
        }
    }
};