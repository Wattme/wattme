import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClientLogController } from "./clientLog.controller";
import { ClientLogEntity } from "./clientLog.entity";
import { ClientLogService } from "./clientLog.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([ClientLogEntity])
    ],
    providers: [
        ClientLogService
    ],
    controllers: [
        ClientLogController
    ]
})
export class ClientLogModule { }