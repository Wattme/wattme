import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsInt, IsOptional } from "class-validator";
import { KeysEntity } from "../keys.entity";

export namespace GetKeysDTO {
    export class GetKeysRequest {
        @IsOptional({
            message: 'User id is required'
        })
        @IsInt({
            message: 'User id must be an int'
        })
        userId!: number;
        
        fill(userId: number) {
            this.userId = userId;
        }
    }

    export class GetKeysResponse {
        @IsDefined({
            message: 'Keys are required'
        })
        keys!: any[];

        fill(keys: any[]) {
            this.keys = keys;
        }
    }
};