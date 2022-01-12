// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import TradingTradeInfoView from './TradingTradeInfoView';

export default compose(
  connect(
    state => ({
      global: state.globalState
    }),
    dispatch => ({}),
  ),
)(TradingTradeInfoView);
