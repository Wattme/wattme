import { store } from "../store/store";
import networks from "../constants/networks";
import * as solanaWeb3 from "@solana/web3.js";

const walletsGetTotalBalance = () => {
  const { globalState } = store.getState();
  const { wallets, currencies } = globalState;

  return wallets.reduce((balance, wallet) => {

    const currency = Number.parseFloat(currencies.find((t) => t.code === wallet.code)?.price_usd || "0");
    const amount = !Boolean(wallet.disable) ? Number.parseFloat(wallet.indivisibleBalance || "0") : 0;

    return balance + (currency * amount);
  }, 0);
};
const walletsGetProfitDay = () => {
  const { globalState } = store.getState();
  const { wallets, currencies } = globalState;

  let percent = 0;
  let amount = 0;

  const walletsBalance = wallets.filter((wallet) => wallet.indivisibleBalance !== "0");

  walletsBalance.map((wallet) => {
    const balance = !Boolean(wallet.disable) ? Number.parseFloat(wallet?.indivisibleBalance || "0") : 0;
    const currency = !Boolean(wallet.disable) ? currencies.find((t) => t.code === wallet.code) || {} : {};
    const usdBalance = balance * (Number.parseFloat(currency?.price_usd || "0") || 0);

    percent = percent + (Number.parseFloat(currency?.change_percent_24hr || "0") || 0);
    amount = amount + ((usdBalance / 100) * percent);
  });

  return {
    percent: percent.toFixed(3),
    amount: amount.toFixed(3),
  };
};
const walletsGetNetworks = () => {
  const { globalState } = store.getState();
  const { wallets } = globalState;

  let networksList = [];

  if (!Boolean(wallets.find((t) => t.code === "ETH")?.disable)) {
    networksList = [...networksList, networks.ethereum];
  }
  if (!Boolean(wallets.find((t) => t.code === "BNB")?.disable)) {
    networksList = [...networksList, networks.binance];
  }
  if (!Boolean(wallets.find((t) => t.code === "POLYGON")?.disable)) {
    networksList = [...networksList, networks.matic];
  }
  if (!Boolean(wallets.find((t) => t.code === "SOL")?.disable)) {
    networksList = [...networksList, networks.solana];
  }

  return networksList;
};
const walletsGetConnectionSolana = () => {
  return new solanaWeb3.Connection(solanaWeb3.clusterApiUrl("mainnet-beta"));
}

export {
  walletsGetNetworks,
  walletsGetProfitDay,
  walletsGetTotalBalance,
  walletsGetConnectionSolana
};
