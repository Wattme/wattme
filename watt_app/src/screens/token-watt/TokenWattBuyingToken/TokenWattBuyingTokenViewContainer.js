// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import TokenWattBuyingTokenView from './TokenWattBuyingTokenView';
import {
  setProfile as wiseWinSetProfile
} from "../../../state/WiseWinState";

export default compose(
  connect(
    state => ({
      account: state.globalState?.account || {},
      accountWiseWin: state.wiseWinState?.profile || {},
      walletImportInfo: state?.globalState?.walletImportInfo || {},

      language: state?.globalState?.language
    }),
    dispatch => ({
      wiseWinSetProfile: (account) => dispatch(wiseWinSetProfile(account))
    }),
  ),
)(TokenWattBuyingTokenView);
