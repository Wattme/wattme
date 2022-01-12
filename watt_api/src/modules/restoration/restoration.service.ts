import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { WalletException } from "src/exceptions/wallet.exception";
import { AuthService } from "src/services/auth/auth.service";
import { WisewinService } from "src/services/wisewin/wisewin.service";
import { Result } from "src/shared/concrete/Result";
import { Repository } from "typeorm";
import { UserEntity } from "../users/user.entity";
import { ConfirmRestorationDTO } from "./dto/confirmRestoration.dto";
import { CreateRestorationDTO } from "./dto/createRestoration.dto";
import { RestorationEntity } from "./restoration.entity";

@Injectable()
export class RestorationService {
    constructor(
        @InjectRepository(RestorationEntity)
        private restorationRepo: Repository<RestorationEntity>,

        @InjectRepository(UserEntity)
        private userRepo: Repository<UserEntity>,

        private authService: AuthService,
        private wisewinService: WisewinService
    ) {}

    public async createRestoration(request: CreateRestorationDTO.CreateRestorationRequest): Promise<Result<CreateRestorationDTO.CreateRestorationResponse | undefined, WalletException | undefined>> {
        const restoration = this.restorationRepo.create({
            user: request.user
        });

        restoration.setCode();

        const savedRestoration = await this.restorationRepo.save(restoration);
        if (!savedRestoration) {
            return Result.fail(WalletException.internalError('Error upon saving restoration'));
        }

        const createRestorationResponse = new CreateRestorationDTO.CreateRestorationResponse();
        createRestorationResponse.fill(restoration);

        return Result.ok(createRestorationResponse);
    }

    public async confirmRestoration(request: ConfirmRestorationDTO.ConfirmRestorationRequest): Promise<Result<ConfirmRestorationDTO.ConfirmRestorationResponse | undefined, WalletException | undefined>> {
        const restoration = await this.restorationRepo.findOne({where: {
            id: request.id
        }, relations: [
            'user'
        ]});

        if (!restoration) {
            return Result.fail(WalletException.notFound('Restoration does not exist'));
        }

        const { user } = restoration;

        if (restoration.confirmed) {
            return Result.fail(WalletException.invalidData('Restoration is already confirmed'));
        }

        if (restoration.code != request.code) {
            return Result.fail(WalletException.invalidData('Restoration code is not correct'))
        }

        restoration.confirmed = true;

        const newPasswordSet = await this.wisewinService.setNewPassword(user.wisewinId!, request.newPassword);
        if (newPasswordSet.isFailure) {
            return Result.fail(WalletException.internalError('Error upon setting new password'))
        }

        const restorationSaved = await this.restorationRepo.save(restoration);
        if (!restorationSaved) {
            return Result.fail(WalletException.internalError('Error upon saving restoration'));
        }
        
        user.password = request.newPassword;
        await user.hashPassword();

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

        const confirmRestorationResponse = new ConfirmRestorationDTO.ConfirmRestorationResponse();
        confirmRestorationResponse.fill(jwt);

        return Result.ok(confirmRestorationResponse);
    }
}