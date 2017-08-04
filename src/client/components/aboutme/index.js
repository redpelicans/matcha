import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUserInfos } from '../../actions/aboutme';

class AboutMe extends Component {
  render() {
    return (
      <div>
        <div className="home-container" >
        </div>
      </div>
    );
  }
}

const mapStateToProps = {

};

const mapDispatchToProps = {
  updateUserInfos,
};

export default connect(mapStateToProps, mapDispatchToProps)(AboutMe);

