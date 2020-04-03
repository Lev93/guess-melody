import React from 'react';
import PropTypes from 'prop-types';
import AudioPlayer from '../audio-player/audio-player.jsx';


class GenreQuestionScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activePlayer: -1,
    };
  }

  render() {
    const { question, onAnswer } = this.props;
    const { answers, genre } = question;

    const handleSubmitForm = (e) => {
      e.preventDefault();
      onAnswer();
    };

    return <section className="game game--genre">
  <header className="game__header">
    <a className="game__back" href="#">
      <span className="visually-hidden">Сыграть ещё раз</span>
      <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию" />
    </a>

    <div className="timer__value" xmlns="http://www.w3.org/1999/xhtml">
      <span className="timer__mins">05</span>
      <span className="timer__dots">:</span>
      <span className="timer__secs">00</span>
    </div>

    <div className="game__mistakes">
      <div className="wrong"></div>
      <div className="wrong"></div>
      <div className="wrong"></div>
    </div>
  </header>

  <section className="game__screen">
<h2 className="game__title">Выберите треки с жанром {genre}</h2>
    <form className="game__tracks" onSubmit = { handleSubmitForm }>
      {answers.map((it, i) => <div key = {`answer-${i}`} className="track">
          <AudioPlayer
            src={it.src}
            isPlaying = {i === this.state.activePlayer}
            onPlayButtonClick={() => this.setState({
              activePlayer: this.state.activePlayer === i ? -1 : i,
            })}
          />
          <div className="game__answer">
            <input className="game__input visually-hidden" type="checkbox" name="answer" value={`answer-${i}`} id={`answer-${i}`} />
            <label className="game__check" htmlFor={`answer-${i}`}>Отметить</label>
          </div>
        </div>)}

      <button className="game__submit button" type="submit">Ответить</button>
    </form>
  </section>
</section>;
  }
}


GenreQuestionScreen.propTypes = {
  onAnswer: PropTypes.func.isRequired,
  question: PropTypes.shape({
    answers: PropTypes.arrayOf(PropTypes.shape({
      src: PropTypes.string.isRequired,
      genre: PropTypes.oneOf(['rock', 'jazz', 'blues', 'pop', 'rap']).isRequired,
    })).isRequired,
    genre: PropTypes.oneOf(['rock', 'jazz', 'blues', 'pop', 'rap']).isRequired,
    type: PropTypes.oneOf(['genre', 'artist']).isRequired,
  }).isRequired,
};

export default GenreQuestionScreen;
