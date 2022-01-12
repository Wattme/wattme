import {getItem} from "../../common/Storage";
import currency from "../../constants/currency";

const generateUserWalletsRequest = async () => {

    let userWallets = {};
    let wallets = await getItem('wallets');
    wallets = JSON.parse(wallets || '[]');

    const walletBnb = wallets.find((wallet) => wallet.code === currency.bnb_code);

    if (Boolean(walletBnb)) {
        userWallets.binance = {
            address: walletBnb.address
        }
    }

    return userWallets

}

export {
    generateUserWalletsRequest
}
