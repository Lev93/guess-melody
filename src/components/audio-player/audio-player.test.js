/* eslint-disable arrow-body-style */
import React from 'react';
import renderer from 'react-test-renderer';
import AudioPlayer from './audio-player.jsx';

const mock = {
  song: {
    src: 'music/50_Cent-Candy_Shop.mp3',
  },
};

it('AudioPlayer is rendered correctly', () => {
  const { song } = mock;
  const onPlayButtonClick = jest.fn();

  const tree = renderer.create(<AudioPlayer
    isLoading={true}
    isPlaying={false}
    onPlayButtonClick={onPlayButtonClick}
    renderAudio={jest.fn()}
    src={song.src}
  />).toJSON();

  expect(tree).toMatchSnapshot();
});
