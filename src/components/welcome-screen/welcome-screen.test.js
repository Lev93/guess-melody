import React from 'react';
import renderer from 'react-test-renderer';
import WelcomeScreen from './welcome-screen.jsx';

describe('welcome-screen', () => {
  it('renders correctly', () => {
    const welcomeScreen = renderer.create(
        <WelcomeScreen time={5} errorsCount={3}/>,
    ).toJSON();

    expect(welcomeScreen).toMatchSnapshot();
  });
});
