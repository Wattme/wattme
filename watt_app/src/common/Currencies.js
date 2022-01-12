import { store } from "../store/store";
import CryptoBnb from "../assets/png/currency/icon_bnb_black.png";
import CryptoEth from "../assets/png/currency/icon_ethereum_black.png";
import CryptoBtc from "../assets/png/currency/icon_btc_black.png";
import CryptoMatic from "../assets/png/currency/icon_matic_black.png";
import CryptoLtc from "../assets/png/currency/icon_ltc_black.png";
import CryptoMultiWallet from "../assets/png/currency/icon_multi_wallet_black.png";
import currency from "../constants/currency";

const currencies = [
  {
    icon: CryptoBnb,
    name: "Binance Coin",
    code: "BNB",
    codeServer: "bnb",
  },
  {
    icon: CryptoEth,
    name: "Ethereum",
    code: "ETH",
    codeServer: "eth",
  },
  {
    icon: CryptoBtc,
    name: "Bitcoin",
    code: "BTC",
    codeServer: "btc",
  },
  {
    icon: CryptoMatic,
    name: "Matic",
    code: "POLYGON",
    codeServer: "polygon",
  },
  {
    icon: CryptoLtc,
    name: currency.ltc_name,
    code: currency.ltc_code,
    codeServer: "ltc",
  },
  {
    icon: CryptoLtc,
    name: currency.solana_name,
    code: currency.solana_code,
    codeServer: "sol",
  },
];

const getCurrenciesForSelect = (wallets, hideMulti = false) => {
  const { globalState } = store.getState();
  const { walletImportInfo } = globalState || {};
  const { blockChain } = walletImportInfo || {};

  let list = currencies.filter((cur) => {
    if (!blockChain?.[cur.codeServer]) {
      return false
    }

    return !Boolean(wallets.find((wallet) => wallet.code === cur.code));
  });

  if (wallets.length === 0 && !hideMulti) {
    list.push({
      icon: CryptoMultiWallet,
      name: "Multi",
      code: "MULTI",
    })
  }

  return list;
}
const getCurrenciesStock = (wallets) => {
  return currencies.filter((cur) => {
    return Boolean(wallets.find((wallet) => wallet.code === cur.code));
  });
}

export {
  getCurrenciesForSelect,
  getCurrenciesStock
}
