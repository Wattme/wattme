// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import BrowserHomeView from './BrowserHomeView';
import { updateCurrencyInfo } from "../../../state/WalletConnectHomeState";

export default compose(
  connect(
    state => ({
      walletConnectHome: state.walletConnectHomeState
    }),
    dispatch => ({
      updateCurrencyInfo: (currencyInfo) => dispatch(updateCurrencyInfo(currencyInfo))
    }),
  ),
)(BrowserHomeView);
