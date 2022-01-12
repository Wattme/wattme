// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import WalletCoinManagementView from './WalletCoinManagementView';
import { updateWallet, updateWalletsList } from "../../../state/GlobalState";
import {
  setBep20,
  setErc20,
  setPolygon
} from "../../../state/CoinsState";

export default compose(
  connect(
    state => ({
      global: state.globalState,
      stateCoins: state.coinsState,
    }),
    dispatch => ({
      updateWallet: (wallet) => dispatch(updateWallet(wallet)),
      updateWalletsList: (wallets) => dispatch(updateWalletsList(wallets)),

      setBep20: (bep20) => dispatch(setBep20(bep20)),
      setErc20: (erc20) => dispatch(setErc20(erc20)),
      setPolygon: (polygon) => dispatch(setPolygon(polygon))
    }),
  ),
)(WalletCoinManagementView);
