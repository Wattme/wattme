import { Result } from "src/shared/concrete/Result";
import { IGetTransactionListData } from "./getTransactionListData.interface";
import { IGetTransactionStatusData } from "./getTransactionStatusData.interface";

export interface IProvider {
    getAddressTransactionList(address: string, page: number, limit: number): Promise<Result<IGetTransactionListData | undefined, Error | undefined>>;
    getAddressTransactionListERC20(address: string, contract: string, page: number, limit: number): Promise<Result<IGetTransactionListData | undefined, Error | undefined>>;
    getTransactionStatus(hash: string): Promise<Result<IGetTransactionStatusData | undefined, Error | undefined>>;
};