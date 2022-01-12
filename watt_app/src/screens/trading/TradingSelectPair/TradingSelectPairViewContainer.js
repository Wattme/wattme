// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import TradingSelectPairView from './TradingSelectPairView';
import {
  setTradingSymbols
} from "../../../state/TradingState";

export default compose(
  connect(
    state => ({
      wallet: state.binanceState?.profile?.balances || [],
      tradingSymbols: state.tradingState?.tradingSymbols || []
    }),
    dispatch => ({
      setTradingSymbols: (list) => dispatch(setTradingSymbols(list))
    }),
  ),
)(TradingSelectPairView);
