// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import WalletCoinView from './WalletCoinView';
import { updateWallet } from "../../../state/GlobalState";

export default compose(
  connect(
    state => ({
      global: state.globalState
    }),
    dispatch => ({
      updateWallet: (wallet) => dispatch(updateWallet(wallet)),
    }),
  ),
)(WalletCoinView);
