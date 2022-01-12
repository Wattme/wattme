import agent from "../../../../agent/agent";
import urls from "../../../../constants/urls";
import btcConvert from "satoshi-bitcoin";
import currency_rank from "../../../../constants/currency_rank";
import ethConvert from "ether-converter";
import * as web3 from "@solana/web3.js";

// Ответ должен быть такой для всех !!!!!!!!!
// {
//    amount: 0
//    commission: 0
// }

const getMaxAmount = async ({ coinRank, address, contract, fee }) => {
  if (coinRank === currency_rank.MAIN_BTC || coinRank === currency_rank.TOKEN_BTC || coinRank === currency_rank.CUSTOM_TOKEN_BTC) {
    return await _getMaxAmountBTC({ address, fee });
  }
  if (coinRank === currency_rank.MAIN_ETH || coinRank === currency_rank.TOKEN_ETH || coinRank === currency_rank.CUSTOM_TOKEN_ETH) {
    return await _getMaxAmountETH({ address, contract, fee });
  }
  if (coinRank === currency_rank.MAIN_BNB || coinRank === currency_rank.TOKEN_BNB || coinRank === currency_rank.CUSTOM_TOKEN_BNB) {
    return await _getMaxAmountBNB({ address, contract, fee });
  }
  if (coinRank === currency_rank.MAIN_SOL || coinRank === currency_rank.TOKEN_SOL || coinRank === currency_rank.CUSTOM_TOKEN_SOL) {
    return await _getMaxAmountSOL({ address, contract, fee });
  }
  if (coinRank === currency_rank.MAIN_LTC || coinRank === currency_rank.TOKEN_LTC || coinRank === currency_rank.CUSTOM_TOKEN_LTC) {
    return await _getMaxAmountLTC({ address, fee });
  }
  if (coinRank === currency_rank.MAIN_POLYGON || coinRank === currency_rank.TOKEN_POLYGON || coinRank === currency_rank.CUSTOM_TOKEN_POLYGON) {
    return await _getMaxAmountPOLYGON({ address, contract, fee });
  }
}
const _getMaxAmountBTC = async ({ address, fee }) => {
  return  await agent.get(`${ urls.btcMaxAmountSend }?address=${ address }&fee=${ fee }`).then((res) => {
    return {
      amount: btcConvert.toBitcoin(Math.ceil(res.data.amount)),
      commission: btcConvert.toBitcoin(Math.ceil(res.data.fee)),
    }
  }).catch((err) => {
    return {
      amount: 0,
      commission: 0,
    }
  })
}
const _getMaxAmountLTC = async ({ address, fee }) => {
  return  await agent.get(`${ urls.ltcMaxAmountSend }?address=${ address }&fee=${ fee }`).then((res) => {
    return {
      amount: btcConvert.toBitcoin(Math.ceil(res.data.amount)),
      commission: btcConvert.toBitcoin(Math.ceil(res.data.fee)),
    }
  }).catch((err) => {
    return {
      amount: 0,
      commission: 0,
    }
  })
}
const _getMaxAmountSOL = async ({ address, fee }) => {
  return  await agent.get(`${ urls.solMaxAmountSend }?address=${ address }&fee=${ fee }`).then((res) => {
    return {
      amount: (res.data?.amount || 0) / web3.LAMPORTS_PER_SOL,
      commission: (res.data?.fee || 0) / web3.LAMPORTS_PER_SOL,
    }
  }).catch((err) => {
    return {
      amount: 0,
      commission: 0,
    }
  })
}
const _getMaxAmountETH = async ({ address, contract, fee }) => {
  const params = [
    `address=${ address }`,
    `fee=${ fee }`,
    Boolean(contract)?`contract=${contract}`:''
  ].filter((t) => !!t).join('&');

  return await agent.get(`${ urls.ethMaxAmountSend }?${ params }`).then((res) => {
    return {
      amount: ethConvert(Number.parseFloat(res.data.amount), 'wei', 'ether'),
      commission: ethConvert(Number.parseFloat(res.data.fee), 'wei', 'ether'),
    }
  }).catch((err) => {
    return {
      amount: 0,
      commission: 0,
    }
  })
}
const _getMaxAmountBNB = async ({ address, contract, fee }) => {
  const params = [
    `address=${ address }`,
    `fee=${ fee }`,
    Boolean(contract)?`contract=${contract}`:''
  ].filter((t) => !!t).join('&');

  return await agent.get(`${ urls.bnbMaxAmountSend }?${ params }`).then((res) => {
    return {
      amount: ethConvert(Number.parseFloat(res.data.amount), 'wei', 'ether'),
      commission: ethConvert(Number.parseFloat(res.data.fee), 'wei', 'ether'),
    }
  }).catch((err) => {
    return {
      amount: 0,
      commission: 0,
    }
  })
}
const _getMaxAmountPOLYGON = async ({ address, contract, fee }) => {
  const params = [
    `address=${ address }`,
    `fee=${ fee }`,
    Boolean(contract)?`contract=${contract}`:''
  ].filter((t) => !!t).join('&');

  return await agent.get(`${ urls.polygonMaxAmountSend }?${ params }`).then((res) => {
    return {
      amount: ethConvert(Number.parseFloat(res.data.amount), 'wei', 'ether'),
      commission: ethConvert(Number.parseFloat(res.data.fee), 'wei', 'ether'),
    }
  }).catch((err) => {
    return {
      amount: 0,
      commission: 0,
    }
  })
}

export {
  getMaxAmount
}
