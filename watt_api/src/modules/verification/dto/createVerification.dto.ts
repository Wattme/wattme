import { IsDefined, IsInt, IsString } from "class-validator";
import { UserEntity } from "src/modules/users/user.entity";
import { VerificationEntity } from "../verification.entity";

export namespace CreateVerificationDTO {
    export class createVerficicationRequest {
        @IsDefined({
            message: 'User is required'
        })
        user!: UserEntity;

        fill(user: UserEntity) {
            this.user = user;
        }
    }

    export class createVerfificationResponse {
        @IsDefined()
        verification!: VerificationEntity;

        fill(verification: VerificationEntity) {
            this.verification = verification;
        }
    }
};