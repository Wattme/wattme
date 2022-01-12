import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { IConfigProps } from './interfaces/configProps.interface';

@Injectable()
export class ConfigService {
    private _props: IConfigProps;

    constructor(filePath: string) {
        dotenv.config({path: filePath});
        this._props = {
            tatum: {
                url: process.env['TATUM_URL'] || "",
                key: process.env['TATUM_KEY'] || ""
            },
            bitcoinfees: {
                url: process.env['BITCOINFEES_URL'] || ""
            },
            blockcypher: {
                url: process.env['BLOCKCYPHER_URL'] || "",
                key: process.env['BLOCKCYPHER_KEY'] || ""
            },
            ethgasstation: {
                url: process.env['ETHGASSTATION_URL'] || "",
                key: process.env['ETHGASSTATION_KEY'] || ""
            },
            etherscan: {
                url: process.env['ETHERSCAN_URL'] || "",
                key: process.env['ETHERSCAN_KEY'] || ""
            },
            bscgas: {
                url: process.env['BSCGAS_URL'] || "",
                key: process.env['BSCGAS_KEY'] || ""
            },
            bscscan: {
                url: process.env['BSCSCAN_URL'] || "",
                key: process.env['BSCSCAN_KEY'] || ""
            },
            polygongasstation: {
                url: process.env['POLYGONGASSTATION_URL'] || ""
            },
            polygonscan: {
                url: process.env['POLYGONSCAN_URL'] || "",
                key: process.env['POLYGONSCAN_KEY'] || ""
            },
            solanaBeach: {
                url: process.env['SOLANA_BEACH_URL'] || "",
                key: process.env['SOLANA_BEACH_KEY'] || ""
            },
            mailgun: {
                key: process.env['MAILGUN_KEY'] || "",
                domain: process.env['MAILGUN_DOMAIN'] || "",
                host: process.env['MAILGUN_HOST'] || "",
                from: process.env['MAILGUN_FROM'] || ""
            },
            binance: {
                url: process.env['BINANCE_URL'] || ""
            },
            wisewin: {
                url: process.env['WISEWIN_URL'] || ""
            },
            googleStorage: {
                url: process.env['GOOGLE_STORAGE_URL'] || "",
                bucket: process.env['GOOGLE_STORAGE_BUCKET'] || "",
                folder: process.env['GOOGLE_STORAGE_FOLDER'] || ""
            },
            app: {
                jwtSecret: process.env['APP_JWT_SECRET'] || "",
                secret: process.env['APP_SECRET'] || ""
            },
            web3: {
                eth: process.env['ETH_WEB3_PROVIDER'] || "",
                bsc: process.env['BSC_WEB3_PROVIDER'] || "",
                polygon: process.env['POLYGON_WEB3_PROVIDER'] || ""
            },
            chains: {
                eth: Number(process.env['ETH_CHAIN_ID']) || 0,
                bsc: Number(process.env['BSC_CHAIN_ID']) || 0,
                polygon: Number(process.env['POLYGON_CHAIN_ID']) || 0
            },
            exchange: {
                bscAddress: process.env['EXCHANGE_BSC_ADDRESS'] || "",
                bscPrivateKey: process.env['EXCHANGE_BSC_PRIVATE_KEY'] || "",
                busdContract: process.env['EXCHANGE_BUSD_CONTRACT'] || "",
                busdDecimals: process.env['EXCHANGE_BUSD_DECIMALS'] || "",
                wattContract: process.env['EXCHANGE_WATT_CONTRACT'] || "",
                wattDecimals: process.env['EXCHANGE_WATT_DECIMALS'] || ""
            },
            bugsnag: {
                key: process.env['BUGSNAG_KEY'] || ""
            }
        };
    }

    public get props(): IConfigProps {
        return this._props;
    }
}
