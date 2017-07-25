import { connect } from 'react-redux';
import { createStructuredSelector, createSelector } from 'reselect';
import { userGet } from './actions';
import View from './view';

const getState = (state) => state.userGet;

const mapStateToProps = createStructuredSelector({
  userLoaded: createSelector([getState], (state) => state.userLoaded),
});

const mapDispatchToProps = {
  userGet,
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
