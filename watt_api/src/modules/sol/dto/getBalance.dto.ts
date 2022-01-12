import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsInt, IsString } from "class-validator";

export namespace GetBalanceDTO {
    export class GetBalanceRequest {
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