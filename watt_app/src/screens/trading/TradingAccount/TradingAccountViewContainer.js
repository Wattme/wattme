// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import TradingAccountView from './TradingAccountView';

export default compose(
  connect(
    state => ({
      trading: state.binanceState,
      currencies: state.globalState?.currencies || []
    }),
    dispatch => ({}),
  ),
)(TradingAccountView);
