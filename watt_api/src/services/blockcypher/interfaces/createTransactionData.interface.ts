import { ITransaction } from "./transaction.interface";

export interface ICreateTransactionData {
    transaction: ITransaction;
    toSign: string[];
};