import currency from "../../../constants/currency";
import currency_rank from "../../../constants/currency_rank";

export default function(data) {
  return {
    address: data.address,
    contract: data.contract,
    mnemonic: data.mnemonic,
    name: data.name,
    code: data.code,
    rank: currency_rank.TOKEN_POLYGON,
    privateKey: data.privateKey,
    isFiat: 0,
  };
}
