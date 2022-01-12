import { Module } from "@nestjs/common";
import { RequestLogModule } from "src/requestLog/requestLog.module";
import { RequestLoggerMiddleware } from './requestLogger.middleware';

@Module({
    imports: [
        RequestLogModule
    ],
    exports: [
        RequestLoggerMiddleware
    ],
    providers: [
        RequestLoggerMiddleware
    ]
})
export class RequestLoggerModule {}