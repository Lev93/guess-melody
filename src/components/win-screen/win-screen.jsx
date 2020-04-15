/* eslint-disable class-methods-use-this */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import is from 'is_js';
import axios from 'axios';
import qs from 'qs';
import * as actions from '../../actions';
import Modal from '../modal/modal.jsx';

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

const isInvalid = ({ valid, touched }) => !valid && touched;

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
  isAuthTrue: actions.isAuthTrue,
  authUser: actions.authUser,
};

class WinScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formControls: {
        email: {
          value: '',
          type: 'email',
          errorMessage: 'Введите корректный email',
          valid: false,
          touched: false,
          validation: {
            required: true,
            email: true,
          },
        },
        password: {
          value: '',
          type: 'password',
          errorMessage: 'Введите корректный пароль',
          valid: false,
          touched: false,
          validation: {
            required: true,
            minLength: 6,
          },
        },
      },
      isFormValid: false,
      modalRegistaration: false,
      modalLogin: false,
      modalPass: false,
      results: '',
    };
  }

  loginHandler() {

  }


  submitHandler(event) {
    event.preventDefault();
  }

  validateControl(value, validation) {
    if (!validation) {
      return true;
    }

    let isValid = true;

    if (validation.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (validation.email) {
      isValid = is.email(value) && isValid;
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }

    return isValid;
  }

  onChangeEmail(event) {
    event.preventDefault();
    const formControls = { ...this.state.formControls };
    const control = { ...this.state.formControls.email };

    control.value = event.target.value;
    control.touched = true;
    control.valid = this.validateControl(control.value, control.validation);

    formControls.email = control;
    let isFormValid = true;
    Object.keys(formControls).forEach((name) => {
      isFormValid = formControls[name].valid && isFormValid;
    });

    this.setState({
      formControls, isFormValid,
    });
  }

  onChangePassword(event) {
    event.preventDefault();
    const formControls = { ...this.state.formControls };
    const control = { ...this.state.formControls.password };

    control.value = event.target.value;
    control.touched = true;
    control.valid = this.validateControl(control.value, control.validation);

    formControls.password = control;
    let isFormValid = true;
    Object.keys(formControls).forEach((name) => {
      isFormValid = formControls[name].valid && isFormValid;
    });

    this.setState({
      formControls, isFormValid,
    });
  }

  loginHandler = () => {
    const {
      rightAnswers,
      time,
      authUser,
      isAuthTrue,
    } = this.props;
    const result = (rightAnswers - time / 1000) * 1000;
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      result,
    };
    try {
      axios({
        method: 'post',
        url: '/auth/login',
        data: qs.stringify(authData),
      }).then((response) => {
        if (response.data === 'User unexists') {
          this.setState({ modalLogin: true });
        } else if (response.data === 'Password incorrect') {
          this.setState({ modalPass: true });
        } else {
          isAuthTrue();
          authUser(response.data.user);
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  registerHandler = () => {
    const {
      rightAnswers,
      time,
      authUser,
      isAuthTrue,
    } = this.props;
    const bestresult = (rightAnswers - time / 1000) * 1000;
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      bestresult,
    };
    try {
      axios({
        method: 'post',
        url: '/auth/registration',
        data: qs.stringify(authData),
      }).then((response) => {
        if (response.data === 'User alredy exists') {
          this.setState({ modalRegistaration: true });
        } else {
          isAuthTrue();
          authUser(response.data.user);
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  renderModal(text, status) {
    return <Modal
    onStartButtonClick= { () => {
      this.setState(status);
    }}
    closeModal = { () => this.setState(status)}
    title = { 'Внимание' }
    text = { text }
   />;
  }

  renderSimple() {
    const {
      rightAnswers,
      mistakes,
      time,
      onStartButtonClick,
    } = this.props;
    return <section className="login">
    <div className="login__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83" /></div>
    <h2 className="login__title">Вы настоящий меломан!</h2>
    <p className="login__total">За {timerender(time)} вы набрали {pointrender(rightAnswers)}, совершив {mistakerender(mistakes)}</p>
    <p className="login__text">Хотите сравнить свой результат с предыдущими попытками? Представтесь!</p>
    <form className="login__form" onSubmit={this.submitHandler}>
      <p className="login__field">
        <label className="login__label" htmlFor="email">Почта</label>
        <input className="login__input" type="text" name="email" id="name" value={this.state.formControls.email.value} onChange={(event) => this.onChangeEmail(event)} required />
        {isInvalid(this.state.formControls.email) ? <span className="login__error">{this.state.formControls.email.errorMessage}</span> : null }
      </p>
      <p className="login__field">
        <label className="login__label" htmlFor="password">Пароль</label>
        <input className="login__input" type="text" name="password" id="password" value={this.state.formControls.password.value} onChange={(event) => this.onChangePassword(event)} required />
        {isInvalid(this.state.formControls.password) ? <span className="login__error">{this.state.formControls.password.errorMessage}</span> : null }
      </p>
      <button className="login__button button" type="success" disabled={!this.state.isFormValid} onClick={this.loginHandler}>Войти</button>
      <button className="login__button button" type="primary" disabled={!this.state.isFormValid} onClick={this.registerHandler}>Регистрация</button>
    </form>
    <button className="replay" type="button" onClick={ onStartButtonClick }>Сыграть ещё раз</button>
    { this.state.modalRegistaration ? this.renderModal('Такой пользователь уже существует', { modalRegistaration: false }) : null}
    { this.state.modalLogin ? this.renderModal('Такого пользователя не существует', { modalLogin: false }) : null}
    { this.state.modalPass ? this.renderModal('Неверный пароль', { modalPass: false }) : null}
  </section>;
  }

  componentDidMount() {
    const {
      rightAnswers,
      time,
      user,
    } = this.props;
    if (!user) {
      return;
    }
    const result = (rightAnswers - time / 1000) * 1000;
    const data = { id: user, result };
    try {
      axios({
        method: 'post',
        url: '/results/add',
        data: qs.stringify(data),
      }).then((response) => {
        this.setState({ results: response.data });
      });
    } catch (e) {
      console.log(e);
    }
  }

  renderAuth() {
    const {
      rightAnswers,
      mistakes,
      time,
      onStartButtonClick,
    } = this.props;

    return <section className="result">
    <div className="result__logo">
      <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83" />
    </div>
    <h2 className="result__title">Вы настоящий меломан!</h2>
    <p className="result__total">За {timerender(time)} вы набрали {pointrender(rightAnswers)}, совершив {mistakerender(mistakes)}</p>
  <p className="result__text">{this.state.results}</p>
    <button className="replay" type="button" onClick={ onStartButtonClick }>Сыграть ещё раз</button>
  </section>;
  }

  render() {
    return this.props.isAuth ? this.renderAuth() : this.renderSimple();
  }
}

WinScreen.propTypes = {
  time: PropTypes.number.isRequired,
  rightAnswers: PropTypes.number.isRequired,
  onStartButtonClick: PropTypes.func.isRequired,
  isAuthTrue: PropTypes.func.isRequired,
  authUser: PropTypes.func.isRequired,
  mistakes: PropTypes.number.isRequired,
  isAuth: PropTypes.bool,
  user: PropTypes.number,
};

export default connect(mapStateToProps, actionCreators)(WinScreen);
