// @flow
import { compose } from "recompose";
import { connect } from "react-redux";

import DashboardView from "./DashboardView";
import {
  updateWallet,
  updateWalletsList,
} from "../../../state/GlobalState";

export default compose(
  connect(
    state => ({
      global: state.globalState,
    }),
    dispatch => ({
      updateWallet: (wallet) => dispatch(updateWallet(wallet)),
      updateWalletsList: (wallets) => dispatch(updateWalletsList(wallets)),
    }),
  ),
)(DashboardView);
