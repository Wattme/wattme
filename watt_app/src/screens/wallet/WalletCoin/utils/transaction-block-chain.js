import currency_rank from "../../../../constants/currency_rank";

const getLinkBlockChain = (coin) => {
  if (coin.code === "BNB" || coin.code === "BUSD" || coin.code === "WWT" || coin.rank === currency_rank.MAIN_BNB || coin.rank === currency_rank.CUSTOM_TOKEN_BNB || coin.rank === currency_rank.TOKEN_BNB) {
    return `https://bscscan.com/address/${ coin.address }`;
  }
  if (coin.code === "ETH" || coin.code === "USDT" || coin.rank === currency_rank.MAIN_ETH || coin.rank === currency_rank.CUSTOM_TOKEN_ETH || coin.rank === currency_rank.TOKEN_ETH) {
    return `https://etherscan.io/address/${ coin.address }`;
  }
  if (coin.code === "POLYGON" || coin.rank === currency_rank.MAIN_POLYGON || coin.rank === currency_rank.CUSTOM_TOKEN_POLYGON || coin.rank === currency_rank.TOKEN_POLYGON) {
    return `https://polygonscan.com/address/${ coin.address }`;
  }
  if (coin.code === "BTC") {
    return `https://www.blockchain.com/btc/address/${ coin.address }`;
  }
  if (coin.code === "SOL") {
    return `https://explorer.solana.com/address/${ coin.address }`;
  }
}
const getTransactionLinkBlockChain = ({ coinRank, tx }) => {
  if (coinRank === currency_rank.MAIN_ETH || coinRank === currency_rank.CUSTOM_TOKEN_ETH || coinRank === currency_rank.TOKEN_ETH) {
    return `https://etherscan.io/tx/${tx}`
  }
  if (coinRank === currency_rank.MAIN_BNB || coinRank === currency_rank.CUSTOM_TOKEN_BNB || coinRank === currency_rank.TOKEN_BNB) {
    return `https://bscscan.com/tx/${tx}`
  }
  if (coinRank === currency_rank.MAIN_BTC || coinRank === currency_rank.CUSTOM_TOKEN_BTC || coinRank === currency_rank.TOKEN_BTC) {
    return `https://www.blockchain.com/btc/tx/${tx}`
  }
  if (coinRank === currency_rank.MAIN_POLYGON || coinRank === currency_rank.CUSTOM_TOKEN_POLYGON || coinRank === currency_rank.TOKEN_POLYGON) {
    return `https://polygonscan.com/tx/${tx}`
  }
  if (coinRank === currency_rank.MAIN_SOL || coinRank === currency_rank.CUSTOM_TOKEN_SOL || coinRank === currency_rank.TOKEN_SOL) {
    return `https://explorer.solana.com/tx/${tx}`
  }
}

export {
  getLinkBlockChain,
  getTransactionLinkBlockChain
}
