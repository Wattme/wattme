import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBase64, IsBoolean, IsDateString, IsDefined, IsEmail, IsIn, IsInt, IsNumber, IsOptional, IsPhoneNumber, IsString, Matches, MinLength } from "class-validator";
import MyRegexp from "myregexp";
import { first } from "rxjs";
import { UserGender, userGender } from "src/static/userGender";
import { UserEntity } from "../user.entity";

export namespace UpdateUserDTO {
    export class UpdateUserRequest {
        @IsDefined({
            message: 'User id is required'
        })
        @IsInt({
            message: 'User id must be an int'
        })
        @ApiProperty()
        id!: number;

        @IsOptional({
            message: 'First name is optional'
        })
        @IsString({
            message: 'First name must be a string'
        })
        @ApiPropertyOptional()
        firstName?: string;

        @IsOptional({
            message: 'Last name is optional'
        })
        @IsString({
            message: 'Last name must be a string'
        })
        @ApiPropertyOptional()
        lastName?: string;

        @IsOptional({
            message: 'Phone is optional'
        })
        @IsString({
            message: 'Phone must be a string'
        })
        @Matches(MyRegexp.phone(), {
            message: 'Phone must be a valid phone'
        })
        @ApiPropertyOptional()
        phone?: string;

        @IsOptional({
            message: 'Telegram username is optional'
        })
        @IsString({
            message: 'Telegram username must be a string'
        })
        @ApiPropertyOptional()
        telegramUsername?: string;

        @IsOptional({
            message: 'Country is optional'
        })
        @IsString({
            message: 'Country must be a string'
        })
        @ApiPropertyOptional()
        country?: string;

        @IsOptional({
            message: 'Country is optional'
        })
        @IsString({
            message: 'Country must be a string'
        })
        @ApiPropertyOptional()
        city?: string;

        @IsOptional({
            message: 'Wisewin patron code is optional'
        })
        @IsString({
            message: 'Wisewin patron code must be a string'
        })
        @ApiPropertyOptional()
        wisewinPatronCode?: string;

        @IsOptional({
            message: 'Date of birth is optional'
        })
        @IsString({
            message: 'Date of birth must be a string'
        })
        @IsDateString({}, {
            message: 'Date of birth must be a date string'
        })
        @ApiPropertyOptional()
        dob?: string;

        @IsOptional({
            message: 'Gender is optional'
        })
        @IsString({
            message: 'Gender must be a string'
        })
        @IsIn(userGender.getList(), {
            message: `User gender must be one of ${userGender.getList()}`
        })
        @ApiPropertyOptional()
        gender?: UserGender;

        @IsOptional({
            message: 'Picture is optional'
        })
        @IsString({
            message: 'Picture must be a string'
        })
        @ApiPropertyOptional()
        picture?: string;

        fill(
            id: number, 
            firstName?: string, 
            lastName?: string, 
            phone?: string,
            telegramUsername?: string,
            country?: string,
            city?: string,
            wisewinPatronCode?: string,
            gender?: UserGender,
            dob?: string,
            picture?: string
        ) {
            this.id = id;
            this.firstName = firstName;
            this.lastName = lastName;
            this.phone = phone;
            this.telegramUsername = telegramUsername;
            this.country = country;
            this.city = city;
            this.wisewinPatronCode = wisewinPatronCode;
            this.gender = gender;
            this.dob = dob;
            this.picture = picture;
        }
    }

    export class UpdateUserResponse {
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