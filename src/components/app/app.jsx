/* eslint-disable arrow-body-style */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getStep } from '../../reducer/game/selectors';
import { getQuestions } from '../../reducer/data/selectors';

const Type = {
  ARTIST: 'game--artist',
  GENRE: 'game--genre',
};

const mapStateToProps = (state) => {
  const props = { step: getStep(state), questions: getQuestions(state) };
  return props;
};

class App extends React.Component {
  render() {
    const { questions, step, renderScreen } = this.props;
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

    {renderScreen(questions[step])}
  </section>;
  }
}

App.propTypes = {
  gameTime: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
  renderScreen: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(App);
