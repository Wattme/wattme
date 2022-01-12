// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';
import {
  updateWallet,
  updateWalletsList,
} from "../../../state/GlobalState";

import ImportWalletView from './ImportWalletView';

export default compose(
  connect(
    state => ({
        global: state.globalState
    }),
    dispatch => ({
      updateWallet: (wallet) => dispatch(updateWallet(wallet)),
      updateWalletsList: (wallets) => dispatch(updateWalletsList(wallets))
    }),
  ),
)(ImportWalletView);
