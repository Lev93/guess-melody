import React from 'react';
import renderer from 'react-test-renderer';
import App from './app.jsx';

describe('App', () => {
  it('renders correctly', () => {
    const app = renderer.create(
        <App gameTime={5} errorCount={3}/>,
    ).toJSON();

    expect(app).toMatchSnapshot();
  });
});
