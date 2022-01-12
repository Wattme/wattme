// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import WalletInfoView from './WalletInfoView';

export default compose(
  connect(
    state => ({}),
    dispatch => ({}),
  ),
)(WalletInfoView);
