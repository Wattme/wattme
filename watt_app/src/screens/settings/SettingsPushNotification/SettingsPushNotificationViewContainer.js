// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import SettingsPushNotificationView from './SettingsPushNotificationView';

export default compose(
  connect(
    state => ({}),
    dispatch => ({}),
  ),
)(SettingsPushNotificationView);
