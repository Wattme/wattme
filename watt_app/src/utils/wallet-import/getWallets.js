import { store } from '../../store/store';

import {btcWalletImport} from "../currencies/bitcoin/wallet";
import {ethWalletImport} from "../currencies/ethereum/wallet";
import {bnbWalletImport} from "../currencies/binance/wallet";
import {maticWalletImport} from "../currencies/polygon/wallet";
import {ltcWalletImport} from "../currencies/litecoin/wallet";
import {solWalletImport} from "../currencies/solana/wallet";
import currency_eth from "../../models/currency/eth/currency_eth";
import currency_eth_token from "../../models/currency/eth/currency_eth_token";
import currency_bnb from "../../models/currency/bnb/currency_bnb";
import currency_bnb_token from "../../models/currency/bnb/currency_bnb_token";
import currency_btc from "../../models/currency/btc/currency_btc";
import currency_sol from "../../models/currency/sol/currency_sol";
import currency_polygon from "../../models/currency/polygon/currency_polygon";
import currency_polygon_token from "../../models/currency/polygon/currency_polygon_token";
import currency_ltc from "../../models/currency/ltc/currency_ltc";

const getWallets = async ({ type, formValue, currency }) => {
  const { globalState } = store.getState();
  const { walletImportInfo } = globalState || {};
  const { blockChain } = walletImportInfo || {};

  if (blockChain.eth && type === 'phrase' && currency === "ETH") {
    return await getWalletsPhraseEth(formValue);
  }
  if (blockChain.btc && type === 'phrase' && currency === "BTC") {
    return await getWalletsPhraseBtc(formValue);
  }
  if (blockChain.bnb && type === 'phrase' && currency === "BNB") {
    return await getWalletsPhraseBnb(formValue);
  }
  if (blockChain.polygon && type === 'phrase' && currency === "MATIC") {
    return await getWalletsPhraseMatic(formValue);
  }
  if (blockChain.ltc && type === 'phrase' && currency === "LTC") {
    return await getWalletsPhraseLtc(formValue);
  }
  if (blockChain.sol && type === 'phrase' && currency === "SOL") {
    return await getWalletsPhraseSolana(formValue);
  }
  if (type === 'phrase' && currency === "MULTI") {
    return await getWalletsPhraseMulti(formValue);
  }

  if (blockChain.eth && type === 'address' && currency === "ETH") {
    return await getWalletsAddressEth(formValue);
  }
  if (blockChain.btc && type === 'address' && currency === "BTC") {
    return await getWalletsAddressBtc(formValue);
  }
  if (blockChain.bnb && type === 'address' && currency === "BNB") {
    return await getWalletsAddressBnb(formValue);
  }
  if (blockChain.polygon && type === 'address' && currency === "MATIC") {
    return await getWalletsAddressMatic(formValue);
  }
  if (blockChain.ltc && type === 'address' && currency === "LTC") {
    return await getWalletsAddressLtc(formValue);
  }
  if (blockChain.sol && type === 'address' && currency === "SOL") {
    return await getWalletsAddressSolana(formValue);
  }
  if (type === 'address' && currency === "MULTI") {
    return await getWalletsAddressMulti(formValue);
  }
}

