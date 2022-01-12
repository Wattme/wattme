// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import AccountProfileMeView from './AccountProfileMeView';
import { updateAccount } from "../../../state/GlobalState";
import { setProfile } from "../../../state/BinanceState";
import {
  setProfile as wiseWinSetProfile
} from "../../../state/WiseWinState";

export default compose(
  connect(
    state => ({
      global: state.globalState,

      wiseWinAccount: state?.wiseWinState?.profile || {}
    }),
    dispatch => ({
      setAccountApp: (account) => dispatch(updateAccount(account)),
      setAccountTraid: (account) => dispatch(setProfile(account)),
      wiseWinSetProfile: (account) => dispatch(wiseWinSetProfile(account))
    }),
  ),
)(AccountProfileMeView);
