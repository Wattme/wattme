import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsDefined, IsEnum, IsOptional, IsString } from "class-validator";
import { ClientLogEntity, Platform } from "../clientLog.entity";

export namespace CreateLogDTO {
    export class CreateLogRequest {
        @IsOptional({
            message: 'Title is optional'
        })
        @IsString({
            message: 'Title must be a string'
        })
        @ApiProperty()
        public title?: string;

        @IsOptional({
            message: 'Method is optional'
        })
        @IsString({
            message: 'Method must be a string'
        })
        @ApiProperty()
        public method?: string;

        @IsOptional({
            message: 'Message is optional'
        })
        @IsString({
            message: 'Message must be a string'
        })
        @ApiProperty()
        public message?: string;

        @IsOptional({
            message: 'Error is optional'
        })
        @Type(() => Boolean)
        @IsBoolean({
            message: 'Error must be a boolean'
        })
        @ApiProperty()
        public error?: boolean;

        @IsOptional({
            message: 'Coin code is optional'
        })
        @IsString({
            message: 'Coin code must be a string'
        })
        @ApiProperty()
        public coinCode?: string;

        @IsOptional({
            message: 'Coin address is optional'
        })
        @IsString({
            message: 'Coin address must be a string'
        })
        @ApiProperty()
        public coinAddress?: string;

        @IsOptional({
            message: 'Platform is optional'
        })
        @IsString({
            message: 'Platform must be a string'
        })
        @IsEnum(Platform, {
            message: 'Platform must be either "ios" or "android"'
        })
        @ApiProperty({enum: Platform})
        public platform?: Platform;

        @IsOptional({
            message: 'App version is optional'
        })
        @IsString({
            message: 'App version must be a string'
        })
        @ApiProperty()
        public appVersion?: string;

        @IsOptional({
            message: 'Device info is optional'
        })
        @IsString({
            message: 'Device info must be a string'
        })
        @ApiProperty()
        public deviceInfo?: string;

        fill(
            title: string | undefined,
            method: string | undefined,
            message: string | undefined,
            error: boolean,
            coinCode: string | undefined,
            coinAddress: string | undefined,
            platform: Platform | undefined,
            appVersion: string | undefined,
            deviceInfo: string | undefined
        ) {
            this.title = title;
            this.method = method;
            this.message = message;
            this.error = error;
            this.coinCode = coinCode;
            this.coinAddress = coinAddress;
            this.platform = platform;
            this.appVersion = appVersion;
            this.deviceInfo = deviceInfo;
        }
    }

    export class CreateLogResponse {
        @IsDefined({
            message: 'Log is required'
        })
        @ApiProperty()
        log!: ClientLogEntity

        fill(log: ClientLogEntity) {
            this.log  = log;
        }
    }
};