import axios from "axios";

const cryptorankGetCurrency = async () => {}
const cryptorankGetPriceHistoryPeriod = async (currency) => {
  const response = await axios.get(`https://api.cryptorank.io/v1/currencies/${currency}/sparkline?from&to&interval`)
}

export {
  cryptorankGetCurrency,
  cryptorankGetPriceHistoryPeriod
}
