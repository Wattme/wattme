import { IsDefined, IsInt, IsString, IsBtcAddress } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export namespace GetBalanceDTO {
    export class GetBalanceRequest {
        @IsDefined({
            message: 'Address is required'
        })
        @IsString({
            message: 'Address must be a string'
        })
        @IsBtcAddress({
            message: 'Address must be a valid bitcoin address'
        })
        @ApiProperty()
        address!: string;

        fill(address: string) {
            this.address = address;
        }
    }

    export class GetBalanceResponse {
        @IsDefined({
            message: 'Balance is required'
        })
        @IsInt({
            message: 'Balance must be an int'
        })
        @ApiProperty()
        balance!: number;

        fill(balance: number) {
            this.balance = balance;
        }
    }
}