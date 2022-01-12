import "react-native-get-random-values";
import "@ethersproject/shims";
import bip39 from "react-native-bip39";

const generateMnemonic = async () => {
  return bip39.generateMnemonic();
}

export {
  generateMnemonic
}
