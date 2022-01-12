import agent from "../../../../agent/agent";
import urls from "../../../../constants/urls";
import btcConvert from "satoshi-bitcoin";
import currency_rank from "../../../../constants/currency_rank";
import ethConvert from "ether-converter";

// Ответ должен быть такой для всех !!!!!!!!!
// {
//    high: 0
//    medium: 0
//    low: 0
// }

const getCommission = async ({ coinRank }) => {
  if (coinRank === currency_rank.MAIN_BTC || coinRank === currency_rank.TOKEN_BTC || coinRank === currency_rank.CUSTOM_TOKEN_BTC) {
    return await _getCommissionBTC();
  }
  if (coinRank === currency_rank.MAIN_ETH || coinRank === currency_rank.TOKEN_ETH || coinRank === currency_rank.CUSTOM_TOKEN_ETH) {
    return await _getCommissionETH();
  }
  if (coinRank === currency_rank.MAIN_BNB || coinRank === currency_rank.TOKEN_BNB || coinRank === currency_rank.CUSTOM_TOKEN_BNB) {
    return await _getCommissionBNB();
  }
  if (coinRank === currency_rank.MAIN_POLYGON || coinRank === currency_rank.TOKEN_POLYGON || coinRank === currency_rank.CUSTOM_TOKEN_POLYGON) {
    return await _getCommissionPOLYGON();
  }
  if (coinRank === currency_rank.MAIN_LTC || coinRank === currency_rank.TOKEN_LTC || coinRank === currency_rank.CUSTOM_TOKEN_LTC) {
    return await _getCommissionLTC();
  }
  if (coinRank === currency_rank.MAIN_SOL || coinRank === currency_rank.TOKEN_SOL || coinRank === currency_rank.CUSTOM_TOKEN_SOL) {
    return await _getCommissionSOL();
  }
}
const _getCommissionBTC = async () => {
  const data = await agent.get(`${ urls.btcCommission }`).then((res) => {
    return {
      high: res.data?.highFee || 0,
      medium: res.data?.lowFee || 0,
      low: res.data?.mediumFee || 0
    }
  }).catch((err) => {
    return {
      high: 0,
      medium: 0,
      low: 0,
    }
  });

  return data
}
const _getCommissionETH = async () => {
  const data = await agent.get(`${ urls.ethCommission }`).then((res) => {
    return {
      high: res.data?.highFee || 0,
      medium: res.data?.lowFee || 0,
      low: res.data?.mediumFee || 0
    }
  }).catch((err) => {
    return {
      high: 0,
      medium: 0,
      low: 0,
    }
  });

  return data
}
const _getCommissionBNB = async () => {
  const data = await agent.get(`${ urls.bnbCommission }`).then((res) => {
    return {
      high: res.data?.highFee || 0,
      medium: res.data?.lowFee || 0,
      low: res.data?.mediumFee || 0
    }
  }).catch((err) => {
    return {
      high: 0,
      medium: 0,
      low: 0,
    }
  });

  return data
}
const _getCommissionPOLYGON = async () => {
  const data = await agent.get(`${ urls.polygonFee }`).then((res) => {
    return {
      high: res.data?.highFee || 0,
      medium: res.data?.lowFee || 0,
      low: res.data?.mediumFee || 0
    }
  }).catch((err) => {
    return {
      high: 0,
      medium: 0,
      low: 0,
    }
  });

  return data
}
const _getCommissionLTC = async () => {
  const data = await agent.get(`${ urls.ltcCommission }`).then((res) => {
    return {
      high: res.data?.highFee || 0,
      medium: res.data?.lowFee || 0,
      low: res.data?.mediumFee || 0
    }
  }).catch((err) => {
    return {
      high: 0,
      medium: 0,
      low: 0,
    }
  });

  return data
}
const _getCommissionSOL = async () => {
  const data = await agent.get(`${ urls.solCommission }`).then((res) => {
    return {
      high: res.data?.highFee || 0,
      medium: res.data?.lowFee || 0,
      low: res.data?.mediumFee || 0
    }
  }).catch((err) => {
    return {
      high: 0,
      medium: 0,
      low: 0,
    }
  });

  return data
}

const convertCommission = ({ coinRank, commission, maxGas }) => {

  if (
    coinRank === currency_rank.MAIN_BTC || coinRank === currency_rank.TOKEN_BTC || coinRank === currency_rank.CUSTOM_TOKEN_BTC ||
    coinRank === currency_rank.MAIN_LTC || coinRank === currency_rank.TOKEN_LTC || coinRank === currency_rank.CUSTOM_TOKEN_LTC
  ) {
    return _convertCommissionBTC(commission);
  }
  if (
    coinRank === currency_rank.MAIN_ETH || coinRank === currency_rank.TOKEN_ETH || coinRank === currency_rank.CUSTOM_TOKEN_ETH ||
    coinRank === currency_rank.MAIN_BNB || coinRank === currency_rank.TOKEN_BNB || coinRank === currency_rank.CUSTOM_TOKEN_BNB ||
    coinRank === currency_rank.MAIN_POLYGON || coinRank === currency_rank.TOKEN_POLYGON || coinRank === currency_rank.CUSTOM_TOKEN_POLYGON
  ) {
    return _convertCommissionETH(maxGas);
  }


}
const _convertCommissionBTC = (commission) => {
  return btcConvert.toBitcoin(commission)
}
const _convertCommissionETH = (commission) => {
  return ethConvert(commission, 'wei', 'ether')
}

export {
  getCommission,
  convertCommission
}
