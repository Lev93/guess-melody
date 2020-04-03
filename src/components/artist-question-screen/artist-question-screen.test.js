/* eslint-disable arrow-body-style */
import React from 'react';
import renderer from 'react-test-renderer';
import ArtistQuestionScreen from './artist-question-screen.jsx';

const mock = {
  question: {
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
};

describe('ArtistQuestionScreen is rendered correctly', () => {
  it('ArtistQuestionScreen renders correctly', () => {
    const { question } = mock;
    const tree = renderer.create(
        <ArtistQuestionScreen onAnser={jest.fn()} question={question}/>, {
          createNodeMock: () => {
            return {};
          },
        },
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
