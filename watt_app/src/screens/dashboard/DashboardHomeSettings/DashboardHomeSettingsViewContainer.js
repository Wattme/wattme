// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import DashboardHomeSettingsView from './DashboardHomeSettingsView';

export default compose(
  connect(
    state => ({}),
    dispatch => ({}),
  ),
)(DashboardHomeSettingsView);
