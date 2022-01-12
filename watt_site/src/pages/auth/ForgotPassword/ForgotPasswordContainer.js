// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import ForgotPassword from './ForgotPassword';

export default compose(
  connect(
    state => ({}),
    dispatch => ({}),
  ),
)(ForgotPassword);
