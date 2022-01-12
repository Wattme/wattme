import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDefined, IsInt, IsString, Length, MinLength } from "class-validator";

export namespace ConfirmVerificationDTO {
    export class ConfirmVerificationRequest {
        @IsDefined({
            message: 'Id is required'
        })
        @Type(() => Number)
        @IsInt({
            message: 'Id must be an int'
        })
        @ApiProperty()
        id!: number;

        @IsDefined({
            message: 'Code is required'
        })
        @IsString({
            message: 'Code must be a string'
        })
        @Length(8, 8, {
            message: 'Code must be of length of 6'
        })
        @ApiProperty()
        code!: string;

        fill(id: number, code: string) {
            this.id = id;
            this.code = code;
        }
    }

    export class ConfirmVerificationResponse {
        @IsDefined({
            message: 'JWT is required'
        })
        @IsString({
            message: 'JWT must be a valid'
        })
        @ApiProperty()
        jwt!: string;

        fill(jwt: string) {
            this.jwt = jwt;
        } 
    }
};  