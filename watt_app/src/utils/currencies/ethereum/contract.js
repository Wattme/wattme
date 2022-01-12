import axios from "axios";
import settings from "../../../constants/settings";

const ethGetInfoContract = async (contract) => {
  return await axios.get(`https://api.ethplorer.io/getTokenInfo/${contract}?apiKey=${settings.everexIOApiKey}`).then((res) => {
    return res.data
  }).catch(err => {
    return {}
  });
}

export {
  ethGetInfoContract
}
