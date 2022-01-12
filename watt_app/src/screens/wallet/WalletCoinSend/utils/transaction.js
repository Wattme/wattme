import agent from "../../../../agent/agent";
import urls from "../../../../constants/urls";
import btcConvert from "satoshi-bitcoin";
import currency_rank from "../../../../constants/currency_rank";
import { btcSignTxMnemonic } from "../../../../utils/currencies/bitcoin/transaction";
import ethConvert from "ether-converter";
import { bnbSignTxMnemonic } from "../../../../utils/currencies/binance/transaction";
import { ethSignTxMnemonic } from "../../../../utils/currencies/ethereum/transaction";
import { maticSignTxMnemonic } from "../../../../utils/currencies/polygon/transaction";
import { ltcSignTxMnemonic } from "../../../../utils/currencies/litecoin/transaction";

const createTransaction = async ({ coinRank, senderAddress, recipientAddress, amount, contract, fee }) => {
  if (coinRank === currency_rank.MAIN_BTC || coinRank === currency_rank.TOKEN_BTC || coinRank === currency_rank.CUSTOM_TOKEN_BTC) {
    return await _createTransactionBTC({ amount, recipientAddress, senderAddress, fee });
  }
  if (coinRank === currency_rank.MAIN_ETH || coinRank === currency_rank.TOKEN_ETH || coinRank === currency_rank.CUSTOM_TOKEN_ETH) {
    return await _createTransactionETH({ senderAddress, recipientAddress, amount, contract, fee });
  }
  if (coinRank === currency_rank.MAIN_BNB || coinRank === currency_rank.TOKEN_BNB || coinRank === currency_rank.CUSTOM_TOKEN_BNB) {
    return await _createTransactionBNB({ senderAddress, recipientAddress, amount, contract, fee });
  }
  if (coinRank === currency_rank.MAIN_SOL || coinRank === currency_rank.TOKEN_SOL || coinRank === currency_rank.CUSTOM_TOKEN_SOL) {}
  if (coinRank === currency_rank.MAIN_LTC || coinRank === currency_rank.TOKEN_LTC || coinRank === currency_rank.CUSTOM_TOKEN_LTC) {
    return await _createTransactionLTC({ amount, recipientAddress, senderAddress, fee });
  }
  if (coinRank === currency_rank.MAIN_POLYGON || coinRank === currency_rank.TOKEN_POLYGON || coinRank === currency_rank.CUSTOM_TOKEN_POLYGON) {
    return await _createTransactionPOLYGON({ senderAddress, recipientAddress, amount, contract, fee });
  }

};
const _createTransactionBTC = async ({senderAddress, recipientAddress, amount, fee}) => {
  return await agent.post(urls.btcCreateTransaction, {
    "senderAddress": senderAddress,
    "recipientAddress": recipientAddress,
    "amount": btcConvert.toSatoshi(amount),
    "fee": fee,
  }).then((res) => {
    return res.data
  }).catch((err) => {
    return {
      error: err.response
    }
  })
}
const _createTransactionLTC = async ({senderAddress, recipientAddress, amount, fee}) => {
  return await agent.post(urls.ltcCreateTransaction, {
    "senderAddress": senderAddress,
    "recipientAddress": recipientAddress,
    "amount": btcConvert.toSatoshi(amount),
    "fee": fee,
  }).then((res) => {
    return res.data
  }).catch((err) => {
    return {
      error: err.response
    }
  })
}
const _createTransactionETH = async ({ senderAddress, recipientAddress, amount, contract, fee }) => {
  let body = {
    "senderAddress": senderAddress,
    "recipientAddress": recipientAddress,
    "amount": ethConvert(amount, 'ether', 'wei'),
    "fee": fee
  };

  if (!!contract && contract !== "0x" ) {
    body.contract = contract;
    body.amount = amount;
  }

  return await agent.post(urls.ethCreateTransaction, body).then((res) => {
    return res.data
  }).catch((err) => {
    return {
      error: err.response
    }
  })
}
const _createTransactionBNB = async ({ senderAddress, recipientAddress, amount, contract, fee }) => {
  let body = {
    "senderAddress": senderAddress,
    "recipientAddress": recipientAddress,
    "amount": ethConvert(amount, 'ether', 'wei'),
    "fee": fee
  };

  if (!!contract && contract!=="0x") {
    body.contract = contract;
    body.amount = amount;
  }

  return await agent.post(urls.bnbCreateTransaction, body).then((res) => {
    return res.data
  }).catch((err) => {
    return {
      error: err.response
    }
  })
}
const _createTransactionPOLYGON = async ({ senderAddress, recipientAddress, amount, contract, fee }) => {
  let body = {
    "senderAddress": senderAddress,
    "recipientAddress": recipientAddress,
    "amount": ethConvert(amount, 'ether', 'wei'),
    "fee": fee
  };

  if (!!contract && contract!=="0x") {
    body.contract = contract;
    body.amount = amount;
  }

  return await agent.post(urls.polygonCreateTransaction, body).then((res) => {
    return res.data
  }).catch((err) => {
    return {
      error: err.response
    }
  })
}


