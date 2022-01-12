import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDefined, IsEmail, IsInt, IsOptional } from "class-validator";
import { ApplicationLanguage } from "src/static/applicationLanguage";

export namespace RestorePasswordDTO {
    export class RestorePasswordRequest {
        @IsDefined({
            message: 'Email is required'
        })
        @IsEmail({}, {
            message: 'Email must be a valid email address'
        })
        @ApiProperty()
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

    export class RestorePasswordResponse {
        @IsDefined({
            message: 'Restoration id is required'
        })
        restorationId!: number;

        fill(restorationId: number) {
            this.restorationId = restorationId;
        }
    }
}