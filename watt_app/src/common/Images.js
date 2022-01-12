
const getIconCurrency = (code) => {
  if (!code) {
    return `https://coincap.wise.win/app/images/currency/undefined.png`
  }

  return `https://coincap.wise.win/app/images/currency/${ code.toLowerCase() }.png`;
  // return `https://cryptoicon-api.vercel.app/api/icon/${ code.toLowerCase() }`;
}

const getIconFiat = (code) => {
  return `https://coincap.wise.win/app/images/fiat/${ code.toUpperCase() }.png`;
}

export {
  getIconFiat,
  getIconCurrency
}
