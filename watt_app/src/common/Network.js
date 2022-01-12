import currency_rank from "../constants/currency_rank";

const getNetworkCoin = ({ code, rank }) => {
  if (
    code === "BNB" ||
    code === "BUSD" ||
    code === "WWT" ||
    rank === currency_rank.CUSTOM_TOKEN_BNB ||
    rank === currency_rank.TOKEN_BNB ||
    rank === currency_rank.MAIN_BNB
  ) {
    return `BEP-20`;
  }
  if (
    code === "ETH" ||
    code === "USDT" ||
    rank === currency_rank.CUSTOM_TOKEN_ETH ||
    rank === currency_rank.TOKEN_ETH ||
    rank === currency_rank.MAIN_ETH
  ) {
    return `ERC-20`;
  }
  if (
    code === "POLYGON" ||
    rank === currency_rank.CUSTOM_TOKEN_POLYGON ||
    rank === currency_rank.TOKEN_POLYGON ||
    rank === currency_rank.MAIN_POLYGON
  ) {
    return `POLYGON`;
  }
};

export {
  getNetworkCoin,
};
