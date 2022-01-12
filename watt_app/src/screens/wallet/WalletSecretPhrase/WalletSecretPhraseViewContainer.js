// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import WalletSecretPhraseView from './WalletSecretPhraseView';

export default compose(
  connect(
    state => ({
      wallet: state.globalState?.wallet || {}
    }),
    dispatch => ({}),
  ),
)(WalletSecretPhraseView);
