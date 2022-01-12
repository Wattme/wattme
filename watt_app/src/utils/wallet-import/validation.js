import "react-native-get-random-values";
import "@ethersproject/shims";
import bip39 from "react-native-bip39";

const isValidImport = async ({ type, formValue }) => {
    if (type === 'phrase') {
      return isValidMnemonic(formValue);
    }

    return true
}

const isValidMnemonic = (mnemonic) => {
  return bip39.validateMnemonic(mnemonic)
}

export {
  isValidImport
}
