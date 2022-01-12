import { Body, Controller, Get, Post, Put, Query, Req, UseFilters, UseGuards, UsePipes } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { query, Request } from "express";
import { WalletException } from "src/exceptions/wallet.exception";
import { WalletExceptionFilter } from "src/filters/WalletException.filter";
import { ValidationPipe } from "src/pipes/ValidationPipe";
import { JWTAuthGuard } from "../auth/guards/jwtAuth.guard";
import { CreateRestorationDTO } from "../restoration/dto/createRestoration.dto";
import { AuthDTO } from "./dto/auth.dto";
import { CreateUserDTO } from "./dto/createUser.dto";
import { GetMeDTO } from "./dto/getMe.dto";
import { GetWisewinUserDTO } from "./dto/getWisewinUser.dto";
import { RestorePasswordDTO } from "./dto/restorePassword.dto";
import { UpdatePasswordDTO } from "./dto/updatePassword.dto";
import { UpdateUserDTO } from "./dto/updateUser.dto";
import { UserService } from "./user.service";

@Controller('users')
@ApiTags('Users')
export class UserController {
    constructor(
        private userService: UserService
    ) {}

    @Post('/create')
    @UsePipes(ValidationPipe)
    @UseFilters(WalletExceptionFilter)
    @ApiResponse({
        status: 201,
        description: 'Creates a new user and returns an email verification id.',
        type: CreateUserDTO.CreateUserResponse
    })
    @ApiResponse({
        status: 500,
        description: 'Internal error occurred (while internal HTTP requests, etc).',
        type: WalletException
    })
    @ApiResponse({
        status: 400,
        description: 'Validation error (provided data is not valid).',
        type: WalletException
    })
    async createUser(@Body() dto: CreateUserDTO.CreateUserRequest, @Req() req: any) {
        const createUserRequest = new CreateUserDTO.CreateUserRequest();
        createUserRequest.fill(dto.email, req.language);

        const result = await this.userService.createUser(createUserRequest);
        if (result.isFailure) {
            throw result.getError();
        }

        return result.getValue();
    }

    @Put('/update')
    @UsePipes(ValidationPipe)
    @UseFilters(WalletExceptionFilter)
    @UseGuards(JWTAuthGuard)
    @ApiResponse({
        status: 201,
        description: 'Updates user and returns a new copy.',
        type: UpdateUserDTO.UpdateUserResponse
    })
    @ApiResponse({
        status: 500,
        description: 'Internal error occurred (while internal HTTP requests, etc).',
        type: WalletException
    })
    @ApiResponse({
        status: 400,
        description: 'Validation error (provided data is not valid).',
        type: WalletException
    })
    async updateUser(@Body() body: Record<string, any>, @Req() req: any) {
        const updateUserRequest = new UpdateUserDTO.UpdateUserRequest();
        updateUserRequest.fill(
            req.payload.userId, 
            body.firstName, 
            body.lastName, 
            body.phone, 
            body.telegramUsername, 
            body.country, 
            body.city, 
            body.wisewinPatronCode,
            body.gender,
            body.dob,
            body.picture
        );
        const result = await this.userService.updateUser(updateUserRequest);
        if (result.isFailure) {
            throw result.getError();
        }

        return result.getValue();
    }

    @Put('/update-password')
    @UsePipes(ValidationPipe)
    @UseFilters(WalletExceptionFilter)
    @UseGuards(JWTAuthGuard)
    @ApiResponse({
        status: 201,
        description: 'Updates user\'s password and returns status.',
        type: UpdatePasswordDTO.UpdatePasswordResponse
    })
    @ApiResponse({
        status: 500,
        description: 'Internal error occurred (while internal HTTP requests, etc).',
        type: WalletException
    })
    @ApiResponse({
        status: 400,
        description: 'Validation error (provided data is not valid).',
        type: WalletException
    })
    async updatePassword(@Body() body: Record<string, any>, @Req() req: any) {
        const updatePasswordRequest = new UpdatePasswordDTO.UpdatePasswordRequest();
        updatePasswordRequest.fill(req.payload.userId, body.currentPassword, body.newPassword);
        const result = await this.userService.updatePassword(updatePasswordRequest);
        if (result.isFailure) {
            throw result.getError();
        }

        return result.getValue();
    }

