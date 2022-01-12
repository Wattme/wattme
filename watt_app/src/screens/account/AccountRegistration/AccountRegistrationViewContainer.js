// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import AccountRegistrationView from './AccountRegistrationView';

export default compose(
  connect(
    state => ({}),
    dispatch => ({}),
  ),
)(AccountRegistrationView);
