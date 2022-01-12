import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsEmail, IsInt, IsOptional, IsString } from "class-validator";
import { User } from "src/services/wisewin/interfaces/user.type";

export namespace GetWisewinUserDTO {
    export class GetWisewinUserRequest {
        @IsOptional({
            message: 'User id is optional'
        })
        @IsInt({
            message: 'User id must be an int'
        })
        id!: number;

        fill(id: number) {
            this.id = id;
        }
    }

    export class GetWisewinUserResponse {
        @IsDefined({
            message: 'User is required'
        })
        @ApiProperty()
        user!: User;

        fill(user: User) {
            this.user = user;
        }
    }
};