import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsString } from "class-validator";

export namespace PushTransactionDTO {
    export class PushTransactionRequest {
        @IsDefined({
            message: 'Raw data is required'
        })
        @IsString({
            message: 'Raw data must be a string'
        })
        @ApiProperty()
        rawData!: string;
    }

    export class PushTransactionResponse {
        @IsDefined({
            message: 'Raw data is required'
        })
        @IsString({
            message: 'Raw data must be a string'
        })
        @ApiProperty()
        hash!: string;

        fill(hash: string) {
            this.hash = hash;
        }
    }
};