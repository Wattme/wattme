import { store } from '../store/store';
import { convertorNumber } from "../helpers/convertor";

const fiatConverter = (priceUsd, fiatInit = null, decimalCount = 4) => {

  priceUsd = Number.parseFloat(priceUsd);

  const { globalState } = store.getState();
  const { fiat: fiatCode, fiats, currencies } = globalState;

  let fiat = fiats.find((t) => t.code === (Boolean(fiatInit) ? fiatInit : fiatCode));
  if (!fiat) {
    fiat = currencies.find((t) => t.code === (Boolean(fiatInit) ? fiatInit : fiatCode))
  }
  if (!fiat) {
    return priceUsd
  }

  const fiatPriceUsd = Number.parseFloat(fiat.price_usd);
  const value = priceUsd / fiatPriceUsd;

  return convertorNumber(value, decimalCount, ".", "")
}
const fiatSymbol = (currentFiat) => {
  const { globalState } = store.getState();
  const { fiat: globalFiat } = globalState;

  const fiat = currentFiat || globalFiat;

  if (fiat === "RUB") {
    return "₽"
  }
  if (fiat === "USD") {
    return "$"
  }
  if (fiat === "EUR") {
    return "€"
  }
  if (fiat === "IDR") {
    return "₨"
  }
  if (fiat === "THB") {
    return "฿"
  }
  if (fiat === "CNY") {
    return "¥"
  }
  if (fiat === "MYR") {
    return "RM"
  }
  if (fiat === "VND") {
    return "₫"
  }
  if (fiat === "KRW") {
    return "₩"
  }
  if (fiat === "BTC") {
    return "₿"
  }
}
const fiatCode = () => {
  const { globalState } = store.getState();
  const { fiat: fiatCode } = globalState;

  return fiatCode
}

export {
  fiatConverter,
  fiatSymbol,
  fiatCode
}
