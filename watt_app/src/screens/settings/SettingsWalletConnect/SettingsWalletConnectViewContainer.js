// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import SettingsWalletConnectView from './SettingsWalletConnectView';

export default compose(
  connect(
    state => ({
      wallet: state.globalState?.wallet || {}
    }),
    dispatch => ({}),
  ),
)(SettingsWalletConnectView);
