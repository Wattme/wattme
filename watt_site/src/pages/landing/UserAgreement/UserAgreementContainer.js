// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import UserAgreement from './UserAgreement';

export default compose(
  connect(
    state => ({}),
    dispatch => ({}),
  ),
)(UserAgreement);
