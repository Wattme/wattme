// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import TokenWattTopUpView from './TokenWattTopUpView';

export default compose(
  connect(
    state => ({
      wallet: state?.globalState?.wallet || {},
      walletImportInfo: state?.globalState?.walletImportInfo || {}
    }),
    dispatch => ({}),
  ),
)(TokenWattTopUpView);
