// documentation app example
// https://moviendo.me/building-a-solana-wallet-cross-platform-app-with-expo-web3-and-react-native.html
// https://github.com/jferrer/expo-solana-wallet

import * as web3 from '@solana/web3.js';
import * as ed25519 from "ed25519-hd-key";
import bip39 from "react-native-bip39";
import nacl from "tweetnacl";
import { address as addressLib } from "bitcoinjs-lib";

const derivePath = "m/44'/501'/0'/0'";

const publicKeyFromString = (publicKeyString: string) => {
  return new web3.PublicKey(publicKeyString);
};

const solWalletImport = async (mnemonic) => {

  const seed = bip39.mnemonicToSeed(mnemonic);

  const derivedSeed = ed25519.derivePath(derivePath, Buffer.from(seed, "hex")).key;

  const keyPair = nacl.sign.keyPair.fromSeed(derivedSeed);

  const account = new web3.Keypair(keyPair);

  const address = account.publicKey.toString();

  return {
    mnemonic: mnemonic,
    address: address,
    privateKey: "",
  }

}
const solGetAccount = (mnemonic) => {

  const seed = bip39.mnemonicToSeed(mnemonic);

  const derivedSeed = ed25519.derivePath(derivePath, Buffer.from(seed, "hex")).key;

  const keyPair = nacl.sign.keyPair.fromSeed(derivedSeed);

  const account = new web3.Keypair(keyPair);

  return {
    keyPair,
    account
  }

}

const solCheckAddress = (address) => {
  try {
    publicKeyFromString(address);
    return true
  } catch (e) {
    return false
  }
}

export {
  solWalletImport,
  solGetAccount,

  solCheckAddress
}
