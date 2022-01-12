// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import TokenWattBusdTopUpView from './TokenWattBusdTopUpView';

export default compose(
  connect(
    state => ({
      wallet: state?.globalState?.wallet,
      walletImportInfo: state?.globalState?.walletImportInfo || {}
    }),
    dispatch => ({}),
  ),
)(TokenWattBusdTopUpView);
