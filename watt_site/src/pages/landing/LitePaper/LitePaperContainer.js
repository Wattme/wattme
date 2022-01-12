// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import LitePaper from './LitePaper';

export default compose(
  connect(
    state => ({
      language: state?.global?.language || "ru-RU"
    }),
    dispatch => ({}),
  ),
)(LitePaper);
