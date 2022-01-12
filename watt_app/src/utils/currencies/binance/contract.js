import axios from "axios";
import settings from "../../../constants/settings";

const bnbGetInfoContract = async (contract) => {
  return await axios.get(`https://api.bscscan.com/api?module=token&action=tokeninfo&contractaddress=${contract}&apikey=${settings.bscscancomApiKey}`).then((res) => {
    return res.data
  }).catch(err => {
    return {}
  });
}

export {
  bnbGetInfoContract
}
