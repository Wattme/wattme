// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import TokenWattTransactionsDetailsView from './TokenWattTransactionsDetailsView';

export default compose(
  connect(
    state => ({
      currencies: state?.globalState?.currencies || []
    }),
    dispatch => ({}),
  ),
)(TokenWattTransactionsDetailsView);
