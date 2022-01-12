import "react-native-get-random-values";
import "@ethersproject/shims";
import { ethers } from "ethers";
import urls from "../../constants/urls";
import bip39 from "react-native-bip39";
import { hdkey } from "ethereumjs-wallet";

const derivePath = "m/44'/60'/0'/0/0";

const walletConnectGetTx = async (props) => {
  const {
    transaction: tx,
    signature,
    signatureType,
    chainId,
    provider: providerUrl
  } = props;

  let walletSignature;
  if ( signatureType === "mnemonic" ) {
    const seed = await bip39.mnemonicToSeed(signature);
    const node = hdkey.fromMasterSeed(seed);
    const wallet = node.derivePath(derivePath).getWallet();

    walletSignature = new ethers.Wallet(wallet.getPrivateKeyString());
  }
  if ( signatureType === "privateKey" ) {
    walletSignature = new ethers.Wallet(signature);
  }

  const walletAddress = walletSignature.address;
  const provider = await new ethers.providers.JsonRpcProvider(Boolean(providerUrl) ? providerUrl : Boolean(chainId === 56) ? urls.urlRpcBinance : urls.urlRpcEthereum);
  const gasLimit = Boolean(tx.gas) ? ethers.BigNumber.from(ethers.utils.hexValue(tx.gas)) : Boolean(tx.gasLimit) ? ethers.BigNumber.from(ethers.utils.hexValue(tx.gasLimit)) : "";
  const gasPrice = Boolean(tx.gasPrice) ? ethers.BigNumber.from(ethers.utils.hexValue(tx.gasPrice)) : await provider.getGasPrice();
  const nonce = Boolean(tx.nonce) ? tx.nonce : await provider.getTransactionCount(walletAddress);
  const value = Boolean(tx.value) ? ethers.BigNumber.from(ethers.utils.hexValue(tx.value)) : "";
  const data = Boolean(tx.data) ? tx.data : "";

  let transaction = {
    from: tx.from,
    to: tx.to,
  };

  if (!!value) {
    transaction.value = value;
  }
  if (!!gasLimit) {
    transaction.gasLimit = gasLimit;
  }
  if (!!gasPrice) {
    transaction.gasPrice = gasPrice;
  }
  if (!!nonce) {
    transaction.nonce = nonce;
  }
  if (!!data) {
    transaction.data = data;
  }
  if (chainId) {
    transaction.chainId = chainId;
  }

  const wallet = walletSignature.connect(provider);
  const { hash, error } = await wallet.sendTransaction(transaction).then((res) => {
    return {
      hash: res.hash,
    };
  }).catch(err => {
    const errorMessage = err?.message || "";

    if (errorMessage.indexOf("insufficient funds for intrinsic transaction cost") > -1) {
      return { error: "insufficient-funds" };
    }

    return {
      error: "error-send-transaction",
    };
  });

  return { hash, error };
};

const walletConnectSignMessage = async ({ message, signature, signatureType }) => {
  const wallet = ethers.Wallet.fromMnemonic(signature);

  return await wallet.signMessage(message);
};
const walletConnectSignTypedData = async ({ dataToSign, signature, signatureType }) => {
  const wallet = ethers.Wallet.fromMnemonic(signature);

  return await wallet.signMessage(dataToSign);
};

export {
  walletConnectGetTx,
  walletConnectSignMessage,
  walletConnectSignTypedData,
};
