import "react-native-get-random-values";
import "@ethersproject/shims";
import bip39 from "react-native-bip39";
import Bitcoin from "react-native-bitcoinjs-lib";

const derivePaths = {
  p2sh: "m/49'/2'/0'/0/0", //3
  p2pkh: "m/44'/2'/0'/0/0", //1
  p2wpkh: "m/84'/2'/0'/0/0", //bc
};

const ltcSignTxMnemonic = async (from, tx, mnemonic, contract) => {
  const PATH = derivePaths.p2pkh;

  const seed = bip39.mnemonicToSeed(mnemonic);
  const bitcoinNetwork = Bitcoin.networks.litecoin;
  const master = Bitcoin.HDNode.fromSeedBuffer(seed, bitcoinNetwork);
  const node = master.derivePath(PATH);
  const keyPair = node.keyPair;

  const signTransaction = await signTransactionP2PKH({tx, keyPair});

  return signTransaction
};
const signTransactionP2PKH = async ({tx, keyPair}) => {
  const txb = new Bitcoin.TransactionBuilder(Bitcoin.networks.litecoin);
  txb.setVersion(1);


  tx.inputs.forEach((input) => txb.addInput(input.prevHash, input.outputIndex));
  tx.outputs.forEach((output) => txb.addOutput(output.address, output.value));
  for (let i = 0; i < tx.inputs.length; i++) {
    txb.sign(i, keyPair);
  }
  return txb.build().toHex()
}

export {
  ltcSignTxMnemonic
};
