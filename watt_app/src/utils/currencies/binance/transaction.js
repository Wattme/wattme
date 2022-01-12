import "react-native-get-random-values";
import "@ethersproject/shims";
import { ethers } from "ethers";
import { toBuffer } from "ethereumjs-util";
import ethereumjs, { hdkey } from "ethereumjs-wallet";
import bip39 from "react-native-bip39";
import axiosInstance from "../../../agent/agent";
import urls from "../../../constants/urls";

const derivePath = "m/44'/60'/0'/0/0";

const bnbSignTxMnemonic = async (from, tx, mnemonic, contract) => {
  const wallet = ethers.Wallet.fromMnemonic(mnemonic);

  const transaction = tx;
  const value = (contract === "0x") ? ethers.BigNumber.from(transaction.value) : ethers.BigNumber.from(transaction.value);

  let transactionSing = {
    value: value,
    to: transaction.to,
    from: from,
    nonce: transaction.nonce,
    gasLimit: ethers.BigNumber.from(transaction.gasLimit),
    gasPrice: ethers.BigNumber.from(transaction.gasPrice),
    chainId: Number.parseFloat(transaction.chainID) || 0,
  };

  if (contract !== "0x") {
    transactionSing.data = transaction.data;
  }

  return await wallet.signTransaction(transactionSing);
};
const bnbSignTxPrivateKey = async (from, tx, privateKey, contract) => {
  const buffer = toBuffer(privateKey);
  const wallet = new ethers.Wallet(privateKey);

  const transaction = JSON.parse(tx);
  const value = (contract === "0x") ? ethers.BigNumber.from(transaction.value) : transaction.value;

  let transactionSing = {
    value: value,
    to: transaction.to,
    from: from,
    nonce: transaction.nonce,
    gasLimit: ethers.BigNumber.from(transaction.gasLimit),
    gasPrice: ethers.BigNumber.from(transaction.gasPrice),
    chainId: Number.parseFloat(transaction.chainId) || 0,
  };

  if (contract !== "0x") {
    transactionSing.data = transaction.data;
  }

  return await wallet.signTransaction(transactionSing);
};

const bnbSendTransaction = async (
  {
    tx,
    wallet: walletInfo,
    provider: providerUrl,
  }) => {

  let walletSignature;
  if (walletInfo.mnemonic) {
    const seed = await bip39.mnemonicToSeed(walletInfo.mnemonic);
    const node = hdkey.fromMasterSeed(seed);
    const wallet = node.derivePath(derivePath).getWallet();
    walletSignature = new ethers.Wallet(wallet.getPrivateKeyString());
  }
  else if (walletInfo.privateKey) {
    walletSignature = new ethers.Wallet(walletInfo.privateKey);
  }

  const provider = await new ethers.providers.JsonRpcProvider(providerUrl);
  const wallet = walletSignature.connect(provider);


  const transaction = {
    from: tx.from,
    to: tx.to,
    value: ethers.BigNumber.from(tx.value),
    data: tx.data,
    gasLimit: ethers.BigNumber.from(tx.gas),
    gasPrice: ethers.BigNumber.from(tx.gasPrice),
  };

  return await wallet.sendTransaction(transaction);
};

const bnbExchangeSendTransaction = async ({ tx, wallet: walletInfo, provider: providerUrl }) => {
  let walletSignature;
  if (walletInfo.mnemonic) {
    const seed = await bip39.mnemonicToSeed(walletInfo.mnemonic);
    const node = hdkey.fromMasterSeed(seed);
    const wallet = node.derivePath(derivePath).getWallet();
    walletSignature = new ethers.Wallet(wallet.getPrivateKeyString());
  }
  else if (walletInfo.privateKey) {
    walletSignature = new ethers.Wallet(walletInfo.privateKey);
  }

  const provider = await new ethers.providers.JsonRpcProvider(providerUrl);
  const wallet = walletSignature.connect(provider);
  const nonce = await provider.getTransactionCount(wallet.address)
  const gasPrice = await axiosInstance.get(urls.bnbGasPriceRange).then((res) => {
    return res?.data?.highFee
  }).catch((err) => {
    return '5000000000'
  });

  const transaction = {
    from: tx.from,
    to: tx.to,
    value: ethers.BigNumber.from(tx.value),
    data: tx.data,
    gasLimit: ethers.BigNumber.from(tx.gas),
    gasPrice: ethers.BigNumber.from(gasPrice),
    nonce: tx.nonce || nonce
  };

  return await wallet.sendTransaction(transaction);
}

export {
  bnbSignTxMnemonic,
  bnbSignTxPrivateKey,

  bnbSendTransaction,
  bnbExchangeSendTransaction,
};
