// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import TradingSmartTradeCreateView from './TradingSmartTradeCreateView';
import {
  setProfile
} from "../../../state/BinanceState";

export default compose(
  connect(
    state => ({
      walletBalances: state.binanceState?.profile?.balances || []
    }),
    dispatch => ({

      setProfile: (profile) => dispatch(setProfile(profile))

    }),
  ),
)(TradingSmartTradeCreateView);
