import { IsDefined, IsInt, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export namespace GetFeeDTO {
    export class GetFeeRequest {
        fill() {}
    }

    export class GetFeeResponse {
        @IsDefined({
            message: 'HighFee is required'
        })
        @IsInt({
            message: 'HighFee must be an int'
        })
        @ApiProperty()
        highFee!: number;

        @IsDefined({
            message: 'MediumFee is required'
        })
        @IsInt({
            message: 'MediumFee must be an int'
        })
        @ApiProperty()
        mediumFee!: number;

        @IsDefined({
            message: 'LowFee is required'
        })
        @IsInt({
            message: 'LowFee must be an int'
        })
        @ApiProperty()
        lowFee!: number;

        fill(highFee: number, mediumFee: number, lowFee: number) {
            this.highFee = highFee;
            this.mediumFee = mediumFee;
            this.lowFee = lowFee;
        }
    }
}