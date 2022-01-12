// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import WalletChoiceAddingView from './WalletChoiceAddingView';

export default compose(
  connect(
    state => ({}),
    dispatch => ({}),
  ),
)(WalletChoiceAddingView);
