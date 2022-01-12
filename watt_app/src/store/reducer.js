import { combineReducers } from "redux";

import globalState from "../state/GlobalState";
import walletConnectHomeState from "../state/WalletConnectHomeState";
import binanceState from "../state/BinanceState.js";
import tradingState from "../state/TradingState.js";
import qualificationState from "../state/QualificationState.js";
import wiseWinState from "../state/WiseWinState.js";
import coinsState from "../state/CoinsState.js";

const rootReducer = combineReducers({
  coinsState,
  globalState,
  binanceState,
  tradingState,
  wiseWinState,
  qualificationState,
  walletConnectHomeState
});

export default rootReducer;
