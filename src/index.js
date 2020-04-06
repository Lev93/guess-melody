/* eslint-disable no-underscore-dangle */
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import React from 'react';
import App from './components/app/app.jsx';
import questions from './mocks/questions';
import { reducer } from './reducer';

const init = (gameQuestions) => {
  const settings = {
    gameTime: 5,
    errorCount: 3,
  };
  const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  );
  ReactDOM.render(<Provider store={store}>
    <App
      maxMistakes={settings.errorCount}
      gameTime={settings.gameTime}
      questions={gameQuestions}
    />
    </Provider>,
  document.querySelector('#root'));
};

init(questions);
