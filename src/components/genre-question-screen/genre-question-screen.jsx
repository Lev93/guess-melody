import React from 'react';
import PropTypes from 'prop-types';
import AudioPlayer from '../audio-player/audio-player.jsx';


class GenreQuestionScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    const { question } = this.props;
    const { answers } = question;

    this.state = {
      activePlayer: -1,
      userAnswer: new Array(answers.length).fill(false),
    };
  }

  render() {
    const { step, question, onAnswer } = this.props;
    const { answers, genre } = question;

    const wrongAnswer = (userAnswer, question1) => {
      const answerIsCorrect = userAnswer.every(
        (it, i) => it === (question1.answers[i].genre === question1.genre),
      );
      return answerIsCorrect ? 0 : 1;
    };

    const handleSubmitForm = (e) => {
      e.preventDefault();
      onAnswer(wrongAnswer(this.state.userAnswer, question));
    };

    return <section className="game__screen">
    <h2 className="game__title">Выберите треки с жанром {genre}</h2>
    <form className="game__tracks" onSubmit = { handleSubmitForm }>
      {answers.map((it, i) => <div key = {`${step}-answer-${i}`} className="track">
          <AudioPlayer
            src={it.src}
            isPlaying = {i === this.state.activePlayer}
            onPlayButtonClick={() => this.setState({
              activePlayer: this.state.activePlayer === i ? -1 : i,
            })}
          />
          <div className="game__answer">
            <input className="game__input visually-hidden"
              type="checkbox" name="answer" value={`answer-${i}`} id={`answer-${i}`}
              onChange={() => {
                const userAnswer = [...this.state.userAnswer];
                userAnswer[i] = !userAnswer[i];
                this.setState({ userAnswer });
              }}
              />
            <label className="game__check" htmlFor={`answer-${i}`}>Отметить</label>
          </div>
        </div>)}
      <button className="game__submit button" type="submit">Ответить</button>
    </form>
  </section>;
  }
}


GenreQuestionScreen.propTypes = {
  step: PropTypes.number,
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
