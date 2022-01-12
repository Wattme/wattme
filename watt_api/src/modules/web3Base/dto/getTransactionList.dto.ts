import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsDefined, IsEthereumAddress, IsInt, IsOptional, IsString } from "class-validator";

export namespace GetTransactionListDTO {
    export type Transaction = {
        hash: string;
        incoming: boolean;
        senderAddress: string;
        recipients: {
            address: string;
            amount: string;
        }[];
        amount: string;
        actualAmount: string;
        fee: string;
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
        @ApiPropertyOptional()
        limit?: number;

        fill(address: string, page: number, limit: number, contract?: string) {
            this.address = address;
            this.page = page;
            this.limit = limit;
            this.contract = contract;
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