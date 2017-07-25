import { connect } from 'react-redux';
import { createStructuredSelector, createSelector } from 'reselect';
import { suggestionUser } from './actions';
import View from './view';

const getState = (state) => state.listUser;
// state.listUser.list;
const mapStateToProps = createStructuredSelector({
  listUser: createSelector([getState], (state) => state.listUser),
});

const mapDispatchToProps = {
  suggestionUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
