import {
  getTxHistoryBnb, getTxHistoryBnbToken, getTxHistoryBtc,
  getTxHistoryEth, getTxHistoryLtc,
  getTxHistoryMatic, getTxHistorySol,
} from "../../../../utils/network/httpClient";
import currency_rank from "../../../../constants/currency_rank";

const getTransactionHistory = async (coin) => {
  if (coin.rank === currency_rank.MAIN_BTC) {
    return await getTxHistoryBtc(coin.address);
  }
  if (coin.rank === currency_rank.MAIN_LTC) {
    return await getTxHistoryLtc(coin.address);
  }
  if (coin.rank === currency_rank.MAIN_ETH || coin.rank === currency_rank.TOKEN_ETH || coin.rank === currency_rank.CUSTOM_TOKEN_ETH) {
    return await getTxHistoryEth(coin.address, coin.contract);
  }
  if (coin.rank === currency_rank.MAIN_BNB || coin.rank === currency_rank.TOKEN_BNB || coin.rank === currency_rank.CUSTOM_TOKEN_BNB) {
    return await getTxHistoryBnb(coin.address, coin.contract);
  }
  if (coin.rank === currency_rank.MAIN_POLYGON || coin.rank === currency_rank.TOKEN_POLYGON || coin.rank === currency_rank.CUSTOM_TOKEN_POLYGON) {
    return await getTxHistoryMatic(coin.address, coin.contract);
  }
  if (coin.rank === currency_rank.MAIN_SOL || coin.rank === currency_rank.TOKEN_SOL || coin.rank === currency_rank.CUSTOM_TOKEN_SOL) {
    return await getTxHistorySol(coin.address, coin.contract);
  }

  if (coin.code === "POLYGON") {
    return await getTxHistoryMatic(coin.address);
  }
  if (coin.code === "SOL") {
    return await getTxHistorySol(coin.address);
  }

  return [];
}

export {
  getTransactionHistory
}
