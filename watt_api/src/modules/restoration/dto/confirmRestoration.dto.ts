import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDefined, IsInt, IsString, Length } from "class-validator";

export namespace ConfirmRestorationDTO {
    export class ConfirmRestorationRequest {
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

        @IsDefined({
            message: 'New password is required'
        })
        @IsString({
            message: 'New password must be a string'
        })
        @ApiProperty()
        newPassword!: string;

        fill(id: number, code: string, newPassword: string) {
            this.id = id;
            this.code = code;
            this.newPassword = newPassword;
        }
    }

    export class ConfirmRestorationResponse {
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