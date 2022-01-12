import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsInt } from "class-validator";
import { UserEntity } from "../user.entity";

export namespace GetMeDTO {   
    export class GetMeRequest {
        @IsDefined({
            message: 'User id is required'
        })
        @IsInt({
            message: 'User id must be an int'
        })
        @ApiProperty()
        id!: number;

        fill(id: number) {
            this.id = id;
        }
    }

    export class GetMeResponse {
        @IsDefined({
            message: 'User is required'
        })
        @ApiProperty()
        user!: UserEntity;

        fill(user: UserEntity) {
            this.user = user;
        }
    }
};