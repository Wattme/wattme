// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import SettingsSecurityView from './SettingsSecurityView';

export default compose(
  connect(
    state => ({}),
    dispatch => ({}),
  ),
)(SettingsSecurityView);
