import { setItem } from "../common/Storage";

const SET_TRADING_SYMBOLS = "TradingState/SET_TRADING_SYMBOLS";

const initialState = {
  tradingSymbols: [],
};

export function setTradingSymbols(tradingSymbols) {
  return {
    type: SET_TRADING_SYMBOLS,
    tradingSymbols,
  };
}

export default function UserInfo(state = initialState, action = {}) {
  switch (action.type) {

    case SET_TRADING_SYMBOLS: {
      let tradingSymbols = action.tradingSymbols;

      return {
        ...state,
        tradingSymbols
      };
    }

    default:
      return state;
  }
}
