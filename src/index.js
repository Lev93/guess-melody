/* eslint-disable no-underscore-dangle */
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import React from 'react';
import App from './components/app/app.jsx';
import questions from './mocks/questions';
import { reducer } from './reducer';
import withScreenSwitchfunc from './hocs/with-screen-switch/with-screen-switch';

const init = (gameQuestions) => {
  const settings = {
    gameTime: 5,
    errorCount: 3,
  };
  const AppWrapped = withScreenSwitchfunc(App);
  const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  );
  ReactDOM.render(<Provider store={store}>
    <AppWrapped
      maxMistakes={settings.errorCount}
      gameTime={settings.gameTime}
      questions={gameQuestions}
    />
    </Provider>,
  document.querySelector('#root'));
};

init(questions);
