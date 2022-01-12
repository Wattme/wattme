// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import WalletBuyCryptoView from './WalletBuyCryptoView';

export default compose(
  connect(
    state => ({
      global: state.globalState
    }),
    dispatch => ({}),
  ),
)(WalletBuyCryptoView);
