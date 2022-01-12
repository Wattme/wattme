import { DynamicModule, Module } from "@nestjs/common";
import { RequestLogModule } from "src/requestLog/requestLog.module";
import { Web3Service } from "./web3.service";

@Module({})
export class Web3Module { 
    static forFeature(rpcProvider: string, chainID: number, gasLimit: string, gasLimitERC20: string): DynamicModule {
        return {
            module: Web3Module,
            imports: [
                RequestLogModule
            ],
            providers: [
                {
                    provide: 'RPC_PROVIDER',
                    useValue: rpcProvider
                },
                {
                    provide: 'CHAIN_ID',
                    useValue: chainID
                },
                {
                    provide: 'GAS_LIMIT',
                    useValue: gasLimit
                },
                {
                    provide: 'GAS_LIMIT_ERC20',
                    useValue: gasLimitERC20
                },
                Web3Service
            ],
            exports: [
                Web3Service
            ]
        }
    }
}