// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import AccountWalkFameView from './AccountWalkFameView';

export default compose(
  connect(
    state => ({
      account: state?.globalState?.account || {},
      wiseWinAccount: state?.wiseWinState?.profile || {}
    }),
    dispatch => ({}),
  ),
)(AccountWalkFameView);
