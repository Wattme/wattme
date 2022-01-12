import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { ExchangeService } from "src/modules/exchange/exchange.service";

@Injectable()
export class CronService {
    private inProcess: boolean;
    private logger: Logger;

    constructor(
        private exchangeService: ExchangeService
    ) {
        this.inProcess = true;
        this.logger = new Logger('CronService')
    }

    @Cron(CronExpression.EVERY_10_SECONDS)
    public async runEveryMinute() {
        try {
            if (this.inProcess) return;
            
            this.inProcess = true;
            this.logger.log('Executing confirmOrders');
            await this.exchangeService.confirmOrders();

            this.logger.log('Executing matchOrders');
            await this.exchangeService.matchOrders();
            this.inProcess = false;
        } catch (ex: any) {
            this.logger.error(ex);
        }
    }
}