import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RequestLogEntity } from "./requestLog.entity";

@Injectable()
export class RequestLogService {
    constructor(
        @InjectRepository(RequestLogEntity)
        private requestLogRepo: Repository<RequestLogEntity>
    ) {}

    public async create(method: string, url: string, request?: string): Promise<RequestLogEntity | undefined> {
        try {
            const requestLog = this.requestLogRepo.create();
            requestLog.method = method;
            requestLog.url = url;
            requestLog.request = request;

            const savedRequestLog = await this.requestLogRepo.save(requestLog);
            return savedRequestLog;
        } catch (ex) {
            return undefined;
        }
    }

    public async setResponse(entity: RequestLogEntity | undefined, code: number, responseTime: number, response: string): Promise<RequestLogEntity | undefined> {
        try {
            if (!entity) {
                return undefined;
            }

            entity.code = code;
            entity.responseTime = responseTime;
            entity.response = response;
    
            const savedRequestLog = await this.requestLogRepo.save(entity);
            return savedRequestLog;
        } catch {
            return undefined;
        }
    }
}