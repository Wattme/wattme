import { IsDefined, IsEmail, IsString } from "class-validator";
import { UserEntity } from "../user.entity";

export namespace GetUserByEmailDTO {
    export class GetUserByEmailRequest {
        @IsDefined({
            message: 'Email is required'
        })
        @IsString({
            message: 'Email must be a string'
        })
        @IsEmail({}, {
            message: 'Email must be a valid email address'
        })
        email!: string;

        fill(email: string) {
            this.email = email;
        }
    }

    export class GetUserByEmailResponse {
        @IsDefined({
            message: 'User is required'
        })
        user!: UserEntity;

        fill(user: UserEntity) {
            this.user = user;
        }
    }
};