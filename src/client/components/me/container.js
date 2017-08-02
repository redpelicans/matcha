import { createStructuredSelector, createSelector } from 'reselect';
import { connect } from 'react-redux';
import { getUser } from './actions';
import View from './view';

const getState = (state) => state.currentUser;

const mapStateToProps = createStructuredSelector({
  user: createSelector([getState], (state) => state.user),
});

const mapDispatchToProps = {
  getUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
