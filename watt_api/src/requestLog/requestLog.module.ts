import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RequestLogEntity } from "./requestLog.entity";
import { RequestLogService } from "./requestLog.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([RequestLogEntity])
    ],
    providers: [
        RequestLogService
    ],
    exports: [
        RequestLogService
    ]
})
export class RequestLogModule {}