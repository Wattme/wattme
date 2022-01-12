// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import SettingsProfileMeView from './SettingsProfileMeView';
import {
  updateAccount
} from "../../../state/GlobalState";

export default compose(
  connect(
    state => ({
      global: state.globalState
    }),
    dispatch => ({
      updateAccount: (account) => dispatch(updateAccount(account))
    }),
  ),
)(SettingsProfileMeView);
