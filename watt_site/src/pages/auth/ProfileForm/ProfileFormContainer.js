// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import ProfileForm from './ProfileForm';

export default compose(
  connect(
    state => ({
      user: state.global?.user || {}
    }),
    dispatch => ({}),
  ),
)(ProfileForm);
