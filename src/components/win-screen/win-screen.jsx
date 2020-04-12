import React from 'react';
import PropTypes from 'prop-types';

const WinScreen = (props) => {
  const {
    rightAnswers,
    mistakes,
    time,
    onStartButtonClick,
  } = props;

  const mistakerender = (errors) => {
    if (errors === 1) {
      return '1 ошибку';
    }
    if (errors === 2 || errors === 3 || errors === 4) {
      return `${errors} ошибки`;
    }
    return `${errors} ошибок`;
  };

  const pointrender = (points) => {
    if (points === 1) {
      return '1 очко';
    }
    const lastNumberString = String(points);
    const lastNumber = Number(lastNumberString[lastNumberString.length - 1]);
    if (lastNumber === 2 || lastNumber === 3 || lastNumber === 4) {
      return `${points} очка`;
    }
    return `${points} очков`;
  };

  const timerender = (time1) => {
    const seconds = time1 % 60;
    const minutes = Math.round(time1 / 60);
    const minutescheck = (minutes1) => {
      let result;
      result = minutes1 === 1 ? 'у' : '';
      result = minutes1 === 2 ? 'ы' : '';
      result = minutes1 === 3 ? 'ы' : '';
      result = minutes1 === 4 ? 'ы' : '';
      return result;
    };
    const textMinutes = minutes > 0 ? `${minutes} минут${minutescheck(minutes)} и ` : '';

    return `${textMinutes}${seconds} секунд${minutescheck(seconds)}`;
  };

  return <section className="result">
    <div className="result__logo">
      <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83" />
    </div>
    <h2 className="result__title">Вы настоящий меломан!</h2>
    <p className="result__total">За {timerender(time)} вы набрали {pointrender(rightAnswers)}, совершив {mistakerender(mistakes)}</p>
    <p className="result__text">Вы заняли 2 место из 10. Это лучше чем у 80% игроков</p>
    <button className="replay" type="button" onClick={ onStartButtonClick }>Сыграть ещё раз</button>
  </section>;
};

WinScreen.propTypes = {
  time: PropTypes.number.isRequired,
  rightAnswers: PropTypes.number.isRequired,
  onStartButtonClick: PropTypes.func.isRequired,
  mistakes: PropTypes.number.isRequired,
};

export default WinScreen;
