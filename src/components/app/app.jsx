/* eslint-disable arrow-body-style */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ActionCreator } from '../../reducer';
import WelcomeScreen from '../welcome-screen/welcome-screen.jsx';
import ArtistQuestionScreen from '../artist-question-screen/artist-question-screen.jsx';
import GenreQuestionScreen from '../genre-question-screen/genre-question-screen.jsx';

const Type = {
  ARTIST: 'game--artist',
  GENRE: 'game--genre',
};

const mapStateToProps = (state) => {
  const props = { step: state.step, mistakes: state.mistakes };
  return props;
};

const mapDispatchToProps = (dispatch) => ({
  onWelcomeScreenClick: () => dispatch(ActionCreator.incrementStep()),

  onUserAnswer: (userAnswer, question, mistakes, maxMistakes) => {
    dispatch(ActionCreator.incrementStep());
    dispatch(ActionCreator.incrementMistake(
      userAnswer,
      question,
      mistakes,
      maxMistakes,
    ));
  },
});

class App extends React.Component {
  _getscreen(question) {
    if (!question) {
      const {
        maxMistakes,
        gameTime,
        onWelcomeScreenClick,
      } = this.props;

      return <WelcomeScreen
        errorsCount={maxMistakes}
        time= { gameTime }
        onStartButtonClick= { onWelcomeScreenClick }
      />;
    }
    const {
      onUserAnswer,
      mistakes,
      maxMistakes,
      step,
    } = this.props;
    if (question.type === 'genre') {
      return <GenreQuestionScreen
        step={step}
        question={ question }
        onAnswer={ (userAnswer) => onUserAnswer(
          userAnswer,
          question,
          mistakes,
          maxMistakes,
        )}
      />;
    }
    if (question.type === 'artist') {
      return <ArtistQuestionScreen
        step={step}
        question={question}
        onAnswer={(userAnswer) => onUserAnswer(
          userAnswer,
          question,
          mistakes,
          maxMistakes,
        )}
      />;
    }
    return null;
  }

  render() {
    const { questions, step } = this.props;
    return <section className={`game ${Type.ARTIST}`}>
    <header className="game__header">
      <a className="game__back" href="#">
        <span className="visually-hidden">Сыграть ещё раз</span>
        <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию" />
      </a>

      <div className="timer__value">
        <span className="timer__mins">05</span>
        <span className="timer__dots">:</span>
        <span className="timer__secs">00</span>
      </div>

      <div className="game__mistakes">
        <div className="wrong"/>
        <div className="wrong"/>
        <div className="wrong"/>
      </div>
    </header>

    {this._getscreen(questions[step])}
  </section>;
  }
}

App.propTypes = {
  mistakes: PropTypes.number.isRequired,
  maxMistakes: PropTypes.number.isRequired,
  gameTime: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
  step: PropTypes.number.isRequired,
  onUserAnswer: PropTypes.func.isRequired,
  onWelcomeScreenClick: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
