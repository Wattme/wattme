import { HttpException } from "@nestjs/common";
import { ApiProperty } from '@nestjs/swagger';

type WalletErrorDetails = any;

type WalletError = {
    code: string;
    status: number;
    message: string;
    details?: WalletErrorDetails;
};

export class WalletException {
    @ApiProperty()
    public code!: string;
    
    @ApiProperty()
    public message!: string;
    
    @ApiProperty()
    public status!: number;
    
    @ApiProperty()
    public details: any;

    public constructor(error: WalletError) {
        this.code = error.code;
        this.message = error.message;
        this.status = error.status;
        this.details = error.details
    }

    static invalidData(details?: WalletErrorDetails): WalletException {
        return new WalletException({
            code: 'invalid-data',
            message: 'Provided data is not valid',
            status: 400,
            details: details
        });
    }

    static internalError(details?: WalletErrorDetails): WalletException {
        return new WalletException({
            code: 'internal-error',
            message: 'Internal error occurred',
            status: 500,
            details: details
        });
    }

    static insufficientBalance(details?: WalletErrorDetails): WalletException {
        return new WalletException({
            code: 'insufficient-balance',
            message: 'There\'s an insufficient balance on address',
            status: 400,
            details: details
        });
    }

    static notFound(details?: WalletErrorDetails): WalletException {
        return new WalletException({
            code: 'not-found',
            message: 'Method you\'re addressing does not exist',
            status: 404,
            details: details
        });
    }

    static conflict(details?: WalletErrorDetails): WalletException {
        return new WalletException({
            code: 'confict',
            message: 'Conflict occurred',
            status: 404,
            details: details
        });
    }

    static unauthorized(details?: WalletErrorDetails): WalletException {
        return new WalletException({
            code: 'unauthorized',
            message: 'Request is not authorized',
            status: 401,
            details: details
        });
    }

    static forbidden(details?: WalletErrorDetails): WalletException {
        return new WalletException({
            code: 'forbidden',
            message: 'Action is forbidden',
            status: 403,
            details: details
        });
    }
}