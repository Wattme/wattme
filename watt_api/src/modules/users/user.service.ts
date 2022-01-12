import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { WalletException } from "src/exceptions/wallet.exception";
import { Result } from "src/shared/concrete/Result";
import { Code, Repository } from "typeorm";
import { CreateUserDTO } from "./dto/createUser.dto";
import { GetUserByEmailDTO } from "./dto/getUserByEmail.dto";
import { UserEntity } from "./user.entity";
import bcrypt from 'bcrypt';
import { VerificationService } from "../verification/verfication.service";
import { CreateVerificationDTO } from "../verification/dto/createVerification.dto";
import { MailgunService } from "src/services/mailgun/mailgun.service";
import * as uuid from 'uuid';
import { UpdateUserDTO } from "./dto/updateUser.dto";
import { AuthDTO } from "./dto/auth.dto";
import { AuthService } from "src/services/auth/auth.service";
import { UpdatePasswordDTO } from "./dto/updatePassword.dto";
import { GetMeDTO } from "./dto/getMe.dto";
import { EncryptionService } from "src/services/encryption/encryption.service";
import { validate } from "class-validator";
import { RestorationService } from "../restoration/restoration.service";
import { RestorePasswordDTO } from "./dto/restorePassword.dto";
import { CreateRestorationDTO } from "../restoration/dto/createRestoration.dto";
import { WisewinService } from "src/services/wisewin/wisewin.service";
import { GetWisewinUserDTO } from "./dto/getWisewinUser.dto";
import { User } from "src/services/wisewin/interfaces/user.type";
import { ICreateUserRequest } from "src/services/wisewin/interfaces/createUserData.interface";
import { MediaService } from "src/services/media/media.service";
import moment from "moment";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        private verificationService: VerificationService,
        private restorationService: RestorationService,
        private mailgunService: MailgunService,
        private authService: AuthService,
        private wisewinService: WisewinService,
        private mediaService: MediaService
    ) { }

    public async createUser(request: CreateUserDTO.CreateUserRequest): Promise<Result<CreateUserDTO.CreateUserResponse | undefined, WalletException | undefined>> {
        let user: UserEntity;

        const userWithEmail = await this.userRepository.findOne({
            where: {
                email: request.email
            }
        });

        if (userWithEmail) {
            user = userWithEmail;
            if (user.verified) {
                return Result.fail(WalletException.conflict('User with email already exists'));
            }

        } else {
            user = this.userRepository.create({
                email: request.email,
                password: '********'
            });

            await user.hashPassword();
        }

        const userSynchronized = await this.syncWithWisewin(user, 'create');
        if (userSynchronized.isFailure) {
            return Result.fail(WalletException.internalError('Error upon synchronizing user'));
        }

        user = userSynchronized.getValue()!;

        const savedUser = await this.userRepository.save(user);
        if (!savedUser) {
            return Result.fail(WalletException.internalError('Error upon saving user'));
        }

        const createVerificationRequest = new CreateVerificationDTO.createVerficicationRequest();
        createVerificationRequest.fill(user);
        const verificationCreated = await this.verificationService.createVerification(createVerificationRequest);
        if (verificationCreated.isFailure) {
            return Result.fail(verificationCreated.getError()!);
        }

        const { verification } = verificationCreated.getValue()!;

        const emailSent = await this.mailgunService.send(user.email, 'verification', { body: { code: verification.code }, title: {} }, request.language);
        if (emailSent.isFailure) {
            return Result.fail(WalletException.internalError())
        }

        const createUserResponse = new CreateUserDTO.CreateUserResponse();
        createUserResponse.fill(verification.id);

        return Result.ok(createUserResponse);
    }

    public async auth(request: AuthDTO.AuthRequest): Promise<Result<AuthDTO.AuthResponse | undefined, WalletException | undefined>> {
        const user = await this.userRepository.findOne({
            where: {
                email: request.email
            }
        });

        if (!user) {
            return Result.fail(WalletException.notFound('User with email does not exist'));
        }

        if (!user.verified) {
            return Result.fail(WalletException.invalidData('User is not verified'));
        }

        const match = await user.comparePassword(request.password);
        if (!match) {
            return Result.fail(WalletException.invalidData('Password is not correct'));
        }

        const jwtCreated = await this.authService.sign({ userId: user.id, role: user.role });
        if (jwtCreated.isFailure) {
            return Result.fail(WalletException.internalError('Error upon signing jwt'));
        }

        const jwt = jwtCreated.getValue()!;

        const authResponse = new AuthDTO.AuthResponse();
        authResponse.fill(jwt);

        return Result.ok(authResponse);
    }

    public async updateUser(request: UpdateUserDTO.UpdateUserRequest): Promise<Result<UpdateUserDTO.UpdateUserResponse | undefined, WalletException | undefined>> {
        const errors = await validate(request);
        if (errors.length) {
            return Result.fail(WalletException.invalidData(errors))
        }

        const user = await this.userRepository.findOne({
            where: {
                id: request.id
            }
        });

        if (!user) {
            return Result.fail(WalletException.notFound('User with id does not exist'));
        }

        if (request.firstName != undefined) {
            user.firstName = request.firstName;
        }

        if (request.lastName != undefined) {
            user.lastName = request.lastName;
        }

        if (request.phone != undefined) {
            user.phone = request.phone;
        }

        if (request.telegramUsername != undefined) {
            user.telegramUsername = request.telegramUsername;
        }

        if (request.country != undefined) {
            user.country = request.country;
        }

        if (request.city != undefined) {
            user.city = request.city;
        }

        if (request.wisewinPatronCode != undefined) {
            user.wisewinPatronCode = request.wisewinPatronCode;
        }

        if (request.dob != undefined) {
            user.dob = new Date(request.dob);
        }

        if (request.gender != undefined) {
            user.gender = request.gender;
        }

        if (request.picture != undefined) {
            const pictureSaved = await this.mediaService.save(request.picture);
            if (pictureSaved.isFailure) {
                return Result.fail(WalletException.internalError('Error upon saving picture'));
            }

            const picture = pictureSaved.getValue()!;
            user.picture = picture;
        }

        user.full = user.isFull();

        const userSynchronized = await this.syncWithWisewin(user, 'update');
        if (userSynchronized.isFailure) {
            return Result.fail(userSynchronized.getError()!);
        }

        const savedUser = await this.userRepository.save(user);
        if (!savedUser) {
            return Result.fail(WalletException.internalError('Error upon saving user'));
        }

        const updateUserResponse = new UpdateUserDTO.UpdateUserResponse();
        updateUserResponse.fill(true);

        return Result.ok(updateUserResponse);
    }

    public async updatePassword(request: UpdatePasswordDTO.UpdatePasswordRequest): Promise<Result<UpdatePasswordDTO.UpdatePasswordResponse | undefined, WalletException | undefined>> {
        const errors = await validate(request);
        if (errors.length) {
            return Result.fail(WalletException.invalidData(errors))
        }

        const user = await this.userRepository.findOne({
            where: {
                id: request.id
            }
        });

        if (!user) {
            return Result.fail(WalletException.notFound('User with id does not exist'));
        }

        const currentPasswordMatched = await user.comparePassword(request.currentPassword);
        if (!currentPasswordMatched) {
            return Result.fail(WalletException.invalidData('Current password is not correct'));
        }

        user.password = request.newPassword;
        await user.hashPassword();

        const userSynchronized = await this.syncWithWisewin(user, 'update', request.newPassword);
        if (userSynchronized.isFailure) {
            return Result.fail(userSynchronized.getError()!);
        }

        const savedUser = await this.userRepository.save(user);
        if (!savedUser) {
            return Result.fail(WalletException.internalError('Error upon saving user'));
        }

        const updatePasswordResponse = new UpdatePasswordDTO.UpdatePasswordResponse();
        updatePasswordResponse.fill(true);

        return Result.ok(updatePasswordResponse);
    }

    public async getUserByEmail(request: GetUserByEmailDTO.GetUserByEmailRequest): Promise<Result<GetUserByEmailDTO.GetUserByEmailResponse | undefined, WalletException | undefined>> {
        const user = await this.userRepository.findOne({
            where: {
                email: request.email
            }
        });

        if (!user) {
            return Result.fail(WalletException.notFound('User with email does not exist'));
        }

        const getUserByEmailResponse = new GetUserByEmailDTO.GetUserByEmailResponse();
        getUserByEmailResponse.fill(user);

        return Result.ok(getUserByEmailResponse);
    }

    public async getMe(request: GetMeDTO.GetMeRequest): Promise<Result<GetMeDTO.GetMeResponse | undefined, WalletException | undefined>> {
        const user = await this.userRepository.findOne({
            where: {
                id: request.id
            }
        });

        if (!user) {
            return Result.fail(WalletException.notFound('User with id does not exist'));
        }

        const getMeResponse = new GetMeDTO.GetMeResponse();
        getMeResponse.fill(user.sanitize());

        return Result.ok(getMeResponse);
    }

    public async restorePassword(request: RestorePasswordDTO.RestorePasswordRequest): Promise<Result<RestorePasswordDTO.RestorePasswordResponse | undefined, WalletException | undefined>> {
        let user = await this.userRepository.findOne({
            where: {
                email: request.email
            }
        });

        if (!user) {
            const wisewinUserFound = await this.wisewinService.getUserByEmail(request.email);
            if (wisewinUserFound.isFailure) {
                return Result.fail(WalletException.notFound('User with email does not exist'));
            }

            user = this.userRepository.create({
                email: request.email,
                password: '********'
            });
            
            await user.hashPassword();

            const userSynchronized = await this.syncWithWisewin(user, 'create');
            if (userSynchronized.isFailure) {
                return Result.fail(userSynchronized.getError()!);
            }

            user = userSynchronized.getValue()!;
            const savedUser = await this.userRepository.save(user);
            if (!savedUser) {
                return Result.fail(WalletException.internalError('Error upon saving user'));
            }

            user = savedUser;
        }

        const createRestorationRequest = new CreateRestorationDTO.CreateRestorationRequest();
        createRestorationRequest.fill(user);
        const restorationCreated = await this.restorationService.createRestoration(createRestorationRequest);
        if (restorationCreated.isFailure) {
            return Result.fail(restorationCreated.getError()!);
        }

        const { restoration } = restorationCreated.getValue()!;

        const emailSent = await this.mailgunService.send(user.email, 'restoration', { body: { code: restoration.code }, title: {} }, request.language);
        if (emailSent.isFailure) {
            return Result.fail(WalletException.internalError())
        }

        const restorePasswordResponse = new RestorePasswordDTO.RestorePasswordResponse();
        restorePasswordResponse.fill(restoration.id);

        return Result.ok(restorePasswordResponse);
    }

    public async getWisewinUser(request: GetWisewinUserDTO.GetWisewinUserRequest): Promise<Result<GetWisewinUserDTO.GetWisewinUserResponse | undefined, WalletException | undefined>> {
        const user = await this.userRepository.findOne({
            where: {
                id: request.id
            }
        });

        if (!user) {
            return Result.fail(WalletException.notFound('User with email does not exist'));
        }

        const wisewinUserGotten = await this.wisewinService.getUserByEmail(user.email);
        if (wisewinUserGotten.isFailure) {
            return Result.fail(WalletException.internalError('Error upon getting wisewin user'));
        }

        const { user: wisewinUser } = wisewinUserGotten.getValue()!;

        const getWisewinUserResponse = new GetWisewinUserDTO.GetWisewinUserResponse();
        getWisewinUserResponse.fill(wisewinUser);

        return Result.ok(getWisewinUserResponse);
    }

    private async syncWithWisewin(user: UserEntity, action: 'create' | 'update', password?: string): Promise<Result<UserEntity | undefined, WalletException | undefined>> {
        if (user.wisewinId && action == 'update') {
            const userUpdated = await this.wisewinService.updateUser(user.wisewinId, {
                city: user.city,
                country: user.country,
                // dob: user.dob,
                firstName: user.firstName,
                gender: user.gender,
                lastName: user.lastName,
                locale: user.location,
                phone: user.phone,
                picture: user.picture,
                referrerCode: user.wisewinPatronCode,
                telegramId: user.telegramUsername,
                password: password
            });

            if (userUpdated.isFailure) {
                return Result.fail(WalletException.internalError('Error upon updating user'));
            }
        }

        if (action == 'create') {
            const wisewinUserGotten = await this.wisewinService.getUserByEmail(user.email);
            if (wisewinUserGotten.isFailure) {
                const createUserRequest: ICreateUserRequest = {
                    email: user.email
                };

                const wisewinUserCreated = await this.wisewinService.createUser(createUserRequest);
                if (wisewinUserCreated.isFailure) {
                    return Result.fail(WalletException.internalError('Error upon creating wisewin user'));
                }

                const { userId } = wisewinUserCreated.getValue()!;
                user.wisewinId = userId;
            } else {
                const wisewinUser = wisewinUserGotten.getValue()!.user;

                user.firstName = wisewinUser.firstName;
                user.lastName = wisewinUser.lastName;
                user.wisewinId = wisewinUser.userId;
                user.phone = wisewinUser.phone;
                user.country = wisewinUser.country;
                user.city = wisewinUser.city;
                // user.dob = wisewinUser.dob;
                user.gender = wisewinUser.gender;
                user.picture = wisewinUser.avatar;
                user.telegramUsername = wisewinUser.telegramUsername || undefined;
                user.wisewinPatronCode = wisewinUser.parentRefCode || undefined;
                user.location = wisewinUser.locale || undefined;
            }
        }

        user.full = user.isFull();

        return Result.ok(user);
    }
}