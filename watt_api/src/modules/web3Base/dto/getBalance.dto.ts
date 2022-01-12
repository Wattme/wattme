import { IsDefined, IsInt, IsString, IsBtcAddress, IsEthereumAddress, IsOptional } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export namespace GetBalanceDTO {
    export class GetBalanceRequest {
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
            message: 'Contract is required'
        })
        @IsString({
            message: 'Contract must be a string'
        })
        @IsEthereumAddress({
            message: 'Contract must be a valid ethereum address'
        })
        @ApiPropertyOptional()
        contract?: string;

        fill(address: string, contract?: string) {
            this.address = address;
            this.contract = contract;
        }
    }

    export class GetBalanceResponse {
        @IsDefined({
            message: 'Balance is required'
        })
        @IsString({
            message: 'Balance must be a string'
        })
        @ApiProperty()
        balance!: string;

        fill(balance: string) {
            this.balance = balance;
        }
    }
}