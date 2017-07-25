import { connect } from 'react-redux';
import { createStructuredSelector, createSelector } from 'reselect';
import { updateUser } from './actions';
import View from './view';

const getStateError = (state) => state.evtxError;
const getState = (state) => state.login;
const mapStateToProps = createStructuredSelector({
  matchaToken: createSelector([getState], (state) => state.matchaToken),
  didRequested: createSelector([getStateError], (state) => state.didRequested),
});

const mapDispatchToProps = {
  updateUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
