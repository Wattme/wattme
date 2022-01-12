import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsInt, IsString } from "class-validator";

export namespace GetFeeDTO {
    export class GetFeeRequest {
        fill() {}
    }

    export class GetFeeResponse {
        @IsDefined({
            message: 'HighFee is required'
        })
        @IsString({
            message: 'HighFee must be a string'
        })
        @ApiProperty()
        highFee!: string;

        @IsDefined({
            message: 'MediumFee is required'
        })
        @IsString({
            message: 'MediumFee must be a string'
        })
        @ApiProperty()
        mediumFee!: string;

        @IsDefined({
            message: 'LowFee is required'
        })
        @IsString({
            message: 'LowFee must be a string'
        })
        @ApiProperty()
        lowFee!: string;

        fill(highFee: string, mediumFee: string, lowFee: string) {
            this.highFee = highFee;
            this.mediumFee = mediumFee;
            this.lowFee = lowFee;
        }
    }
}