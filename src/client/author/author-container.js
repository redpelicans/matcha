import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import AuthorView from './author-view';
import { getAuthorSep } from './selectors';

const mapStateToProps = createStructuredSelector({
  author: getAuthorSep('.'),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorView);
