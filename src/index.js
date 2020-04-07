/* eslint-disable no-underscore-dangle */
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { compose } from 'recompose';
import React from 'react';
import App from './components/app/app.jsx';
import createAPI from './api';
import reducer from './reducer';
import { Operation } from './reducer/data/data';
import withScreenSwitchfunc from './hocs/with-screen-switch/with-screen-switch';


const init = () => {
  const settings = {
    gameTime: 5,
    errorCount: 3,
  };
  const api = createAPI((...args) => store.dispatch(...args));
  const AppWrapped = withScreenSwitchfunc(App);
  const store = createStore(
    reducer,
    compose(
      applyMiddleware(thunk.withExtraArgument(api)),
      window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
    ),
  );
  store.dispatch(Operation.loadQuestions());

  ReactDOM.render(<Provider store={store}>
    <AppWrapped
      maxMistakes={settings.errorCount}
      gameTime={settings.gameTime}
    />
    </Provider>,
  document.querySelector('#root'));
};

init();
