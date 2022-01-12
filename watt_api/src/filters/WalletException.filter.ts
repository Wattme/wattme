import Bugsnag from "@bugsnag/js";
import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { WalletException } from "src/exceptions/wallet.exception";

@Catch(WalletException)
export class WalletExceptionFilter implements ExceptionFilter {
    public catch(exception: WalletException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.status;

        if (status == 500) {
            Bugsnag.notify(JSON.stringify(exception), (event) => {
                event.addMetadata('request_url', {
                    url: request.url
                });
                event.addMetadata('request_method', {
                    method: request.method
                });
                event.addMetadata('request_body', request.body);
                event.addMetadata('request_query', request.query);
                event.addMetadata('request_headers', request.headers);
            });
        }

        response
            .status(status)
            .json(exception);
    }
}