import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsEmail, IsString, MinLength } from "class-validator";

export namespace AuthDTO {
    export class AuthRequest {
        @IsDefined({
            message: 'Email is required'
        })
        @IsString({
            message: 'Email must be a string'
        })
        @IsEmail({}, {
            message: 'Email must a valid email address'
        })
        @ApiProperty()
        email!: string;

        @IsDefined({
            message: 'Password is required'
        })
        @IsString({
            message: 'Password must be a string'
        })
        @MinLength(8, {
            message: 'Password must be greater than or equal to 8'
        })
        @ApiProperty()
        password!: string;

        fill(email: string, password: string) {
            this.email = email;
            this.password = password;
        }
    }

    export class AuthResponse {
        @IsDefined({
            message: 'Jwt is required'
        })
        @IsString({
            message: 'Jwt must be a string'
        })
        @ApiProperty()
        jwt!: string;

        fill(jwt: string) {
            this.jwt = jwt;
        }
    }
};