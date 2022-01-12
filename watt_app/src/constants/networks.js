import currency from "./currency";
import urls from "./urls";

export default {
  binance: {
    key: 'binance',
    code: currency.bnb_code,
    name: 'Binance',
    chainId: 56,
    icon: require("../assets/png/networks/BNB.png"),
    provider: urls.urlRpcBinance
  },

  ethereum: {
    key: 'ethereum',
    code: currency.eth_code,
    name: 'Ethereum',
    chainId: 1,
    icon: require("../assets/png/networks/ETH.png"),
    provider: urls.urlRpcEthereum
  },

  matic: {
    key: 'matic',
    code: currency.matic_code,
    name: "Polygon",
    chainId: 137,
    icon: require("../assets/png/networks/POLYGON.png"),
    provider: urls.urlRpcPolygon
  },

  bitcoin: {
    key: 'bitcoin',
    code: currency.btc_code,
    name: currency.btc_name,
    chainId: 1,
    icon: "",
    provider: urls.urlRpcEthereum,

    isNotSelect: true
  },

  solana: {
    key: 'solana',
    code: currency.solana_code,
    name: currency.solana_name,
    chainId: 1,
    icon: require("../assets/png/networks/SOL.png"),
    provider: urls.urlRpcSolana,

    isNotSelect: true
  },
}
