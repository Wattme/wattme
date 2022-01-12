// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import TokenWattBuyingTokenView from './TokenWattBuyingTokenView';

export default compose(
  connect(
    state => ({
      account: state.globalState?.account || {},
      walletImportInfo: state?.globalState?.walletImportInfo || {},

      language: state?.globalState?.language
    }),
    dispatch => ({}),
  ),
)(TokenWattBuyingTokenView);
