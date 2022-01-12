export interface ICreateInvoiceData {
    price: number,
    hash: string,
    tradeId: string;
    sign: string;
    gasPrice: number;
    gasLimit: number;
};