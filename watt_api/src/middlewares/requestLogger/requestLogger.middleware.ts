import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction, response } from 'express';
import { RequestLogService } from 'src/requestLog/requestLog.service';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
    constructor(
        private requestLogService: RequestLogService
    ) {}

    public async use(req: Request, res: Response, next: NextFunction) {
        const requestBody = Object.keys(req.body).length ? JSON.stringify(req.body) : undefined; 
        const log = await this.requestLogService.create(req.method.toLowerCase(), req.url, requestBody);

        const before = new Date().getTime();
        let responseBody = '';
        let statusCode = res.statusCode;

        const oldJson = res.json;
        res.json = (body) => {
            responseBody = body ? JSON.stringify(body) : '';
            return oldJson.call(res, body);
        };

        const oldEnd = res.end;
        res.end = (...args: any): any => {
            statusCode = res.statusCode;
            oldEnd.apply(res, args);
       };

        res.on('finish', async () => {
            const after = new Date().getTime();
            const responseTime = after - before;

            await this.requestLogService.setResponse(log, statusCode, responseTime, responseBody);
        })
        next();
    }
}