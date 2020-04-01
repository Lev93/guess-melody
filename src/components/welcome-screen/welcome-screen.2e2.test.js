
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import WelcomeScreen from './welcome-screen.jsx';

Enzyme.configure({ adapter: new Adapter() });


it('App is correctly rendered after relaunch', () => {
  const clickHandler = jest.fn();
  const welcomeScreen = shallow(<WelcomeScreen
    time={0}
    errorsCount={0}
    onClick={clickHandler}
    />);
  const startButton = welcomeScreen.find('button');
  startButton.simulate('click');
  // simulate(`click`, { preventDefault() {} }) если mount
  expect(clickHandler).toHaveBeenCalledTimes(1);
});
