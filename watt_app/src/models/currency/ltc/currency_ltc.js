import currency from "../../../constants/currency";
import currency_rank from "../../../constants/currency_rank";

export default function(data) {
  return {
    address: data.address,
    contract: "0x",
    mnemonic: data.mnemonic,
    name: currency.ltc_name,
    code: currency.ltc_code,
    rank: currency_rank.MAIN_LTC,
    privateKey: data.privateKey,
    isFiat: 0,
    path: data.path,
    addresses: data.addresses,
  };
}
