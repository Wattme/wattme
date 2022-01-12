// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import PrivacyPolicy from './PrivacyPolicy';

export default compose(
  connect(
    state => ({}),
    dispatch => ({}),
  ),
)(PrivacyPolicy);
