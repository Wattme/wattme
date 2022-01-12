import { store } from '../store/store';

const getLinkBrowserTransaction = ({hash, currency}) => {
  let link = "";

  if (currency === 'BNB' || currency === 'BUSD' || currency === 'WWT') {
    link = `https://bscscan.com/tx/${hash}`
  }
  if (currency === 'ETH' || currency === 'USDT') {
    link = `https://etherscan.io/tx/${hash}`
  }
  if (currency === 'POLYGON') {
    link = `https://polygonscan.com/tx/${hash}`
  }

  return link
}

const getLinkLanding = (link) => {
  const { globalState } = store.getState();
  const { language } = globalState;

  return `${ link }?lang=${ (language || "").split("-")?.[0] || "ru" }`
}

export {
  getLinkBrowserTransaction,
  getLinkLanding
}
