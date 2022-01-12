// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import ImportWalletView from './ImportWalletView';

export default compose(
  connect(
    state => ({
        global: state.globalState
    }),
    dispatch => ({}),
  ),
)(ImportWalletView);
