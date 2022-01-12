// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import TokenWattAboutView from './TokenWattAboutView';

export default compose(
  connect(
    state => ({}),
    dispatch => ({}),
  ),
)(TokenWattAboutView);
