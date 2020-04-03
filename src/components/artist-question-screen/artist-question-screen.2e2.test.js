
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ArtistQuestionScreen from './artist-question-screen.jsx';

Enzyme.configure({ adapter: new Adapter() });

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

it('ArtistQuestionScreen is correctly rendered after relaunch', () => {
  const clickHandler = jest.fn();
  const artistQuestionScreen = shallow(<ArtistQuestionScreen
    onAnser={clickHandler}
    question={mock.question}
    />);
  const form = artistQuestionScreen.find('form');
  form.simulate('submit', {
    preventDefault() {},
  });
  expect(form.render()).toMatchSnapshot();
});
