export interface IConfigProps {
    tatum: {
        url: string;
        key: string;
    };

    bitcoinfees: {
        url: string;
    };

    blockcypher: {
        url: string;
        key: string;
    };

    ethgasstation: {
        url: string;
        key: string;
    };

    etherscan: {
        url: string;
        key: string;
    };

    bscgas: {
        url: string;
        key: string;
    };

    bscscan: {
        url: string;
        key: string;
    };

    polygongasstation: {
        url: string;
    };

    polygonscan: {
        url: string;
        key: string;
    };

    solanaBeach: {
        url: string;
        key: string;
    };

    binance: {
        url: string;
    };

    wisewin: {
        url: string;
    };

    googleStorage: {
        url: string;
        bucket: string;
        folder: string;
    };

    chains: {
        eth: number;
        bsc: number;
        polygon: number;
    };

    mailgun: {
        key: string;
        domain: string;
        host: string;
        from: string;
    };

    app: {
        jwtSecret: string;
        secret: string;
    };

    web3: {
        eth: string;
        bsc: string;
        polygon: string;
    };

    exchange: {
        bscAddress: string;
        bscPrivateKey: string;
        busdContract: string;
        busdDecimals: string;
        wattContract: string;
        wattDecimals: string;
    };

    bugsnag: {
        key: string;
    };
};
