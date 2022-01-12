// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import SettingsVersionAppView from './SettingsVersionAppView';

export default compose(
  connect(
    state => ({}),
    dispatch => ({}),
  ),
)(SettingsVersionAppView);
