import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ListView from './list-view';
import { getAuthors, getIsFetching } from './selectors';
import { addAuthor, addRandomAuthor, removeAuthor, addDelayedAuthor } from './actions';

const mapStateToProps = createStructuredSelector({
  authors: getAuthors(),
  isFetching: getIsFetching(),
});

const mapDispatchToProps = {
  addAuthor,
  addRandomAuthor,
  removeAuthor,
  addDelayedAuthor,
};

export default connect(mapStateToProps, mapDispatchToProps)(ListView);