import { IsArray, IsBtcAddress, IsDefined, IsInt, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from "class-transformer";

export namespace CreateTransactionDTO {
    type Input = {
        outputIndex: number;
        prevHash: string;
    };

    type Output = {
        address: string;
        value: number;
    };

    export class CreateTransactionRequest {
        @IsDefined({
            message: 'Sender address is required'
        })
        @IsString({
            message: 'Sender address must be a string'
        })
        @ApiProperty()
        senderAddress!: string;
    
        @IsDefined({
            message: 'Recipient address is required'
        })
        @IsString({
            message: 'Recipient address must be a string'
        })
        @ApiProperty()
        recipientAddress!: string;
    
        @IsDefined({
            message: 'Amount is required'
        })
        @IsInt({
            message: 'Amount must be an int'
        })
        @ApiProperty()
        amount!: number;

        @IsOptional({
            message: 'Fee is optional'
        })
        @IsInt({
            message: 'Fee must be an int'
        })
        @ApiPropertyOptional()
        fee?: number;
    
        fill(senderAddress: string, recipientAddress: string, amount: number, fee?: number) {
            this.senderAddress = senderAddress;
            this.recipientAddress = recipientAddress;
            this.amount = amount;
            this.fee = fee;
        }
    }
    
    export class CreateTransactionResponse {
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
    
        @IsDefined({
            message: 'Inputs is required'
        })
        @IsArray({
            message: 'Inputs must be an array'
        })
        @ApiProperty()
        inputs!: Input[];

        @IsDefined({
            message: 'Outputs is required'
        })
        @IsArray({
            message: 'Outputs must be an array'
        })
        @ApiProperty()
        outputs!: Output[];
    
        fill(fee: number, size: number, inputs: Input[], outputs: Output[]) {
            this.fee = fee;
            this.size = size;
            this.inputs = inputs;
            this.outputs = outputs;
        }
    }
}