/* eslint no-underscore-dangle: 0 */
import React from 'react';
import PropTypes from 'prop-types';

class AudioPlayer extends React.PureComponent {
  render() {
    const {
      isLoading,
      isPlaying,
      renderAudio,
      onPlayButtonClick,
    } = this.props;
    return (
      <React.Fragment>
        <button className = {`track__button track__button--${isPlaying ? 'pause' : 'play'}`} type = 'button' disabled={isLoading} onClick={onPlayButtonClick} />
        <div className = 'track__status'>
          {renderAudio()}
        </div>
      </React.Fragment>
    );
  }
}

AudioPlayer.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
  renderAudio: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
};

export default AudioPlayer;
