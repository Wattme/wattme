import currency from "../../../constants/currency";
import currency_rank from "../../../constants/currency_rank";

export default function (data) {
    return {
        address: data.address,
        contract: '0x',
        mnemonic: data.mnemonic,
        name: currency.eth_name,
        code: currency.eth_code,
        rank: currency_rank.MAIN_ETH,
        privateKey: data.privateKey,
        isFiat: 0
    }
}
