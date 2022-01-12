import { IsBtcAddress, IsDefined, IsInt, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from "class-transformer";

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

        @IsOptional({
            message: 'Fee is optional'
        })
        @Type(() => Number)
        @IsInt({
            message: 'Fee must be an int'
        })
        @ApiPropertyOptional()
        fee?: number;

        fill(address: string, fee?: number) {
            this.address = address;
            this.fee = fee;
        }
    }

    export class GetMaxAmountResponse {
        @IsDefined({
            message: 'Amount is required'
        })
        @IsInt({
            message: 'Amount must be a int'
        })
        @ApiProperty()
        amount!: number;

        @IsDefined({
            message: 'Fee is required'
        })
        @IsInt({
            message: 'Fee must be an int'
        })
        @ApiProperty()
        fee!: number;

        @IsDefined({
            message: 'Size is required'
        })
        @IsInt({
            message: 'Size must be an int'
        })
        @ApiProperty()
        size!: number;

        fill(amount: number, fee: number, size: number) {
            this.amount = amount;
            this.fee = fee;
            this.size = size;
        }
    }
}