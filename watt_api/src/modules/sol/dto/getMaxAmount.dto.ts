import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDefined, IsInt, IsOptional, IsString } from "class-validator";

export namespace GetMaxAmountDTO {
    export class GetMaxAmountRequest {
        @IsDefined({
            message: 'Address is required'
        })
        @IsString({
            message: 'Address must be a string'
        })
        @ApiProperty()
        address!: string;

        fill(address: string) {
            this.address = address;
        }
    }

    export class GetMaxAmountResponse {
        @IsDefined({
            message: 'Amount is required'
        })
        @IsString({
            message: 'Amount must be a int'
        })
        @ApiProperty()
        amount!: string;

        @IsDefined({
            message: 'Fee is required'
        })
        @IsString({
            message: 'Fee must be a string'
        })
        @ApiProperty()
        fee!: string;

        fill(amount: string, fee: string) {
            this.amount = amount;
            this.fee = fee;
        }
    }
}