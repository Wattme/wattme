import currency from "../../../constants/currency";
import currency_rank from "../../../constants/currency_rank";

export default function(data) {
  return {
    address: data.address,
    contract: data.contract,
    mnemonic: data.mnemonic,
    name: data.name,
    code: data.code,
    rank: currency_rank.CUSTOM_TOKEN_BNB,
    privateKey: data.privateKey,
    isFiat: 0,
    logoURI: data?.logoURI
  };
}
