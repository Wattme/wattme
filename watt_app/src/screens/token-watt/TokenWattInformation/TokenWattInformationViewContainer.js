// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import TokenWattInformationView from './TokenWattInformationView';

export default compose(
  connect(
    state => ({}),
    dispatch => ({}),
  ),
)(TokenWattInformationView);
