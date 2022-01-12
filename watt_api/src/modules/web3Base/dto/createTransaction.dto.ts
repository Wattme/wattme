import { IsArray, IsBtcAddress, IsDefined, IsEthereumAddress, IsInt, IsNumber, IsOptional, IsString, NotEquals } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export namespace CreateTransactionDTO {
    export class CreateTransactionRequest {
        @IsDefined({
            message: 'Sender address is required'
        })
        @IsString({
            message: 'Sender address must be a string'
        })
        @IsEthereumAddress({
            message: 'Sender address must be a valid ethereum address'
        })
        @ApiProperty()
        senderAddress!: string;
    
        @IsDefined({
            message: 'Recipient address is required'
        })
        @IsString({
            message: 'Recipient address must be a string'
        })
        @IsEthereumAddress({
            message: 'Recipient address must be a valid ethereum address'
        })
        @ApiProperty()
        recipientAddress!: string;
    
        @IsDefined({
            message: 'Amount is required'
        })
        @IsString({
            message: 'Amount must be a string'
        })
        @NotEquals("0", {
            message: 'Amount must be greater than 0'
        })
        @ApiProperty()
        amount!: string;

        @IsOptional({
            message: 'Fee is optional'
        })
        @IsString({
            message: 'Fee must be a string'
        })
        @NotEquals("0", {
            message: 'Fee must be greater than 0'
        })
        @ApiPropertyOptional()
        fee?: string;

        @IsOptional({
            message: 'Contract is optional'
        })
        @IsString({
            message: 'Contract must be a string'
        })
        @IsEthereumAddress({
            message: 'Recipient address must be a valid ethereum address'
        })
        @ApiPropertyOptional()
        contract?: string;
    
        fill(senderAddress: string, recipientAddress: string, amount: string, fee?: string, contract?: string) {
            this.senderAddress = senderAddress;
            this.recipientAddress = recipientAddress;
            this.amount = amount;
            this.fee = fee;
            this.contract = contract;
        }
    }
    
    export class CreateTransactionResponse {
        @IsDefined({
            message: 'Gas limit is required'
        })
        @IsInt({
            message: 'Gas limit must be an int'
        })
        @ApiProperty()
        gasLimit!: string;

        @IsDefined({
            message: 'Gas price is required'
        })
        @IsInt({
            message: 'Gas price must be an int'
        })
        @ApiProperty()
        gasPrice!: string;

        @IsDefined({
            message: 'Max gas is required'
        })
        @IsInt({
            message: 'Max gas must be an int'
        })
        @ApiProperty()
        maxGas!: string;

        @IsDefined({
            message: 'Nonce is required'
        })
        @IsString({
            message: 'Nonce must be a string'
        })
        @ApiProperty()
        nonce!: string;
        
        @IsDefined({
            message: 'From is required'
        })
        @IsString({
            message: 'From must be a string'
        })
        @ApiProperty()
        from!: string;

        @IsDefined({
            message: 'To is required'
        })
        @IsString({
            message: 'To must be a string'
        })
        @ApiProperty()
        to!: string;

        @IsDefined({
            message: 'Value is required'
        })
        @IsString({
            message: 'Value must be a string'
        })
        @ApiProperty()
        value!: string;

        @IsDefined({
            message: 'Chain id is required'
        })
        @IsInt({
            message: 'Chain id must be an int'
        })
        @ApiProperty()
        chainID!: number;

        @IsOptional({
            message: 'Data is optimal'
        })
        @ApiPropertyOptional()
        data?: any;
    
        fill(from: string, to: string, value: string, chainID: number, gasLimit: string, gasPrice: string, maxGas: string, nonce: string, data?: any) {
            this.from = from;
            this.to = to;
            this.value = value;
            this.chainID = chainID;
            this.gasLimit = gasLimit;
            this.gasPrice = gasPrice;
            this.maxGas = maxGas;
            this.nonce = nonce;
            this.data = data;
        }
    }
}