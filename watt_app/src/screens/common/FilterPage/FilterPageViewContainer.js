// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import FilterPageView from './FilterPageView';

export default compose(
  connect(
    state => ({}),
    dispatch => ({}),
  ),
)(FilterPageView);
