import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsInt, IsOptional, IsString } from "class-validator";
import { KeysEntity } from "../keys.entity";

export namespace CreateKeysDTO {
    export class CreateKeysRequest {
        @IsOptional({
            message: 'User id is required'
        })
        @IsInt({
            message: 'User id must be an int'
        })
        userId!: number;

        @IsDefined({
            message: 'Name is required'
        })
        @IsString({
            message: 'Name must be a string'
        })
        @ApiProperty()
        name!: string;
        
        @IsDefined({
            message: 'Public key is required'
        })
        @IsString({
            message: 'Public key must be a string'
        })
        @ApiProperty()
        publicKey!: string;

        @IsDefined({
            message: 'Secret key is required'
        })
        @IsString({
            message: 'Secret key must be a string'
        })
        @ApiProperty()
        secretKey!: string;

        fill(userId: number, name: string, publicKey: string, secretKey: string) {
            this.userId = userId;
            this.name = name;
            this.publicKey = publicKey;
            this.secretKey = secretKey;
        }
    }

    export class CreateKeysResponse {
        @IsDefined({
            message: 'Keys are required'
        })
        @ApiProperty()
        keys!: any;

        fill(keys: any) {
            this.keys = keys;
        }
    }
};