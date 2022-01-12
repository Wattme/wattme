// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import TokenWattTransactionsView from './TokenWattTransactionsView';

export default compose(
  connect(
    state => ({
      accountWiseWin: state?.wiseWinState?.profile || {}
    }),
    dispatch => ({}),
  ),
)(TokenWattTransactionsView);
