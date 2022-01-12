import axios from "axios";
import settings from "../../constants/settings";

const apiKey = settings.moonPayApikey;

const getPriceCurrencyBuy = async ({ currencyCode }) => {
  return await axios.get(`https://api.moonpay.com/v3/currencies/${ currencyCode }/bid_price?apiKey=${ apiKey }`).then((res) => {
    return res.data
  }).catch((err) => {
    return { error: err?.response }
  })
}
const getCurrency = async () => {
  return await axios.get(`https://api.moonpay.com/v3/currencies?apiKey=${ apiKey }`).then((res) => {
    return res.data
  }).catch((err) => {
    return []
  })
}
const getCurrenciesQuote = async ({ search, currencyCode }) => {
  return await axios.get(`https://api.moonpay.com/v3/currencies/${ currencyCode }/quote/?${ search }`).then((res) => {
    return res.data
  }).catch((err) => {
    return { error: err?.response }
  })
}

export {
  getPriceCurrencyBuy,
  getCurrency,
  getCurrenciesQuote
}
