import { Result } from "src/shared/concrete/Result";
import { IGetGasPriceData } from "./getGasPriceData.interface";

export interface IProvider {
    getGasPrice(): Promise<Result<IGetGasPriceData | undefined, Error | undefined>>
};