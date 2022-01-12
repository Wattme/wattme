// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import AccountDocumentsView from './AccountDocumentsView';

export default compose(
  connect(
    state => ({}),
    dispatch => ({}),
  ),
)(AccountDocumentsView);
