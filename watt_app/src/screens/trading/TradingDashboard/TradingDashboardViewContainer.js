// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import TradingDashboardView from './TradingDashboardView';

export default compose(
  connect(
    state => ({
      global: state.globalState
    }),
    dispatch => ({}),
  ),
)(TradingDashboardView);
