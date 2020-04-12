import React from 'react';
import PropTypes from 'prop-types';

const FailScreen = (props) => {
  const { failTries, failTime, onStartButtonClick } = props;
  return <section className="result">
    <div className="result__logo">
      <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83" />
    </div>
    { failTime && <h2 className="result__title">Увы и ах!</h2>}
    { failTries && <h2 className="result__title">Какая жалость!</h2>}
    { failTime && <p className="result__total result__total--fail">Время вышло! Вы не успели отгадать все мелодии</p>}
    { failTries && <p className="result__total result__total--fail">У вас закончились все попытки. Ничего, повезёт в следующий раз!</p>}
    <button className="replay" type="button" onClick={ onStartButtonClick }>Попробовать ещё раз</button>
  </section>;
};

FailScreen.propTypes = {
  failTime: PropTypes.bool.isRequired,
  failTries: PropTypes.bool.isRequired,
  onStartButtonClick: PropTypes.func.isRequired,
};

export default FailScreen;
