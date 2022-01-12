import currency from "../../../../constants/currency";
import currency_bnb_custom_token from "../../../../models/currency/bnb/currency_bnb_custom_token";
import currency_eth_custom_token from "../../../../models/currency/eth/currency_eth_custom_token";
import currency_polygon_custom_token from "../../../../models/currency/polygon/currency_polygon_custom_token";

const createCustomToken = ({ network, address, contract, mnemonic, name, code, privateKey }) => {
  if ( network === currency.bnb_code ) {
    return _createCustomTokenBNB({address, contract, mnemonic, name, code, privateKey});
  }
  if ( network === currency.eth_code ) {
    return _createCustomTokenETH({address, contract, mnemonic, name, code, privateKey});
  }
  if ( network === currency.matic_code ) {
    return _createCustomTokenMATIC({address, contract, mnemonic, name, code, privateKey});
  }
}
const _createCustomTokenBNB = ({address, contract, mnemonic, name, code, privateKey}) => {
  return currency_bnb_custom_token({
    address,
    contract,
    mnemonic,
    name,
    code,
    privateKey
  })
}
const _createCustomTokenETH = ({address, contract, mnemonic, name, code, privateKey}) => {
  return currency_eth_custom_token({
    address,
    contract,
    mnemonic,
    name,
    code,
    privateKey
  })
}
const _createCustomTokenMATIC = ({address, contract, mnemonic, name, code, privateKey}) => {
  return currency_polygon_custom_token({
    address,
    contract,
    mnemonic,
    name,
    code,
    privateKey
  })
}

export {
  createCustomToken
}
