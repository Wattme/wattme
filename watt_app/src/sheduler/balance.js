import { getItem } from "../common/Storage";
import axiosInstance from "../agent/agent";
import urls from "../constants/urls";
import ethConvert from "ether-converter";
import btcConvert from "satoshi-bitcoin";
import { getWalletsList } from "../helpers/walletsList";
import currency_rank from "../constants/currency_rank";
import agent from "../agent/agent";
import * as web3 from "@solana/web3.js";

const getBalanceMain = async (wallet = null) => {
  if (!wallet) {
    wallet = await getItem("wallet") || "{}";
    wallet = JSON.parse(wallet);
  }
  if (Object.keys(wallet).length <= 0) {
    return wallet
  }

  let list = wallet?.list || [];

  list = await Promise.all(list.map(async (coin) => {

    let balance = '0';

    if (coin?.rank === currency_rank.MAIN_BNB) {
      balance = await _balanceMainBNB(coin?.address);
    }
    if (coin?.rank === currency_rank.TOKEN_BNB) {
      balance = await _balanceTokenBNB(coin?.address, coin?.contract);
    }

    if (coin?.rank === currency_rank.MAIN_ETH) {
      balance = await _balanceMainETH(coin?.address);
    }
    if (coin?.rank === currency_rank.TOKEN_ETH) {
      balance = await _balanceTokenETH(coin?.address, coin?.contract);
    }

    if (coin?.rank === currency_rank.MAIN_BTC) {
      balance = await _balanceMainBTC(coin?.address);
    }
    if (coin?.rank === currency_rank.TOKEN_BTC) {}

    if (coin?.rank === currency_rank.MAIN_LTC) {
      balance = await _balanceMainLTC(coin?.address);
    }
    if (coin?.rank === currency_rank.TOKEN_LTC) {}

    if (coin?.rank === currency_rank.MAIN_SOL) {
      balance = await _balanceMainSOL(coin?.address);
    }
    if (coin?.rank === currency_rank.TOKEN_SOL) {}

    if (coin?.rank === currency_rank.MAIN_POLYGON) {
      balance = await _balanceMainPOLYGON(coin?.address);
    }
    if (coin?.rank === currency_rank.TOKEN_POLYGON) {
      balance = await _balanceTokenPOLYGON(coin?.address, coin?.contract);
    }

    coin.indivisibleBalance = balance || coin?.indivisibleBalance || "0";
    coin.printedBalance = balance || coin?.printedBalance || "0";

    return coin
  }));

  const { wallet: walletNew } = await getWalletsList({
    walletName: wallet.key,
    walletList: list
  });

  return walletNew
}
const getBalanceTokens = async (wallet = {}) => {

  // Проверка на налиции кошелька
  if (!wallet || Object.keys((wallet || {})).length <= 0) {
    return wallet
  }


  let newWalletList = [...(wallet?.list || [])];

  newWalletList = await Promise.all(newWalletList.map(async (coin) => {

    let balance = 0;

    if (coin.rank === currency_rank.CUSTOM_TOKEN_BNB) {
      balance = await _balanceTokenBNB(coin.address, coin.contract);
    }
    if (coin.rank === currency_rank.CUSTOM_TOKEN_ETH) {
      balance = await _balanceTokenETH(coin.address, coin.contract);
    }
    if (coin.rank === currency_rank.CUSTOM_TOKEN_POLYGON) {
      balance = await _balanceTokenPOLYGON(coin.address, coin.contract);
    }

    return {
      ...coin,
      indivisibleBalance: balance || coin?.indivisibleBalance || 0,
      printedBalance: balance || coin?.printedBalance || 0,
    }
  }));

  return {
    ...wallet,
    list: [...newWalletList]
  }
}


