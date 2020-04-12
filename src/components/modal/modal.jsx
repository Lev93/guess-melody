import React from 'react';
import PropTypes from 'prop-types';

const Modal = (props) => {
  const { onStartButtonClick, closeModal } = props;
  return <section className="modal">
    <button className="modal__close" type="button" onClick={ closeModal }>
      <span className="visually-hidden">Закрыть</span>
    </button>
    <h2 className="modal__title">Подтверждение</h2>
    <p className="modal__text">Вы уверены что хотите начать игру заново?</p>
    <div className="modal__buttons">
      <button className="modal__button button" onClick={ onStartButtonClick }>Ок</button>
      <button className="modal__button button" onClick={ closeModal }>Отмена</button>
    </div>
  </section>;
};

Modal.propTypes = {
  onStartButtonClick: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default Modal;