// Получение кошелька по мнемонику
const getWalletsPhraseEth = async (mnemonic) => {
  const { globalState } = store.getState();
  const { walletImportInfo } = globalState || {};
  const { tokens } = walletImportInfo || {};
  const { address, privateKey } = await ethWalletImport(mnemonic);

  let wallets = [];

  wallets.push(currency_eth({
    address,
    mnemonic,
    privateKey
  }));

  (tokens?.eth || []).map((tokenInfo) => {
    wallets.push(currency_eth_token({
      address: address,
      contract: tokenInfo?.contract,
      mnemonic: mnemonic,
      name: tokenInfo?.name,
      code: tokenInfo?.code,
      privateKey: privateKey
    }));
  });

  return wallets
}
const getWalletsPhraseBnb = async (mnemonic) => {
  const { globalState } = store.getState();
  const { walletImportInfo } = globalState || {};
  const { tokens } = walletImportInfo || {};
  const { address, privateKey } = await bnbWalletImport(mnemonic);

  let wallets = [];

  wallets.push(currency_bnb({
    address,
    mnemonic,
    privateKey
  }));

  (tokens?.bnb || []).map((tokenInfo) => {
    wallets.push(currency_bnb_token({
      address: address,
      contract: tokenInfo?.contract,
      mnemonic: mnemonic,
      name: tokenInfo?.name,
      code: tokenInfo?.code,
      privateKey: privateKey
    }));
  });

  return wallets
}
const getWalletsPhraseMatic = async (mnemonic) => {
  const { globalState } = store.getState();
  const { walletImportInfo } = globalState || {};
  const { tokens } = walletImportInfo || {};
  const { address, privateKey } = await maticWalletImport(mnemonic);


  let wallets = [];

  wallets.push(currency_polygon({
    address,
    mnemonic,
    privateKey
  }));

  (tokens?.polygon || []).map((tokenInfo) => {
    wallets.push(currency_polygon_token({
      address: address,
      contract: tokenInfo?.contract,
      mnemonic: mnemonic,
      name: tokenInfo?.name,
      code: tokenInfo?.code,
      privateKey: privateKey
    }));
  });

  return wallets
}
const getWalletsPhraseBtc = async (mnemonic) => {
  let wallets = [];
  const { address, privateKey, path, addresses } = await btcWalletImport(mnemonic);

  wallets.push(currency_btc({
    address,
    mnemonic,
    privateKey,
    path,
    addresses
  }));

  return wallets;
}
const getWalletsPhraseLtc = async (mnemonic) => {
  let wallets = [];
  const { address, privateKey, path, addresses } = await ltcWalletImport(mnemonic);

  wallets.push(currency_ltc({
    address,
    mnemonic,
    privateKey,
    path,
    addresses
  }));

  return wallets;
}
const getWalletsPhraseSolana = async (mnemonic) => {
  let wallets = [];
  const { address } = await solWalletImport(mnemonic);

  wallets.push(currency_sol({
    address,
    mnemonic
  }));

  return wallets;
}
const getWalletsPhraseMulti = async (mnemonic) => {
  const { globalState } = store.getState();
  const { walletImportInfo } = globalState || {};
  const { blockChain } = walletImportInfo || {};

  let list = [];

  if (blockChain.eth) {
    const wallets = await getWalletsPhraseEth(mnemonic);
    list.push(...wallets);
  }
  if (blockChain.bnb) {
    const wallets = await getWalletsPhraseBnb(mnemonic);
    list.push(...wallets);
  }
  if (blockChain.btc) {
    const wallets = await getWalletsPhraseBtc(mnemonic);
    list.push(...wallets);
  }
  if (blockChain.ltc) {
    const wallets = await getWalletsPhraseLtc(mnemonic);
    list.push(...wallets);
  }
  if (blockChain.polygon) {
    const wallets = await getWalletsPhraseMatic(mnemonic);
    list.push(...wallets);
  }
  if (blockChain.sol) {
    const wallets = await getWalletsPhraseSolana(mnemonic);
    list.push(...wallets);
  }


  return [...list];
}

// Получение кошелька по адресу кошелька
const getWalletsAddressEth = async (address) => {
  const { globalState } = store.getState();
  const { walletImportInfo } = globalState || {};
  const { tokens } = walletImportInfo || {};

  let wallets = [];

  wallets.push(currency_eth({
    address
  }));
  (tokens?.eth || []).map((tokenInfo) => {
    wallets.push(currency_eth_token({
      address: address,
      contract: tokenInfo?.contract,
      mnemonic: "",
      name: tokenInfo?.name,
      code: tokenInfo?.code,
      privateKey: ""
    }));
  });

  return wallets
}
const getWalletsAddressBnb = async (address) => {
  const { globalState } = store.getState();
  const { walletImportInfo } = globalState || {};
  const { tokens } = walletImportInfo || {};

  let wallets = [];

  wallets.push(currency_bnb({
    address
  }));

  (tokens?.bnb || []).map((tokenInfo) => {
    wallets.push(currency_bnb_token({
      address: address,
      contract: tokenInfo?.contract,
      mnemonic: "",
      name: tokenInfo?.name,
      code: tokenInfo?.code,
      privateKey: ""
    }));
  });

  return wallets
}
const getWalletsAddressBtc = async (address) => {
  let wallets = [];

  wallets.push(currency_btc({
    address
  }));

  return wallets;
}
const getWalletsAddressMatic = async (address) => {
  let wallets = [];

  wallets.push(currency_polygon({
    address
  }));

  return wallets;
}
const getWalletsAddressLtc = async (address) => {
  let wallets = [];

  wallets.push(currency_ltc({
    address
  }));

  return wallets;
}
const getWalletsAddressSolana = async (address) => {
  let wallets = [];

  wallets.push(currency_sol({
    address
  }));

  return wallets;
}
const getWalletsAddressMulti = async (address) => {
  const { globalState } = store.getState();
  const { walletImportInfo } = globalState || {};
  const { blockChain } = walletImportInfo || {};

  let list = [];

  if (blockChain.eth) {
    const wallets = await getWalletsAddressEth(address);
    list.push(...wallets);
  }
  if (blockChain.bnb) {
    const wallets = await getWalletsAddressBnb(address);
    list.push(...wallets);
  }
  if (blockChain.btc) {
    const wallets = await getWalletsAddressBtc(address);
    list.push(...wallets);
  }
  if (blockChain.ltc) {
    const wallets = await getWalletsAddressLtc(address);
    list.push(...wallets);
  }
  if (blockChain.polygon) {
    const wallets = await getWalletsAddressMatic(address);
    list.push(...wallets);
  }
  if (blockChain.sol) {
    const wallets = await getWalletsAddressSolana(address);
    list.push(...wallets);
  }

  return [...list];
}



export {
  getWallets
}
