import urls from "../../constants/urls";
import axios from "axios";
import ethConvert from "ether-converter";
import settings from "../../constants/settings";
import { getDecimalValue } from "../../helpers/formatTokens";
import axiosInstance from "../../agent/agent";
import btcConvert from "satoshi-bitcoin";
import * as web3 from "@solana/web3.js";
import agent from "../../agent/agent";

const LAMPORTS_PER_SOL = web3.LAMPORTS_PER_SOL;

// etherscan
const getTxHistoryEth = async (address, contract) => {
  const params = [
    `address=${address}`,
    Boolean(contract&&contract!=="0x")&&`contract=${contract}`,
    `limit=50`,
  ].join('&');

  const history = await axiosInstance.get(`${urls.ethTransactionList}?&${ params }`).then((res) => {
    return res.data?.transactions || [];
  }).catch((err) => {
    return [];
  });

  history.map((item) => {
    item.amount = ethConvert(Number.parseFloat(item.amount), 'wei', 'ether');
    item.fee = ethConvert(Number.parseFloat(item.fee), 'wei', 'ether');
    item.recipientAddress = item?.recipients?.[0]?.address
  });

  return history;
};

// bscscan
const getTxHistoryBnb = async (address, contract) => {
  const params = [
    `address=${address}`,
    Boolean(contract&&contract!=="0x") ? `contract=${contract}` : '',
    `limit=50`,
  ].filter((t) => !!t).join('&');

  const history = await axiosInstance.get(`${urls.bnbTransactionList}?&${ params }`).then((res) => {
    return res.data?.transactions || [];
  }).catch((err) => {
    return [];
  });

  history.map((item) => {
    item.amount = ethConvert(Number.parseFloat(item.amount), 'wei', 'ether');
    item.fee = ethConvert(Number.parseFloat(item.fee), 'wei', 'ether');
    item.recipientAddress = item?.recipients?.[0]?.address
  });

  return history;
};
const getTxHistoryBnbToken = async (address, contract) => {
  const apiKey = settings.bscscancomApiKey;
  const jsonNormal = await axios.get(`${urls.bscscanMainHost}${urls.bscscanTokenTxList}${address}&contractaddress=${contract}&apikey=${apiKey}`).then((res) => {
    return res?.data?.result || [];
  }).catch(() => {
    return [];
  });

  let history = [...jsonNormal];
  history.map((item) => {
    const decimal = getDecimalValue(Number(item.tokenDecimal || "0"));
    const amount = Number.parseFloat(item.amount);

    item.amount = amount / decimal;
  });

  return history;
};
const getBnbFeeFromGas = async (gas) => {
  const gwei = await axios.get(`https://bscgas.info/gas`).then((res) => {
    return res.data?.average || 1
  }).catch((err) => {
    return 0
  });
  const decimal = getDecimalValue(9);
  return ((gwei * gas) / decimal).toString()
}
const getBnbGasTracker = async () => {
  const response = await axios.get(`https://api.bscscan.com/api?module=gastracker&action=gasoracle&apikey=${ settings.bscscancomApiKey }`).then((res) => {
    return res.data
  }).catch((err) => {
    return {}
  });
  return response
}

// polygonscan
const getTxHistoryMatic = async (address, contract) => {
  const params = [
    `address=${address}`,
    Boolean(contract&&contract!=="0x")&&`contract=${contract}`,
    `limit=50`,
  ].join('&');

  const history = await axiosInstance.get(`${urls.polygonTransactionList}?${ params }`).then((res) => {
    return res.data?.transactions || [];
  }).catch((err) => {
    return [];
  });

  history.map((item) => {
    item.amount = ethConvert(Number.parseFloat(item.amount), 'wei', 'ether');
    item.fee = ethConvert(Number.parseFloat(item.fee), 'wei', 'ether');
    item.recipientAddress = item?.recipients?.[0]?.address
  });

  return history;
};

// bitcoin
const getTxHistoryBtc = async (address, current = 1) => {
  const history = await axiosInstance.get(`${urls.btcTxList}?address=${address}&current=${current}&limit=50`).then((res) => {
    return res.data?.transactions || [];
  }).catch((err) => {
    return [];
  });

  history.map((item) => {
    item.amount = btcConvert.toBitcoin(Number.parseFloat(item.amount));
    item.fee = btcConvert.toBitcoin(Number.parseFloat(item.fee));
    item.recipientAddress = item?.recipients?.[0]?.address
  });

  return history;
};

const getTxHistoryLtc = async (address, current = 1) => {
  const history = await axiosInstance.get(`${urls.ltcTxList}?address=${address}&current=${current}&limit=50`).then((res) => {
    return res.data?.transactions || [];
  }).catch((err) => {
    return [];
  });

  history.map((item) => {
    const isIncoming = Boolean(item.incoming);
    const amount = Boolean(isIncoming) ?
      (item?.recipients || []).find((t) => t.address === address)?.amount :
      item.amount;

    item.amount = Boolean(isIncoming) ? amount : btcConvert.toBitcoin(Number(amount));
    item.recipientAddress = item?.recipients?.[0]?.address
  });

  return history;
}

// solana
const getTxHistorySol = async (address) => {
  const transactions = await agent.get(`${ urls.solanaTxList }?address=${ address }&page=1&limit=50`).then((res) => {
    return res.data?.transactions || []
  }).catch((err) => {
    return []
  });

  transactions.map(( transaction ) => {
    const isIncoming = Boolean(transaction?.incoming);

    transaction.amount = transaction.amount / LAMPORTS_PER_SOL;
    transaction.fee = transaction.fee / LAMPORTS_PER_SOL;
    transaction.recipientAddress = address || "";
    transaction.senderAddress = transaction.senderAddress;
  })


  return transactions
}

// Сборка ссылки для перехода на Блок Чейн
const getBlockChainUrlTx = (code, tx) => {
  if (code === "ETH" || code === "USDT") {
    return `https://etherscan.io/tx/${tx}`;
  }
  if (code === "BNB" || code === "BUSD" || code === "WWT") {
    return `https://bscscan.com/tx/${tx}`;
  }
};

export {
  getTxHistoryEth,

  getTxHistoryBnb,
  getTxHistoryBnbToken,
  getBnbFeeFromGas,
  getBnbGasTracker,

  getTxHistoryMatic,

  getTxHistoryBtc,

  getTxHistoryLtc,

  getTxHistorySol,

  getBlockChainUrlTx,
};
