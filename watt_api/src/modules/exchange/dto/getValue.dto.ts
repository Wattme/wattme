import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDefined, IsIn, IsNumber, IsString } from "class-validator";
import { exchangeOrderSide, ExchangeOrderSide } from "src/static/exchangeOrderSide";
import { ExchangeOrderSymbol, exchangeOrderSymbol } from "src/static/exchangeOrderSymbol";

export namespace GetValueDTO {
    export class GetValueRequest {
        @IsDefined({
            message: 'Symbol is required'
        })
        @IsString({
            message: 'Symbol must be a string'
        })
        @IsIn(exchangeOrderSymbol.getList(), {
            message: `Symbol must be in ${exchangeOrderSymbol.getList()}`
        })
        @ApiProperty()
        public symbol: ExchangeOrderSymbol;
        
        @IsDefined({
            message: 'Side is required'
        })
        @IsString({
            message: 'Side must be a string'
        })
        @IsIn(exchangeOrderSide.getList(), {
            message: `Side must be in ${exchangeOrderSide.getList()}`
        })
        @ApiProperty()
        public side: ExchangeOrderSide;

        @IsDefined({
            message: 'Value is required'
        })
        @Type(() => Number)
        @IsNumber({}, {
            message: 'Value must be a number'
        })
        @ApiProperty()
        public value: number;

        constructor(symbol: ExchangeOrderSymbol, side: ExchangeOrderSide, value: number) {
            this.symbol = symbol;
            this.side = side;
            this.value = value;
        }
    }

    export class GetValueResponse {
        @ApiProperty()
        public value: number;

        constructor(value: number) {
            this.value = value;
        }
    }
};