const signTransaction = async ({ coinRank, senderAddress, transaction, mnemonic, privateKey, maxGas, contract, btcPath }) => {
  if ( coinRank === currency_rank.MAIN_BTC ) {
    return await _signTransactionBTC({ senderAddress, transaction, mnemonic, btcPath })
  }
  if ( coinRank === currency_rank.MAIN_LTC ) {
    return await _signTransactionLTC({ senderAddress, transaction, mnemonic })
  }
  if ( coinRank === currency_rank.MAIN_ETH || coinRank === currency_rank.TOKEN_ETH || coinRank === currency_rank.CUSTOM_TOKEN_ETH ) {
    return await _signTransactionETH({ transaction, contract, mnemonic, senderAddress })
  }
  if ( coinRank === currency_rank.MAIN_BNB || coinRank === currency_rank.TOKEN_BNB || coinRank === currency_rank.CUSTOM_TOKEN_BNB ) {
    return await _signTransactionBNB({ transaction, contract, mnemonic, senderAddress })
  }
  if ( coinRank === currency_rank.MAIN_POLYGON || coinRank === currency_rank.TOKEN_POLYGON || coinRank === currency_rank.CUSTOM_TOKEN_POLYGON ) {
    return await _signTransactionPOLYGON({ transaction, contract, mnemonic, senderAddress })
  }
}
const _signTransactionBTC = async ({ senderAddress, transaction, mnemonic, contract, btcPath }) => {
  return await btcSignTxMnemonic(
    senderAddress,
    transaction,
    mnemonic,
    contract,
    btcPath
  );
}
const _signTransactionLTC = async ({ senderAddress, transaction, mnemonic, contract }) => {
  return await ltcSignTxMnemonic(
    senderAddress,
    transaction,
    mnemonic,
    contract
  );
}
const _signTransactionETH = async ({ senderAddress, transaction, mnemonic, contract }) => {
  return ethSignTxMnemonic(
    senderAddress,
    transaction,
    mnemonic,
    contract
  )
}
const _signTransactionBNB = async ({ senderAddress, transaction, mnemonic, contract }) => {
  return bnbSignTxMnemonic(
    senderAddress,
    transaction,
    mnemonic,
    contract
  )
}
const _signTransactionPOLYGON = async ({ senderAddress, transaction, mnemonic, contract }) => {
  return maticSignTxMnemonic(
    senderAddress,
    transaction,
    mnemonic,
    contract
  )
}


const sendTransaction = async ({ coinRank, signTx, senderAddress }) => {
  if (coinRank === currency_rank.MAIN_BTC) {
    return await _sendTransactionBTC({ signTx, senderAddress });
  }
  if (coinRank === currency_rank.MAIN_LTC) {
    return await _sendTransactionLTC({ signTx, senderAddress });
  }
  if (coinRank === currency_rank.MAIN_ETH || coinRank === currency_rank.TOKEN_ETH || coinRank === currency_rank.CUSTOM_TOKEN_ETH) {
    return await _sendTransactionETH({ signTx, senderAddress })
  }
  if (coinRank === currency_rank.MAIN_BNB || coinRank === currency_rank.TOKEN_BNB || coinRank === currency_rank.CUSTOM_TOKEN_BNB) {
    return await _sendTransactionBNB({ signTx, senderAddress })
  }
  if (coinRank === currency_rank.MAIN_POLYGON|| coinRank === currency_rank.TOKEN_POLYGON || coinRank === currency_rank.CUSTOM_TOKEN_POLYGON) {
    return await _sendTransactionPOLYGON({ signTx, senderAddress })
  }
}
const _sendTransactionBTC = async ({ signTx, senderAddress }) => {
  return await agent.post(urls.btcSendRawTransaction, {
    'rawData': signTx,
    'sender-address': senderAddress,
    'is_changer': false
  }).then((res) => {
    return res.data
  }).catch((err) => {
    return {
      error: err.response || true
    }
  })
}
const _sendTransactionLTC = async ({ signTx, senderAddress }) => {
  return await agent.post(urls.ltcSendRawTransaction, {
    'rawData': signTx,
    'sender-address': senderAddress,
    'is_changer': false
  }).then((res) => {
    return res.data
  }).catch((err) => {
    return {
      error: err.response || true
    }
  })
}
const _sendTransactionETH = async ({ signTx, senderAddress }) => {
  return await agent.post(urls.ethSendRawTransaction, {
    'rawData': signTx,
    'sender-address': senderAddress,
    'is_changer': false
  }).then((res) => {
    return res.data
  }).catch((err) => {
    return {
      error: err.response || true
    }
  })
}
const _sendTransactionBNB = async ({ signTx, senderAddress }) => {
  return await agent.post(urls.bnbSendRawTransaction, {
    'rawData': signTx,
    'sender-address': senderAddress,
    'is_changer': false
  }).then((res) => {
    return res.data
  }).catch((err) => {
    return {
      error: err.response || true
    }
  })
}
const _sendTransactionPOLYGON = async ({ signTx, senderAddress }) => {
  return await agent.post(urls.polygonSendRawTransaction, {
    'rawData': signTx,
    'sender-address': senderAddress,
    'is_changer': false
  }).then((res) => {
    return res.data
  }).catch((err) => {
    return {
      error: err.response || true
    }
  })
}

export {
  createTransaction,

  signTransaction,

  sendTransaction
};
