// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import ForgotPasswordConfirm from './ForgotPasswordConfirm';
import {
  setUser
} from "../../../states/global";

export default compose(
  connect(
    state => ({}),
    dispatch => ({
      setUser: (user) => dispatch(setUser(user))
    }),
  ),
)(ForgotPasswordConfirm);
