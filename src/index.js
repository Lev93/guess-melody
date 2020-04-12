/* eslint-disable no-underscore-dangle */
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import React from 'react';
import { HashRouter } from 'react-router-dom';
import App from './components/app/app.jsx';
import questions from './mocks/questions';
import reducers from './reducers';

const init = (gameQuestions) => {
  const settings = {
    gameTime: 1,
    errorCount: 3,
  };
  const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  );
  ReactDOM.render(<Provider store={store}>
    <HashRouter>
    <App
      maxMistakes={settings.errorCount}
      gameTime={settings.gameTime}
      questions={gameQuestions}
    />
    </HashRouter>
    </Provider>,
  document.querySelector('#root'));
};

init(questions);
