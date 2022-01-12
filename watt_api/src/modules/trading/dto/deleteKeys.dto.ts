import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDefined, IsInt, IsOptional } from "class-validator";

export namespace DeleteKeysDTO {
    export class DeleteKeysRequest {
        @IsOptional({
            message: 'User id is required'
        })
        @IsInt({
            message: 'User id must be an int'
        })
        userId!: number;

        @IsDefined({
            message: 'Keys id is required'
        })
        @Type(() => Number)
        @IsInt({
            message: 'Keys id must be an int'
        })
        @ApiProperty()
        id!: number;

        fill(userId: number, id: number) {
            this.userId = userId;
            this.id = id;
        }
    }

    export class DeleteKeysResponse {
        @IsDefined({
            message: 'Success is required'
        })
        @ApiProperty()
        success!: boolean;

        fill(success: boolean) {
            this.success = success;
        }
    }
};