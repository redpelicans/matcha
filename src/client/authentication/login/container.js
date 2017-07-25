import { connect } from 'react-redux';
import { createStructuredSelector, createSelector } from 'reselect';
import { connectUser } from './actions';
import View from './view';

const getError = (state) => state.evtxError;

const mapStateToProps = createStructuredSelector({
  error: createSelector([getError], (state) => state.error),
  didRequested: createSelector([getError], (state) => state.didRequested),
});
const mapDispatchToProps = {
  connectUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
