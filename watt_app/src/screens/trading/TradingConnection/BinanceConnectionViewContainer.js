// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import BinanceConnectionView from './BinanceConnectionView';
import {
  setKeys,
  setProfile,
  setListKeys as tradingSetListKeys,
} from "../../../state/BinanceState";

export default compose(
  connect(
    state => ({
      binance: state.binanceState
    }),
    dispatch => ({
      setKeys: (keys) => dispatch(setKeys(keys)),
      setProfile: (profile) => dispatch(setProfile(profile)),
      tradingSetListKeys: (listKeys) => dispatch(tradingSetListKeys(listKeys)),
    }),
  ),
)(BinanceConnectionView);
