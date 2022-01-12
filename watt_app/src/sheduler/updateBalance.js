import { getItem } from "../common/Storage";
import axiosInstance from "../agent/agent";
import urls from "../constants/urls";
import ethConvert from "ether-converter";
import btcConvert from "satoshi-bitcoin";

export default async function(wallets) {

  if (!wallets) {
    wallets = await getItem("wallets");
    wallets = JSON.parse(wallets || "[]");
  }

  const isBnb = Boolean(wallets.find((t) => t.code === "BNB"));
  const isEth = Boolean(wallets.find((t) => t.code === "ETH"));
  const isBtc = Boolean(wallets.find((t) => t.code === "BTC"));
  const isMatic = Boolean(wallets.find((t) => t.code === "MATIC"));
  const isSol = Boolean(wallets.find((t) => t.code === "SOL"));

  if (isBnb) {
    const { address } = wallets.find((t) => t.code === "BNB");
    const balance = await axiosInstance.get(`${urls.bnbBalance}?address=${ address }`).then((response) => {
      return response.data
    }).catch((error) => {
      return {
        error: error.response
      }
    });

    if (!balance.error) {

      wallets.find((t) => t.code === 'BNB').indivisibleBalance = ethConvert(Number.parseFloat(balance.bnb) || 0, "wei", "ether");
      wallets.find((t) => t.code === 'BNB').printedBalance = ethConvert(Number.parseFloat(balance.bnb) || 0, "wei", "ether");

      wallets.find((t) => t.code === 'BUSD').indivisibleBalance = ethConvert(Number.parseFloat(balance.tokens[3].value) || 0, "wei", "ether");
      wallets.find((t) => t.code === 'BUSD').printedBalance = ethConvert(Number.parseFloat(balance.tokens[3].value) || 0, "wei", "ether");
      wallets.find((t) => t.code === 'BUSD').contract = balance.tokens[3].contract;

      wallets.find((t) => t.code === 'WWT').indivisibleBalance = ethConvert(Number.parseFloat(balance.tokens[2].value) || 0, "wei", "ether");
      wallets.find((t) => t.code === 'WWT').printedBalance = ethConvert(Number.parseFloat(balance.tokens[2].value) || 0, "wei", "ether");
      wallets.find((t) => t.code === 'WWT').contract = balance.tokens[2].contract;

    }

  }
  if (isEth) {
    const { address } = wallets.find((t) => t.code === "ETH");

    const balance = await axiosInstance.get(`${urls.ethBalance}?address=${address}`).then((response) => {
      return response.data
    }).catch((error) => {
      return {
        error: error.response
      }
    });

    if (balance.error) {
      return wallets
    }

    wallets.find((t) => t.code === 'ETH').indivisibleBalance = ethConvert(Number.parseFloat(balance.eth), "wei", "ether");
    wallets.find((t) => t.code === 'ETH').printedBalance = ethConvert(Number.parseFloat(balance.eth), "wei", "ether");

    wallets.find((t) => t.code === 'USDT').indivisibleBalance = ethConvert(Number.parseFloat(balance.tokens[1].value), "wei", "ether");
    wallets.find((t) => t.code === 'USDT').printedBalance = ethConvert(Number.parseFloat(balance.tokens[1].value), "wei", "ether");
    wallets.find((t) => t.code === 'USDT').contract = balance.tokens[1].contract;
  }
  if (isBtc) {
    const { address } = wallets.find((t) => t.code === "BTC");
    let balance = await axiosInstance.get(`${ urls.btcBalance }?address=${ address }&confirmations=0`).then((res) => {
      return res.data?.balance || '0'
    }).catch(err => {
      return '0'
    });

    balance = Number.parseFloat(balance);
    balance = btcConvert.toBitcoin(balance);

    wallets.find((t) => t.code === 'BTC').indivisibleBalance = String(balance);
    wallets.find((t) => t.code === 'BTC').printedBalance = String(balance);
  }
  if (isMatic) {
    const { address } = wallets.find((t) => t.code === "MATIC");
    const balance = await axiosInstance.get(`${urls.maticBalance}?address=${ address }`).then((response) => {
      return response.data
    }).catch((error) => {
      return {
        error: error.response
      }
    });

    if (!balance.error) {
      wallets.find((t) => t.code === 'MATIC').indivisibleBalance = ethConvert(Number.parseFloat(balance.matic) || 0, "wei", "ether");
      wallets.find((t) => t.code === 'MATIC').printedBalance = ethConvert(Number.parseFloat(balance.matic) || 0, "wei", "ether");
    }

  }
  if (isSol) {
    const { address } = wallets.find((t) => t.code === "SOL");

    const response = await axiosInstance.get(`${urls.solanaBalance}?address=${ address }`).then((response) => {
      return response.data?.balance
    }).catch((error) => {
      return {
        error: error.response
      }
    });

    if (!response.error) {
      const balance = ethConvert(Number.parseFloat(response) || 0, "gwei", "ether")

      wallets.find((t) => t.code === 'SOL').indivisibleBalance = balance;
      wallets.find((t) => t.code === 'SOL').printedBalance = balance;
    }
  }

  return wallets;

}

// indivisibleBalance
// printedBalance
