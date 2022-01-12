import { Injectable } from "@nestjs/common";
import * as solana from '@solana/web3.js';
import { ConfigService } from "src/config/config.service";
import { Result } from "src/shared/concrete/Result";
import { ICreateTransactionData } from "./interfaces/createTransactionData.interface";
import { IGetBalanceData } from "./interfaces/getBalanceData.interface";
import { IGetFeeData } from "./interfaces/getFeeData.interface";

@Injectable()
export class SolWeb3Service {
    private client: solana.Connection

    constructor() {
        this.client = this.buildClient();
    }

    public async getFee(): Promise<Result<IGetFeeData | undefined, Error | undefined>> {
        try {
            const { feeCalculator: { lamportsPerSignature } } = await this.client.getRecentBlockhash();
            const getFeeData: IGetFeeData = {
                fee: lamportsPerSignature.toString()
            };

            return Result.ok(getFeeData);
        } catch (ex: any) {
            return Result.fail(ex);
        }
    }

    public async getBalance(address: string): Promise<Result<IGetBalanceData | undefined, Error | undefined>> {
        try {
            const pubKey = new solana.PublicKey(address);
            const accountInfo = await this.client.getAccountInfo(pubKey);

            let balance = '0';

            if (accountInfo) {
                balance = accountInfo.lamports.toString();
            }

            const getBalanceData: IGetBalanceData = {
                balance: balance
            };

            return Result.ok(getBalanceData);
        } catch (ex: any) {
            return Result.fail(ex);
        }
    }

    public async createTransaction(senderAddress: string, recipientAddress: string, value: string): Promise<Result<ICreateTransactionData | undefined, Error | undefined>> {
        try {
            const transaction = new solana.Transaction();
            transaction.add(
                solana.SystemProgram.transfer({
                    fromPubkey: new solana.PublicKey(senderAddress),
                    toPubkey: new solana.PublicKey(recipientAddress),
                    lamports: Number(value)
                })
            );

            const createTransactionData: ICreateTransactionData = {
                transaction: transaction
            };

            return Result.ok(createTransactionData)
        } catch (ex: any) {
            return Result.fail(ex);
        }
    }

    private buildClient(): solana.Connection {
        return new solana.Connection(
            solana.clusterApiUrl('mainnet-beta'),
            'confirmed'
        );
    }
}