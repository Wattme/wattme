import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDefined, IsEthereumAddress, IsIn, IsInt, IsNumber, IsOptional, IsString } from "class-validator";
import { CreateTransactionDTO } from "src/modules/web3Base/dto";
import { ExchangeOrderSide, exchangeOrderSide } from "src/static/exchangeOrderSide";
import { ExchangeOrderSymbol, exchangeOrderSymbol } from "src/static/exchangeOrderSymbol";
import { ExchangeOrderEntity } from "../exchangeOrder.entity";

export namespace CreateExchangeOrderDTO {
    export class CreateExchangeOrderRequest {
        @IsOptional({
            message: 'User id is required'
        })
        @IsInt({
            message: 'User id must be an int'
        })
        public userId!: number;
        
        @IsDefined({
            message: 'Address is required'
        })
        @IsString({
            message: 'Address must be a string'
        })
        @IsEthereumAddress({
            message: 'Address must be a valid ethereum address'
        })
        @ApiProperty()
        public address: string;

        @IsDefined({
            message: 'Value is required'
        })
        @Type(() => Number)
        @IsNumber({}, {
            message: 'Value must be a number'
        })
        @ApiProperty()
        public value: number;

        @IsDefined({
            message: 'Symbol is required'
        })
        @IsString({
            message: 'Symbol must be a string'
        })
        @IsIn(exchangeOrderSymbol.getList(), {
            message: `Symbol must be one of ${exchangeOrderSymbol.getList()}`
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
            message: `Side must be one of ${exchangeOrderSide.getList()}`
        })
        @ApiProperty()
        public side: ExchangeOrderSide;

        constructor(userId: number, address: string, value: number, symbol: ExchangeOrderSymbol, side: ExchangeOrderSide) {
            this.userId = userId;
            this.address = address;
            this.value = value;
            this.symbol = symbol;
            this.side = side;
        }
    }

    export class CreateExchangeOrderResponse {
        @ApiProperty()
        public order: ExchangeOrderEntity;

        @ApiProperty()
        public transaction: CreateTransactionDTO.CreateTransactionResponse;

        constructor(order: ExchangeOrderEntity, transaction: CreateTransactionDTO.CreateTransactionResponse) {
            this.order = order;
            this.transaction = transaction;
        }
    }
};