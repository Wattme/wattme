// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import AccountConfirmRegistrationView from './AccountConfirmRegistrationView';
import {
  updateAccount
} from "../../../state/GlobalState";

export default compose(
  connect(
    state => ({}),
    dispatch => ({
      updateAccount: (account) => dispatch(updateAccount(account))
    }),
  ),
)(AccountConfirmRegistrationView);
