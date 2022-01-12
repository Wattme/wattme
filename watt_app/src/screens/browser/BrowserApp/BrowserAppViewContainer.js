// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import BrowserAppView from './BrowserAppView';
import walletConnectHomeState, { updateFavorites } from "../../../state/WalletConnectHomeState";

export default compose(
  connect(
    state => ({
      global: state.globalState,
      walletConnect: state.walletConnectHomeState
    }),
    dispatch => ({
      updateFavorites: (favorites) => dispatch(updateFavorites(favorites))
    }),
  ),
)(BrowserAppView);
