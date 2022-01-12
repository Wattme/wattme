import AsyncStorage from "@react-native-async-storage/async-storage";
import urls from "../constants/urls";

const walletConnectMeta = () => {
  return {
    clientMeta: {
      description: "Connect with WalletConnect",
      url: "https://walletconnect.org",
      icons: ["https://walletconnect.org/walletconnect-logo.png"],
      name: "WalletConnect",
    },
    redirectUrl: "wattwallet://",
    storageOptions: {
      asyncStorage: AsyncStorage,
    },
  }
}

const walletConnectNetworkImage = (name) => {
  return `${ urls.coinCup }/app/wallet-connect-network-image/${ name }.png`
}

export default walletConnectMeta
export {
  walletConnectNetworkImage
}
