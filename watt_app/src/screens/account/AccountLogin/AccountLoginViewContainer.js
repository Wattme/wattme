// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import AccountLoginView from './AccountLoginView';
import { updateAccount } from "../../../state/GlobalState";
import { setProfile as tradingSetProfile } from "../../../state/BinanceState";

export default compose(
  connect(
    state => ({}),
    dispatch => ({
      updateAccount: (account) => dispatch(updateAccount(account)),
      tradingSetProfile: (profile) => dispatch(tradingSetProfile(profile))
    }),
  ),
)(AccountLoginView);
