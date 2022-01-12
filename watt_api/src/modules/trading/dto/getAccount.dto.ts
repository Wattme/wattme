import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDefined, IsInt, IsOptional, IsString } from "class-validator";
import { AccountType, Balance } from "src/services/binance/interfaces/getAccountData.interface";

export namespace GetAccountDTO {
    export class GetAccountRequest {
        @IsOptional({
            message: 'User id is required'
        })
        @IsInt({
            message: 'User id must be an int'
        })
        userId!: number;

        fill(userId: number) {
            this.userId = userId;
        }
    };

    export class GetAccountResponse {
        @ApiProperty()
        canTrade!: boolean;

        @ApiProperty()
        canWithdraw!: boolean;

        @ApiProperty()
        accountType!: AccountType;

        @ApiProperty()
        balances!: Balance[];

        fill(canTrade: boolean, canWithdraw: boolean, accountType: AccountType, balances: Balance[]) {
            this.canTrade = canTrade;
            this.canWithdraw = canWithdraw;
            this.accountType = accountType;
            this.balances = balances;
        }
    };
}