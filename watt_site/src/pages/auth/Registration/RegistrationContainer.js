// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import Registration from './Registration';

export default compose(
  connect(
    state => ({}),
    dispatch => ({}),
  ),
)(Registration);
