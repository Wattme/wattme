import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsEthereumAddress, IsString, NotEquals } from "class-validator";
import { Result } from "src/shared/concrete/Result";

export namespace CreateTransactionDTO {
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
        @IsString({
            message: 'Amount must be a string'
        })
        @NotEquals("0", {
            message: 'Amount must be greater than 0'
        })
        @ApiProperty()
        amount!: string;
    
        fill(senderAddress: string, recipientAddress: string, amount: string) {
            this.senderAddress = senderAddress;
            this.recipientAddress = recipientAddress;
            this.amount = amount;
        }
    }

    export class CreateTransactionResponse {
        @ApiProperty()
        transaction!: any;

        fill(transaction: any) {
            this.transaction = transaction;
        }
    }
}