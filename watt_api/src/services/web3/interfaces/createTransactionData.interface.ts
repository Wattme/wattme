export interface ICreateTransactionData {
    transaction: {
        nonce: string;
        from: string;
        to: string;
        value: string;
        chainID: number;
        gasLimit: string;
        gasPrice: string;
        maxGas: string;
    };
};