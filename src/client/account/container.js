import { createStructuredSelector, createSelector } from 'reselect';
import { connect } from 'react-redux';
import View from './view';

const getState = (state) => state.userInfo;

const mapStateToProps = createStructuredSelector({
  user: createSelector([getState], (state) => state.user),
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
