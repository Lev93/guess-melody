import React from 'react';
import PropTypes from 'prop-types';

const GameHeader = (props) => {
  const { mistakes, time, openModal } = props;
  const wrongAnswers = new Array(mistakes).fill(1);
  return <header className="game__header">
  <a className="game__back" href="#" onClick={ openModal }>
    <span className="visually-hidden">Сыграть ещё раз</span>
    <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию" />
  </a>

  <div className="timer__value" xmlns="http://www.w3.org/1999/xhtml">
    <span className="timer__mins">{Math.floor(time / 60)}</span>
    <span className="timer__dots">:</span>
    <span className="timer__secs">{time % 60}</span>
  </div>

  <div className="game__mistakes">
    {wrongAnswers.map((mistake, i) => <div className="wrong" key={i}></div>)}
  </div>
</header>;
};

GameHeader.propTypes = {
  mistakes: PropTypes.number.isRequired,
  time: PropTypes.number.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default GameHeader;
