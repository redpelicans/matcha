import { Component } from 'react';
import { createStructuredSelector, createSelector } from 'reselect';
import PropTypes from 'prop-types';
import { Toaster, Intent } from '@blueprintjs/core';
import { connect } from 'react-redux';
import { setToaster } from './actions';

class MyToaster extends Component {

  state = {
    message: '',
    show: false,
  }

  componentDidMount() {
    this.toaster = Toaster.create(this.state);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.message && !this.state.show) { // eslint-disable-line
      this.setState({ show: true });
    }
  }

  componentDidUpdate() {
    if (this.state.show) {
      this.showToaster();
    }
  }

  showToaster = () => {
    const options = { ...this.state, ...this.props };
    const { message, intent, className } = options;
    this.resetToaster();
    if (!intent) this.toaster.show({ message, className, intent: Intent.DANGER });
    else this.toaster.show({ message, className, intent: Intent[intent.toUpperCase()] });
  }

  resetToaster = () => {
    const { setToaster } = this.props;
    this.setState({ show: false });
    setToaster({ message: '' });
  }

  render() {
    return null;
  }
}

MyToaster.propTypes = {
  setToaster: PropTypes.func.isRequired,
};

const getState = (state) => state.toaster;

const mapStateToProps = createStructuredSelector({
  message: createSelector([getState], (state) => state.message),
  intent: createSelector([getState], (state) => state.intent),
});

const mapDispatchToProps = {
  setToaster,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyToaster);
