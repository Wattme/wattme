// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import DashboardHomeView from './DashboardHomeView';
import { updateAccount } from "../../../state/GlobalState";

export default compose(
  connect(
    state => ({
      global: state.globalState,
      binance: state.binanceState,
    }),
    dispatch => ({
      updateAccount: (account) => dispatch(updateAccount(account))
    }),
  ),
)(DashboardHomeView);
