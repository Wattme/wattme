import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDefined, IsInt, IsOptional, IsString, Length, MinLength } from "class-validator";

export namespace UpdatePasswordDTO {
    export class UpdatePasswordRequest {
        @IsDefined({
            message: 'User id is required'
        })
        @IsInt({
            message: 'User id must be an int'
        })
        @ApiProperty()
        id!: number;

        @IsDefined({
            message: 'Current password is required'
        })
        @IsString({
            message: 'Current password must be a string'
        })
        @MinLength(8, {
            message: 'Current password\'s length must be greater or equal to 8'
        })
        @ApiProperty()
        currentPassword!: string;

        @IsDefined({
            message: 'New password is required'
        })
        @IsString({
            message: 'New password must be a string'
        })
        @MinLength(8, {
            message: 'New password\'s length must be greater or equal to 8'
        })
        @ApiProperty()
        newPassword!: string;

        fill(id: number, currentPassword: string, newPassword: string) {
            this.id = id;
            this.currentPassword = currentPassword;
            this.newPassword = newPassword;
        }
    }

    export class UpdatePasswordResponse {
        @IsDefined({
            message: 'Success is required'
        })
        @IsBoolean({
            message: 'Success must be a boolean'
        })
        @ApiProperty()
        success!: boolean;

        fill(success: boolean) {
            this.success = success;
        }
    }
};