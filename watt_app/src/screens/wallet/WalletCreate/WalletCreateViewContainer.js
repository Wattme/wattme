// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import WalletCreateView from './WalletCreateView';
import { updateWallet, updateWalletsList } from "../../../state/GlobalState";

export default compose(
  connect(
    state => ({}),
    dispatch => ({
      updateWallet: (wallet) => dispatch(updateWallet(wallet)),
      updateWalletsList: (wallets) => dispatch(updateWalletsList(wallets))
    }),
  ),
)(WalletCreateView);
