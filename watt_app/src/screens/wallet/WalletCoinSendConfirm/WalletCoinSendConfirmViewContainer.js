// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import WalletCoinSendConfirmView from './WalletCoinSendConfirmView';

export default compose(
  connect(
    state => ({
      global: state.globalState
    }),
    dispatch => ({}),
  ),
)(WalletCoinSendConfirmView);
