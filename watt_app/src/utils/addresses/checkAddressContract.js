import { utils } from "ethers";

const checkAddressContract = (address) => {
  if (_checkAddressContractWEB3(address)) {
    return true
  }
}
const _checkAddressContractWEB3 = (address) => {
  return utils.isAddress(address);
}

export {
  checkAddressContract
}
