import "react-native-get-random-values";
import "@ethersproject/shims";
import {
    Wallet
} from "ethers";

const commonDerivePath = "m/44'/60'/0'/0/0";

const bnbWalletImport = async (mnemonic, derivePath = commonDerivePath) => {

    // Импорт кошелька через мнемоническую фразу
    const wallet = Wallet.fromMnemonic(
      mnemonic,
      derivePath
    );

    return {
        mnemonic: mnemonic,
        address: wallet.address,
        privateKey: wallet.privateKey,
    };
};

export {
    bnbWalletImport
}
