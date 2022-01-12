// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import RegistrationConfirm from './RegistrationConfirm';
import {setUser} from "../../../states/global";

export default compose(
  connect(
    state => ({}),
    dispatch => ({
      setUser: (user) => dispatch(setUser(user))
    }),
  ),
)(RegistrationConfirm);
