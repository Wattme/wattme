// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import NetworksView from './NetworksView';

export default compose(
  connect(
    state => ({}),
    dispatch => ({}),
  ),
)(NetworksView);
