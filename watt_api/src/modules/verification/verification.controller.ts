import { Controller, Get, Query, UseFilters, UsePipes } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { WalletException } from "src/exceptions/wallet.exception";
import { WalletExceptionFilter } from "src/filters/WalletException.filter";
import { ValidationPipe } from "src/pipes/ValidationPipe";
import { ConfirmVerificationDTO } from "./dto/confirmVerification.dto";
import { VerificationService } from "./verfication.service";

@Controller('verifications')
@ApiTags('Verifications')
export class VerificationController {
    constructor(
        private verificationService: VerificationService
    ) { }

    @Get('/confirm')
    @UsePipes(ValidationPipe)
    @UseFilters(WalletExceptionFilter)
    @ApiResponse({
        status: 200,
        description: 'Confirms user\'s email and returns jwt. Use this jwt as a value of the x-auth-token header',
        type: ConfirmVerificationDTO.ConfirmVerificationResponse
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
    async confirmVerification(@Query() dto: ConfirmVerificationDTO.ConfirmVerificationRequest) {
        const result = await this.verificationService.confirmVerification(dto);
        if (result.isFailure) {
            throw result.getError();
        }

        return result.getValue();
    }
}