import { ArgumentsHost, Catch, ExceptionFilter, NotFoundException } from "@nestjs/common";
import { WalletException } from "src/exceptions/wallet.exception";

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
    catch(exception: NotFoundException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        const notFoundException = WalletException.notFound({
            path: request.path,
            method: request.method
        });

        response.status(notFoundException.status).json(notFoundException);
    }
}