import { getItem } from "../common/Storage";
import axiosInstance from "../agent/agent";
import urls from "../constants/urls";
import ethConvert from "ether-converter";
import btcConvert from "satoshi-bitcoin";
import currency_rank from "../constants/currency_rank";

export default async function(wallets) {

  if (!wallets) {
    wallets = await getItem("wallets");
    wallets = JSON.parse(wallets || "[]");
  }

  const isBnb = Boolean(wallets.find((t) => t.code === "BNB"));
  const isEth = Boolean(wallets.find((t) => t.code === "ETH"));

  if (isBnb) {
    let data = wallets.filter((t) => t.rank === currency_rank.CUSTOM_TOKEN_BNB).map((item) => {
      return {
        address: item.address,
        contract: item.contract,
      }
    });
    const balanceTokens = await axiosInstance.get(`${urls.bnbBalanceToken}?data=${JSON.stringify(data)}`).then((res) => {
      return res.data
    }).catch((err) => {
      return []
    })

    balanceTokens.map((balanceToken) => {
      wallets.find((t) => t.contract === balanceToken.contract).indivisibleBalance = ethConvert(Number.parseFloat(balanceToken.balance) || 0, "wei", "ether");
      wallets.find((t) => t.contract === balanceToken.contract).printedBalance = ethConvert(Number.parseFloat(balanceToken.balance) || 0, "wei", "ether");
    });
  }
  if (isEth) {
    let data = wallets.filter((t) => t.rank === currency_rank.CUSTOM_TOKEN_ETH).map((item) => {
      return {
        address: item.address,
        contract: item.contract,
      }
    });
    const balanceTokens = await axiosInstance.get(`${urls.ethBalanceToken}?data=${JSON.stringify(data)}`).then((res) => {
      return res.data
    }).catch((err) => {
      return []
    })

    balanceTokens.map((balanceToken) => {
      wallets.find((t) => t.contract === balanceToken.contract).indivisibleBalance = ethConvert(Number.parseFloat(balanceToken.balance) || 0, "wei", "ether");
      wallets.find((t) => t.contract === balanceToken.contract).printedBalance = ethConvert(Number.parseFloat(balanceToken.balance) || 0, "wei", "ether");
    });
  }

  return wallets;
}
