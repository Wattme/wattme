import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { WalletException } from "src/exceptions/wallet.exception";
import { Result } from "src/shared/concrete/Result";
import { Repository } from "typeorm";
import { ClientLogEntity } from "./clientLog.entity";
import { CreateLogDTO } from "./dto/createLog.dto";

@Injectable()
export class ClientLogService {
    constructor(
        @InjectRepository(ClientLogEntity)
        private clientLogRepo: Repository<ClientLogEntity>
    ) {}

    public async createLog(request: CreateLogDTO.CreateLogRequest): Promise<Result<CreateLogDTO.CreateLogResponse | undefined, WalletException | undefined>> {
        try {
            let log = this.clientLogRepo.create();
            log.userID = 0;
            log.title = request.title;
            log.message = request.message;
            log.error = request.error!;
            log.method = request.method;
            log.coinCode = request.coinCode;
            log.coinAddress = request.coinAddress;
            log.deviceInfo = request.deviceInfo;
            log.platform = request.platform;
            log.appVersion = request.appVersion;
            
            log = await this.clientLogRepo.save(log);

            const createLogResponse = new CreateLogDTO.CreateLogResponse();
            createLogResponse.fill(log);

            return Result.ok(createLogResponse);
        } catch {
            return Result.fail(WalletException.internalError('Error upon saving log'));
        }
    }
}