    @Post('/auth')
    @UsePipes(ValidationPipe)
    @UseFilters(WalletExceptionFilter)
    @ApiResponse({
        status: 200,
        description: 'Authorizes user.',
        type: AuthDTO.AuthResponse
    })
    @ApiResponse({
        status: 500,
        description: 'Internal error occurred (while internal HTTP requests, etc).',
        type: WalletException
    })
    @ApiResponse({
        status: 400,
        description: 'Validation error (provided data is not valid).',
        type: WalletException
    })
    async auth(@Body() dto: AuthDTO.AuthRequest) {
        const result = await this.userService.auth(dto);
        if (result.isFailure) {
            throw result.getError();
        }

        return result.getValue();
    }

    @Get('/me')
    @UsePipes(ValidationPipe)
    @UseFilters(WalletExceptionFilter)
    @UseGuards(JWTAuthGuard)
    @ApiResponse({
        status: 200,
        description: 'Returns current user.',
        type: GetMeDTO.GetMeResponse
    })
    @ApiResponse({
        status: 500,
        description: 'Internal error occurred (while internal HTTP requests, etc).',
        type: WalletException
    })
    @ApiResponse({
        status: 400,
        description: 'Validation error (provided data is not valid).',
        type: WalletException
    })
    async getMe(@Req() req: any) {
        const getMeRequest = new GetMeDTO.GetMeRequest();
        getMeRequest.fill(req.payload.userId);
        const result = await this.userService.getMe(getMeRequest);
        if (result.isFailure) {
            throw result.getError();
        }

        return result.getValue();
    }

    @Post('/restore-password')
    @UsePipes(ValidationPipe)
    @UseFilters(WalletExceptionFilter)
    @ApiResponse({
        status: 201,
        description: 'Creates a restoration and returns its id.',
        type: RestorePasswordDTO.RestorePasswordResponse
    })
    @ApiResponse({
        status: 500,
        description: 'Internal error occurred (while internal HTTP requests, etc).',
        type: WalletException
    })
    @ApiResponse({
        status: 400,
        description: 'Validation error (provided data is not valid).',
        type: WalletException
    })
    async restoreUserPassword(@Query() dto: RestorePasswordDTO.RestorePasswordRequest, @Req() req: any) {
        const restoreUserPasswordRequest = new RestorePasswordDTO.RestorePasswordRequest()
        restoreUserPasswordRequest.fill(dto.email, req.language);
        const result = await this.userService.restorePassword(restoreUserPasswordRequest);
        if (result.isFailure) {
            throw result.getError();
        }

        return result.getValue();
    }

    @Get('/wisewin')
    @UsePipes(ValidationPipe)
    @UseFilters(WalletExceptionFilter)
    @UseGuards(JWTAuthGuard)
    @ApiResponse({
        status: 201,
        description: 'Returns wisewin user\'s information.',
        type: GetWisewinUserDTO.GetWisewinUserResponse
    })
    @ApiResponse({
        status: 500,
        description: 'Internal error occurred (while internal HTTP requests, etc).',
        type: WalletException
    })
    @ApiResponse({
        status: 400,
        description: 'Validation error (provided data is not valid).',
        type: WalletException
    })
    async getWisewinUser(@Req() req: any) {
        const getWisewinUserRequest = new GetWisewinUserDTO.GetWisewinUserRequest();
        getWisewinUserRequest.fill(req.payload.userId);
        const result = await this.userService.getWisewinUser(getWisewinUserRequest);
        if (result.isFailure) {
            throw result.getError();
        }

        return result.getValue();
    }
}