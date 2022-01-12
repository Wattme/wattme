// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import WalletCoinSendView from './WalletCoinSendView';

export default compose(
  connect(
    state => ({
      global: state.globalState
    }),
    dispatch => ({}),
  ),
)(WalletCoinSendView);
