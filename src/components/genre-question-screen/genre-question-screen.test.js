/* eslint-disable arrow-body-style */
import React from 'react';
import renderer from 'react-test-renderer';
import GenreQuestionScreen from './genre-question-screen.jsx';

const mock = {
  question: {
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
};

describe('GenreQuestionScreen is rendered correctly', () => {
  it('GenreQuestionScreen renders correctly', () => {
    const { question } = mock;
    const tree = renderer.create(
        <GenreQuestionScreen onAnser={jest.fn()} question={question}/>, {
          createNodeMock: () => {
            return {};
          },
        },
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
