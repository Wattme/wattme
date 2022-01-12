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
        highFee!: string;

        @IsDefined({
            message: 'MediumFee is required'
        })
        @IsInt({
            message: 'MediumFee must be an int'
        })
        @ApiProperty()
        mediumFee!: string;

        @IsDefined({
            message: 'LowFee is required'
        })
        @IsInt({
            message: 'LowFee must be an int'
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