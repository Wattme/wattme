import { IsDefined } from "class-validator";
import { UserEntity } from "src/modules/users/user.entity";
import { RestorationEntity } from "../restoration.entity";

export namespace CreateRestorationDTO {
    export class CreateRestorationRequest {
        @IsDefined({
            message: 'User is required'
        })
        user!: UserEntity;

        fill(user: UserEntity) {
            this.user = user;
        }
    }

    export class CreateRestorationResponse {
        @IsDefined()
        restoration!: RestorationEntity;

        fill(restoration: RestorationEntity) {
            this.restoration = restoration;
        }
    }
}