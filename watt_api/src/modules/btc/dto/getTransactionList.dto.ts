import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsBtcAddress, IsDefined, IsInt, IsOptional, IsString, Max } from "class-validator";

export namespace GetTransactionListDTO {
    export type Transaction = {
        hash: string;
        incoming: boolean;
        senderAddress: string;
        recipients: {
            address: string;
            amount: number;
        }[];
        amount: number;
        fee: number;
        timestamp: number;
        confirmed: boolean;
    };

    export class GetTransactionListRequest {
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

        @IsOptional({
            message: 'Page is required'
        })
        @Type(() => Number)
        @IsInt({
            message: 'Page must be an int'
        })
        @ApiPropertyOptional()
        page?: number;

        @IsOptional({
            message: 'Limit is required'
        })
        @Type(() => Number)
        @IsInt({
            message: 'Limit must be an int'
        })
        @Max(50, {
            message: 'Limit must be less than or equal to 50'
        })
        @ApiPropertyOptional()
        limit?: number;

        fill(address: string, page: number, limit: number) {
            this.address = address;
            this.page = page;
            this.limit = limit;
        }
    };

    export class GetTransactionListResponse {
        @IsDefined({
            message: 'Inputs is required'
        })
        @IsArray({
            message: 'Inputs must be an array'
        })
        @ApiProperty()
        transactions!: Transaction[];

        fill(transactions: Transaction[]) {
            this.transactions = transactions;
        }
    };
};