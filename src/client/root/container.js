import { connect } from 'react-redux';
import { createStructuredSelector, createSelector } from 'reselect';
import { ifUserCheckConnected, resetError } from './action';
import View from './view';

const getState = (state) => state.userInfo;
const getStateError = (state) => state.evtxError;
const getStateLogin = (state) => state.login;
const mapStateToProps = createStructuredSelector({
  matchaToken: createSelector([getStateLogin], (state) => state.matchaToken),
  user: createSelector([getState], (state) => state.user),
  connected: createSelector([getState], (state) => state.connected),
  error: createSelector([getStateError], (state) => state.error),
  didRequested: createSelector([getStateError], (state) => state.didRequested),
});

const mapDispatchToProps = {
  ifUserCheckConnected,
  resetError,
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
