type TransactionInput = {
    prevout: {
        hash: string;
        index: number;
    };
    script: string;
    witness: string;
    sequence: number;
    coin: {
        version: number;
        height: number;
        value: number;
        script: string;
        address: string;
        coinbase: boolean;
    };
};

type TransactionOutput = {
    value: number;
    script: string;
    address: string;
};

export type Transaction = {
    blockNumber: number;
    fee: number;
    flag?: any;
    hash: string;
    index: number;
    locktime: number;
    mtime: number;
    inputs: TransactionInput[];
    outputs: TransactionOutput[];
    ps?: any;
    rate: number;
    time: number;
    version: number;
    witnessHash: string;
};

export interface IGetTransactionListData {
    transactions: Transaction[];
};