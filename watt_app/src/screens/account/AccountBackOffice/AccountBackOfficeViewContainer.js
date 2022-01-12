// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import AccountBackOfficeView from './AccountBackOfficeView';
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
      wiseWinSetProfile: (profile) => dispatch(wiseWinSetProfile(profile))
    }),
  ),
)(AccountBackOfficeView);
