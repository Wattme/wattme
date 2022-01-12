import { ApiBody, ApiProperty, ApiQuery } from "@nestjs/swagger";
import { IsDefined, IsEmail, IsInt, IsOptional, IsString } from "class-validator";
import { ApplicationLanguage } from "src/static/applicationLanguage";
import { UserEntity } from "../user.entity";

export namespace CreateUserDTO {
    export class CreateUserRequest {
        @IsDefined({
            message: 'Email is required'
        })
        @IsString({
            message: 'Email must be a string'
        })
        @IsEmail({}, {
            message: 'Email must be a valid email address'
        })
        @ApiProperty()
        // @ApiBody()
        email!: string;

        @IsOptional({
            message: 'Language is optional'
        })
        language?: ApplicationLanguage;

        fill(email: string, language?: ApplicationLanguage) {
            this.email = email;
            this.language = language;
        }
    }

    export class CreateUserResponse {
        @IsDefined({
            message: 'Verification id is required'
        })
        @IsInt({
            message: 'Verification id must be an int'
        })
        @ApiProperty()
        verificationId!: number;
        

        fill(verificationId: number) {
            this.verificationId = verificationId;
        }
    }
};