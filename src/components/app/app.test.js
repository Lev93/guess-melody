import React from 'react';
import renderer from 'react-test-renderer';
import App from './app.jsx';

const mock = {
  questions: [
    {
      type: 'genre',
      genre: 'rock',
      answers: [
        {
          src: 'path',
          genre: 'rock',
        },
      ],
    },
    {
      type: 'artist',
      song: {
        artist: 'One',
        src: '',
      },
      answers: [
        {
          picture: '',
          artist: 'One',
        },
      ],
    },
  ],
};

describe('App', () => {
  it('renders correctly', () => {
    const app = renderer.create(
        <App gameTime={5} errorCount={3} questions={mock.questions}/>,
    ).toJSON();

    expect(app).toMatchSnapshot();
  });
});
