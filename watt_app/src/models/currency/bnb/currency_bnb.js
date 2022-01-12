import currency from "../../../constants/currency";
import currency_rank from "../../../constants/currency_rank";

export default function (data) {
    return {
        address: data.address,
        contract: '0x',
        mnemonic: data.mnemonic,
        name: currency.bnb_name,
        code: currency.bnb_code,
        rank: currency_rank.MAIN_BNB,
        privateKey: data.privateKey,
        isFiat: 0
    }
}
