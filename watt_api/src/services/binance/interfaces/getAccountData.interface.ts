export type AccountType = 'SPOT'

export type Balance = {
    asset: string;
    free: string;
    locked: string;
};

export interface IGetAccountData {
    canTrade: boolean;
    canWithdraw: boolean;
    accountType: AccountType;
    balances: Balance[];
};