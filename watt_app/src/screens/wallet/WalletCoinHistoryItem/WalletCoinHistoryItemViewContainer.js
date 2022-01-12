// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import WalletCoinHistoryItemView from './WalletCoinHistoryItemView';

export default compose(
  connect(
    state => ({
      global: state.globalState
    }),
    dispatch => ({}),
  ),
)(WalletCoinHistoryItemView);
