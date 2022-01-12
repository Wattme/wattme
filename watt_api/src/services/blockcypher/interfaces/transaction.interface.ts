export type TransactionInput = {
    prevHash: string;
    outputIndex: number;
    outputValue: number;
    sequence: number;
    addresses: string[];
    scriptType: string;
    age: number;
};

export type TransactionOutput = {
    value: number;
    script: string;
    addresses: string[];
    scriptType: string;
};

export interface ITransaction {
    blockHeight: number;
    blockIndex: number;
    hash: string;
    addresses: string[];
    total: number;
    fees: number;
    size: number;
    vsize: number;
    preference: string;
    relayedBy: string;
    received: Date;
    ver: number;
    doubleSpend: boolean;
    vinSz: number;
    voutSz: number;
    confirmations: number;
    inputs: TransactionInput[];
    outputs: TransactionOutput[];
};