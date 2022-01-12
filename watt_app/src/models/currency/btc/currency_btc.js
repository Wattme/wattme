import currency from "../../../constants/currency";
import currency_rank from "../../../constants/currency_rank";

export default function(data) {
  return {
    address: data.address,
    contract: "0x",
    mnemonic: data.mnemonic,
    name: currency.btc_name,
    code: currency.btc_code,
    rank: currency_rank.MAIN_BTC,
    privateKey: data.privateKey,
    isFiat: 0,
    path: data.path,
    addresses: data.addresses,
  };
}
