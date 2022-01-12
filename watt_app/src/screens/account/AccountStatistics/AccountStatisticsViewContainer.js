// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import AccountStatisticsView from './AccountStatisticsView';

export default compose(
  connect(
    state => ({
      account: state?.globalState.account
    }),
    dispatch => ({}),
  ),
)(AccountStatisticsView);
