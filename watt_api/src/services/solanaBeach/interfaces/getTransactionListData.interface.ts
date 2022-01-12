export type TransactionAccount = {
    account: {
        name?: string;
        address: string;
    };
    program?: boolean;
};

export type TransactionMeta = {
    fee: number;
    preBalances: number[];
    postBalances: number[];
};

export type TransactionBlocktime = {
    absolute: number;
    relative: number;
};

export type Transaction = {
    transactionHash: string;
    blockNumber: number;
    index: number;
    accounts: TransactionAccount[];
    meta: TransactionMeta;
    blocktime: TransactionBlocktime;
    valid: boolean;
};

export interface IGetTransactionListData {
    transactions: Transaction[];
};