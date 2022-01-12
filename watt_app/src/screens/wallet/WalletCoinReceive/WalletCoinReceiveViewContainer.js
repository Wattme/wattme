// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import WalletCoinReceiveView from './WalletCoinReceiveView';

export default compose(
  connect(
    state => ({
      global: state.globalState
    }),
    dispatch => ({}),
  ),
)(WalletCoinReceiveView);
