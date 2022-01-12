import {
  bip32 as bitcoinBip32,
  payments as bitcoinPayments
} from "bitcoinjs-lib";
import bip39 from "react-native-bip39";
import Bitcoin from "react-native-bitcoinjs-lib";

const derivePaths = {
  p2sh: "m/49'/2'/0'/0/0", //3
  p2pkh: "m/44'/2'/0'/0/0", //1
  p2wpkh: "m/84'/2'/0'/0/0", //bc
};

// Импорт кошелька по фразе
const ltcWalletImport = async (mnemonic) => {
  const seed = bip39.mnemonicToSeed(mnemonic);
  const node = bitcoinBip32.fromSeed(seed);

  let addressP2SH = getAddress_p2sh(node); // 3 адрес временно не используется
  let addressP2PKH = getAddress_p2pkh(node);
  let addressP2WPKH = getAddress_p2wpkh(node);

  return {
    mnemonic: mnemonic,
    address: addressP2PKH,
    path: 'p2pkh',
    addresses: [
      {key: 'p2sh', address: addressP2WPKH},
      {key: 'p2pkh', address: addressP2PKH},
    ]
  };
};
const ltcWalletImportFromPrivateKey = async (privateKey) => {
  const hdWallet = Bitcoin.HDNode.fromSeedHex(privateKey, Bitcoin.networks.litecoin);
  const wallet = hdWallet.derivePath(derivePath);
  const address = wallet.getAddress();

  return {
    address: address,
  };
};

const getAddress_p2sh = (node) => {
  const publicKey = node.derivePath(derivePaths.p2sh).publicKey;

  return bitcoinPayments.p2sh({
    redeem: bitcoinPayments.p2wpkh({
      pubkey: publicKey,
      network: Bitcoin.networks.litecoin,
    }),
    network: Bitcoin.networks.litecoin,
  }).address;
}
const getAddress_p2wpkh = (node) => {
  const publicKey = node.derivePath(derivePaths.p2wpkh).publicKey;

  return bitcoinPayments.p2wpkh({pubkey: publicKey}).address;
}
const getAddress_p2pkh = (node) => {
  const publicKey = node.derivePath(derivePaths.p2pkh).publicKey;
  return bitcoinPayments.p2pkh({ pubkey: publicKey, network: Bitcoin.networks.litecoin }).address
}

export {
  ltcWalletImport,
  ltcWalletImportFromPrivateKey
};
