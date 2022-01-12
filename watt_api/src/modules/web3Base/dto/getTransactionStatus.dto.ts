import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsString } from "class-validator";

export namespace GetTransactionStatusDTO {
    export class GetTransactionStatusRequest {
        @IsDefined({
            message: 'Hash is required'
        })
        @IsString({
            message: 'Hash must be a string'
        })
        @ApiProperty()
        public hash: string;

        constructor(hash: string) {
            this.hash = hash;
        }
    }

    export class GetTransactionStatusResponse {
        @ApiProperty()
        public status: boolean;

        constructor(status: boolean) {
            this.status = status;
        }
    }
};