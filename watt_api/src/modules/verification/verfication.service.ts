import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { WalletException } from "src/exceptions/wallet.exception";
import { AuthService } from "src/services/auth/auth.service";
import { MailgunService } from "src/services/mailgun/mailgun.service";
import { WisewinService } from "src/services/wisewin/wisewin.service";
import { Result } from "src/shared/concrete/Result";
import { getConnection, Repository } from "typeorm";
import { UserEntity } from "../users/user.entity";
import { ConfirmVerificationDTO } from "./dto/confirmVerification.dto";
import { CreateVerificationDTO } from "./dto/createVerification.dto";
import { VerificationEntity } from "./verification.entity";

@Injectable()
export class VerificationService {
    constructor(
        @InjectRepository(VerificationEntity)
        private verificationRepo: Repository<VerificationEntity>,
        
        @InjectRepository(UserEntity)
        private userRepo: Repository<UserEntity>,

        private authService: AuthService,
        private wisewinService: WisewinService
    ) { }

    public async createVerification(request: CreateVerificationDTO.createVerficicationRequest): Promise<Result<CreateVerificationDTO.createVerfificationResponse | undefined, WalletException | undefined>> {
        const verification = this.verificationRepo.create({
            user: request.user
        });

        verification.setCode();

        const savedVerification = await this.verificationRepo.save(verification);
        if (!savedVerification) {
            return Result.fail(WalletException.internalError('Error upon saving user'));
        }

        const createVerificationResponse = new CreateVerificationDTO.createVerfificationResponse();
        createVerificationResponse.fill(savedVerification);

        return Result.ok(createVerificationResponse);
    }

    public async confirmVerification(request: ConfirmVerificationDTO.ConfirmVerificationRequest): Promise<Result<ConfirmVerificationDTO.ConfirmVerificationResponse | undefined, WalletException | undefined>> {
        const verification = await this.verificationRepo.findOne({
            where: {
                id: request.id
            }, relations: [
                'user'
            ]
        });

        if (!verification) {
            return Result.fail(WalletException.notFound('Verification with id does not exist'));
        }

        if (verification.confirmed) {
            return Result.fail(WalletException.invalidData('Validation is already confirmed'));
        }

        if (verification.code != request.code) {
            return Result.fail(WalletException.invalidData('Code is incorrect'));
        }

        verification.confirmed = true;

        const verificationSaved = await this.verificationRepo.save(verification);
        if (!verificationSaved) {
            return Result.fail(WalletException.internalError('Error upon saving verification'));
        }

        const { user } = verification;

        user.verified = true;
        const savedUser = await this.userRepo.save(user);
        if (!savedUser) {
            return Result.fail(WalletException.internalError('Error upon saving user'));
        }

        const jwtSigned = await this.authService.sign({
            userId: user.id,
            role: user.role
        });

        if (jwtSigned.isFailure) {
            return Result.fail(WalletException.internalError('Error upon saving signing jwt'));
        }

        const jwt = jwtSigned.getValue()!;

        const confirmVerificationResponse = new ConfirmVerificationDTO.ConfirmVerificationResponse();
        confirmVerificationResponse.fill(jwt);

        return Result.ok(confirmVerificationResponse);
    }
}