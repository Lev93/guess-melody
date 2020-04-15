/* eslint-disable arrow-body-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import * as actions from '../../actions';
import WelcomeScreen from '../welcome-screen/welcome-screen.jsx';
import GameHeader from '../game-header/game-header.jsx';
import ArtistQuestionScreen from '../artist-question-screen/artist-question-screen.jsx';
import GenreQuestionScreen from '../genre-question-screen/genre-question-screen.jsx';
import WinScreen from '../win-screen/win-screen.jsx';
import FailScreen from '../fail-screen/fail-screen.jsx';
import Modal from '../modal/modal.jsx';
import Eror404 from '../404/404.jsx';
import Timer from '../timer/timer';

const mapStateToProps = (state) => {
  const props = {
    step: state.step,
    mistakes: state.mistakes,
    time: state.time,
    modal: state.modal,
    isAuth: state.isAuth,
    user: state.user,
  };
  return props;
};

const actionCreators = {
  onStep: actions.incrementStep,
  onTimer: actions.incrementTime,
  onIncrementMistake: actions.incrementMistake,
  resetGame: actions.resetGame,
  openModal: actions.openModal,
  closeModal: actions.closeModal,
};


class App extends React.Component {
  constructor(props) {
    super(props);
    this.timer = new Timer(this.props.onTimer);
  }

  renderWelcomeScreen() {
    const {
      maxMistakes,
      gameTime,
      onStep,
    } = this.props;
    return <WelcomeScreen
      errorsCount={maxMistakes}
      time= { gameTime }
      onStartButtonClick= { () => {
        onStep();
        this.timer.startTimer();
      }
      }
   />;
  }

  renderQuestion(question) {
    const {
      onIncrementMistake,
      onStep,
      mistakes,
      step,
      time,
      gameTime,
      openModal,
    } = this.props;
    if (question.type === 'genre') {
      return (
        <section className="game game--genre">
      <GameHeader
        mistakes = {mistakes}
        time = {gameTime * 60 - time}
        openModal = {openModal}
      />
      <GenreQuestionScreen
        step={step}
        question={ question }
        onAnswer={ (userAnswer) => {
          onStep();
          onIncrementMistake(userAnswer);
        }
      }
      />
      </section>
      );
    }
    if (question.type === 'artist') {
      return (
        <section className="game game--artist">
      <GameHeader
        mistakes = {mistakes}
        time = {gameTime * 60 - time}
        openModal = {openModal}
      />
      <ArtistQuestionScreen
        step={step}
        question={question}
        onAnswer={ (userAnswer) => {
          onStep();
          onIncrementMistake(userAnswer);
        }}
      />;
      </section>
      );
    }
    return null;
  }

  renderWin() {
    const {
      mistakes,
      questions,
      time,
      onStep,
      resetGame,
    } = this.props;
    this.timer.stopTimer();
    return <WinScreen
      mistakes={mistakes}
      rightAnswers = {questions.length - mistakes}
      time= { time }
      onStartButtonClick= { () => {
        resetGame();
        onStep();
        this.timer.startTimer();
      }}
   />;
  }

  renderFail(type) {
    const { onStep, resetGame } = this.props;
    this.timer.stopTimer();
    const check = { mistakes: false, time: false };
    if (type === 'mistakes') {
      check.mistakes = true;
    } else { check.time = true; }
    return <FailScreen
      failTries={check.mistakes}
      failTime = {check.time}
      onStartButtonClick= { () => {
        resetGame();
        onStep();
        this.timer.startTimer();
      }}
   />;
  }

  renderModal() {
    const { closeModal, resetGame } = this.props;
    return <Modal
    onStartButtonClick= { () => {
      this.timer.stopTimer();
      resetGame();
      closeModal();
    }}
    closeModal = { closeModal }
    title = { 'Подтверждение' }
    text = { 'Вы уверены что хотите начать игру заново?' }
 />;
  }

  render() {
    const {
      questions,
      step,
      mistakes,
      maxMistakes,
      gameTime,
      time,
      modal,
    } = this.props;
    return (
      <Switch>
        <Route path="/" exact render={() => <React.Fragment>
          {step === -1 ? this.renderWelcomeScreen() : null}
          {step !== -1 && step < questions.length && mistakes < maxMistakes && time < gameTime * 60
            ? this.renderQuestion(questions[step]) : null}
          {modal ? this.renderModal() : null}
          {mistakes === maxMistakes ? this.renderFail('mistakes') : null}
          {time >= gameTime * 60 ? this.renderFail('time') : null}
          {step >= questions.length && mistakes !== maxMistakes ? this.renderWin() : null}
        </React.Fragment>
        }/>
        <Route component={Eror404} />*/
      </Switch>
    );
  }
}

App.propTypes = {
  maxMistakes: PropTypes.number.isRequired,
  gameTime: PropTypes.number.isRequired,
  time: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
  step: PropTypes.number.isRequired,
  onStep: PropTypes.func.isRequired,
  onTimer: PropTypes.func.isRequired,
  mistakes: PropTypes.number.isRequired,
  onIncrementMistake: PropTypes.func.isRequired,
  resetGame: PropTypes.func.isRequired,
  modal: PropTypes.bool.isRequired,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  isAuth: PropTypes.bool,
  user: PropTypes.number,
};

export default connect(mapStateToProps, actionCreators)(App);
