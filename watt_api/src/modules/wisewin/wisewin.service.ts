import { InjectRepository } from "@nestjs/typeorm";
import { WalletException } from "src/exceptions/wallet.exception";
import { Result } from "src/shared/concrete/Result";
import { Repository } from "typeorm";
import { UserEntity } from "../users/user.entity";
import { CreateInvoiceDTO } from "./dto/createInvoice.dto";
import { WisewinService as WWService } from '../../services/wisewin/wisewin.service';
import { Injectable } from "@nestjs/common";

@Injectable()
export class WisewinService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        private wisewinService: WWService
    ) {}

    public async createInvoice(request: CreateInvoiceDTO.Request): Promise<Result<CreateInvoiceDTO.Response | undefined, WalletException | undefined>> {
        const user = await this.userRepository.findOne({ where: { id: request.userId } });
        if (!user) {
            return Result.fail(WalletException.notFound('User with id does not exist'));
        }

        const currentPullGotten = await this.wisewinService.getCurrentPull();
        if (currentPullGotten.isFailure) {
            return Result.fail(WalletException.internalError('Error upon getting current pull'));
        }

        const currentPull = currentPullGotten.getValue()!;

        const difference = currentPull.maxSale - currentPull.currentSale;
        if (request.price > difference) {
            return Result.fail(WalletException.invalidData('Price (amount) is greater than current sale'));
        }

        const tradeCreated = await this.wisewinService.createTrade();
        if (tradeCreated.isFailure) {
            return Result.fail(WalletException.internalError('Error upon creating trade'));
        }

        const { tradeId } = tradeCreated.getValue()!;

        const invoiceCreated = await this.wisewinService.createInvoice(request.price, tradeId, user.wisewinId!);
        if (invoiceCreated.isFailure) {
            return Result.fail(WalletException.internalError('Error upon creating invoice'));
        }

        const invoice = invoiceCreated.getValue()!;

        const createInvoiceData = new CreateInvoiceDTO.Response(invoice);
        return Result.ok(createInvoiceData);
    }
}