// Долгий и тяжелый метод, использовать аккуратно
const getBalanceAll = async (wallet = {}) => {

  if (!wallet || Object.keys((wallet || {})).length <= 0) {
    return wallet
  }

  let newWalletList = [...(wallet?.list || [])];

  newWalletList = await Promise.all(newWalletList.map(async (coin) => {

    let balance = '0';

    if (coin?.rank === currency_rank.MAIN_BNB) {
      balance = await _balanceMainBNB(coin?.address);
    }
    if (
      coin?.rank === currency_rank.TOKEN_BNB ||
      coin?.rank === currency_rank.CUSTOM_TOKEN_BNB
    ) {
      balance = await _balanceTokenBNB(coin?.address, coin?.contract);
    }

    if (coin?.rank === currency_rank.MAIN_ETH) {
      balance = await _balanceMainETH(coin?.address);
    }
    if (
      coin?.rank === currency_rank.TOKEN_ETH ||
      coin?.rank === currency_rank.CUSTOM_TOKEN_ETH
    ) {
      balance = await _balanceTokenETH(coin?.address, coin?.contract);
    }

    if (coin?.rank === currency_rank.MAIN_BTC) {
      balance = await _balanceMainBTC(coin?.address);
    }
    if (coin?.rank === currency_rank.TOKEN_BTC) {}

    if (coin?.rank === currency_rank.MAIN_LTC) {
      balance = await _balanceMainLTC(coin?.address);
    }
    if (coin?.rank === currency_rank.TOKEN_LTC) {}

    if (coin?.rank === currency_rank.MAIN_SOL) {
      balance = await _balanceMainSOL(coin?.address);
    }
    if (coin?.rank === currency_rank.TOKEN_SOL) {}

    if (coin?.rank === currency_rank.MAIN_POLYGON) {
      balance = await _balanceMainPOLYGON(coin?.address);
    }
    if (
      coin?.rank === currency_rank.TOKEN_POLYGON ||
      coin?.rank === currency_rank.CUSTOM_TOKEN_POLYGON
    ) {
      balance = await _balanceTokenPOLYGON(coin?.address, coin?.contract);
    }

    return {
      ...coin,
      indivisibleBalance: balance || coin?.indivisibleBalance || 0,
      printedBalance: balance || coin?.printedBalance || 0,
    }
  }));

  return {
    ...wallet,
    list: newWalletList
  }

}


const _balanceMainBNB = async (address) => {
  return await agent.get(`${ urls.bnbBalance }?address=${ address }`).then((res) => {
    const balance = res?.data?.balance;
    return ethConvert(balance, "wei", "ether")
  }).catch((err) => {
    return '0'
  })
}
const _balanceTokenBNB = async (address, contract) => {
  return await agent.get(`${ urls.bnbBalance }?address=${ address }&contract=${ contract }`).then((res) => {
    const balance = res?.data?.balance;
    return ethConvert(balance, "wei", "ether")
  }).catch((err) => {
    return '0'
  })
}
const _balanceMainETH = async (address) => {
  return await agent.get(`${ urls.ethBalance }?address=${ address }`).then((res) => {
    const balance = res?.data?.balance;
    return ethConvert(balance, "wei", "ether")
  }).catch((err) => {
    return '0'
  })
}
const _balanceTokenETH = async (address, contract) => {
  return await agent.get(`${ urls.ethBalance }?address=${ address }&contract=${ contract }`).then((res) => {
    const balance = res?.data?.balance;
    return ethConvert(balance, "wei", "ether")
  }).catch((err) => {
    return '0'
  })
}
const _balanceMainBTC = async (address) => {
  return await agent.get(`${ urls.btcBalance }?address=${ address }`).then((res) => {
    const balance = res?.data?.balance;
    return btcConvert.toBitcoin(Number.parseFloat(balance));
  }).catch((err) => {
    return '0'
  })
}
const _balanceMainLTC = async (address) => {
  return await agent.get(`${ urls.ltcBalance }?address=${ address }`).then((res) => {
    const balance = res?.data?.balance;
    return btcConvert.toBitcoin(Number.parseFloat(balance));
  }).catch((err) => {
    return '0'
  })
}
const _balanceMainSOL = async (address) => {
  return await agent.get(`${ urls.solanaBalance }?address=${ address }`).then((res) => {
    const balance = res?.data?.balance || 0;
    const convertBalance = balance / web3.LAMPORTS_PER_SOL;

    return convertBalance
  }).catch((err) => {
    return '0'
  })
}
const _balanceMainPOLYGON = async (address) => {
  return await agent.get(`${ urls.polygonBalance }?address=${ address }`).then((res) => {
    const balance = res?.data?.balance;
    return ethConvert(balance, "wei", "ether")
  }).catch((err) => {
    return '0'
  })
}
const _balanceTokenPOLYGON = async (address, contract) => {
  return await agent.get(`${ urls.polygonBalance }?address=${ address }&contract=${ contract }`).then((res) => {
    const balance = res?.data?.balance;
    return ethConvert(balance, "wei", "ether")
  }).catch((err) => {
    return '0'
  })
}

export {
  getBalanceMain,
  getBalanceTokens,

  getBalanceAll,




  _balanceTokenBNB
}
