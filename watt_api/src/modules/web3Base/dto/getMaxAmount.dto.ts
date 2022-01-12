import { IsBtcAddress, IsDefined, IsEthereumAddress, IsInt, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export namespace GetMaxAmountDTO {
    export class GetMaxAmountRequest {
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
        address!: string;

        @IsOptional({
            message: 'Contract is optional'
        })
        @IsString({
            message: 'Contract must be a string'
        })
        @IsEthereumAddress({
            message: 'Contract must be a valid ethereum address'
        })
        @ApiPropertyOptional()
        contract?: string;

        @IsOptional({
            message: 'Fee is optional'
        })
        @IsString({
            message: 'Fee must be an int'
        })
        @ApiPropertyOptional()
        fee?: string;

        fill(address: string, contract?: string, fee?: string) {
            this.address = address;
            this.contract = contract;
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
        amount!: string;

        @IsDefined({
            message: 'Fee is required'
        })
        @IsInt({
            message: 'Fee must be an int'
        })
        @ApiProperty()
        fee!: string;

        fill(amount: string, fee: string) {
            this.amount = amount;
            this.fee = fee;
        }
    }
}