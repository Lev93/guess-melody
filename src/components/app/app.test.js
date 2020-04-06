import React from 'react';
import renderer from 'react-test-renderer';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from '../../reducer';

import App from './app.jsx';

const mock = {
  questions: [
    {
      type: 'genre',
      genre: 'rock',
      answers: [
        {
          src: 'test.mp3',
          genre: 'rock',
        },
        {
          src: 'test.mp3',
          genre: 'blues',
        },
        {
          src: 'test.mp3',
          genre: 'jazz',
        },
        {
          src: 'test.mp3',
          genre: 'rock',
        },
      ],
    },
    {
      type: 'artist',
      song: {
        artist: 'Jim Beam',
        src: 'path.mp3',
      },
      answers: [
        {
          picture: 'path.jpg',
          artist: 'John Snow',
        },
        {
          picture: 'path.jpg',
          artist: 'Jack Daniels',
        },
        {
          picture: 'path.jpg',
          artist: 'Jim Beam',
        },
      ],
    },
  ],
};


it('App correctly renders first screen', () => {
  const { questions } = mock;
  const store = createStore(reducer);
  const tree = renderer.create(<Provider store={store}>
    <App
    mistakes={0}
    maxMistakes={Infinity}
    gameTime={100}
    questions={questions}
    step={-1}
    onUserAnswer={jest.fn()}
    onWelcomeScreenClick={jest.fn()}
  /></Provider>).toJSON();

  expect(tree).toMatchSnapshot();
});

it('App correctly renders genre question screen', () => {
  const { questions } = mock;
  const store = createStore(reducer);
  const tree = renderer.create(<Provider store={store}><App
    mistakes={0}
    maxMistakes={Infinity}
    gameTime={100}
    questions={questions}
    step={1}
    onUserAnswer={jest.fn()}
    onWelcomeScreenClick={jest.fn()}
  /></Provider>, {
    createNodeMock: () => {},
  }).toJSON();

  expect(tree).toMatchSnapshot();
});

it('App correctly renders artist question screen', () => {
  const { questions } = mock;
  const store = createStore(reducer);
  const tree = renderer.create(<Provider store={store}><App
    mistakes={0}
    maxMistakes={Infinity}
    gameTime={100}
    questions={questions}
    step={2}
    onUserAnswer={jest.fn()}
    onWelcomeScreenClick={jest.fn()}
  /></Provider>, {
    createNodeMock: () => {},
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
