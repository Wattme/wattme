import { Controller, Get, Query, UseFilters, UsePipes } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { WalletException } from "src/exceptions/wallet.exception";
import { WalletExceptionFilter } from "src/filters/WalletException.filter";
import { ValidationPipe } from "src/pipes/ValidationPipe";
import { ConfirmRestorationDTO } from "./dto/confirmRestoration.dto";
import { RestorationService } from "./restoration.service";

@Controller('restorations')
@ApiTags('Restorations')
export class RestorationController {
    constructor(
        private restorationService: RestorationService
    ) {}

    @Get('/confirm')
    @UsePipes(ValidationPipe)
    @UseFilters(WalletExceptionFilter)
    @ApiResponse({
        status: 200,
        description: 'Confirms user\'s attempt to restore password and returns jwt. Use this jwt as a value of the x-auth-token header',
        type: ConfirmRestorationDTO.ConfirmRestorationResponse
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
    async confirmRestoration(@Query() dto: ConfirmRestorationDTO.ConfirmRestorationRequest) {
        const result = await this.restorationService.confirmRestoration(dto);
        if (result.isFailure) {
            throw result.getError();
        }

        return result.getValue();
    }
}