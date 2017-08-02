import React from 'react';
import should from 'should';
import { shallow } from 'enzyme';
import Register from '..';
import WizardFirstPage from '../wizardfirst';
import { Provider } from 'react-redux';
import configureStore from '../../../store';

const { describe, it } = global;

// describe('<App />', () => {
//   it('should render a <Navbar />', () => {
//     expect(shallow(<App />)
//       .find(Navbar)).to.have.lengthOf(1);
//   });

//   it('should render a <Content />', () => {
//     expect(shallow(<App />)
//       .find(Content)).to.have.lengthOf(1);
//   });

//   it('should render a <MainWrapper />', () => {
//     expect(shallow(<App />)
//       .find(MainWrapper)).to.have.lengthOf(1);
//   });

describe.only('<Register />', function () {
  // it('should render a wizard component', function () {
  //   should(shallow(<Root />).matchesElement(<WizardFirstPage />));
  // });
    it('should render a wizard component', function () {
      should(shallow(<Register />).find(<WizardFirstPage />)).length(1);
    });
  // it('should be a component' , function () {
    //  should(shallow(<WizardFirstPage />).contains(<form className="auth-container" />)).eql(true);
  // });
      // it('should be a component' , function () {
    //  should(shallow(<WizardSecondPage />).contains(<form className="auth-container" />)).eql(true);
  // });
      // it('should be a component' , function () {
    //  should(shallow(<WizardFirstPage />).contains(<form className="auth-container" />)).eql(true);
  // });
      // it('should be a component' , function () {
    //  should(shallow(<WizardFirstPage />).contains(<form className="auth-container" />)).eql(true);
  // });
});
