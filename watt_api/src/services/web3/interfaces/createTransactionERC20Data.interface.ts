export interface ICreateTransactionERC20Data {
    transaction: {
        nonce: string;
        from: string;
        to: string;
        value: string;
        chainID: number;
        gasLimit: string;
        gasPrice: string;
        data: any;
        maxGas: string;
    };
}