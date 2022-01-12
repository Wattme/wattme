// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import WattPurchaseAgreement from './WattPurchaseAgreement';

export default compose(
  connect(
    state => ({}),
    dispatch => ({}),
  ),
)(WattPurchaseAgreement);
