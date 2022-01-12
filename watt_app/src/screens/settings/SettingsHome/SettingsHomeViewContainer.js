// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import SettingsHomeView from './SettingsHomeView';
import {
  updateAccount,
  updateLanguage,
  updateUserCurrencies
} from "../../../state/GlobalState";
import {
  setProfile
} from "../../../state/BinanceState";

export default compose(
  connect(
    state => ({
      global: state.globalState
    }),
    dispatch => ({
      setProfile: (profile) => dispatch(setProfile(profile)),
      updateAccount: (account) => dispatch(updateAccount(account)),
      updateLanguage: (language) => dispatch(updateLanguage(language)),

      updateUserCurrencies: (items) => dispatch(updateUserCurrencies(items))
    }),
  ),
)(SettingsHomeView);
