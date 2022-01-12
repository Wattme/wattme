// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import AccountQualificationsView from './AccountQualificationsView';

export default compose(
  connect(
    state => ({
      account: state.globalState?.account || {},
      qualification: state.qualificationState
    }),
    dispatch => ({}),
  ),
)(AccountQualificationsView);
