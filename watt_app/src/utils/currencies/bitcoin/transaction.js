import "react-native-get-random-values";
import "@ethersproject/shims";
import bip39 from "react-native-bip39";
import {
  ECPair,
  networks,
  bip32 as bitcoinBip32,
  TransactionBuilder
} from "bitcoinjs-lib";

const derivePaths = {
  p2sh: "m/84'/0'/0'/0/0", //3
  p2pkh: "m/44'/0'/0'/0/0", //1
};

const btcSignTxMnemonic = async (from, tx, mnemonic, contract, btcPath) => {
  const PATH = derivePaths[btcPath];
  const seed = bip39.mnemonicToSeed(mnemonic);
  const hdMaster = bitcoinBip32.fromSeed(seed, networks.bitcoin);
  const keyPair = hdMaster.derivePath(PATH);

  let signTransaction;
  if (btcPath === "p2sh") {
    signTransaction = await signTransactionP2PKH({tx, keyPair});
  }
  if (btcPath === "p2pkh") {
    signTransaction = await signTransactionP2PKH({tx, keyPair});
  }

  return signTransaction;
};
const signTransactionP2PKH = async ({tx, keyPair}) => {
  const txb = new TransactionBuilder(networks.bitcoin);
  txb.setVersion(1);
  tx.inputs.forEach((input) => txb.addInput(input.prevHash, input.outputIndex));
  tx.outputs.forEach((output) => txb.addOutput(output.address, output.value));
  for (let i = 0; i < tx.inputs.length; i++) {
    txb.sign(i, keyPair);
  }
  return txb.build().toHex()
}

export {
  btcSignTxMnemonic
};
