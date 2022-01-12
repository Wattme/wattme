// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import Landing from './Landing';

export default compose(
  connect(
    state => ({}),
    dispatch => ({}),
  ),
)(Landing);
